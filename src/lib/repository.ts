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
          passion: biz.ikigai.passion,
          vocation: biz.ikigai.vocation,
          mission: biz.ikigai.mission,
          profession: biz.ikigai.profession,
          archetype: (biz.ikigai.archetype as any) || "VISIONARY_DISRUPTOR",
          coreValues: biz.ikigai.coreValues || [],
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

    await prisma.ikigaiProfile.upsert({
      where: { businessProfileId: bizId },
      create: {
        businessProfileId: bizId,
        passion: state.ikigai.passion,
        vocation: state.ikigai.vocation,
        mission: state.ikigai.mission,
        profession: state.ikigai.profession,
        archetype: state.ikigai.archetype || "VISIONARY_DISRUPTOR",
        coreValues: state.ikigai.coreValues || [],
      },
      update: {
        passion: state.ikigai.passion,
        vocation: state.ikigai.vocation,
        mission: state.ikigai.mission,
        profession: state.ikigai.profession,
        archetype: state.ikigai.archetype || "VISIONARY_DISRUPTOR",
        coreValues: state.ikigai.coreValues || [],
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
