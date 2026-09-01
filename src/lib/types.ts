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

export interface WizardFormState {
  step: number;
  ikigai: {
    passion: string;
    vocation: string;
    mission: string;
    profession: string;
    archetype?: BrandArchetypeType;
    coreValues?: string[];
  };
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

export type IkigaiData = WizardFormState["ikigai"];
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
  ikigai: {
    passion: string;
    vocation: string;
    mission: string;
    profession: string;
    archetype?: BrandArchetypeType;
    coreValues?: string[];
  };
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
