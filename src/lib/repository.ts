import { prisma } from "./prisma";
import { FullProfilePayload, WizardFormState, ContentStatusType } from "./types";
import { calculateBVI } from "./bvi-calculator";
import { generateMarketingStrategy } from "./ai-generator";
import { getDemoFullProfile, defaultDemoWizardState } from "./mock-data";

// Fallback in-memory store for instant zero-config dev
const fallbackStore = new Map<string, FullProfilePayload>();

export async function getOrCreateUserProfile(userId: string): Promise<FullProfilePayload> {
  // Check if we have data in memory store
  if (fallbackStore.has(userId)) {
    return fallbackStore.get(userId)!;
  }

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
          archetype: biz.ikigai.archetype as any,
          coreValues: biz.ikigai.coreValues,
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
          positioningDoc: biz.strategy.positioningDoc,
          brandManifesto: (biz.strategy as any).brandManifesto || "",
          contentPillars:
            typeof biz.strategy.contentPillars === "string"
              ? JSON.parse(biz.strategy.contentPillars)
              : (biz.strategy.contentPillars as any),
          weeklyCadence: [],
          reviewCadence: biz.strategy.reviewCadence as any,
          activeChannels: biz.strategy.activeChannels as any,
        },
        contents: biz.contents.map((c, i) => ({
          id: c.id,
          dayNumber: i + 1,
          channel: c.channel as any,
          contentType: c.contentType as any,
          hook: c.hook,
          bodyContent: c.bodyContent,
          visualPrompt: c.visualPrompt || undefined,
          status: c.status as any,
          pillar: "Core Strategic Pillar",
          scheduledDate: c.scheduledDate?.toISOString(),
        })),
      };

      fallbackStore.set(userId, payload);
      return payload;
    }
  } catch (err) {
    console.warn("Prisma query skipped/failed, using fallback store:", err);
  }

  // If no existing profile, initialize with Demo profile
  const demoProfile = getDemoFullProfile();
  fallbackStore.set(userId, demoProfile);
  return demoProfile;
}

export async function saveWizardAndGenerate(
  userId: string,
  state: WizardFormState,
  apiKey?: string,
  provider?: "builtin" | "openai" | "gemini",
  language: string = "en"
): Promise<FullProfilePayload> {
  const bviBreakdown = calculateBVI(state);
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
    ikigai: state.ikigai,
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

  // Always save to fallback store for instant client availability
  fallbackStore.set(userId, payload);

  // Attempt database persistence if Prisma is available
  try {
    const existingBiz = await prisma.businessProfile.findFirst({
      where: { userId },
    });

    const bizId = existingBiz ? existingBiz.id : undefined;

    if (bizId) {
      await prisma.businessProfile.update({
        where: { id: bizId },
        data: {
          businessName: state.business.businessName,
          websiteUrl: state.business.websiteUrl,
          businessModel: state.business.businessModel,
          industry: state.business.industry,
          geoScope: state.business.geoScope,
          currentStage: state.business.currentStage,
          monthlyBudget: state.business.monthlyBudget,
          weeklyHours: state.business.weeklyHours,
        },
      });

      await prisma.ikigaiProfile.upsert({
        where: { businessProfileId: bizId },
        create: {
          businessProfileId: bizId,
          passion: state.ikigai.passion,
          vocation: state.ikigai.vocation,
          mission: state.ikigai.mission,
          profession: state.ikigai.profession,
          archetype: state.ikigai.archetype,
          coreValues: state.ikigai.coreValues,
        },
        update: {
          passion: state.ikigai.passion,
          vocation: state.ikigai.vocation,
          mission: state.ikigai.mission,
          profession: state.ikigai.profession,
          archetype: state.ikigai.archetype,
          coreValues: state.ikigai.coreValues,
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
          reviewCadence: strategy.reviewCadence,
          activeChannels: strategy.activeChannels,
        },
        update: {
          positioningDoc: strategy.positioningDoc,
          contentPillars: strategy.contentPillars as any,
          reviewCadence: strategy.reviewCadence,
          activeChannels: strategy.activeChannels,
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
          contentType: c.contentType,
          hook: c.hook,
          bodyContent: c.bodyContent,
          visualPrompt: c.visualPrompt,
          status: c.status,
          scheduledDate: c.scheduledDate ? new Date(c.scheduledDate) : null,
        })),
      });
    }
  } catch (err) {
    console.warn("Prisma save skipped/errored in local dev mode:", err);
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
