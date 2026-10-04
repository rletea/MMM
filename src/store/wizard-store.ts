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
  hydrateFromProfile: (profile: any) => void;
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

export const IKIGAI_KEY_ALIASES: Record<string, keyof IkigaiData> = {
  p1_time_loss: "timeFlyActivities" as keyof IkigaiData,
  p1_spare_time_reading: "naturalTopics" as keyof IkigaiData,
  p1_average_tuesday: "idealTuesday" as keyof IkigaiData,
  p1_energizing_tasks: "energizingTasks" as keyof IkigaiData,
  p1_childhood_passions: "childhoodPassions" as keyof IkigaiData,
  p1_spark_debates: "sparkDebates" as keyof IkigaiData,
  p1_creative_outlets: "creativeOutlets" as keyof IkigaiData,

  p2_effortless_skills: "effortlessSkills" as keyof IkigaiData,
  p2_sought_advice: "soughtAdvice" as keyof IkigaiData,
  p2_hard_skills: "hardSkills" as keyof IkigaiData,
  p2_interpersonal_soft: "softSkills" as keyof IkigaiData,
  p2_success_patterns: "successPatterns" as keyof IkigaiData,
  p2_problem_solving: "problemSolvingWay" as keyof IkigaiData,
  p2_recurring_praise: "recurringPraise" as keyof IkigaiData,

  p3_systemic_injustice: "systemicProblems" as keyof IkigaiData,
  p3_community_to_help: "targetCommunity" as keyof IkigaiData,
  p3_unlimited_resource: "priorityCause" as keyof IkigaiData,
  p3_immediate_needs: "practicalNeeds" as keyof IkigaiData,
  p3_future_gap: "decadeOutlook" as keyof IkigaiData,
  p3_legacy_impact: "desiredLegacy" as keyof IkigaiData,

  p4_past_paid_services: "pastPaidServices" as keyof IkigaiData,
  p4_market_paid_skills: "highValueSkills" as keyof IkigaiData,
  p4_commercial_hobbies: "commercialHobbies" as keyof IkigaiData,
  p4_high_value_roi: "economicImpact" as keyof IkigaiData,
  p4_premium_assets: "premiumOffers" as keyof IkigaiData,
  p4_growth_niches: "growthNiches" as keyof IkigaiData,
  p4_monetization_fit: "monetizationModel" as keyof IkigaiData,

  overlap_synthesis: "coreIntersection" as keyof IkigaiData,
  pilot_30_days: "pilotProject30Days" as keyof IkigaiData,
};

