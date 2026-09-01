export type BusinessModelType =
  | "B2B_SERVICE"
  | "B2B_SAAS"
  | "B2C_ECOM"
  | "B2C_LOCAL"
  | "CREATOR";

export type MarketSaturationType = "LOW" | "MEDIUM" | "HIGH" | "RED_OCEAN";

export type ArchetypeType =
  | "VISIONARY_DISRUPTOR"
  | "TRUSTED_AUTHORITY"
  | "COMMUNITY_CATALYST"
  | "CREATIVE_ARTISAN"
  | "DATA_SCIENTIST"
  | "TRANSFORMATION_GUIDE";

export type ChannelType = "LINKEDIN" | "FACEBOOK" | "INSTAGRAM" | "TIKTOK" | "EMAIL";

export type ContentFormatType = "POST" | "REEL_SCRIPT" | "CAROUSEL" | "NEWSLETTER";

export type ContentStatusType = "DRAFT" | "SCHEDULED" | "COPIED" | "PUBLISHED";

export type ReviewCadenceType = "BIWEEKLY" | "MONTHLY" | "QUARTERLY";

export type RiskTierType = "DOMINANT" | "HIGH_POTENTIAL" | "MODERATE_RISK" | "CRITICAL_PIVOT";

export interface IkigaiData {
  passion: string;
  vocation: string;
  mission: string;
  profession: string;
  archetype: ArchetypeType;
  coreValues: string[];
}

export interface BusinessData {
  businessName: string;
  websiteUrl?: string;
  businessModel: BusinessModelType;
  industry: string;
  geoScope: string;
  currentStage: string;
  monthlyBudget: number;
  weeklyHours: number;
}

export interface CompetitiveData {
  competitors: string[];
  marketSaturation: MarketSaturationType;
  differentiator: string;
  retentionRate?: string;
}

export interface AudienceData {
  icpDemographics: string;
  painTriggers: string[];
  buyingObjections: string[];
  existingAssets: string;
}

export interface ChannelScopeData {
  primaryGoals: string[];
  reviewCadence: ReviewCadenceType;
  activeChannels: ChannelType[];
}

export interface WizardFormState {
  step: number;
  ikigai: IkigaiData;
  business: BusinessData;
  competitive: CompetitiveData;
  audience: AudienceData;
  scope: ChannelScopeData;
}

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
    contentType: ContentFormatType;
    pillarFocus: string;
    strategicGoal: string;
  }[];
  reviewCadence: ReviewCadenceType;
  activeChannels: ChannelType[];
}

export interface GeneratedPostItem {
  id: string;
  dayNumber: number;
  channel: ChannelType;
  contentType: ContentFormatType;
  hook: string;
  bodyContent: string;
  visualPrompt?: string;
  videoScript?: {
    hookVisual: string;
    sceneBreakdown: string[];
    audioCues: string;
    cta: string;
  };
  scheduledDate?: string;
  status: ContentStatusType;
  pillar: string;
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
