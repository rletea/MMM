"use client";

import React from "react";
import { useWizardStore } from "@/store/wizard-store";
import { Step0Ikigai } from "@/components/wizard/Step0Ikigai";
import { Step1Business } from "@/components/wizard/Step1Business";
import { Step2Competitive } from "@/components/wizard/Step2Competitive";
import { Step3Audience } from "@/components/wizard/Step3Audience";
import { Step4Scope } from "@/components/wizard/Step4Scope";
import { Step5Review } from "@/components/wizard/Step5Review";
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

const STEPS = [
  { id: 0, title: "Ikigai Core", icon: Compass },
  { id: 1, title: "Business Model", icon: Building2 },
  { id: 2, title: "Moat Diagnostic", icon: Shield },
  { id: 3, title: "ICP & Pain", icon: Target },
  { id: 4, title: "Scope & Channels", icon: Share2 },
  { id: 5, title: "BVI Review", icon: Sparkles },
];

export default function WizardPage() {
  const { step, setStep, nextStep, prevStep, loadDemoData, resetWizard } = useWizardStore();

  const progressPercent = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Top Banner & Demo Quick-loader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Diagnostic & Ikigai Wizard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Answer the 6 diagnostic modules to calculate your BVI and generate your multi-channel marketing machine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDemoData}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/50 hover:bg-amber-100 transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            Auto-Fill Sample Data
          </button>
          <button
            type="button"
            onClick={resetWizard}
            title="Reset wizard"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full gradient-brand transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.id;
            const isCompleted = step > s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`p-2.5 rounded-xl text-left flex flex-col items-center sm:items-start gap-1 transition-all border ${
                  isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 shadow-sm"
                    : isCompleted
                    ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300/40 text-slate-700 dark:text-slate-300"
                    : "glass-card border-slate-200/60 dark:border-slate-800 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent
                        ? "text-indigo-600 dark:text-indigo-400"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-slate-400"
                    }`}
                  />
                  <span className="text-[11px] font-bold hidden sm:inline truncate">
                    {s.title}
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase sm:hidden truncate">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Body */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl min-h-[480px]">
        {step === 0 && <Step0Ikigai />}
        {step === 1 && <Step1Business />}
        {step === 2 && <Step2Competitive />}
        {step === 3 && <Step3Audience />}
        {step === 4 && <Step4Scope />}
        {step === 5 && <Step5Review />}
      </div>

      {/* Stepper Navigation Footer */}
      {step < 5 && (
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Step
          </button>

          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
