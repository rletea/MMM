import { LanguageCode } from "./types";
import { IkigaiData } from "../types";

export interface IkigaiQuestionMeta {
  key: keyof IkigaiData;
  label: string;
  hint: string;
  placeholder: string;
}

export interface IkigaiPillarConfig {
  id: "passion" | "vocation" | "mission" | "profession" | "synthesis" | "archetype";
  badge: string;
  title: string;
  desc: string;
  iconName: string;
  colorClass: string;
  questions: IkigaiQuestionMeta[];
}

export const IKIGAI_TRANSLATIONS: Record<
  LanguageCode,
  {
    tabs: {
      passion: string;
      vocation: string;
      mission: string;
      profession: string;
      synthesis: string;
      archetype: string;
    };
    ui: {
      badge: string;
      title: string;
      subtitle: string;
      fillDemo: string;
      synthesizeBtn: string;
      synthesizing: string;
      progress: string;
      monetizationModels: { id: string; label: string }[];
    };
    pillars: {
      passion: { title: string; desc: string; questions: Record<string, { label: string; hint: string; placeholder: string }> };
      vocation: { title: string; desc: string; questions: Record<string, { label: string; hint: string; placeholder: string }> };
      mission: { title: string; desc: string; questions: Record<string, { label: string; hint: string; placeholder: string }> };
      profession: { title: string; desc: string; questions: Record<string, { label: string; hint: string; placeholder: string }> };
      synthesis: { title: string; desc: string; questions: Record<string, { label: string; hint: string; placeholder: string }> };
    };
  }
