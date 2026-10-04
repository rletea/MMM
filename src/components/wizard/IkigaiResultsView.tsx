"use client";

import React, { useState, useEffect } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BusinessFitProposal, IkigaiFitAnalysisResult } from "@/lib/types";
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Target,
  Wand2,
  Loader2,
  Zap,
  Coins,
  Shield,
  Layers,
  Check,
  RotateCcw,
} from "lucide-react";

interface IkigaiResultsViewProps {
  onContinue: () => void;
  onPrev: () => void;
}

const UI_TEXT: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  statementTitle: string;
  superpowersTitle: string;
  opportunityTitle: string;
  proposalsTitle: string;
  bestFitBadge: string;
  whyFit: string;
  monetization: string;
  mvp: string;
  selectModel: string;
  selectedModel: string;
  manualBtn: string;
  manualSelected: string;
  continueBtn: string;
  reanalyzeBtn: string;
  analyzing: string;
  selectRequired: string;
}> = {
  ro: {
    badge: "Diagnoză Ikigai Finalizată",
    title: "Rezultate Ikigai & Potrivire Business",
    subtitle: "Analiza celor 30 de răspunsuri a identificat direcțiile optime de business compatibile 100% cu personalitatea, abilitățile și potențialul tău de monetizare.",
    statementTitle: "Sinteza Ta Ikigai (Manifestul Personal)",
    superpowersTitle: "Superputeri Personale Extrase",
    opportunityTitle: "Oportunitate de Piață Țintită",
    proposalsTitle: "Modele de Business Recomandate (Top 3)",
    bestFitBadge: "Cea mai mare potrivire",
    whyFit: "De ce ți se potrivește:",
    monetization: "Calea de monetizare:",
    mvp: "MVP pe 30 de zile:",
    selectModel: "Adoptă acest model de business",
    selectedModel: "Model Adoptat ✓",
    manualBtn: "Vreau să definesc manual alt model",
    manualSelected: "Ai ales să definești manual modelul de afacere",
    continueBtn: "Continuă spre Arhetip & Valori",
    reanalyzeBtn: "Re-analizează",
    analyzing: "Se analizează cele 30 de răspunsuri Ikigai...",
    selectRequired: "Alege un model sau optează pentru definire manuală pentru a continua",
  },
  en: {
    badge: "Ikigai Discovery Complete",
    title: "Ikigai Results & Business Fit Analysis",
    subtitle: "Analysis of your 30 responses has synthesized your unique intersection and identified the top 3 high-leverage business models aligned with your personality and monetization potential.",
    statementTitle: "Your Core Ikigai Synthesis (Personal Manifesto)",
    superpowersTitle: "Identified Superpowers",
    opportunityTitle: "Target Market Opportunity",
    proposalsTitle: "Recommended Business Models (Top 3 Matches)",
    bestFitBadge: "Best Fit (Top Match)",
    whyFit: "Why you fit this model:",
    monetization: "Monetization Strategy:",
    mvp: "Recommended 30-Day MVP:",
    selectModel: "Adopt this business model",
    selectedModel: "Model Selected ✓",
    manualBtn: "I want to manually define my own model",
    manualSelected: "You chose to manually configure your business model",
    continueBtn: "Continue to Archetype & Values",
    reanalyzeBtn: "Re-analyze Fit",
    analyzing: "Synthesizing your 30 Ikigai inputs into optimal business models...",
    selectRequired: "Please select a business model or choose manual definition to proceed",
  },
  de: {
    badge: "Ikigai-Analyse Abgeschlossen",
    title: "Ikigai-Ergebnisse & Business-Match",
    subtitle: "Die Auswertung Ihrer 30 Antworten hat Ihre Stärken und die drei tragfähigsten Geschäftsmodelle ermittelt, die zu Ihrer Persönlichkeit und Ihrem Monetarisierungspotenzial passen.",
    statementTitle: "Ihre Ikigai-Kernsynthese",
    superpowersTitle: "Identifizierte Superkräfte",
    opportunityTitle: "Identifizierte Marktchance",
    proposalsTitle: "Empfohlene Geschäftsmodelle (Top 3)",
    bestFitBadge: "Beste Übereinstimmung",
    whyFit: "Warum dieses Modell zu Ihnen passt:",
    monetization: "Monetarisierungspfad:",
    mvp: "Empfohlenes 30-Tage-MVP:",
    selectModel: "Dieses Geschäftsmodell übernehmen",
    selectedModel: "Modell übernommen ✓",
    manualBtn: "Geschäftsmodell manuell definieren",
    manualSelected: "Manuelle Definition für Schritt 1 gewählt",
    continueBtn: "Weiter zu Archetyp & Werte",
    reanalyzeBtn: "Neu analysieren",
    analyzing: "Ikigai-Ergebnisse werden analysiert...",
    selectRequired: "Bitte wählen Sie ein Modell oder die manuelle Definition",
  },
  fr: {
    badge: "Diagnostic Ikigai Complété",
    title: "Résultats Ikigai & Adéquation Business",
    subtitle: "L'analyse de vos 30 réponses a identifié les modèles d'affaires optimaux alignés avec vos forces et votre potentiel de monétisation.",
    statementTitle: "Synthèse de Votre Ikigai",
    superpowersTitle: "Superpouvoirs Identifiés",
    opportunityTitle: "Opportunité de Marché Ciblée",
    proposalsTitle: "Modèles d'Affaires Recommandés (Top 3)",
    bestFitBadge: "Meilleure Adéquation",
    whyFit: "Pourquoi ce modèle vous correspond :",
    monetization: "Stratégie de monétisation :",
    mvp: "MVP Recommandé sur 30 jours :",
    selectModel: "Adopter ce modèle d'affaires",
    selectedModel: "Modèle Sélectionné ✓",
    manualBtn: "Je souhaite définir manuellement mon modèle",
    manualSelected: "Configuration manuelle sélectionnée",
    continueBtn: "Continuer vers Archétype & Valeurs",
    reanalyzeBtn: "Réanalyser",
    analyzing: "Analyse des 30 réponses Ikigai en cours...",
    selectRequired: "Veuillez choisir un modèle pour continuer",
  },
  it: {
    badge: "Diagnosi Ikigai Completata",
    title: "Risultati Ikigai & Fit di Business",
    subtitle: "L'analisi delle tue 30 risposte ha identificato i 3 modelli di business ottimali compatibili con le tue competenze e ambizioni.",
    statementTitle: "Sintesi Centrale del Tuo Ikigai",
    superpowersTitle: "Superpoteri Identificati",
    opportunityTitle: "Opportunità di Mercato",
    proposalsTitle: "Modelli di Business Raccomandati (Top 3)",
    bestFitBadge: "Migliore Compatibilità",
    whyFit: "Perché è ideale per te:",
    monetization: "Percorso di monetizzazione:",
    mvp: "MVP Raccomandato di 30 Giorni:",
    selectModel: "Adotta questo modello di business",
    selectedModel: "Modello Selezionato ✓",
    manualBtn: "Voglio definire manualmente un altro modello",
    manualSelected: "Definizione manuale scelta per lo Step 1",
    continueBtn: "Continua verso Archetipo & Valori",
    reanalyzeBtn: "Rianalizza",
    analyzing: "Analisi delle risposte Ikigai in corso...",
    selectRequired: "Seleziona un modello o l'opzione manuale per procedere",
  },
  pl: {
    badge: "Diagnoza Ikigai Zakończona",
    title: "Wyniki Ikigai i Dopasowanie Biznesowe",
    subtitle: "Analiza 30 odpowiedzi wyłoniła optymalne kierunki biznesowe idealnie dopasowane do Twojej osobowości i umiejętności.",
    statementTitle: "Kluczowa Synteza Twojego Ikigai",
    superpowersTitle: "Zidentyfikowane Supermoce",
    opportunityTitle: "Okazja Rynkowa",
    proposalsTitle: "Rekomendowane Modele Biznesowe (Top 3)",
    bestFitBadge: "Najwyższe Dopasowanie",
    whyFit: "Dlaczego to model dla Ciebie:",
    monetization: "Ścieżka monetyzacji:",
    mvp: "Rekomendowane MVP na 30 Dni:",
    selectModel: "Wybierz ten model biznesowy",
    selectedModel: "Model Wybrany ✓",
    manualBtn: "Chcę ręcznie zdefiniować inny model",
    manualSelected: "Wybrano ręczną definicję w Kroku 1",
    continueBtn: "Przejdź do Archetypu i Wartości",
    reanalyzeBtn: "Przeanalizuj ponownie",
    analyzing: "Analizowanie Twoich odpowiedzi Ikigai...",
    selectRequired: "Wybierz model lub definicję ręczną, aby kontynuować",
  },
  es: {
    badge: "Diagnóstico Ikigai Completado",
    title: "Resultados Ikigai & Ajuste de Negocio",
    subtitle: "El análisis de tus 30 respuestas ha sintetizado tu intersección y descubierto los 3 modelos de negocio más viables para ti.",
    statementTitle: "Tu Síntesis Central de Ikigai",
    superpowersTitle: "Superpoderes Personales Identificados",
    opportunityTitle: "Oportunidad de Mercado",
    proposalsTitle: "Modelos de Negocio Recomendados (Top 3)",
    bestFitBadge: "Mayor compatibilidad",
    whyFit: "Por qué encajas en este modelo:",
    monetization: "Vía de monetización:",
    mvp: "MVP Recomendado para 30 Días:",
    selectModel: "Adoptar este modelo de negocio",
    selectedModel: "Modelo Seleccionado ✓",
    manualBtn: "Quiero definir manualmente otro modelo",
    manualSelected: "Has elegido definir manualmente tu modelo",
    continueBtn: "Continuar hacia Arquetipo & Valores",
    reanalyzeBtn: "Re-analizar",
    analyzing: "Analizando tus 30 respuestas de Ikigai...",
    selectRequired: "Selecciona un modelo o la opción manual para continuar",
  },
};

