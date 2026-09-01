"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES } from "./types";
import { translations, TranslationKey } from "./translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey, fallback?: string) => string;
  currentLangInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: TranslationKey, fallback?: string) => fallback || key,
  currentLangInfo: SUPPORTED_LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("mmm_app_lang") as LanguageCode | null;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("mmm_app_lang", lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      const langDict = translations[language] || translations.en;
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      const fallbackDict = translations.en;
      if (fallbackDict && fallbackDict[key]) {
        return fallbackDict[key];
      }
      return fallback || key;
    },
    [language]
  );

  const currentLangInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLangInfo }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
