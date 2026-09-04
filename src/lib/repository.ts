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
          timeFlyActivities: biz.ikigai.timeFlyActivities || undefined,
          naturalTopics: biz.ikigai.naturalTopics || undefined,
          idealTuesday: biz.ikigai.idealTuesday || undefined,
          energizingTasks: biz.ikigai.energizingTasks || undefined,
          childhoodPassions: biz.ikigai.childhoodPassions || undefined,
          sparkDebates: biz.ikigai.sparkDebates || undefined,
          creativeOutlets: biz.ikigai.creativeOutlets || undefined,
          // Pillar 2: Vocation
          effortlessSkills: biz.ikigai.effortlessSkills || undefined,
          soughtAdvice: biz.ikigai.soughtAdvice || undefined,
          hardSkills: biz.ikigai.hardSkills || undefined,
          softSkills: biz.ikigai.softSkills || undefined,
          successPatterns: biz.ikigai.successPatterns || undefined,
          problemSolvingWay: biz.ikigai.problemSolvingWay || undefined,
          recurringPraise: biz.ikigai.recurringPraise || undefined,
          // Pillar 3: Mission
          systemicProblems: biz.ikigai.systemicProblems || undefined,
          targetCommunity: biz.ikigai.targetCommunity || undefined,
          priorityCause: biz.ikigai.priorityCause || undefined,
          practicalNeeds: biz.ikigai.practicalNeeds || undefined,
          coreValues: biz.ikigai.coreValues || [],
          decadeOutlook: biz.ikigai.decadeOutlook || undefined,
          desiredLegacy: biz.ikigai.desiredLegacy || undefined,
          // Pillar 4: Profession
          pastPaidServices: biz.ikigai.pastPaidServices || undefined,
          highValueSkills: biz.ikigai.highValueSkills || undefined,
          commercialHobbies: biz.ikigai.commercialHobbies || undefined,
          economicImpact: biz.ikigai.economicImpact || undefined,
          premiumOffers: biz.ikigai.premiumOffers || undefined,
          growthNiches: biz.ikigai.growthNiches || undefined,
          monetizationModel: biz.ikigai.monetizationModel || undefined,
          // Synthesis & Action
          coreIntersection: biz.ikigai.coreIntersection || undefined,
          pilotProject30Days: biz.ikigai.pilotProject30Days || undefined,
          // Legacy summary compatibility
          passion: biz.ikigai.energizingTasks || biz.ikigai.timeFlyActivities || biz.ikigai.naturalTopics || "",
          vocation: biz.ikigai.effortlessSkills || biz.ikigai.hardSkills || biz.ikigai.soughtAdvice || "",
          mission: biz.ikigai.priorityCause || biz.ikigai.systemicProblems || biz.ikigai.practicalNeeds || "",
          profession: biz.ikigai.highValueSkills || biz.ikigai.premiumOffers || biz.ikigai.pastPaidServices || "",
          archetype: "VISIONARY_DISRUPTOR",
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

    const ikigaiDbData = {
      locale: language,
      // Pillar 1: Passion
      timeFlyActivities: state.ikigai.timeFlyActivities || null,
      naturalTopics: state.ikigai.naturalTopics || null,
      idealTuesday: state.ikigai.idealTuesday || null,
      energizingTasks: state.ikigai.energizingTasks || state.ikigai.passion || null,
      childhoodPassions: state.ikigai.childhoodPassions || null,
      sparkDebates: state.ikigai.sparkDebates || null,
      creativeOutlets: state.ikigai.creativeOutlets || null,
      // Pillar 2: Vocation
      effortlessSkills: state.ikigai.effortlessSkills || state.ikigai.vocation || null,
      soughtAdvice: state.ikigai.soughtAdvice || null,
      hardSkills: state.ikigai.hardSkills || null,
      softSkills: state.ikigai.softSkills || null,
      successPatterns: state.ikigai.successPatterns || null,
      problemSolvingWay: state.ikigai.problemSolvingWay || null,
      recurringPraise: state.ikigai.recurringPraise || null,
      // Pillar 3: Mission
      systemicProblems: state.ikigai.systemicProblems || null,
      targetCommunity: state.ikigai.targetCommunity || null,
      priorityCause: state.ikigai.priorityCause || state.ikigai.mission || null,
      practicalNeeds: state.ikigai.practicalNeeds || null,
      coreValues: state.ikigai.coreValues || [],
      decadeOutlook: state.ikigai.decadeOutlook || null,
      desiredLegacy: state.ikigai.desiredLegacy || null,
      // Pillar 4: Profession
      pastPaidServices: state.ikigai.pastPaidServices || null,
      highValueSkills: state.ikigai.highValueSkills || state.ikigai.profession || null,
      commercialHobbies: state.ikigai.commercialHobbies || null,
      economicImpact: state.ikigai.economicImpact || null,
      premiumOffers: state.ikigai.premiumOffers || null,
      growthNiches: state.ikigai.growthNiches || null,
      monetizationModel: state.ikigai.monetizationModel || null,
      // Synthesis & Action
      coreIntersection: state.ikigai.coreIntersection || null,
      pilotProject30Days: state.ikigai.pilotProject30Days || null,
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
        positioningDoc: strategy.positioningDoc,
        contentPillars: strategy.contentPillars as any,
        reviewCadence: strategy.reviewCadence || state.scope.reviewCadence || "MONTHLY",
        activeChannels: strategy.activeChannels || state.scope.activeChannels || ["LINKEDIN"],
      },
      update: {
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
