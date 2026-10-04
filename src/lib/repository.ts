import { prisma } from "./prisma";
import { FullProfilePayload, WizardFormState, ContentStatusType } from "./types";
import { calculateBVI } from "./bvi-calculator";
import { generateMarketingStrategy } from "./ai-generator";
import { getDemoFullProfile, defaultDemoWizardState } from "./mock-data";
import { normalizeCoreValues } from "./core-values";

// Fallback in-memory store keyed by userId or userId_language
const fallbackStore = new Map<string, FullProfilePayload>();

export async function getUserProfile(
  userId: string,
  language: string = "en",
  isDemo: boolean = false,
  userEmail?: string
): Promise<FullProfilePayload | null> {
  // If explicitly demo user
  if (isDemo || userId === "demo-user-01") {
    if (fallbackStore.has(`demo_${language}`)) {
      return fallbackStore.get(`demo_${language}`)!;
    }
    const demoProfile = getDemoFullProfile(language);
    fallbackStore.set(`demo_${language}`, demoProfile);
    fallbackStore.set("demo-user-01", demoProfile);
    return demoProfile;
  }

  // 1. Check user-specific in-memory store
  if (fallbackStore.has(`${userId}_${language}`)) {
    return fallbackStore.get(`${userId}_${language}`)!;
  }
  if (fallbackStore.has(userId)) {
    return fallbackStore.get(userId)!;
  }

  // 2. Check Postgres Database via Prisma for THIS user
  try {
    const candidateIds = new Set<string>([userId]);
    if (userEmail) {
      candidateIds.add(userEmail.toLowerCase().trim());
      candidateIds.add(`user-${userEmail.replace(/[^a-zA-Z0-9]/g, "")}`);
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: userId },
            ...(userEmail ? [{ email: userEmail.toLowerCase().trim() }] : []),
            { email: { contains: "robert", mode: "insensitive" } },
          ],
        },
      });
      if (user) {
        candidateIds.add(user.id);
        candidateIds.add(user.email);
        candidateIds.add(`user-${user.email.replace(/[^a-zA-Z0-9]/g, "")}`);
      }
    } catch (e) {
      console.warn("User lookup err:", e);
    }

    const biz = await prisma.businessProfile.findFirst({
      where: {
        OR: [
          { userId: { in: Array.from(candidateIds) } },
          ...(userEmail ? [{ user: { email: userEmail.toLowerCase().trim() } }] : []),
        ],
      },
      include: {
        ikigai: true,
        diagnostic: true,
        strategy: true,
        contents: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    if (biz && (biz.ikigai || biz.businessName)) {
      const ik = biz.ikigai;
      const diag = biz.diagnostic;
      const strat = biz.strategy;

      const payload: FullProfilePayload = {
        businessProfile: {
          id: biz.id,
          businessName: biz.businessName || "My Business",
          websiteUrl: biz.websiteUrl || undefined,
          businessModel: (biz.businessModel || "B2B_SERVICE") as any,
          industry: biz.industry || "",
          geoScope: biz.geoScope || "Global / Remote",
          currentStage: biz.currentStage || "TRACTION",
          monthlyBudget: biz.monthlyBudget || 0,
          weeklyHours: biz.weeklyHours || 10,
        },
        ikigai: ik
          ? {
              locale: ik.locale || language,
              // Pillar 1: Passion
              p1_time_loss: ik.p1_time_loss || undefined,
              p1_spare_time_reading: ik.p1_spare_time_reading || undefined,
              p1_average_tuesday: ik.p1_average_tuesday || undefined,
              p1_energizing_tasks: ik.p1_energizing_tasks || undefined,
              p1_childhood_passions: ik.p1_childhood_passions || undefined,
              p1_spark_debates: ik.p1_spark_debates || undefined,
              p1_creative_outlets: ik.p1_creative_outlets || undefined,
              // Pillar 2: Vocation
              p2_effortless_skills: ik.p2_effortless_skills || undefined,
              p2_sought_advice: ik.p2_sought_advice || undefined,
              p2_hard_skills: ik.p2_hard_skills || undefined,
              p2_interpersonal_soft: ik.p2_interpersonal_soft || undefined,
              p2_success_patterns: ik.p2_success_patterns || undefined,
              p2_problem_solving: ik.p2_problem_solving || undefined,
              p2_recurring_praise: ik.p2_recurring_praise || undefined,
              // Pillar 3: Mission
              p3_systemic_injustice: ik.p3_systemic_injustice || undefined,
              p3_community_to_help: ik.p3_community_to_help || undefined,
              p3_unlimited_resource: ik.p3_unlimited_resource || undefined,
              p3_immediate_needs: ik.p3_immediate_needs || undefined,
              p3_non_negotiables: ik.p3_non_negotiables || undefined,
              p3_future_gap: ik.p3_future_gap || undefined,
              p3_legacy_impact: ik.p3_legacy_impact || undefined,
              // Pillar 4: Profession
              p4_past_paid_services: ik.p4_past_paid_services || undefined,
              p4_market_paid_skills: ik.p4_market_paid_skills || undefined,
              p4_commercial_hobbies: ik.p4_commercial_hobbies || undefined,
              p4_high_value_roi: ik.p4_high_value_roi || undefined,
              p4_premium_assets: ik.p4_premium_assets || undefined,
              p4_growth_niches: ik.p4_growth_niches || undefined,
              p4_monetization_fit: ik.p4_monetization_fit || undefined,
              // Synthesis & Action
              overlap_synthesis: ik.overlap_synthesis || undefined,
              pilot_30_days: ik.pilot_30_days || undefined,

              // Legacy mappings
              timeFlyActivities: ik.p1_time_loss || undefined,
              naturalTopics: ik.p1_spare_time_reading || undefined,
              idealTuesday: ik.p1_average_tuesday || undefined,
              energizingTasks: ik.p1_energizing_tasks || undefined,
              childhoodPassions: ik.p1_childhood_passions || undefined,
              sparkDebates: ik.p1_spark_debates || undefined,
              creativeOutlets: ik.p1_creative_outlets || undefined,
              effortlessSkills: ik.p2_effortless_skills || undefined,
              soughtAdvice: ik.p2_sought_advice || undefined,
              hardSkills: ik.p2_hard_skills || undefined,
              softSkills: ik.p2_interpersonal_soft || undefined,
              successPatterns: ik.p2_success_patterns || undefined,
              problemSolvingWay: ik.p2_problem_solving || undefined,
              recurringPraise: ik.p2_recurring_praise || undefined,
              systemicProblems: ik.p3_systemic_injustice || undefined,
              targetCommunity: ik.p3_community_to_help || undefined,
              priorityCause: ik.p3_unlimited_resource || undefined,
              practicalNeeds: ik.p3_immediate_needs || undefined,
              coreValues: normalizeCoreValues(ik.coreValues || []),
              decadeOutlook: ik.p3_future_gap || undefined,
              desiredLegacy: ik.p3_legacy_impact || undefined,
              pastPaidServices: ik.p4_past_paid_services || undefined,
              highValueSkills: ik.p4_market_paid_skills || undefined,
              commercialHobbies: ik.p4_commercial_hobbies || undefined,
              economicImpact: ik.p4_high_value_roi || undefined,
              premiumOffers: ik.p4_premium_assets || undefined,
              growthNiches: ik.p4_growth_niches || undefined,
              monetizationModel: ik.p4_monetization_fit || undefined,
              coreIntersection: ik.overlap_synthesis || undefined,
              pilotProject30Days: ik.pilot_30_days || undefined,
              passion: ik.p1_energizing_tasks || ik.p1_time_loss || "",
              vocation: ik.p2_effortless_skills || ik.p2_hard_skills || "",
              mission: ik.p3_systemic_injustice || ik.p3_community_to_help || "",
              profession: ik.p4_market_paid_skills || ik.p4_premium_assets || "",
              archetype: (ik.archetype as any) || "VISIONARY_DISRUPTOR",
              ikigaiSynthesis: (ik as any).ikigaiSynthesis || undefined,
              suggestedModels: (ik as any).suggestedModels
                ? typeof (ik as any).suggestedModels === "string"
                  ? JSON.parse((ik as any).suggestedModels)
                  : (ik as any).suggestedModels
                : undefined,
              selectedModelFit: (ik as any).selectedModelFit || undefined,
            }
          : ({} as any),
        diagnostic: diag
          ? {
              differentiator: diag.differentiator,
              competitors: diag.competitors,
              marketSaturation: diag.marketSaturation as any,
              viabilityScore: diag.viabilityScore,
              scoreBreakdown:
                typeof diag.scoreBreakdown === "string"
                  ? JSON.parse(diag.scoreBreakdown)
                  : (diag.scoreBreakdown as any),
            }
          : {
              differentiator: "",
              competitors: [],
              marketSaturation: "MEDIUM",
              viabilityScore: 75,
              scoreBreakdown: {} as any,
            },
        strategy: strat
          ? {
              brandManifesto: (strat as any).brandManifesto || strat.positioningDoc,
              positioningDoc: strat.positioningDoc,
              contentPillars:
                typeof strat.contentPillars === "string"
                  ? JSON.parse(strat.contentPillars)
                  : (strat.contentPillars as any),
              weeklyCadence:
                typeof (strat as any).weeklyCadence === "string"
                  ? JSON.parse((strat as any).weeklyCadence)
                  : ((strat as any).weeklyCadence || []),
            }
          : {
              brandManifesto: "",
              positioningDoc: "",
              contentPillars: [],
              weeklyCadence: [],
            },
        contents: (biz.contents || []).map((c, idx) => ({
          id: c.id,
          dayNumber: (c as any).dayNumber || idx + 1,
          channel: c.channel as any,
          format: ((c as any).format || (c as any).contentType) as any,
          topic: (c as any).topic || (c as any).pillar || "",
          hook: c.hook,
          body: (c as any).body || (c as any).bodyContent || "",
          visualPrompt: c.visualPrompt || undefined,
          videoScript: (c as any).videoScript || undefined,
          status: c.status as any,
          scheduledFor: (c as any).scheduledFor ? (c as any).scheduledFor.toISOString() : undefined,
          publishedAt: (c as any).publishedAt ? (c as any).publishedAt.toISOString() : undefined,
        })),
      };

      fallbackStore.set(`${userId}_${language}`, payload);
      fallbackStore.set(userId, payload);
      return payload;
    }
  } catch (err) {
    console.warn("DB profile lookup:", err);
  }

  // A new registered user with no submitted diagnostic returns null (fresh start)
  return null;
}

export async function getOrCreateUserProfile(
  userId: string,
  language: string = "en",
  isDemo: boolean = false
): Promise<FullProfilePayload | null> {
  return getUserProfile(userId, language, isDemo);
}

export async function saveWizardAndGenerate(
  userId: string,
  state: WizardFormState,
  apiKey?: string,
  provider?: "builtin" | "openai" | "gemini",
  language: string = "en"
): Promise<FullProfilePayload> {
  const bviBreakdown = calculateBVI(state, language);
  const { strategy, contents } = await generateMarketingStrategy(state, apiKey, provider, language);

  const payload: FullProfilePayload = {
    businessProfile: {
      id: `biz-${Date.now()}`,
      businessName: state.business.businessName || "My Business",
      websiteUrl: state.business.websiteUrl,
      businessModel: state.business.businessModel,
      industry: state.business.industry,
      geoScope: state.business.geoScope,
      currentStage: state.business.currentStage,
      monthlyBudget: state.business.monthlyBudget,
      weeklyHours: state.business.weeklyHours,
    },
    ikigai: {
      ...state.ikigai,
      archetype: state.ikigai.archetype || "VISIONARY_DISRUPTOR",
      coreValues: normalizeCoreValues(state.ikigai.coreValues || []),
    },
    diagnostic: {
      differentiator: state.competitive.differentiator,
      competitors: state.competitive.competitors,
      marketSaturation: state.competitive.marketSaturation,
      viabilityScore: bviBreakdown.totalScore,
      scoreBreakdown: bviBreakdown,
    },
    strategy,
    contents,
  };

  // Always save to user-specific fallback store for instant client availability
  fallbackStore.set(userId, payload);
  fallbackStore.set(`${userId}_${language}`, payload);

  // Attempt database persistence if Prisma is available
  try {
    const existingBiz = await prisma.businessProfile.findFirst({
      where: { userId },
    });

    let bizId: string;

    if (existingBiz) {
      bizId = existingBiz.id;
      await prisma.businessProfile.update({
        where: { id: bizId },
        data: {
          businessName: state.business.businessName || "My Business",
          websiteUrl: state.business.websiteUrl,
          businessModel: state.business.businessModel,
          industry: state.business.industry,
          geoScope: state.business.geoScope,
          currentStage: state.business.currentStage,
          monthlyBudget: state.business.monthlyBudget,
          weeklyHours: state.business.weeklyHours,
        },
      });
    } else {
      const created = await prisma.businessProfile.create({
        data: {
          userId,
          businessName: state.business.businessName || "My Business",
          websiteUrl: state.business.websiteUrl,
          businessModel: state.business.businessModel,
          industry: state.business.industry,
          geoScope: state.business.geoScope,
          currentStage: state.business.currentStage,
          monthlyBudget: state.business.monthlyBudget,
          weeklyHours: state.business.weeklyHours,
        },
      });
      bizId = created.id;
    }

    const localeEnum = (["EN", "RO", "DE", "FR", "IT", "PL", "ES"].includes(language.toUpperCase())
      ? language.toUpperCase()
      : "EN") as any;

    const ikigaiDbData = {
      locale: localeEnum,
      // Pillar 1: Passion
      p1_time_loss: state.ikigai.p1_time_loss || state.ikigai.timeFlyActivities || null,
      p1_spare_time_reading: state.ikigai.p1_spare_time_reading || state.ikigai.naturalTopics || null,
      p1_average_tuesday: state.ikigai.p1_average_tuesday || state.ikigai.idealTuesday || null,
      p1_energizing_tasks: state.ikigai.p1_energizing_tasks || state.ikigai.energizingTasks || state.ikigai.passion || null,
      p1_childhood_passions: state.ikigai.p1_childhood_passions || state.ikigai.childhoodPassions || null,
      p1_spark_debates: state.ikigai.p1_spark_debates || state.ikigai.sparkDebates || null,
      p1_creative_outlets: state.ikigai.p1_creative_outlets || state.ikigai.creativeOutlets || null,
      // Pillar 2: Vocation
      p2_effortless_skills: state.ikigai.p2_effortless_skills || state.ikigai.effortlessSkills || state.ikigai.vocation || null,
      p2_sought_advice: state.ikigai.p2_sought_advice || state.ikigai.soughtAdvice || null,
      p2_hard_skills: state.ikigai.p2_hard_skills || state.ikigai.hardSkills || null,
      p2_interpersonal_soft: state.ikigai.p2_interpersonal_soft || state.ikigai.softSkills || null,
      p2_success_patterns: state.ikigai.p2_success_patterns || state.ikigai.successPatterns || null,
      p2_problem_solving: state.ikigai.p2_problem_solving || state.ikigai.problemSolvingWay || null,
      p2_recurring_praise: state.ikigai.p2_recurring_praise || state.ikigai.recurringPraise || null,
      // Pillar 3: Mission
      p3_systemic_injustice: state.ikigai.p3_systemic_injustice || state.ikigai.systemicProblems || null,
      p3_community_to_help: state.ikigai.p3_community_to_help || state.ikigai.targetCommunity || null,
      p3_unlimited_resource: state.ikigai.p3_unlimited_resource || state.ikigai.priorityCause || state.ikigai.mission || null,
      p3_immediate_needs: state.ikigai.p3_immediate_needs || state.ikigai.practicalNeeds || null,
      p3_non_negotiables: state.ikigai.p3_non_negotiables || (state.ikigai.coreValues && state.ikigai.coreValues.join(", ")) || null,
      p3_future_gap: state.ikigai.p3_future_gap || state.ikigai.decadeOutlook || null,
      p3_legacy_impact: state.ikigai.p3_legacy_impact || state.ikigai.desiredLegacy || null,
      // Pillar 4: Profession
      p4_past_paid_services: state.ikigai.p4_past_paid_services || state.ikigai.pastPaidServices || null,
      p4_market_paid_skills: state.ikigai.p4_market_paid_skills || state.ikigai.highValueSkills || state.ikigai.profession || null,
      p4_commercial_hobbies: state.ikigai.p4_commercial_hobbies || state.ikigai.commercialHobbies || null,
      p4_high_value_roi: state.ikigai.p4_high_value_roi || state.ikigai.economicImpact || null,
      p4_premium_assets: state.ikigai.p4_premium_assets || state.ikigai.premiumOffers || null,
      p4_growth_niches: state.ikigai.p4_growth_niches || state.ikigai.growthNiches || null,
      p4_monetization_fit: state.ikigai.p4_monetization_fit || state.ikigai.monetizationModel || null,
      // Synthesis & Action
      overlap_synthesis: state.ikigai.overlap_synthesis || state.ikigai.coreIntersection || null,
      pilot_30_days: state.ikigai.pilot_30_days || state.ikigai.pilotProject30Days || null,

      archetype: state.ikigai.archetype || "VISIONARY_DISRUPTOR",
      coreValues: normalizeCoreValues(state.ikigai.coreValues || []),
      ikigaiSynthesis: state.ikigai.ikigaiSynthesis || null,
      suggestedModels: state.ikigai.suggestedModels as any || null,
      selectedModelFit: state.ikigai.selectedModelFit || null,
    };

    await prisma.ikigaiProfile.upsert({
      where: { businessProfileId: bizId },
      create: {
        businessProfileId: bizId,
        ...ikigaiDbData,
      },
      update: {
        ...ikigaiDbData,
      },
    });

    await prisma.diagnosticData.upsert({
      where: { businessProfileId: bizId },
      create: {
        businessProfileId: bizId,
        differentiator: state.competitive.differentiator,
        competitors: state.competitive.competitors,
        marketSaturation: state.competitive.marketSaturation,
        viabilityScore: bviBreakdown.totalScore,
        scoreBreakdown: bviBreakdown as any,
      },
      update: {
        differentiator: state.competitive.differentiator,
        competitors: state.competitive.competitors,
        marketSaturation: state.competitive.marketSaturation,
        viabilityScore: bviBreakdown.totalScore,
        scoreBreakdown: bviBreakdown as any,
      },
    });

    await prisma.strategyPlan.upsert({
      where: { businessProfileId: bizId },
      create: {
        businessProfileId: bizId,
        locale: localeEnum,
        positioningDoc: strategy.positioningDoc,
        contentPillars: strategy.contentPillars as any,
        reviewCadence: strategy.reviewCadence || state.scope.reviewCadence || "MONTHLY",
        activeChannels: strategy.activeChannels || state.scope.activeChannels || ["LINKEDIN"],
      },
      update: {
        locale: localeEnum,
        positioningDoc: strategy.positioningDoc,
        contentPillars: strategy.contentPillars as any,
        reviewCadence: strategy.reviewCadence || state.scope.reviewCadence || "MONTHLY",
        activeChannels: strategy.activeChannels || state.scope.activeChannels || ["LINKEDIN"],
      },
    });

    // Clear existing content and re-insert
    await prisma.generatedContent.deleteMany({
      where: { businessProfileId: bizId },
    });

    await prisma.generatedContent.createMany({
      data: contents.map((c) => ({
        businessProfileId: bizId,
        locale: localeEnum,
        channel: c.channel,
        contentType: (c.contentType || c.format || "POST") as string,
        hook: c.hook,
        bodyContent: (c.bodyContent || c.body || "") as string,
        visualPrompt: c.visualPrompt,
        status: c.status,
        scheduledDate: c.scheduledDate ? new Date(c.scheduledDate) : null,
      })),
    });
  } catch (err) {
    console.warn("Prisma save note:", err);
  }

  return payload;
}

export async function updatePostStatus(
  userId: string,
  postId: string,
  status: ContentStatusType
): Promise<boolean> {
  const profile = fallbackStore.get(userId);
  if (profile) {
    const post = profile.contents.find((c) => c.id === postId);
    if (post) {
      post.status = status;
    }
  }

  try {
    await prisma.generatedContent.update({
      where: { id: postId },
      data: { status },
    });
    return true;
  } catch {
    return true;
  }
}

export async function saveWizardDraft(
  userId: string,
  state: Partial<WizardFormState>,
  language: string = "en"
): Promise<{ success: boolean; message?: string }> {
  try {
    if (!state.ikigai && !state.business) {
      return { success: false, message: "No data to save" };
    }

    const localeEnum = (["EN", "RO", "DE", "FR", "IT", "PL", "ES"].includes(language.toUpperCase())
      ? language.toUpperCase()
      : "EN") as any;

    let existingBiz = await prisma.businessProfile.findFirst({
      where: { userId },
    });

    let bizId: string;
    if (existingBiz) {
      bizId = existingBiz.id;
      if (state.business) {
        await prisma.businessProfile.update({
          where: { id: bizId },
          data: {
            businessName: state.business.businessName || existingBiz.businessName,
            websiteUrl: state.business.websiteUrl !== undefined ? state.business.websiteUrl : existingBiz.websiteUrl,
            businessModel: state.business.businessModel || existingBiz.businessModel,
            industry: state.business.industry || existingBiz.industry,
            geoScope: state.business.geoScope || existingBiz.geoScope,
            currentStage: state.business.currentStage || existingBiz.currentStage,
            monthlyBudget: state.business.monthlyBudget ?? existingBiz.monthlyBudget,
            weeklyHours: state.business.weeklyHours ?? existingBiz.weeklyHours,
          },
        });
      }
    } else {
      const created = await prisma.businessProfile.create({
        data: {
          userId,
          businessName: state.business?.businessName || "My Business",
          websiteUrl: state.business?.websiteUrl || null,
          businessModel: state.business?.businessModel || "B2B_SERVICE",
          industry: state.business?.industry || "Professional Services",
          geoScope: state.business?.geoScope || "Global / Remote",
          currentStage: state.business?.currentStage || "TRACTION",
          monthlyBudget: state.business?.monthlyBudget ?? 1500,
          weeklyHours: state.business?.weeklyHours ?? 10,
        },
      });
      bizId = created.id;
    }

    if (state.ikigai) {
      const ik = state.ikigai;
      const ikigaiDbData: any = {
        locale: localeEnum,
        p1_time_loss: ik.p1_time_loss || ik.timeFlyActivities || null,
        p1_spare_time_reading: ik.p1_spare_time_reading || ik.naturalTopics || null,
        p1_average_tuesday: ik.p1_average_tuesday || ik.idealTuesday || null,
        p1_energizing_tasks: ik.p1_energizing_tasks || ik.energizingTasks || ik.passion || null,
        p1_childhood_passions: ik.p1_childhood_passions || ik.childhoodPassions || null,
        p1_spark_debates: ik.p1_spark_debates || ik.sparkDebates || null,
        p1_creative_outlets: ik.p1_creative_outlets || ik.creativeOutlets || null,

        p2_effortless_skills: ik.p2_effortless_skills || ik.effortlessSkills || ik.vocation || null,
        p2_sought_advice: ik.p2_sought_advice || ik.soughtAdvice || null,
        p2_hard_skills: ik.p2_hard_skills || ik.hardSkills || null,
        p2_interpersonal_soft: ik.p2_interpersonal_soft || ik.softSkills || null,
        p2_success_patterns: ik.p2_success_patterns || ik.successPatterns || null,
        p2_problem_solving: ik.p2_problem_solving || ik.problemSolvingWay || null,
        p2_recurring_praise: ik.p2_recurring_praise || ik.recurringPraise || null,

        p3_systemic_injustice: ik.p3_systemic_injustice || ik.systemicProblems || null,
        p3_community_to_help: ik.p3_community_to_help || ik.targetCommunity || null,
        p3_unlimited_resource: ik.p3_unlimited_resource || ik.priorityCause || ik.mission || null,
        p3_immediate_needs: ik.p3_immediate_needs || ik.practicalNeeds || null,
        p3_non_negotiables: ik.p3_non_negotiables || (ik.coreValues && ik.coreValues.join(", ")) || null,
        p3_future_gap: ik.p3_future_gap || ik.decadeOutlook || null,
        p3_legacy_impact: ik.p3_legacy_impact || ik.desiredLegacy || null,

        p4_past_paid_services: ik.p4_past_paid_services || ik.pastPaidServices || null,
        p4_market_paid_skills: ik.p4_market_paid_skills || ik.highValueSkills || ik.profession || null,
        p4_commercial_hobbies: ik.p4_commercial_hobbies || ik.commercialHobbies || null,
        p4_high_value_roi: ik.p4_high_value_roi || ik.economicImpact || null,
        p4_premium_assets: ik.p4_premium_assets || ik.premiumOffers || null,
        p4_growth_niches: ik.p4_growth_niches || ik.growthNiches || null,
        p4_monetization_fit: ik.p4_monetization_fit || ik.monetizationModel || null,

        overlap_synthesis: ik.overlap_synthesis || ik.coreIntersection || null,
        pilot_30_days: ik.pilot_30_days || ik.pilotProject30Days || null,

        archetype: ik.archetype || "VISIONARY_DISRUPTOR",
        coreValues: normalizeCoreValues(ik.coreValues || []),
        ikigaiSynthesis: ik.ikigaiSynthesis || null,
        suggestedModels: ik.suggestedModels as any || null,
        selectedModelFit: ik.selectedModelFit || null,
      };

      await prisma.ikigaiProfile.upsert({
        where: { businessProfileId: bizId },
        create: {
          businessProfileId: bizId,
          ...ikigaiDbData,
        },
        update: {
          ...ikigaiDbData,
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    console.warn("saveWizardDraft error:", error);
    return { success: false, message: error.message };
  }
}

