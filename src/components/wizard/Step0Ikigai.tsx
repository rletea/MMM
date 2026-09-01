"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
  "Design Elegance",
  "Speed & Agility",
  "Zero Fluff / High Signal",
  "Customer Obsession",
  "Data-Driven Rigor",
  "Contrarian Innovation",
  "Uncompromising Quality",
  "Ethical Stewardship",
  "Community Empowerment",
];

export function Step0Ikigai() {
  const { ikigai, updateIkigai, toggleCoreValue } = useWizardStore();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {t("step0.badge")}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
          {t("step0.title")}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          {t("step0.desc")}
        </p>
      </div>

      {/* 4 Ikigai Core Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passion */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm">
            <Heart className="w-4 h-4" />
            <span>{t("step0.passion")}</span>
          </div>
          <p className="text-[11px] text-slate-500">{t("step0.passion_desc")}</p>
          <textarea
            rows={3}
            value={ikigai.passion}
            onChange={(e) => updateIkigai({ passion: e.target.value })}
            placeholder="e.g. Building intuitive developer tools, simplifying complex enterprise systems..."
            className="w-full text-xs rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-hidden transition-all"
          />
        </div>

        {/* Vocation */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>{t("step0.vocation")}</span>
          </div>
          <p className="text-[11px] text-slate-500">{t("step0.vocation_desc")}</p>
          <textarea
            rows={3}
            value={ikigai.vocation}
            onChange={(e) => updateIkigai({ vocation: e.target.value })}
            placeholder="e.g. Businesses are overwhelmed by disconnected marketing data and lack strategic clarity..."
            className="w-full text-xs rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all"
          />
        </div>

        {/* Mission */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{t("step0.mission")}</span>
          </div>
          <p className="text-[11px] text-slate-500">{t("step0.mission_desc")}</p>
          <textarea
            rows={3}
            value={ikigai.mission}
            onChange={(e) => updateIkigai({ mission: e.target.value })}
            placeholder="e.g. Democratizing tier-one CMO level strategy so every ambitious founder can scale profitably..."
            className="w-full text-xs rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-hidden transition-all"
          />
        </div>

        {/* Profession */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Briefcase className="w-4 h-4" />
            <span>{t("step0.profession")}</span>
          </div>
          <p className="text-[11px] text-slate-500">{t("step0.profession_desc")}</p>
          <textarea
            rows={3}
            value={ikigai.profession}
            onChange={(e) => updateIkigai({ profession: e.target.value })}
            placeholder="e.g. High-ticket B2B consulting, AI SaaS automation software, technical audits..."
            className="w-full text-xs rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden transition-all"
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
