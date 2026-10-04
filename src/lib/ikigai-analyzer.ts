import { IkigaiData, IkigaiFitAnalysisResult, BusinessFitProposal, BusinessModelType } from "./types";
import { getLocalizedCoreValue } from "./core-values";

const LOCALIZED_ANALYSIS_STRINGS: Record<string, {
  defaultStatement: (p: string, v: string, m: string) => string;
  defaultSuperpowers: [string, string, string];
  defaultOpportunity: (comm: string, prob: string) => string;
  proposals: [
    {
      title: string;
      businessModelType: BusinessModelType;
      industry: string;
      differentiator: string;
      whyYouFit: [string, string];
      monetizationPath: string;
      recommended30DayMVP: string;
    },
    {
      title: string;
      businessModelType: BusinessModelType;
      industry: string;
      differentiator: string;
      whyYouFit: [string, string];
      monetizationPath: string;
      recommended30DayMVP: string;
    },
    {
      title: string;
      businessModelType: BusinessModelType;
      industry: string;
      differentiator: string;
      whyYouFit: [string, string];
      monetizationPath: string;
      recommended30DayMVP: string;
    }
  ];
}> = {
  ro: {
    defaultStatement: (p, v, m) =>
      `Îmbină ${p || "pasiunea pentru excelență strategică"} cu ${v || "abilitățile analitice și de deconstrucție"} pentru a rezolva ${m || "lipsa de vizibilitate a liderilor autentici"}.`,
    defaultSuperpowers: [
      "Arhitectură Strategică și Sinteză de Înalt Impact",
      "Deconstrucție Sistemică a Problemelor Complexe",
      "Claritate în Poziționare și Mesaje de Conversie",
    ],
    defaultOpportunity: (comm, prob) =>
      `Comunitate: ${comm || "Fondatori B2B și Lideri de Nișă"}. Oportunitate: ${prob || "Eliminarea zgomotului generic de marketing prin autoritate autentică fundamentată pe date"}.`,
    proposals: [
      {
        title: "B2B Fractional CMO & Systems Architect",
        businessModelType: "B2B_SERVICE",
        industry: "Consultanță Strategică B2B & Tehnologie",
        differentiator: "Diagnoză integrată Ikigai cu arhitectură de campanie multi-canal axată pe autoritate de lider de piață.",
        whyYouFit: [
          "Valorifică abilitățile tale de sinteză strategică și expertiza directă de piață fără birocrație de agenție.",
          "Monetizează imediat autoritatea ta profesională prin parteneriate strategice de nivel înalt.",
        ],
        monetizationPath: "Retainer lunar premium ($4,000 – $8,000/lună per client de advisory)",
        recommended30DayMVP: "Audit de Poziționare și Roadmap Strategic pe 30 de zile pentru 2 clienți pilot fondatori.",
      },
      {
        title: "Boutique Thought Leadership & Content Studio",
        businessModelType: "CREATOR",
        industry: "Media Digitală & Autoritate Executivă",
        differentiator: "Generare de active IP proprii și distribuție multi-canal centrată pe perspectiva unică a fondatorului.",
        whyYouFit: [
          "Transformă viziunea ta și pasiunea pentru comunicare de substanță într-un motor de atragere organică.",
          "Creează un flux continuu de oportunități calificate eliminând marketingul agresiv sau nesincer.",
        ],
        monetizationPath: "Pachet lunar de producție IP & strategie ($2,500 – $5,000/lună)",
        recommended30DayMVP: "Lansarea unei serii de 10 analize de profunzime pe LinkedIn și newsletter săptămânal pentru lideri.",
      },
      {
        title: "Productized Advisory & Framework Platform",
        businessModelType: "B2B_SAAS",
        industry: "Software & Metodologii Scalabile B2B",
        differentiator: "Sistem digitalizat bazat pe algoritmi proprietari de diagnoză și accelerare a creșterii.",
        whyYouFit: [
          "Permite scalarea metodelor tale către zeci de echipe fără a depinde 100% de timpul tău 1-la-1.",
          "Creează active durabile cu venituri recurente și marje ridicate de profit.",
        ],
        monetizationPath: "Abonament hibrid Software + Comunitate Mastermind ($299 – $999/lună)",
        recommended30DayMVP: "Cohortă pilot pe 30 de zile cu 5 companii testând framework-ul digitalizat de diagnostic.",
      },
    ],
  },
  en: {
    defaultStatement: (p, v, m) =>
      `Synthesizes ${p || "deep passion for strategic mastery"} with ${v || "proven diagnostic & systemic problem-solving skills"} to solve ${m || "the invisibility of high-integrity operators in noisy markets"}.`,
    defaultSuperpowers: [
      "High-Leverage Strategic Synthesis & Category Architecture",
      "Systemic Deconstruction of Complex Commercial Bottlenecks",
      "High-Ticket Messaging Clarity & Authentic Founder Voice",
    ],
    defaultOpportunity: (comm, prob) =>
      `Target: ${comm || "Visionary B2B Founders and High-Value Operators"}. Core Problem: ${prob || "Replacing generic marketing fluff with a predictable organic authority engine"}.`,
    proposals: [
      {
        title: "B2B Fractional CMO & Systems Architect",
        businessModelType: "B2B_SERVICE",
        industry: "Strategic Advisory & B2B Technology",
        differentiator: "Proprietary Ikigai-driven diagnostic engine combined with automated multi-channel campaign architectures.",
        whyYouFit: [
          "Directly capitalizes on your unique ability to see category blindspots and architect execution systems.",
          "Commands tier-one retainers without the overhead or slow turnaround of traditional marketing agencies.",
        ],
        monetizationPath: "High-Ticket Monthly Retainer ($5,000 – $10,000/mo per enterprise account)",
        recommended30DayMVP: "A 30-Day Brand Positioning Sprint & Multi-Channel Operating Plan for 2 pilot founders.",
      },
      {
        title: "Executive Thought Leadership Studio",
        businessModelType: "CREATOR",
        industry: "Executive Media & Organic Authority Systems",
        differentiator: "Zero-fluff intellectual property extraction turning domain expertise into category dominance.",
        whyYouFit: [
          "Transforms your natural research habits and authentic values into an inbound magnet for elite buyers.",
          "Establishes permanent intellectual property assets rather than ephemeral social media posts.",
        ],
        monetizationPath: "Productized Content Engine ($3,000 – $6,000/mo retainer)",
        recommended30DayMVP: "A 4-week Founder Authority Sprint with daily multi-channel distribution and core thesis manifesto.",
      },
      {
        title: "Scalable Advisory & Methodology Platform",
        businessModelType: "B2B_SAAS",
        industry: "B2B Software & Diagnostic Playbooks",
        differentiator: "Automated algorithmic assessment combined with self-serve execution sprints.",
        whyYouFit: [
          "Enables unconstrained leverage by packaging your diagnostic instincts into repeatable digital assets.",
          "Builds high-margin, compounding recurring revenue independent of your individual calendar hours.",
        ],
        monetizationPath: "Software + Advisory Hybrid ($350 – $1,200/mo per seat/organization)",
        recommended30DayMVP: "A 30-day closed beta cohort with 5 companies running the structured diagnostic workflow.",
      },
    ],
  },
  de: {
    defaultStatement: (p, v, m) =>
      `Verbindet ${p || "Leidenschaft für strategische Exzellenz"} mit ${v || "analytischer Systemkompetenz"}, um ${m || "wertvollen Unternehmern zu unverwechselbarer Marktführerschaft zu verhelfen"}.`,
    defaultSuperpowers: [
      "Strategische Kategoriengestaltung und Systemarchitektur",
      "Präzise Dekonstruktion komplexer Marktengpässe",
      "Kompromisslose Positionierung und High-Signal-Kommunikation",
    ],
    defaultOpportunity: (comm, prob) =>
      `Zielgruppe: ${comm || "Visionäre B2B-Gründer"}. Marktlücke: ${prob || "Austauschbares Agenturmarketing durch datengestützte Gründerautorität ersetzen"}.`,
    proposals: [
      {
        title: "Fractional CMO & B2B-Strategie-Architektur",
        businessModelType: "B2B_SERVICE",
        industry: "Strategische B2B-Beratung & Technologie",
        differentiator: "Ganzheitliche Ikigai-Diagnoase mit automatisierter Multi-Channel-Distributionsarchitektur.",
        whyYouFit: [
          "Verknüpft Ihre analytischen Stärken mit unmittelbarer geschäftlicher Wertschöpfung.",
          "Ermöglicht erstklassige Retainer-Honorare ohne zeitraubenden Agentur-Overhead.",
        ],
        monetizationPath: "Premium-Monatsretainer (4.500 € – 8.500 €/Monat pro Mandat)",
        recommended30DayMVP: "30-Tage-Positionierungsaudit für 2 ausgewählte Pilotkunden.",
      },
      {
        title: "Executive Thought Leadership Studio",
        businessModelType: "CREATOR",
        industry: "Digitale Führungskommunikation",
        differentiator: "Authentische Gründerstimme kombiniert mit systematischer Content-Distribution.",
        whyYouFit: [
          "Macht Ihre Expertise zum verlässlichen Magneten für qualifizierte Geschäftsanfragen.",
          "Schafft nachhaltiges geistiges Eigentum statt flüchtiger Social-Media-Meldungen.",
        ],
        monetizationPath: "Produktisiertes Content- und Reputationssystem (2.800 € – 5.500 €/Monat)",
        recommended30DayMVP: "4-wöchige Thought-Leadership-Kampagne mit fundierten Marktanalysen.",
      },
      {
        title: "Skalierbare Methoden- und Softwareplattform",
        businessModelType: "B2B_SAAS",
        industry: "B2B-Software & Diagnosetools",
        differentiator: "Algorithmische Positionierungs- und Distributionsplattform für Wachstumsunternehmen.",
        whyYouFit: [
          "Ermöglicht unbegrenzte Skalierung Ihrer Methoden ohne lineare Zeitbindung.",
          "Erzeugt verlässliche wiederkehrende Einnahmen mit maximalen Margen.",
        ],
        monetizationPath: "Software-Abonnement + Community (300 € – 1.000 €/Monat)",
        recommended30DayMVP: "30-tägiger Pilot-Durchlauf mit 5 Partnerunternehmen.",
      },
    ],
  },
  fr: {
    defaultStatement: (p, v, m) =>
      `Unit ${p || "la passion de l'impact stratégique"} aux ${v || "compétences analytiques et de synthèse"} pour répondre au défi de ${m || "la visibilité des dirigeants authentiques"}.`,
    defaultSuperpowers: [
      "Architecture de Catégorie & Synthèse Stratégique",
      "Déconstruction Systémique des Problématiques Complexes",
      "Clarté de Positionnement & Voix Dirigeante Authentique",
    ],
    defaultOpportunity: (comm, prob) =>
      `Cible : ${comm || "Fondateurs B2B et Décideurs"}. Opportunité : ${prob || "Remplacer le bruit générique par une autorité de marque organique et crédible"}.`,
    proposals: [
      {
        title: "Directeur Marketing (Fractional CMO) & Architecte Système",
        businessModelType: "B2B_SERVICE",
        industry: "Conseil Stratégique B2B & Nouvelles Technologies",
        differentiator: "Diagnostic Ikigai intégré combiné à une architecture de campagne omnicanale automatisée.",
        whyYouFit: [
          "Exploite directement vos forces de synthèse stratégique auprès de clients de premier plan.",
          "Génère des forfaits mensuels élevés sans lourdeur d'agence traditionnelle.",
        ],
        monetizationPath: "Forfait mensuel premium (4 000 € – 8 000 €/mois par client)",
        recommended30DayMVP: "Sprint de Positionnement Stratégique sur 30 jours pour 2 fondateurs pilotes.",
      },
      {
        title: "Studio de Thought Leadership pour Dirigeants",
        businessModelType: "CREATOR",
        industry: "Médias Professionnels & Autorité Organique",
        differentiator: "Création d'actifs intellectuels durables diffusés sur les canaux clés des décideurs.",
        whyYouFit: [
          "Convertit votre expertise en un moteur d'attraction constant pour des prospects qualifiés.",
          "Construit une influence durable respectant scrupuleusement vos valeurs éthiques.",
        ],
        monetizationPath: "Système de contenu et d'autorité sous forme d'abonnement (2 500 € – 5 000 €/mois)",
        recommended30DayMVP: "Déploiement d'un calendrier de 30 jours axé sur des analyses sectorielles approfondies.",
      },
      {
        title: "Plateforme Méthodologique & Logiciel B2B",
        businessModelType: "B2B_SAAS",
        industry: "Logiciels B2B & Outils de Diagnostic",
        differentiator: "Automatisation logicielle des diagnostics stratégiques et des flux de campagne.",
        whyYouFit: [
          "Décuple votre impact en automatisant votre expertise sans dépendre de votre temps 1-à-1.",
          "Assure des revenus récurrents et prévisibles avec de fortes marges bénéficiaires.",
        ],
        monetizationPath: "Abonnement hybride SaaS + Accompagnement (300 € – 1 000 €/mois)",
        recommended30DayMVP: "Programme pilote de 30 jours avec 5 entreprises partenaires.",
      },
    ],
  },
  it: {
    defaultStatement: (p, v, m) =>
      `Unisce ${p || "la passione per l'eccellenza strategica"} a ${v || "competenze diagnostiche e di problem-solving"} per risolvere ${m || "l'invisibilità degli operatori di valore nei mercati digitali"}.`,
    defaultSuperpowers: [
      "Architettura di Categoria e Sintesi Strategica ad Alto Impatto",
      "Decostruzione Sistemica di Ostacoli Commerciali Complessi",
      "Chiarezza di Posizionamento e Comunicazione Efficace",
    ],
    defaultOpportunity: (comm, prob) =>
      `Community: ${comm || "Founder B2B e Consulenti di Valore"}. Problema: ${prob || "Sostituire la comunicazione superficiale con un'autorevolezza solida e verificabile"}.`,
    proposals: [
      {
        title: "Fractional CMO & Architetto dei Sistemi di Crescita",
        businessModelType: "B2B_SERVICE",
        industry: "Consulenza Strategica B2B & Tecnologia",
        differentiator: "Diagnostica Ikigai proprietaria combinata con distribuzione multicanale automatizzata.",
        whyYouFit: [
          "Valorizza le tue capacità di visione strategica e comprensione del mercato.",
          "Garantisce compensi di fascia alta senza i vincoli delle agenzie tradizionali.",
        ],
        monetizationPath: "Retainer mensile premium (3.500 € – 7.500 €/mese per account)",
        recommended30DayMVP: "Sprint di Posizionamento e Distribuzione di 30 giorni per 2 founder selezionati.",
      },
      {
        title: "Executive Thought Leadership Studio",
        businessModelType: "CREATOR",
        industry: "Media Digitali & Autorevolezza di Brand",
        differentiator: "Creazione di asset di contenuto ad alto valore privi di retorica promozionale.",
        whyYouFit: [
          "Trasforma la tua esperienza in un motore organico di lead ad alto valore.",
          "Costruisce autorevolezza solida e riconosciuta nel tuo settore di riferimento.",
        ],
        monetizationPath: "Canone mensile di produzione contenuti e posizionamento (2.200 € – 4.500 €/mese)",
        recommended30DayMVP: "Piano editoriale su misura per 30 giorni con analisi settimanali mirate.",
      },
      {
        title: "Piattaforma di Diagnostica e Metodologia B2B",
        businessModelType: "B2B_SAAS",
        industry: "Software & Metodologie Scalabili",
        differentiator: "Flusso diagnostico proprietario trasformato in soluzione digitale scalabile.",
        whyYouFit: [
          "Consente di scalare il tuo know-how a decine di aziende contemporaneamente.",
          "Gera entrate ricorrenti con margini operativi estremamente elevati.",
        ],
        monetizationPath: "SaaS + Mastermind Specialistico (250 € – 800 €/mese)",
        recommended30DayMVP: "Gruppo pilota di 30 giorni con 5 organizzazioni che applicano il framework.",
      },
    ],
  },
  pl: {
    defaultStatement: (p, v, m) =>
      `Łączy ${p || "pasję do strategicznego mistrzostwa"} z ${v || "analitycznymi zdolnościami dekonstrukcji problemów"}, by rozwiązać ${m || "problem niewidoczności wartościowych ekspertów na głośnym rynku"}.`,
    defaultSuperpowers: [
      "Architektura Strategiczna i Pozycjonowanie Rynkowe",
      "Systemowa Dekonstrukcja Problemów Biznesowych",
      "Precyzyjna Komunikacja o Wysokim Współczynniku Wartości",
    ],
    defaultOpportunity: (comm, prob) =>
      `Społeczność: ${comm || "Założyciele B2B i Eksperci"}. Kluczowy Problem: ${prob || "Zastąpienie powierzchownego marketingu przewidywalnym systemem autorytetu"}.`,
    proposals: [
      {
        title: "B2B Fractional CMO & Architekt Systemów Wzrostu",
        businessModelType: "B2B_SERVICE",
        industry: "Doradztwo Strategiczne B2B & Nowe Technologie",
        differentiator: "Diagnoza Ikigai połączona z zautomatyzowaną dystrybucją wielokanałową.",
        whyYouFit: [
          "Maksymalizuje Twoje umiejętności strategicznej syntezy w bezpośredniej pracy z decydentami.",
          "Zapewnia wysokie stawki abonamentowe bez tradycyjnego narzutu agencji marketingowej.",
        ],
        monetizationPath: "Wysokobudżetowy retainer miesięczny (15 000 zł – 35 000 zł/mies.)",
        recommended30DayMVP: "30-dniowy Sprint Pozycjonowania i Strategii dla 2 założycieli pilotażowych.",
      },
      {
        title: "Executive Thought Leadership Studio",
        businessModelType: "CREATOR",
        industry: "Media Biznesowe i Budowa Autorytetu Organicznego",
        differentiator: "Ekstrakcja autentycznej wiedzy eksperckiej w konkretne aktywa wielokanałowe.",
        whyYouFit: [
          "Przekształca Twoje codzienne analizy w magnes przyciągający idealnych partnerów i klientów.",
          "Buduje trwały kapitał intelektualny zamiast ulotnych wpisów w mediach społecznościowych.",
        ],
        monetizationPath: "Pakiet stałej produkcji treści i strategii (8 000 zł – 18 000 zł/mies.)",
        recommended30DayMVP: "4-tygodniowy plan autorytetu założyciela z intensywną dystrybucją organiczną.",
      },
      {
        title: "Skalowalna Platforma Diagnostyczna i Szkoleniowa",
        businessModelType: "B2B_SAAS",
        industry: "Oprogramowanie B2B i Metodologie Cyfrowe",
        differentiator: "Cyfrowy system diagnostyki biznesowej połączony ze zautomatyzowanym workflow.",
        whyYouFit: [
          "Pozwala na skalowanie Twojej unikalnej wiedzy do wielu klientów równolegle.",
          "Generuje powtarzalny, wysokonarzutowy przychód subskrypcyjny.",
        ],
        monetizationPath: "Model hybrydowy Oprogramowanie + Mentoring (1 200 zł – 4 000 zł/mies.)",
        recommended30DayMVP: "30-dniowa grupa testowa z 5 przedsiębiorstwami weryfikującymi system.",
      },
    ],
  },
  es: {
    defaultStatement: (p, v, m) =>
      `Combina ${p || "la pasión por la excelencia estratégica"} con ${v || "habilidades diagnósticas y resolución sistémica"} para solucionar ${m || "la invisibilidad de empresas con propósito en mercados saturados"}.`,
    defaultSuperpowers: [
      "Arquitectura de Categoría y Síntesis Estratégica",
      "Deconstrucción Sistémica de Cuellos de Botella Comerciales",
      "Claridad de Mensaje y Autoridad Auténtica del Fundador",
    ],
    defaultOpportunity: (comm, prob) =>
      `Comunidad: ${comm || "Fundadores B2B y Consultores de Élite"}. Oportunidad: ${prob || "Sustituir el marketing genérico por un motor predecible de autoridad orgánica"}.`,
    proposals: [
      {
        title: "Fractional CMO & Arquitecto de Sistemas B2B",
        businessModelType: "B2B_SERVICE",
        industry: "Asesoría Estratégica B2B & Tecnología",
        differentiator: "Diagnóstico profundo Ikigai con arquitectura de campaña multicanal automatizada.",
        whyYouFit: [
          "Capitaliza de inmediato tu visión estratégica y comprensión del mercado.",
          "Permite acuerdos de alto valor sin la estructura pesada de una agencia tradicional.",
        ],
        monetizationPath: "Retainer mensual premium ($4,000 – $8,500/mes por cliente)",
        recommended30DayMVP: "Sprint de Posicionamiento y Plan Operativo de 30 días para 2 clientes piloto.",
      },
      {
        title: "Estudio de Liderazgo Intelectual para Ejecutivos",
        businessModelType: "CREATOR",
        industry: "Medios Digitales & Autoridad de Marca",
        differentiator: "Generación de activos de propiedad intelectual sin contenido de relleno ni mensajes artificiales.",
        whyYouFit: [
          "Convierte tus conocimientos en un imán orgánico para clientes cualificados.",
          "Crea autoridad duradera respetando al 100% tus principios de integridad.",
        ],
        monetizationPath: "Sistema paquetizado de contenidos y posicionamiento ($2,500 – $5,000/mes)",
        recommended30DayMVP: "Lanzamiento de un calendario editorial de 30 días con análisis semanales de alto valor.",
      },
      {
        title: "Plataforma de Metodología y Software B2B",
        businessModelType: "B2B_SAAS",
        industry: "Software B2B & Herramientas de Diagnóstico",
        differentiator: "Diagnóstico digitalizado con flujos automatizados de ejecución de campañas.",
        whyYouFit: [
          "Desbloquea el apalancamiento al digitalizar tu conocimiento en soluciones escalables.",
          "Genera ingresos recurrentes estables con márgenes operativos muy elevados.",
        ],
        monetizationPath: "SaaS híbrido con comunidad de mastermind ($300 – $1,000/mes)",
        recommended30DayMVP: "Cohorte piloto de 30 días con 5 empresas aplicando el sistema.",
      },
    ],
  },
};