> = {
  en: {
    tabs: {
      passion: "1. Passion",
      vocation: "2. Vocation",
      mission: "3. Mission",
      profession: "4. Profession",
      synthesis: "5. Synthesis",
      archetype: "Archetype & Values",
    },
    ui: {
      badge: "Step 0 • Comprehensive Founder Intake",
      title: "Ikigai Strategic Alignment Diagnostic",
      subtitle: "Uncover your foundational marketing moat across the 4 Japanese pillars of Ikigai. Complete the deep questions below to power personalized positioning.",
      fillDemo: "Load Rich Demo Answers",
      synthesizeBtn: "Auto-Synthesize Core Pillars",
      synthesizing: "Synthesizing...",
      progress: "Questions Completed",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "High-Ticket Monthly Retainer ($3k - $15k/mo)" },
        { id: "VALUE_BASED_PROJECT", label: "Value-Based Fixed Project ($5k - $50k)" },
        { id: "SAAS_SUBSCRIPTION", label: "SaaS Recurring Subscription ($49 - $499/mo)" },
        { id: "COMMUNITY_MEMBERSHIP", label: "B2B Community / Advisory Membership" },
        { id: "HYBRID_PERFORMANCE", label: "Base Retainer + Performance Equity/Upside" },
      ],
    },
    pillars: {
      passion: {
        title: "Pillar 1: Passion (What You Love)",
        desc: "Activities, intellectual curiosities, and work tasks that energize you unconditionally.",
        questions: {
          p1_time_loss: {
            label: "Time-Fly Activities",
            hint: "What tasks make you completely lose track of time and enter effortless flow?",
            placeholder: "e.g. Designing systemic architectures, writing contrarian thought pieces, analyzing business models...",
          },
          p1_spare_time_reading: {
            label: "Natural Curiosities & Topics",
            hint: "What subjects do you read and research without anyone asking or paying you?",
            placeholder: "e.g. Behavioral psychology, product-led distribution, autonomous AI workflows...",
          },
          p1_average_tuesday: {
            label: "Your Ideal Workday (Ideal Tuesday)",
            hint: "Describe your ideal Tuesday schedule from morning to night with zero friction.",
            placeholder: "e.g. 3 hours of deep creative thinking in the morning, 2 high-leverage client reviews, zero reactive slack pings...",
          },
          p1_energizing_tasks: {
            label: "Energizing Work Tasks",
            hint: "Which professional tasks leave you energized rather than depleted?",
            placeholder: "e.g. Translating chaotic founder vision into crystal-clear market positioning and playbooks...",
          },
          p1_childhood_passions: {
            label: "Childhood & Teenage Passions",
            hint: "What were your earliest creative instincts or hobbies before market pressures?",
            placeholder: "e.g. Building complex computer simulations, editing neighborhood newsletters, designing strategy board games...",
          },
          p1_spark_debates: {
            label: "Topics That Spark Debate",
            hint: "What industry conventional wisdom do you passionately disagree with?",
            placeholder: "e.g. Why vanity metrics and generic agency retainer models are destroying genuine B2B customer relationships...",
          },
          p1_creative_outlets: {
            label: "Favorite Creative Outlets",
            hint: "How do you best express original creative thought and craft?",
            placeholder: "e.g. Writing provocative long-form essays, crafting visual diagrams, architecting minimalist Notion workflows...",
          },
        },
      },
      vocation: {
        title: "Pillar 2: Vocation (What You Are Good At)",
        desc: "Your unfair advantages, natural genius, proven strengths, and unique problem-solving abilities.",
        questions: {
          p2_effortless_skills: {
            label: "Effortless Skills",
            hint: "What comes naturally to you that peers and colleagues find challenging or confusing?",
            placeholder: "e.g. Instantly spotting the single core positioning bottleneck holding back an entire sales pipeline...",
          },
          p2_sought_advice: {
            label: "Sought-After Advice",
            hint: "What questions or emergencies do founders and team members instinctively bring to you?",
            placeholder: "e.g. How to package high-ticket offers, craft believable narrative hooks, or streamline delivery...",
          },
          p2_hard_skills: {
            label: "Core Hard & Technical Competencies",
            hint: "The measurable domain skills you have honed over years of practice.",
            placeholder: "e.g. Growth analytics, positioning teardowns, multi-channel editorial systems, conversion copywriting...",
          },
          p2_interpersonal_soft: {
            label: "Key Soft & Interpersonal Strengths",
            hint: "Your emotional, relational, and leadership strengths.",
            placeholder: "e.g. Radical empathy, high-stakes communication, active listening, turning friction into clarity...",
          },
          p2_success_patterns: {
            label: "Past Success Patterns",
            hint: "What was the common denominator across your 3 greatest business or career wins?",
            placeholder: "e.g. Unwavering focus on asymmetric channels, elimination of vanity noise, crafting undeniable IP...",
          },
          p2_problem_solving: {
            label: "Unique Problem-Solving Method",
            hint: "How do your brain and instincts approach a new, complex problem?",
            placeholder: "e.g. First-principles deconstruction followed by rapid prototyping and systematic test loops...",
          },
          p2_recurring_praise: {
            label: "Recurring Praise & Testimonials",
            hint: "What specific compliments do clients and collaborators say repeatedly?",
            placeholder: "e.g. 'You clarified our 5-year vision and differentiated us better in 1 hour than our agency did in 6 months'...",
          },
        },
      },
      mission: {
        title: "Pillar 3: Mission (What The World Needs)",
        desc: "The audience you champion, the systemic problems you eradicate, and the legacy you build.",
        questions: {
          p3_systemic_injustice: {
            label: "Systemic Injustices & Flaws",
            hint: "What broken, inefficient, or dishonest practices in your market must be eliminated?",
            placeholder: "e.g. Brilliant technical operators staying invisible because traditional marketing feels superficial and fake...",
          },
          p3_community_to_help: {
            label: "Target Community & Tribe",
            hint: "Who are the specific people whose success and wellbeing you feel called to champion?",
            placeholder: "e.g. Ambitious B2B founders, boutique consultancy owners, and solopreneur software engineers...",
          },
          p3_unlimited_resource: {
            label: "Priority Cause & Calling",
            hint: "What is the overarching mission that gives your commercial efforts moral purpose?",
            placeholder: "e.g. Democratizing tier-one CMO-level strategy so ethical, high-signal businesses dominate their categories...",
          },
          p3_immediate_needs: {
            label: "Immediate Practical Needs",
            hint: "What urgent, tangible daily problems keep your audience awake at night?",
            placeholder: "e.g. Unpredictable pipeline, zero consistent organic visibility, wasted ad spend, founder burnout...",
          },
          p3_future_gap: {
            label: "10-Year Market Vision",
            hint: "Where is your industry heading over the next decade, and what will separate winners from losers?",
            placeholder: "e.g. AI will flood the internet with generic copy; only authentic founder voice and deep domain trust will convert...",
          },
          p3_legacy_impact: {
            label: "Desired Long-Term Legacy",
            hint: "When you look back 20 years from now, what enduring impact do you want to have created?",
            placeholder: "e.g. Helped 1,000+ independent operators build durable, profitable, freedom-enabling enterprises...",
          },
        },
      },
      profession: {
        title: "Pillar 4: Profession (What You Can Be Paid For)",
        desc: "High-value monetization mechanics, premium packages, market willingness-to-pay, and business models.",
        questions: {
          p4_past_paid_services: {
            label: "Past Proven Paid Services",
            hint: "What specific services, products, or deliverables have customers happily bought from you?",
            placeholder: "e.g. Fractional CMO retainers ($10k/mo), strategic positioning intensives ($5k), pipeline audits ($3k)...",
          },
          p4_market_paid_skills: {
            label: "Highest Market-Value Skills",
            hint: "Which of your competencies command the highest rates in the market?",
            placeholder: "e.g. Category design, high-ticket messaging frameworks, multi-channel automated distribution systems...",
          },
          p4_commercial_hobbies: {
            label: "Commercial Passions",
            hint: "Which of your interests or hobbies have natural, untapped commercial monetization potential?",
            placeholder: "e.g. Curating private founder mastermind circles, writing deep-dive teardown newsletters, SaaS prototyping...",
          },
          p4_high_value_roi: {
            label: "Direct Economic Impact & ROI",
            hint: "What tangible bottom-line value or cost savings do you generate for buyers?",
            placeholder: "e.g. Over $2.4M in client contracts closed directly attributed to organic thought leadership positioning...",
          },
          p4_premium_assets: {
            label: "Flagship / Premium Offer Concept",
            hint: "What is your highest-leverage offer that solves the complete problem end-to-end?",
            placeholder: "e.g. The 30-Day Brand Positioning & Authority Operating System with complete multi-channel campaign deployment...",
          },
          p4_growth_niches: {
            label: "Fast-Growing Niches & Market Gaps",
            hint: "What emerging market gaps or trends are accelerating right now?",
            placeholder: "e.g. AI-augmented B2B advisory, developer-focused software tooling, high-ticket technical consulting...",
          },
          p4_monetization_fit: {
            label: "Primary Monetization Model",
            hint: "How will your business structure its revenue and cash flow?",
            placeholder: "e.g. High-ticket monthly retainer + performance upside + scalable asynchronous digital assets...",
          },
        },
      },
      synthesis: {
        title: "Synthesis & Immediate Action",
        desc: "The sweet spot where passion, vocation, mission, and profession converge into category authority.",
        questions: {
          overlap_synthesis: {
            label: "The Central Ikigai Intersection",
            hint: "In 1 or 2 powerful sentences, define the singular intersection uniting your 4 pillars.",
            placeholder: "e.g. Empowering visionary B2B founders to achieve undisputed category authority and predictable revenue through systematic Ikigai-aligned positioning...",
          },
          pilot_30_days: {
            label: "30-Day Pilot Action Project",
            hint: "What immediate 30-day MVP or campaign initiative will you launch to test and validate this?",
            placeholder: "e.g. Launch a 30-day multi-channel authority blitz with daily long-form LinkedIn teardowns, Twitter threads, and automated email lead magnets...",
          },
        },
      },
    },
  },
  ro: {
    tabs: {
      passion: "1. Pasiune",
      vocation: "2. Vocație",
      mission: "3. Misiune",
      profession: "4. Profesie",
      synthesis: "5. Sinteză",
      archetype: "Arhetip & Valori",
    },
    ui: {
      badge: "Pasul 0 • Diagnostic Fondator Complet",
      title: "Diagnostic Strategic de Aliniere Ikigai",
      subtitle: "Descoperă avantajul tău competitiv fundamental prin cei 4 piloni japonezi Ikigai. Completează întrebările profunde de mai jos pentru o poziționare de piață personalizată.",
      fillDemo: "Încarcă Răspunsuri Demo",
      synthesizeBtn: "Auto-Sintetizează Pilonii",
      synthesizing: "Se sintetizează...",
      progress: "Întrebări Completate",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "Abonament Lunar High-Ticket (3.000€ - 15.000€/lună)" },
        { id: "VALUE_BASED_PROJECT", label: "Proiect cu Preț Fix pe Valoare (5.000€ - 50.000€)" },
        { id: "SAAS_SUBSCRIPTION", label: "Abonament SaaS Recurent (49€ - 499€/lună)" },
        { id: "COMMUNITY_MEMBERSHIP", label: "Comunitate B2B / Membru Consultativ" },
        { id: "HYBRID_PERFORMANCE", label: "Retainer de Bază + Comision de Performanță" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilonul 1: Pasiune (Ceea Ce Iubești)",
        desc: "Activitățile, curiozitățile intelectuale și sarcinile care îți oferă energie necondiționată.",
        questions: {
          p1_time_loss: {
            label: "Activități în Care Timpul Zboară",
            hint: "Ce activități te fac să pierzi complet noțiunea timpului și să intri în starea de flux?",
            placeholder: "ex. Arhitecturarea sistemelor complexe, redactarea analizelor strategice, optimizarea modelelor de afaceri...",
          },
          p1_spare_time_reading: {
            label: "Curiozități Naturale & Subiecte",
            hint: "Despre ce subiecte citești și înveți din proprie inițiativă, fără să fii plătit?",
            placeholder: "ex. Psihologia decizională, distribuția organică B2B, automatizările cu inteligență artificială...",
          },
          p1_average_tuesday: {
            label: "Ziua Ta Ideală de Muncă (Marțea Ideală)",
            hint: "Descrie programul tău ideal de marți de dimineața până seara, fără fricțiuni.",
            placeholder: "ex. 3 ore de creație strategică dimineața, 2 consultanțe de mare valoare după-amiaza, zero ședințe reactive...",
          },
          p1_energizing_tasks: {
            label: "Sarcini Care Îți Dau Energie",
            hint: "Care sunt sarcinile profesionale care te energizează în loc să te epuizeze?",
            placeholder: "ex. Transformarea haosului din viziunea fondatorului într-un sistem de poziționare clar și scalabil...",
          },
          p1_childhood_passions: {
            label: "Pasiuni din Copilărie & Adolescență",
            hint: "Care erau instinctele tale creative timpurii înainte de presiunile comerciale?",
            placeholder: "ex. Simulări de strategie, crearea de jocuri logice, publicarea de mici reviste proprii...",
          },
          p1_spark_debates: {
            label: "Subiecte Care Stârnesc Dezbateri",
            hint: "Cu ce dogme sau mituri populare din industrie nu ești de acord deloc?",
            placeholder: "ex. De ce agențiile clasice vând metrici vanitoase în loc de autoritate reală de piață...",
          },
          p1_creative_outlets: {
            label: "Canale Creative Preferate",
            hint: "Cum preferi să îți exprimi gândirea originală și măiestria?",
            placeholder: "ex. Eseuri aprofundate, diagrame vizuale de concepte, procese de lucru minimaliste...",
          },
        },
      },
      vocation: {
        title: "Pilonul 2: Vocație (La Ce Ești Bun)",
        desc: "Avantajele tale unice, geniul natural, punctele forte dovedite și modul tău unic de rezolvare a problemelor.",
        questions: {
          p2_effortless_skills: {
            label: "Abilități Care Îți Vin Ușor",
            hint: "Ce ți se pare simplu și natural, dar pentru ceilalți este dificil sau confuz?",
            placeholder: "ex. Identificarea instantanee a blocajului de poziționare care frânează întregul flux de vânzări...",
          },
          p2_sought_advice: {
            label: "Sfatul pe Care Ți-l Cer Ceilalți",
            hint: "Pentru ce probleme specifice vin fondatorii și colegii direct la tine?",
            placeholder: "ex. Cum să își împacheteze ofertele premium, cum să comunice convingător, cum să structureze serviciile...",
          },
          p2_hard_skills: {
            label: "Competențe Tehnice & Hard Skills",
            hint: "Abilitățile măsurabile pe care le-ai perfecționat prin ani de experiență.",
            placeholder: "ex. Analiză de creștere, repoziționare strategică, sisteme editoriale multi-canal, copywriting de conversie...",
          },
          p2_interpersonal_soft: {
            label: "Puncte Forte Relaționale & Soft Skills",
            hint: "Abilitățile tale umane, de ascultare, conducere și comunicare.",
            placeholder: "ex. Empatie profundă, ascultare activă structurată, comunicare clară în situații tensionate...",
          },
          p2_success_patterns: {
            label: "Tipare ale Succeselor Trecute",
            hint: "Care a fost numitorul comun din cele mai mari 3 succese ale tale profesionale?",
            placeholder: "ex. Focalizare pe canale asimetrice, eliminarea zgomotului inutil, crearea de active de proprietate intelectuală...",
          },
          p2_problem_solving: {
            label: "Modul Tău Unic de a Rezolva Probleme",
            hint: "Cum abordează mintea ta o problemă nouă și complexă?",
            placeholder: "ex. Deconstrucție pe baza primelor principii, urmată de prototipare rapidă și iterații constante...",
          },
          p2_recurring_praise: {
            label: "Laude & Aprecieri Recurente",
            hint: "Ce complimente specifice auzi în mod repetat de la clienți și parteneri?",
            placeholder: "ex. «Ați sintetizat viziunea noastră pe 5 ani și ne-ați diferențiat în 1 oră mai bine decât o agenție în 6 luni»...",
          },
        },
      },
      mission: {
        title: "Pilonul 3: Misiune (Ce Are Nevoie Lumea)",
        desc: "Comunitatea pe care o susții, problemele sistemice pe care le rezolvi și moștenirea pe care o construiești.",
        questions: {
          p3_systemic_injustice: {
            label: "Probleme Sistemice & Frustrări",
            hint: "Ce practici ineficiente sau greșite din domeniul tău dorești să elimini?",
            placeholder: "ex. Fondatori capabili care rămân invizibili pentru că marketingul tradițional pare superficial și lipsit de etică...",
          },
          p3_community_to_help: {
            label: "Comunitatea Țintă & Tribul Tău",
            hint: "Care este grupul specific de oameni pentru succesul cărora te simți chemat să lupți?",
            placeholder: "ex. Fondatori B2B, consultanți de elită și antreprenori tehnici independenți...",
          },
          p3_unlimited_resource: {
            label: "Cauza Prioritară & Mandatul",
            hint: "Care este misiunea supremă care oferă afacerii tale un sens moral profund?",
            placeholder: "ex. Democratizarea strategiilor de CMO de nivel enterprise pentru companii autentice și etice...",
          },
          p3_immediate_needs: {
            label: "Nevoi Practice & Urgente",
            hint: "Ce probleme zilnice palpabile nu le dau somn clienților tăi ideali?",
            placeholder: "ex. Venituri imprevizibile, lipsa vizibilității organice consecvente, bugete irosite pe reclame fără conversie...",
          },
          p3_future_gap: {
            label: "Viziunea pe Următorii 10 Ani",
            hint: "Încotro se îndreaptă piața ta în următorul deceniu și ce va diferenția câștigătorii?",
            placeholder: "ex. Conținutul generic generat de AI va inunda platformele; doar vocea autentică a fondatorului va mai convinge...",
          },
          p3_legacy_impact: {
            label: "Moștenirea Dorită pe Termen Lung",
            hint: "Peste 20 de ani, ce impact durabil vrei să fi lăsat în urmă prin activitatea ta?",
            placeholder: "ex. Am sprijinit peste 1.000 de fondatori să își construiască afaceri profitabile, libere și lideri de nișă...",
          },
        },
      },
      profession: {
        title: "Pilonul 4: Profesie (Pentru Ce Poți Fi Plătit)",
        desc: "Mecanismele de monetizare de mare valoare, pachetele premium și modelele de afaceri scalabile.",
        questions: {
          p4_past_paid_services: {
            label: "Servicii Plătite Dovedite",
            hint: "Ce servicii, produse sau rezultate concrete au cumpărat deja clienții de la tine?",
            placeholder: "ex. Servicii de Fractional CMO (10.000€/lună), workshop-uri intensive de repoziționare (5.000€)...",
          },
          p4_market_paid_skills: {
            label: "Abilități cu Valoare Comercială Maximă",
            hint: "Care dintre competențele tale au cea mai mare disponibilitate de plată în piață?",
            placeholder: "ex. Crearea de categorii noi de piață, mesaje de conversie high-ticket, sisteme automate de distribuție...",
          },
          p4_commercial_hobbies: {
            label: "Pasiuni cu Potențial Comercial",
            hint: "Ce interese sau hobby-uri ale tale au un potențial natural de monetizare?",
            placeholder: "ex. Moderarea de comunități private pentru fondatori, redactarea de analize de business, prototipare software...",
          },
          p4_high_value_roi: {
            label: "Impact Economic & ROI Măsurabil",
            hint: "Ce venituri suplimentare sau economii tangibile generezi pentru clienți?",
            placeholder: "ex. Peste 2.4M€ în contracte încheiate de clienți datorită poziționării de autoritate organică...",
          },
          p4_premium_assets: {
            label: "Concept de Ofertă Premium / Flagship",
            hint: "Care este oferta ta de elită care rezolvă problema clientului de la un capăt la altul?",
            placeholder: "ex. Sistemul Integrat de Poziționare și Autoritate pe 30 de Zile cu lansare multi-canal completă...",
          },
          p4_growth_niches: {
            label: "Nișe în Creștere Rapidă & Oportunități",
            hint: "Ce tendințe sau segmente neacoperite din piață accelerează chiar acum?",
            placeholder: "ex. Consultanță B2B asistată de AI, instrumente software pentru dezvoltatori, consultanță tehnică de elită...",
          },
          p4_monetization_fit: {
            label: "Model Principal de Monetizare",
            hint: "Cum își va structura afacerea ta fluxul de numerar și veniturile?",
            placeholder: "ex. Retainer lunar premium + procent din performanță + active digitale asincrone scalabile...",
          },
        },
      },
      synthesis: {
        title: "Sinteză & Acțiune Imediată",
        desc: "Punctul optim în care pasiunea, vocația, misiunea și profesia se unesc pentru dominație de piață.",
        questions: {
          overlap_synthesis: {
            label: "Intersecția Centrală Ikigai",
            hint: "În 1-2 propoziții memorabile, definește scopul central care leagă cei 4 piloni.",
            placeholder: "ex. Ghidarea fondatorilor ambițioși către autoritate de piață incontestabilă și clienți recurenți prin poziționare autentică...",
          },
          pilot_30_days: {
            label: "Proiect Pilot pe 30 de Zile",
            hint: "Ce inițiativă concretă vei lansa în următoarele 30 de zile pentru a valida această poziționare?",
            placeholder: "ex. Lansarea unei campanii intensive pe 30 de zile cu analize zilnice pe LinkedIn, postări pe Facebook și secvență de email...",
          },
        },
      },
    },
  },
  de: {
    tabs: {
      passion: "1. Leidenschaft",
      vocation: "2. Berufung",
      mission: "3. Mission",
      profession: "4. Profession",
      synthesis: "5. Synthese",
      archetype: "Archetyp & Werte",
    },
    ui: {
      badge: "Schritt 0 • Gründer-Diagnose",
      title: "Strategische Ikigai-Ausrichtung",
      subtitle: "Entdecken Sie Ihr fundamentales Marketing-Fundament über die 4 Säulen des Ikigai.",
      fillDemo: "Demo-Antworten laden",
      synthesizeBtn: "Kern-Säulen synthetisieren",
      synthesizing: "Wird verarbeitet...",
      progress: "Fragen beantwortet",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "High-Ticket Retainer (3.000€ - 15.000€/Monat)" },
        { id: "VALUE_BASED_PROJECT", label: "Wertbasiertes Festpreisprojekt (5.000€ - 50.000€)" },
        { id: "SAAS_SUBSCRIPTION", label: "SaaS-Abonnement (49€ - 499€/Monat)" },
        { id: "COMMUNITY_MEMBERSHIP", label: "B2B-Community / Beratungs-Mitgliedschaft" },
        { id: "HYBRID_PERFORMANCE", label: "Basis-Retainer + Performance-Beteiligung" },
      ],
    },
    pillars: {
      passion: {
        title: "Säule 1: Leidenschaft (Was Sie lieben)",
        desc: "Aufgaben und Themen, die Ihnen bedingungslose Energie schenken.",
        questions: {
          p1_time_loss: { label: "Flow-Aktivitäten", hint: "Bei welchen Aufgaben vergessen Sie die Zeit?", placeholder: "z.B. Systemische Wachstumsarchitekturen entwickeln..." },
          p1_spare_time_reading: { label: "Natürliche Interessen", hint: "Worüber lesen Sie ohne Zwang?", placeholder: "z.B. Produktorientiertes Wachstum, Verhaltenspsychologie..." },
          p1_average_tuesday: { label: "Idealer Arbeitstag", hint: "Beschreiben Sie Ihren idealen Dienstag.", placeholder: "z.B. 3 Stunden ungestörte strategische Denkzeit..." },
          p1_energizing_tasks: { label: "Energiespendende Aufgaben", hint: "Was gibt Ihnen Energie?", placeholder: "z.B. Gründer-Visionen in skalierbare Playbooks übersetzen..." },
          p1_childhood_passions: { label: "Frühe Leidenschaften", hint: "Wofür brannten Sie als Jugendlicher?", placeholder: "z.B. Strategiespiele, eigene Zeitschriften gestalten..." },
          p1_spark_debates: { label: "Debatten-Themen", hint: "Welcher Branchenmeinung widersprechen Sie?", placeholder: "z.B. Warum oberflächliche Vanity-Metriken scheitern..." },
          p1_creative_outlets: { label: "Kreativer Ausdruck", hint: "Wie drücken Sie Ihre Kreativität aus?", placeholder: "z.B. Fachaufsätze schreiben, minimalistische Workflows..." },
        },
      },
      vocation: {
        title: "Säule 2: Berufung (Worin Sie gut sind)",
        desc: "Ihre unfairen Vorteile, Stärken und Problemlösungsmethoden.",
        questions: {
          p2_effortless_skills: { label: "Mühelose Fähigkeiten", hint: "Was fällt Ihnen leicht, was anderen schwerfällt?", placeholder: "z.B. Sofortige Erkennung von Positionierungsengpässen..." },
          p2_sought_advice: { label: "Gefragter Rat", hint: "Wofür bitten Kollegen Sie um Rat?", placeholder: "z.B. High-Ticket-Angebote strukturieren..." },
          p2_hard_skills: { label: "Fachliche Kernkompetenzen", hint: "Ihre messbaren Fähigkeiten.", placeholder: "z.B. Wachstumsanalysen, Positionierungs-Audits..." },
          p2_interpersonal_soft: { label: "Zwischenmenschliche Stärken", hint: "Ihre Führungs- und Kommunikationsstärken.", placeholder: "z.B. Radikale Empathie, klares aktives Zuhören..." },
          p2_success_patterns: { label: "Erfolgsmuster", hint: "Gemeinsamkeiten Ihrer größten Erfolge.", placeholder: "z.B. Fokus auf asymmetrische Kanäle..." },
          p2_problem_solving: { label: "Problemlösungsansatz", hint: "Wie gehen Sie an komplexe Probleme heran?", placeholder: "z.B. Dekonstruktion nach Grundprinzipien..." },
          p2_recurring_praise: { label: "Wiederkehrendes Lob", hint: "Welche Komplimente hören Sie immer wieder?", placeholder: "z.B. «Sie haben unsere Vision in einer Stunde besser auf den Punkt gebracht...»" },
        },
      },
      mission: {
        title: "Säule 3: Mission (Was die Welt braucht)",
        desc: "Die Zielgruppe, der Sie dienen, und die Probleme, die Sie lösen.",
        questions: {
          p3_systemic_injustice: { label: "Systemische Mängel", hint: "Welche Missstände möchten Sie beseitigen?", placeholder: "z.B. Exzellente Gründer bleiben unsichtbar..." },
          p3_community_to_help: { label: "Zielgruppe & Community", hint: "Wen möchten Sie unterstützen?", placeholder: "z.B. B2B-Gründer und spezialisierte Berater..." },
          p3_unlimited_resource: { label: "Übergeordnete Mission", hint: "Wofür steht Ihr Unternehmen ein?", placeholder: "z.B. Elite-CMO-Strategien für werteorientierte Macher zugänglich machen..." },
          p3_immediate_needs: { label: "Dringende Praxisbedürfnisse", hint: "Welche täglichen Probleme belasten Ihre Kunden?", placeholder: "z.B. Unberechenbare Pipeline, Zeitmangel..." },
          p3_future_gap: { label: "10-Jahres-Perspektive", hint: "Wohin entwickelt sich Ihr Markt?", placeholder: "z.B. Generische KI-Inhalte werden überhandnehmen; nur echte Gründerstimmen konvertieren..." },
          p3_legacy_impact: { label: "Gewünschtes Vermächtnis", hint: "Welche Spuren möchten Sie hinterlassen?", placeholder: "z.B. Über 1.000 Gründern zu profitabler Unabhängigkeit verholfen..." },
        },
      },
      profession: {
        title: "Säule 4: Profession (Wofür Sie bezahlt werden)",
        desc: "Monetarisierungsmechanismen, Premium-Angebote und Geschäftsmodelle.",
        questions: {
          p4_past_paid_services: { label: "Erfolgreiche bezahlte Angebote", hint: "Wofür haben Kunden bereits bezahlt?", placeholder: "z.B. Fractional CMO Mandate, Positionierungs-Workshops..." },
          p4_market_paid_skills: { label: "Höchstwertige Fähigkeiten", hint: "Welche Fähigkeiten haben die höchste Zahlungsbereitschaft?", placeholder: "z.B. Kategorie-Design, High-Ticket Messaging..." },
          p4_commercial_hobbies: { label: "Monetarisierbare Interessen", hint: "Welche Interessen bergen Marktpotenzial?", placeholder: "z.B. Fach-Newsletter, SaaS-Prototypen..." },
          p4_high_value_roi: { label: "Wirtschaftlicher ROI", hint: "Welchen messbaren Mehrwert schaffen Sie?", placeholder: "z.B. Über 2,4 Mio. € generierte Kundenverträge..." },
          p4_premium_assets: { label: "Flaggschiff-Angebot", hint: "Ihr ganzheitliches Premium-Paket.", placeholder: "z.B. 30-Tage Markenpositionierungs- und Vertriebssystem..." },
          p4_growth_niches: { label: "Wachstumsnischen", hint: "Welche Marktlücken wachsen rasant?", placeholder: "z.B. KI-gestützte B2B-Beratung..." },
          p4_monetization_fit: { label: "Monetarisierungsmodell", hint: "Wie generieren Sie Ihren Umsatz?", placeholder: "z.B. Monatlicher Premium-Retainer + Erfolgsbeteiligung..." },
        },
      },
      synthesis: {
        title: "Synthese & Sofortige Umsetzung",
        desc: "Der Schnittpunkt all Ihrer Säulen.",
        questions: {
          overlap_synthesis: { label: "Zentrale Schnittmenge", hint: "Fassen Sie Ihre Ausrichtung in 1-2 Sätzen zusammen.", placeholder: "z.B. Ambitionierte B2B-Gründer zu unangefochtener Kategorie-Autorität führen..." },
          pilot_30_days: { label: "30-Tage-Pilotprojekt", hint: "Welche Initiative starten Sie in den nächsten 30 Tagen?", placeholder: "z.B. Eine 30-Tage Multi-Kanal-Kampagne auf LinkedIn und per E-Mail starten..." },
        },
      },
    },
  },
  fr: {
    tabs: { passion: "1. Passion", vocation: "2. Vocation", mission: "3. Mission", profession: "4. Profession", synthesis: "5. Synthèse", archetype: "Archétype & Valeurs" },
    ui: {
      badge: "Étape 0 • Diagnostic Fondateur",
      title: "Diagnostic d'Alignement Stratégique Ikigai",
      subtitle: "Révélez votre avantage concurrentiel fondamental grâce aux 4 piliers de l'Ikigai.",
      fillDemo: "Charger Réponses Démo",
      synthesizeBtn: "Auto-Synthétiser les Piliers",
      synthesizing: "Synthèse en cours...",
      progress: "Questions Remplies",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "Forfait Mensuel Premium (3 000€ - 15 000€/mois)" },
        { id: "VALUE_BASED_PROJECT", label: "Projet au Forfait Basé sur la Valeur" },
        { id: "SAAS_SUBSCRIPTION", label: "Abonnement Récurrent SaaS" },
        { id: "COMMUNITY_MEMBERSHIP", label: "Communauté B2B & Conseil" },
        { id: "HYBRID_PERFORMANCE", label: "Forfait de Base + Part Variable" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilier 1 : Passion (Ce Que Vous Aimez)",
        desc: "Les activités et sujets qui vous procurent une énergie inépuisable.",
        questions: {
          p1_time_loss: { label: "Activités d'Immersion", hint: "Quelles tâches vous font perdre la notion du temps ?", placeholder: "ex. Structurer des architectures de croissance..." },
          p1_spare_time_reading: { label: "Sujets Spontanés", hint: "Sur quels thèmes lisez-vous sans contrainte ?", placeholder: "ex. Psychologie comportementale, croissance B2B..." },
          p1_average_tuesday: { label: "Mardi Idéal", hint: "Décrivez votre journée de travail parfaite.", placeholder: "ex. 3h de réflexion stratégique le matin..." },
          p1_energizing_tasks: { label: "Tâches Énergisantes", hint: "Qu'est-ce qui vous stimule professionnellement ?", placeholder: "ex. Transformer la vision du fondateur en playbooks clairs..." },
          p1_childhood_passions: { label: "Passions d'Enfance", hint: "Vos premières obsessions créatives ?", placeholder: "ex. Jeux de stratégie, conception de revues..." },
          p1_spark_debates: { label: "Sujets de Débat", hint: "Quelle idée reçue contestez-vous fermement ?", placeholder: "ex. Pourquoi les agences traditionnelles vendent des métriques futiles..." },
          p1_creative_outlets: { label: "Expression Créative", hint: "Comment exprimez-vous vos idées ?", placeholder: "ex. Rédaction d'essais de fond, schémas synthétiques..." },
        },
      },
      vocation: {
        title: "Pilier 2 : Vocation (Ce Pour Quoi Vous Êtes Doué)",
        desc: "Vos forces distinctives et votre manière singulière de résoudre les défis.",
        questions: {
          p2_effortless_skills: { label: "Talents Naturels", hint: "Qu'est-ce qui est simple pour vous mais complexe pour autrui ?", placeholder: "ex. Repérer immédiatement le goulot d'étranglement du positionnement..." },
          p2_sought_advice: { label: "Conseils Sollicités", hint: "Pour quelles questions vient-on vous voir ?", placeholder: "ex. Tarification d'offres haut de gamme, autorité de marque..." },
          p2_hard_skills: { label: "Compétences Techniques", hint: "Vos expertises mesurables.", placeholder: "ex. Analyse de croissance, copywriting de conversion..." },
          p2_interpersonal_soft: { label: "Qualités Relationnelles", hint: "Vos atouts humains et de leadership.", placeholder: "ex. Empathie radicale, écoute active structurée..." },
          p2_success_patterns: { label: "Facteurs de Succès", hint: "Le point commun de vos plus grands accomplissements.", placeholder: "ex. Concentration sur les canaux asymétriques..." },
          p2_problem_solving: { label: "Approche Résolutive", hint: "Comment appréhendez-vous un problème complexe ?", placeholder: "ex. Déconstruction aux premiers principes et prototypage rapide..." },
          p2_recurring_praise: { label: "Éloges Récurrents", hint: "Quels compliments vous fait-on régulièrement ?", placeholder: "ex. « Vous avez clarifié notre vision en une heure mieux qu'une agence en six mois »" },
        },
      },
      mission: {
        title: "Pilier 3 : Mission (Ce Dont Le Monde A Besoin)",
        desc: "La communauté que vous soutenez et les combats que vous menez.",
        questions: {
          p3_systemic_injustice: { label: "Défauts Systémiques", hint: "Quelles failles du marché voulez-vous corriger ?", placeholder: "ex. Des fondateurs remarquables qui restent invisibles..." },
          p3_community_to_help: { label: "Communauté Cible", hint: "Quel groupe spécifique défendez-vous ?", placeholder: "ex. Fondateurs B2B et consultants experts..." },
          p3_unlimited_resource: { label: "Cause Prioritaire", hint: "Quelle mission morale guide votre action ?", placeholder: "ex. Démocratiser la stratégie de direction marketing d'élite..." },
          p3_immediate_needs: { label: "Besoins Quotidiens Urgents", hint: "Quels problèmes concrets préoccupent vos clients ?", placeholder: "ex. Pipeline irrégulier, manque de visibilité organique..." },
          p3_future_gap: { label: "Vision à 10 Ans", hint: "Où va votre marché d'ici dix ans ?", placeholder: "ex. L'IA banalisera les contenus génériques ; seule la voix authentique du fondateur convertira..." },
          p3_legacy_impact: { label: "Héritage Souhaité", hint: "Quelle empreinte durable voulez-vous laisser ?", placeholder: "ex. Aider plus de 1 000 entrepreneurs à bâtir des entreprises leaders..." },
        },
      },
      profession: {
        title: "Pilier 4 : Profession (Ce Pour Quoi Vous Pouvez Être Payé)",
        desc: "Modèles économiques rentables et offres à forte valeur perçue.",
        questions: {
          p4_past_paid_services: { label: "Prestations Rémunérées", hint: "Qu'avez-vous déjà vendu avec succès ?", placeholder: "ex. Conseil CMO externalisé, workshops de positionnement..." },
          p4_market_paid_skills: { label: "Compétences les Plus Rémunératrices", hint: "Qu'est-ce que le marché paie le plus cher ?", placeholder: "ex. Design de catégorie, messaging haut de gamme..." },
          p4_commercial_hobbies: { label: "Passions Monétisables", hint: "Quels intérêts ont un potentiel économique ?", placeholder: "ex. Newsletters d'analyse, cercles de réflexion..." },
          p4_high_value_roi: { label: "Impact Économique Client", hint: "Quelle valeur quantifiable générez-vous ?", placeholder: "ex. Plus de 2,4 M€ de contrats conclus par nos clients..." },
          p4_premium_assets: { label: "Offre Signature", hint: "Votre solution globale et clé en main.", placeholder: "ex. Système global de positionnement et de distribution sur 30 jours..." },
          p4_growth_niches: { label: "Niches Porteuses", hint: "Quels segments émergents accélèrent ?", placeholder: "ex. Conseil B2B assisté par IA, outils pour développeurs..." },
          p4_monetization_fit: { label: "Modèle de Monétisation", hint: "Comment générez-vous vos revenus ?", placeholder: "ex. Forfait mensuel premium + prime au résultat..." },
        },
      },
      synthesis: {
        title: "Synthèse & Déploiement Immédiat",
        desc: "La convergence de vos 4 piliers.",
        questions: {
          overlap_synthesis: { label: "Intersection Centrale", hint: "Résumez votre axe en 1 à 2 phrases percutantes.", placeholder: "ex. Propulser les fondateurs B2B ambitieux vers une autorité incontestable..." },
          pilot_30_days: { label: "Projet Pilote 30 Jours", hint: "Quelle action concrète lancez-vous ce mois-ci ?", placeholder: "ex. Déployer une campagne multi-canal sur LinkedIn et Email pendant 30 jours..." },
        },
      },
    },
  },
  it: {
    tabs: { passion: "1. Passione", vocation: "2. Vocazione", mission: "3. Missione", profession: "4. Professione", synthesis: "5. Sintesi", archetype: "Archetipo & Valori" },
    ui: {
      badge: "Passo 0 • Diagnosi Fondatore",
      title: "Diagnosi di Allineamento Strategico Ikigai",
      subtitle: "Scopri il tuo vantaggio competitivo attraverso i 4 pilastri dell'Ikigai.",
      fillDemo: "Carica Risposte Demo",
      synthesizeBtn: "Auto-Sintetizza i Pilastri",
      synthesizing: "Elaborazione...",
      progress: "Domande Completate",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "Retainer Mensile High-Ticket (3.000€ - 15.000€/mese)" },
        { id: "VALUE_BASED_PROJECT", label: "Progetto a Valore Fisso" },
        { id: "SAAS_SUBSCRIPTION", label: "Abbonamento SaaS Ricorrente" },
        { id: "COMMUNITY_MEMBERSHIP", label: "Community B2B & Advisory" },
        { id: "HYBRID_PERFORMANCE", label: "Base Retainer + Quota a Performance" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilastro 1: Passione (Ciò Che Ami)",
        desc: "Attività e argomenti che ti caricano di energia incondizionata.",
        questions: {
          p1_time_loss: { label: "Attività Immersive", hint: "Quali compiti ti fanno volare il tempo?", placeholder: "es. Progettare architetture di crescita scalabili..." },
          p1_spare_time_reading: { label: "Argomenti Spontanei", hint: "Di cosa ti informi senza obblighi?", placeholder: "es. Psicologia comportamentale, crescita B2B..." },
          p1_average_tuesday: { label: "Martedì Ideale", hint: "Descrivi la tua giornata di lavoro ideale.", placeholder: "es. 3 ore di pensiero strategico al mattino..." },
          p1_energizing_tasks: { label: "Compiti Energizzanti", hint: "Cosa ti dà energia nel lavoro?", placeholder: "es. Tradurre la visione del fondatore in sistemi chiari..." },
          p1_childhood_passions: { label: "Passioni Giovanili", hint: "I tuoi primi hobby e curiosità d'infanzia?", placeholder: "es. Giochi di strategia, creazione di contenuti..." },
          p1_spark_debates: { label: "Temi di Dibattito", hint: "A quale mito del settore ti opponi?", placeholder: "es. Perché le metriche di vanità distruggono il vero valore..." },
          p1_creative_outlets: { label: "Espressione Creativa", hint: "Come esprimi il tuo pensiero?", placeholder: "es. Articoli di approfondimento, diagrammi concettuali..." },
        },
      },
      vocation: {
        title: "Pilastro 2: Vocazione (In Cosa Sei Bravo)",
        desc: "I tuoi talenti naturali e la tua capacità unica di risolvere problemi.",
        questions: {
          p2_effortless_skills: { label: "Abilità Naturali", hint: "Cosa ti viene spontaneo ma è difficile per altri?", placeholder: "es. Individuare all'istante l'errore di posizionamento..." },
          p2_sought_advice: { label: "Consigli Richiesti", hint: "Per cosa ti chiedono consiglio colleghi e clienti?", placeholder: "es. Strutturare offerte premium, autorevolezza di brand..." },
          p2_hard_skills: { label: "Competenze Tecniche", hint: "Le tue abilità misurabili.", placeholder: "es. Analisi di crescita, copywriting di conversione..." },
          p2_interpersonal_soft: { label: "Punti di Forza Relazionali", hint: "Le tue doti umane e comunicative.", placeholder: "es. Empatia profonda, ascolto attivo..." },
          p2_success_patterns: { label: "Modelli di Successo", hint: "Il filo conduttore dei tuoi traguardi maggiori.", placeholder: "es. Canali asimmetrici, chiarezza senza fronzoli..." },
          p2_problem_solving: { label: "Metodo di Risoluzione", hint: "Come affronti i problemi complessi?", placeholder: "es. Scomposizione per primi principi e iterazione rapida..." },
          p2_recurring_praise: { label: "Elogi Ricorrenti", hint: "Quali complimenti ricevi costantemente?", placeholder: "es. «Hai sintetizzato la nostra visione in un'ora meglio di un'agenzia in sei mesi»" },
        },
      },
      mission: {
        title: "Pilastro 3: Missione (Ciò di Cui Ha Bisogno il Mondo)",
        desc: "La comunità che sostieni e i problemi sistemici che risolvi.",
        questions: {
          p3_systemic_injustice: { label: "Problemi Sistemici", hint: "Quali inefficienze vuoi eliminare nel settore?", placeholder: "es. Fondatori brillanti che rimangono invisibili..." },
          p3_community_to_help: { label: "Comunità Obiettivo", hint: "Chi è il pubblico che senti di dover aiutare?", placeholder: "es. Fondatori B2B, consulenti specializzati..." },
          p3_unlimited_resource: { label: "Causa Primaria", hint: "La missione che dà scopo etico al tuo business?", placeholder: "es. Democratizzare strategie di marketing d'eccellenza per imprese oneste..." },
          p3_immediate_needs: { label: "Bisogni Quotidiani Urgenti", hint: "Cosa preoccupa i tuoi clienti ideali?", placeholder: "es. Flusso di lead instabile, mancanza di autorevolezza..." },
          p3_future_gap: { label: "Visione a 10 Anni", hint: "Dove andrà il mercato nel prossimo decennio?", placeholder: "es. I contenuti generici AI satureranno i feed; solo l'autenticità vincerà..." },
          p3_legacy_impact: { label: "Eredità Desiderata", hint: "Che impatto duraturo vuoi lasciare?", placeholder: "es. Aver aiutato oltre 1.000 fondatori a prosperare liberamente..." },
        },
      },
      profession: {
        title: "Pilastro 4: Professione (Per Cosa Puoi Essere Pagato)",
        desc: "Monetizzazione ad alto rendimento e offerte premium scalabili.",
        questions: {
          p4_past_paid_services: { label: "Servizi Venduti con Successo", hint: "Cosa hanno già comprato i clienti da te?", placeholder: "es. Consulenza Fractional CMO, workshop di posizionamento..." },
          p4_market_paid_skills: { label: "Competenze più Remunerative", hint: "Quali abilità generano la massima tariffa?", placeholder: "es. Category design, packaging di offerte high-ticket..." },
          p4_commercial_hobbies: { label: "Passioni Monetizzabili", hint: "Quali interessi hanno potenziale di mercato?", placeholder: "es. Newsletter di settore, community di imprenditori..." },
          p4_high_value_roi: { label: "Impatto Economico Generato", hint: "Che ritorno economico tangibile produci?", placeholder: "es. Oltre 2,4M€ generati per i clienti grazie alla reputazione organica..." },
          p4_premium_assets: { label: "Offerta Flagship", hint: "La tua soluzione più completa e redditizia.", placeholder: "es. Sistema di Posizionamento e Distribuzione a 30 Giorni..." },
          p4_growth_niches: { label: "Nicchie in Espansione", hint: "Quali trend di mercato stanno accelerando?", placeholder: "es. Consulenza B2B potenziata da intelligenza artificiale..." },
          p4_monetization_fit: { label: "Modello di Monetizzazione", hint: "Come generi entrate?", placeholder: "es. Retainer mensile premium + bonus sui risultati..." },
        },
      },
      synthesis: {
        title: "Sintesi & Piano d'Azione",
        desc: "La confluenza dei 4 pilastri.",
        questions: {
          overlap_synthesis: { label: "Intersezione Centrale", hint: "Definisci il tuo asse strategico in 1-2 frasi.", placeholder: "es. Guidare i fondatori B2B verso un'autorevolezza indiscussa e clienti stabili..." },
          pilot_30_days: { label: "Progetto Pilota 30 Giorni", hint: "Quale iniziativa concreta avvii questo mese?", placeholder: "es. Campagna multi-canale su LinkedIn ed Email per 30 giorni..." },
        },
      },
    },
  },
  pl: {
    tabs: { passion: "1. Pasja", vocation: "2. Powołanie", mission: "3. Misja", profession: "4. Zawód", synthesis: "5. Synteza", archetype: "Archetyp i Wartości" },
    ui: {
      badge: "Krok 0 • Diagnoza Założyciela",
      title: "Strategiczna Diagnoza Ikigai",
      subtitle: "Odkryj fundament przewagi rynkowej poprzez 4 filary japońskiego Ikigai.",
      fillDemo: "Wczytaj Wzorcowe Odpowiedzi",
      synthesizeBtn: "Autosynteza Filarów",
      synthesizing: "Przetwarzanie...",
      progress: "Ukończone Pytania",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "Miesięczny Retainer High-Ticket (3 000€ - 15 000€/miesiąc)" },
        { id: "VALUE_BASED_PROJECT", label: "Projekt ze Stałą Ceną Opartą na Wartości" },
        { id: "SAAS_SUBSCRIPTION", label: "Abonament SaaS" },
        { id: "COMMUNITY_MEMBERSHIP", label: "Społeczność B2B & Doradztwo" },
        { id: "HYBRID_PERFORMANCE", label: "Retainer Bazowy + Udział w Sukcesie" },
      ],
    },
    pillars: {
      passion: {
        title: "Filar 1: Pasja (Co Kochasz Robić)",
        desc: "Zadania i tematy, które dają Ci bezwarunkową energię.",
        questions: {
          p1_time_loss: { label: "Zadania w Stanie Flow", hint: "Kiedy całkowicie zapominasz o upływie czasu?", placeholder: "np. Projektowanie architektury wzrostu biznesu..." },
          p1_spare_time_reading: { label: "Naturalne Zainteresowania", hint: "O czym czytasz z czystej ciekawości?", placeholder: "np. Psychologia behawioralna, organiczny wzrost B2B..." },
          p1_average_tuesday: { label: "Idealny Wtorek", hint: "Opisz swój bezstresowy, idealny dzień pracy.", placeholder: "np. 3 godziny pracy głębokiej rano, zero zbędnych spotkań..." },
          p1_energizing_tasks: { label: "Zadania Energetyzujące", hint: "Co dodaje Ci energii zawodowej?", placeholder: "np. Przekładanie chaotycznej wizji na konkretną strategię..." },
          p1_childhood_passions: { label: "Dziecięce Pasje", hint: "Twoje najwcześniejsze kreatywne zainteresowania?", placeholder: "np. Gry strategiczne, tworzenie własnych gazet..." },
          p1_spark_debates: { label: "Tematy do Dyskusji", hint: "Z jakim popularnym mitem branżowym się nie zgadzasz?", placeholder: "np. Dlaczego powierzchowne metryki niszczą zaufanie klientów..." },
          p1_creative_outlets: { label: "Ekspresja Twórcza", hint: "W jaki sposób najlepiej wyrażasz swoje pomysły?", placeholder: "np. Pogłębione eseje, czytelne schematy koncepcyjne..." },
        },
      },
      vocation: {
        title: "Filar 2: Powołanie (W Czym Jesteś Dobry)",
        desc: "Twoje przewagi, naturalny geniusz i sposób rozwiązywania wyzwań.",
        questions: {
          p2_effortless_skills: { label: "Naturalne Zdolności", hint: "Co przychodzi Ci łatwo, a innym z trudem?", placeholder: "np. Natychmiastowe lokalizowanie wąskiego gardła pozycjonowania..." },
          p2_sought_advice: { label: "Pytania od Innych", hint: "W jakich sprawach znajomi i klienci proszą Cię o radę?", placeholder: "np. Wycena ofert premium, budowa autorytetu marki..." },
          p2_hard_skills: { label: "Umiejętności Twarde", hint: "Twoje mierzalne kompetencje techniczne.", placeholder: "np. Analityka wzrostu, copywriting konwersyjny..." },
          p2_interpersonal_soft: { label: "Kompetencje Miękkie", hint: "Twoje atuty interpersonalne i przywódcze.", placeholder: "np. Głęboka empatia, aktywne słuchanie..." },
          p2_success_patterns: { label: "Wzorce Sukcesu", hint: "Wspólny mianownik Twoich największych sukcesów.", placeholder: "np. Koncentracja na kluczowych kanałach i konkretach..." },
          p2_problem_solving: { label: "Sposób Myślenia", hint: "Jak podchodzisz do złożonych problemów?", placeholder: "np. Rozbicie na pierwsze zasady i szybkie prototypowanie..." },
          p2_recurring_praise: { label: "Powtarzające Się Pochwały", hint: "Jakie komplementy słyszysz najczęściej?", placeholder: "np. «Uporządkowałeś naszą wizję w godzinę lepiej niż agencja w pół roku»" },
        },
      },
      mission: {
        title: "Filar 3: Misja (Czego Potrzebuje Świat)",
        desc: "Społeczność, którą wspierasz, i problemy, które likwidujesz.",
        questions: {
          p3_systemic_injustice: { label: "Wady Systemowe", hint: "Jakie złe praktyki na rynku chcesz wyeliminować?", placeholder: "np. Świetni założyciele pozostający w cieniu przez brak strategii..." },
          p3_community_to_help: { label: "Grupa Docelowa", hint: "Komu najbardziej chcesz pomóc w osiągnięciu sukcesu?", placeholder: "np. Założyciele firm B2B, niezależni konsultanci..." },
          p3_unlimited_resource: { label: "Wiodąca Misja", hint: "Główny cel nadający Twojemu biznesowi sens?", placeholder: "np. Demokratyzacja strategii marketingowej najwyższej próby..." },
          p3_immediate_needs: { label: "Bieżące Potrzeby Klientów", hint: "Co spędza sen z powiek Twoim klientom?", placeholder: "np. Brak przewidywalnego napływu leadów, chaos w mediach..." },
          p3_future_gap: { label: "Wizja na 10 Lat", hint: "Dokąd zmierza rynek w najbliższej dekadzie?", placeholder: "np. Treści z AI zaleją internet; tylko autentyczny głos założyciela przetrwa..." },
          p3_legacy_impact: { label: "Trwały Ślad", hint: "Co chcesz po sobie zostawić za 20 lat?", placeholder: "np. Ponad 1000 niezależnych firm o ugruntowanej pozycji..." },
        },
      },
      profession: {
        title: "Filar 4: Zawód (Za Co Możesz Otrzymać Wynagrodzenie)",
        desc: "Mechanizmy monetyzacji, pakiety premium i skalowalność.",
        questions: {
          p4_past_paid_services: { label: "Sprawdzone Usługi", hint: "Za co klienci już płacili Ci z zadowoleniem?", placeholder: "np. Usługi Fractional CMO, warsztaty repozycjonowania..." },
          p4_market_paid_skills: { label: "Najcenniejsze Zdolności", hint: "Które kompetencje rynek wycenia najwyżej?", placeholder: "np. Projektowanie kategorii rynkowej, oferty high-ticket..." },
          p4_commercial_hobbies: { label: "Monetyzowalne Pasje", hint: "Które zainteresowania mają potencjał rynkowy?", placeholder: "np. Specjalistyczny newsletter, kluby przedsiębiorców..." },
          p4_high_value_roi: { label: "Wpływ Ekonomiczny na Klienta", hint: "Jaki mierzalny zysk generujesz dla kupujących?", placeholder: "np. Ponad 2.4 mln € wygenerowanych kontraktów dla klientów..." },
          p4_premium_assets: { label: "Główna Oferta Premium", hint: "Twój najbardziej kompleksowy produkt lub usługa.", placeholder: "np. Zintegrowany 30-dniowy System Pozycjonowania i Dystrybucji..." },
          p4_growth_niches: { label: "Rosnące Nisze", hint: "Jakie trendy rynkowe przyspieszają?", placeholder: "np. Doradztwo B2B wspierane przez sztuczną inteligencję..." },
          p4_monetization_fit: { label: "Model Monetyzacji", hint: "Jak strukturyzujesz przychody?", placeholder: "np. Miesięczny retainer premium + udział w wynikach..." },
        },
      },
      synthesis: {
        title: "Synteza & Natychmiastowe Działanie",
        desc: "Punkt przecięcia wszystkich 4 filarów.",
        questions: {
          overlap_synthesis: { label: "Kluczowa Synteza", hint: "Zdefiniuj sedno w 1-2 zdaniach.", placeholder: "np. Prowadzenie założycieli B2B do niepodważalnego autorytetu rynkowego..." },
          pilot_30_days: { label: "Projekt Pilotażowy 30 Dni", hint: "Jaką inicjatywę uruchomisz w ciągu najbliższych 30 dni?", placeholder: "np. 30-dniowa kampania wielokanałowa na LinkedIn i Email..." },
        },
      },
    },
  },
  es: {
    tabs: { passion: "1. Pasión", vocation: "2. Vocación", mission: "3. Misión", profession: "4. Profesión", synthesis: "5. Síntesis", archetype: "Arquetipo y Valores" },
    ui: {
      badge: "Paso 0 • Diagnóstico del Fundador",
      title: "Diagnóstico de Alineación Estratégica Ikigai",
      subtitle: "Descubre tu ventaja competitiva fundamental a través de los 4 pilares del Ikigai.",
      fillDemo: "Cargar Respuestas de Ejemplo",
      synthesizeBtn: "Auto-Sintetizar Pilares",
      synthesizing: "Sintetizando...",
      progress: "Preguntas Completadas",
      monetizationModels: [
        { id: "HIGH_TICKET_RETAINER", label: "Retainer Mensual High-Ticket (3.000€ - 15.000€/mes)" },
        { id: "VALUE_BASED_PROJECT", label: "Proyecto de Precio Fijo por Valor" },
        { id: "SAAS_SUBSCRIPTION", label: "Suscripción Recurrente SaaS" },
        { id: "COMMUNITY_MEMBERSHIP", label: "Comunidad B2B y Asesoría" },
        { id: "HYBRID_PERFORMANCE", label: "Base Retainer + Participación por Éxito" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilar 1: Pasión (Lo Que Amas)",
        desc: "Actividades y temas que te proporcionan energía incondicional.",
        questions: {
          p1_time_loss: { label: "Actividades de Inmersión", hint: "¿En qué tareas pierdes la noción del tiempo?", placeholder: "ej. Diseñar arquitecturas de crecimiento para fundadores..." },
          p1_spare_time_reading: { label: "Temas Naturales", hint: "¿Sobre qué investigas por pura curiosidad?", placeholder: "ej. Psicología conductual, crecimiento orgánico B2B..." },
          p1_average_tuesday: { label: "Martes Ideal", hint: "Describe tu jornada de trabajo perfecta y fluida.", placeholder: "ej. 3 horas de trabajo creativo profundo por la mañana..." },
          p1_energizing_tasks: { label: "Tareas Energizantes", hint: "¿Qué tareas te recargan de energía?", placeholder: "ej. Traducir la visión del fundador en estrategias claras..." },
          p1_childhood_passions: { label: "Pasiones de Juventud", hint: "¿Cuáles fueron tus primeras curiosidades creativas?", placeholder: "ej. Juegos de estrategia, creación de publicaciones..." },
          p1_spark_debates: { label: "Temas de Debate", hint: "¿Con qué dogma del sector estás en desacuerdo?", placeholder: "ej. Por qué las métricas de vanidad dañan la confianza real..." },
          p1_creative_outlets: { label: "Expresión Creativa", hint: "¿Cómo expresas mejor tu originalidad?", placeholder: "ej. Ensayos en profundidad, diagramas conceptuales..." },
        },
      },
      vocation: {
        title: "Pilar 2: Vocación (En Lo Que Eres Bueno)",
        desc: "Tus fortalezas innatas y tu forma singular de resolver problemas.",
        questions: {
          p2_effortless_skills: { label: "Habilidades Naturales", hint: "¿Qué te resulta sencillo pero difícil para otros?", placeholder: "ej. Detectar de inmediato el fallo en el posicionamiento de ventas..." },
          p2_sought_advice: { label: "Consejos que Te Piden", hint: "¿Por qué temas suelen consultarte clientes y colegas?", placeholder: "ej. Cómo estructurar ofertas premium, autoridad de marca..." },
          p2_hard_skills: { label: "Competencias Técnicas", hint: "Tus habilidades demostrables.", placeholder: "ej. Analítica de crecimiento, redacción de conversión..." },
          p2_interpersonal_soft: { label: "Habilidades Interpersonales", hint: "Tus fortalezas de comunicación y liderazgo.", placeholder: "ej. Empatía radical, escucha activa estructurada..." },
          p2_success_patterns: { label: "Patrones de Éxito", hint: "El denominador común de tus mayores logros.", placeholder: "ej. Enfoque en canales asimétricos y eliminación de ruido..." },
          p2_problem_solving: { label: "Método de Solución", hint: "¿Cómo abordas desafíos complejos?", placeholder: "ej. Deconstrucción a primeros principios e iteración ágil..." },
          p2_recurring_praise: { label: "Elogios Recurrentes", hint: "¿Qué cumplidos escuchas habitualmente?", placeholder: "ej. «Aclaraste nuestra visión en una hora mejor que una agencia en seis meses»" },
        },
      },
      mission: {
        title: "Pilar 3: Misión (Lo Que el Mundo Necesita)",
        desc: "La comunidad a la que sirves y los problemas que erradicas.",
        questions: {
          p3_systemic_injustice: { label: "Problemas Sistémicos", hint: "¿Qué deficiencias del mercado deseas erradicar?", placeholder: "ej. Fundadores excelentes que permanecen invisibles..." },
          p3_community_to_help: { label: "Comunidad Objetivo", hint: "¿A qué grupo específico te comprometes a impulsar?", placeholder: "ej. Fundadores B2B, consultores especializados..." },
          p3_unlimited_resource: { label: "Causa Principal", hint: "¿Qué misión ética guía tu negocio?", placeholder: "ej. Democratizar estrategias de dirección de marketing de élite..." },
          p3_immediate_needs: { label: "Necesidades Prácticas Diarias", hint: "¿Qué problemas concretos quitan el sueño a tus clientes?", placeholder: "ej. Flujo impredecible de clientes, falta de visibilidad..." },
          p3_future_gap: { label: "Visión a 10 Años", hint: "¿Hacia dónde va el mercado en la próxima década?", placeholder: "ej. El contenido genérico de IA saturará todo; solo la voz auténtica convertirá..." },
          p3_legacy_impact: { label: "Legado Deseado", hint: "¿Qué impacto duradero deseas dejar?", placeholder: "ej. Haber ayudado a más de 1.000 fundadores a construir empresas líderes..." },
        },
      },
      profession: {
        title: "Pilar 4: Profesión (Por Lo Que Te Pueden Pagar)",
        desc: "Mecanismos de monetización y ofertas premium de alto valor.",
        questions: {
          p4_past_paid_services: { label: "Servicios Pagados Exitosos", hint: "¿Qué han comprado ya tus clientes con satisfacción?", placeholder: "ej. Asesoría Fractional CMO, workshops de posicionamiento..." },
          p4_market_paid_skills: { label: "Habilidades Más Cotizadas", hint: "¿Qué competencias tienen mayor disposición de pago?", placeholder: "ej. Diseño de categorías de mercado, ofertas high-ticket..." },
          p4_commercial_hobbies: { label: "Intereses Monetizables", hint: "¿Qué aficiones tienen potencial de mercado?", placeholder: "ej. Publicación de análisis de negocio, comunidades privadas..." },
          p4_high_value_roi: { label: "Impacto Económico Medible", hint: "¿Qué rentabilidad tangible generas para los clientes?", placeholder: "ej. Más de 2,4M€ en acuerdos cerrados gracias al posicionamiento..." },
          p4_premium_assets: { label: "Oferta Insignia", hint: "Tu solución más completa de alto valor.", placeholder: "ej. Sistema de Posicionamiento y Distribución en 30 Días..." },
          p4_growth_niches: { label: "Nichos en Expansión", hint: "¿Qué tendencias de mercado están acelerando?", placeholder: "ej. Asesoría B2B asistida por IA, herramientas tecnológicas..." },
          p4_monetization_fit: { label: "Modelo de Monetización", hint: "¿Cómo generas tus ingresos?", placeholder: "ej. Retainer mensual premium + porcentaje sobre resultados..." },
        },
      },
      synthesis: {
        title: "Síntesis & Acción Inmediata",
        desc: "La confluencia de tus 4 pilares.",
        questions: {
          overlap_synthesis: { label: "Intersección Central", hint: "Resume tu eje rector en 1 o 2 frases.", placeholder: "ej. Guiar a fundadores B2B hacia la autoridad indiscutible y clientes constantes..." },
          pilot_30_days: { label: "Proyecto Piloto 30 Días", hint: "¿Qué iniciativa concreta lanzarás este mes?", placeholder: "ej. Desplegar una campaña multicanal en LinkedIn y correo durante 30 días..." },
        },
      },
    },
  },
};

