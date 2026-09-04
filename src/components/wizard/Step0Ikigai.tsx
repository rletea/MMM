"use client";

import React, { useState, useMemo } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArchetypeType } from "@/lib/types";
import {
  getIkigaiPillarConfig,
  IKIGAI_TRANSLATIONS,
} from "@/lib/i18n/ikigai-questions";
import {
  Heart,
  Globe,
  Sparkles,
  Briefcase,
  Target,
  Zap,
  ShieldCheck,
  Users,
  Palette,
  Binary,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkle,
  Wand2,
} from "lucide-react";

const ARCHETYPES: {
  id: ArchetypeType;
  title: string;
  desc: string;
  icon: any;
  tone: string;
}[] = [
  {
    id: "VISIONARY_DISRUPTOR",
    title: "Visionary Disruptor",
    desc: "Challenges legacy paradigms, breaks conventions, and champions bold future states.",
    icon: Zap,
    tone: "Bold, Contrarian, Provocative",
  },
  {
    id: "TRUSTED_AUTHORITY",
    title: "Trusted Authority",
    desc: "Rigorous, methodology-first, data-backed frameworks with proven enterprise dependability.",
    icon: ShieldCheck,
    tone: "Analytical, Authoritative, Reassuring",
  },
  {
    id: "COMMUNITY_CATALYST",
    title: "Community Catalyst",
    desc: "Brings people together, fosters belonging, and leads collaborative movements.",
    icon: Users,
    tone: "Empathetic, Inclusive, High-Energy",
  },
  {
    id: "CREATIVE_ARTISAN",
    title: "Creative Artisan",
    desc: "Obsessed with design aesthetics, craft mastery, detail, and emotional resonance.",
    icon: Palette,
    tone: "Eloquent, Aesthetic, Meticulous",
  },
  {
    id: "DATA_SCIENTIST",
    title: "Data Scientist",
    desc: "Relies on quantitative testing, algorithmic optimization, and empirical evidence.",
    icon: Binary,
    tone: "Objective, Precise, Systems-Oriented",
  },
  {
    id: "TRANSFORMATION_GUIDE",
    title: "Transformation Guide",
    desc: "Mentors the audience through a hero's journey from deep struggle to breakthrough.",
    icon: Compass,
    tone: "Inspirational, Pedagogical, Supportive",
  },
];

const SUGGESTED_VALUES = [
  "Radical Transparency",
  "Design Elegance",
  "Speed & Agility",
  "Zero Fluff / High Signal",
  "Customer Obsession",
  "Data-Driven Rigor",
  "Contrarian Innovation",
  "Uncompromising Quality",
  "Ethical Stewardship",
  "Community Empowerment",
];

const PILLAR_ICONS: Record<string, any> = {
  Heart,
  Globe,
  Sparkles,
  Briefcase,
  Target,
};

