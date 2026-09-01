"use client";

import React, { useEffect, useState } from "react";
import { FullProfilePayload } from "@/lib/types";
import { BVIScorecard } from "@/components/dashboard/BVIScorecard";
import { ActionDirectives } from "@/components/dashboard/ActionDirectives";
import { QuickMetrics } from "@/components/dashboard/QuickMetrics";
import Link from "next/link";
import {
  Compass,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function DashboardPage() {
  const [profile, setProfile] = useState<FullProfilePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.data) {
        setProfile(data.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-semibold text-slate-500">
          Loading Viability Dashboard...
        </span>
      </div>
    );
  }

  const { businessProfile, diagnostic, strategy, contents } = profile;
  const todayPost = contents?.[0];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> CMO Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {businessProfile.businessName} Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {businessProfile.businessModel.replace(/_/g, " ")} • {businessProfile.industry} • {businessProfile.geoScope}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/wizard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 transition-colors"
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            Recalculate Diagnostic
          </Link>

          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity"
          >
            <Calendar className="w-4 h-4" />
            Open Content Studio
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <QuickMetrics profile={profile} />

      {/* Viability Scorecard */}
      <BVIScorecard
        scoreBreakdown={diagnostic.scoreBreakdown}
        businessName={businessProfile.businessName}
      />

      {/* Action Directives & Risk Insights */}
      <ActionDirectives scoreBreakdown={diagnostic.scoreBreakdown} />

      {/* Highlights: Today's Scheduled Post & Positioning Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Scheduled Action Post */}
        {todayPost && (
          <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Day 1 Next Up • {todayPost.channel}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {todayPost.contentType}
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {todayPost.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 line-clamp-1">
                {todayPost.hook}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-4 leading-relaxed font-sans whitespace-pre-line bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                {todayPost.bodyContent}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(todayPost.bodyContent);
                  toast("Post copy copied to clipboard!", "success");
                }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Copy Post Text
              </button>
              <Link
                href="/studio"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                View in Kanban Studio <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Brand Manifesto Preview Card */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" /> Brand Positioning Core
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              {businessProfile.businessName} Manifesto & Moat
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-5 leading-relaxed bg-slate-50/50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
              {strategy.brandManifesto || strategy.positioningDoc}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="text-xs text-slate-400 font-medium">
              4 Pillars Active • {strategy.reviewCadence} Cadence
            </span>
            <Link
              href="/strategy"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
            >
              Read Full Manifesto & Pillars <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
