"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  Award,
  Layers,
  Calendar,
  Share2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-24 pb-20 animate-fade-in overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow orbs behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-sm animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{t("landing.hero_badge")}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          {t("landing.hero_title_1")} <br />
          <span className="gradient-text">{t("landing.hero_title_2")}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("landing.hero_subtitle")}
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/wizard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white gradient-brand shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5" />
            {t("landing.hero_cta_wizard")}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            {t("landing.hero_cta_demo")}
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t("landing.trust_bvi")}
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t("landing.trust_studio")}
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t("landing.trust_export")}
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t("landing.trust_nokey")}
          </div>
        </div>
      </section>

      {/* Interactive Platform Preview Graphic */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-6 sm:p-10 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-950/60 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                {t("landing.arch_badge")}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {t("landing.arch_title")}
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm flex items-center gap-1"
            >
              {t("landing.live_demo")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl gradient-brand text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {t("landing.card1_title")}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("landing.card1_desc")}
              </p>
            </div>

            {/* Step 2 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {t("landing.card2_title")}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("landing.card2_desc")}
              </p>
            </div>

            {/* Step 3 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {t("landing.card3_title")}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("landing.card3_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Multi-Channel Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t("landing.omni_badge")}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t("landing.omni_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            {t("landing.omni_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl glass-card border border-blue-200/60 dark:border-blue-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-[#0a66c2] uppercase">LinkedIn</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.li_title")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("landing.li_desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-cyan-200/60 dark:border-cyan-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-cyan-500 uppercase">TikTok & Reels</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.tt_title")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("landing.tt_desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-rose-200/60 dark:border-rose-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-rose-500 uppercase">Instagram</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.ig_title")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("landing.ig_desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-emerald-200/60 dark:border-emerald-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-emerald-500 uppercase">Email Newsletter</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.em_title")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("landing.em_desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-indigo-200/60 dark:border-indigo-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-[#1877f2] uppercase">Facebook</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.fb_title")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("landing.fb_desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-purple-200/60 dark:border-purple-950/60 space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-purple-500 uppercase">{t("landing.sched_badge")}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t("landing.sched_title")}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t("landing.sched_desc")}
              </p>
            </div>
            <Link
              href="/wizard"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {t("landing.get_started_now")} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action footer section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <div className="p-10 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-900 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t("landing.cta_footer_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {t("landing.cta_footer_subtitle")}
          </p>
          <div className="pt-2">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white gradient-brand shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              {t("landing.cta_footer_btn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
