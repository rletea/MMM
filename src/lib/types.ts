export type BrandArchetypeType =
  | "VISIONARY_DISRUPTOR"
  | "TRUSTED_AUTHORITY"
  | "COMMUNITY_CATALYST"
  | "CREATIVE_ARTISAN"
  | "DATA_SCIENTIST"
  | "TRANSFORMATION_GUIDE";

export type ArchetypeType = BrandArchetypeType;

export type BusinessModelType =
  | "B2B_SERVICE"
  | "B2B_SAAS"
  | "B2C_ECOM"
  | "B2C_LOCAL"
  | "CREATOR";

export type MarketSaturationType = "LOW" | "MEDIUM" | "HIGH" | "RED_OCEAN";

export type ChannelType =
  | "LINKEDIN"
  | "FACEBOOK"
  | "INSTAGRAM"
  | "TIKTOK"
  | "EMAIL";

export type ContentFormatType =
  | "POST"
  | "CAROUSEL"
  | "REEL_SCRIPT"
  | "NEWSLETTER"
  | "THREAD";

export type ContentStatusType = "DRAFT" | "SCHEDULED" | "COPIED" | "PUBLISHED";

export type ReviewCadenceType =
  | "WEEKLY"
  | "BI_WEEKLY"
  | "MONTHLY"
  | "QUARTERLY";

export type RiskTierType =
  | "DOMINANT"
  | "HIGH_POTENTIAL"
  | "MODERATE_RISK"
  | "CRITICAL_PIVOT";

export type SupportedLocaleType = "EN" | "RO" | "DE" | "FR" | "IT" | "PL" | "ES";

export interface IkigaiData {
  locale?: string; // "EN" | "RO" | "DE" | "FR" | "IT" | "PL" | "ES" or lowercase

  // Pillar 1: What You Love / Passion (AG-SPEC Standard)
  p1_time_loss?: string;
  p1_spare_time_reading?: string;
  p1_average_tuesday?: string;
  p1_energizing_tasks?: string;
  p1_childhood_passions?: string;
  p1_spark_debates?: string;
  p1_creative_outlets?: string;

  // Pillar 2: What You Are Good At / Vocation (AG-SPEC Standard)
  p2_effortless_skills?: string;
  p2_sought_advice?: string;
  p2_hard_skills?: string;
  p2_interpersonal_soft?: string;
  p2_success_patterns?: string;
  p2_problem_solving?: string;
  p2_recurring_praise?: string;

  // Pillar 3: What the World Needs / Mission (AG-SPEC Standard)
  p3_systemic_injustice?: string;
  p3_community_to_help?: string;
  p3_unlimited_resource?: string;
  p3_immediate_needs?: string;
  p3_non_negotiables?: string;
  p3_future_gap?: string;
  p3_legacy_impact?: string;

  // Pillar 4: What You Can Be Paid For / Profession (AG-SPEC Standard)
  p4_past_paid_services?: string;
  p4_market_paid_skills?: string;
  p4_commercial_hobbies?: string;
  p4_high_value_roi?: string;
  p4_premium_assets?: string;
  p4_growth_niches?: string;
  p4_monetization_fit?: string;

  // Intersection & Alignment / Synthesis (AG-SPEC Standard)
  overlap_synthesis?: string;
  pilot_30_days?: string;

  // Positioning additions
  archetype?: BrandArchetypeType;
  coreValues?: string[];

  // Backward compatible aliases
  timeFlyActivities?: string;
  naturalTopics?: string;
  idealTuesday?: string;
  energizingTasks?: string;
  childhoodPassions?: string;
  sparkDebates?: string;
  creativeOutlets?: string;

  effortlessSkills?: string;
  soughtAdvice?: string;
  hardSkills?: string;
  softSkills?: string;
  successPatterns?: string;
  problemSolvingWay?: string;
  recurringPraise?: string;

  systemicProblems?: string;
  targetCommunity?: string;
  priorityCause?: string;
  practicalNeeds?: string;
  decadeOutlook?: string;
  desiredLegacy?: string;

  pastPaidServices?: string;
  highValueSkills?: string;
  commercialHobbies?: string;
  economicImpact?: string;
  premiumOffers?: string;
  growthNiches?: string;
  monetizationModel?: string;

  coreIntersection?: string;
  pilotProject30Days?: string;

  passion?: string;
  vocation?: string;
  mission?: string;
  profession?: string;
}

