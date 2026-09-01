"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { Users, Target, AlertCircle, HelpCircle, Layers, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const COMMON_PAIN_TRIGGERS = [
  "Inconsistent lead pipeline",
  "High customer acquisition cost (CAC)",
  "Robotic or generic copy from agencies",
  "Founder content burnout / lack of time",
  "Low organic reach & poor engagement",
  "Lack of clear category differentiation",
  "Unpredictable revenue fluctuations",
  "Complex tools with high learning curve",
];

const COMMON_OBJECTIONS = [
  "Will this sound authentic to my voice?",
  "How much founder time does this demand weekly?",
  "We've tried agencies before and got burned.",
  "Budget constraints this quarter.",
  "Can this integrate with our existing CRM/workflow?",
  "Is the market too saturated for organic growth?",
];

export function Step3Audience() {
  const { audience, updateAudience, togglePainTrigger } = useWizardStore();
  const [customPain, setCustomPain] = useState("");
  const { t } = useLanguage();

  const handleAddCustomPain = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPain.trim()) {
      togglePainTrigger(customPain.trim());
      setCustomPain("");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Target className="w-4 h-4" /> {t("step3.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step3.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step3.desc")}
        </p>
      </div>

      {/* ICP Demographics */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Users className="w-4 h-4 text-indigo-500" /> {t("step3.icp")}
        </label>
        <textarea
          rows={2}
          value={audience.icpDemographics}
          onChange={(e) => updateAudience({ icpDemographics: e.target.value })}
          placeholder="e.g. Founders, CMOs, Agency owners managing 10+ employees with $50k+ MRR seeking predictable authority..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed"
        />
      </div>

      {/* Primary Pain Triggers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-500" /> {t("step3.pain")}
          </label>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {audience.painTriggers.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_PAIN_TRIGGERS.map((pain) => {
            const isSelected = audience.painTriggers.includes(pain);
            return (
              <button
                key={pain}
                type="button"
                onClick={() => togglePainTrigger(pain)}
                className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 shadow-xs font-bold"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {pain}
              </button>
            );
          })}
        </div>

        {/* Custom Pain Trigger Form */}
        <form onSubmit={handleAddCustomPain} className="flex gap-2 pt-1">
          <input
            type="text"
            value={customPain}
            onChange={(e) => setCustomPain(e.target.value)}
            placeholder="Add custom pain trigger..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>
      </div>

      {/* Buying Objections */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-500" /> {t("step3.objections")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_OBJECTIONS.map((obj) => {
            const isSelected = audience.buyingObjections.includes(obj);
            return (
              <button
                key={obj}
                type="button"
                onClick={() => {
                  const exists = audience.buyingObjections.includes(obj);
                  updateAudience({
                    buyingObjections: exists
                      ? audience.buyingObjections.filter((x) => x !== obj)
                      : [...audience.buyingObjections, obj],
                  });
                }}
                className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs font-bold"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {obj}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Assets */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-500" /> {t("step3.assets")}
        </label>
        <input
          type="text"
          value={audience.existingAssets || ""}
          onChange={(e) => updateAudience({ existingAssets: e.target.value })}
          placeholder="e.g. Email newsletter (1,200 subs), 4,500 LinkedIn connections, YouTube channel (500 subs)..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
