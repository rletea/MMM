import { WizardFormState, IkigaiData, BusinessData, CompetitiveData, AudienceData, ChannelScopeData } from "./types";

export function getDemoWizardState(lang: string = "en"): WizardFormState {
  const normalized = (lang || "en").toLowerCase();

  switch (normalized) {
    case "de":
      return getGermanDemoState();
    case "ro":
      return getRomanianDemoState();
    case "fr":
      return getFrenchDemoState();
    case "it":
      return getItalianDemoState();
    case "pl":
      return getPolishDemoState();
    case "es":
      return getSpanishDemoState();
    case "en":
    default:
      return getEnglishDemoState();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GERMAN DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getGermanDemoState(): WizardFormState {
  const ikigai: IkigaiData = {
    locale: "DE",
    p1_time_loss: "Konzeption komplexer Wachstumsarchitekturen, Verfassen tiefgründiger Thought-Leadership-Essays und Analyse von Geschäftsmodellen",
    p1_spare_time_reading: "Organisches B2B-Wachstum, Entscheidungspsychologie, KI-Automatisierungsabläufe und Marken-Burggräben",
    p1_average_tuesday: "Vormittags konzentrierte Deep-Work-Phase an strategischen Thesen, nachmittags wirkungsvolle Beratungssitzungen mit Gründern",
    p1_energizing_tasks: "Übersetzung der Gründerintuition in reproduzierbare Go-to-Market-Systeme und konversionsstarke Positionierungsstrukturen",
    p1_childhood_passions: "Strategische Computersimulationen, Konzeption interaktiver Logikspiele und Verfassen eigener Magazine",
    p1_spark_debates: "Warum traditionelle Marketingagenturen Eitelkeitsmetriken statt echter Kategoriendominanz verkaufen",
    p1_creative_outlets: "Provokante Essays, minimalistisches Markendesign und intuitive Systemarchitekturen",

    p2_effortless_skills: "Sofortiges Erkennen verdeckter systemischer Engpässe in Positionierung, Botschaft und Wertangebot",
    p2_sought_advice: "Strukturierung hochpreisiger Leistungsangebote, Aufbau von Expertenautorität und Generierung qualifizierter organischer Anfragen",
    p2_hard_skills: "B2B-Wachstumsanalysen, strategische Positionierungs-Teardowns, Multi-Channel-Redaktionsabläufe, Prompt Engineering",
    p2_interpersonal_soft: "Radikale Empathie, strukturiertes aktives Zuhören, präzise Kommunikation auf Augenhöhe und querdenkende Synthese",
    p2_success_patterns: "Fokussierung auf asymmetrische Distributionskanäle, Eliminierung von Signalrauschen und Aufbau dauerhafter IP-Assets",
    p2_problem_solving: "Dekonstruktion nach ersten Grundprinzipien, gefolgt von schnellem Prototyping und systemischer Verfeinerung",
    p2_recurring_praise: "«Sie haben unsere 5-Jahres-Vision in 1 Stunde präziser auf den Punkt gebracht als unsere frühere Agentur in 6 Monaten»",

    p3_systemic_injustice: "Exzellente Gründer entwickeln herausragende Lösungen, bleiben jedoch unsichtbar, weil Marketing als laut oder manipulativ empfunden wird",
    p3_community_to_help: "Visionäre B2B-Gründer, spezialisierte Beratungsunternehmen und qualitätsorientierte Unternehmer, die echte Werte schaffen",
    p3_unlimited_resource: "Demokratisierung erstklassiger CMO-Strategien für werteorientierte und ambitionierte Unternehmer",
    p3_immediate_needs: "Ein verlässlicher 30-Tage-Distributionsmotor, der planbare Kundenanfragen generiert – ohne Gründer-Burnout",
    p3_non_negotiables: "Radikale Transparenz, Asymmetrische Effizienz, Meisterschaft, Kompromisslose Qualität",
    p3_future_gap: "Austauschbare KI-Texte werden die Feeds überfluten; nur die authentische Gründerstimme und echte Domänenkompetenz werden konvertieren",
    p3_legacy_impact: "Mehr als 1.000 Gründern zu nachhaltigen, hochprofitablen und marktführenden Unternehmen verholfen zu haben",

    p4_past_paid_services: "Fractional-CMO-Mandate (8.000 €/Monat), Positionierungs-Workshops (4.500 €), strategische Wachstumsberatung",
    p4_market_paid_skills: "Kategoriedesign, Hochpreis-Botschaften, Architektur automatisierter Multi-Channel-Inhaltssysteme",
    p4_commercial_hobbies: "Veröffentlichung strategischer Analysen, Moderation geschlossener Gründerzirkel, Prototyping von Software-Tools",
    p4_high_value_roi: "Über 2,4 Mio. € an direkt durch organische Markenautorität generierten Kundenverträgen",
    p4_premium_assets: "Ganzheitliches 30-Tage-Positionierungs- und Distributionssystem mit schlüsselfertiger Multi-Channel-Ausspielung",
    p4_growth_niches: "KI-gestützte B2B-Beratung, Enterprise-Technologie, spezialisierte High-Ticket-Dienstleistungen",
    p4_monetization_fit: "Strategisches Premium-Retainer-Modell + Performance-Beteiligung + skalierbares digitales Asset-Ökosystem",

    overlap_synthesis: "Befähigung visionärer B2B-Gründer zu unangefochtener Kategorie-Autorität und verlässlichen Kundenanfragen durch Ikigai-ausgerichtete Positionierung",
    pilot_30_days: "Start eines 30-Tage-Multi-Channel-Programms mit täglichen LinkedIn-Fallstudien und einer automatisierten E-Mail-Onboarding-Sequenz",

    timeFlyActivities: "Konzeption komplexer Wachstumsarchitekturen, Verfassen tiefgründiger Thought-Leadership-Essays und Analyse von Geschäftsmodellen",
    naturalTopics: "Organisches B2B-Wachstum, Entscheidungspsychologie, KI-Automatisierungsabläufe und Marken-Burggräben",
    idealTuesday: "Vormittags konzentrierte Deep-Work-Phase an strategischen Thesen, nachmittags wirkungsvolle Beratungssitzungen mit Gründern",
    energizingTasks: "Übersetzung der Gründerintuition in reproduzierbare Go-to-Market-Systeme und konversionsstarke Positionierungsstrukturen",
    childhoodPassions: "Strategische Computersimulationen, Konzeption interaktiver Logikspiele und Verfassen eigener Magazine",
    sparkDebates: "Warum traditionelle Marketingagenturen Eitelkeitsmetriken statt echter Kategoriendominanz verkaufen",
    creativeOutlets: "Provokante Essays, minimalistisches Markendesign und intuitive Systemarchitekturen",

    effortlessSkills: "Sofortiges Erkennen verdeckter systemischer Engpässe in Positionierung, Botschaft und Wertangebot",
    soughtAdvice: "Strukturierung hochpreisiger Leistungsangebote, Aufbau von Expertenautorität und Generierung qualifizierter organischer Anfragen",
    hardSkills: "B2B-Wachstumsanalysen, strategische Positionierungs-Teardowns, Multi-Channel-Redaktionsabläufe, Prompt Engineering",
    softSkills: "Radikale Empathie, strukturiertes aktives Zuhören, präzise Kommunikation auf Augenhöhe und querdenkende Synthese",
    successPatterns: "Fokussierung auf asymmetrische Distributionskanäle, Eliminierung von Signalrauschen und Aufbau dauerhafter IP-Assets",
    problemSolvingWay: "Dekonstruktion nach ersten Grundprinzipien, gefolgt von schnellem Prototyping und systemischer Verfeinerung",
    recurringPraise: "«Sie haben unsere 5-Jahres-Vision in 1 Stunde präziser auf den Punkt gebracht als unsere frühere Agentur in 6 Monaten»",

    systemicProblems: "Exzellente Gründer entwickeln herausragende Lösungen, bleiben jedoch unsichtbar, weil Marketing als laut oder manipulativ empfunden wird",
    targetCommunity: "Visionäre B2B-Gründer, spezialisierte Beratungsunternehmen und qualitätsorientierte Unternehmer, die echte Werte schaffen",
    priorityCause: "Demokratisierung erstklassiger CMO-Strategien für werteorientierte und ambitionierte Unternehmer",
    practicalNeeds: "Ein verlässlicher 30-Tage-Distributionsmotor, der planbare Kundenanfragen generiert – ohne Gründer-Burnout",
    coreValues: ["Radikale Transparenz", "Asymmetrische Effizienz", "Meisterschaft", "Kompromisslose Qualität"],
    decadeOutlook: "Austauschbare KI-Texte werden die Feeds überfluten; nur die authentische Gründerstimme und echte Domänenkompetenz werden konvertieren",
    desiredLegacy: "Mehr als 1.000 Gründern zu nachhaltigen, hochprofitablen und marktführenden Unternehmen verholfen zu haben",

    pastPaidServices: "Fractional-CMO-Mandate (8.000 €/Monat), Positionierungs-Workshops (4.500 €), strategische Wachstumsberatung",
    highValueSkills: "Kategoriedesign, Hochpreis-Botschaften, Architektur automatisierter Multi-Channel-Inhaltssysteme",
    commercialHobbies: "Veröffentlichung strategischer Analysen, Moderation geschlossener Gründerzirkel, Prototyping von Software-Tools",
    economicImpact: "Über 2,4 Mio. € an direkt durch organische Markenautorität generierten Kundenverträgen",
    premiumOffers: "Ganzheitliches 30-Tage-Positionierungs- und Distributionssystem mit schlüsselfertiger Multi-Channel-Ausspielung",
    growthNiches: "KI-gestützte B2B-Beratung, Enterprise-Technologie, spezialisierte High-Ticket-Dienstleistungen",
    monetizationModel: "Strategisches Premium-Retainer-Modell + Performance-Beteiligung + skalierbares digitales Asset-Ökosystem",

    coreIntersection: "Befähigung visionärer B2B-Gründer zu unangefochtener Kategorie-Autorität und verlässlichen Kundenanfragen durch Ikigai-ausgerichtete Positionierung",
    pilotProject30Days: "Start eines 30-Tage-Multi-Channel-Programms mit täglichen LinkedIn-Fallstudien und einer automatisierten E-Mail-Onboarding-Sequenz",

    passion: "Gestaltung transformativer Wachstumssysteme für ambitionierte Gründer und führende Köpfe",
    vocation: "Strategische Marketingberatung, Positionierungsarchitektur und wirkungsvolle Inhaltssynthese",
    mission: "Demokratisierung erstklassiger Markenpositionierung für werteorientierte Unternehmen",
    profession: "Wachstumsingenieur & Markenstratege",
    archetype: "VISIONARY_DISRUPTOR",
  };

  const business: BusinessData = {
    businessName: "Nexus Growth Labs DACH",
    websiteUrl: "https://nexusgrowthlabs.io",
    businessModel: "B2B_SERVICE",
    industry: "B2B-Beratung & Enterprise-Technologie",
    geoScope: "Europe & UK",
    currentStage: "SCALING",
    monthlyBudget: 2500,
    weeklyHours: 15,
  };

  const competitive: CompetitiveData = {
    competitors: [
      "Klassische Marketing-Agenturen",
      "Generische KI-Textgeneratoren",
      "Freelance-Texter ohne Strategie",
    ],
    marketSaturation: "HIGH",
    differentiator:
      "Tiefgehendes Ikigai-Diagnosesystem kombiniert mit einer automatisierten Omnichannel-Kampagnenarchitektur, die 90% des Produktionsaufwands eliminiert und 100% der authentischen Gründerstimme bewahrt.",
    retentionRate: "92%",
  };

  const audience: AudienceData = {
    icpDemographics:
      "B2B-Gründer, Agenturinhaber und Beratungsunternehmen mit 20.000 € – 100.000 € Monatsumsatz, die planbare organische Autorität aufbauen möchten.",
    painTriggers: [
      "Unbeständige Social-Media-Präsenz durch operative Projektauslastung",
      "Generische Agenturtexte, die roboterhaft klingen und Gründertiefe vermissen lassen",
      "Geringe Lead-Generierung über organische Kanäle",
    ],
    buyingObjections: [
      "Wird das wie generischer KI-Text klingen?",
      "Wie viel Zeit muss ich wöchentlich realistisch investieren?",
    ],
    existingAssets:
      "LinkedIn-Profil des Gründers mit 4.200 Kontakten, E-Mail-Verteiler mit 1.100 qualifizierten Kontakten, wöchentliche Fachbeiträge.",
  };

  const scope: ChannelScopeData = {
    primaryGoals: [
      "Kategorie-Autorität etablieren",
      "15+ qualifizierte Anfragen pro Monat generieren",
      "Automatisierten 30-Tage-Distributionskanal aufbauen",
    ],
    reviewCadence: "MONTHLY",
    activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
  };

  return { step: 5, ikigai, business, competitive, audience, scope };
}

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getEnglishDemoState(): WizardFormState {
  const ikigai: IkigaiData = {
    locale: "EN",
    p1_time_loss: "Architecting complex growth engines, writing contrarian thought leadership, dissecting startup business models",
    p1_spare_time_reading: "Product-led growth, behavioral psychology, AI automation workflows, brand moat construction",
    p1_average_tuesday: "Morning deep-work writing thesis essays, afternoon high-leverage client strategy sessions, zero reactive meetings",
    p1_energizing_tasks: "Translating founder intuition into systematic go-to-market playbooks and high-converting narrative structures",
    p1_childhood_passions: "Building strategic computer simulations, storytelling, designing custom magazines and games",
    p1_spark_debates: "Why most B2B marketing agencies sell low-ROI vanity metrics instead of category dominance",
    p1_creative_outlets: "Writing provocative essays, visual branding design, designing minimalist workflow architectures",

    p2_effortless_skills: "Quickly spotting underlying systemic bottlenecks in positioning and messaging that founders overlook",
    p2_sought_advice: "Pricing high-ticket packages, personal brand authority architecture, organic inbound funnel creation",
    p2_hard_skills: "Growth analytics, positioning teardowns, multi-channel editorial workflows, prompt engineering",
    p2_interpersonal_soft: "Radical empathy, structured active listening, high-stakes communication, contrarian synthesis",
    p2_success_patterns: "Focusing on asymmetric distribution channels, zero-fluff signal, and building defensible IP assets",
    p2_problem_solving: "First-principles deconstruction followed by rapid prototyping and algorithmic iteration",
    p2_recurring_praise: "«You summarized our entire 5-year vision and differentiated us better in 1 hour than our agency did in 6 months»",

    p3_systemic_injustice: "Ambitious operators build world-class products but stay invisible because marketing feels dirty, noisy, or fake",
    p3_community_to_help: "Visionary founders, boutique consultancy partners, and solopreneur builders striving for freedom",
    p3_unlimited_resource: "Democratize elite CMO-level strategic positioning for high-integrity operators",
    p3_immediate_needs: "A predictable 30-day organic distribution engine that builds authority without burnout",
    p3_non_negotiables: "Radical Transparency, Asymmetric Leverage, Craftsmanship, Unapologetic Focus",
    p3_future_gap: "Commoditized generic AI content will flood feeds; only authentic founder voice and deep domain moats will convert",
    p3_legacy_impact: "Empowered 1,000+ independent founders to build durable, highly profitable category-leading businesses",

    p4_past_paid_services: "Fractional CMO engagements ($10k/mo), strategic positioning intensives ($5k), cohort advisory ($2.5k)",
    p4_market_paid_skills: "Category design, high-ticket messaging frameworks, multi-channel content system architecture",
    p4_commercial_hobbies: "Writing breakdown newsletters, curating founder mastermind circles, SaaS prototyping",
    p4_high_value_roi: "Client deals closed exceeding $2.4M directly attributable to organic brand authority",
    p4_premium_assets: "30-Day Brand Positioning & Authority Operating System with complete multi-channel deployment",
    p4_growth_niches: "AI-augmented professional advisory, enterprise developer tooling, high-ticket B2B services",
    p4_monetization_fit: "High-ticket retainer + Performance upside + Scalable digital product ecosystem",

    overlap_synthesis: "Empowering visionary B2B founders to achieve category authority and predictable inbound pipeline through systematic Ikigai-aligned positioning",
    pilot_30_days: "Launch a 30-day multi-channel authority blitz with daily long-form LinkedIn teardowns and an automated email onboarding engine",

    timeFlyActivities: "Architecting complex growth engines, writing contrarian thought leadership, dissecting startup business models",
    naturalTopics: "Product-led growth, behavioral psychology, AI automation workflows, brand moat construction",
    idealTuesday: "Morning deep-work writing thesis essays, afternoon high-leverage client strategy sessions, zero reactive meetings",
    energizingTasks: "Translating founder intuition into systematic go-to-market playbooks and high-converting narrative structures",
    childhoodPassions: "Building strategic computer simulations, storytelling, designing custom magazines and games",
    sparkDebates: "Why most B2B marketing agencies sell low-ROI vanity metrics instead of category dominance",
    creativeOutlets: "Writing provocative essays, visual branding design, designing minimalist workflow architectures",

    effortlessSkills: "Quickly spotting underlying systemic bottlenecks in positioning and messaging that founders overlook",
    soughtAdvice: "Pricing high-ticket packages, personal brand authority architecture, organic inbound funnel creation",
    hardSkills: "Growth analytics, positioning teardowns, multi-channel editorial workflows, prompt engineering",
    softSkills: "Radical empathy, structured active listening, high-stakes communication, contrarian synthesis",
    successPatterns: "Focusing on asymmetric distribution channels, zero-fluff signal, and building defensible IP assets",
    problemSolvingWay: "First-principles deconstruction followed by rapid prototyping and algorithmic iteration",
    recurringPraise: "«You summarized our entire 5-year vision and differentiated us better in 1 hour than our agency did in 6 months»",

    systemicProblems: "Ambitious operators build world-class products but stay invisible because marketing feels dirty, noisy, or fake",
    targetCommunity: "Visionary founders, boutique consultancy partners, and solopreneur builders striving for freedom",
    priorityCause: "Democratize elite CMO-level strategic positioning for high-integrity operators",
    practicalNeeds: "A predictable 30-day organic distribution engine that builds authority without burnout",
    coreValues: ["Radical Transparency", "Asymmetric Leverage", "Craftsmanship", "Unapologetic Focus"],
    decadeOutlook: "Commoditized generic AI content will flood feeds; only authentic founder voice and deep domain moats will convert",
    desiredLegacy: "Empowered 1,000+ independent founders to build durable, highly profitable category-leading businesses",

    pastPaidServices: "Fractional CMO engagements ($10k/mo), strategic positioning intensives ($5k), cohort advisory ($2.5k)",
    highValueSkills: "Category design, high-ticket messaging frameworks, multi-channel content system architecture",
    commercialHobbies: "Writing breakdown newsletters, curating founder mastermind circles, SaaS prototyping",
    economicImpact: "Client deals closed exceeding $2.4M directly attributable to organic brand authority",
    premiumOffers: "30-Day Brand Positioning & Authority Operating System with complete multi-channel deployment",
    growthNiches: "AI-augmented professional advisory, enterprise developer tooling, high-ticket B2B services",
    monetizationModel: "High-ticket retainer + Performance upside + Scalable digital product ecosystem",

    coreIntersection: "Empowering visionary B2B founders to achieve category authority and predictable inbound pipeline through systematic Ikigai-aligned positioning",
    pilotProject30Days: "Launch a 30-day multi-channel authority blitz with daily long-form LinkedIn teardowns and an automated email onboarding engine",

    passion: "Designing transformative systems that empower creators and business leaders to achieve operational freedom.",
    vocation: "Strategic growth advisory, marketing architecture, and high-leverage content synthesis.",
    mission: "Democratize elite brand positioning and make strategic marketing execution effortless for modern founders.",
    profession: "Full-Stack Brand & Marketing Strategist and Growth Engineer.",
    archetype: "VISIONARY_DISRUPTOR",
  };

  const business: BusinessData = {
    businessName: "Nexus Growth Labs",
    websiteUrl: "https://nexusgrowthlabs.io",
    businessModel: "B2B_SERVICE",
    industry: "B2B Advisory & Marketing Tech",
    geoScope: "Global / Remote",
    currentStage: "SCALING",
    monthlyBudget: 2500,
    weeklyHours: 15,
  };

  const competitive: CompetitiveData = {
    competitors: ["Standard Agencies", "Generic AI Copy Tools", "Freelance Copywriters"],
    marketSaturation: "HIGH",
    differentiator:
      "An integrated Ikigai-driven diagnostic engine combined with automated multi-channel campaign architectures that eliminates 90% of content production overhead while maintaining 100% authentic founder voice.",
    retentionRate: "92%",
  };

  const audience: AudienceData = {
    icpDemographics:
      "B2B founders, agency owners, and high-ticket service providers generating $20k-$100k/mo seeking predictable authority.",
    painTriggers: [
      "Inconsistent social presence due to client delivery bandwidth constraints",
      "Generic agency copy that sounds robotic and lacks founder depth",
      "Low lead velocity from organic social channels",
    ],
    buyingObjections: [
      "Will this sound like generic AI copy?",
      "How much time do I realistically need to invest each week?",
    ],
    existingAssets:
      "Founder LinkedIn profile with 4,200 connections, email list of 1,100 past leads, weekly podcast recordings.",
  };

  const scope: ChannelScopeData = {
    primaryGoals: [
      "Establish Category Authority",
      "Generate 15+ Inbound Qualified Inquiries/mo",
      "Build 30-Day Automated Distribution",
    ],
    reviewCadence: "MONTHLY",
    activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
  };

  return { step: 5, ikigai, business, competitive, audience, scope };
}

// ─────────────────────────────────────────────────────────────────────────────
// ROMANIAN DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getRomanianDemoState(): WizardFormState {
  const ikigai: IkigaiData = {
    locale: "RO",
    p1_time_loss: "Arhitecturarea motoarelor complexe de creștere, scrierea analizelor strategice și optimizarea sistemelor de piață",
    p1_spare_time_reading: "Creștere organică B2B, psihologie decizională, automatizări AI, diferențiere strategică de brand",
    p1_average_tuesday: "Dimineață dedicată creației de strategii fără întreruperi, după-amiază de consultanță strategică de nivel înalt",
    p1_energizing_tasks: "Transformarea intuiției fondatorului în sisteme de piață clare, sistematizate și scalabile",
    p1_childhood_passions: "Simulări de strategie, crearea de reviste și jocuri logice interactive",
    p1_spark_debates: "De ce majoritatea agențiilor B2B vând metrici vanitoase în loc de dominanță de categorie",
    p1_creative_outlets: "Eseuri provocatoare, design de brand minimalist și arhitectură de procese",

    p2_effortless_skills: "Identificarea instantanee a blocajelor ascunse din poziționare și comunicare",
    p2_sought_advice: "Stabilirea prețurilor premium, arhitectura autorității de brand, generarea de oportunități calificate",
    p2_hard_skills: "Analiză de creștere B2B, repoziționare strategică, fluxuri editoriale multi-canal, prompt engineering",
    p2_interpersonal_soft: "Empatie profundă, ascultare activă structurată, comunicare de impact și sinteză contrariană",
    p2_success_patterns: "Concentrare pe canale asimetrice de distribuție, eliminarea zgomotului inutil și creare de active IP durabile",
    p2_problem_solving: "Deconstrucție după primele principii urmată de prototipare rapidă și iterație sistemică",
    p2_recurring_praise: "«Ați rezumat viziunea noastră pe 5 ani și ne-ați diferențiat în 1 oră mai bine decât o agenție în 6 luni»",

    p3_systemic_injustice: "Fondatori remarcabili construiesc produse excepționale, dar rămân invizibili din cauza lipsei de strategie clară",
    p3_community_to_help: "Fondatori B2B, consultanți de elită și antreprenori orientați spre excelență și impact",
    p3_unlimited_resource: "Democratizarea strategiilor de CMO de nivel enterprise pentru operatori onești și ambițioși",
    p3_immediate_needs: "Un motor previzibil de distribuție pe 30 de zile care generează autoritate și vânzări fără epuizare",
    p3_non_negotiables: "Transparență Radicală, Eficiență Asimetrică, Măiestrie, Focalizare Neclintită",
    p3_future_gap: "Conținutul generic generat de AI va inunda platformele; doar vocea autentică a fondatorului va mai converti",
    p3_legacy_impact: "Sprijinirea a peste 1.000 de fondatori să își construiască afaceri durabile, extrem de profitabile și lideri de nișă",

    p4_past_paid_services: "Servicii de Fractional CMO (5.000€/lună), workshop-uri intensive de repoziționare, audituri de conversie",
    p4_market_paid_skills: "Design de categorie de piață, mesaje de conversie high-ticket, sisteme autonome de distribuție",
    p4_commercial_hobbies: "Publicarea de analize de business, comunități private pentru fondatori, prototipuri software",
    p4_high_value_roi: "Peste 2.4M€ în contracte încheiate de clienți datorită autorității organice construite",
    p4_premium_assets: "Sistemul Integrat de Poziționare și Distribuție pe 30 de Zile cu lansare multi-canal",
    p4_growth_niches: "Consultanță B2B asistată de inteligență artificială, tehnologie enterprise, servicii high-ticket",
    p4_monetization_fit: "Consultanță strategică premium + Abonament lunar de optimizare continuă",

    overlap_synthesis: "Ghidarea fondatorilor ambițioși către autoritate de piață de necontestat și clienți calificați recurenți",
    pilot_30_days: "Lansarea unui calendar multi-canal intensiv pe 30 de zile cu analize zilnice pe LinkedIn și secvență de email",

    timeFlyActivities: "Arhitecturarea motoarelor complexe de creștere, scrierea analizelor strategice și optimizarea sistemelor de piață",
    naturalTopics: "Creștere organică B2B, psihologie decizională, automatizări AI, diferențiere strategică de brand",
    idealTuesday: "Dimineață dedicată creației de strategii fără întreruperi, după-amiază de consultanță strategică de nivel înalt",
    energizingTasks: "Transformarea intuiției fondatorului în sisteme de piață clare, sistematizate și scalabile",
    childhoodPassions: "Simulări de strategie, crearea de reviste și jocuri logice interactive",
    sparkDebates: "De ce majoritatea agențiilor B2B vând metrici vanitoase în loc de dominanță de categorie",
    creativeOutlets: "Eseuri provocatoare, design de brand minimalist și arhitectură de procese",

    effortlessSkills: "Identificarea instantanee a blocajelor ascunse din poziționare și comunicare",
    soughtAdvice: "Stabilirea prețurilor premium, arhitectura autorității de brand, generarea de oportunități calificate",
    hardSkills: "Analiză de creștere B2B, repoziționare strategică, fluxuri editoriale multi-canal, prompt engineering",
    softSkills: "Empatie profundă, ascultare activă structurată, comunicare de impact și sinteză contrariană",
    successPatterns: "Concentrare pe canale asimetrice de distribuție, eliminarea zgomotului inutil și creare de active IP durabile",
    problemSolvingWay: "Deconstrucție după primele principii urmată de prototipare rapidă și iterație sistemică",
    recurringPraise: "«Ați rezumat viziunea noastră pe 5 ani și ne-ați diferențiat în 1 oră mai bine decât o agenție în 6 luni»",

    systemicProblems: "Fondatori remarcabili construiesc produse excepționale, dar rămân invizibili din cauza lipsei de strategie clară",
    targetCommunity: "Fondatori B2B, consultanți de elită și antreprenori orientați spre excelență și impact",
    priorityCause: "Democratizarea strategiilor de CMO de nivel enterprise pentru operatori onești și ambițioși",
    practicalNeeds: "Un motor previzibil de distribuție pe 30 de zile care generează autoritate și vânzări fără epuizare",
    coreValues: ["Transparență Radicală", "Eficiență Asimetrică", "Măiestrie", "Focalizare Neclintită"],
    decadeOutlook: "Conținutul generic generat de AI va inunda platformele; doar vocea autentică a fondatorului va mai converti",
    desiredLegacy: "Sprijinirea a peste 1.000 de fondatori să își construiască afaceri durabile, extrem de profitabile și lideri de nișă",

    pastPaidServices: "Servicii de Fractional CMO (5.000€/lună), workshop-uri intensive de repoziționare, audituri de conversie",
    highValueSkills: "Design de categorie de piață, mesaje de conversie high-ticket, sisteme autonome de distribuție",
    commercialHobbies: "Publicarea de analize de business, comunități private pentru fondatori, prototipuri software",
    economicImpact: "Peste 2.4M€ în contracte încheiate de clienți datorită autorității organice construite",
    premiumOffers: "Sistemul Integrat de Poziționare și Distribuție pe 30 de Zile cu lansare multi-canal",
    growthNiches: "Consultanță B2B asistată de inteligență artificială, tehnologie enterprise, servicii high-ticket",
    monetizationModel: "Consultanță strategică premium + Abonament lunar de optimizare continuă",

    coreIntersection: "Ghidarea fondatorilor ambițioși către autoritate de piață de necontestat și clienți calificați recurenți",
    pilotProject30Days: "Lansarea unui calendar multi-canal intensiv pe 30 de zile cu analize zilnice pe LinkedIn și secvență de email",

    passion: "Transformarea intuiției fondatorului în sisteme de piață clare și scalabile",
    vocation: "Consultanță strategică de marketing și arhitectură de poziționare",
    mission: "Democratizarea strategiilor de CMO de nivel enterprise pentru fondatori ambițioși",
    profession: "Inginer de Creștere & Strateg de Poziționare",
    archetype: "VISIONARY_DISRUPTOR",
  };

  const business: BusinessData = {
    businessName: "Nexus Growth Labs România",
    websiteUrl: "https://nexusgrowthlabs.io",
    businessModel: "B2B_SERVICE",
    industry: "Consultanță B2B & Tehnologie",
    geoScope: "Global / Remote",
    currentStage: "SCALING",
    monthlyBudget: 2500,
    weeklyHours: 15,
  };

  const competitive: CompetitiveData = {
    competitors: [
      "Agenții clasice de marketing",
      "Generatoare AI generice",
      "Freelanceri fără strategie",
    ],
    marketSaturation: "HIGH",
    differentiator:
      "Un diagnostic profund de Ikigai combinat cu o arhitectură de campanie multi-canal complet automatizată ce elimină 90% din efortul de producție.",
    retentionRate: "92%",
  };

  const audience: AudienceData = {
    icpDemographics:
      "Fondatori B2B și furnizori de servicii cu venituri de 20k-100k€/lună ce doresc autoritate organică.",
    painTriggers: [
      "Prezență inconsistentă din cauza timpului limitat absorbit de livrarea proiectelor",
      "Texte de agenție generice care sună robotic și lipsite de autenticitatea fondatorului",
      "Ritm scăzut de generare de lead-uri calificate din canalele organice",
    ],
    buyingObjections: [
      "Oare va suna ca un text generic de inteligență artificială?",
      "Cât timp trebuie să investesc în mod realist în fiecare săptămână?",
    ],
    existingAssets:
      "Profil LinkedIn fondator cu 4.200 contacte, listă de email cu 1.100 abonați.",
  };

  const scope: ChannelScopeData = {
    primaryGoals: [
      "Stabilirea Autorității de Categorie",
      "Generarea a 15+ oportunități calificate/lună",
      "Construirea unui sistem automatizat de distribuție pe 30 de zile",
    ],
    reviewCadence: "MONTHLY",
    activeChannels: ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"],
  };

  return { step: 5, ikigai, business, competitive, audience, scope };
}

// ─────────────────────────────────────────────────────────────────────────────
// FRENCH DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getFrenchDemoState(): WizardFormState {
  const base = getEnglishDemoState();
  base.ikigai.locale = "FR";
  base.business.businessName = "Nexus Growth Labs France";
  base.business.industry = "Conseil B2B & Technologies";
  base.competitive.competitors = ["Agences traditionnelles", "Outils IA génériques", "Rédacteurs freelance"];
  base.competitive.differentiator = "Un diagnostic approfondi d'Ikigai combiné à une architecture de campagne omnicanale automatisée qui élimine 90% des coûts de production tout en préservant 100% de la voix authentique du fondateur.";
  base.audience.icpDemographics = "Fondateurs B2B et prestataires de services à forte valeur ajoutée générant 20k-100k€/mois recherchant une autorité prévisible.";
  base.audience.painTriggers = [
    "Présence irrégulière due aux contraintes opérationnelles de livraison client",
    "Textes d'agences génériques qui sonnent robotiques et manquent de profondeur",
    "Faible volume de prospects qualifiés issus des canaux organiques",
  ];
  base.audience.buyingObjections = [
    "Est-ce que cela sonnera comme du texte IA impersonnel ?",
    "Combien de temps dois-je investir de façon réaliste chaque semaine ?",
  ];
  base.scope.primaryGoals = [
    "Établir l'Autorité de Catégorie",
    "Générer 15+ Demandes Qualifiées Entrantes/mois",
    "Bâtir une Distribution Automatisée sur 30 Jours",
  ];
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// ITALIAN DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getItalianDemoState(): WizardFormState {
  const base = getEnglishDemoState();
  base.ikigai.locale = "IT";
  base.business.businessName = "Nexus Growth Labs Italia";
  base.business.industry = "Consulenza B2B & Tecnologie";
  base.competitive.competitors = ["Agenzie tradizionali", "Generatori IA generici", "Copywriter freelance"];
  base.competitive.differentiator = "Un'analisi approfondita dell'Ikigai combinata con un'architettura di campagna multicanale automatizzata che azzera il 90% del carico produttivo mantenendo al 100% l'autentica voce del fondatore.";
  base.audience.icpDemographics = "Fondatori B2B e fornitori di servizi ad alto valore che fatturano 20k-100k€/mese e cercano autorevolezza organica.";
  base.audience.painTriggers = [
    "Presenza social incostante a causa dell'impegno operativo nei progetti clienti",
    "Copy generico di agenzia che suona robotico e privo di autenticità",
    "Basso tasso di contatti qualificati dai canali organici",
  ];
  base.audience.buyingObjections = [
    "Sembrerà il solito testo generato da intelligenza artificiale?",
    "Quanto tempo dovrò realisticamente dedicare ogni settimana?",
  ];
  base.scope.primaryGoals = [
    "Stabilire l'Autorevolezza di Categoria",
    "Generare 15+ Richieste Qualificate Inbound al mese",
    "Costruire una Distribuzione Automatica a 30 Giorni",
  ];
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// POLISH DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getPolishDemoState(): WizardFormState {
  const base = getEnglishDemoState();
  base.ikigai.locale = "PL";
  base.business.businessName = "Nexus Growth Labs Polska";
  base.business.industry = "Doradztwo B2B i Nowe Technologie";
  base.competitive.competitors = ["Tradycyjne agencje marketingowe", "Generyczne generatory treści AI", "Copywriterzy bez strategii"];
  base.competitive.differentiator = "Głęboka diagnoza Ikigai połączona ze zautomatyzowaną architekturą wielokanałowej kampanii, która eliminuje 90% wysiłku produkcyjnego przy zachowaniu w 100% autentycznego głosu założyciela.";
  base.audience.icpDemographics = "Założyciele B2B i dostawcy usług premium generujący 20k-100k $/mies., poszukujący przewidywalnego autorytetu.";
  base.audience.painTriggers = [
    "Nieregularna obecność w mediach z powodu realizacji bieżących projektów dla klientów",
    "Generyczne teksty agencji, które brzmią sztucznie i nie oddają wiedzy założyciela",
    "Niska konwersja leadów z kanałów organicznych",
  ];
  base.audience.buyingObjections = [
    "Czy to nie zabrzmi jak bezduszny tekst z AI?",
    "Ile czasu realistycznie muszę na to poświęcić w każdym tygodniu?",
  ];
  base.scope.primaryGoals = [
    "Zbudowanie Dominacji w Kategorii",
    "Generowanie 15+ Kwalifikowanych Leadów Przychodzących/mies.",
    "Zbudowanie Zautomatyzowanej Dystrybucji na 30 Dni",
  ];
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// SPANISH DEMO STATE
// ─────────────────────────────────────────────────────────────────────────────
function getSpanishDemoState(): WizardFormState {
  const base = getEnglishDemoState();
  base.ikigai.locale = "ES";
  base.business.businessName = "Nexus Growth Labs España";
  base.business.industry = "Asesoría Estratégica B2B y Tecnología";
  base.competitive.competitors = ["Agencias tradicionales", "Herramientas de IA genéricas", "Copywriters freelance"];
  base.competitive.differentiator = "Un diagnóstico profundo de Ikigai combinado con una arquitectura de campaña multicanal automatizada que elimina el 90% del esfuerzo de producción manteniendo al 100% la voz auténtica del fundador.";
  base.audience.icpDemographics = "Fundadores B2B y proveedores de servicios de alto valor con facturación de 20k-100k €/mes en busca de autoridad predecible.";
  base.audience.painTriggers = [
    "Presencia discontinua en redes debido a la carga operativa con clientes",
    "Contenido genérico de agencia que suena robótico y carece de profundidad",
    "Bajo ritmo de generación de oportunidades desde canales orgánicos",
  ];
  base.audience.buyingObjections = [
    "¿Sonará como contenido genérico de inteligencia artificial?",
    "¿Cuánto tiempo tendré que invertir de forma realista cada semana?",
  ];
  base.scope.primaryGoals = [
    "Establecer Autoridad de Categoría",
    "Generar más de 15 consultas cualificadas al mes",
    "Construir una Distribución Automatizada de 30 Días",
  ];
  return base;
}
