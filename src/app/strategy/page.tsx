"use client";

import React, { useEffect, useState } from "react";
import { FullProfilePayload } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import {
  Layers,
  Sparkles,
  Award,
  Copy,
  Download,
  Calendar,
  Compass,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { exportStrategyToMarkdown, downloadBlobFile } from "@/lib/export-utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function StrategyPage() {
  const [profile, setProfile] = useState<FullProfilePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProfile(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-semibold text-slate-500">
          Loading Strategy Hub...
        </span>
      </div>
    );
  }

  const { businessProfile, ikigai, diagnostic, strategy, contents } = profile;

  const handleCopyManifesto = () => {
    navigator.clipboard.writeText(strategy.brandManifesto || strategy.positioningDoc);
    toast("Brand Manifesto copied to clipboard!", "success");
  };

  const handleDownloadStrategy = () => {
    const md = exportStrategyToMarkdown(
      businessProfile,
      strategy,
      diagnostic.scoreBreakdown,
      contents
    );
    downloadBlobFile(
      md,
      `${businessProfile.businessName.toLowerCase().replace(/\s+/g, "-")}-strategy.md`,
      "text/markdown"
    );
    toast("Strategy markdown downloaded!", "success");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {t("nav.strategy")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {businessProfile.businessName} • {t("strategy.title")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t("strategy.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyManifesto}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-indigo-500" />
            {t("strategy.copy_manifesto")}
          </button>
          <button
            type="button"
            onClick={handleDownloadStrategy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            {t("strategy.download_md")}
          </button>
        </div>
      </div>

      {/* Brand Manifesto Presentation Card */}
      <div className="p-8 sm:p-10 rounded-3xl gradient-card-glow glass-card border border-indigo-200/60 dark:border-indigo-950/60 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <Sparkles className="w-4 h-4" /> Official Brand Manifesto
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Archetype: {ikigai.archetype?.replace(/_/g, " ")}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 font-serif">
          {strategy.brandManifesto || strategy.positioningDoc}
        </div>

        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Core Values:</span>
          {ikigai.coreValues?.map((val) => (
            <span
              key={val}
              className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
            >
              {val}
            </span>
          ))}
        </div>
      </div>

      {/* Core Positioning Document */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          <Award className="w-4 h-4" /> Core Value Proposition & Positioning Document
        </div>
        <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
          {strategy.positioningDoc}
        </div>
      </div>

      {/* 4 Strategic Content Pillars */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Strategic Content Pillars
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Balanced to build category authority, solve acute pains, showcase founder craft, and drive direct lead conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategy.contentPillars?.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 transition-all shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Pillar {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {pillar.frequencyPerWeek}x / week
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-indigo-600 dark:text-indigo-400">Target Angle:</strong>{" "}
                  {pillar.targetAudienceAngle}
                </div>
              </div>

              {/* Sample Hooks */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  Sample Proven Hooks:
                </div>
                {pillar.sampleHooks?.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="text-xs font-medium text-slate-800 dark:text-slate-200 italic"
                  >
                    &ldquo;{h}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Cadence Matrix */}
      {strategy.weeklyCadence && strategy.weeklyCadence.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              <Calendar className="w-4 h-4" /> Weekly Distribution Matrix
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {strategy.reviewCadence} Strategic Cadence
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Day</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Format</th>
                  <th className="py-3 px-3">Strategic Goal</th>
                  <th className="py-3 px-3">Pillar Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {strategy.weeklyCadence.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                      {row.day}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-indigo-600 dark:text-indigo-400">
                      {row.channel}
                    </td>
                    <td className="py-3.5 px-3">{row.contentType}</td>
                    <td className="py-3.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      {row.strategicGoal}
                    </td>
                    <td className="py-3.5 px-3 truncate max-w-xs">{row.pillarFocus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
