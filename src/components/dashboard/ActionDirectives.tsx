"use client";

import React from "react";
import { BVIScoreBreakdown } from "@/lib/types";
import { ShieldCheck, AlertTriangle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ActionDirectivesProps {
  scoreBreakdown: BVIScoreBreakdown;
}

export function ActionDirectives({ scoreBreakdown }: ActionDirectivesProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Strengths */}
      <div className="p-6 rounded-3xl glass-card border border-emerald-200/50 dark:border-emerald-950/40 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>{t("directives.strengths_title")}</span>
        </div>
        <div className="space-y-3">
          {scoreBreakdown.strengths.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed"
            >
              ✓ {s}
            </div>
          ))}
        </div>
      </div>

      {/* Identified Vulnerabilities / Risks */}
      <div className="p-6 rounded-3xl glass-card border border-amber-200/50 dark:border-amber-950/40 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>{t("directives.risks_title")}</span>
        </div>
        <div className="space-y-3">
          {scoreBreakdown.risks.length > 0 ? (
            scoreBreakdown.risks.map((r, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-xs font-medium text-amber-900 dark:text-amber-200 leading-relaxed"
              >
                ⚠️ {r}
              </div>
            ))
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-500">
              {t("directives.no_risks")}
            </div>
          )}
        </div>
      </div>

      {/* Action Directives */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-200/60 dark:border-indigo-950/60 space-y-4 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-4">
            <Zap className="w-5 h-5" />
            <span>{t("directives.directives_title")}</span>
          </div>
          <div className="space-y-3">
            {scoreBreakdown.actionDirectives.map((d, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-950 dark:text-indigo-200 leading-relaxed"
              >
                👉 {d}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/studio"
          className="mt-4 w-full py-3 rounded-xl text-xs font-bold text-white gradient-brand shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
        >
          {t("dash.open_studio")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