export function IkigaiResultsView({ onContinue, onPrev }: IkigaiResultsViewProps) {
  const { ikigai, updateIkigai, selectBusinessModelFit } = useWizardStore();
  const { language } = useLanguage();
  const t = UI_TEXT[language] || UI_TEXT.en;

  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<IkigaiFitAnalysisResult | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(
    ikigai.selectedModelFit || null
  );

  const fetchFitAnalysis = async (force: boolean = false) => {
    // If proposals already saved in ikigai and not forcing re-analysis
    if (!force && ikigai.suggestedModels && ikigai.suggestedModels.length > 0 && ikigai.ikigaiSynthesis) {
      setAnalysis({
        ikigaiStatement: ikigai.ikigaiSynthesis,
        strengthsSummary: [
          ikigai.p2_effortless_skills || "Strategic synthesis",
          ikigai.p2_sought_advice || "Systemic diagnostic",
          ikigai.p2_recurring_praise || "Messaging clarity",
        ],
        marketOpportunity:
          ikigai.p3_systemic_injustice ||
          ikigai.systemicProblems ||
          "High-integrity market demand for genuine authority",
        businessProposals: ikigai.suggestedModels,
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem("mmm_openai_key") || undefined;
      const res = await fetch("/api/ikigai/analyze-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ikigai,
          language,
          apiKey,
          provider: apiKey ? "openai" : "builtin",
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const data = json.data as IkigaiFitAnalysisResult;
          setAnalysis(data);
          updateIkigai({
            ikigaiSynthesis: data.ikigaiStatement,
            suggestedModels: data.businessProposals,
            overlap_synthesis: data.ikigaiStatement,
          });

          // Pre-select top match if nothing is chosen yet
          if (!selectedModelId && data.businessProposals.length > 0) {
            const topMatch = data.businessProposals[0];
            setSelectedModelId(topMatch.title);
            selectBusinessModelFit(topMatch);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch Ikigai analysis:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFitAnalysis();
  }, [language]);

  const handleSelectModel = (proposal: BusinessFitProposal) => {
    setSelectedModelId(proposal.title);
    selectBusinessModelFit(proposal);
  };

  const handleSelectManual = () => {
    setSelectedModelId("MANUAL");
    updateIkigai({ selectedModelFit: "MANUAL" });
  };

  const canProceed = Boolean(selectedModelId);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900/60 border border-indigo-500/30 backdrop-blur-xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              {t.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchFitAnalysis(true)}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm transition-all self-start md:self-center cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{t.reanalyzeBtn}</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && !analysis && (
        <div className="p-12 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 animate-pulse">
            <Wand2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.analyzing}</h3>
            <p className="text-xs text-slate-500">Extracting superpowers, category moats, and monetization paths...</p>
          </div>
        </div>
      )}

      {/* Section 1: Core Ikigai Synthesis Graphic & Badges */}
      {analysis && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-indigo-200/60 dark:border-indigo-900/40 relative overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50 dark:from-slate-900/80 dark:via-indigo-950/30 dark:to-slate-900/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Target className="w-4 h-4" />
              {t.statementTitle}
            </div>

            <p className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl">
              "{analysis.ikigaiStatement}"
            </p>

            {/* Extracted Superpowers and Market Need */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-500" />
                  {t.superpowersTitle}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.strengthsSummary.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800/90 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 shadow-xs"
                    >
                      ★ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                  {t.opportunityTitle}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  {analysis.marketOpportunity}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Top 3 Business Fit Proposals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                {t.proposalsTitle}
              </h3>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {selectedModelId ? `✓ ${selectedModelId}` : t.selectRequired}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {analysis.businessProposals.map((proposal, idx) => {
                const isSelected = selectedModelId === proposal.title;
                const isTopMatch = idx === 0;

                return (
                  <div
                    key={proposal.id || idx}
                    className={`rounded-3xl p-5 transition-all duration-200 flex flex-col justify-between relative border ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-500/10 scale-[1.02]"
                        : "glass-card border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 hover:shadow-md"
                    }`}
                  >
                    {/* Top Badges */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {isTopMatch ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-sm">
                            ★ {t.bestFitBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            #{idx + 1}
                          </span>
                        )}

                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs">
                          <Zap className="w-3 h-3 fill-emerald-500" />
                          <span>{proposal.fitScore}%</span>
                        </div>
                      </div>

                      {/* Title & Model Type */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                          {proposal.businessModelType.replace(/_/g, " ")} • {proposal.industry}
                        </span>
                        <h4 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                          {proposal.title}
                        </h4>
                      </div>

                      {/* Why You Fit Bullets */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs">
                        <span className="text-[11px] font-bold text-slate-500 block">
                          {t.whyFit}
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                          {proposal.whyYouFit.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                              <span className="text-indigo-500 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Monetization & 30-Day MVP */}
                      <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Coins className="w-3 h-3 text-amber-500" />
                            {t.monetization}
                          </span>
                          <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                            {proposal.monetizationPath}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Target className="w-3 h-3 text-emerald-500" />
                            {t.mvp}
                          </span>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                            {proposal.recommended30DayMVP}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                      <button
                        type="button"
                        onClick={() => handleSelectModel(proposal)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-102"
                            : "bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>{t.selectedModel}</span>
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{t.selectModel}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manual Override Alternative */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {selectedModelId === "MANUAL"
                  ? `✓ ${t.manualSelected}`
                  : "Preferi să introduci complet de la zero detaliile afacerii?"}
              </span>
              <button
                type="button"
                onClick={handleSelectManual}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedModelId === "MANUAL"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 ring-2 ring-indigo-500"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 underline"
                }`}
              >
                {t.manualBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Actions */}
      <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          ← Pilonul Anterior
        </button>

        <div className="flex items-center gap-3">
          {!canProceed && (
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium hidden sm:inline animate-pulse">
              {t.selectRequired}
            </span>
          )}
          <button
            type="button"
            onClick={onContinue}
            disabled={!canProceed}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              canProceed
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:scale-102 active:scale-98"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60"
            }`}
          >
            <span>{t.continueBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
