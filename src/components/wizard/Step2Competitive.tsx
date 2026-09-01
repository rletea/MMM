"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { MarketSaturationType } from "@/lib/types";
import { Shield, Plus, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SATURATION_TIERS: {
  id: MarketSaturationType;
  title: string;
  desc: string;
  badgeColor: string;
}[] = [
  {
    id: "LOW",
    title: "Low Saturation (Blue Ocean)",
    desc: "Novel category or uncontested niche. High education needed, low competition.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  {
    id: "MEDIUM",
    title: "Medium (Growing Market)",
    desc: "Established category with room for differentiated entrants with superior positioning.",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300",
  },
  {
    id: "HIGH",
    title: "High (Crowded Space)",
    desc: "Many active players with similar claims. Demands distinct wedge & sharp storytelling.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300",
  },
  {
    id: "RED_OCEAN",
    title: "Red Ocean (Intensely Saturated)",
    desc: "Commoditized market. Price wars common. Requires radical differentiation or proprietary moat.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300",
  },
];

export function Step2Competitive() {
  const { competitive, updateCompetitive, addCompetitor, removeCompetitor } = useWizardStore();
  const [newComp, setNewComp] = useState("");
  const { t } = useLanguage();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComp.trim()) {
      addCompetitor(newComp.trim());
      setNewComp("");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Shield className="w-4 h-4" /> {t("step2.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step2.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step2.desc")}
        </p>
      </div>

      {/* Differentiator Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white">
            {t("step2.differentiator")}
          </label>
          <span className="text-xs text-slate-400">
            {competitive.differentiator.length} characters
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t("step2.differentiator_desc")}
        </p>
        <textarea
          rows={3}
          value={competitive.differentiator}
          onChange={(e) => updateCompetitive({ differentiator: e.target.value })}
          placeholder="e.g. We have a proprietary Ikigai + BVI algorithm that synthesizes hyper-authentic content..."
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
        />
      </div>

      {/* Market Saturation Tiers */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white">
          {t("step2.saturation")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SATURATION_TIERS.map((tier) => {
            const isSelected = competitive.marketSaturation === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => updateCompetitive({ marketSaturation: tier.id })}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                    : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {tier.title}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.badgeColor}`}>
                    {tier.id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {tier.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Competitors List */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white">
          {t("step2.competitors")}
        </label>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newComp}
            onChange={(e) => setNewComp(e.target.value)}
            placeholder="Add competitor name or alternative (e.g. Generic Agency, Tool X)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-1">
          {competitive.competitors.map((comp, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs"
            >
              {comp}
              <button
                type="button"
                onClick={() => removeCompetitor(idx)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Retention Rate */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("step2.retention")}
        </label>
        <select
          value={competitive.retentionRate || "80%+"}
          onChange={(e) => updateCompetitive({ retentionRate: e.target.value })}
          className="w-full sm:w-72 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="90%+ (Exceptional LTV / Recurring)">90%+ (Exceptional LTV / Recurring)</option>
          <option value="75%–90% (Healthy Retention)">75%–90% (Healthy Retention)</option>
          <option value="50%–75% (Moderate Churn)">50%–75% (Moderate Churn)</option>
          <option value="<50% (High Churn / One-off Transactional)">&lt;50% (High Churn / One-off Transactional)</option>
        </select>
      </div>
    </div>
  );
}
