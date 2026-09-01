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

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20 animate-fade-in overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow orbs behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-sm animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>The Next-Generation AI Marketing Command Center</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Your Full-Stack CMO. <br />
          <span className="gradient-text">Powered by Ikigai & BVI.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stop publishing shallow, robotic AI noise. Onboard through our deep 6-step diagnostic, calculate your mathematical Business Viability Index, and generate 30 days of high-converting multi-channel content anchored in your authentic founder moat.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/wizard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white gradient-brand shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5" />
            Launch 6-Step Diagnostic Wizard
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Explore Pre-Loaded Demo Sandbox
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mathematical BVI Algorithm
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 5-Platform Multi-Channel Studio
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Buffer & Hootsuite CSV Export
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero API Key Required
          </div>
        </div>
      </section>

      {/* Interactive Platform Preview Graphic */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-6 sm:p-10 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-950/60 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Platform Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                From Raw Founder Diagnostic to 30-Day Campaign Execution
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm flex items-center gap-1"
            >
              Live Demo View <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl gradient-brand text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Ikigai & Moat Diagnostic
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates Passion, Profession, Vocation, Mission, Archetype, and market saturation to prevent generic positioning.
              </p>
            </div>

            {/* Step 2 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                BVI Calculation Engine
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deterministic mathematical scoring from 0–100% calculating risk tiers, capacity constraints, and action directives.
              </p>
            </div>

            {/* Step 3 Card */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                30-Day Multi-Channel Studio
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kanban and Calendar workspace with full post copy, hook analysis, video scripts, Midjourney visual prompts, and 1-click export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Multi-Channel Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Omni-Channel Coverage
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Tailored Format Engines for Every Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Each post is synthesized natively for the attention dynamics of each specific social network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl glass-card border border-blue-200/60 dark:border-blue-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-[#0a66c2] uppercase">LinkedIn</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Thought Leadership & Authority</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Contrarian insights, founder origin stories, and 3-phase client case studies formatted for high engagement.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-cyan-200/60 dark:border-cyan-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-cyan-500 uppercase">TikTok & Reels</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Short-Form Video Scripts</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              0-3s visual hooks, on-screen text directions, scene-by-scene storyboard, and audio cue guides.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-rose-200/60 dark:border-rose-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-rose-500 uppercase">Instagram</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Carousels & Aesthetic Hooks</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Slide-by-slide educational teardowns with Midjourney image prompt descriptors included.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-emerald-200/60 dark:border-emerald-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-emerald-500 uppercase">Email Newsletter</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">High-Converting Digests</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subject lines, preview text, personal narrative frameworks, and primary sales/reply CTAs.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-indigo-200/60 dark:border-indigo-950/60 space-y-2 shadow-sm">
            <span className="text-xs font-extrabold text-[#1877f2] uppercase">Facebook</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Community Discussion Prompts</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Group discussion catalysts, client transformation spotlights, and retargeting hooks.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-purple-200/60 dark:border-purple-950/60 space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-purple-500 uppercase">One-Click Schedulers</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Instant Export & Pipeline</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Export directly to CSV formatted for Buffer, Hootsuite, and Meta Business Suite.
              </p>
            </div>
            <Link
              href="/wizard"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Get Started Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action footer section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <div className="p-10 rounded-3xl gradient-card-glow glass-card border border-indigo-200/80 dark:border-indigo-900 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Ready to Build Your Category-Dominant Marketing Machine?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Take the 5-minute diagnostic now. Unlock your BVI viability scorecard, brand positioning manifesto, and 30-day multi-channel calendar.
          </p>
          <div className="pt-2">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white gradient-brand shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              Begin Free Diagnostic
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
