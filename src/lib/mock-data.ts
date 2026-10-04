import { FullProfilePayload, WizardFormState } from "./types";
import { calculateBVI } from "./bvi-calculator";
import { synthesizeStrategyAndContent } from "./ai-generator";
import { getDemoWizardState } from "./demo-presets";

export const defaultDemoWizardState: WizardFormState = getDemoWizardState("en");

export function getDemoFullProfile(language: string = "en"): FullProfilePayload {
  const state = getDemoWizardState(language);
  const bviBreakdown = calculateBVI(state, language);
  const { strategy, contents } = synthesizeStrategyAndContent(state, language);

  return {
    businessProfile: {
      id: "demo-biz-01",
      businessName: state.business.businessName,
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
}

