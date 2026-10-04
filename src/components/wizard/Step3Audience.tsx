"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { Users, Target, AlertCircle, HelpCircle, Layers, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const COMMON_PAIN_TRIGGERS_BY_LANG: Record<string, string[]> = {
  de: [
    "Unbeständige Kunden-Pipeline",
    "Hohe Kundenakquisitionskosten (CAC)",
    "Roboterhafte oder austauschbare Texte von Agenturen",
    "Gründer-Content-Burnout / Zeitmangel",
    "Geringe organische Reichweite & schwaches Engagement",
    "Fehlende klare Differenzierung im Wettbewerb",
    "Unvorhersehbare Umsatzschwankungen",
    "Komplexe Tools mit steiler Lernkurve",
  ],
  ro: [
    "Pipeline inconsistent de oportunități",
    "Cost ridicat de achiziție a clienților (CAC)",
    "Texte robotice sau generice de la agenții",
    "Epuizarea fondatorului din cauza lipsei de timp",
    "Acoperire organică redusă & interacțiune slabă",
    "Lipsa unei diferențieri clare de categorie",
    "Fluctuații imprevizibile ale veniturilor",
    "Instrumente complexe cu curbă abruptă de învățare",
  ],
  fr: [
    "Pipeline de prospects irrégulier",
    "Coût d'acquisition client élevé (CAC)",
    "Textes impersonnels ou robotiques rédigés par des agences",
    "Épuisement du fondateur face au manque de temps",
    "Faible portée organique & faible engagement",
    "Manque de différenciation claire dans la catégorie",
    "Fluctuations imprévisibles du chiffre d'affaires",
    "Outils complexes à la prise en main difficile",
  ],
  it: [
    "Pipeline di contatti instabile",
    "Costo elevato di acquisizione clienti (CAC)",
    "Copy robotico o generico da agenzie esterne",
    "Burnout del fondatore per mancanza di tempo",
    "Copertura organica bassa & scarso engagement",
    "Mancanza di una netta differenziazione nel settore",
    "Fluttuazioni imprevedibili del fatturato",
    "Strumenti complessi con curva di apprendimento ripida",
  ],
  pl: [
    "Nieregularny napływ nowych zapytań",
    "Wysoki koszt pozyskania klienta (CAC)",
    "Sztuczne lub generyczne treści z agencji",
    "Wypalenie twórcze założyciela z powodu braku czasu",
    "Niski zasięg organiczny i słabe zaangażowanie",
    "Brak wyraźnego wyróżnika w kategorii rynkowej",
    "Nieprzewidywalne wahania przychodów",
    "Skomplikowane narzędzia o trudnej obsłudze",
  ],
  es: [
    "Flujo inconsistente de oportunidades",
    "Alto coste de adquisición de clientes (CAC)",
    "Textos robóticos o genéricos de agencias",
    "Agotamiento del fundador por falta de tiempo",
    "Bajo alcance orgánico y escaso compromiso",
    "Falta de diferenciación clara en la categoría",
    "Fluctuaciones impredecibles en los ingresos",
    "Herramientas complejas con curva de aprendizaje alta",
  ],
  en: [
    "Inconsistent lead pipeline",
    "High customer acquisition cost (CAC)",
    "Robotic or generic copy from agencies",
    "Founder content burnout / lack of time",
    "Low organic reach & poor engagement",
    "Lack of clear category differentiation",
    "Unpredictable revenue fluctuations",
    "Complex tools with high learning curve",
  ],
};

