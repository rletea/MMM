"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { MarketSaturationType } from "@/lib/types";
import { Shield, AlertTriangle, Plus, X, Award, Flame, Activity } from "lucide-react";

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
          <Shield className="w-4 h-4" /> Step 2 • Competitive Diagnostic
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Map Your Moat and Category Landscape
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Understanding competitor noise ensures our AI positioning attacks their blind spots rather than echoing tired tropes.
        </p>
      </div>

      {/* Core Differentiator */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" /> What is your #1 Unfair Advantage or Differentiator? *
        </label>
        <p className="text-xs text-slate-500">
          Why do clients pick you over alternatives? (e.g. proprietary algorithm, speed guarantee, specialized vertical focus, founder background...)
        </p>
        <textarea
          value={competitive.differentiator}
          onChange={(e) => updateCompetitive({ differentiator: e.target.value })}
          rows={3}
          placeholder="e.g. An integrated Ikigai-driven diagnostic engine combined with automated multi-channel campaign architectures that eliminates 90% of content production overhead..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Market Saturation Picker */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-rose-500" /> Market Saturation Level
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
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${tier.badgeColor}`}>
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

      {/* Competitors List Tag Input */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Key Competitors or Direct Alternatives (Add 2–5)
        </label>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newComp}
            onChange={(e) => setNewComp(e.target.value)}
            placeholder="e.g. Traditional Marketing Agencies, HubSpot, Freelancers..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-indigo-700 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-1">
          {competitive.competitors.map((comp, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {comp}
              <button
                type="button"
                onClick={() => removeCompetitor(idx)}
                className="hover:text-rose-500 transition-colors p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          {competitive.competitors.length === 0 && (
            <p className="text-xs text-slate-400 italic">No competitors added yet.</p>
          )}
        </div>
      </div>

      {/* Retention Rate */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-indigo-500" /> Estimated Client Retention / Repeat Rate
        </label>
        <select
          value={competitive.retentionRate || "85%"}
          onChange={(e) => updateCompetitive({ retentionRate: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="95%+ (World-Class Retention)">95%+ (World-Class Retention / Low Churn)</option>
          <option value="85% - 94% (Solid)">85% - 94% (Healthy & Predictable)</option>
          <option value="70% - 84% (Moderate Churn)">70% - 84% (Moderate Churn)</option>
          <option value="Under 70% (High Churn / Leaky Bucket)">Under 70% (High Churn / Leaky Bucket)</option>
        </select>
      </div>
    </div>
  );
}