export function Step0Ikigai() {
  const { ikigai, updateIkigai, toggleCoreValue, loadDemoData } = useWizardStore();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("passion");

  const i18nConfig = IKIGAI_TRANSLATIONS[language] || IKIGAI_TRANSLATIONS.en;
  const pillars = useMemo(() => getIkigaiPillarConfig(language), [language]);

  const coreValuesList = ikigai.coreValues || [];

  // Calculate completion stats across 28 fields
  const totalFields = 28;
  const completedFields = useMemo(() => {
    let count = 0;
    const checkFields = [
      ikigai.timeFlyActivities,
      ikigai.naturalTopics,
      ikigai.idealTuesday,
      ikigai.energizingTasks,
      ikigai.childhoodPassions,
      ikigai.sparkDebates,
      ikigai.creativeOutlets,
      ikigai.effortlessSkills,
      ikigai.soughtAdvice,
      ikigai.hardSkills,
      ikigai.softSkills,
      ikigai.successPatterns,
      ikigai.problemSolvingWay,
      ikigai.recurringPraise,
      ikigai.systemicProblems,
      ikigai.targetCommunity,
      ikigai.priorityCause,
      ikigai.practicalNeeds,
      ikigai.decadeOutlook,
      ikigai.desiredLegacy,
      ikigai.pastPaidServices,
      ikigai.highValueSkills,
      ikigai.commercialHobbies,
      ikigai.economicImpact,
      ikigai.premiumOffers,
      ikigai.growthNiches,
      ikigai.monetizationModel,
      ikigai.coreIntersection,
    ];
    checkFields.forEach((val) => {
      if (val && typeof val === "string" && val.trim().length > 0) count++;
    });
    return count;
  }, [ikigai]);

  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Tab definitions
  const tabsList = [
    { id: "passion", label: i18nConfig.tabs.passion, icon: Heart, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/40" },
    { id: "vocation", label: i18nConfig.tabs.vocation, icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
    { id: "mission", label: i18nConfig.tabs.mission, icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
    { id: "profession", label: i18nConfig.tabs.profession, icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
    { id: "synthesis", label: i18nConfig.tabs.synthesis, icon: Target, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
    { id: "archetype", label: i18nConfig.tabs.archetype, icon: Compass, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
  ];

  const currentTabIdx = tabsList.findIndex((t) => t.id === activeTab);

  // Auto-synthesizer helper: compiles concise summary for legacy & prompt compatibility
  const handleAutoSynthesize = () => {
    const passionSum =
      ikigai.energizingTasks || ikigai.timeFlyActivities || ikigai.naturalTopics || "";
    const vocationSum =
      ikigai.effortlessSkills || ikigai.hardSkills || ikigai.soughtAdvice || "";
    const missionSum =
      ikigai.priorityCause || ikigai.systemicProblems || ikigai.practicalNeeds || "";
    const professionSum =
      ikigai.highValueSkills || ikigai.premiumOffers || ikigai.monetizationModel || "";

    const combinedIntersection =
      ikigai.coreIntersection ||
      `Aligning ${passionSum.slice(0, 60)} with ${vocationSum.slice(0, 60)} to solve ${missionSum.slice(0, 60)}.`;

    updateIkigai({
      passion: passionSum,
      vocation: vocationSum,
      mission: missionSum,
      profession: professionSum,
      coreIntersection: combinedIntersection,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Title & Action Directives */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            <Sparkle className="w-3.5 h-3.5" />
            {i18nConfig.ui.badge}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
            {i18nConfig.ui.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {i18nConfig.ui.subtitle}
          </p>
        </div>

        {/* Quick Tools: Fill Demo & Auto-Synthesize */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button
            type="button"
            onClick={() => loadDemoData(language)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-300 dark:border-slate-700 shadow-xs"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{i18nConfig.ui.fillDemo}</span>
          </button>
          <button
            type="button"
            onClick={handleAutoSynthesize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 transition-all border border-indigo-200 dark:border-indigo-800 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{i18nConfig.ui.synthesizeBtn}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Gauge */}
      <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>
              {completedFields} / {totalFields} {i18nConfig.ui.progress}
            </span>
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(5, completionPercentage)}%` }}
          />
        </div>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabsList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]"
                  : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className="space-y-6">
        {/* Render Regular Pillar Questions (Passion, Vocation, Mission, Profession, Synthesis) */}
        {activeTab !== "archetype" && (() => {
          const activePillarConfig = pillars.find((p) => p.id === activeTab);
          if (!activePillarConfig) return null;
          const Icon = PILLAR_ICONS[activePillarConfig.iconName] || Sparkles;

          return (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {activePillarConfig.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activePillarConfig.desc}
                  </p>
                </div>
              </div>

              {/* Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activePillarConfig.questions.map((q) => {
                  const currentValue = ((ikigai as any)[q.key] as string) || "";
                  return (
                    <div
                      key={q.key}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all space-y-2 backdrop-blur-xs flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                          {q.label}
                        </label>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {q.hint}
                        </p>
                      </div>
                      <textarea
                        rows={3}
                        value={currentValue}
                        onChange={(e) => updateIkigai({ [q.key]: e.target.value })}
                        placeholder={q.placeholder}
                        className="w-full text-xs rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Additional Monetization Selector if in Profession Pillar */}
              {activeTab === "profession" && (
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Select Primary Monetization Blueprint</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {i18nConfig.ui.monetizationModels.map((m) => {
                      const isSelected = ikigai.monetizationModel === m.id || ikigai.monetizationModel === m.label;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => updateIkigai({ monetizationModel: m.label })}
                          className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Tab 6: Brand Archetype & Core Values */}
        {activeTab === "archetype" && (
          <div className="space-y-8 animate-fade-in">
            {/* Brand Archetype Selection */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-600" />
                  {t("step0.archetype_title")}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("step0.archetype_desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ARCHETYPES.map((arch) => {
                  const Icon = arch.icon;
                  const isSelected = ikigai.archetype === arch.id;
                  const localizedArchTitle = t(`archetype.${arch.id}` as any) || arch.title;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => updateIkigai({ archetype: arch.id })}
                      className={`p-4 rounded-2xl text-left transition-all duration-200 border relative ${
                        isSelected
                          ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20"
                          : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "gradient-brand text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {localizedArchTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        {arch.desc}
                      </p>
                      <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400">
                        Tone: {arch.tone}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Values Multi-Select */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t("step0.values_title")}
              </h3>
              <p className="text-xs text-slate-500">{t("step0.values_desc")}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED_VALUES.map((val) => {
                  const isSelected = coreValuesList.includes(val);
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => toggleCoreValue(val)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/30 scale-105"
                          : "bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                      }`}
                    >
                      {isSelected ? `✓ ${val}` : `+ ${val}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Intra-Pillar Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          disabled={currentTabIdx === 0}
          onClick={() => {
            if (currentTabIdx > 0) setActiveTab(tabsList[currentTabIdx - 1].id);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Pillar</span>
        </button>

        <button
          type="button"
          disabled={currentTabIdx === tabsList.length - 1}
          onClick={() => {
            if (currentTabIdx < tabsList.length - 1) setActiveTab(tabsList[currentTabIdx + 1].id);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 disabled:opacity-30 disabled:pointer-events-none transition-all border border-indigo-200 dark:border-indigo-800"
        >
          <span>Next Pillar</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
