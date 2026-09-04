import { prisma } from "./prisma";
import { FullProfilePayload, WizardFormState, ContentStatusType } from "./types";
import { calculateBVI } from "./bvi-calculator";
import { generateMarketingStrategy } from "./ai-generator";
import { getDemoFullProfile, defaultDemoWizardState } from "./mock-data";

// Fallback in-memory store keyed by userId or userId_language
const fallbackStore = new Map<string, FullProfilePayload>();

export async function getUserProfile(
  userId: string,
  language: string = "en",
  isDemo: boolean = false
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
    const biz = await prisma.businessProfile.findFirst({
      where: { userId },
      include: {
        ikigai: true,
        diagnostic: true,
        strategy: true,
        contents: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (biz && biz.ikigai && biz.diagnostic && biz.strategy) {
      const payload: FullProfilePayload = {
        businessProfile: {
          id: biz.id,
          businessName: biz.businessName,
          websiteUrl: biz.websiteUrl || undefined,
          businessModel: biz.businessModel as any,
          industry: biz.industry,
          geoScope: biz.geoScope,
          currentStage: biz.currentStage,
          monthlyBudget: biz.monthlyBudget,
          weeklyHours: biz.weeklyHours,
        },
        ikigai: {
          locale: biz.ikigai.locale || language,
          // Pillar 1: Passion
          p1_time_loss: biz.ikigai.p1_time_loss || undefined,
          p1_spare_time_reading: biz.ikigai.p1_spare_time_reading || undefined,
          p1_average_tuesday: biz.ikigai.p1_average_tuesday || undefined,
          p1_energizing_tasks: biz.ikigai.p1_energizing_tasks || undefined,
          p1_childhood_passions: biz.ikigai.p1_childhood_passions || undefined,
          p1_spark_debates: biz.ikigai.p1_spark_debates || undefined,
          p1_creative_outlets: biz.ikigai.p1_creative_outlets || undefined,
          // Pillar 2: Vocation
          p2_effortless_skills: biz.ikigai.p2_effortless_skills || undefined,
          p2_sought_advice: biz.ikigai.p2_sought_advice || undefined,
          p2_hard_skills: biz.ikigai.p2_hard_skills || undefined,
          p2_interpersonal_soft: biz.ikigai.p2_interpersonal_soft || undefined,
          p2_success_patterns: biz.ikigai.p2_success_patterns || undefined,
          p2_problem_solving: biz.ikigai.p2_problem_solving || undefined,
          p2_recurring_praise: biz.ikigai.p2_recurring_praise || undefined,
          // Pillar 3: Mission
          p3_systemic_injustice: biz.ikigai.p3_systemic_injustice || undefined,
          p3_community_to_help: biz.ikigai.p3_community_to_help || undefined,
          p3_unlimited_resource: biz.ikigai.p3_unlimited_resource || undefined,
          p3_immediate_needs: biz.ikigai.p3_immediate_needs || undefined,
          p3_non_negotiables: biz.ikigai.p3_non_negotiables || undefined,
          p3_future_gap: biz.ikigai.p3_future_gap || undefined,
          p3_legacy_impact: biz.ikigai.p3_legacy_impact || undefined,
          // Pillar 4: Profession
          p4_past_paid_services: biz.ikigai.p4_past_paid_services || undefined,
          p4_market_paid_skills: biz.ikigai.p4_market_paid_skills || undefined,
          p4_commercial_hobbies: biz.ikigai.p4_commercial_hobbies || undefined,
          p4_high_value_roi: biz.ikigai.p4_high_value_roi || undefined,
          p4_premium_assets: biz.ikigai.p4_premium_assets || undefined,
          p4_growth_niches: biz.ikigai.p4_growth_niches || undefined,
          p4_monetization_fit: biz.ikigai.p4_monetization_fit || undefined,
          // Synthesis & Action
          overlap_synthesis: biz.ikigai.overlap_synthesis || undefined,
          pilot_30_days: biz.ikigai.pilot_30_days || undefined,

          // Legacy mappings
          timeFlyActivities: biz.ikigai.p1_time_loss || undefined,
          naturalTopics: biz.ikigai.p1_spare_time_reading || undefined,
          idealTuesday: biz.ikigai.p1_average_tuesday || undefined,
          energizingTasks: biz.ikigai.p1_energizing_tasks || undefined,
          childhoodPassions: biz.ikigai.p1_childhood_passions || undefined,
          sparkDebates: biz.ikigai.p1_spark_debates || undefined,
          creativeOutlets: biz.ikigai.p1_creative_outlets || undefined,
          effortlessSkills: biz.ikigai.p2_effortless_skills || undefined,
          soughtAdvice: biz.ikigai.p2_sought_advice || undefined,
          hardSkills: biz.ikigai.p2_hard_skills || undefined,
          softSkills: biz.ikigai.p2_interpersonal_soft || undefined,
          successPatterns: biz.ikigai.p2_success_patterns || undefined,
          problemSolvingWay: biz.ikigai.p2_problem_solving || undefined,
          recurringPraise: biz.ikigai.p2_recurring_praise || undefined,
          systemicProblems: biz.ikigai.p3_systemic_injustice || undefined,
          targetCommunity: biz.ikigai.p3_community_to_help || undefined,
          priorityCause: biz.ikigai.p3_unlimited_resource || undefined,
          practicalNeeds: biz.ikigai.p3_immediate_needs || undefined,
          coreValues: biz.ikigai.coreValues || [],
          decadeOutlook: biz.ikigai.p3_future_gap || undefined,
          desiredLegacy: biz.ikigai.p3_legacy_impact || undefined,
          pastPaidServices: biz.ikigai.p4_past_paid_services || undefined,
          highValueSkills: biz.ikigai.p4_market_paid_skills || undefined,
          commercialHobbies: biz.ikigai.p4_commercial_hobbies || undefined,
          economicImpact: biz.ikigai.p4_high_value_roi || undefined,
          premiumOffers: biz.ikigai.p4_premium_assets || undefined,
          growthNiches: biz.ikigai.p4_growth_niches || undefined,
          monetizationModel: biz.ikigai.p4_monetization_fit || undefined,
          coreIntersection: biz.ikigai.overlap_synthesis || undefined,
          pilotProject30Days: biz.ikigai.pilot_30_days || undefined,
          passion: biz.ikigai.p1_energizing_tasks || biz.ikigai.p1_time_loss || "",
          vocation: biz.ikigai.p2_effortless_skills || biz.ikigai.p2_hard_skills || "",
          mission: biz.ikigai.p3_systemic_injustice || biz.ikigai.p3_community_to_help || "",
          profession: biz.ikigai.p4_market_paid_skills || biz.ikigai.p4_premium_assets || "",
          archetype: (biz.ikigai.archetype as any) || "VISIONARY_DISRUPTOR",
        },
        diagnostic: {
          differentiator: biz.diagnostic.differentiator,
          competitors: biz.diagnostic.competitors,
          marketSaturation: biz.diagnostic.marketSaturation as any,
          viabilityScore: biz.diagnostic.viabilityScore,
          scoreBreakdown:
            typeof biz.diagnostic.scoreBreakdown === "string"
              ? JSON.parse(biz.diagnostic.scoreBreakdown)
              : (biz.diagnostic.scoreBreakdown as any),
        },
        strategy: {
          brandManifesto: (biz.strategy as any).brandManifesto || biz.strategy.positioningDoc,
          positioningDoc: biz.strategy.positioningDoc,
          contentPillars:
            typeof biz.strategy.contentPillars === "string"
              ? JSON.parse(biz.strategy.contentPillars)
              : (biz.strategy.contentPillars as any),
          weeklyCadence:
            typeof (biz.strategy as any).weeklyCadence === "string"
              ? JSON.parse((biz.strategy as any).weeklyCadence)
              : ((biz.strategy as any).weeklyCadence || []),
        },
        contents: biz.contents.map((c, idx) => ({
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
      coreValues: state.ikigai.coreValues || [],
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
      coreValues: state.ikigai.coreValues || [],
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
