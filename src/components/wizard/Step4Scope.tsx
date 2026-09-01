"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { ChannelType, ReviewCadenceType } from "@/lib/types";
import {
  Share2,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Video,
  CheckCircle2,
  Calendar,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CHANNELS_CONFIG: {
  id: ChannelType;
  name: string;
  format: string;
  desc: string;
  icon: any;
  colorClass: string;
  activeBorder: string;
}[] = [
  {
    id: "LINKEDIN",
    name: "LinkedIn",
    format: "Authority Posts & Story Frameworks",
    desc: "B2B thought leadership, founder origin stories, and client case study teardowns.",
    icon: Linkedin,
    colorClass: "text-[#0a66c2]",
    activeBorder: "border-[#0a66c2] bg-blue-50/50 dark:bg-blue-950/40",
  },
  {
    id: "EMAIL",
    name: "Email Newsletter",
    format: "High-Converting Weekly Editions",
    desc: "Owned audience nurture, high-ticket conversion sequences, and weekly digests.",
    icon: Mail,
    colorClass: "text-emerald-500",
    activeBorder: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40",
  },
  {
    id: "INSTAGRAM",
    name: "Instagram",
    format: "Visual Carousels & Reels",
    desc: "Swipeable framework breakdowns, aesthetic brand identity, and story engagement.",
    icon: Instagram,
    colorClass: "text-rose-500",
    activeBorder: "border-rose-500 bg-rose-50/50 dark:bg-rose-950/40",
  },
  {
    id: "TIKTOK",
    name: "TikTok",
    format: "Short-Form Video Scripts",
    desc: "Viral 3-second hook scripts, scene directions, audio cues, and direct CTAs.",
    icon: Video,
    colorClass: "text-cyan-400",
    activeBorder: "border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/40",
  },
  {
    id: "FACEBOOK",
    name: "Facebook",
    format: "Long-Form Value & Direct Response",
    desc: "Community group discussions, organic brand authority, and direct conversion copy.",
    icon: Facebook,
    colorClass: "text-[#1877f2]",
    activeBorder: "border-[#1877f2] bg-indigo-50/50 dark:bg-indigo-950/40",
  },
];

const STRATEGIC_GOALS = [
  "Establish Brand Category Authority",
  "Generate High-Ticket Inbound Leads",
  "Nurture Existing Audience Retention",
  "Drive Direct E-Commerce Sales",
  "Build Automated 30-Day Distribution",
  "Accelerate Community & Word of Mouth",
];

const REVIEW_CADENCES: { id: ReviewCadenceType; label: string; desc: string }[] = [
  { id: "WEEKLY", label: "Weekly Rapid Iteration", desc: "Agile sprints, daily monitoring, rapid hook testing." },
  { id: "BI_WEEKLY", label: "Bi-Weekly Review", desc: "Balanced pacing for teams with 5–15 hrs/wk capacity." },
  { id: "MONTHLY", label: "Monthly Strategic Overhaul", desc: "High-level macro adjustments and campaign reviews." },
  { id: "QUARTERLY", label: "Quarterly Deep Diagnostic", desc: "Long-range positioning pivots and asset restructuring." },
];

export function Step4Scope() {
  const { scope, updateScope, toggleChannel } = useWizardStore();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Share2 className="w-4 h-4" /> {t("step4.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step4.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step4.desc")}
        </p>
      </div>

      {/* Channel Selector Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white">
            {t("step4.channels")}
          </label>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {scope.activeChannels.length} active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {CHANNELS_CONFIG.map((channel) => {
            const Icon = channel.icon;
            const isSelected = scope.activeChannels.includes(channel.id);
            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => toggleChannel(channel.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? `${channel.activeBorder} shadow-md ring-2 ring-indigo-500/20`
                    : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
                        <Icon className={`w-4 h-4 ${channel.colorClass}`} />
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {channel.name}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-1">
                    {channel.format}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {channel.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Goals */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" /> {t("step4.goals")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {STRATEGIC_GOALS.map((goal) => {
            const isSelected = scope.primaryGoals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                onClick={() => {
                  const exists = scope.primaryGoals.includes(goal);
                  updateScope({
                    primaryGoals: exists
                      ? scope.primaryGoals.filter((g) => g !== goal)
                      : [...scope.primaryGoals, goal],
                  });
                }}
                className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategy Review Cadence */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-500" /> {t("step4.cadence")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REVIEW_CADENCES.map((cadence) => {
            const isSelected = scope.reviewCadence === cadence.id;
            return (
              <button
                key={cadence.id}
                type="button"
                onClick={() => updateScope({ reviewCadence: cadence.id })}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <div className="font-bold text-xs mb-1">{cadence.label}</div>
                <div
                  className={`text-[10px] leading-snug ${
                    isSelected ? "text-indigo-100" : "text-slate-400"
                  }`}
                >
                  {cadence.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
