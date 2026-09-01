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
} from "../lib/types";

interface WizardStore extends WizardFormState {
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
  loadDemoData: () => void;
  resetWizard: () => void;
}

const initialIkigai: IkigaiData = {
  passion: "",
  vocation: "",
  mission: "",
  profession: "",
  archetype: "VISIONARY_DISRUPTOR",
  coreValues: ["Mastery", "Integrity", "Innovation"],
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
      ikigai: initialIkigai,
      business: initialBusiness,
      competitive: initialCompetitive,
      audience: initialAudience,
      scope: initialScope,

      setStep: (step) => set({ step: Math.max(0, Math.min(5, step)) }),
      nextStep: () => set((s) => ({ step: Math.min(5, s.step + 1) })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      updateIkigai: (data) =>
        set((s) => ({ ikigai: { ...s.ikigai, ...data } })),

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
          const exists = s.ikigai.coreValues.includes(val);
          const next = exists
            ? s.ikigai.coreValues.filter((v) => v !== val)
            : [...s.ikigai.coreValues, val];
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

      loadDemoData: () =>
        set({
          step: 5,
          ikigai: {
            passion: "Building transformational growth systems for high-impact founders",
            vocation: "Strategic marketing advisory and positioning architecture",
            mission: "Democratize elite brand positioning for ambitious operators",
            profession: "Growth Engineer & Brand Strategist",
            archetype: "VISIONARY_DISRUPTOR",
            coreValues: ["Radical Transparency", "Asymmetric Leverage", "Craftsmanship", "Unapologetic Focus"],
          },
          business: {
            businessName: "Nexus Growth Labs",
            websiteUrl: "https://nexusgrowthlabs.io",
            businessModel: "B2B_SERVICE",
            industry: "B2B Advisory & Tech",
            geoScope: "Global / Remote",
            currentStage: "SCALING",
            monthlyBudget: 2500,
            weeklyHours: 15,
          },
          competitive: {
            competitors: ["Standard Agencies", "Generic AI Copy Tools", "Freelance Copywriters"],
            marketSaturation: "HIGH",
            differentiator: "An integrated Ikigai diagnostic combined with automated multi-channel campaign architectures eliminating 90% of production overhead.",
            retentionRate: "92%",
          },
          audience: {
            icpDemographics: "B2B founders and high-ticket service providers generating $20k-$100k/mo.",
            painTriggers: [
              "Inconsistent social presence due to client delivery bandwidth constraints",
              "Generic agency copy that sounds robotic and lacks founder depth",
              "Low lead velocity from organic social channels",
            ],
            buyingObjections: [
              "Will this sound like generic AI copy?",
              "How much time do I realistically need to invest each week?",
            ],
            existingAssets: "Founder LinkedIn profile with 4,200 connections, email list of 1,100 past leads.",
          },
          scope: {
            primaryGoals: ["Establish Category Authority", "Generate 15+ Inbound Inquiries/mo", "Build 30-Day Automated Distribution"],
            reviewCadence: "MONTHLY",
            activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
          },
        }),

      resetWizard: () =>
        set({
          step: 0,
          ikigai: initialIkigai,
          business: initialBusiness,
          competitive: initialCompetitive,
          audience: initialAudience,
          scope: initialScope,
        }),
    }),
    {
      name: "mmm_wizard_state_v1",
    }
  )
);