/**
 * Synthesizes 3 customized business proposals and Ikigai core statement based on 30 answered fields.
 */
export async function analyzeIkigaiBusinessFit(
  ikigai: IkigaiData,
  language: string = "en",
  apiKey?: string,
  provider: "builtin" | "openai" | "gemini" = "builtin"
): Promise<IkigaiFitAnalysisResult> {
  const langKey = LOCALIZED_ANALYSIS_STRINGS[language] ? language : "en";
  const dict = LOCALIZED_ANALYSIS_STRINGS[langKey];

  // Try live OpenAI if API key provided
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
              content: `You are an elite Business Model Architect and Ikigai Strategist. Analyze the user's complete 30-question Ikigai profile.
Return a structured JSON with:
1. "ikigaiStatement": 2-sentence crisp manifesto summarizing their core intersection.
2. "strengthsSummary": array of 3 key personal superpowers extracted from Pillar 2.
3. "marketOpportunity": 1-2 sentences on the exact market problem and audience from Pillar 3 & 4.
4. "businessProposals": array of exactly 3 distinct recommended business models, sorted by fitScore descending:
   - "title": Title of the business/service model
   - "businessModelType": exactly one of "B2B_SERVICE", "B2B_SAAS", "B2C_ECOM", "B2C_LOCAL", "CREATOR"
   - "industry": Recommended industry/domain
   - "differentiator": Core unique angle
   - "whyYouFit": array of 2 bullet points connecting their specific Ikigai answers to this model
   - "monetizationPath": Pricing and revenue strategy (e.g. retainer, subscription, productized)
   - "recommended30DayMVP": Concrete 30-day pilot offer to validate demand
   - "fitScore": integer between 80 and 97 (first should be highest ~94-96, second ~88-90, third ~82-86)
All text MUST be in ${language === "ro" ? "Romanian (Română)" : language === "de" ? "German (Deutsch)" : language === "fr" ? "French (Français)" : language === "it" ? "Italian (Italiano)" : language === "pl" ? "Polish (Polski)" : language === "es" ? "Spanish (Español)" : "English"}.`,
            },
            {
              role: "user",
              content: `Here is the user's Ikigai profile:
${JSON.stringify(ikigai, null, 2)}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.6,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        if (parsed.ikigaiStatement && Array.isArray(parsed.businessProposals) && parsed.businessProposals.length >= 3) {
          return {
            ikigaiStatement: parsed.ikigaiStatement,
            strengthsSummary: parsed.strengthsSummary || dict.defaultSuperpowers,
            marketOpportunity: parsed.marketOpportunity || dict.defaultOpportunity(ikigai.targetCommunity || "", ikigai.systemicProblems || ""),
            businessProposals: parsed.businessProposals.slice(0, 3).map((p: any, idx: number) => ({
              id: `model-${idx + 1}`,
              title: p.title || dict.proposals[idx].title,
              businessModelType: (["B2B_SERVICE", "B2B_SAAS", "B2C_ECOM", "B2C_LOCAL", "CREATOR"].includes(p.businessModelType)
                ? p.businessModelType
                : dict.proposals[idx].businessModelType) as BusinessModelType,
              industry: p.industry || dict.proposals[idx].industry,
              differentiator: p.differentiator || dict.proposals[idx].differentiator,
              whyYouFit: Array.isArray(p.whyYouFit) && p.whyYouFit.length >= 2 ? p.whyYouFit.slice(0, 2) : dict.proposals[idx].whyYouFit,
              monetizationPath: p.monetizationPath || dict.proposals[idx].monetizationPath,
              recommended30DayMVP: p.recommended30DayMVP || dict.proposals[idx].recommended30DayMVP,
              fitScore: typeof p.fitScore === "number" ? p.fitScore : idx === 0 ? 95 : idx === 1 ? 89 : 83,
            })),
          };
        }
      }
    } catch (e) {
      console.warn("Live OpenAI Ikigai analysis failed, falling back to built-in engine:", e);
    }
  }

  // Built-in Deterministic & Personalized Multilingual Engine
  const passion = ikigai.p1_energizing_tasks || ikigai.p1_time_loss || ikigai.passion || "";
  const vocation = ikigai.p2_effortless_skills || ikigai.p2_hard_skills || ikigai.vocation || "";
  const mission = ikigai.p3_systemic_injustice || ikigai.p3_community_to_help || ikigai.mission || "";
  const profession = ikigai.p4_market_paid_skills || ikigai.p4_premium_assets || ikigai.profession || "";
  const pilot = ikigai.pilot_30_days || ikigai.pilotProject30Days || "";
  const community = ikigai.p3_community_to_help || ikigai.targetCommunity || "";
  const problem = ikigai.p3_systemic_injustice || ikigai.systemicProblems || "";

  const ikigaiStatement =
    ikigai.overlap_synthesis ||
    ikigai.coreIntersection ||
    dict.defaultStatement(passion, vocation, mission);

  const superpowers: [string, string, string] = [
    ikigai.p2_effortless_skills || ikigai.effortlessSkills || dict.defaultSuperpowers[0],
    ikigai.p2_sought_advice || ikigai.soughtAdvice || dict.defaultSuperpowers[1],
    ikigai.p2_recurring_praise || ikigai.recurringPraise || dict.defaultSuperpowers[2],
  ];

  const marketOpportunity = dict.defaultOpportunity(community, problem);

  // Custom-tailor proposals based on user inputs
  const proposals: BusinessFitProposal[] = [
    {
      id: "model-1",
      title: dict.proposals[0].title,
      businessModelType: dict.proposals[0].businessModelType,
      industry: profession ? `${dict.proposals[0].industry} (${profession.slice(0, 30)})` : dict.proposals[0].industry,
      differentiator: dict.proposals[0].differentiator,
      whyYouFit: [
        vocation
          ? (langKey === "ro" ? `Te bazezi direct pe abilitatea ta dovedită: "${vocation.slice(0, 75)}".` : `Directly capitalizes on your proven capability: "${vocation.slice(0, 75)}".`)
          : dict.proposals[0].whyYouFit[0],
        mission
          ? (langKey === "ro" ? `Răspunde nevoii urgente identificate în piață: "${mission.slice(0, 75)}".` : `Solves the acute market pain point: "${mission.slice(0, 75)}".`)
          : dict.proposals[0].whyYouFit[1],
      ],
      monetizationPath: dict.proposals[0].monetizationPath,
      recommended30DayMVP: pilot || dict.proposals[0].recommended30DayMVP,
      fitScore: 95,
    },
    {
      id: "model-2",
      title: dict.proposals[1].title,
      businessModelType: dict.proposals[1].businessModelType,
      industry: dict.proposals[1].industry,
      differentiator: dict.proposals[1].differentiator,
      whyYouFit: [
        passion
          ? (langKey === "ro" ? `Amplifică pasiunea ta nativă: "${passion.slice(0, 75)}".` : `Amplifies your natural drive: "${passion.slice(0, 75)}".`)
          : dict.proposals[1].whyYouFit[0],
        dict.proposals[1].whyYouFit[1],
      ],
      monetizationPath: dict.proposals[1].monetizationPath,
      recommended30DayMVP: dict.proposals[1].recommended30DayMVP,
      fitScore: 89,
    },
    {
      id: "model-3",
      title: dict.proposals[2].title,
      businessModelType: dict.proposals[2].businessModelType,
      industry: dict.proposals[2].industry,
      differentiator: dict.proposals[2].differentiator,
      whyYouFit: [
        dict.proposals[2].whyYouFit[0],
        dict.proposals[2].whyYouFit[1],
      ],
      monetizationPath: dict.proposals[2].monetizationPath,
      recommended30DayMVP: dict.proposals[2].recommended30DayMVP,
      fitScore: 83,
    },
  ];

  return {
    ikigaiStatement,
    strengthsSummary: superpowers,
    marketOpportunity,
    businessProposals: proposals,
  };
}