export const REVERSE_IKIGAI_ALIASES: Record<string, keyof IkigaiData> = Object.fromEntries(
  Object.entries(IKIGAI_KEY_ALIASES).map(([k, v]) => [v as string, k as keyof IkigaiData])
);

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
        set((s) => {
          const syncedData: any = { ...data };
          Object.entries(data).forEach(([key, val]) => {
            const alias = IKIGAI_KEY_ALIASES[key] || REVERSE_IKIGAI_ALIASES[key];
            if (alias && syncedData[alias] === undefined) {
              syncedData[alias] = val;
            }
          });
          return {
            ikigai: {
              ...s.ikigai,
              ...syncedData,
              ...(data.coreValues ? { coreValues: normalizeCoreValues(data.coreValues) } : {}),
            },
          };
        }),

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

      hydrateFromProfile: (profile: any) => {
        if (!profile) return;
        set((s) => {
          const ik = profile.ikigai || {};
          const biz = profile.businessProfile || profile.business || {};
          const diag = profile.diagnostic || profile.competitive || {};
          const aud = profile.audience || {};
          const sc = profile.scope || {};

          const mergedIkigai: IkigaiData = {
            ...s.ikigai,
            ...ik,
            // Pillar 1
            p1_time_loss: ik.p1_time_loss || ik.timeFlyActivities || s.ikigai.p1_time_loss,
            p1_spare_time_reading: ik.p1_spare_time_reading || ik.naturalTopics || s.ikigai.p1_spare_time_reading,
            p1_average_tuesday: ik.p1_average_tuesday || ik.idealTuesday || s.ikigai.p1_average_tuesday,
            p1_energizing_tasks: ik.p1_energizing_tasks || ik.energizingTasks || s.ikigai.p1_energizing_tasks,
            p1_childhood_passions: ik.p1_childhood_passions || ik.childhoodPassions || s.ikigai.p1_childhood_passions,
            p1_spark_debates: ik.p1_spark_debates || ik.sparkDebates || s.ikigai.p1_spark_debates,
            p1_creative_outlets: ik.p1_creative_outlets || ik.creativeOutlets || s.ikigai.p1_creative_outlets,

            // Pillar 2
            p2_effortless_skills: ik.p2_effortless_skills || ik.effortlessSkills || s.ikigai.p2_effortless_skills,
            p2_sought_advice: ik.p2_sought_advice || ik.soughtAdvice || s.ikigai.p2_sought_advice,
            p2_hard_skills: ik.p2_hard_skills || ik.hardSkills || s.ikigai.p2_hard_skills,
            p2_interpersonal_soft: ik.p2_interpersonal_soft || ik.softSkills || s.ikigai.p2_interpersonal_soft,
            p2_success_patterns: ik.p2_success_patterns || ik.successPatterns || s.ikigai.p2_success_patterns,
            p2_problem_solving: ik.p2_problem_solving || ik.problemSolvingWay || s.ikigai.p2_problem_solving,
            p2_recurring_praise: ik.p2_recurring_praise || ik.recurringPraise || s.ikigai.p2_recurring_praise,

            // Pillar 3
            p3_systemic_injustice: ik.p3_systemic_injustice || ik.systemicProblems || s.ikigai.p3_systemic_injustice,
            p3_community_to_help: ik.p3_community_to_help || ik.targetCommunity || s.ikigai.p3_community_to_help,
            p3_unlimited_resource: ik.p3_unlimited_resource || ik.priorityCause || s.ikigai.p3_unlimited_resource,
            p3_immediate_needs: ik.p3_immediate_needs || ik.practicalNeeds || s.ikigai.p3_immediate_needs,
            p3_non_negotiables: ik.p3_non_negotiables || s.ikigai.p3_non_negotiables,
            p3_future_gap: ik.p3_future_gap || ik.decadeOutlook || s.ikigai.p3_future_gap,
            p3_legacy_impact: ik.p3_legacy_impact || ik.desiredLegacy || s.ikigai.p3_legacy_impact,

            // Pillar 4
            p4_past_paid_services: ik.p4_past_paid_services || ik.pastPaidServices || s.ikigai.p4_past_paid_services,
            p4_market_paid_skills: ik.p4_market_paid_skills || ik.highValueSkills || s.ikigai.p4_market_paid_skills,
            p4_commercial_hobbies: ik.p4_commercial_hobbies || ik.commercialHobbies || s.ikigai.p4_commercial_hobbies,
            p4_high_value_roi: ik.p4_high_value_roi || ik.economicImpact || s.ikigai.p4_high_value_roi,
            p4_premium_assets: ik.p4_premium_assets || ik.premiumOffers || s.ikigai.p4_premium_assets,
            p4_growth_niches: ik.p4_growth_niches || ik.growthNiches || s.ikigai.p4_growth_niches,
            p4_monetization_fit: ik.p4_monetization_fit || ik.monetizationModel || s.ikigai.p4_monetization_fit,

            // Synthesis
            overlap_synthesis: ik.overlap_synthesis || ik.coreIntersection || s.ikigai.overlap_synthesis,
            pilot_30_days: ik.pilot_30_days || ik.pilotProject30Days || s.ikigai.pilot_30_days,

            archetype: ik.archetype || s.ikigai.archetype || "VISIONARY_DISRUPTOR",
            coreValues: normalizeCoreValues(ik.coreValues || s.ikigai.coreValues || []),
            ikigaiSynthesis: ik.ikigaiSynthesis || s.ikigai.ikigaiSynthesis,
            suggestedModels: ik.suggestedModels || s.ikigai.suggestedModels,
            selectedModelFit: ik.selectedModelFit || s.ikigai.selectedModelFit,
          };

          const mergedBusiness: BusinessData = {
            ...s.business,
            businessName: biz.businessName || s.business.businessName,
            websiteUrl: biz.websiteUrl !== undefined ? biz.websiteUrl : s.business.websiteUrl,
            businessModel: biz.businessModel || s.business.businessModel,
            industry: biz.industry || s.business.industry,
            geoScope: biz.geoScope || s.business.geoScope,
            currentStage: biz.currentStage || s.business.currentStage,
            monthlyBudget: biz.monthlyBudget !== undefined ? Number(biz.monthlyBudget) : s.business.monthlyBudget,
            weeklyHours: biz.weeklyHours !== undefined ? Number(biz.weeklyHours) : s.business.weeklyHours,
          };

          const mergedCompetitive: CompetitiveData = {
            ...s.competitive,
            differentiator: diag.differentiator || s.competitive.differentiator,
            competitors: Array.isArray(diag.competitors) && diag.competitors.length > 0 ? diag.competitors : s.competitive.competitors,
            marketSaturation: diag.marketSaturation || s.competitive.marketSaturation,
          };

          const mergedAudience: AudienceData = {
            ...s.audience,
            icpDemographics: aud.icpDemographics || s.audience.icpDemographics,
            painTriggers: Array.isArray(aud.painTriggers) && aud.painTriggers.length > 0 ? aud.painTriggers : s.audience.painTriggers,
            buyingObjections: Array.isArray(aud.buyingObjections) && aud.buyingObjections.length > 0 ? aud.buyingObjections : s.audience.buyingObjections,
            existingAssets: aud.existingAssets || s.audience.existingAssets,
          };

          const mergedScope: ChannelScopeData = {
            ...s.scope,
            primaryGoals: Array.isArray(sc.primaryGoals) && sc.primaryGoals.length > 0 ? sc.primaryGoals : s.scope.primaryGoals,
            reviewCadence: sc.reviewCadence || s.scope.reviewCadence,
            activeChannels: Array.isArray(sc.activeChannels) && sc.activeChannels.length > 0 ? sc.activeChannels : s.scope.activeChannels,
          };

          const hasAnswers = !!(
            mergedIkigai.p1_time_loss ||
            mergedIkigai.p2_effortless_skills ||
            mergedIkigai.p3_systemic_injustice ||
            mergedIkigai.p4_market_paid_skills ||
            mergedIkigai.overlap_synthesis
          );

          return {
            ikigai: mergedIkigai,
            business: mergedBusiness,
            competitive: mergedCompetitive,
            audience: mergedAudience,
            scope: mergedScope,
            ikigaiConfirmed: hasAnswers || s.ikigaiConfirmed,
          };
        });
      },

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
        if (!state?.ikigai) return;
        if (state.ikigai.coreValues) {
          state.ikigai.coreValues = normalizeCoreValues(state.ikigai.coreValues);
        }
        // Bidirectional sync between legacy and AG-SPEC keys on load
        Object.entries(IKIGAI_KEY_ALIASES).forEach(([newK, oldK]) => {
          const nVal = state.ikigai[newK as keyof IkigaiData];
          const oVal = state.ikigai[oldK as keyof IkigaiData];
          if ((!nVal || (typeof nVal === "string" && !nVal.trim())) && oVal && typeof oVal === "string" && oVal.trim()) {
            (state.ikigai as any)[newK] = oVal;
          } else if ((!oVal || (typeof oVal === "string" && !oVal.trim())) && nVal && typeof nVal === "string" && nVal.trim()) {
            (state.ikigai as any)[oldK] = nVal;
          }
        });
      },
    }
  )
);
