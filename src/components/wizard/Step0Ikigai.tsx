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
  CORE_VALUE_KEYS,
  normalizeCoreValues,
  getLocalizedCoreValue,
} from "@/lib/core-values";
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
  ArrowRight,
  Check,
  Award,
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


const PILLAR_ICONS: Record<string, any> = {
  Heart,
  Globe,
  Sparkles,
  Briefcase,
  Target,
};

export function Step0Ikigai() {
  const { ikigai, updateIkigai, toggleCoreValue, loadDemoData, ikigaiConfirmed, confirmIkigai } = useWizardStore();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("passion");

  const i18nConfig = IKIGAI_TRANSLATIONS[language] || IKIGAI_TRANSLATIONS.en;
  const pillars = useMemo(() => getIkigaiPillarConfig(language), [language]);

  const coreValuesList = useMemo(
    () => normalizeCoreValues(ikigai.coreValues || []),
    [ikigai.coreValues]
  );

  // Calculate completion stats across 30 AG-SPEC fields
  const totalFields = 30;
  const completedFields = useMemo(() => {
    let count = 0;
    const checkFields = [
      ikigai.p1_time_loss || ikigai.timeFlyActivities,
      ikigai.p1_spare_time_reading || ikigai.naturalTopics,
      ikigai.p1_average_tuesday || ikigai.idealTuesday,
      ikigai.p1_energizing_tasks || ikigai.energizingTasks,
      ikigai.p1_childhood_passions || ikigai.childhoodPassions,
      ikigai.p1_spark_debates || ikigai.sparkDebates,
      ikigai.p1_creative_outlets || ikigai.creativeOutlets,
      ikigai.p2_effortless_skills || ikigai.effortlessSkills,
      ikigai.p2_sought_advice || ikigai.soughtAdvice,
      ikigai.p2_hard_skills || ikigai.hardSkills,
      ikigai.p2_interpersonal_soft || ikigai.softSkills,
      ikigai.p2_success_patterns || ikigai.successPatterns,
      ikigai.p2_problem_solving || ikigai.problemSolvingWay,
      ikigai.p2_recurring_praise || ikigai.recurringPraise,
      ikigai.p3_systemic_injustice || ikigai.systemicProblems,
      ikigai.p3_community_to_help || ikigai.targetCommunity,
      ikigai.p3_unlimited_resource || ikigai.priorityCause,
      ikigai.p3_immediate_needs || ikigai.practicalNeeds,
      ikigai.p3_non_negotiables ||
        (coreValuesList.length > 0
          ? coreValuesList.map((v) => getLocalizedCoreValue(v, language)).join(", ")
          : undefined),
      ikigai.p3_future_gap || ikigai.decadeOutlook,
      ikigai.p3_legacy_impact || ikigai.desiredLegacy,
      ikigai.p4_past_paid_services || ikigai.pastPaidServices,
      ikigai.p4_market_paid_skills || ikigai.highValueSkills,
      ikigai.p4_commercial_hobbies || ikigai.commercialHobbies,
      ikigai.p4_high_value_roi || ikigai.economicImpact,
      ikigai.p4_premium_assets || ikigai.premiumOffers,
      ikigai.p4_growth_niches || ikigai.growthNiches,
      ikigai.p4_monetization_fit || ikigai.monetizationModel,
      ikigai.overlap_synthesis || ikigai.coreIntersection,
      ikigai.pilot_30_days || ikigai.pilotProject30Days,
    ];
    checkFields.forEach((val) => {
      if (val && typeof val === "string" && val.trim().length > 0) count++;
    });
    return count;
  }, [ikigai]);

  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Tab definitions with 7th Results & Confirmation tab
  const tabsList = [
    { id: "passion", label: i18nConfig.tabs.passion, icon: Heart, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/40" },
    { id: "vocation", label: i18nConfig.tabs.vocation, icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
    { id: "mission", label: i18nConfig.tabs.mission, icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
    { id: "profession", label: i18nConfig.tabs.profession, icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
    { id: "synthesis", label: i18nConfig.tabs.synthesis, icon: Target, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
    { id: "archetype", label: i18nConfig.tabs.archetype, icon: Compass, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
    { id: "results", label: i18nConfig.tabs.results || t("step0.results_tab"), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  ];

  const currentTabIdx = tabsList.findIndex((t) => t.id === activeTab);

  // Auto-synthesizer helper: compiles concise summary for legacy & prompt compatibility
  const handleAutoSynthesize = () => {
    const passionSum =
      ikigai.p1_energizing_tasks ||
      ikigai.p1_time_loss ||
      ikigai.energizingTasks ||
      ikigai.timeFlyActivities ||
      "";
    const vocationSum =
      ikigai.p2_effortless_skills ||
      ikigai.p2_hard_skills ||
      ikigai.effortlessSkills ||
      ikigai.hardSkills ||
      "";
    const missionSum =
      ikigai.p3_systemic_injustice ||
      ikigai.p3_community_to_help ||
      ikigai.priorityCause ||
      ikigai.systemicProblems ||
      "";
    const professionSum =
      ikigai.p4_market_paid_skills ||
      ikigai.p4_premium_assets ||
      ikigai.highValueSkills ||
      ikigai.premiumOffers ||
      "";

    const combinedIntersection =
      ikigai.overlap_synthesis ||
      ikigai.coreIntersection ||
      `Aligning ${passionSum.slice(0, 60)} with ${vocationSum.slice(0, 60)} to solve ${missionSum.slice(0, 60)}.`;

    updateIkigai({
      passion: passionSum,
      vocation: vocationSum,
      mission: missionSum,
      profession: professionSum,
      overlap_synthesis: combinedIntersection,
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
            onClick={() => loadDemoData(language, 0)}
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
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {completedFields} / {totalFields} {i18nConfig.ui.progress}
          </span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full gradient-brand rounded-full transition-all duration-300 shadow-xs"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Pillar Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
        {tabsList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                isActive
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
              <span>{tab.label}</span>
              {tab.id === "results" && ikigaiConfirmed && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Area */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 min-h-[460px]">
        {/* Tabs 1 to 5: Standard Ikigai Pillars & Synthesis */}
        {activeTab !== "archetype" && activeTab !== "results" && (() => {
          const currentPillar = pillars.find((p) => p.id === activeTab);
          if (!currentPillar) return null;
          const Icon = PILLAR_ICONS[currentPillar.iconName] || Sparkles;

          return (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs ${tabsList.find(t => t.id === activeTab)?.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {currentPillar.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {currentPillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {currentPillar.desc}
                  </p>
                </div>
              </div>

              {/* Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPillar.questions.map((q) => {
                  const val = (ikigai[q.key] as string) || "";
                  return (
                    <div
                      key={String(q.key)}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all space-y-2 shadow-2xs"
                    >
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                        {q.label}
                      </label>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-snug">
                        {q.hint}
                      </p>
                      <textarea
                        rows={2}
                        value={val}
                        onChange={(e) => updateIkigai({ [q.key]: e.target.value })}
                        placeholder={q.placeholder}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Special Monetization Blueprints for Pillar 4 */}
              {activeTab === "profession" && (
                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
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
                  const localizedDesc = t(`archetype.desc.${arch.id}` as any) || arch.desc;
                  const localizedTone = t(`archetype.tone.${arch.id}` as any) || arch.tone;

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
                        {localizedDesc}
                      </p>
                      <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400">
                        {t("archetype.tone_label")}: {localizedTone}
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
                {CORE_VALUE_KEYS.map((key) => {
                  const isSelected = coreValuesList.includes(key);
                  const label = getLocalizedCoreValue(key, language);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCoreValue(key)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/30 scale-105"
                          : "bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                      }`}
                    >
                      {isSelected ? `✓ ${label}` : `+ ${label}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Results & Confirmation Step */}
        {activeTab === "results" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Directive */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {t("step0.results_badge")}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {t("step0.results_title")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {t("step0.results_desc")}
                </p>
              </div>

              {ikigaiConfirmed ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0">
                  <Check className="w-4 h-4" />
                  <span>{t("step0.confirmed_badge")}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={confirmIkigai}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{t("step0.confirm_btn")}</span>
                </button>
              )}
            </div>

            {/* Core Intersection & Pilot Project Hero Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-amber-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Target className="w-4 h-4" />
                <span>{t("strategy.ikigai_intersection_title")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {t("step0.core_intersection_label")}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {ikigai.overlap_synthesis || ikigai.coreIntersection || t("step0.results_desc")}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {t("step0.pilot_action_label")}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {ikigai.pilot_30_days || ikigai.pilotProject30Days || "Launch a 30-day authority sprint aligned with your key strengths."}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Human Dimensions Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pillar 1: Passion */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-pink-200/70 dark:border-pink-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase">
                  <Heart className="w-4 h-4" />
                  <span>{i18nConfig.tabs.passion}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {ikigai.p1_energizing_tasks || ikigai.p1_time_loss || ikigai.passion || "—"}
                </p>
                {ikigai.p1_average_tuesday && (
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                    <strong>Tuesday:</strong> {ikigai.p1_average_tuesday}
                  </p>
                )}
              </div>

              {/* Pillar 2: Vocation */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-indigo-200/70 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  <Globe className="w-4 h-4" />
                  <span>{i18nConfig.tabs.vocation}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {ikigai.p2_effortless_skills || ikigai.p2_hard_skills || ikigai.vocation || "—"}
                </p>
                {ikigai.p2_recurring_praise && (
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                    <strong>Praise:</strong> {ikigai.p2_recurring_praise}
                  </p>
                )}
              </div>

              {/* Pillar 3: Mission */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-purple-200/70 dark:border-purple-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>{i18nConfig.tabs.mission}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {ikigai.p3_systemic_injustice || ikigai.p3_community_to_help || ikigai.mission || "—"}
                </p>
                {ikigai.p3_legacy_impact && (
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                    <strong>Legacy:</strong> {ikigai.p3_legacy_impact}
                  </p>
                )}
              </div>

              {/* Pillar 4: Profession */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  <Briefcase className="w-4 h-4" />
                  <span>{i18nConfig.tabs.profession}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {ikigai.p4_market_paid_skills || ikigai.p4_premium_assets || ikigai.profession || "—"}
                </p>
                {ikigai.monetizationModel && (
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                    <strong>Model:</strong> {ikigai.monetizationModel}
                  </p>
                )}
              </div>
            </div>

            {/* Archetype & Core Values Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t("step0.archetype_summary_label")}
                </span>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl gradient-brand text-white">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {t(`archetype.${ikigai.archetype}` as any) || ikigai.archetype?.replace(/_/g, " ")}
                    </div>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      {t("archetype.tone_label")}: {t(`archetype.tone.${ikigai.archetype}` as any) || "Authentic"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t("step0.core_values_summary_label")}
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {coreValuesList.length > 0 ? (
                    coreValuesList.map((val) => (
                      <span
                        key={val}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                      >
                        ✓ {getLocalizedCoreValue(val, language)}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None selected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Full-Width Confirmation Action */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={confirmIkigai}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t("step0.confirm_btn")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t("step0.prev_pillar")}</span>
        </button>

        {activeTab !== "results" ? (
          <button
            type="button"
            onClick={() => {
              if (currentTabIdx < tabsList.length - 1) setActiveTab(tabsList[currentTabIdx + 1].id);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all border border-indigo-200 dark:border-indigo-800 cursor-pointer"
          >
            <span>
              {activeTab === "archetype"
                ? `${t("step0.results_tab")} →`
                : t("step0.next_pillar")}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={confirmIkigai}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{t("step0.confirm_btn")}</span>
          </button>
        )}
      </div>
    </div>
  );
}
