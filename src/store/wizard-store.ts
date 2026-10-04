import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  WizardFormState,
  IkigaiData,
  BusinessData,
  CompetitiveData,
  AudienceData,
  ChannelScopeData,
  ArchetypeType,
  BusinessModelType,
  MarketSaturationType,
  ChannelType,
  ReviewCadenceType,
  BusinessFitProposal,
} from "../lib/types";
import { getDemoWizardState } from "../lib/demo-presets";
import { normalizeCoreValueId, normalizeCoreValues } from "../lib/core-values";

interface WizardStore extends WizardFormState {
  ikigaiConfirmed: boolean;
  confirmIkigai: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateIkigai: (data: Partial<IkigaiData>) => void;
  updateBusiness: (data: Partial<BusinessData>) => void;
  updateCompetitive: (data: Partial<CompetitiveData>) => void;
  updateAudience: (data: Partial<AudienceData>) => void;
  updateScope: (data: Partial<ChannelScopeData>) => void;
  toggleCoreValue: (val: string) => void;
  toggleChannel: (channel: ChannelType) => void;
  togglePainTrigger: (trigger: string) => void;
  toggleGoal: (goal: string) => void;
  addCompetitor: (competitor: string) => void;
  removeCompetitor: (index: number) => void;
  loadDemoData: (lang?: string, targetStep?: number) => void;
  selectBusinessModelFit: (proposal: BusinessFitProposal) => void;
  resetWizard: () => void;
}

const initialIkigai: IkigaiData = {
  locale: "EN",
  // Pillar 1: What You Love / Passion (AG-SPEC Standard)
  p1_time_loss: "",
  p1_spare_time_reading: "",
  p1_average_tuesday: "",
  p1_energizing_tasks: "",
  p1_childhood_passions: "",
  p1_spark_debates: "",
  p1_creative_outlets: "",

  // Pillar 2: What You Are Good At / Vocation (AG-SPEC Standard)
  p2_effortless_skills: "",
  p2_sought_advice: "",
  p2_hard_skills: "",
  p2_interpersonal_soft: "",
  p2_success_patterns: "",
  p2_problem_solving: "",
  p2_recurring_praise: "",

  // Pillar 3: What the World Needs / Mission (AG-SPEC Standard)
  p3_systemic_injustice: "",
  p3_community_to_help: "",
  p3_unlimited_resource: "",
  p3_immediate_needs: "",
  p3_non_negotiables: "",
  p3_future_gap: "",
  p3_legacy_impact: "",

  // Pillar 4: What You Can Be Paid For / Profession (AG-SPEC Standard)
  p4_past_paid_services: "",
  p4_market_paid_skills: "",
  p4_commercial_hobbies: "",
  p4_high_value_roi: "",
  p4_premium_assets: "",
  p4_growth_niches: "",
  p4_monetization_fit: "",

  // Intersection & Alignment / Synthesis (AG-SPEC Standard)
  overlap_synthesis: "",
  pilot_30_days: "",

  // Positioning
  archetype: "VISIONARY_DISRUPTOR",
  coreValues: ["DESIGN_ELEGANCE", "SPEED_AGILITY", "ZERO_FLUFF", "DATA_RIGOR"],

  // Backward compatibility
  timeFlyActivities: "",
  naturalTopics: "",
  idealTuesday: "",
  energizingTasks: "",
  childhoodPassions: "",
  sparkDebates: "",
  creativeOutlets: "",
  effortlessSkills: "",
  soughtAdvice: "",
  hardSkills: "",
  softSkills: "",
  successPatterns: "",
  problemSolvingWay: "",
  recurringPraise: "",
  systemicProblems: "",
  targetCommunity: "",
  priorityCause: "",
  practicalNeeds: "",
  decadeOutlook: "",
  desiredLegacy: "",
  pastPaidServices: "",
  highValueSkills: "",
  commercialHobbies: "",
  economicImpact: "",
  premiumOffers: "",
  growthNiches: "",
  monetizationModel: "",
  coreIntersection: "",
  pilotProject30Days: "",
  passion: "",
  vocation: "",
  mission: "",
  profession: "",
};

const initialBusiness: BusinessData = {
  businessName: "",
  websiteUrl: "",
  businessModel: "B2B_SERVICE",
  industry: "",
  geoScope: "Global / Remote",
  currentStage: "TRACTION",
  monthlyBudget: 1500,
  weeklyHours: 10,
};

const initialCompetitive: CompetitiveData = {
  competitors: [],
  marketSaturation: "MEDIUM",
  differentiator: "",
  retentionRate: "85%",
};

const initialAudience: AudienceData = {
  icpDemographics: "",
  painTriggers: ["Inconsistent pipeline", "High client acquisition cost"],
  buyingObjections: ["Budget constraints", "Past implementation failure"],
  existingAssets: "",
};

