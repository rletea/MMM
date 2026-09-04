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

import { NewUserOnboarding } from "@/components/dashboard/NewUserOnboarding";

export default function StrategyPage() {
  const [profile, setProfile] = useState<FullProfilePayload | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profile?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProfile(data.data);
        } else {
          setProfile(null);
        }
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-semibold text-slate-500">
          {t("strategy.loading")}
        </span>
      </div>
    );
  }

  if (!profile) {
    return <NewUserOnboarding userName={currentUser?.name} />;
  }

  const { businessProfile, ikigai, diagnostic, strategy, contents } = profile;

  const handleCopyManifesto = () => {
    navigator.clipboard.writeText(strategy.brandManifesto || strategy.positioningDoc);
    toast(t("studio.copied_toast"), "success");
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

  const archetypeKey = `archetype.${ikigai.archetype}` as any;
  const localizedArchetype = t(archetypeKey) || ikigai.archetype?.replace(/_/g, " ");

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
            <Sparkles className="w-4 h-4" /> {t("strategy.manifesto_badge")}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {t("strategy.archetype_label")} {localizedArchetype}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 font-serif">
          {strategy.brandManifesto || strategy.positioningDoc}
        </div>

        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">{t("strategy.core_values_label")}</span>
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

      {/* Ikigai Strategic Synthesis */}
      {(ikigai.overlap_synthesis || ikigai.coreIntersection || ikigai.pilot_30_days || ikigai.pilotProject30Days) && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-purple-500/10 border border-amber-300/60 dark:border-amber-900/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
            <Sparkles className="w-4 h-4" /> Ikigai Core Intersection & 30-Day Pilot
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(ikigai.overlap_synthesis || ikigai.coreIntersection) && (
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Core Intersection
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {ikigai.overlap_synthesis || ikigai.coreIntersection}
                </p>
              </div>
            )}
            {(ikigai.pilot_30_days || ikigai.pilotProject30Days) && (
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  30-Day Pilot Action Project
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {ikigai.pilot_30_days || ikigai.pilotProject30Days}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Core Positioning Document */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          <Award className="w-4 h-4" /> {t("strategy.positioning_badge")}
        </div>
        <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
          {strategy.positioningDoc}
        </div>
      </div>

      {/* 4 Strategic Content Pillars */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("strategy.pillars")}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("strategy.pillars_desc")}
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
                    {t("strategy.pillar_num")} {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {pillar.frequencyPerWeek} {t("strategy.per_week")}
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
              {pillar.sampleHooks && pillar.sampleHooks.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Sample Proven Hooks:
                  </div>
                  {pillar.sampleHooks.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="text-xs font-medium text-slate-800 dark:text-slate-200 italic"
                    >
                      &ldquo;{h}&rdquo;
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Cadence Matrix */}
      {strategy.weeklyCadence && strategy.weeklyCadence.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              <Calendar className="w-4 h-4" /> {t("strategy.matrix")}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {t("strategy.matrix_desc")}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">{t("strategy.matrix_day")}</th>
                  <th className="py-3 px-3">{t("strategy.matrix_channel")}</th>
                  <th className="py-3 px-3">{t("strategy.matrix_format")}</th>
                  <th className="py-3 px-3">{t("strategy.matrix_theme")}</th>
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
                    <td className="py-3.5 px-3">{row.format || (row as any).contentType}</td>
                    <td className="py-3.5 px-3 font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs">
                      {row.strategicTheme || (row as any).pillarFocus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom CTA to Studio */}
      <div className="p-8 rounded-3xl gradient-brand text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">
            {t("dash.open_studio")}
          </h3>
          <p className="text-xs text-indigo-100 max-w-xl">
            {t("studio.subtitle")}
          </p>
        </div>
        <Link
          href="/studio"
          className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-extrabold text-sm hover:bg-indigo-50 shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {t("dash.open_studio")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
