"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                My Marketing Manager (MMM)
              </span>
              <span className="text-xs text-slate-500">
                {t("footer.tagline")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              {t("nav.dashboard")}
            </Link>
            <Link href="/studio" className="hover:text-indigo-600 transition-colors">
              {t("nav.studio")}
            </Link>
            <Link href="/strategy" className="hover:text-indigo-600 transition-colors">
              {t("nav.strategy")}
            </Link>
            <Link href="/wizard" className="hover:text-indigo-600 transition-colors">
              {t("nav.wizard")}
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} MMM. {t("footer.rights")}</span>
            <a
              href="https://github.com/rletea/MMM.git"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
