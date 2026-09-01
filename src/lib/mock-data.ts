import { FullProfilePayload, WizardFormState } from "./types";
import { calculateBVI } from "./bvi-calculator";
import { synthesizeStrategyAndContent } from "./ai-generator";

export const defaultDemoWizardState: WizardFormState = {
  step: 5,
  ikigai: {
    passion: "Designing transformative systems that empower creators and business leaders to achieve operational freedom.",
    vocation: "Strategic growth advisory, marketing architecture, and high-leverage content synthesis.",
    mission: "Democratize elite brand positioning and make strategic marketing execution effortless for modern founders.",
    profession: "Full-Stack Brand & Marketing Strategist and Growth Engineer.",
    archetype: "VISIONARY_DISRUPTOR",
    coreValues: ["Radical Transparency", "Asymmetric Leverage", "Craftsmanship", "Unapologetic Focus"],
  },
  business: {
    businessName: "Nexus Growth Labs",
    websiteUrl: "https://nexusgrowthlabs.io",
    businessModel: "B2B_SERVICE",
    industry: "B2B Advisory & Marketing Tech",
    geoScope: "Global / Remote",
    currentStage: "SCALING",
    monthlyBudget: 2500,
    weeklyHours: 15,
  },
  competitive: {
    competitors: ["Standard Agencies", "Generic AI Copy Tools", "Freelance Copywriters"],
    marketSaturation: "HIGH",
    differentiator: "An integrated Ikigai-driven diagnostic engine combined with automated multi-channel campaign architectures that eliminates 90% of content production overhead while maintaining 100% authentic founder voice.",
    retentionRate: "92%",
  },
  audience: {
    icpDemographics: "B2B founders, agency owners, and high-ticket service providers generating $20k-$100k/mo seeking predictable authority.",
    painTriggers: [
      "Inconsistent social presence due to client delivery bandwidth constraints",
      "Generic agency copy that sounds robotic and lacks founder depth",
      "Low lead velocity from organic social channels",
    ],
    buyingObjections: [
      "Will this sound like generic AI copy?",
      "How much time do I realistically need to invest each week?",
    ],
    existingAssets: "Founder LinkedIn profile with 4,200 connections, email list of 1,100 past leads, weekly podcast recordings.",
  },
  scope: {
    primaryGoals: ["Establish Category Authority", "Generate 15+ Inbound Qualified Inquiries/mo", "Build 30-Day Automated Distribution"],
    reviewCadence: "MONTHLY",
    activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
  },
};

export function getDemoFullProfile(language: string = "en"): FullProfilePayload {
  const bviBreakdown = calculateBVI(defaultDemoWizardState, language);
  const { strategy, contents } = synthesizeStrategyAndContent(defaultDemoWizardState, language);

  return {
    businessProfile: {
      id: "demo-biz-01",
      businessName: defaultDemoWizardState.business.businessName,
      websiteUrl: defaultDemoWizardState.business.websiteUrl,
      businessModel: defaultDemoWizardState.business.businessModel,
      industry: defaultDemoWizardState.business.industry,
      geoScope: defaultDemoWizardState.business.geoScope,
      currentStage: defaultDemoWizardState.business.currentStage,
      monthlyBudget: defaultDemoWizardState.business.monthlyBudget,
      weeklyHours: defaultDemoWizardState.business.weeklyHours,
    },
    ikigai: defaultDemoWizardState.ikigai,
    diagnostic: {
      differentiator: defaultDemoWizardState.competitive.differentiator,
      competitors: defaultDemoWizardState.competitive.competitors,
      marketSaturation: defaultDemoWizardState.competitive.marketSaturation,
      viabilityScore: bviBreakdown.totalScore,
      scoreBreakdown: bviBreakdown,
    },
    strategy,
    contents,
  };
}
