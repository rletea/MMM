"use client";

import React from "react";
import { FullProfilePayload } from "@/lib/types";
import { Calendar, Share2, Layers, CheckCircle2, Copy, Sparkles } from "lucide-react";
import Link from "next/link";

interface QuickMetricsProps {
  profile: FullProfilePayload;
}

export function QuickMetrics({ profile }: QuickMetricsProps) {
  const posts = profile.contents || [];
  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const copiedCount = posts.filter((p) => p.status === "COPIED").length;
  const scheduledCount = posts.filter((p) => p.status === "SCHEDULED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 30-Day Content Pipeline */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">30-Day Calendar</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {posts.length} Posts
          </div>
          <div className="text-[10px] text-slate-400">
            {publishedCount} Published • {copiedCount} Copied
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      {/* Active Channels */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Channels</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.strategy.activeChannels?.length || 0} Platforms
          </div>
          <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
            {profile.strategy.activeChannels?.join(", ")}
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <Share2 className="w-5 h-5" />
        </div>
      </div>

      {/* Content Pillars */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Content Pillars</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {profile.strategy.contentPillars?.length || 4} Pillars
          </div>
          <div className="text-[10px] text-slate-400">
            {profile.strategy.reviewCadence} Cadence
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400">
          <Layers className="w-5 h-5" />
        </div>
      </div>

      {/* Execution Health */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Execution Velocity</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {Math.round(((publishedCount + copiedCount) / Math.max(1, posts.length)) * 100)}%
          </div>
          <div className="text-[10px] text-slate-400">
            {draftCount} Drafts ready to deploy
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
