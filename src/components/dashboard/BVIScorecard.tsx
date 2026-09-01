"use client";

import React from "react";
import { BVIScoreBreakdown } from "@/lib/types";
import { Award, ShieldAlert, CheckCircle2, TrendingUp, Sparkles, Activity } from "lucide-react";

interface BVIScorecardProps {
  scoreBreakdown: BVIScoreBreakdown;
  businessName: string;
}

export function BVIScorecard({ scoreBreakdown, businessName }: BVIScorecardProps) {
  const metrics = [
    {
      label: "Market Viability",
      score: scoreBreakdown.marketViability,
      desc: "Saturation & Moat Defense",
      color: "bg-indigo-500",
    },
    {
      label: "PM Alignment",
      score: scoreBreakdown.productMarketAlignment,
      desc: "ICP Pain-to-Solution Fit",
      color: "bg-sky-500",
    },
    {
      label: "Execution Capacity",
      score: scoreBreakdown.executionCapacity,
      desc: "Budget & Founder Time Ratio",
      color: "bg-emerald-500",
    },
    {
      label: "Ikigai Congruence",
      score: scoreBreakdown.ikigaiCongruence,
      desc: "Mission & Founder Archetype",
      color: "bg-purple-500",
    },
    {
      label: "Channel Readiness",
      score: scoreBreakdown.channelReadiness,
      desc: "Format & Distribution Fit",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl gradient-card-glow glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        {/* Radial Progress Score & Badge */}
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl ring-4 ring-indigo-500/20">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-800 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                style={{
                  stroke: scoreBreakdown.tierColor,
                  strokeDasharray: 251,
                  strokeDashoffset: 251 - (251 * scoreBreakdown.totalScore) / 100,
                  transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{scoreBreakdown.totalScore}</span>
              <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider -mt-1">
                BVI Index
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40">
              <Award className="w-3.5 h-3.5" />
              {scoreBreakdown.tierLabel}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {businessName} Scorecard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Calculated using the deterministic Business Viability Index algorithm across 5 core growth dimensions.
            </p>
          </div>
        </div>

        {/* Quick Status Tag */}
        <div className="flex flex-col items-center lg:items-end gap-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Risk Tier Status
          </span>
          <span
            className="text-base font-extrabold px-4 py-1.5 rounded-xl border"
            style={{
              borderColor: `${scoreBreakdown.tierColor}60`,
              color: scoreBreakdown.tierColor,
              backgroundColor: `${scoreBreakdown.tierColor}15`,
            }}
          >
            {scoreBreakdown.riskTier.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      {/* 5 Dimensional Breakdown Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{m.label}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{m.score}%</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-700`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
