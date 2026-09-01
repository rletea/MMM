"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FullProfilePayload } from "@/lib/types";
import { BVIScorecard } from "@/components/dashboard/BVIScorecard";
import { ActionDirectives } from "@/components/dashboard/ActionDirectives";
import { QuickMetrics } from "@/components/dashboard/QuickMetrics";
import { NewUserOnboarding } from "@/components/dashboard/NewUserOnboarding";
import Link from "next/link";
import {
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DashboardPage() {
  const [profile, setProfile] = useState<FullProfilePayload | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/profile?lang=${language}`);
      const data = await res.json();
      if (data.data) {
        setProfile(data.data);
      } else {
        setProfile(null);
      }
      if (data.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-semibold text-slate-500">
          {t("dash.loading")}
        </span>
      </div>
    );
  }

  // If new user with no profile yet: render clean Fresh Start Onboarding
  if (!profile) {
    return <NewUserOnboarding userName={currentUser?.name} />;
  }

  const { businessProfile, diagnostic, strategy, contents } = profile;
  const todayPost = contents?.[0];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Bar / Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {t("dash.cmo_command")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {businessProfile?.businessName || "Your Brand"} • {t("dash.overview")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {businessProfile?.industry} • {businessProfile?.businessModel} • {businessProfile?.geoScope}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/wizard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t("dash.recalculate")}
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity"
          >
            <Calendar className="w-3.5 h-3.5" />
            {t("dash.open_studio")}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <QuickMetrics profile={profile} />

      {/* BVI Scorecard Section */}
      <BVIScorecard
        scoreBreakdown={diagnostic?.scoreBreakdown || {
          marketViability: 70,
          productMarketAlignment: 70,
          executionCapacity: 70,
          ikigaiCongruence: 70,
          channelSynergy: 70,
          totalScore: 70,
          tier: "HIGH_POTENTIAL",
          tierLabel: "High Potential",
          tierColor: "#4f46e5",
          strengths: [],
          bottlenecks: [],
          directives: [],
        }}
        businessName={businessProfile?.businessName || "Your Brand"}
      />

      {/* Action Directives & Risk Mitigation */}
      <ActionDirectives
        scoreBreakdown={diagnostic?.scoreBreakdown || {
          marketViability: 70,
          productMarketAlignment: 70,
          executionCapacity: 70,
          ikigaiCongruence: 70,
          channelSynergy: 70,
          totalScore: 70,
          tier: "HIGH_POTENTIAL",
          tierLabel: "High Potential",
          tierColor: "#4f46e5",
          strengths: [],
          bottlenecks: [],
          directives: [],
        }}
      />

      {/* Fast Action Footer */}
      <div className="p-6 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Ready to deploy this week's content schedule?
          </h3>
          <p className="text-xs text-slate-500">
            Head to the Content Studio to review your visual Midjourney prompts and short-form scripts.
          </p>
        </div>
        <Link
          href="/studio"
          className="px-6 py-3 rounded-2xl text-xs font-bold text-white gradient-brand shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Review 30-Day Calendar
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
