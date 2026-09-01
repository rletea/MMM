"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { Users, Target, AlertCircle, HelpCircle, Layers, Plus } from "lucide-react";

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
          <Target className="w-4 h-4" /> Step 3 • Audience & Resources
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Laser-Target Your Ideal Customer Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          High-converting hooks speak directly to the urgent pains and silent buying objections of your specific economic buyers.
        </p>
      </div>

      {/* ICP Demographics */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Users className="w-4 h-4 text-indigo-500" /> ICP Demographics & Economic Buyer Profile *
        </label>
        <p className="text-xs text-slate-500">
          Who holds the purchasing power? Include job title, company size, revenue stage, or core motivation.
        </p>
        <textarea
          value={audience.icpDemographics}
          onChange={(e) => updateAudience({ icpDemographics: e.target.value })}
          rows={3}
          placeholder="e.g. B2B founders, agency owners, and high-ticket service providers generating $20k-$100k/mo seeking predictable authority without hiring a 5-person marketing team..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Pain Triggers */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-rose-500" /> Primary Pain Triggers (Pick 2–4)
        </label>
        <p className="text-xs text-slate-500">
          These form the psychological tension in your daily hooks.
        </p>

        <div className="flex flex-wrap gap-2">
          {COMMON_PAIN_TRIGGERS.map((pain) => {
            const isSelected = audience.painTriggers.includes(pain);
            return (
              <button
                key={pain}
                type="button"
                onClick={() => togglePainTrigger(pain)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-rose-500 text-white border-rose-500 shadow-sm scale-105"
                    : "bg-slate-100/80 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                {isSelected ? `✓ ${pain}` : `+ ${pain}`}
              </button>
            );
          })}
        </div>

        {/* Custom Pain Trigger Input */}
        <form onSubmit={handleAddCustomPain} className="flex gap-2 pt-2">
          <input
            type="text"
            value={customPain}
            onChange={(e) => setCustomPain(e.target.value)}
            placeholder="Add custom pain trigger..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Pain
          </button>
        </form>
      </div>

      {/* Buying Objections */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-500" /> Core Buying Objections
        </label>
        <p className="text-xs text-slate-500">
          Select the hesitations your prospects have before converting.
        </p>

        <div className="flex flex-wrap gap-2">
          {COMMON_OBJECTIONS.map((obj) => {
            const isSelected = audience.buyingObjections.includes(obj);
            return (
              <button
                key={obj}
                type="button"
                onClick={() => {
                  const exists = audience.buyingObjections.includes(obj);
                  const next = exists
                    ? audience.buyingObjections.filter((o) => o !== obj)
                    : [...audience.buyingObjections, obj];
                  updateAudience({ buyingObjections: next });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm scale-105"
                    : "bg-slate-100/80 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                {isSelected ? `✓ ${obj}` : `+ ${obj}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Assets */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-500" /> Existing Marketing Assets (Optional)
        </label>
        <input
          type="text"
          value={audience.existingAssets}
          onChange={(e) => updateAudience({ existingAssets: e.target.value })}
          placeholder="e.g. Email list of 2,400 subscribers, 5k LinkedIn connections, 20 podcast episodes..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
