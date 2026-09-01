"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useWizardStore } from "@/store/wizard-store";
import {
  Sparkles,
  Compass,
  Layers,
  Calendar,
  Zap,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

interface NewUserOnboardingProps {
  userName?: string;
}

export function NewUserOnboarding({ userName }: NewUserOnboardingProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { loadDemoData, resetWizard } = useWizardStore();

  const handleStartFresh = () => {
    resetWizard();
    router.push("/wizard");
  };

  const handleExploreDemo = () => {
    loadDemoData();
    router.push("/wizard");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          {t("onboarding.fresh_badge")}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          {userName
            ? `${t("onboarding.welcome_title").replace("!", "")}, ${userName}!`
            : t("onboarding.welcome_title")}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {t("onboarding.welcome_subtitle")}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartFresh}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white gradient-brand shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            {t("onboarding.start_wizard_btn")}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            type="button"
            onClick={handleExploreDemo}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            {t("onboarding.explore_demo_btn")}
          </button>
        </div>
      </div>

      {/* 3 Step Interactive Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
        {/* Step 1 */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl gradient-brand text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
              {t("onboarding.step1_badge")}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("onboarding.step1_title")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("onboarding.step1_desc")}
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-200/60 dark:border-purple-800/60">
              {t("onboarding.step2_badge")}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("onboarding.step2_title")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("onboarding.step2_desc")}
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              {t("onboarding.step3_badge")}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("onboarding.step3_title")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("onboarding.step3_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
