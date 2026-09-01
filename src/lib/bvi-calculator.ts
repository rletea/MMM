import {
  WizardFormState,
  BVIScoreBreakdown,
  RiskTierType,
  BusinessModelType,
  ChannelType,
} from "./types";

export function calculateBVI(
  state: WizardFormState,
  lang: string = "en"
): BVIScoreBreakdown {
  const { ikigai, business, competitive, audience, scope } = state;

  // 1. Ikigai Congruence Score (0 - 100)
  let ikigaiScore = 50;
  if (ikigai.passion && ikigai.passion.trim().length > 15) ikigaiScore += 12;
  if (ikigai.vocation && ikigai.vocation.trim().length > 15) ikigaiScore += 12;
  if (ikigai.mission && ikigai.mission.trim().length > 15) ikigaiScore += 12;
  if (ikigai.profession && ikigai.profession.trim().length > 15) ikigaiScore += 12;
  if (ikigai.coreValues && ikigai.coreValues.length >= 3) ikigaiScore += 10;
  if (ikigai.archetype) ikigaiScore += 5;
  ikigaiScore = Math.min(100, Math.max(20, ikigaiScore));

  // 2. Market Viability Score (0 - 100)
  let marketScore = 60;
  switch (competitive.marketSaturation) {
    case "LOW":
      marketScore = 90;
      break;
    case "MEDIUM":
      marketScore = 80;
      break;
    case "HIGH":
      marketScore = 60;
      break;
    case "RED_OCEAN":
      marketScore = 42;
      break;
    default:
      marketScore = 65;
  }

  // Differentiator evaluation
  const diffLen = competitive.differentiator?.trim().length || 0;
  if (diffLen > 100) marketScore += 10;
  else if (diffLen > 40) marketScore += 5;
  else marketScore -= 10;

  // Competitor awareness
  const compCount = competitive.competitors?.length || 0;
  if (compCount >= 2 && compCount <= 8) marketScore += 8;
  else if (compCount === 0) marketScore -= 12;

  marketScore = Math.min(100, Math.max(15, marketScore));

  // 3. Execution Capacity Score (0 - 100)
  let capacityScore = 40;
  const hours = business.weeklyHours || 5;
  const budget = business.monthlyBudget || 0;
  const channelCount = scope.activeChannels?.length || 1;

  if (hours >= 20) capacityScore += 35;
  else if (hours >= 10) capacityScore += 25;
  else if (hours >= 5) capacityScore += 15;

  if (budget >= 5000) capacityScore += 35;
  else if (budget >= 2000) capacityScore += 25;
  else if (budget >= 500) capacityScore += 15;

  const ratio = (hours * 200 + budget) / (channelCount * 600);
  if (ratio > 2.0) capacityScore += 15;
  else if (ratio < 0.8) capacityScore -= 15;

  capacityScore = Math.min(100, Math.max(20, capacityScore));

  // 4. Product-Market Alignment (0 - 100)
  let pmScore = 50;
  const painCount = audience.painTriggers?.length || 0;
  if (painCount >= 3) pmScore += 20;
  else if (painCount >= 1) pmScore += 10;

  if (audience.buyingObjections && audience.buyingObjections.length >= 2) pmScore += 15;
  if (audience.icpDemographics && audience.icpDemographics.trim().length > 30) pmScore += 15;

  pmScore = Math.min(100, Math.max(25, pmScore));

  // 5. Channel-Model Readiness (0 - 100)
  let channelScore = 55;
  const model = business.businessModel || "B2B_SERVICE";
  const isSynergistic = checkChannelSynergy(model, scope.activeChannels);
  if (isSynergistic) channelScore += 25;
  else channelScore -= 10;

  if (scope.primaryGoals && scope.primaryGoals.length >= 2) channelScore += 15;
  channelScore = Math.min(100, Math.max(25, channelScore));

  // Weighted Composite Total Score
  const totalScore = Math.round(
    marketScore * 0.25 +
      capacityScore * 0.2 +
      pmScore * 0.2 +
      ikigaiScore * 0.2 +
      channelScore * 0.15
  );

  // Risk Tier Classification & Localized Label
  let riskTier: RiskTierType = "HIGH_POTENTIAL";
  let tierLabel = "High Commercial Viability";
  let tierColor = "#10b981";

  const tierTranslations: Record<string, { dominant: string; high: string; moderate: string; pivot: string }> = {
    ro: {
      dominant: "Dominanță de Categorie / Viabilitate Excepțională",
      high: "Viabilitate Comercială Ridicată",
      moderate: "Risc Moderat / Necesită Focalizare",
      pivot: "Pivot Critic / Repoziționare Necesară",
    },
    de: {
      dominant: "Kategorie-Dominanz / Außergewöhnliche Lebensfähigkeit",
      high: "Hohe kommerzielle Lebensfähigkeit",
      moderate: "Mäßiges Risiko / Fokus erforderlich",
      pivot: "Kritischer Pivot / Neupositionierung erforderlich",
    },
    fr: {
      dominant: "Dominance de Catégorie / Viabilité Exceptionnelle",
      high: "Forte Viabilité Commerciale",
      moderate: "Risque Modéré / Focalisation Requise",
      pivot: "Pivot Critique / Repositionnement Requis",
    },
    it: {
      dominant: "Dominanza di Categoria / Redditività Eccezionale",
      high: "Alta Redditività Commerciale",
      moderate: "Rischio Moderato / Focus Richiesto",
      pivot: "Pivot Critico / Riposizionamento Necessario",
    },
    pl: {
      dominant: "Dominacja w Kategorii / Wyjątkowa Rentowność",
      high: "Wysoka Rentowność Rynkowa",
      moderate: "Umiarkowane Ryzyko / Wymagane Skupienie",
      pivot: "Krytyczny Pivot / Wymagane Przepozycjonowanie",
    },
    es: {
      dominant: "Dominio de Categoría / Viabilidad Excepcional",
      high: "Alta Viabilidad Comercial",
      moderate: "Riesgo Moderado / Foco Requerido",
      pivot: "Pivote Crítico / Reposicionamiento Requerido",
    },
    en: {
      dominant: "Category Dominance / Exceptional Viability",
      high: "High Commercial Viability",
      moderate: "Moderate Risk / Focus Required",
      pivot: "Critical Pivot / Repositioning Required",
    },
  };

  const tTier = tierTranslations[lang] || tierTranslations.en;

  if (totalScore >= 85) {
    riskTier = "DOMINANT";
    tierLabel = tTier.dominant;
    tierColor = "#10b981";
  } else if (totalScore >= 70) {
    riskTier = "HIGH_POTENTIAL";
    tierLabel = tTier.high;
    tierColor = "#06b6d4";
  } else if (totalScore >= 50) {
    riskTier = "MODERATE_RISK";
    tierLabel = tTier.moderate;
    tierColor = "#f59e0b";
  } else {
    riskTier = "CRITICAL_PIVOT";
    tierLabel = tTier.pivot;
    tierColor = "#ef4444";
  }

  // Dynamic Localized Strengths, Risks, and Directives
  const strengths: string[] = [];
  const risks: string[] = [];
  const actionDirectives: string[] = [];

  const feedbackTranslations: Record<
    string,
    {
      strIkigai: (arch: string) => string;
      riskIkigai: string;
      dirIkigai: string;
      strMarket: string;
      riskMarket: string;
      dirMarket: string;
      strCapacity: string;
      riskCapacity: (c: number, h: number) => string;
      dirCapacity: string;
      strPM: string;
      riskPM: string;
      dirPM: string;
      strChannel: (m: string) => string;
      dirChannel: string;
      dirDefault: string;
    }
  > = {
    ro: {
      strIkigai: (arch) => `Aliniere puternică a fondatorului pe baza arhetipului ${arch}.`,
      riskIkigai: "Misiunea de bază și narațiunea de valoare necesită o clarificare mai profundă.",
      dirIkigai: "Rafinează povestea fondatorului și integrează misiunea Ikigai direct în cârligele postărilor.",
      strMarket: "Claritate ridicată a diferențierii în peisajul concurențial, oferind un avantaj defensiv.",
      riskMarket: "Operarea într-un segment saturat cere un mesaj mult mai ascuțit pentru a răzbi prin zgomot.",
      dirMarket: "Concentrează-te pe micro-segmente ultra-specifice înainte de a încerca promovarea orizontală.",
      strCapacity: "Buget bine calibrat și angajament solid de timp pentru publicare consecventă.",
      riskCapacity: (c, h) => `Risc de dispersie a efortului: ${c} canale active cu ${h} ore săptămânale dedicate.`,
      dirCapacity: "Automatizează redistribuirea conținutului folosind modelul 1-la-mulți (1 pilon -> 5 formate derivate).",
      strPM: "Înțelegere precisă a profilului clientului ideal cu declanșatori de durere clar identificați.",
      riskPM: "Definirea prea largă a publicului poate dilua rata de conversie a mesajelor.",
      dirPM: "Ancorează toate cârligele zilnice în primele 2 dureri financiare și operaționale urgente.",
      strChannel: (m) => `Selecție optimă de canale adaptată pentru modelul de afacere ${m}.`,
      dirChannel: "Prioritizează canalul principal de înaltă conversie înainte de a împărți atenția pe rețele secundare.",
      dirDefault: "Lansează calendarul de 30 de zile și urmărește primele 14 zile pentru calibrarea cadenței.",
    },
    de: {
      strIkigai: (arch) => `Starke Ausrichtung des Gründers auf den Archetyp ${arch}.`,
      riskIkigai: "Mission und Wertversprechen müssen präziser formuliert werden.",
      dirIkigai: "Integrieren Sie Ihre Ikigai-Mission direkt in die Top-of-Funnel-Hooks.",
      strMarket: "Hohe Differenzierung im Wettbewerbsumfeld für einen nachhaltigen Burggraben.",
      riskMarket: "Im gesättigten Markt ist spitzere Positionierung erforderlich.",
      dirMarket: "Fokussieren Sie sich auf lukrative Mikro-Segmente.",
      strCapacity: "Ausgewogenes Ressourcenbudget für kontinuierliche Veröffentlichung.",
      riskCapacity: (c, h) => `Risiko von Engpässen: ${c} aktive Kanäle bei ${h} Wochenstunden.`,
      dirCapacity: "Nutzen Sie automatisierte Content-Wiederverwendung (1 Anker -> 5 Ableitungen).",
      strPM: "Präzises Verständnis des Zielkundenprofils mit klaren Schmerzpunkten.",
      riskPM: "Zu breite Zielgruppendefinition kann die Konversionsrate senken.",
      dirPM: "Verankern Sie alle Hooks in den wichtigsten Schmerzpunkten.",
      strChannel: (m) => `Optimale Kanalwahl für das ${m}-Geschäftsmodell.`,
      dirChannel: "Konzentrieren Sie sich auf den primären Kanal mit der höchsten Konversion.",
      dirDefault: "Starten Sie den 30-Tage-Kalender und optimieren Sie nach 14 Tagen die Frequenz.",
    },
    en: {
      strIkigai: (arch) => `Strong founder-mission alignment based on ${arch} archetype.`,
      riskIkigai: "Core mission and value narrative need deeper crystallization to avoid generic positioning.",
      dirIkigai: "Refine your founder story and weave your Ikigai mission directly into top-of-funnel hooks.",
      strMarket: "High differentiation clarity amidst market landscape, providing defensible brand moat.",
      riskMarket: "Operating in a saturated market segment requires sharper wedge messaging to break through noise.",
      dirMarket: "Focus on hyper-niche micro-segments before attempting broad horizontal outreach.",
      strCapacity: "Well-calibrated resource budget and founder commitment to sustain high-frequency publishing.",
      riskCapacity: (c, h) => `Risk of creator burnout: ${c} active channels with ${h} weekly hours.`,
      dirCapacity: "Automate content repurposing by using a 1-to-many pillar model (1 anchor asset -> 5 platform derivatives).",
      strPM: "Pinpoint ICP understanding with clearly identified high-urgency pain triggers.",
      riskPM: "Broad or fuzzy audience demographics may dilute copy conversion rates.",
      dirPM: "Anchor all daily post hooks to the top 2 urgent financial/emotional pain triggers.",
      strChannel: (m) => `Optimal channel selection tailored for your ${m} business model.`,
      dirChannel: "Prioritize your primary high-conversion channel first before splitting attention into secondary networks.",
      dirDefault: "Deploy the 30-day starter calendar and track first 14 days of engagement metrics.",
    },
  };

  const tFeedback = feedbackTranslations[lang] || feedbackTranslations.en;
  const archName = ikigai.archetype?.replace(/_/g, " ") || "Visionary";

  if (ikigaiScore >= 75) {
    strengths.push(tFeedback.strIkigai(archName));
  } else {
    risks.push(tFeedback.riskIkigai);
    actionDirectives.push(tFeedback.dirIkigai);
  }

  if (marketScore >= 75) {
    strengths.push(tFeedback.strMarket);
  } else if (competitive.marketSaturation === "RED_OCEAN" || competitive.marketSaturation === "HIGH") {
    risks.push(tFeedback.riskMarket);
    actionDirectives.push(tFeedback.dirMarket);
  }

  if (capacityScore >= 75) {
    strengths.push(tFeedback.strCapacity);
  } else {
    risks.push(tFeedback.riskCapacity(channelCount, hours));
    actionDirectives.push(tFeedback.dirCapacity);
  }

  if (pmScore >= 75) {
    strengths.push(tFeedback.strPM);
  } else {
    risks.push(tFeedback.riskPM);
    actionDirectives.push(tFeedback.dirPM);
  }

  if (channelScore >= 75) {
    strengths.push(tFeedback.strChannel(model.replace(/_/g, " ")));
  } else {
    actionDirectives.push(tFeedback.dirChannel);
  }

  if (actionDirectives.length === 0) {
    actionDirectives.push(tFeedback.dirDefault);
  }

  return {
    marketViability: Math.round(marketScore),
    executionCapacity: Math.round(capacityScore),
    productMarketAlignment: Math.round(pmScore),
    channelReadiness: Math.round(channelScore),
    ikigaiCongruence: Math.round(ikigaiScore),
    totalScore,
    riskTier,
    tierLabel,
    tierColor,
    strengths,
    risks,
    actionDirectives,
  };
}

function checkChannelSynergy(model: BusinessModelType, channels: ChannelType[]): boolean {
  if (!channels || channels.length === 0) return false;
  switch (model) {
    case "B2B_SERVICE":
    case "B2B_SAAS":
      return channels.includes("LINKEDIN") || channels.includes("EMAIL");
    case "B2C_ECOM":
      return (
        channels.includes("INSTAGRAM") ||
        channels.includes("TIKTOK") ||
        channels.includes("FACEBOOK")
      );
    case "B2C_LOCAL":
      return (
        channels.includes("FACEBOOK") ||
        channels.includes("INSTAGRAM") ||
        channels.includes("EMAIL")
      );
    case "CREATOR":
      return (
        channels.includes("TIKTOK") ||
        channels.includes("INSTAGRAM") ||
        channels.includes("EMAIL") ||
        channels.includes("LINKEDIN")
      );
    default:
      return true;
  }
}
