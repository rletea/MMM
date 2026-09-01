"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { useWizardStore } from "@/store/wizard-store";
import {
  Settings as SettingsIcon,
  Cpu,
  Key,
  Database,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Shield,
  Download,
  Building2,
  User,
} from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const { loadDemoData, resetWizard } = useWizardStore();

  const [aiProvider, setAiProvider] = useState("builtin");
  const [openaiKey, setOpenaiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Load stored keys from localStorage
    const savedProvider = localStorage.getItem("mmm_ai_provider") || "builtin";
    const savedOpenAI = localStorage.getItem("mmm_openai_key") || "";
    const savedGemini = localStorage.getItem("mmm_gemini_key") || "";
    const savedAnthropic = localStorage.getItem("mmm_anthropic_key") || "";

    setAiProvider(savedProvider);
    setOpenaiKey(savedOpenAI);
    setGeminiKey(savedGemini);
    setAnthropicKey(savedAnthropic);

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mmm_ai_provider", aiProvider);
    localStorage.setItem("mmm_openai_key", openaiKey);
    localStorage.setItem("mmm_gemini_key", geminiKey);
    localStorage.setItem("mmm_anthropic_key", anthropicKey);
    toast("AI settings and API keys updated!", "success");
  };

  const handleResetData = () => {
    if (confirm("Reset current wizard and diagnostic to factory demo profile?")) {
      loadDemoData();
      toast("Profile reset to sample demo data.", "info");
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all local storage session and wizard data?")) {
      localStorage.clear();
      resetWizard();
      toast("Local storage cleared.", "info");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <SettingsIcon className="w-4 h-4" /> Platform Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Settings & AI Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure external LLM providers, manage session credentials, and control data backups.
        </p>
      </div>

      {/* AI Provider & API Keys Form */}
      <form
        onSubmit={handleSaveAI}
        className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              AI Generation Engine
            </h2>
            <p className="text-xs text-slate-500">
              Select between the offline high-leverage synthesizer or live AI model completions.
            </p>
          </div>
        </div>

        {/* Engine Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: "builtin",
              title: "Built-In Synthesizer",
              desc: "Instant generation without requiring API keys.",
            },
            {
              id: "openai",
              title: "OpenAI (GPT-4o)",
              desc: "Live GPT-4o model via your personal API key.",
            },
            {
              id: "gemini",
              title: "Google Gemini 1.5",
              desc: "High-context multimodality via Gemini API.",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setAiProvider(item.id)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                aiProvider === item.id
                  ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-500 leading-snug">
                {item.desc}
              </div>
            </button>
          ))}
        </div>

        {/* API Key Inputs */}
        {aiProvider === "openai" && (
          <div className="space-y-2 pt-2 animate-fade-in">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-500" /> OpenAI API Key
            </label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {aiProvider === "gemini" && (
          <div className="space-y-2 pt-2 animate-fade-in">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-500" /> Google Gemini API Key
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity"
          >
            Save AI Settings
          </button>
        </div>
      </form>

      {/* Account / Session Info */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              User Profile & Session
            </h2>
            <p className="text-xs text-slate-500">
              Active authenticated session details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Email Account:</span>
            <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
              {currentUser?.email || "founder@nexusgrowth.io"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Session Status:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              Active • {currentUser?.isDemo ? "Demo Sandbox" : "Standard User"}
            </span>
          </div>
        </div>
      </div>

      {/* Danger & Maintenance Area */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-rose-200/40 dark:border-rose-950/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100 dark:border-rose-950/60">
          <Trash2 className="w-5 h-5 text-rose-500" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Data Maintenance & Reset
            </h2>
            <p className="text-xs text-slate-500">
              Reset wizard parameters or clear cached client store.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
            Reset to Sample Demo Profile
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All Local Storage
          </button>
        </div>
      </div>
    </div>
  );
}
