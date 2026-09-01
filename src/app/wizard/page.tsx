"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { Step0Ikigai } from "@/components/wizard/Step0Ikigai";
import { Step1Business } from "@/components/wizard/Step1Business";
import { Step2Competitive } from "@/components/wizard/Step2Competitive";
import { Step3Audience } from "@/components/wizard/Step3Audience";
import { Step4Scope } from "@/components/wizard/Step4Scope";
import { Step5Review } from "@/components/wizard/Step5Review";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Compass,
  Building2,
  Shield,
  Target,
  Share2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function WizardPage() {
  const { step, setStep, nextStep, prevStep, loadDemoData, resetWizard } = useWizardStore();
  const { t } = useLanguage();

  const STEPS = [
    { id: 0, title: t("wizard.step0_tab"), icon: Compass },
    { id: 1, title: t("wizard.step1_tab"), icon: Building2 },
    { id: 2, title: t("wizard.step2_tab"), icon: Shield },
    { id: 3, title: t("wizard.step3_tab"), icon: Target },
    { id: 4, title: t("wizard.step4_tab"), icon: Share2 },
    { id: 5, title: t("wizard.step5_tab"), icon: Sparkles },
  ];

  const progressPercent = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Top Banner & Demo Quick-loader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("wizard.title")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t("wizard.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDemoData}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/50 hover:bg-amber-100 transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            {t("wizard.auto_fill")}
          </button>
          <button
            type="button"
            onClick={resetWizard}
            title={t("wizard.reset")}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            {t("wizard.step_of")} {step + 1} / {STEPS.length}
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
            {progressPercent}% {t("wizard.completed")}
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full gradient-brand rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Icons Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.id;
            const isDone = step > s.id;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm"
                    : isDone
                    ? "text-emerald-600 dark:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    : "text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                    isCurrent
                      ? "gradient-brand text-white shadow-sm"
                      : isDone
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate max-w-[85px]">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Active Step Content Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl animate-fade-in min-h-[480px]">
        {step === 0 && <Step0Ikigai />}
        {step === 1 && <Step1Business />}
        {step === 2 && <Step2Competitive />}
        {step === 3 && <Step3Audience />}
        {step === 4 && <Step4Scope />}
        {step === 5 && <Step5Review />}
      </div>

      {/* Stepper Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("wizard.prev_step")}
        </button>

        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          {t("wizard.step_of")} {step + 1} / {STEPS.length}
        </div>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-brand hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {t("wizard.next_step")}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
