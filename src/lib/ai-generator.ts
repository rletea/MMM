import {
  WizardFormState,
  StrategyPlanOutput,
  GeneratedPostItem,
  ChannelType,
  ContentFormatType,
  ContentPillar,
} from "./types";
import { LanguageCode } from "./i18n/types";

export interface AIStrategyGenerationResult {
  strategy: StrategyPlanOutput;
  contents: GeneratedPostItem[];
}

export async function generateMarketingStrategy(
  formState: WizardFormState,
  apiKey?: string,
  provider: "builtin" | "openai" | "gemini" = "builtin",
  language: string = "en"
): Promise<AIStrategyGenerationResult> {
  const langNameMap: Record<string, string> = {
    en: "English",
    de: "German (Deutsch)",
    fr: "French (Français)",
    it: "Italian (Italiano)",
    pl: "Polish (Polski)",
    ro: "Romanian (Română)",
    es: "Spanish (Español)",
  };
  const targetLanguage = langNameMap[language] || "English";

  // If OpenAI API key is supplied, attempt live generation
  if (apiKey && provider === "openai") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an elite CMO and Brand Strategist. Return a comprehensive marketing strategy and 30-day content calendar in valid JSON matching the requested schema. All output content (brand manifesto, positioning document, content pillars, weekly distribution matrix, hooks, posts, video scripts) MUST be written fluently in ${targetLanguage}.`,
            },
            {
              role: "user",
              content: `Generate a brand manifesto, positioning doc, 4 content pillars, weekly distribution matrix, and 30 unique multi-channel content posts in ${targetLanguage} for:
Business: ${JSON.stringify(formState.business)}
Ikigai: ${JSON.stringify(formState.ikigai)}
Competitive: ${JSON.stringify(formState.competitive)}
Audience: ${JSON.stringify(formState.audience)}
Scope: ${JSON.stringify(formState.scope)}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.strategy && parsed.contents) {
          return parsed as AIStrategyGenerationResult;
        }
      }
    } catch (err) {
      console.warn("OpenAI generation fallback to built-in synthesizer:", err);
    }
  }

  // Built-in Multilingual Generative Synthesizer Engine
  return synthesizeStrategyAndContent(formState, language);
}

// Multilingual Dictionary & Templates
interface LocalizedTemplates {
  manifestoHeading: (brand: string) => string;
  manifestoBelief: (industry: string) => string;
  manifestoProblem: string;
  manifestoStand: (brand: string, arch: string) => string;
  manifestoPassion: (p: string) => string;
  manifestoProfession: (prof: string, icp: string) => string;
  manifestoMission: (m: string) => string;
  manifestoRefuse: (diff: string) => string;
  manifestoValues: (v: string) => string;
  manifestoPromise: string;
  positioningHeading: string;
  positioningFor: (icp: string, pain: string, brand: string, model: string, ind: string, diff: string) => string;
  positioningUnlike: (brand: string, passion: string, prof: string, arch: string) => string;
  positioningAnchors: string;
  pillar1Title: string;
  pillar1Desc: (ind: string, arch: string) => string;
  pillar2Title: string;
  pillar2Desc: (pain: string) => string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  days: string[];
}