export interface WizardFormState {
  step: number;
  ikigai: IkigaiData;
  business: {
    businessName: string;
    websiteUrl?: string;
    businessModel: BusinessModelType;
    industry: string;
    geoScope: string;
    currentStage: string;
    monthlyBudget: number;
    weeklyHours: number;
  };
  competitive: {
    differentiator: string;
    marketSaturation: MarketSaturationType;
    competitors: string[];
    retentionRate?: string;
  };
  audience: {
    icpDemographics: string;
    painTriggers: string[];
    buyingObjections: string[];
    existingAssets?: string;
  };
  scope: {
    activeChannels: ChannelType[];
    primaryGoals: string[];
    reviewCadence: ReviewCadenceType;
  };
}
export type BusinessData = WizardFormState["business"];
export type CompetitiveData = WizardFormState["competitive"];
export type AudienceData = WizardFormState["audience"];
export type ChannelScopeData = WizardFormState["scope"];

export interface BVIScoreBreakdown {
  marketViability: number; // 0 - 100
  executionCapacity: number; // 0 - 100
  productMarketAlignment: number; // 0 - 100
  channelReadiness: number; // 0 - 100
  ikigaiCongruence: number; // 0 - 100
  totalScore: number; // 0 - 100
  riskTier: RiskTierType;
  tierLabel: string;
  tierColor: string;
  strengths: string[];
  risks: string[];
  actionDirectives: string[];
}

export interface ContentPillar {
  title: string;
  description: string;
  targetAudienceAngle: string;
  sampleHooks: string[];
  frequencyPerWeek: number;
}

export interface StrategyPlanOutput {
  positioningDoc: string;
  brandManifesto: string;
  contentPillars: ContentPillar[];
  weeklyCadence: {
    day: string;
    channel: ChannelType;
    contentType?: ContentFormatType;
    format?: ContentFormatType;
    pillarFocus?: string;
    strategicTheme?: string;
    strategicGoal?: string;
  }[];
  reviewCadence?: ReviewCadenceType;
  activeChannels?: ChannelType[];
}

export interface GeneratedPostItem {
  id: string;
  dayNumber: number;
  channel: ChannelType;
  contentType?: ContentFormatType;
  format?: ContentFormatType;
  hook: string;
  bodyContent?: string;
  body?: string;
  visualPrompt?: string;
  videoScript?:
    | {
        hookVisual: string;
        sceneBreakdown: string[];
        audioCues: string;
        cta: string;
      }
    | string;
  scheduledDate?: string;
  scheduledFor?: string;
  publishedAt?: string;
  status: ContentStatusType;
  pillar?: string;
  topic?: string;
}

export interface FullProfilePayload {
  businessProfile: {
    id: string;
    businessName: string;
    websiteUrl?: string;
    businessModel: BusinessModelType;
    industry: string;
    geoScope: string;
    currentStage: string;
    monthlyBudget: number;
    weeklyHours: number;
  };
  ikigai: IkigaiData;
  diagnostic: {
    differentiator: string;
    competitors: string[];
    marketSaturation: MarketSaturationType;
    viabilityScore: number;
    scoreBreakdown: BVIScoreBreakdown;
  };
  strategy: StrategyPlanOutput;
  contents: GeneratedPostItem[];
}

export function getIkigaiSummary(data?: IkigaiData): {
  passion: string;
  vocation: string;
  mission: string;
  profession: string;
} {
  if (!data) {
    return { passion: "", vocation: "", mission: "", profession: "" };
  }
  const passion =
    data.passion ||
    data.p1_energizing_tasks ||
    data.p1_time_loss ||
    data.p1_spare_time_reading ||
    data.p1_creative_outlets ||
    data.energizingTasks ||
    data.timeFlyActivities ||
    data.naturalTopics ||
    "";
  const vocation =
    data.vocation ||
    data.p2_effortless_skills ||
    data.p2_hard_skills ||
    data.p2_sought_advice ||
    data.p2_success_patterns ||
    data.effortlessSkills ||
    data.hardSkills ||
    "";
  const mission =
    data.mission ||
    data.p3_systemic_injustice ||
    data.p3_community_to_help ||
    data.p3_unlimited_resource ||
    data.p3_immediate_needs ||
    data.priorityCause ||
    data.systemicProblems ||
    "";
  const profession =
    data.profession ||
    data.p4_market_paid_skills ||
    data.p4_high_value_roi ||
    data.p4_premium_assets ||
    data.p4_past_paid_services ||
    data.highValueSkills ||
    data.premiumOffers ||
    "";

  return { passion, vocation, mission, profession };
}