const initialScope: ChannelScopeData = {
  primaryGoals: ["Establish Category Authority", "Generate Qualified Inbound Leads"],
  reviewCadence: "MONTHLY",
  activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM"],
};

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      step: 0,
      ikigaiConfirmed: false,
      ikigai: initialIkigai,
      business: initialBusiness,
      competitive: initialCompetitive,
      audience: initialAudience,
      scope: initialScope,

      confirmIkigai: () => set({ ikigaiConfirmed: true, step: 1 }),
      setStep: (step) => set({ step: Math.max(0, Math.min(5, step)) }),
      nextStep: () => set((s) => ({ step: Math.min(5, s.step + 1) })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      updateIkigai: (data) =>
        set((s) => ({
          ikigai: {
            ...s.ikigai,
            ...data,
            ...(data.coreValues ? { coreValues: normalizeCoreValues(data.coreValues) } : {}),
          },
        })),

      updateBusiness: (data) =>
        set((s) => ({ business: { ...s.business, ...data } })),

      updateCompetitive: (data) =>
        set((s) => ({ competitive: { ...s.competitive, ...data } })),

      updateAudience: (data) =>
        set((s) => ({ audience: { ...s.audience, ...data } })),

      updateScope: (data) =>
        set((s) => ({ scope: { ...s.scope, ...data } })),

      toggleCoreValue: (val) =>
        set((s) => {
          const key = normalizeCoreValueId(val);
          const current = normalizeCoreValues(s.ikigai.coreValues || []);
          const exists = current.includes(key);
          const next = exists
            ? current.filter((k) => k !== key)
            : [...current, key];
          return { ikigai: { ...s.ikigai, coreValues: next } };
        }),

      toggleChannel: (channel) =>
        set((s) => {
          const exists = s.scope.activeChannels.includes(channel);
          let next = exists
            ? s.scope.activeChannels.filter((c) => c !== channel)
            : [...s.scope.activeChannels, channel];
          if (next.length === 0) next = [channel]; // keep at least 1
          return { scope: { ...s.scope, activeChannels: next } };
        }),

      togglePainTrigger: (trigger) =>
        set((s) => {
          const exists = s.audience.painTriggers.includes(trigger);
          const next = exists
            ? s.audience.painTriggers.filter((t) => t !== trigger)
            : [...s.audience.painTriggers, trigger];
          return { audience: { ...s.audience, painTriggers: next } };
        }),

      toggleGoal: (goal) =>
        set((s) => {
          const exists = s.scope.primaryGoals.includes(goal);
          const next = exists
            ? s.scope.primaryGoals.filter((g) => g !== goal)
            : [...s.scope.primaryGoals, goal];
          return { scope: { ...s.scope, primaryGoals: next } };
        }),

      addCompetitor: (competitor) =>
        set((s) => {
          if (!competitor || !competitor.trim()) return s;
          if (s.competitive.competitors.includes(competitor.trim())) return s;
          return {
            competitive: {
              ...s.competitive,
              competitors: [...s.competitive.competitors, competitor.trim()],
            },
          };
        }),

      removeCompetitor: (index) =>
        set((s) => ({
          competitive: {
            ...s.competitive,
            competitors: s.competitive.competitors.filter((_, i) => i !== index),
          },
        })),

      loadDemoData: (lang: string = "en", targetStep?: number) => {
        const demo = getDemoWizardState(lang);
        set((s) => ({
          step: targetStep !== undefined ? targetStep : s.step,
          ikigaiConfirmed: false,
          ikigai: {
            ...demo.ikigai,
            coreValues: normalizeCoreValues(demo.ikigai.coreValues || []),
          },
          business: demo.business,
          competitive: demo.competitive,
          audience: demo.audience,
          scope: demo.scope,
        }));
      },

      selectBusinessModelFit: (proposal: BusinessFitProposal) =>
        set((s) => ({
          ikigai: {
            ...s.ikigai,
            selectedModelFit: proposal.title,
          },
          business: {
            ...s.business,
            businessModel: proposal.businessModelType,
            industry: proposal.industry || s.business.industry,
          },
          competitive: {
            ...s.competitive,
            differentiator: proposal.differentiator || s.competitive.differentiator,
          },
        })),

      resetWizard: () =>
        set({
          step: 0,
          ikigaiConfirmed: false,
          ikigai: initialIkigai,
          business: initialBusiness,
          competitive: initialCompetitive,
          audience: initialAudience,
          scope: initialScope,
        }),
    }),
    {
      name: "mmm_wizard_state_v1",
      onRehydrateStorage: () => (state) => {
        if (state?.ikigai?.coreValues) {
          state.ikigai.coreValues = normalizeCoreValues(state.ikigai.coreValues);
        }
      },
    }
  )
);
