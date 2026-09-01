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
    activeBorder: "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40",
  },
  {
    id: "FACEBOOK",
    name: "Facebook",
    format: "Community Discussion Prompts",
    desc: "Organic group discussions, social proof storytelling, and retargeting content.",
    icon: Facebook,
    colorClass: "text-[#1877f2]",
    activeBorder: "border-[#1877f2] bg-indigo-50/50 dark:bg-indigo-950/40",
  },
];

const STRATEGY_GOALS = [
  "Establish Category Authority",
  "Generate 15+ Inbound Qualified Inquiries / mo",
  "Build 30-Day Automated Content Distribution",
  "Nurture Existing Email List to Higher LTV",
  "Accelerate Short-Form Video Growth",
  "Scale Organic Reach Without Paid Ads",
];

const CADENCES: { id: ReviewCadenceType; label: string; desc: string }[] = [
  { id: "BIWEEKLY", label: "Bi-Weekly (Sprint Velocity)", desc: "Recalibrate strategy every 14 days for rapid experiments." },
  { id: "MONTHLY", label: "Monthly (Recommended)", desc: "Standard 30-day rhythm balancing consistency and data review." },
  { id: "QUARTERLY", label: "Quarterly (Macro Strategic)", desc: "Deep quarterly overhauls for established long-cycle products." },
];

export function Step4Scope() {
  const { scope, updateScope, toggleChannel, toggleGoal } = useWizardStore();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Share2 className="w-4 h-4" /> Step 4 • Scope & Channels
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Select Your Active Distribution Channels
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Choose where your audience spends attention. The AI engine will tailor format, hook styles, and visual prompts for each chosen channel.
        </p>
      </div>

      {/* Active Channels Grid */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>Active Channels (Select at least 1) *</span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {scope.activeChannels.length} Channels Active
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {CHANNELS_CONFIG.map((ch) => {
            const Icon = ch.icon;
            const isSelected = scope.activeChannels.includes(ch.id);
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => toggleChannel(ch.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border relative ${
                  isSelected
                    ? `${ch.activeBorder} shadow-md ring-2 ring-indigo-500/20`
                    : "glass-card border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm ${ch.colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {ch.name}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
                <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  Format: {ch.format}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {ch.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Strategic Goals */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" /> Primary Marketing Goals (Select 2–3)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {STRATEGY_GOALS.map((goal) => {
            const isSelected = scope.primaryGoals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                onClick={() => toggleGoal(goal)}
                className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <span>{goal}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Review Cadence */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-500" /> Strategy Recalibration Cadence
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CADENCES.map((cad) => {
            const isSelected = scope.reviewCadence === cad.id;
            return (
              <button
                key={cad.id}
                type="button"
                onClick={() => updateScope({ reviewCadence: cad.id })}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 shadow-sm ring-1 ring-indigo-500"
                    : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  {cad.label}
                </div>
                <div className="text-[10px] text-slate-500 leading-snug">
                  {cad.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
