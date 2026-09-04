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
  loadDemoData: (lang?: string) => void;
  resetWizard: () => void;
}

const initialIkigai: IkigaiData = {
  locale: "en",
  // Pillar 1: Passion
  timeFlyActivities: "",
  naturalTopics: "",
  idealTuesday: "",
  energizingTasks: "",
  childhoodPassions: "",
  sparkDebates: "",
  creativeOutlets: "",

  // Pillar 2: Vocation
  effortlessSkills: "",
  soughtAdvice: "",
  hardSkills: "",
  softSkills: "",
  successPatterns: "",
  problemSolvingWay: "",
  recurringPraise: "",

  // Pillar 3: Mission
  systemicProblems: "",
  targetCommunity: "",
  priorityCause: "",
  practicalNeeds: "",
  coreValues: ["Mastery", "Integrity", "Innovation"],
  decadeOutlook: "",
  desiredLegacy: "",

  // Pillar 4: Profession
  pastPaidServices: "",
  highValueSkills: "",
  commercialHobbies: "",
  economicImpact: "",
  premiumOffers: "",
  growthNiches: "",
  monetizationModel: "",

  // Synthesis & Action
  coreIntersection: "",
  pilotProject30Days: "",

  // Legacy synthesis compatibility
  passion: "",
  vocation: "",
  mission: "",
  profession: "",
  archetype: "VISIONARY_DISRUPTOR",
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
          const current = s.ikigai.coreValues || [];
          const exists = current.includes(val);
          const next = exists
            ? current.filter((v) => v !== val)
            : [...current, val];
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

      loadDemoData: (lang: string = "en") => {
        const isRo = lang === "ro";
        const isDe = lang === "de";
        const isFr = lang === "fr";
        const isEs = lang === "es";

        let ikigaiDemo: IkigaiData;

        if (isRo) {
          ikigaiDemo = {
            locale: "ro",
            timeFlyActivities: "Arhitecturarea motoarelor complexe de creștere, scrierea analizelor strategice și optimizarea sistemelor de piață",
            naturalTopics: "Creștere organică B2B, psihologie decizională, automatizări AI, diferențiere strategică de brand",
            idealTuesday: "Dimineață dedicată creației de strategii fără întreruperi, după-amiază de consultanță strategică de nivel înalt",
            energizingTasks: "Transformarea intuiției fondatorului în sisteme de piață clare, sistematizate și scalabile",
            childhoodPassions: "Simulări de strategie, crearea de reviste și jocuri logice interactive",
            sparkDebates: "De ce majoritatea agențiilor B2B vând metrici vanitoase în loc de dominanță de categorie",
            creativeOutlets: "Eseuri provocatoare, design de brand minimalist și arhitectură de procese",

            effortlessSkills: "Identificarea instantanee a blocajelor ascunse din poziționare și comunicare",
            soughtAdvice: "Stabilirea prețurilor premium, arhitectura autorității de brand, generarea de oportunități calificate",
            hardSkills: "Analiză de creștere B2B, repoziționare strategică, fluxuri editoriale multi-canal, prompt engineering",
            softSkills: "Empatie profundă, ascultare activă structurată, comunicare de impact și sinteză contrariană",
            successPatterns: "Concentrare pe canale asimetrice de distribuție, eliminarea zgomotului inutil și creare de active IP durabile",
            problemSolvingWay: "Deconstrucție după primele principii urmată de prototipare rapidă și iterație sistemică",
            recurringPraise: "«Ați rezumat viziunea noastră pe 5 ani și ne-ați diferențiat în 1 oră mai bine decât o agenție în 6 luni»",

            systemicProblems: "Fondatori remarcabili construiesc produse excepționale, dar rămân invizibili din cauza lipsei de strategie clară",
            targetCommunity: "Fondatori B2B, consultanți de elită și antreprenori orientați spre excelență și impact",
            priorityCause: "Democratizarea strategiilor de CMO de nivel enterprise pentru operatori onești și ambițioși",
            practicalNeeds: "Un motor previzibil de distribuție pe 30 de zile care generează autoritate și vânzări fără epuizare",
            coreValues: ["Transparență Radicală", "Eficiență Asimetrică", "Măiestrie", "Focalizare Neclintită"],
            decadeOutlook: "Conținutul generic generat de AI va inunda platformele; doar vocea autentică a fondatorului va mai converti",
            desiredLegacy: "Sprijinirea a peste 1.000 de fondatori să își construiască afaceri durabile, extrem de profitabile și lideri de nișă",

            pastPaidServices: "Servicii de Fractional CMO (5.000€/lună), workshop-uri intensive de repoziționare, audituri de conversie",
            highValueSkills: "Design de categorie de piață, mesaje de conversie high-ticket, sisteme autonome de distribuție",
            commercialHobbies: "Publicarea de analize de business, comunități private pentru fondatori, prototipuri software",
            economicImpact: "Peste 2.4M€ în contracte încheiate de clienți datorită autorității organice construite",
            premiumOffers: "Sistemul Integrat de Poziționare și Distribuție pe 30 de Zile cu lansare multi-canal",
            growthNiches: "Consultanță B2B asistată de inteligență artificială, tehnologie enterprise, servicii high-ticket",
            monetizationModel: "Consultanță strategică premium + Abonament lunar de optimizare continuă",

            coreIntersection: "Ghidarea fondatorilor ambițioși către autoritate de piață de necontestat și clienți calificați recurenți",
            pilotProject30Days: "Lansarea unui calendar multi-canal intensiv pe 30 de zile cu analize zilnice pe LinkedIn și secvență de email",

            passion: "Transformarea intuiției fondatorului în sisteme de piață clare și scalabile",
            vocation: "Consultanță strategică de marketing și arhitectură de poziționare",
            mission: "Democratizarea strategiilor de CMO de nivel enterprise pentru fondatori ambițioși",
            profession: "Inginer de Creștere & Strateg de Poziționare",
            archetype: "VISIONARY_DISRUPTOR",
          };
        } else {
          ikigaiDemo = {
            locale: lang,
            timeFlyActivities: "Architecting complex growth engines, writing contrarian long-form thought leadership, dissecting startup business models",
            naturalTopics: "Product-led growth, behavioral psychology, AI automation workflows, brand moat construction",
            idealTuesday: "Morning deep-work writing thesis essays, afternoon high-leverage client strategy sessions, zero reactive meetings",
            energizingTasks: "Translating founder intuition into systematic go-to-market playbooks and high-converting narrative structures",
            childhoodPassions: "Building strategic computer simulations, storytelling, designing custom magazines and games",
            sparkDebates: "Why most B2B marketing agencies sell low-ROI vanity metrics instead of category dominance",
            creativeOutlets: "Writing provocative essays, visual branding design, designing minimalist workflow architectures",

            effortlessSkills: "Quickly spotting underlying systemic bottlenecks in positioning and messaging that founders overlook",
            soughtAdvice: "Pricing high-ticket packages, personal brand authority architecture, organic inbound funnel creation",
            hardSkills: "Growth analytics, positioning teardowns, multi-channel editorial workflows, prompt engineering",
            softSkills: "Radical empathy, structured active listening, high-stakes communication, contrarian synthesis",
            successPatterns: "Focusing on asymmetric distribution channels, zero-fluff signal, and building defensible IP assets",
            problemSolvingWay: "First-principles deconstruction followed by rapid prototyping and algorithmic iteration",
            recurringPraise: "«You summarized our entire 5-year vision and differentiated us better in 1 hour than our agency did in 6 months»",

            systemicProblems: "Ambitious operators build world-class products but stay invisible because marketing feels dirty, noisy, or fake",
            targetCommunity: "Visionary founders, boutique consultancy partners, and solopreneur builders striving for freedom",
            priorityCause: "Democratize elite CMO-level strategic positioning for high-integrity operators",
            practicalNeeds: "A predictable 30-day organic distribution engine that builds authority without burnout",
            coreValues: ["Radical Transparency", "Asymmetric Leverage", "Craftsmanship", "Unapologetic Focus"],
            decadeOutlook: "Commoditized generic AI content will flood feeds; only authentic founder voice and deep domain moats will convert",
            desiredLegacy: "Empowered 1,000+ independent founders to build durable, highly profitable category-leading businesses",

            pastPaidServices: "Fractional CMO engagements ($10k/mo), strategic positioning intensives ($5k), cohort advisory ($2.5k)",
            highValueSkills: "Category design, high-ticket messaging frameworks, multi-channel content system architecture",
            commercialHobbies: "Writing breakdown newsletters, curating founder mastermind circles, SaaS prototyping",
            economicImpact: "Client deals closed exceeding $2.4M directly attributable to organic brand authority",
            premiumOffers: "30-Day Brand Positioning & Authority Operating System with complete multi-channel deployment",
            growthNiches: "AI-augmented professional advisory, enterprise developer tooling, high-ticket B2B services",
            monetizationModel: "High-ticket retainer + Performance upside + Scalable digital product ecosystem",

            coreIntersection: "Empowering visionary B2B founders to achieve category authority and predictable inbound pipeline through systematic Ikigai-aligned positioning",
            pilotProject30Days: "Launch a 30-day multi-channel authority blitz with daily long-form LinkedIn teardowns and an automated email onboarding engine",

            passion: "Building transformational growth systems for high-impact founders",
            vocation: "Strategic marketing advisory and positioning architecture",
            mission: "Democratize elite brand positioning for ambitious operators",
            profession: "Growth Engineer & Brand Strategist",
            archetype: "VISIONARY_DISRUPTOR",
          };
        }

        set({
          step: 5,
          ikigai: ikigaiDemo,
          business: {
            businessName: isRo ? "Nexus Growth Labs România" : "Nexus Growth Labs",
            websiteUrl: "https://nexusgrowthlabs.io",
            businessModel: "B2B_SERVICE",
            industry: isRo ? "Consultanță B2B & Tehnologie" : "B2B Advisory & Tech",
            geoScope: isRo ? "Național & Global" : "Global / Remote",
            currentStage: "SCALING",
            monthlyBudget: 2500,
            weeklyHours: 15,
          },
          competitive: {
            competitors: isRo
              ? ["Agenții clasice de marketing", "Generatoare AI generice", "Freelanceri fără strategie"]
              : ["Standard Agencies", "Generic AI Copy Tools", "Freelance Copywriters"],
            marketSaturation: "HIGH",
            differentiator: isRo
              ? "Un diagnostic profund de Ikigai combinat cu o arhitectură de campanie multi-canal complet automatizată ce elimină 90% din efortul de producție."
              : "An integrated Ikigai diagnostic combined with automated multi-channel campaign architectures eliminating 90% of production overhead.",
            retentionRate: "92%",
          },
          audience: {
            icpDemographics: isRo
              ? "Fondatori B2B și furnizori de servicii cu venituri de 20k-100k€/lună."
              : "B2B founders and high-ticket service providers generating $20k-$100k/mo.",
            painTriggers: isRo
              ? [
                  "Prezență inconsistentă din cauza timpului limitat absorbit de livrarea proiectelor",
                  "Texte de agenție generice care sună robotic și lipsite de autenticitatea fondatorului",
                  "Ritm scăzut de generare de lead-uri calificate din canalele organice",
                ]
              : [
                  "Inconsistent social presence due to client delivery bandwidth constraints",
                  "Generic agency copy that sounds robotic and lacks founder depth",
                  "Low lead velocity from organic social channels",
                ],
            buyingObjections: isRo
              ? [
                  "Oare va suna ca un text generic de inteligență artificială?",
                  "Cât timp trebuie să investesc în mod realist în fiecare săptămână?",
                ]
              : [
                  "Will this sound like generic AI copy?",
                  "How much time do I realistically need to invest each week?",
                ],
            existingAssets: isRo
              ? "Profil LinkedIn fondator cu 4.200 contacte, listă de email cu 1.100 abonați."
              : "Founder LinkedIn profile with 4,200 connections, email list of 1,100 past leads.",
          },
          scope: {
            primaryGoals: isRo
              ? ["Stabilirea Autorității de Categorie", "Generarea a 15+ oportunități calificate/lună", "Construirea unui sistem automatizat de distribuție pe 30 de zile"]
              : ["Establish Category Authority", "Generate 15+ Inbound Inquiries/mo", "Build 30-Day Automated Distribution"],
            reviewCadence: "MONTHLY",
            activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
          },
        });
      },

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
