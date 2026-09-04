"use client";

import React, { useMemo, useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { calculateBVI } from "@/lib/bvi-calculator";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/Toast";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Sparkles,
  Award,
  Cpu,
  Layers,
  ArrowRight,
  Loader2,
  Key,
} from "lucide-react";

export function Step5Review() {
  const state = useWizardStore();
  const router = useRouter();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [useOpenAI, setUseOpenAI] = useState(false);

  // Calculate live BVI with active language
  const bvi = useMemo(() => calculateBVI(state, language), [state, language]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Trigger confetti on submit
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const response = await fetch("/api/wizard/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wizardState: state,
          apiKey: useOpenAI ? apiKey : undefined,
          provider: useOpenAI ? "openai" : "builtin",
          language: language,
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error || "Failed to generate strategy");
      }

      toast("Marketing Strategy and 30-Day Content Generated!", "success");
      router.push("/dashboard");
    } catch (err: any) {
      toast(err.message || "Generation error. Please check your inputs.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Sparkles className="w-4 h-4" /> {t("step5.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step5.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step5.desc")}
        </p>
      </div>

      {/* Live BVI Radial & Metric Card */}
      <div className="p-6 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-6">
          {/* Circular Score Badge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-full bg-slate-950 text-white shadow-xl ring-4 ring-indigo-500/30">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-800 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                style={{
                  stroke: bvi.tierColor,
                  strokeDasharray: 264,
                  strokeDashoffset: 264 - (264 * bvi.totalScore) / 100,
                  transition: "stroke-dashoffset 0.8s ease-in-out",
                }}
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-3xl font-extrabold tracking-tight">{bvi.totalScore}</span>
              <span className="text-[10px] block text-slate-400 font-semibold uppercase -mt-1">
                {t("step5.bvi_score")}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40">
              <Award className="w-3.5 h-3.5" />
              {bvi.tierLabel}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {state.business.businessName || "Your Brand"} • {t("scorecard.bvi_title")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              {t("scorecard.health_rating")}
            </p>
          </div>
        </div>

        {/* Subscore metric mini-bars */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-[280px]">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">{t("scorecard.market_viability")}</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{bvi.marketViability}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">{t("scorecard.pm_alignment")}</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{bvi.productMarketAlignment}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">{t("scorecard.execution_capacity")}</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{bvi.executionCapacity}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">{t("scorecard.ikigai_congruence")}</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{bvi.ikigaiCongruence}%</div>
          </div>
        </div>
      </div>

      {/* Summary of Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ikigai Summary */}
        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> {t("wizard.step0_tab")}
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {state.ikigai.archetype?.replace(/_/g, " ")}
          </div>
          <p className="text-xs text-slate-500 line-clamp-2">
            <strong>Mission:</strong> {state.ikigai.mission || state.ikigai.priorityCause || state.ikigai.coreIntersection || "Not specified"}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {state.ikigai.coreValues?.map((v) => (
              <span key={v} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Commercial Summary */}
        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            <Layers className="w-3.5 h-3.5" /> {t("wizard.step1_tab")}
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {state.business.businessModel?.replace(/_/g, " ")} • {state.business.industry || "General"}
          </div>
          <p className="text-xs text-slate-500">
            <strong>Budget:</strong> ${state.business.monthlyBudget}/mo • <strong>Time:</strong> {state.business.weeklyHours} hrs/week
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {state.scope.activeChannels.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Strategy Pipeline Options */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {t("settings.ai_engine")}
              </div>
              <div className="text-xs text-slate-500">
                {useOpenAI
                  ? "Live OpenAI GPT-4o Generation"
                  : "High-Leverage Built-In Synthesis Engine (Zero API Key required)"}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUseOpenAI(!useOpenAI)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {useOpenAI ? "Use Built-In Engine" : "+ Custom OpenAI Key"}
          </button>
        </div>

        {useOpenAI && (
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-500" /> OpenAI API Key (sk-...)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        )}
      </div>

      {/* Submit Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {t("step5.desc")}
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold text-white gradient-brand shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("step5.generating")}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              {t("step5.generate_btn")}
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
