"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { BusinessModelType } from "@/lib/types";
import {
  Briefcase,
  Building2,
  Cpu,
  ShoppingBag,
  MapPin,
  Video,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const BUSINESS_MODELS: {
  id: BusinessModelType;
  title: string;
  desc: string;
  icon: any;
}[] = [
  {
    id: "B2B_SERVICE",
    title: "B2B High-Ticket Service / Agency",
    desc: "Consulting, custom development, marketing agency, professional advisory.",
    icon: Briefcase,
  },
  {
    id: "B2B_SAAS",
    title: "B2B SaaS / Product",
    desc: "Recurring software subscriptions, workflow automations, enterprise platforms.",
    icon: Cpu,
  },
  {
    id: "B2C_ECOM",
    title: "B2C E-Commerce / DTC",
    desc: "Physical products, digital downloads, consumer lifestyle & apparel.",
    icon: ShoppingBag,
  },
  {
    id: "B2C_LOCAL",
    title: "B2C Local Business / Clinic",
    desc: "Brick-and-mortar storefronts, dental/medical practices, local contractors.",
    icon: MapPin,
  },
  {
    id: "CREATOR",
    title: "Creator / Media Brand / Educator",
    desc: "Courses, paid newsletters, monetization through audience and personal brand.",
    icon: Video,
  },
];

const STAGES = [
  { id: "PRE_LAUNCH", label: "Pre-Launch / Idea Phase" },
  { id: "TRACTION", label: "Early Traction ($5k–$25k/mo)" },
  { id: "SCALING", label: "Growth / Scaling ($25k–$100k+/mo)" },
  { id: "MATURE", label: "Mature Category Leader" },
];

export function Step1Business() {
  const { business, updateBusiness } = useWizardStore();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Building2 className="w-4 h-4" /> {t("step1.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step1.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step1.desc")}
        </p>
      </div>

      {/* Business Name & Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("step1.biz_name")}
          </label>
          <input
            type="text"
            value={business.businessName}
            onChange={(e) => updateBusiness({ businessName: e.target.value })}
            placeholder="e.g. Nexus Growth Labs"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("step1.biz_url")}
          </label>
          <input
            type="text"
            value={business.websiteUrl || ""}
            onChange={(e) => updateBusiness({ websiteUrl: e.target.value })}
            placeholder="https://yourbrand.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Business Model Cards */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white">
          {t("step1.model_title")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {BUSINESS_MODELS.map((model) => {
            const Icon = model.icon;
            const isSelected = business.businessModel === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => updateBusiness({ businessModel: model.id })}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                    : "glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "gradient-brand text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {model.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {model.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Industry & Geo Scope */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("step1.industry")}
          </label>
          <input
            type="text"
            value={business.industry}
            onChange={(e) => updateBusiness({ industry: e.target.value })}
            placeholder="e.g. AI Workflow Automation, Fintech Advisory..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("step1.geo")}
          </label>
          <select
            value={business.geoScope}
            onChange={(e) => updateBusiness({ geoScope: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Global / Remote">Global / Remote Worldwide</option>
            <option value="North America (US & CA)">North America (US & CA)</option>
            <option value="Europe & UK">Europe & UK</option>
            <option value="Asia-Pacific (APAC)">Asia-Pacific (APAC)</option>
            <option value="Latin America">Latin America</option>
            <option value="Local / Metro Area Only">Local / Metro Area Only</option>
          </select>
        </div>
      </div>

      {/* Stage */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-indigo-500" /> {t("step1.stage")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {STAGES.map((st) => {
            const isSelected = business.currentStage === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => updateBusiness({ currentStage: st.id })}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget and Hours Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" /> {t("step1.budget")}
            </label>
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              ${business.monthlyBudget.toLocaleString()} / mo
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={15000}
            step={250}
            value={business.monthlyBudget}
            onChange={(e) => updateBusiness({ monthlyBudget: Number(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>$0</span>
            <span>$5,000</span>
            <span>$15,000+</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-500" /> {t("step1.hours")}
            </label>
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              {business.weeklyHours} hours / week
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={business.weeklyHours}
            onChange={(e) => updateBusiness({ weeklyHours: Number(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>1 hr</span>
            <span>15 hrs</span>
            <span>40 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