const TEMPLATES: Record<string, LocalizedTemplates> = {
  ro: {
    manifestoHeading: (b) => `# MANIFESTUL BRANDULUI ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Credem că adevărata excelență în ${ind} nu este un accident—este o disciplină asumată și conștientă.`,
    manifestoProblem: `Prea mulți din piață se mulțumesc cu soluții superficiale, șabloane generice și zgomot de scurtă durată. Ei uită elementul uman, misiunea autentică și puterea incontestabilă a măiestriei profesionale.`,
    manifestoStand: (b, arch) => `La ${b}, ne poziționăm ferm ca un **${arch}**.`,
    manifestoPassion: (p) => `Pasiunea noastră este ${p}.`,
    manifestoProfession: (prof, icp) => `Profesia noastră este de a livra rezultate măsurabile și de mare impact pentru ${icp}.`,
    manifestoMission: (m) => `Misiunea noastră este clară: ${m}.`,
    manifestoRefuse: (diff) => `Refuzăm mediocritatea din industrie. Definim noi standarde de performanță prin ${diff}.`,
    manifestoValues: (v) => `Fiecare soluție pe care o lansăm, fiecare cunoștință pe care o împărtășim și fiecare conversație pe care o inițiem este ghidată de valorile noastre fundamentale: ${v}.`,
    manifestoPromise: `Aceasta este măiestria noastră. Aceasta este promisiunea noastră fermă.`,
    positioningHeading: `### Declarație Strategică de Poziționare`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Pentru **${icp}** care se confruntă cu **${pain}**, **${brand}** este partenerul premium de **${model}** din sectorul **${ind}** care oferă **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `Spre deosebire de alternativele generice din piață, ${brand} unește **${passion}** cu o rigurozitate tehnică de **${prof}**, întruchipând arhetipul de **${arch}** pentru a transforma blocajele complexe în avantaje competitive previzibile.`,
    positioningAnchors: `#### Piloni Cheie de Valoare:\n1. **Specializare Absolută**: Creat exclusiv pentru profilul ideal de client.\n2. **Avantaj Distinctiv**: Bazat pe angajamentul nostru unic de diferențiere.\n3. **Misiune Asumată**: Ghidată de mandatul de a livra transformare reală.`,
    pillar1Title: "Pilonul 1: Adevăruri Contraintuitive & Thought Leadership",
    pillar1Desc: (ind, arch) => `Demontăm miturile comune din ${ind} contrastând abordările depășite cu perspectiva noastră de ${arch}.`,
    pillar2Title: "Pilonul 2: Studii de Caz & Decodificări Tactice",
    pillar2Desc: (pain) => `Transparență pas cu pas demonstrând exact cum metodologia noastră rezolvă ${pain}.`,
    pillar3Title: "Pilonul 3: Viziune Ikigai & În Culisele Fondatorului",
    pillar3Desc: `Umanizarea brandului prin valori fundamentale, povești de origine și etica muncii noastre.`,
    pillar4Title: "Pilonul 4: Conversie Directă & Clarificarea Ofertei",
    pillar4Desc: `Apeluri la acțiune directe și clare care răspund obiecțiilor de cumpărare și generează oportunități calificate.`,
    days: ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
  },
  de: {
    manifestoHeading: (b) => `# DAS MANIFEST VON ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Wir glauben, dass echte Exzellenz in ${ind} kein Zufall ist – sondern eine bewusste Disziplin.`,
    manifestoProblem: `Zu viele in unserer Branche begnügen sich mit oberflächlichen Lösungen, Standard-Vorlagen und kurzfristigem Lärm. Sie vergessen das menschliche Element und die Kraft echter Meisterschaft.`,
    manifestoStand: (b, arch) => `Bei ${b} stehen wir fest als **${arch}**.`,
    manifestoPassion: (p) => `Unsere Leidenschaft ist ${p}.`,
    manifestoProfession: (prof, icp) => `Unser Beruf ist es, messbare und wirkungsvolle Ergebnisse für ${icp} zu erzielen.`,
    manifestoMission: (m) => `Unsere Mission ist klar: ${m}.`,
    manifestoRefuse: (diff) => `Wir verweigern Mittelmäßigkeit. Wir setzen neue Maßstäbe durch ${diff}.`,
    manifestoValues: (v) => `Jede Lösung und jede Konversation wird von unseren Grundwerten geleitet: ${v}.`,
    manifestoPromise: `Das ist unser Handwerk. Das ist unser Versprechen.`,
    positioningHeading: `### Strategische Positionierung`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Für **${icp}**, die mit **${pain}** kämpfen, ist **${brand}** der führende **${model}**-Partner in **${ind}**, der **${diff}** liefert.`,
    positioningUnlike: (brand, passion, prof, arch) => `Im Gegensatz zu gewöhnlichen Alternativen verbindet ${brand} **${passion}** mit fundierter **${prof}**-Kompetenz und verkörpert den **${arch}**-Archetyp.`,
    positioningAnchors: `#### Zentrale Werteanker:\n1. **Präzise Spezialisierung**: Maßgeschneidert für Ihr ideales Kundenprofil.\n2. **Einzigartiger Vorteil**: Basierend auf unserer klaren Differenzierung.\n3. **Gründermission**: Fokussiert auf messbare Transformation.`,
    pillar1Title: "Säule 1: Kontraintuitive Wahrheiten & Thought Leadership",
    pillar1Desc: (ind, arch) => `Widerlegen gängiger Mythen in ${ind} durch unsere ${arch}-Perspektive.`,
    pillar2Title: "Säule 2: Fallstudien & Taktische Analysen",
    pillar2Desc: (pain) => `Schritt-für-Schritt-Transparenz, wie unsere Methode ${pain} löst.`,
    pillar3Title: "Säule 3: Ikigai & Hinter den Kulissen",
    pillar3Desc: `Menschlichkeit der Marke durch Grundwerte, Entstehungsgeschichten und Gründergeist.`,
    pillar4Title: "Säule 4: Direkte Konversion & Angebotsklarheit",
    pillar4Desc: `Klare Handlungsaufforderungen, die Einwände adressieren und qualifizierte Anfragen generieren.`,
    days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
  },
  fr: {
    manifestoHeading: (b) => `# LE MANIFESTE DE ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Nous croyons que la véritable excellence dans le secteur ${ind} n'est pas un hasard—c'est une discipline consciente.`,
    manifestoProblem: `Trop d'acteurs se contentent de solutions superficielles et de bruit passager. Ils oublient la dimension humaine et la puissance d'une maîtrise authentique.`,
    manifestoStand: (b, arch) => `Chez ${b}, nous nous positionnons comme un **${arch}**.`,
    manifestoPassion: (p) => `Notre passion est ${p}.`,
    manifestoProfession: (prof, icp) => `Notre profession consiste à délivrer des résultats mesurables pour ${icp}.`,
    manifestoMission: (m) => `Notre mission est claire : ${m}.`,
    manifestoRefuse: (diff) => `Nous refusons la médiocrité. Nous définissons de nouveaux standards grâce à ${diff}.`,
    manifestoValues: (v) => `Chaque solution est guidée par nos valeurs clés : ${v}.`,
    manifestoPromise: `C'est notre savoir-faire. C'est notre engagement.`,
    positioningHeading: `### Déclaration Stratégique de Positionnement`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Pour **${icp}** qui font face à **${pain}**, **${brand}** est le partenaire d'élite en **${model}** dans **${ind}** apportant **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `À la différence des offres standardisées, ${brand} allie **${passion}** et expertise de pointe en **${prof}** sous l'archétype **${arch}**.`,
    positioningAnchors: `#### Piliers de Valeur Majeurs :\n1. **Spécialisation Pointue** : Conçu sur mesure pour votre cible idéale.\n2. **Avantage Distinctif** : Ancré dans notre promesse de différenciation.\n3. **Mission Fondatrice** : Dédiée à l'obtention de résultats probants.`,
    pillar1Title: "Pilier 1 : Vérités Contre-Intuitives & Leadership d'Opinion",
    pillar1Desc: (ind, arch) => `Démystification des pratiques obsolètes en ${ind} avec notre vision de ${arch}.`,
    pillar2Title: "Pilier 2 : Études de Cas & Décorticage Tactique",
    pillar2Desc: (pain) => `Démonstrations détaillées prouvant comment nous résolvons ${pain}.`,
    pillar3Title: "Pilier 3 : Coulisses Ikigai & Éthique Fondatrice",
    pillar3Desc: `Humanisation de la marque à travers nos valeurs clés et notre savoir-faire.`,
    pillar4Title: "Pilier 4 : Conversion Directe & Clarté de l'Offre",
    pillar4Desc: `Appels à l'action précis levant les objections d'achat pour générer des prospects qualifiés.`,
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  },
  it: {
    manifestoHeading: (b) => `# IL MANIFESTO DI ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Crediamo che la vera eccellenza in ${ind} non sia un caso—è una disciplina consapevole.`,
    manifestoProblem: `Troppi nel settore si accontentano di soluzioni superficiali e rumore passeggero. Dimenticano l'elemento umano e il potere della vera maestria.`,
    manifestoStand: (b, arch) => `In ${b}, ci poniamo come **${arch}**.`,
    manifestoPassion: (p) => `La nostra passione è ${p}.`,
    manifestoProfession: (prof, icp) => `La nostra professione è generare risultati misurabili per ${icp}.`,
    manifestoMission: (m) => `La nostra missione è chiara: ${m}.`,
    manifestoRefuse: (diff) => `Rifiutiamo la mediocrità. Definiamo nuovi standard attraverso ${diff}.`,
    manifestoValues: (v) => `Ogni soluzione è guidata dai nostri valori fondanti: ${v}.`,
    manifestoPromise: `Questa è la nostra arte. Questa è la nostra promessa.`,
    positioningHeading: `### Dichiarazione Strategica di Posizionamento`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Per **${icp}** che affrontano **${pain}**, **${brand}** è il partner premium di **${model}** nel settore **${ind}** che offre **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `A differenza delle alternative generiche, ${brand} unisce **${passion}** a rigorosa competenza in **${prof}**, incarnando l'archetipo **${arch}**.`,
    positioningAnchors: `#### Pilastri Fondamentali di Valore:\n1. **Specializzazione Totale**: Progettato specificamente per il target ideale.\n2. **Vantaggio Unico**: Basato sul nostro impegno differenziante.\n3. **Missione Fondativa**: Orientata a trasformazioni concrete.`,
    pillar1Title: "Pilastro 1: Verità Controintuitive & Thought Leadership",
    pillar1Desc: (ind, arch) => `Sfatare i miti comuni in ${ind} con la nostra prospettiva di ${arch}.`,
    pillar2Title: "Pilastro 2: Casi Studio & Analisi Tattiche",
    pillar2Desc: (pain) => `Trasparenza passo dopo passo su come risolviamo ${pain}.`,
    pillar3Title: "Pilastro 3: Dietro le Quinte Ikigai & Etica del Brand",
    pillar3Desc: `Umanizzare il brand attraverso i valori chiave e la passione che guida il nostro lavoro.`,
    pillar4Title: "Pilastro 4: Conversione Diretta & Chiarezza dell'Offerta",
    pillar4Desc: `Call-to-action chiare che superano le obiezioni e generano lead qualificati.`,
    days: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
  },
  pl: {
    manifestoHeading: (b) => `# MANIFEST MARKI ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Wierzymy, że prawdziwa doskonałość w branży ${ind} nie jest przypadkiem—to świadoma dyscyplina.`,
    manifestoProblem: `Zbyt wielu godzi się na powierzchowne rozwiązania i tymczasowy szum. Zapominają o ludzkim wymiarze i sile autentycznego kunsztu.`,
    manifestoStand: (b, arch) => `W ${b} stoimy twardo jako **${arch}**.`,
    manifestoPassion: (p) => `Naszą pasją jest ${p}.`,
    manifestoProfession: (prof, icp) => `Naszym zawodem jest dostarczanie mierzalnych rezultatów dla ${icp}.`,
    manifestoMission: (m) => `Nasza misja jest jasna: ${m}.`,
    manifestoRefuse: (diff) => `Odrzucamy rynkową przeciętność. Wyznaczamy nowe standardy poprzez ${diff}.`,
    manifestoValues: (v) => `Każde rozwiązanie opiera się na naszych kluczowych wartościach: ${v}.`,
    manifestoPromise: `To nasze rzemiosło. To nasza obietnica.`,
    positioningHeading: `### Strategiczny Dokument Pozycjonowania`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Dla **${icp}**, którzy zmagają się z **${pain}**, **${brand}** jest wiodącym partnerem **${model}** w branży **${ind}**, zapewniającym **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `W przeciwieństwie do szablonowych rozwiązań, ${brand} łączy **${passion}** z rzetelną wiedzą **${prof}**, reprezentując archetyp **${arch}**.`,
    positioningAnchors: `#### Kluczowe Kotwice Wartości:\n1. **Głęboka Specjalizacja**: Stworzona dokładnie dla profilu idealnego klienta.\n2. **Unikalna Przewaga**: Oparta na naszej wyraźnej dyferencjacji.\n3. **Misja Założyciela**: Ukierunkowana na realną transformację.`,
    pillar1Title: "Filar 1: Nieintuicyjne Prawdy i Thought Leadership",
    pillar1Desc: (ind, arch) => `Obalanie mitów w branży ${ind} z perspektywy archetypu ${arch}.`,
    pillar2Title: "Filar 2: Studia Przypadków & Rozbicia Taktyczne",
    pillar2Desc: (pain) => `Transparentny proces pokazujący, jak nasza metodyka rozwiązuje ${pain}.`,
    pillar3Title: "Filar 3: Ikigai & Kulisy Pracy Twórczej",
    pillar3Desc: `Budowanie relacji przez wartości, historię marki i autentyczną pasję.`,
    pillar4Title: "Filar 4: Bezpośrednia Konwersja & Jasność Oferty",
    pillar4Desc: `Konkretne wezwania do działania adresujące obiekcje zakupowe i generujące zapytania.`,
    days: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
  },
  es: {
    manifestoHeading: (b) => `# EL MANIFIESTO DE ${b.toUpperCase()}`,
    manifestoBelief: (ind) => `Creemos que la verdadera excelencia en ${ind} no es un accidente: es una disciplina consciente.`,
    manifestoProblem: `Demasiados en nuestro sector se conforman con parches superficiales y ruido pasajero. Olvidan el factor humano y el poder de la maestría auténtica.`,
    manifestoStand: (b, arch) => `En ${b}, nos posicionamos como un **${arch}**.`,
    manifestoPassion: (p) => `Nuestra pasión es ${p}.`,
    manifestoProfession: (prof, icp) => `Nuestra profesión es entregar resultados medibles e impactantes para ${icp}.`,
    manifestoMission: (m) => `Nuestra misión es clara: ${m}.`,
    manifestoRefuse: (diff) => `Rechazamos la mediocridad. Definimos nuevos estándares a través de ${diff}.`,
    manifestoValues: (v) => `Cada solución está guiada por nuestros valores fundamentales: ${v}.`,
    manifestoPromise: `Este es nuestro oficio. Esta es nuestra promesa.`,
    positioningHeading: `### Declaración Estratégica de Posicionamiento`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `Para **${icp}** que enfrentan **${pain}**, **${brand}** es el socio líder en **${model}** dentro del sector **${ind}** que proporciona **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `A diferencia de las alternativas genéricas, ${brand} une **${passion}** con rigurosa experiencia en **${prof}**, personificando el arquetipo de **${arch}**.`,
    positioningAnchors: `#### Pilares Clave de Valor:\n1. **Especialización Absoluta**: Creado a medida para el cliente ideal.\n2. **Ventaja Distintiva**: Basada en nuestro compromiso de diferenciación.\n3. **Misión Fundadora**: Enfocada en generar transformaciones reales.`,
    pillar1Title: "Pilar 1: Verdades Contraintuitivas & Liderazgo de Opinión",
    pillar1Desc: (ind, arch) => `Desmitificar prácticas obsoletas en ${ind} desde nuestra perspectiva de ${arch}.`,
    pillar2Title: "Pilar 2: Casos de Estudio & Desgloses Tácticos",
    pillar2Desc: (pain) => `Transparencia paso a paso sobre cómo resolvemos ${pain}.`,
    pillar3Title: "Pilar 3: Detrás de Escena Ikigai & Ética Fundacional",
    pillar3Desc: `Humanizar la marca a través de valores clave y la pasión que guía nuestro trabajo.`,
    pillar4Title: "Pilar 4: Conversión Directa & Claridad de Oferta",
    pillar4Desc: `Llamados a la acción directos que superan objeciones de compra y generan oportunidades.`,
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
  },
  en: {
    manifestoHeading: (b) => `# THE ${b.toUpperCase()} MANIFESTO`,
    manifestoBelief: (ind) => `We believe that true excellence in ${ind} is not an accident—it is a conscious discipline.`,
    manifestoProblem: `Too many in our space settle for superficial fixes, cookie-cutter playbooks, and short-sighted noise. They forget the human element, the deeper mission, and the undeniable power of authentic mastery.`,
    manifestoStand: (b, arch) => `At ${b}, we stand as a **${arch}**.`,
    manifestoPassion: (p) => `Our passion is ${p}.`,
    manifestoProfession: (prof, icp) => `Our profession is delivering high-impact, measurable results for ${icp}.`,
    manifestoMission: (m) => `Our mission is clear: ${m}.`,
    manifestoRefuse: (diff) => `We do not conform to industry mediocrity. We define new standards through ${diff}.`,
    manifestoValues: (v) => `Every solution we deploy, every piece of knowledge we share, and every conversation we initiate is guided by our core values: ${v}.`,
    manifestoPromise: `This is our craft. This is our promise.`,
    positioningHeading: `### Core Positioning Statement`,
    positioningFor: (icp, pain, brand, model, ind, diff) => `For **${icp}** who struggle with **${pain}**, **${brand}** is the premier **${model}** partner in the **${ind}** sector that delivers **${diff}**.`,
    positioningUnlike: (brand, passion, prof, arch) => `Unlike standard alternatives, ${brand} bridges **${passion}** with rigorous **${prof}**, embodying the **${arch}** archetype to turn complex hurdles into predictable competitive advantages.`,
    positioningAnchors: `#### Key Value Anchors:\n1. **Unrivaled Specialization**: Engineered specifically for your target audience.\n2. **Distinctive Edge**: Rooted in our unique commitment to market differentiation.\n3. **Founder Mission**: Driven by the core mandate to achieve real impact.`,
    pillar1Title: "Pillar 1: Counter-Intuitive Truths & Thought Leadership",
    pillar1Desc: (ind, arch) => `Disrupt common myths in ${ind} by contrasting outdated approaches with our ${arch} perspective.`,
    pillar2Title: "Pillar 2: Deconstructive Case Studies & Tactical Breakdowns",
    pillar2Desc: (pain) => `Step-by-step transparency showing exactly how our methodology solves ${pain}.`,
    pillar3Title: "Pillar 3: Ikigai Behind-The-Scenes & Founder Ethos",
    pillar3Desc: `Humanizing the brand through our core values, origin stories, and the passion that drives our craft.`,
    pillar4Title: "Pillar 4: Direct Conversion & Offer Clarification",
    pillar4Desc: `Frictionless calls-to-action that articulate our core service proposition, addressing buying objections head-on.`,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
};

export function synthesizeStrategyAndContent(
  state: WizardFormState,
  langCode: string = "en"
): AIStrategyGenerationResult {
  const { ikigai, business, competitive, audience, scope } = state;
  const t = TEMPLATES[langCode] || TEMPLATES.en;

  const brandName = business.businessName || "Nexus Growth Labs";
  const industry = business.industry || "B2B Advisory & Tech";
  const archetype = ikigai.archetype?.replace(/_/g, " ") || "Visionary Disruptor";
  const icp = audience.icpDemographics || "ambitious founders and business leaders";
  const differentiator =
    competitive.differentiator ||
    "an integrated Ikigai-driven diagnostic engine combined with automated multi-channel campaign architectures";
  const passion = ikigai.passion || "designing high-leverage growth architectures";
  const mission = ikigai.mission || "democratizing tier-one CMO marketing positioning";
  const profession = ikigai.profession || "strategic growth advisory";
  const pain = audience.painTriggers?.[0] || "low conversion velocity and generic marketing noise";
  const valuesStr = (ikigai.coreValues && ikigai.coreValues.length > 0
    ? ikigai.coreValues
    : ["Integrity", "Innovation", "Mastery"]
  ).join(" • ");

  const activeChannels: ChannelType[] =
    scope.activeChannels && scope.activeChannels.length > 0
      ? scope.activeChannels
      : ["LINKEDIN", "EMAIL", "INSTAGRAM", "TIKTOK"];

  // 1. Positioning Document
  const positioningDoc = `${t.positioningHeading}
${t.positioningFor(icp, pain, brandName, business.businessModel?.replace(/_/g, " "), industry, differentiator)}

${t.positioningUnlike(brandName, passion, profession, archetype)}

${t.positioningAnchors}`;

  // 2. Brand Manifesto
  const brandManifesto = `${t.manifestoHeading(brandName)}

${t.manifestoBelief(industry)}

${t.manifestoProblem}

${t.manifestoStand(brandName, archetype)}
${t.manifestoPassion(passion)}
${t.manifestoProfession(profession, icp)}
${t.manifestoMission(mission)}

${t.manifestoRefuse(differentiator)}

${t.manifestoValues(valuesStr)}

${t.manifestoPromise}`;

  // 3. 4 Strategic Content Pillars
  const contentPillars: ContentPillar[] = [
    {
      title: t.pillar1Title,
      description: t.pillar1Desc(industry, archetype),
      targetAudienceAngle: `Addresses skepticism from ${icp}.`,
      sampleHooks: [
        `Why 90% of advice in ${industry} is quietly killing your growth.`,
        `The biggest misconception founders believe about ${pain}.`,
      ],
      frequencyPerWeek: 2,
    },
    {
      title: t.pillar2Title,
      description: t.pillar2Desc(pain),
      targetAudienceAngle: `Caters to analytical decision-makers looking for concrete proof.`,
      sampleHooks: [
        `How we dismantled a major bottleneck in under 14 days.`,
        `The 3-stage blueprint we use to solve ${pain}.`,
      ],
      frequencyPerWeek: 2,
    },
    {
      title: t.pillar3Title,
      description: t.pillar3Desc,
      targetAudienceAngle: `Builds deep emotional affinity and trust with ${icp}.`,
      sampleHooks: [
        `What nobody tells you about committing to ${mission.slice(0, 45)}...`,
        `Behind the scenes at ${brandName}: How we build leverage.`,
      ],
      frequencyPerWeek: 1,
    },
    {
      title: t.pillar4Title,
      description: t.pillar4Desc,
      targetAudienceAngle: `Converts warm prospects into booked consultations.`,
      sampleHooks: [
        `If your team is struggling with ${pain}, here is your 30-day playbook.`,
        `Opening 3 private advisory spots for ${icp} this month.`,
      ],
      frequencyPerWeek: 2,
    },
  ];

  // 4. Weekly Distribution Matrix
  const weeklyCadence = t.days.map((day, idx) => {
    const channel = activeChannels[idx % activeChannels.length];
    const pillar = contentPillars[idx % contentPillars.length];
    const contentType: ContentFormatType =
      channel === "TIKTOK"
        ? "REEL_SCRIPT"
        : channel === "INSTAGRAM"
        ? idx % 2 === 0
          ? "CAROUSEL"
          : "REEL_SCRIPT"
        : channel === "EMAIL"
        ? "NEWSLETTER"
        : "POST";

    return {
      day,
      channel,
      format: contentType,
      strategicTheme: pillar.title,
    };
  });

  const strategy: StrategyPlanOutput = {
    brandManifesto,
    positioningDoc,
    contentPillars,
    weeklyCadence,
  };

  // 5. Synthesize 30 Unique Daily Posts
  const contents: GeneratedPostItem[] = [];

  const postTemplates: Record<string, { hooks: string[]; bodies: string[]; prompts: string[]; scripts: string[] }> = {
    ro: {
      hooks: [
        `De ce 90% din strategiile de ${industry} eșuează înainte de ziua 30:`,
        `Secretul contraintuitiv pe care l-am învățat construind ${brandName}:`,
        `Dacă vrei să rezolvi ${pain}, oprește-te din a face această greșeală comună:`,
        `Cum obținem rezultate previzibile pentru ${icp} fără risipă de resurse:`,
        `Adevarul despre scalare: De ce calitatea bate întotdeauna volumul haotic.`,
        `Analiza pas cu pas: Cum am transformat un proces lent într-o mașinărie automată:`,
        `Valorile noastre fundamentale nu sunt doar cuvinte pe perete. Iată cum le aplicăm:`,
      ],
      bodies: [
        `Majoritatea companiilor încearcă să rezolve probleme complexe adăugând mai multe instrumente.\n\nRealitatea? Soluția este simplitatea și concentrarea asimetrică.\n\nLa ${brandName}, aplicăm ${differentiator} pentru a aduce claritate imediată.\n\nIată cei 3 pași esențiali:\n1. Identifică blocajul critic\n2. Elimină procesele redundante\n3. Automatizează distribuția\n\nCare este cea mai mare provocare a ta în această săptămână?`,
        `Când am început ${brandName}, misiunea noastră a fost clară: ${mission}.\n\nAstăzi, vedem cum această viziune transformă modul în care ${icp} își construiesc autoritatea.\n\nNu ai nevoie de bugete gigantice, ai nevoie de un sistem bine ancorat.\n\nCe părere ai despre această abordare?`,
        `Mulți cred că succesul în ${industry} cere sacrificarea timpului personal.\n\nDar adevărata măiestrie înseamnă construirea unor sisteme care lucrează pentru tine.\n\nPrin ${differentiator}, clienții noștri își recuperează ore prețioase săptămânal.\n\nDacă ești gata pentru o schimbare, trimite-ne un mesaj direct.`,
      ],
      prompts: [
        `Un spațiu de lucru modern și minimalist, iluminat cinematic, reprezentând inovația și claritatea strategică, 8k, stil studio foto.`,
        `Grafic abstract 3D reprezentând creșterea accelerată și simplitatea sistemelor, nuanțe indigo și violet intens.`,
      ],
      scripts: [
        `[CADRU 1 - 0:00-0:03]: Privește direct în cameră.\n"Dacă ești fondator și încă pierzi ore cu marketingul manual, oprește-te acum."\n\n[CADRU 2 - 0:03-0:15]: Arată ecranul cu diagrama strategică.\n"Iată sistemul în 3 pași pe care îl folosim la ${brandName}."\n\n[CADRU 3 - 0:15-0:30]: Încheie cu CTA clar.\n"Comentează 'STRATEGIE' pentru ghidul complet."`,
      ],
    },
    de: {
      hooks: [
        `Warum 90% der Strategien in ${industry} vor Tag 30 scheitern:`,
        `Die kontraintuitive Erkenntnis beim Aufbau von ${brandName}:`,
        `Wenn Sie ${pain} lösen wollen, vermeiden Sie diesen typischen Fehler:`,
        `Wie wir planbare Ergebnisse für ${icp} ohne Ressourcenverschwendung erzielen:`,
      ],
      bodies: [
        `Die meisten Unternehmen versuchen, Probleme durch mehr Komplexität zu lösen.\n\nDie Wahrheit? Wahre Hebelwirkung entsteht durch Einfachheit.\n\nBei ${brandName} nutzen wir ${differentiator}, um sofortige Klarheit zu schaffen.\n\nWas ist Ihre größte Hürde diese Woche?`,
      ],
      prompts: [`Minimalistischer, moderner Arbeitsplatz mit cineastischer Beleuchtung, 8k Auflösung.`],
      scripts: [`[SZENE 1]: Blick direkt in die Kamera.\n"Wenn Sie als Gründer Zeit mit manuellem Marketing verschwenden, hören Sie jetzt zu..."`],
    },
    fr: {
      hooks: [
        `Pourquoi 90% des stratégies en ${industry} échouent avant le 30ème jour :`,
        `La vérité contre-intuitive apprise en développant ${brandName} :`,
        `Si vous souhaitez surmonter ${pain}, arrêtez de commettre cette erreur :`,
      ],
      bodies: [
        `La plupart des entreprises ajoutent de la complexité inutile.\n\nChez ${brandName}, nous appliquons ${differentiator} pour générer des résultats concrets pour ${icp}.\n\nQuelle est votre priorité stratégique actuelle ?`,
      ],
      prompts: [`Espace de travail moderne et élégant, éclairage studio cinématique, rendu 8k.`],
      scripts: [`[PLAN 1]: Regard caméra direct.\n"Voici pourquoi votre stratégie marketing actuelle manque d'impact..."`],
    },
    it: {
      hooks: [
        `Perché il 90% delle strategie in ${industry} fallisce entro 30 giorni:`,
        `La verità controintuitiva appresa creando ${brandName}:`,
        `Se vuoi risolvere ${pain}, evita questo errore comune:`,
      ],
      bodies: [
        `La maggior parte delle aziende cerca di risolvere i problemi aggiungendo complessità.\n\nIn ${brandName}, utilizziamo ${differentiator} per garantire chiarezza e crescita a ${icp}.\n\nQual è la tua sfida principale oggi?`,
      ],
      prompts: [`Ambiente di lavoro moderno e minimale con illuminazione cinematografica, risoluzione 8k.`],
      scripts: [`[SCENA 1]: Sguardo dritto in camera.\n"Se sei un imprenditore che spreca ore con il marketing manuale, ascolta..."`],
    },
    pl: {
      hooks: [
        `Dlaczego 90% strategii w branży ${industry} upada przed 30. dniem:`,
        `Nieintuicyjna prawda, którą odkryliśmy budując ${brandName}:`,
        `Jeśli chcesz rozwiązać problem ${pain}, przestań popełniać ten błąd:`,
      ],
      bodies: [
        `Większość firm próbuje radzić sobie z wyzwaniami dodając kolejne narzędzia.\n\nW ${brandName} stosujemy ${differentiator}, aby zapewnić ${icp} przewidywalne rezultaty.\n\nCo jest Twoim największym wyzwaniem w tym tygodniu?`,
      ],
      prompts: [`Nowoczesne, minimalistyczne biuro, oświetlenie kinowe, render 8k.`],
      scripts: [`[UJĘCIE 1]: Spojrzenie w obiektyw.\n"Jeśli jako założyciel tracisz czas na chaotyczny marketing, zobacz to..."`],
    },
    es: {
      hooks: [
        `Por qué el 90% de las estrategias en ${industry} fracasan antes del día 30:`,
        `La verdad contraintuitiva que aprendimos al crear ${brandName}:`,
        `Si quieres solucionar ${pain}, evita este error común:`,
      ],
      bodies: [
        `La mayoría de las empresas intentan resolver problemas sumando más herramientas.\n\nEn ${brandName}, aplicamos ${differentiator} para dar claridad inmediata a ${icp}.\n\n¿Cuál es tu principal desafío esta semana?`,
      ],
      prompts: [`Espacio de trabajo moderno y minimalista con iluminación cinematográfica, 8k.`],
      scripts: [`[TOMA 1]: Mirada directa a la cámara.\n"Si eres fundador y sigues perdiendo tiempo con marketing manual, detente ahora..."`],
    },
    en: {
      hooks: [
        `Why 90% of strategies in ${industry} quietly fail before Day 30:`,
        `The counter-intuitive lesson we learned while building ${brandName}:`,
        `If you want to solve ${pain}, stop making this rookie mistake:`,
        `How we generate predictable authority for ${icp} without operational burnout:`,
        `The truth about scaling: Why asymmetric leverage always beats random hustle.`,
        `Step-by-step deconstruction: How we fixed a core retention bottleneck:`,
        `Our core values are not just slogans. Here is how we put them into practice:`,
      ],
      bodies: [
        `Most businesses attempt to solve complexity by adding more tools.\n\nThe reality? True leverage comes from radical simplicity.\n\nAt ${brandName}, we apply ${differentiator} to deliver immediate clarity for ${icp}.\n\nHere are 3 core pillars:\n1. Identify the single critical constraint\n2. Eliminate low-signal activities\n3. Automate multi-channel distribution\n\nWhat is your team's biggest challenge this week?`,
        `When we started ${brandName}, our mission was uncompromising: ${mission}.\n\nToday, that vision powers predictable customer acquisition for modern operators.\n\nYou do not need massive ad budgets—you need a defensible category moat.\n\nThoughts on this?`,
      ],
      prompts: [
        `Minimalist executive workspace with subtle neon ambient light, cinematic depth of field, 8k award-winning studio photograph.`,
        `3D abstract geometric structure representing compound leverage and strategic clarity, deep indigo and violet tones.`,
      ],
      scripts: [
        `[SCENE 1 - 0:00-0:03]: Direct gaze into camera.\n"If you are a founder still spending 15 hours a week manually drafting posts, stop right now."\n\n[SCENE 2 - 0:03-0:15]: B-roll of strategic dashboard.\n"Here is the exact 3-pillar framework we use at ${brandName}."\n\n[SCENE 3 - 0:15-0:30]: Strong CTA.\n"Comment 'SCALE' and I will send you the full breakdown."`,
      ],
    },
  };

  const localizedContent = postTemplates[langCode] || postTemplates.en;

  for (let day = 1; day <= 30; day++) {
    const channel = activeChannels[(day - 1) % activeChannels.length];
    const pillar = contentPillars[(day - 1) % contentPillars.length];
    const contentType: ContentFormatType =
      channel === "TIKTOK"
        ? "REEL_SCRIPT"
        : channel === "INSTAGRAM"
        ? day % 2 === 0
          ? "CAROUSEL"
          : "REEL_SCRIPT"
        : channel === "EMAIL"
        ? "NEWSLETTER"
        : "POST";

    const hookTemplate = localizedContent.hooks[(day - 1) % localizedContent.hooks.length];
    const bodyTemplate = localizedContent.bodies[(day - 1) % localizedContent.bodies.length];
    const promptTemplate = localizedContent.prompts[(day - 1) % localizedContent.prompts.length];
    const scriptTemplate = localizedContent.scripts[(day - 1) % localizedContent.scripts.length];

    contents.push({
      id: `post-day-${day}`,
      dayNumber: day,
      channel,
      format: contentType,
      topic: `${pillar.title} (Day ${day})`,
      hook: hookTemplate,
      body: bodyTemplate,
      visualPrompt: promptTemplate,
      videoScript: scriptTemplate,
      status: day <= 3 ? "SCHEDULED" : "DRAFT",
    });
  }

  return {
    strategy,
    contents,
  };
}
