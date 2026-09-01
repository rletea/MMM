"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { ArchetypeType } from "@/lib/types";
import {
  Heart,
  Globe,
  Sparkles,
  Briefcase,
  Zap,
  ShieldCheck,
  Users,
  Palette,
  Binary,
  Compass,
} from "lucide-react";

const ARCHETYPES: {
  id: ArchetypeType;
  title: string;
  desc: string;
  icon: any;
  tone: string;
}[] = [
  {
    id: "VISIONARY_DISRUPTOR",
    title: "Visionary Disruptor",
    desc: "Challenges legacy paradigms, breaks conventions, and champions bold future states.",
    icon: Zap,
    tone: "Bold, Contrarian, Provocative",
  },
  {
    id: "TRUSTED_AUTHORITY",
    title: "Trusted Authority",
    desc: "Rigorous, methodology-first, data-backed frameworks with proven enterprise dependability.",
    icon: ShieldCheck,
    tone: "Analytical, Authoritative, Reassuring",
  },
  {
    id: "COMMUNITY_CATALYST",
    title: "Community Catalyst",
    desc: "Brings people together, fosters belonging, and leads collaborative movements.",
    icon: Users,
    tone: "Empathetic, Inclusive, High-Energy",
  },
  {
    id: "CREATIVE_ARTISAN",
    title: "Creative Artisan",
    desc: "Obsessed with design aesthetics, craft mastery, detail, and emotional resonance.",
    icon: Palette,
    tone: "Eloquent, Aesthetic, Meticulous",
  },
  {
    id: "DATA_SCIENTIST",
    title: "Data Scientist",
    desc: "Relies on quantitative testing, algorithmic optimization, and empirical evidence.",
    icon: Binary,
    tone: "Objective, Precise, Systems-Oriented",
  },
  {
    id: "TRANSFORMATION_GUIDE",
    title: "Transformation Guide",
    desc: "Mentors the audience through a hero's journey from deep struggle to breakthrough.",
    icon: Compass,
    tone: "Inspirational, Pedagogical, Supportive",
  },
];

const SUGGESTED_VALUES = [
  "Radical Transparency",
  "Asymmetric Leverage",
  "Craftsmanship",
  "Unapologetic Focus",
  "Customer Obsession",
  "Speed of Execution",
  "Integrity",
  "Simplicity",
  "Innovation",
  "Authenticity",
  "Long-term Thinking",
  "Empathy",
];

export function Step0Ikigai() {
  const { ikigai, updateIkigai, toggleCoreValue } = useWizardStore();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Sparkles className="w-4 h-4" /> Step 0 • Ikigai Core Engine
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Uncover Your Brand&apos;s Center of Gravity
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ikigai integrates your authentic founder drive with real commercial demand. This anchors all AI positioning and prevents robotic, generic marketing copy.
        </p>
      </div>

      {/* 4 Pillars of Ikigai */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passion */}
        <div className="p-5 rounded-2xl glass-card border border-indigo-100/60 dark:border-indigo-900/40 hover:border-indigo-400/50 transition-all space-y-2">
          <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 font-semibold text-sm">
            <Heart className="w-4 h-4" /> 1. Passion (What You Love)
          </div>
          <p className="text-xs text-slate-500">
            What topics or challenges energize you so much that you would explore them even without compensation?
          </p>
          <textarea
            value={ikigai.passion}
            onChange={(e) => updateIkigai({ passion: e.target.value })}
            placeholder="e.g. Designing transformative systems that give creators and founders true operational leverage..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Vocation */}
        <div className="p-5 rounded-2xl glass-card border border-indigo-100/60 dark:border-indigo-900/40 hover:border-indigo-400/50 transition-all space-y-2">
          <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-semibold text-sm">
            <Globe className="w-4 h-4" /> 2. Vocation (What the World Needs)
          </div>
          <p className="text-xs text-slate-500">
            What critical gap or acute pain in the market is begging for a better, more intelligent solution?
          </p>
          <textarea
            value={ikigai.vocation}
            onChange={(e) => updateIkigai({ vocation: e.target.value })}
            placeholder="e.g. Strategic growth advisory and automated multi-channel marketing architecture without agency bloat..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Mission */}
        <div className="p-5 rounded-2xl glass-card border border-indigo-100/60 dark:border-indigo-900/40 hover:border-indigo-400/50 transition-all space-y-2">
          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> 3. Mission (Why You Fight)
          </div>
          <p className="text-xs text-slate-500">
            What is the ultimate transformation or legacy you want your brand to be remembered for?
          </p>
          <textarea
            value={ikigai.mission}
            onChange={(e) => updateIkigai({ mission: e.target.value })}
            placeholder="e.g. Democratize elite CMO-level positioning and make marketing execution effortless for operators..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Profession */}
        <div className="p-5 rounded-2xl glass-card border border-indigo-100/60 dark:border-indigo-900/40 hover:border-indigo-400/50 transition-all space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-semibold text-sm">
            <Briefcase className="w-4 h-4" /> 4. Profession (What You Are Paid For)
          </div>
          <p className="text-xs text-slate-500">
            What is your core commercial deliverable, technical skill, or high-value offer?
          </p>
          <textarea
            value={ikigai.profession}
            onChange={(e) => updateIkigai({ profession: e.target.value })}
            placeholder="e.g. End-to-end B2B marketing systems, conversion architecture, and high-ticket customer acquisition..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Brand Archetype Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            Select Your Brand Archetype
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            This dictates the tone of voice, hook frameworks, and narrative structure generated across your campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARCHETYPES.map((arch) => {
            const Icon = arch.icon;
            const isSelected = ikigai.archetype === arch.id;
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => updateIkigai({ archetype: arch.id })}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border relative ${
                  isSelected
                    ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20"
                    : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? "gradient-brand text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {arch.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {arch.desc}
                </p>
                <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400">
                  Tone: {arch.tone}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Values Multi-Select */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Brand Core Values (Pick 3–5)
        </h3>
        <p className="text-xs text-slate-500">
          These principles will be woven into your Brand Manifesto and counter-intuitive thought leadership angles.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {SUGGESTED_VALUES.map((val) => {
            const isSelected = ikigai.coreValues.includes(val);
            return (
              <button
                key={val}
                type="button"
                onClick={() => toggleCoreValue(val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/30 scale-105"
                    : "bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                }`}
              >
                {isSelected ? `✓ ${val}` : `+ ${val}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