export function getIkigaiPillarConfig(
  lang: LanguageCode = "en"
): IkigaiPillarConfig[] {
  const dict = IKIGAI_TRANSLATIONS[lang] || IKIGAI_TRANSLATIONS.en;

  const makeQuestions = (
    qDict: Record<string, { label: string; hint: string; placeholder: string }>
  ): IkigaiQuestionMeta[] => {
    return Object.entries(qDict).map(([key, data]) => ({
      key: key as keyof IkigaiData,
      label: data.label,
      hint: data.hint,
      placeholder: data.placeholder,
    }));
  };

  return [
    {
      id: "passion",
      badge: "Pillar 1",
      title: dict.pillars.passion.title,
      desc: dict.pillars.passion.desc,
      iconName: "Heart",
      colorClass: "pink",
      questions: makeQuestions(dict.pillars.passion.questions),
    },
    {
      id: "vocation",
      badge: "Pillar 2",
      title: dict.pillars.vocation.title,
      desc: dict.pillars.vocation.desc,
      iconName: "Globe",
      colorClass: "indigo",
      questions: makeQuestions(dict.pillars.vocation.questions),
    },
    {
      id: "mission",
      badge: "Pillar 3",
      title: dict.pillars.mission.title,
      desc: dict.pillars.mission.desc,
      iconName: "Sparkles",
      colorClass: "purple",
      questions: makeQuestions(dict.pillars.mission.questions),
    },
    {
      id: "profession",
      badge: "Pillar 4",
      title: dict.pillars.profession.title,
      desc: dict.pillars.profession.desc,
      iconName: "Briefcase",
      colorClass: "emerald",
      questions: makeQuestions(dict.pillars.profession.questions),
    },
    {
      id: "synthesis",
      badge: "Action",
      title: dict.pillars.synthesis.title,
      desc: dict.pillars.synthesis.desc,
      iconName: "Target",
      colorClass: "amber",
      questions: makeQuestions(dict.pillars.synthesis.questions),
    },
  ];
}