const COMMON_OBJECTIONS_BY_LANG: Record<string, string[]> = {
  de: [
    "Wird das authentisch nach meiner Stimme klingen?",
    "Wie viel Gründerzeit erfordert das wöchentlich?",
    "Wir haben schon schlechte Erfahrungen mit Agenturen gemacht.",
    "Budgetbeschränkungen in diesem Quartal.",
    "Lässt sich das in unsere bestehenden Workflows integrieren?",
    "Ist der Markt für organisches Wachstum zu gesättigt?",
  ],
  ro: [
    "Va suna autentic, în stilul vocii mele?",
    "Cât timp de fondator cere acest lucru în fiecare săptămână?",
    "Am mai lucrat cu agenții și am fost dezamăgiți.",
    "Constrângeri de buget în acest trimestru.",
    "Se poate integra cu fluxul nostru actual de lucru?",
    "Este piața prea saturată pentru creștere organică?",
  ],
  fr: [
    "Est-ce que cela sonnera authentiquement comme ma voix ?",
    "Combien de temps le fondateur doit-il consacrer par semaine ?",
    "Nous avons déjà été déçus par des agences par le passé.",
    "Contraintes budgétaires ce trimestre.",
    "Est-ce que cela s'intègre à nos outils actuels ?",
    "Le marché est-il trop saturé pour la croissance organique ?",
  ],
  it: [
    "Sembrerà davvero autentico rispetto alla mia voce?",
    "Quanto tempo del fondatore richiede ogni settimana?",
    "Abbiamo già avuto brutte esperienze con agenzie.",
    "Limiti di budget in questo trimestre.",
    "Si integra con i nostri strumenti attuali?",
    "Il mercato è troppo saturo per una crescita organica?",
  ],
  pl: [
    "Czy to zabrzmi autentycznie w moim stylu?",
    "Ile czasu założyciela wymaga to każdego tygodnia?",
    "Mamy złe doświadczenia ze współpracy z agencjami.",
    "Ograniczenia budżetowe w tym kwartale.",
    "Czy integruje się z naszymi obecnymi narzędziami?",
    "Czy rynek nie jest zbyt nasycony na wzrost organiczny?",
  ],
  es: [
    "¿Sonará auténtico con el tono de mi voz?",
    "¿Cuánto tiempo del fundador requiere cada semana?",
    "Ya hemos tenido malas experiencias con agencias.",
    "Restricciones de presupuesto este trimestre.",
    "¿Se integra con nuestras herramientas actuales?",
    "¿Está el mercado demasiado saturado para crecer orgánicamente?",
  ],
  en: [
    "Will this sound authentic to my voice?",
    "How much founder time does this demand weekly?",
    "We've tried agencies before and got burned.",
    "Budget constraints this quarter.",
    "Can this integrate with our existing CRM/workflow?",
    "Is the market too saturated for organic growth?",
  ],
};

export function Step3Audience() {
  const { audience, updateAudience, togglePainTrigger } = useWizardStore();
  const [customPain, setCustomPain] = useState("");
  const { language, t } = useLanguage();

  const commonPainTriggers = COMMON_PAIN_TRIGGERS_BY_LANG[language] || COMMON_PAIN_TRIGGERS_BY_LANG.en;
  const commonObjections = COMMON_OBJECTIONS_BY_LANG[language] || COMMON_OBJECTIONS_BY_LANG.en;

  const handleAddCustomPain = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPain.trim()) {
      togglePainTrigger(customPain.trim());
      setCustomPain("");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <Target className="w-4 h-4" /> {t("step3.badge")}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          {t("step3.title")}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("step3.desc")}
        </p>
      </div>

      {/* ICP Demographics */}
      <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Users className="w-4 h-4 text-indigo-500" /> {t("step3.icp")}
        </label>
        <textarea
          rows={2}
          value={audience.icpDemographics}
          onChange={(e) => updateAudience({ icpDemographics: e.target.value })}
          placeholder={t("aud.icp_placeholder") || "e.g. Founders, CMOs, Agency owners..."}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed"
        />
      </div>

      {/* Primary Pain Triggers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-500" /> {t("step3.pain")}
          </label>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {audience.painTriggers.length} {t("aud.selected")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {commonPainTriggers.map((pain) => {
            const isSelected = audience.painTriggers.includes(pain);
            return (
              <button
                key={pain}
                type="button"
                onClick={() => togglePainTrigger(pain)}
                className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 shadow-xs font-bold"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {pain}
              </button>
            );
          })}
        </div>

        {/* Custom Pain Trigger Form */}
        <form onSubmit={handleAddCustomPain} className="flex gap-2 pt-1">
          <input
            type="text"
            value={customPain}
            onChange={(e) => setCustomPain(e.target.value)}
            placeholder={t("aud.custom_pain_placeholder") || "Add custom pain trigger..."}
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> {t("aud.add_btn")}
          </button>
        </form>
      </div>

      {/* Buying Objections */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-500" /> {t("step3.objections")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {commonObjections.map((obj) => {
            const isSelected = audience.buyingObjections.includes(obj);
            return (
              <button
                key={obj}
                type="button"
                onClick={() => {
                  const exists = audience.buyingObjections.includes(obj);
                  updateAudience({
                    buyingObjections: exists
                      ? audience.buyingObjections.filter((x) => x !== obj)
                      : [...audience.buyingObjections, obj],
                  });
                }}
                className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs font-bold"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {obj}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Assets */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-500" /> {t("step3.assets")}
        </label>
        <input
          type="text"
          value={audience.existingAssets || ""}
          onChange={(e) => updateAudience({ existingAssets: e.target.value })}
          placeholder="e.g. Founder LinkedIn (4k connections), past email list (1k subs)..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
