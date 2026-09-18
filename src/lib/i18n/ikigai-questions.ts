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
  // ─────────────────────────────────────────────────────────────────────────────
  // ENGLISH
  // ─────────────────────────────────────────────────────────────────────────────
  en: {
    tabs: {
      passion: "1. What You Love",
      vocation: "2. What You're Good At",
      mission: "3. What the World Needs",
      profession: "4. What You Can Be Paid For",
      synthesis: "5. Intersection",
      archetype: "Archetype & Values",
    },
    ui: {
      badge: "Step 0 • Human-First Self-Discovery",
      title: "Ikigai Human Discovery Diagnostic",
      subtitle: "Discover who you truly are. Understanding yourself across these 4 dimensions reveals which business opportunities align with your unique human nature — because the human drives the business.",
      fillDemo: "Load Demo Answers",
      synthesizeBtn: "Auto-Synthesize Core Pillars",
      synthesizing: "Synthesizing...",
      progress: "Questions Completed",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Traditional Employment (Salary + Benefits)" },
        { id: "FREELANCE_CONSULTING", label: "Freelance / Independent Consulting" },
        { id: "DIGITAL_PRODUCTS", label: "Digital Products & Online Courses" },
        { id: "PHYSICAL_PRODUCTS", label: "Physical Products / Handcraft / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Building a Business / Startup Founder" },
      ],
    },
    pillars: {
      passion: {
        title: "Pillar 1: What You Love",
        desc: "Activities, topics, and interests that bring you intrinsic joy and make time disappear — independent of money or status.",
        questions: {
          p1_time_loss: {
            label: "Time-Loss Activities",
            hint: "What activities make you lose complete track of time when you engage in them?",
            placeholder: "e.g. Writing stories, crafting things by hand, solving puzzles, teaching others, making music, coding for fun...",
          },
          p1_spare_time_reading: {
            label: "Spare-Time Curiosities",
            hint: "What topics, subjects, or hobbies do you naturally find yourself researching or reading about in your spare time?",
            placeholder: "e.g. Psychology, philosophy, history, design, technology, cooking, nature, art, astronomy, linguistics...",
          },
          p1_average_tuesday: {
            label: "Your Ideal Tuesday",
            hint: "If money and social status were completely irrelevant, how would you choose to spend your average Tuesday?",
            placeholder: "e.g. Morning walk in nature, hours of deep reading, creative projects, meaningful conversations, learning something new...",
          },
          p1_energizing_tasks: {
            label: "Energizing Activities",
            hint: "What activities leave you feeling energized and recharged rather than drained, even after hours of effort?",
            placeholder: "e.g. Helping someone solve a problem, organizing information, creating something original, exploring new ideas...",
          },
          p1_childhood_passions: {
            label: "Childhood Passions",
            hint: "What were your favorite childhood games, fascinations, or interests before external expectations took over?",
            placeholder: "e.g. Drawing, building with LEGO, writing stories, exploring nature, performing in plays, inventing games...",
          },
          p1_spark_debates: {
            label: "Curiosity & Excitement",
            hint: "What kind of conversations or debates genuinely spark your curiosity and excitement?",
            placeholder: "e.g. Ethics of technology, education reform, environmental solutions, human potential, philosophy of life...",
          },
          p1_creative_outlets: {
            label: "Personal Joy Outlets",
            hint: "What creative or expressive outlets bring you the deepest sense of personal joy?",
            placeholder: "e.g. Writing, painting, music, photography, crafting, designing, cooking, gardening, dancing...",
          },
        },
      },
      vocation: {
        title: "Pillar 2: What You Are Good At",
        desc: "Your natural strengths, mastered skills, and the unique ways you approach and solve problems.",
        questions: {
          p2_effortless_skills: {
            label: "Effortless Skills",
            hint: "What tasks or skills feel effortless and intuitive to you, but seem challenging to others?",
            placeholder: "e.g. Listening deeply, explaining complex ideas simply, spotting patterns, organizing information, learning quickly...",
          },
          p2_sought_advice: {
            label: "Go-To Advice",
            hint: "For what specific advice, help, or guidance do friends, family, or colleagues consistently come to you?",
            placeholder: "e.g. Career decisions, relationship advice, technical problems, creative direction, how to learn something...",
          },
          p2_hard_skills: {
            label: "Mastered Hard Skills",
            hint: "What hard or technical skills have you mastered through dedicated practice or study?",
            placeholder: "e.g. Programming, writing, design, mathematics, foreign languages, data analysis, research methods...",
          },
          p2_interpersonal_soft: {
            label: "Key Soft Skills",
            hint: "What interpersonal or soft skills (e.g., empathy, negotiation, organization, public speaking) represent your greatest strength?",
            placeholder: "e.g. Empathy and active listening, public speaking, negotiating win-win outcomes, bringing people together...",
          },
          p2_success_patterns: {
            label: "Success Patterns",
            hint: "What patterns of success or recurring accomplishments have defined your academic or professional journey so far?",
            placeholder: "e.g. I consistently help others reach their goals, I create clarity from complexity, I connect the right people...",
          },
          p2_problem_solving: {
            label: "Signature Problem-Solving",
            hint: "When faced with a complex problem, what is your signature approach to breaking it down and finding a solution?",
            placeholder: "e.g. I gather all perspectives first, then break the problem into parts and test solutions step by step...",
          },
          p2_recurring_praise: {
            label: "Recurring Praise",
            hint: "What positive feedback or constructive praise do you receive repeatedly from managers, peers, or mentors?",
            placeholder: "e.g. 'You always make things clearer', 'I can count on you', 'You see things others miss', 'You're great with people'...",
          },
        },
      },
      mission: {
        title: "Pillar 3: What the World Needs",
        desc: "The social problems, communities, and values you feel genuinely called to champion — your authentic contribution to the world.",
        questions: {
          p3_systemic_injustice: {
            label: "Societal Frustrations",
            hint: "What systemic problems, injustices, or inefficiencies in society frustrate you the most and make you want to intervene?",
            placeholder: "e.g. Inequality in education, mental health stigma, environmental destruction, loneliness, lack of access to knowledge...",
          },
          p3_community_to_help: {
            label: "People You Want to Help",
            hint: "Which specific group of people, community, or cause do you feel an authentic desire to help or protect?",
            placeholder: "e.g. Young people without mentors, elderly isolated by technology, communities without access to resources...",
          },
          p3_unlimited_resource: {
            label: "One Problem to Solve",
            hint: "If you had unlimited influence to solve just one global or local problem, which one would it be?",
            placeholder: "e.g. Universal access to quality education, mental health support systems, clean environment for future generations...",
          },
          p3_immediate_needs: {
            label: "Immediate Environment Needs",
            hint: "What practical changes or improvements do people in your immediate environment constantly need?",
            placeholder: "e.g. People around me need more meaningful connection, better learning tools, clearer communication, emotional support...",
          },
          p3_non_negotiables: {
            label: "Non-Negotiable Values",
            hint: "What values (e.g., justice, clarity, knowledge, sustainability, beauty) feel non-negotiable for you to champion?",
            placeholder: "e.g. Honesty, fairness, respect for all people, continuous learning, environmental responsibility, human dignity...",
          },
          p3_future_gap: {
            label: "10–20 Year Critical Gap",
            hint: "Looking ahead 10 to 20 years, what critical gap in society or your industry do you think needs urgently addressing?",
            placeholder: "e.g. Human connection and emotional resilience will be critical as automation transforms work and daily life...",
          },
          p3_legacy_impact: {
            label: "Legacy & Impact",
            hint: "What legacy or tangible positive impact would you be proudest to leave behind for others?",
            placeholder: "e.g. That I helped people discover their potential, that I made knowledge more accessible, that communities became stronger...",
          },
        },
      },
      profession: {
        title: "Pillar 4: What You Can Be Paid For",
        desc: "Skills, knowledge, and interests that have real market value and commercial potential — your path to sustainable income.",
        questions: {
          p4_past_paid_services: {
            label: "Past Paid Work",
            hint: "What specific services, deliverables, or outcomes have people or companies paid you for in the past?",
            placeholder: "e.g. Teaching, writing, consulting, designing, coding, coaching, caregiving, managing projects, translating...",
          },
          p4_market_paid_skills: {
            label: "Marketable Skills",
            hint: "What skills or knowledge do you hold that businesses or individuals currently spend significant money to acquire?",
            placeholder: "e.g. Data analysis, software development, creative writing, financial planning, language skills, therapy, sales...",
          },
          p4_commercial_hobbies: {
            label: "Commercial Hobby Potential",
            hint: "Which of your personal interests or hobbies has realistic commercial potential or scalable market demand?",
            placeholder: "e.g. Photography, cooking, fitness coaching, crafting, music production, tutoring, content creation, gardening...",
          },
          p4_high_value_roi: {
            label: "High-Value Problem Solving",
            hint: "What high-value problem can you solve for someone that directly saves them time, saves them money, or increases their revenue?",
            placeholder: "e.g. I help people save hours weekly through better systems, or learn skills 3x faster through personalized guidance...",
          },
          p4_premium_assets: {
            label: "Premium Credentials & Products",
            hint: "What professional certifications, credentials, or tangible products could you develop to command a premium rate?",
            placeholder: "e.g. A professional certification, an online course, a specialized book, a unique tool or physical product...",
          },
          p4_growth_niches: {
            label: "Best-Fit Industries",
            hint: "In which growing industries or market niches could your combined skills be immediately relevant and well-compensated?",
            placeholder: "e.g. AI and technology education, wellness and mental health, sustainability consulting, remote work optimization...",
          },
          p4_monetization_fit: {
            label: "Monetization Model Fit",
            hint: "Are you best suited to monetize via employment, freelance consulting, creating physical/digital products, or building an enterprise?",
            placeholder: "e.g. I prefer the stability of employment with creative freedom, or freelancing for the flexibility and variety it offers...",
          },
        },
      },
      synthesis: {
        title: "Intersection & Alignment",
        desc: "The natural overlap where what you love, your strengths, the world's needs, and income potential all converge.",
        questions: {
          overlap_synthesis: {
            label: "The Natural Overlap",
            hint: "Looking across all four categories, where do you see the most natural overlap between your favorite skill, a market need, and a fair income?",
            placeholder: "e.g. I love teaching, I'm exceptional at explaining complex things simply, there's growing demand for personalized education, and tutors can earn well...",
          },
          pilot_30_days: {
            label: "30-Day Pilot Idea",
            hint: "What is one realistic career, project, or venture idea you could pilot in the next 30 days that hits all four pillars simultaneously?",
            placeholder: "e.g. Offer 3 free coaching sessions to test my approach, write one article per week, launch a small online course on a topic I love...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ROMANIAN
  // ─────────────────────────────────────────────────────────────────────────────
  ro: {
    tabs: {
      passion: "1. Ce Iubești",
      vocation: "2. La Ce Ești Bun",
      mission: "3. Ce Nevoie Are Lumea",
      profession: "4. Pentru Ce Poți Fi Plătit",
      synthesis: "5. Convergență",
      archetype: "Arhetip & Valori",
    },
    ui: {
      badge: "Pasul 0 • Descoperire Umană",
      title: "Diagnostic Ikigai de Descoperire Personală",
      subtitle: "Descoperă cine ești cu adevărat. Înțelegerea ta pe aceste 4 dimensiuni revelează ce oportunități de afaceri se aliniază cu natura ta unică — pentru că omul conduce afacerea, nu invers.",
      fillDemo: "Încarcă Răspunsuri Demo",
      synthesizeBtn: "Auto-Sintetizează Pilonii",
      synthesizing: "Se sintetizează...",
      progress: "Întrebări Completate",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Angajare Clasică (Salariu + Beneficii)" },
        { id: "FREELANCE_CONSULTING", label: "Freelancing / Consultanță Independentă" },
        { id: "DIGITAL_PRODUCTS", label: "Produse Digitale & Cursuri Online" },
        { id: "PHYSICAL_PRODUCTS", label: "Produse Fizice / Meșteșug / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Construirea unei Afaceri / Fondator Startup" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilonul 1: Ce Iubești să Faci",
        desc: "Activități, subiecte și interese care îți aduc bucurie intrinsecă și îți fac timpul să zboare — independent de bani sau statut.",
        questions: {
          p1_time_loss: {
            label: "Activități în care Timpul Zboară",
            hint: "Ce activități te fac să pierzi complet noțiunea timpului atunci când le faci?",
            placeholder: "ex. Scrierea de povești, crearea de lucruri manual, rezolvarea de puzzle-uri, predarea, compunerea de muzică...",
          },
          p1_spare_time_reading: {
            label: "Curiozități din Timpul Liber",
            hint: "Despre ce subiecte, domenii sau hobby-uri citești și te documentezi din proprie inițiativă în timpul liber?",
            placeholder: "ex. Psihologie, filosofie, istorie, design, tehnologie, gătit, natură, artă, astronomie, lingvistică...",
          },
          p1_average_tuesday: {
            label: "Marțea Ta Ideală",
            hint: "Dacă banii și statutul social nu ar conta deloc, cum ai alege să-ți petreci o zi obișnuită de marți?",
            placeholder: "ex. Plimbare dimineața în natură, ore de lectură aprofundată, proiecte creative, conversații semnificative...",
          },
          p1_energizing_tasks: {
            label: "Activități Energizante",
            hint: "Ce activități îți dau o stare de energie și vitalitate în loc să te epuizeze, chiar și după ore întregi de efort?",
            placeholder: "ex. Ajutarea cuiva să rezolve o problemă, organizarea informațiilor, crearea ceva original, explorarea de idei noi...",
          },
          p1_childhood_passions: {
            label: "Pasiuni din Copilărie",
            hint: "Care erau jocurile, pasiunile sau interesele tale preferate din copilărie, înainte să intervină așteptările celor din jur?",
            placeholder: "ex. Desen, construirea cu LEGO, scrierea de povești, explorarea naturii, actorie, inventarea de jocuri...",
          },
          p1_spark_debates: {
            label: "Curiozitate & Entuziasm",
            hint: "Ce tipuri de conversații sau dezbateri îți trezesc o curiozitate și un entuziasm autentic?",
            placeholder: "ex. Etica tehnologiei, reforma educațională, soluții de mediu, potențialul uman, filosofia vieții...",
          },
          p1_creative_outlets: {
            label: "Bucurie Personală",
            hint: "Prin ce activități creative sau de exprimare simți cea mai profundă bucurie personală?",
            placeholder: "ex. Scris, pictură, muzică, fotografie, meșteșuguri, design, gătit, grădinărit, dans...",
          },
        },
      },
      vocation: {
        title: "Pilonul 2: La Ce Te Pricepi Excelent",
        desc: "Punctele tale forte naturale, abilitățile dobândite și modurile unice în care abordezi și rezolvi problemele.",
        questions: {
          p2_effortless_skills: {
            label: "Abilități Firești",
            hint: "Ce sarcini sau abilități ți se par firești și ușoare, dar par dificile pentru ceilalți?",
            placeholder: "ex. Ascultarea profundă, explicarea ideilor complexe simplu, identificarea tiparelor, organizarea informațiilor...",
          },
          p2_sought_advice: {
            label: "Sfaturile Tale",
            hint: "Pentru ce fel de sfaturi, ajutor sau îndrumare apelează cel mai des la tine prietenii, familia sau colegii?",
            placeholder: "ex. Decizii de carieră, sfaturi relaționale, probleme tehnice, idei creative, cum să înveți ceva nou...",
          },
          p2_hard_skills: {
            label: "Abilități Tehnice Stăpânite",
            hint: "Ce abilități practice sau tehnice ai stăpânit de-a lungul anilor prin studiu sau exercițiu susținut?",
            placeholder: "ex. Programare, scriere, design, matematică, limbi străine, analiză de date, cercetare...",
          },
          p2_interpersonal_soft: {
            label: "Abilități Interpersonale Forte",
            hint: "Ce abilități interpersonale (ex. empatie, negociere, organizare, vorbit în public) reprezintă punctul tău forte?",
            placeholder: "ex. Empatie și ascultare activă, discurs public, negociere, capacitatea de a uni oamenii...",
          },
          p2_success_patterns: {
            label: "Tipare de Succes",
            hint: "Ce tipare de succes sau realizări recurente ți-au marcat parcursul educațional sau profesional de până acum?",
            placeholder: "ex. Ajut constant alții să-și atingă obiectivele, creez claritate din haos, conectez oamenii potriviți...",
          },
          p2_problem_solving: {
            label: "Mod Caracteristic de Rezolvare",
            hint: "În fața unei probleme complexe, care este modul tău caracteristic de a o analiza și rezolva?",
            placeholder: "ex. Ascult toate perspectivele mai întâi, apoi descompun problema și testez soluțiile una câte una...",
          },
          p2_recurring_praise: {
            label: "Aprecieri Recurente",
            hint: "Ce laude sau aprecieri pozitive primești în mod repetat de la manageri, colegi sau mentori?",
            placeholder: "ex. 'Întotdeauna clarifici lucrurile', 'Pot conta mereu pe tine', 'Ai un dar de a vedea ce alții ratează'...",
          },
        },
      },
      mission: {
        title: "Pilonul 3: De Ce Are Nevoie Lumea",
        desc: "Problemele sociale, comunitățile și valorile pe care simți chemarea autentică să le aperi — contribuția ta la lume.",
        questions: {
          p3_systemic_injustice: {
            label: "Frustrări Societale",
            hint: "Ce probleme sistemice, nedreptăți sau ineficiențe din societate te revoltă cel mai tare și te fac să vrei să intervii?",
            placeholder: "ex. Inegalitatea în educație, stigmatul în sănătatea mintală, distrugerea mediului, singurătatea, lipsa cunoașterii...",
          },
          p3_community_to_help: {
            label: "Oameni pe care Vrei să Îi Ajuți",
            hint: "Cărui grup de oameni, comunități sau cauze simți o dorință autentică de a-i fi de folos sau de a-l proteja?",
            placeholder: "ex. Tineri fără mentori, vârstnici izolați de tehnologie, comunități fără acces la resurse educaționale...",
          },
          p3_unlimited_resource: {
            label: "O Singură Problemă de Rezolvat",
            hint: "Dacă ai avea resurse nelimitate să rezolvi o singură problemă locală sau globală, care ar fi aceea?",
            placeholder: "ex. Acces universal la educație de calitate, sisteme de suport pentru sănătatea mintală, mediu curat...",
          },
          p3_immediate_needs: {
            label: "Nevoi din Mediul Apropiat",
            hint: "De ce îmbunătățiri sau schimbări practice au nevoie constant oamenii din mediul tău apropiat?",
            placeholder: "ex. Oamenii din jurul meu au nevoie de conexiuni mai semnificative, instrumente mai bune pentru a învăța...",
          },
          p3_non_negotiables: {
            label: "Valori Nenegociabile",
            hint: "Ce valori fundamentale (ex. dreptate, claritate, cunoaștere, sustenabilitate, frumusețe) consideri nenegociabil să le susții?",
            placeholder: "ex. Onestitate, echitate, respect față de toți oamenii, învățare continuă, responsabilitate față de mediu...",
          },
          p3_future_gap: {
            label: "Golul Critic din Viitor",
            hint: "Privind peste 10-20 de ani, ce gol critic din societate sau din domeniul tău crezi că trebuie rezolvat urgent?",
            placeholder: "ex. Conexiunea umană și reziliența emoțională vor fi critice pe măsură ce automatizarea transformă munca...",
          },
          p3_legacy_impact: {
            label: "Moștenire & Impact",
            hint: "Ce moștenire sau impact pozitiv concret ai fi cel mai mândru să lași în urma ta pentru ceilalți?",
            placeholder: "ex. Că am ajutat oamenii să-și descopere potențialul, că am făcut cunoașterea mai accesibilă...",
          },
        },
      },
      profession: {
        title: "Pilonul 4: Pentru Ce Poți Fi Plătit",
        desc: "Abilități, cunoștințe și interese care au valoare reală de piață și potențial comercial — calea ta spre un venit sustenabil.",
        questions: {
          p4_past_paid_services: {
            label: "Muncă Plătită în Trecut",
            hint: "Pentru ce servicii, livrabile sau rezultate concrete ai fost plătit de oameni sau companii în trecut?",
            placeholder: "ex. Predare, scriere, consultanță, design, programare, coaching, îngrijire, management de proiect, traduceri...",
          },
          p4_market_paid_skills: {
            label: "Abilități cu Valoare de Piață",
            hint: "Ce cunoștințe sau abilități deții pentru care companiile sau persoanele fizice plătesc sume importante în prezent?",
            placeholder: "ex. Analiză de date, dezvoltare software, scriere creativă, planificare financiară, limbi străine, terapie...",
          },
          p4_commercial_hobbies: {
            label: "Potențial Comercial al Hobby-urilor",
            hint: "Care dintre interesele sau hobby-urile tale are potențial comercial real sau cerere scalabilă în piață?",
            placeholder: "ex. Fotografie, gătit, coaching fitness, meșteșuguri, producție muzicală, meditații, crearea de conținut...",
          },
          p4_high_value_roi: {
            label: "Probleme de Mare Valoare",
            hint: "Ce problemă valoroasă poți rezolva pentru cineva care să îi economisească timp, bani sau să îi crească veniturile?",
            placeholder: "ex. Pot ajuta oamenii să economisească ore săptămânale prin sisteme mai bune, sau să învețe mai rapid...",
          },
          p4_premium_assets: {
            label: "Certificări & Produse Premium",
            hint: "Ce certificări, produse sau expertize tangibile ai putea dezvolta pentru a cere un tarif peste medie?",
            placeholder: "ex. O certificare profesională, un curs online pe care l-aș putea preda, o carte specializată, un produs unic...",
          },
          p4_growth_niches: {
            label: "Industrii Potrivite",
            hint: "În ce industrii în creștere sau nișe de piață s-ar potrivi abilitățile tale pentru a fi bine remunerate?",
            placeholder: "ex. Educație în AI și tehnologie, wellness și sănătate mintală, consultanță în sustenabilitate...",
          },
          p4_monetization_fit: {
            label: "Modelul de Monetizare Potrivit",
            hint: "Ce model de monetizare ți se potrivește cel mai bine: angajare clasică, consultanță/freelancing, produse fizice/digitale sau fondarea unei afaceri?",
            placeholder: "ex. Prefer stabilitatea angajării cu libertate creativă, sau freelancingul pentru flexibilitate și varietate...",
          },
        },
      },
      synthesis: {
        title: "Sinteză și Convergență",
        desc: "Suprapunerea naturală unde dragostea ta, abilitățile, impactul social și potențialul de venit converg.",
        questions: {
          overlap_synthesis: {
            label: "Suprapunerea Naturală",
            hint: "Privind cele patru categorii, unde vezi cea mai firească suprapunere între ce iubești să faci, la ce ești bun, nevoia pieței și un venit corect?",
            placeholder: "ex. Îmi place să predau, sunt excepțional la explicarea lucrurilor complexe simplu, există cerere pentru educație personalizată...",
          },
          pilot_30_days: {
            label: "Idee Pilot pe 30 de Zile",
            hint: "Care este un proiect, rol sau demers realist pe care l-ai putea testa în următoarele 30 de zile și care atinge simultan toți cei 4 piloni?",
            placeholder: "ex. Ofer 3 sesiuni gratuite de coaching, scriu un articol pe săptămână pe tema mea preferată, prototipez un mic curs online...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GERMAN
  // ─────────────────────────────────────────────────────────────────────────────
  de: {
    tabs: {
      passion: "1. Was Sie Lieben",
      vocation: "2. Worin Sie Gut Sind",
      mission: "3. Was Die Welt Braucht",
      profession: "4. Wofür Sie Bezahlt Werden",
      synthesis: "5. Schnittpunkt",
      archetype: "Archetyp & Werte",
    },
    ui: {
      badge: "Schritt 0 • Menschliche Selbstentdeckung",
      title: "Ikigai Persönlichkeits-Diagnose",
      subtitle: "Entdecken Sie, wer Sie wirklich sind. Das Verstehen Ihrer 4 Dimensionen zeigt, welche Geschäftsmöglichkeiten zu Ihrer einzigartigen Natur passen — denn der Mensch treibt das Geschäft an.",
      fillDemo: "Demo-Antworten laden",
      synthesizeBtn: "Kern-Säulen synthetisieren",
      synthesizing: "Wird verarbeitet...",
      progress: "Fragen beantwortet",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Festanstellung (Gehalt + Leistungen)" },
        { id: "FREELANCE_CONSULTING", label: "Freiberufliche / Unabhängige Beratung" },
        { id: "DIGITAL_PRODUCTS", label: "Digitale Produkte & Online-Kurse" },
        { id: "PHYSICAL_PRODUCTS", label: "Physische Produkte / Kunsthandwerk / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Unternehmensaufbau / Startup-Gründer" },
      ],
    },
    pillars: {
      passion: {
        title: "Säule 1: Was Sie Lieben",
        desc: "Aktivitäten, Themen und Interessen, die Ihnen tiefe Freude bringen und die Zeit vergessen lassen — unabhängig von Geld oder Status.",
        questions: {
          p1_time_loss: {
            label: "Zeitvergessenheits-Aktivitäten",
            hint: "Bei welchen Aktivitäten verlieren Sie völlig das Zeitgefühl?",
            placeholder: "z.B. Geschichten schreiben, Dinge bauen, Rätsel lösen, anderen etwas beibringen, Musik machen...",
          },
          p1_spare_time_reading: {
            label: "Naturinteressen",
            hint: "Über welche Themen, Bereiche oder Hobbys informieren Sie sich in Ihrer Freizeit aus eigener Initiative?",
            placeholder: "z.B. Psychologie, Philosophie, Geschichte, Design, Technologie, Kochen, Natur, Kunst...",
          },
          p1_average_tuesday: {
            label: "Ihr Idealer Dienstag",
            hint: "Wenn Geld und Status keine Rolle spielten, wie würden Sie einen ganz normalen Dienstag verbringen?",
            placeholder: "z.B. Morgenspaziergang in der Natur, stundenlange Lektüre, kreative Projekte, bedeutsame Gespräche...",
          },
          p1_energizing_tasks: {
            label: "Energiespendende Tätigkeiten",
            hint: "Welche Aktivitäten geben Ihnen Energie, anstatt Sie zu erschöpfen, selbst nach stundenlangem Einsatz?",
            placeholder: "z.B. Jemandem bei einem Problem helfen, Informationen ordnen, etwas Originelles erschaffen...",
          },
          p1_childhood_passions: {
            label: "Kindheitsleidenschaften",
            hint: "Welche Spiele, Faszinationen oder Interessen hatten Sie in der Kindheit, bevor externe Erwartungen Einzug hielten?",
            placeholder: "z.B. Zeichnen, LEGO bauen, Geschichten schreiben, Natur erkunden, auftreten, Spiele erfinden...",
          },
          p1_spark_debates: {
            label: "Neugier & Begeisterung",
            hint: "Welche Gesprächs- oder Debattenthemen wecken echte Neugier und Begeisterung in Ihnen?",
            placeholder: "z.B. Technikethik, Bildungssysteme, Umweltfragen, menschliches Potenzial, Lebensphilosophie...",
          },
          p1_creative_outlets: {
            label: "Persönliche Freude",
            hint: "Durch welche kreativen oder ausdrucksstarken Aktivitäten empfinden Sie tiefe persönliche Freude?",
            placeholder: "z.B. Schreiben, Malen, Musik, Fotografie, Basteln, Designen, Kochen, Gärtnern, Tanzen...",
          },
        },
      },
      vocation: {
        title: "Säule 2: Worin Sie Gut Sind",
        desc: "Ihre natürlichen Stärken, gemeisterten Fähigkeiten und einzigartigen Problemlösungsansätze.",
        questions: {
          p2_effortless_skills: {
            label: "Mühelose Fähigkeiten",
            hint: "Welche Aufgaben oder Fähigkeiten fallen Ihnen mühelos und intuitiv, anderen aber schwer?",
            placeholder: "z.B. Tief zuhören, komplexe Ideen einfach erklären, Muster erkennen, Informationen ordnen...",
          },
          p2_sought_advice: {
            label: "Ihr Ratgeber-Bereich",
            hint: "Für welche konkreten Ratschläge, Hilfe oder Orientierung kommen Freunde, Familie oder Kollegen regelmäßig zu Ihnen?",
            placeholder: "z.B. Karriereentscheidungen, Beziehungsratschläge, technische Probleme, kreative Ideen...",
          },
          p2_hard_skills: {
            label: "Gemeisterte Fachkenntnisse",
            hint: "Welche hard oder technischen Fähigkeiten haben Sie durch gezieltes Üben oder Studium gemeistert?",
            placeholder: "z.B. Programmieren, Schreiben, Design, Mathematik, Fremdsprachen, Datenanalyse, Forschung...",
          },
          p2_interpersonal_soft: {
            label: "Soziale Stärken",
            hint: "Welche interpersonellen oder Soft Skills (z.B. Empathie, Verhandlung, Organisation, Reden) sind Ihre größte Stärke?",
            placeholder: "z.B. Empathie und aktives Zuhören, Reden in der Öffentlichkeit, Win-Win-Verhandlungen, Teams zusammenbringen...",
          },
          p2_success_patterns: {
            label: "Erfolgsmuster",
            hint: "Welche Erfolgsmuster oder wiederkehrenden Leistungen haben Ihren bisherigen Bildungs- oder Berufsweg geprägt?",
            placeholder: "z.B. Ich helfe anderen konsequent ihre Ziele zu erreichen, ich schaffe Ordnung aus Chaos, ich verbinde die richtigen Menschen...",
          },
          p2_problem_solving: {
            label: "Typischer Problemlösungsansatz",
            hint: "Wenn Sie mit einem komplexen Problem konfrontiert sind, wie ist Ihre typische Vorgehensweise?",
            placeholder: "z.B. Ich höre mir alle Perspektiven an, dann zerlege ich das Problem und teste Lösungen Schritt für Schritt...",
          },
          p2_recurring_praise: {
            label: "Wiederkehrendes Lob",
            hint: "Welches positive Feedback oder konstruktives Lob erhalten Sie immer wieder von Vorgesetzten, Kollegen oder Mentoren?",
            placeholder: "z.B. 'Du machst immer alles klarer', 'Ich kann immer auf dich zählen', 'Du siehst, was andere nicht sehen'...",
          },
        },
      },
      mission: {
        title: "Säule 3: Was Die Welt Braucht",
        desc: "Die gesellschaftlichen Probleme, Gemeinschaften und Werte, für die Sie sich authentisch einsetzen möchten.",
        questions: {
          p3_systemic_injustice: {
            label: "Gesellschaftliche Frustrationen",
            hint: "Welche systemischen Probleme, Ungerechtigkeiten oder Ineffizienzen in der Gesellschaft frustrieren Sie am meisten?",
            placeholder: "z.B. Bildungsungleichheit, psychische Gesundheit, Umweltzerstörung, Einsamkeit, fehlender Wissenszugang...",
          },
          p3_community_to_help: {
            label: "Menschen, denen Sie helfen wollen",
            hint: "Welcher spezifischen Gruppe, Gemeinschaft oder Sache möchten Sie authentisch helfen oder sie schützen?",
            placeholder: "z.B. Junge Menschen ohne Mentoren, ältere Menschen isoliert von Technologie, benachteiligte Gemeinschaften...",
          },
          p3_unlimited_resource: {
            label: "Ein Problem zu lösen",
            hint: "Wenn Sie unbegrenzten Einfluss hätten, welches eine globale oder lokale Problem würden Sie lösen?",
            placeholder: "z.B. Universeller Zugang zu Bildung, Unterstützungssysteme für psychische Gesundheit, saubere Umwelt...",
          },
          p3_immediate_needs: {
            label: "Unmittelbares Umfeld",
            hint: "Welche praktischen Veränderungen oder Verbesserungen benötigen Menschen in Ihrem unmittelbaren Umfeld ständig?",
            placeholder: "z.B. Menschen um mich brauchen mehr echte Verbindung, bessere Lernwerkzeuge, klarere Kommunikation...",
          },
          p3_non_negotiables: {
            label: "Nicht verhandelbare Werte",
            hint: "Welche Werte (z.B. Gerechtigkeit, Klarheit, Wissen, Nachhaltigkeit, Schönheit) sind für Sie nicht verhandelbar?",
            placeholder: "z.B. Ehrlichkeit, Fairness, Respekt gegenüber allen, kontinuierliches Lernen, Umweltverantwortung...",
          },
          p3_future_gap: {
            label: "Kritische 10–20 Jahres-Lücke",
            hint: "In 10 bis 20 Jahren – welche kritische Lücke in der Gesellschaft oder Ihrer Branche muss dringend geschlossen werden?",
            placeholder: "z.B. Menschliche Verbindung und emotionale Resilienz werden kritisch, da Automatisierung die Arbeit transformiert...",
          },
          p3_legacy_impact: {
            label: "Vermächtnis & Einfluss",
            hint: "Welches Vermächtnis oder welchen konkreten positiven Einfluss wären Sie am stolzesten zu hinterlassen?",
            placeholder: "z.B. Dass ich Menschen geholfen habe, ihr Potenzial zu entdecken, dass ich Wissen zugänglicher gemacht habe...",
          },
        },
      },
      profession: {
        title: "Säule 4: Wofür Sie Bezahlt Werden Können",
        desc: "Fähigkeiten, Wissen und Interessen mit echtem Marktwert und kommerziellem Potenzial.",
        questions: {
          p4_past_paid_services: {
            label: "Bisherige bezahlte Arbeit",
            hint: "Für welche konkreten Leistungen, Ergebnisse oder Lieferungen haben Menschen oder Unternehmen in der Vergangenheit bezahlt?",
            placeholder: "z.B. Unterrichten, Schreiben, Beraten, Gestalten, Programmieren, Coachen, Projektmanagement, Übersetzen...",
          },
          p4_market_paid_skills: {
            label: "Marktfähige Fähigkeiten",
            hint: "Für welche Ihrer Kenntnisse oder Fähigkeiten geben Unternehmen oder Einzelpersonen heute viel Geld aus?",
            placeholder: "z.B. Datenanalyse, Softwareentwicklung, kreatives Schreiben, Finanzplanung, Fremdsprachen, Therapie...",
          },
          p4_commercial_hobbies: {
            label: "Kommerzielles Hobby-Potential",
            hint: "Welches Ihrer Interessen oder Hobbys hat realistisches kommerzielles Potenzial oder skalierbare Marktnachfrage?",
            placeholder: "z.B. Fotografie, Kochen, Fitness-Coaching, Kunsthandwerk, Musikproduktion, Nachhilfegeben, Inhaltserstellen...",
          },
          p4_high_value_roi: {
            label: "Hochwertige Problemlösung",
            hint: "Welches wertvolle Problem können Sie für jemanden lösen, das ihm Zeit oder Geld spart oder seinen Umsatz steigert?",
            placeholder: "z.B. Ich kann Menschen wöchentlich Stunden sparen oder Fähigkeiten dreimal schneller beibringen...",
          },
          p4_premium_assets: {
            label: "Premium-Zertifizierungen & Produkte",
            hint: "Welche Zertifizierungen, Anmeldedaten oder greifbaren Produkte könnten Sie entwickeln, um Premiumpreise zu erzielen?",
            placeholder: "z.B. Eine Berufsausbildung, ein Online-Kurs, ein Fachbuch, ein einzigartiges Tool oder physisches Produkt...",
          },
          p4_growth_niches: {
            label: "Am besten geeignete Branchen",
            hint: "In welchen wachsenden Branchen oder Marktnischen könnten Ihre Fähigkeiten sofort relevant und gut vergütet sein?",
            placeholder: "z.B. KI- und Technologiebildung, Wellness und psychische Gesundheit, Nachhaltigkeitsberatung...",
          },
          p4_monetization_fit: {
            label: "Monetarisierungsmodell",
            hint: "Sind Sie am besten für Festanstellung, freiberufliche Beratung, physische/digitale Produkte oder den Aufbau eines Unternehmens geeignet?",
            placeholder: "z.B. Ich bevorzuge die Sicherheit einer Festanstellung mit kreativem Spielraum, oder Freelancing für Flexibilität...",
          },
        },
      },
      synthesis: {
        title: "Schnittpunkt & Ausrichtung",
        desc: "Die natürliche Überschneidung, wo Ihre Liebe, Fähigkeiten, Weltbeitrag und Einkommenspotenzial zusammenfließen.",
        questions: {
          overlap_synthesis: {
            label: "Die natürliche Überschneidung",
            hint: "Wo sehen Sie über alle vier Kategorien hinweg die natürlichste Überschneidung zwischen Ihrer Lieblingsfähigkeit, einem Marktbedarf und einem fairen Einkommen?",
            placeholder: "z.B. Ich liebe es zu unterrichten, bin ausgezeichnet im einfachen Erklären, es gibt wachsende Nachfrage für personalisiertes Lernen...",
          },
          pilot_30_days: {
            label: "30-Tage-Pilot-Idee",
            hint: "Was ist eine realistische Karriere-, Projekt- oder Unternehmensidee, die Sie in den nächsten 30 Tagen testen könnten und alle vier Säulen trifft?",
            placeholder: "z.B. 3 kostenlose Coachingsitzungen anbieten, wöchentlich einen Artikel schreiben, einen kleinen Online-Kurs prototypisieren...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FRENCH
  // ─────────────────────────────────────────────────────────────────────────────
  fr: {
    tabs: {
      passion: "1. Ce Que Vous Aimez",
      vocation: "2. Ce Pour Quoi Vous Êtes Doué",
      mission: "3. Ce Dont Le Monde A Besoin",
      profession: "4. Ce Pour Quoi Vous Pouvez Être Payé",
      synthesis: "5. Intersection",
      archetype: "Archétype & Valeurs",
    },
    ui: {
      badge: "Étape 0 • Découverte Humaine",
      title: "Diagnostic Ikigai de Découverte Personnelle",
      subtitle: "Découvrez qui vous êtes vraiment. Comprendre vos 4 dimensions révèle quelles opportunités professionnelles s'alignent avec votre nature unique — car c'est l'humain qui conduit le business.",
      fillDemo: "Charger Réponses Démo",
      synthesizeBtn: "Auto-Synthétiser les Piliers",
      synthesizing: "Synthèse en cours...",
      progress: "Questions Remplies",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Emploi Traditionnel (Salaire + Avantages)" },
        { id: "FREELANCE_CONSULTING", label: "Freelance / Conseil Indépendant" },
        { id: "DIGITAL_PRODUCTS", label: "Produits Numériques & Cours en Ligne" },
        { id: "PHYSICAL_PRODUCTS", label: "Produits Physiques / Artisanat / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Création d'Entreprise / Fondateur Startup" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilier 1 : Ce Que Vous Aimez",
        desc: "Activités, sujets et intérêts qui vous apportent une joie intrinsèque et font passer le temps à toute vitesse.",
        questions: {
          p1_time_loss: {
            label: "Activités d'Immersion",
            hint: "Quelles activités vous font perdre toute notion du temps ?",
            placeholder: "ex. Écrire des histoires, fabriquer des objets, résoudre des puzzles, enseigner, faire de la musique...",
          },
          p1_spare_time_reading: {
            label: "Curiosités du Temps Libre",
            hint: "Quels sujets, domaines ou loisirs recherchez-vous ou lisez-vous naturellement pendant votre temps libre ?",
            placeholder: "ex. Psychologie, philosophie, histoire, design, technologie, cuisine, nature, art...",
          },
          p1_average_tuesday: {
            label: "Votre Mardi Idéal",
            hint: "Si l'argent et le statut social étaient totalement sans importance, comment choisiriez-vous de passer un mardi ordinaire ?",
            placeholder: "ex. Promenade matinale dans la nature, heures de lecture profonde, projets créatifs, conversations significatives...",
          },
          p1_energizing_tasks: {
            label: "Activités Énergisantes",
            hint: "Quelles activités vous laissent plein d'énergie plutôt qu'épuisé, même après des heures d'effort ?",
            placeholder: "ex. Aider quelqu'un à résoudre un problème, organiser des informations, créer quelque chose d'original...",
          },
          p1_childhood_passions: {
            label: "Passions d'Enfance",
            hint: "Quels étaient vos jeux, fascinations ou intérêts préférés dans l'enfance, avant que les attentes extérieures n'interviennent ?",
            placeholder: "ex. Dessiner, construire avec des LEGO, écrire des histoires, explorer la nature, jouer la comédie...",
          },
          p1_spark_debates: {
            label: "Curiosité & Enthousiasme",
            hint: "Quels types de conversations ou de débats éveillent véritablement votre curiosité et votre enthousiasme ?",
            placeholder: "ex. Éthique de la technologie, réforme de l'éducation, solutions environnementales, potentiel humain...",
          },
          p1_creative_outlets: {
            label: "Joie Personnelle",
            hint: "Quelles activités créatives ou expressives vous procurent la joie personnelle la plus profonde ?",
            placeholder: "ex. Écriture, peinture, musique, photographie, artisanat, design, cuisine, jardinage, danse...",
          },
        },
      },
      vocation: {
        title: "Pilier 2 : Ce Pour Quoi Vous Êtes Doué",
        desc: "Vos forces naturelles, compétences maîtrisées et manières uniques de résoudre les problèmes.",
        questions: {
          p2_effortless_skills: {
            label: "Compétences Naturelles",
            hint: "Quelles tâches ou compétences vous semblent naturelles et intuitives, mais paraissent difficiles aux autres ?",
            placeholder: "ex. Écouter profondément, expliquer des idées complexes simplement, repérer des schémas, organiser l'information...",
          },
          p2_sought_advice: {
            label: "Domaine Conseiller",
            hint: "Pour quels conseils, quelle aide ou quelle orientation vos amis, famille ou collègues se tournent-ils régulièrement vers vous ?",
            placeholder: "ex. Décisions de carrière, conseils relationnels, problèmes techniques, idées créatives, apprentissage...",
          },
          p2_hard_skills: {
            label: "Compétences Maîtrisées",
            hint: "Quelles compétences pratiques ou techniques avez-vous maîtrisées grâce à une pratique ou une étude dédiée ?",
            placeholder: "ex. Programmation, écriture, design, mathématiques, langues étrangères, analyse de données, recherche...",
          },
          p2_interpersonal_soft: {
            label: "Forces Interpersonnelles",
            hint: "Quelles compétences interpersonnelles ou relationnelles (ex. empathie, négociation, organisation, prise de parole) représentent votre plus grande force ?",
            placeholder: "ex. Empathie et écoute active, prise de parole en public, négociation gagnant-gagnant, fédérer les équipes...",
          },
          p2_success_patterns: {
            label: "Schémas de Succès",
            hint: "Quels schémas de succès ou réalisations récurrentes ont marqué votre parcours académique ou professionnel ?",
            placeholder: "ex. J'aide constamment les autres à atteindre leurs objectifs, je crée de la clarté dans la complexité...",
          },
          p2_problem_solving: {
            label: "Approche Résolutive",
            hint: "Face à un problème complexe, quelle est votre approche caractéristique pour le décomposer et trouver une solution ?",
            placeholder: "ex. J'écoute toutes les perspectives d'abord, puis je décompose le problème et teste des solutions pas à pas...",
          },
          p2_recurring_praise: {
            label: "Éloges Récurrents",
            hint: "Quels retours positifs ou éloges constructifs recevez-vous régulièrement de vos supérieurs, collègues ou mentors ?",
            placeholder: "ex. 'Tu rends toujours les choses plus claires', 'Je peux compter sur toi', 'Tu vois ce que les autres ratent'...",
          },
        },
      },
      mission: {
        title: "Pilier 3 : Ce Dont Le Monde A Besoin",
        desc: "Les problèmes sociaux, communautés et valeurs que vous ressentez le vrai besoin de défendre.",
        questions: {
          p3_systemic_injustice: {
            label: "Frustrations Sociétales",
            hint: "Quels problèmes systémiques, injustices ou inefficacités dans la société vous frustrent le plus et vous donnent envie d'intervenir ?",
            placeholder: "ex. Inégalités éducatives, stigmatisation de la santé mentale, destruction de l'environnement, solitude...",
          },
          p3_community_to_help: {
            label: "Personnes à Aider",
            hint: "Quel groupe de personnes, communauté ou cause ressentez-vous un désir authentique d'aider ou de protéger ?",
            placeholder: "ex. Jeunes sans mentors, personnes âgées isolées par la technologie, communautés sans accès aux ressources...",
          },
          p3_unlimited_resource: {
            label: "Un Problème à Résoudre",
            hint: "Si vous aviez une influence illimitée pour résoudre un seul problème mondial ou local, lequel serait-ce ?",
            placeholder: "ex. Accès universel à l'éducation, systèmes de soutien en santé mentale, environnement propre pour les générations futures...",
          },
          p3_immediate_needs: {
            label: "Besoins de l'Environnement Immédiat",
            hint: "De quels changements ou améliorations pratiques les personnes de votre entourage immédiat ont-elles constamment besoin ?",
            placeholder: "ex. Les personnes autour de moi ont besoin de connexions plus significatives, de meilleurs outils d'apprentissage...",
          },
          p3_non_negotiables: {
            label: "Valeurs Non Négociables",
            hint: "Quelles valeurs (ex. justice, clarté, connaissance, durabilité, beauté) vous semblent non négociables à défendre ?",
            placeholder: "ex. Honnêteté, équité, respect de tous, apprentissage continu, responsabilité environnementale, dignité humaine...",
          },
          p3_future_gap: {
            label: "Lacune Critique 10–20 Ans",
            hint: "En regardant à 10-20 ans, quel écart critique dans la société ou votre secteur pensez-vous nécessiter une réponse urgente ?",
            placeholder: "ex. La connexion humaine et la résilience émotionnelle seront critiques à mesure que l'automatisation transforme le travail...",
          },
          p3_legacy_impact: {
            label: "Héritage & Impact",
            hint: "Quel héritage ou impact positif concret seriez-vous le plus fier de laisser aux autres ?",
            placeholder: "ex. Avoir aidé des gens à découvrir leur potentiel, avoir rendu la connaissance plus accessible, avoir renforcé des communautés...",
          },
        },
      },
      profession: {
        title: "Pilier 4 : Ce Pour Quoi Vous Pouvez Être Payé",
        desc: "Compétences, connaissances et intérêts ayant une valeur marchande et un potentiel commercial réel.",
        questions: {
          p4_past_paid_services: {
            label: "Travail Rémunéré Passé",
            hint: "Pour quels services, livrables ou résultats concrets des personnes ou des entreprises vous ont-elles payé par le passé ?",
            placeholder: "ex. Enseignement, écriture, conseil, design, programmation, coaching, gestion de projets, traduction...",
          },
          p4_market_paid_skills: {
            label: "Compétences Monnayables",
            hint: "Quelles compétences ou connaissances possédez-vous pour lesquelles des entreprises ou des particuliers dépensent actuellement beaucoup ?",
            placeholder: "ex. Analyse de données, développement logiciel, écriture créative, planification financière, langues, thérapie...",
          },
          p4_commercial_hobbies: {
            label: "Potentiel Commercial des Hobbys",
            hint: "Lequel de vos intérêts ou loisirs personnels a un potentiel commercial réaliste ou une demande de marché évolutive ?",
            placeholder: "ex. Photographie, cuisine, coaching sportif, artisanat, production musicale, tutorat, création de contenu...",
          },
          p4_high_value_roi: {
            label: "Résolution de Problèmes de Valeur",
            hint: "Quel problème de grande valeur pouvez-vous résoudre pour quelqu'un qui lui économise du temps, de l'argent ou augmente ses revenus ?",
            placeholder: "ex. J'aide les gens à gagner des heures chaque semaine, ou à apprendre des compétences 3x plus vite...",
          },
          p4_premium_assets: {
            label: "Certifications & Produits Premium",
            hint: "Quelles certifications, accréditations ou produits tangibles pourriez-vous développer pour atteindre un tarif premium ?",
            placeholder: "ex. Une certification professionnelle, un cours en ligne, un livre spécialisé, un outil ou produit physique unique...",
          },
          p4_growth_niches: {
            label: "Industries Adaptées",
            hint: "Dans quels secteurs en pleine croissance ou niches de marché vos compétences combinées seraient-elles immédiatement pertinentes et bien rémunérées ?",
            placeholder: "ex. Éducation à l'IA, bien-être et santé mentale, conseil en durabilité, optimisation du télétravail...",
          },
          p4_monetization_fit: {
            label: "Modèle de Monétisation",
            hint: "Êtes-vous mieux adapté à la monétisation via l'emploi, la consultance freelance, la création de produits ou la création d'entreprise ?",
            placeholder: "ex. Je préfère la stabilité d'un emploi avec liberté créative, ou le freelance pour la flexibilité et la variété...",
          },
        },
      },
      synthesis: {
        title: "Intersection & Alignement",
        desc: "Le chevauchement naturel où vos passions, compétences, impact social et potentiel de revenus convergent.",
        questions: {
          overlap_synthesis: {
            label: "Le Chevauchement Naturel",
            hint: "En regardant les quatre catégories, où voyez-vous le chevauchement le plus naturel entre votre compétence favorite, un besoin du marché et un revenu équitable ?",
            placeholder: "ex. J'aime enseigner, je suis excellent à expliquer des choses complexes simplement, il y a une demande croissante pour l'éducation personnalisée...",
          },
          pilot_30_days: {
            label: "Idée Pilote 30 Jours",
            hint: "Quelle est une idée de carrière, de projet ou d'entreprise réaliste que vous pourriez tester dans les 30 prochains jours et qui touche les quatre piliers simultanément ?",
            placeholder: "ex. Proposer 3 sessions de coaching gratuites, écrire un article par semaine, lancer un petit cours en ligne...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ITALIAN
  // ─────────────────────────────────────────────────────────────────────────────
  it: {
    tabs: {
      passion: "1. Cosa Ami",
      vocation: "2. In Cosa Sei Bravo",
      mission: "3. Di Cosa Ha Bisogno il Mondo",
      profession: "4. Per Cosa Puoi Essere Pagato",
      synthesis: "5. Intersezione",
      archetype: "Archetipo & Valori",
    },
    ui: {
      badge: "Passo 0 • Scoperta Umana",
      title: "Diagnosi Ikigai di Scoperta Personale",
      subtitle: "Scopri chi sei veramente. Comprendere le tue 4 dimensioni rivela quali opportunità di business si allineano con la tua natura unica — perché è l'essere umano a guidare il business.",
      fillDemo: "Carica Risposte Demo",
      synthesizeBtn: "Auto-Sintetizza i Pilastri",
      synthesizing: "Elaborazione...",
      progress: "Domande Completate",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Impiego Tradizionale (Stipendio + Benefici)" },
        { id: "FREELANCE_CONSULTING", label: "Freelance / Consulenza Indipendente" },
        { id: "DIGITAL_PRODUCTS", label: "Prodotti Digitali & Corsi Online" },
        { id: "PHYSICAL_PRODUCTS", label: "Prodotti Fisici / Artigianato / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Costruzione Impresa / Fondatore Startup" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilastro 1: Cosa Ami",
        desc: "Attività, argomenti e interessi che ti portano gioia intrinseca e fanno volare il tempo — indipendentemente da denaro o status.",
        questions: {
          p1_time_loss: {
            label: "Attività di Immersione",
            hint: "Quali attività ti fanno perdere completamente la cognizione del tempo?",
            placeholder: "es. Scrivere storie, costruire cose a mano, risolvere enigmi, insegnare, suonare musica...",
          },
          p1_spare_time_reading: {
            label: "Curiosità del Tempo Libero",
            hint: "Quali argomenti, materie o hobby ti ritrovi naturalmente a ricercare o leggere nel tempo libero?",
            placeholder: "es. Psicologia, filosofia, storia, design, tecnologia, cucina, natura, arte, astronomia...",
          },
          p1_average_tuesday: {
            label: "Il Tuo Martedì Ideale",
            hint: "Se il denaro e lo status sociale fossero del tutto irrilevanti, come sceglieresti di trascorrere un martedì qualunque?",
            placeholder: "es. Passeggiata mattutina in natura, ore di lettura approfondita, progetti creativi, conversazioni significative...",
          },
          p1_energizing_tasks: {
            label: "Attività Energizzanti",
            hint: "Quali attività ti lasciano pieno di energia invece di esaurirti, anche dopo ore di impegno?",
            placeholder: "es. Aiutare qualcuno a risolvere un problema, organizzare informazioni, creare qualcosa di originale...",
          },
          p1_childhood_passions: {
            label: "Passioni Infantili",
            hint: "Quali erano i tuoi giochi, le tue passioni o i tuoi interessi preferiti dell'infanzia, prima che le aspettative esterne si imponessero?",
            placeholder: "es. Disegnare, costruire con i LEGO, scrivere storie, esplorare la natura, recitare, inventare giochi...",
          },
          p1_spark_debates: {
            label: "Curiosità & Entusiasmo",
            hint: "Che tipo di conversazioni o dibattiti suscitano genuinamente la tua curiosità ed entusiasmo?",
            placeholder: "es. Etica della tecnologia, riforma educativa, soluzioni ambientali, potenziale umano, filosofia della vita...",
          },
          p1_creative_outlets: {
            label: "Gioia Personale",
            hint: "Attraverso quali attività creative o espressive provi la gioia personale più profonda?",
            placeholder: "es. Scrittura, pittura, musica, fotografia, artigianato, design, cucina, giardinaggio, danza...",
          },
        },
      },
      vocation: {
        title: "Pilastro 2: In Cosa Sei Bravo",
        desc: "I tuoi punti di forza naturali, le competenze acquisite e i modi unici in cui risolvi i problemi.",
        questions: {
          p2_effortless_skills: {
            label: "Abilità Naturali",
            hint: "Quali compiti o abilità ti sembrano semplici e intuitivi, ma appaiono difficili agli altri?",
            placeholder: "es. Ascoltare in profondità, spiegare idee complesse in modo semplice, riconoscere schemi, organizzare informazioni...",
          },
          p2_sought_advice: {
            label: "Consigli che dai",
            hint: "Per quale tipo di consiglio, aiuto o guida amici, familiari o colleghi si rivolgono costantemente a te?",
            placeholder: "es. Decisioni di carriera, consigli relazionali, problemi tecnici, idee creative, come imparare qualcosa...",
          },
          p2_hard_skills: {
            label: "Competenze Tecniche Acquisite",
            hint: "Quali competenze tecniche o pratiche hai padroneggiato grazie a studio o pratica dedicata?",
            placeholder: "es. Programmazione, scrittura, design, matematica, lingue straniere, analisi dati, ricerca...",
          },
          p2_interpersonal_soft: {
            label: "Forze Interpersonali",
            hint: "Quali abilità interpersonali o soft skill (es. empatia, negoziazione, organizzazione, parlare in pubblico) rappresentano il tuo punto di forza?",
            placeholder: "es. Empatia e ascolto attivo, parlare in pubblico, negoziazione win-win, unire i team...",
          },
          p2_success_patterns: {
            label: "Schemi di Successo",
            hint: "Quali schemi di successo o risultati ricorrenti hanno caratterizzato il tuo percorso accademico o professionale finora?",
            placeholder: "es. Aiuto costantemente gli altri a raggiungere i loro obiettivi, creo chiarezza dalla complessità...",
          },
          p2_problem_solving: {
            label: "Approccio ai Problemi",
            hint: "Di fronte a un problema complesso, quale è il tuo approccio caratteristico per analizzarlo e trovare una soluzione?",
            placeholder: "es. Ascolto tutte le prospettive prima, poi scompongo il problema e testo le soluzioni passo dopo passo...",
          },
          p2_recurring_praise: {
            label: "Lodi Ricorrenti",
            hint: "Quali feedback positivi o elogi costruttivi ricevi ripetutamente da manager, colleghi o mentor?",
            placeholder: "es. 'Rendi sempre le cose più chiare', 'Posso sempre contare su di te', 'Vedi quello che gli altri perdono'...",
          },
        },
      },
      mission: {
        title: "Pilastro 3: Di Cosa Ha Bisogno il Mondo",
        desc: "I problemi sociali, le comunità e i valori che senti genuinamente di voler sostenere.",
        questions: {
          p3_systemic_injustice: {
            label: "Frustrazioni Sociali",
            hint: "Quali problemi sistemici, ingiustizie o inefficienze nella società ti frustrano di più e ti spingono a voler intervenire?",
            placeholder: "es. Disuguaglianza nell'istruzione, stigma della salute mentale, distruzione ambientale, solitudine...",
          },
          p3_community_to_help: {
            label: "Persone che vuoi aiutare",
            hint: "Quale gruppo specifico di persone, comunità o causa senti l'autentico desiderio di aiutare o proteggere?",
            placeholder: "es. Giovani senza mentori, anziani isolati dalla tecnologia, comunità senza accesso alle risorse...",
          },
          p3_unlimited_resource: {
            label: "Un Problema da Risolvere",
            hint: "Se avessi un'influenza illimitata per risolvere un solo problema globale o locale, quale sarebbe?",
            placeholder: "es. Accesso universale all'istruzione di qualità, sistemi di supporto per la salute mentale, ambiente pulito...",
          },
          p3_immediate_needs: {
            label: "Bisogni dell'Ambiente Immediato",
            hint: "Di quali cambiamenti o miglioramenti pratici hanno costantemente bisogno le persone del tuo ambiente immediato?",
            placeholder: "es. Le persone intorno a me hanno bisogno di connessioni più significative, migliori strumenti di apprendimento...",
          },
          p3_non_negotiables: {
            label: "Valori Non Negoziabili",
            hint: "Quali valori (es. giustizia, chiarezza, conoscenza, sostenibilità, bellezza) ti sembrano non negoziabili da difendere?",
            placeholder: "es. Onestà, equità, rispetto per tutti, apprendimento continuo, responsabilità ambientale, dignità umana...",
          },
          p3_future_gap: {
            label: "Lacuna Critica 10–20 Anni",
            hint: "Guardando ai prossimi 10-20 anni, quale lacuna critica nella società o nel tuo settore pensi necessiti di una risposta urgente?",
            placeholder: "es. La connessione umana e la resilienza emotiva saranno critiche man mano che l'automazione trasforma il lavoro...",
          },
          p3_legacy_impact: {
            label: "Eredità & Impatto",
            hint: "Quale eredità o impatto positivo concreto saresti più orgoglioso di lasciare agli altri?",
            placeholder: "es. Aver aiutato le persone a scoprire il loro potenziale, aver reso la conoscenza più accessibile, comunità più forti...",
          },
        },
      },
      profession: {
        title: "Pilastro 4: Per Cosa Puoi Essere Pagato",
        desc: "Competenze, conoscenze e interessi con valore di mercato e potenziale commerciale reale.",
        questions: {
          p4_past_paid_services: {
            label: "Lavoro Remunerato Passato",
            hint: "Per quali servizi, deliverable o risultati concreti ti hanno pagato persone o aziende in passato?",
            placeholder: "es. Insegnamento, scrittura, consulenza, design, programmazione, coaching, gestione progetti, traduzione...",
          },
          p4_market_paid_skills: {
            label: "Competenze Commerciabili",
            hint: "Quali competenze o conoscenze possiedi per cui aziende o privati spendono attualmente somme significative?",
            placeholder: "es. Analisi dati, sviluppo software, scrittura creativa, pianificazione finanziaria, lingue straniere, terapia...",
          },
          p4_commercial_hobbies: {
            label: "Potenziale Commerciale degli Hobby",
            hint: "Quale dei tuoi interessi o hobby personali ha un realistico potenziale commerciale o una domanda di mercato scalabile?",
            placeholder: "es. Fotografia, cucina, fitness coaching, artigianato, produzione musicale, tutoraggio, creazione di contenuti...",
          },
          p4_high_value_roi: {
            label: "Risoluzione di Problemi ad Alto Valore",
            hint: "Quale problema di grande valore puoi risolvere per qualcuno, facendogli risparmiare tempo, denaro o aumentando i suoi ricavi?",
            placeholder: "es. Posso aiutare le persone a risparmiare ore ogni settimana o ad imparare competenze 3x più velocemente...",
          },
          p4_premium_assets: {
            label: "Certificazioni & Prodotti Premium",
            hint: "Quali certificazioni, credenziali o prodotti tangibili potresti sviluppare per richiedere tariffe premium?",
            placeholder: "es. Una certificazione professionale, un corso online, un libro specializzato, uno strumento o prodotto fisico unico...",
          },
          p4_growth_niches: {
            label: "Settori più Adatti",
            hint: "In quali settori in crescita o nicchie di mercato le tue competenze combinate sarebbero immediatamente rilevanti e ben remunerate?",
            placeholder: "es. Educazione all'IA, benessere e salute mentale, consulenza sulla sostenibilità, ottimizzazione del lavoro da remoto...",
          },
          p4_monetization_fit: {
            label: "Modello di Monetizzazione",
            hint: "Sei meglio adatto a monetizzare tramite impiego, consulenza freelance, creazione di prodotti fisici/digitali o costruzione di un'impresa?",
            placeholder: "es. Preferisco la stabilità dell'impiego con libertà creativa, o il freelance per la flessibilità e la varietà...",
          },
        },
      },
      synthesis: {
        title: "Intersezione & Allineamento",
        desc: "La sovrapposizione naturale dove il tuo amore, le tue competenze, il tuo impatto e il tuo potenziale di reddito convergono.",
        questions: {
          overlap_synthesis: {
            label: "La Sovrapposizione Naturale",
            hint: "Guardando a tutte e quattro le categorie, dove vedi la sovrapposizione più naturale tra la tua competenza preferita, un bisogno del mercato e un reddito equo?",
            placeholder: "es. Amo insegnare, sono eccellente nello spiegare le cose complesse in modo semplice, c'è crescente domanda di istruzione personalizzata...",
          },
          pilot_30_days: {
            label: "Idea Pilota 30 Giorni",
            hint: "Qual è un'idea di carriera, progetto o impresa realistica che potresti avviare nei prossimi 30 giorni e che tocca tutti e quattro i pilastri simultaneamente?",
            placeholder: "es. Offrire 3 sessioni di coaching gratuite, scrivere un articolo a settimana, lanciare un piccolo corso online...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POLISH
  // ─────────────────────────────────────────────────────────────────────────────
  pl: {
    tabs: {
      passion: "1. Co Kochasz",
      vocation: "2. W Czym Jesteś Dobry",
      mission: "3. Czego Potrzebuje Świat",
      profession: "4. Za Co Możesz Być Wynagradzany",
      synthesis: "5. Przecięcie",
      archetype: "Archetyp i Wartości",
    },
    ui: {
      badge: "Krok 0 • Ludzkie Odkrycie",
      title: "Diagnoza Ikigai Odkrycia Osobistego",
      subtitle: "Odkryj, kim naprawdę jesteś. Zrozumienie siebie w 4 wymiarach ujawnia, które możliwości biznesowe pasują do Twojej unikalnej natury — bo to człowiek napędza biznes.",
      fillDemo: "Wczytaj Wzorcowe Odpowiedzi",
      synthesizeBtn: "Autosynteza Filarów",
      synthesizing: "Przetwarzanie...",
      progress: "Ukończone Pytania",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Tradycyjne Zatrudnienie (Wynagrodzenie + Świadczenia)" },
        { id: "FREELANCE_CONSULTING", label: "Freelancing / Niezależne Doradztwo" },
        { id: "DIGITAL_PRODUCTS", label: "Produkty Cyfrowe & Kursy Online" },
        { id: "PHYSICAL_PRODUCTS", label: "Produkty Fizyczne / Rękodzieło / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Budowanie Firmy / Założyciel Startupu" },
      ],
    },
    pillars: {
      passion: {
        title: "Filar 1: Co Kochasz",
        desc: "Aktywności, tematy i zainteresowania, które przynoszą Ci wewnętrzną radość i sprawiają, że czas leci — niezależnie od pieniędzy czy statusu.",
        questions: {
          p1_time_loss: {
            label: "Aktywności Pochłaniające",
            hint: "Które aktywności sprawiają, że całkowicie tracisz poczucie czasu?",
            placeholder: "np. Pisanie historii, tworzenie rzeczy ręcznie, rozwiązywanie zagadek, nauczanie, granie muzyki...",
          },
          p1_spare_time_reading: {
            label: "Naturalne Zainteresowania",
            hint: "Jakie tematy, dziedziny lub hobby naturalnie przyciągają Cię do czytania i badania w wolnym czasie?",
            placeholder: "np. Psychologia, filozofia, historia, design, technologia, gotowanie, natura, sztuka, astronomia...",
          },
          p1_average_tuesday: {
            label: "Twój Idealny Wtorek",
            hint: "Gdyby pieniądze i status społeczny były całkowicie nieistotne, jak spędziłbyś zwykły wtorek?",
            placeholder: "np. Poranny spacer w naturze, godziny głębokiej lektury, projekty kreatywne, znaczące rozmowy...",
          },
          p1_energizing_tasks: {
            label: "Aktywności Energetyzujące",
            hint: "Które aktywności pozostawiają Cię pełnym energii zamiast wyczerpania, nawet po godzinach wysiłku?",
            placeholder: "np. Pomoc komuś w rozwiązaniu problemu, organizowanie informacji, tworzenie czegoś oryginalnego...",
          },
          p1_childhood_passions: {
            label: "Dziecięce Pasje",
            hint: "Jakie były Twoje ulubione dziecięce gry, fascynacje lub zainteresowania, zanim zewnętrzne oczekiwania zaczęły odgrywać rolę?",
            placeholder: "np. Rysowanie, budowanie z LEGO, pisanie historii, eksplorowanie natury, granie w sztukach teatralnych...",
          },
          p1_spark_debates: {
            label: "Ciekawość & Entuzjazm",
            hint: "Jakie rodzaje rozmów lub debat naprawdę budzą Twoją ciekawość i entuzjazm?",
            placeholder: "np. Etyka technologii, reforma edukacji, rozwiązania środowiskowe, ludzki potencjał, filozofia życia...",
          },
          p1_creative_outlets: {
            label: "Osobista Radość",
            hint: "Poprzez jakie kreatywne lub ekspresywne aktywności odczuwasz najgłębszą osobistą radość?",
            placeholder: "np. Pisanie, malowanie, muzyka, fotografia, rękodzieło, projektowanie, gotowanie, ogrodnictwo, taniec...",
          },
        },
      },
      vocation: {
        title: "Filar 2: W Czym Jesteś Dobry",
        desc: "Twoje naturalne mocne strony, opanowane umiejętności i unikalne sposoby rozwiązywania problemów.",
        questions: {
          p2_effortless_skills: {
            label: "Naturalne Umiejętności",
            hint: "Które zadania lub umiejętności są dla Ciebie naturalne i intuicyjne, ale wydają się trudne innym?",
            placeholder: "np. Głębokie słuchanie, wyjaśnianie złożonych idei prosto, rozpoznawanie wzorców, organizowanie informacji...",
          },
          p2_sought_advice: {
            label: "Twój Zakres Doradczy",
            hint: "Po jakie konkretne porady, pomoc lub wskazówki znajomi, rodzina lub współpracownicy regularnie się do Ciebie zwracają?",
            placeholder: "np. Decyzje zawodowe, porady relacyjne, problemy techniczne, pomysły kreatywne, jak się czegoś nauczyć...",
          },
          p2_hard_skills: {
            label: "Opanowane Umiejętności Twarde",
            hint: "Jakie twarde lub techniczne umiejętności opanowałeś dzięki poświęconemu ćwiczeniu lub nauce?",
            placeholder: "np. Programowanie, pisanie, design, matematyka, języki obce, analiza danych, metody badawcze...",
          },
          p2_interpersonal_soft: {
            label: "Interpersonalne Mocne Strony",
            hint: "Jakie umiejętności interpersonalne lub miękkie (np. empatia, negocjacje, organizacja, wystąpienia publiczne) są Twoją największą siłą?",
            placeholder: "np. Empatia i aktywne słuchanie, wystąpienia publiczne, negocjacje win-win, jednoczenie ludzi...",
          },
          p2_success_patterns: {
            label: "Wzorce Sukcesu",
            hint: "Jakie wzorce sukcesu lub powtarzające się osiągnięcia definiują dotychczasową Twoją drogę edukacyjną lub zawodową?",
            placeholder: "np. Konsekwentnie pomagam innym osiągać cele, tworzę ład z chaosu, łączę właściwych ludzi...",
          },
          p2_problem_solving: {
            label: "Podejście do Problemów",
            hint: "W obliczu złożonego problemu, jakie jest Twoje charakterystyczne podejście do jego rozkładu i znalezienia rozwiązania?",
            placeholder: "np. Najpierw słucham wszystkich perspektyw, potem rozkładam problem na części i testuję rozwiązania...",
          },
          p2_recurring_praise: {
            label: "Powtarzające się Pochwały",
            hint: "Jakie pozytywne opinie lub konstruktywne pochwały regularnie otrzymujesz od menedżerów, rówieśników lub mentorów?",
            placeholder: "np. 'Zawsze wszystko wyjaśniasz', 'Zawsze mogę na ciebie liczyć', 'Widzisz to, czego inni nie zauważają'...",
          },
        },
      },
      mission: {
        title: "Filar 3: Czego Potrzebuje Świat",
        desc: "Problemy społeczne, społeczności i wartości, które czujesz autentyczne powołanie, by bronić.",
        questions: {
          p3_systemic_injustice: {
            label: "Frustracje Społeczne",
            hint: "Jakie systemowe problemy, niesprawiedliwości lub nieefektywności w społeczeństwie frustrują Cię najbardziej i skłaniają do interwencji?",
            placeholder: "np. Nierówności edukacyjne, stygmatyzacja zdrowia psychicznego, zniszczenie środowiska, samotność...",
          },
          p3_community_to_help: {
            label: "Ludzie których chcesz Pomóc",
            hint: "Której konkretnej grupie osób, społeczności lub sprawie odczuwasz autentyczne pragnienie pomocy lub ochrony?",
            placeholder: "np. Młodzi bez mentorów, starsi izolowani przez technologię, społeczności bez dostępu do zasobów...",
          },
          p3_unlimited_resource: {
            label: "Jeden Problem do Rozwiązania",
            hint: "Gdybyś miał nieograniczone możliwości rozwiązania jednego globalnego lub lokalnego problemu, jaki by to był?",
            placeholder: "np. Powszechny dostęp do edukacji, systemy wsparcia zdrowia psychicznego, czyste środowisko dla przyszłych pokoleń...",
          },
          p3_immediate_needs: {
            label: "Potrzeby Bezpośredniego Otoczenia",
            hint: "Jakich praktycznych zmian lub ulepszeń stale potrzebują osoby z Twojego bezpośredniego otoczenia?",
            placeholder: "np. Ludzie wokół mnie potrzebują bardziej znaczących relacji, lepszych narzędzi do nauki, lepszej komunikacji...",
          },
          p3_non_negotiables: {
            label: "Nienegocjowalne Wartości",
            hint: "Jakie wartości (np. sprawiedliwość, przejrzystość, wiedza, zrównoważoność, piękno) uważasz za nienegocjowalne do obrony?",
            placeholder: "np. Uczciwość, sprawiedliwość, szacunek dla wszystkich, ciągłe uczenie się, odpowiedzialność środowiskowa...",
          },
          p3_future_gap: {
            label: "Krytyczna Luka 10–20 Lat",
            hint: "Patrząc na 10-20 lat naprzód, jaką krytyczną lukę w społeczeństwie lub Twojej branży uważasz za pilną do rozwiązania?",
            placeholder: "np. Ludzka więź i odporność emocjonalna będą kluczowe, gdy automatyzacja przekształci pracę...",
          },
          p3_legacy_impact: {
            label: "Dziedzictwo & Wpływ",
            hint: "Jakie dziedzictwo lub konkretny pozytywny wpływ byłbyś najbardziej dumny pozostawić innym?",
            placeholder: "np. Że pomogłem ludziom odkryć ich potencjał, że uczyniłem wiedzę bardziej dostępną, że społeczności stały się silniejsze...",
          },
        },
      },
      profession: {
        title: "Filar 4: Za Co Możesz Być Wynagradzany",
        desc: "Umiejętności, wiedza i zainteresowania o prawdziwej wartości rynkowej i potencjale komercyjnym.",
        questions: {
          p4_past_paid_services: {
            label: "Dotychczasowa Praca Zarobkowa",
            hint: "Za jakie konkretne usługi, rezultaty lub wyniki płaciły Ci osoby lub firmy w przeszłości?",
            placeholder: "np. Nauczanie, pisanie, doradztwo, projektowanie, programowanie, coaching, zarządzanie projektami, tłumaczenie...",
          },
          p4_market_paid_skills: {
            label: "Umiejętności z Wartością Rynkową",
            hint: "Jakie umiejętności lub wiedzę posiadasz, za które firmy lub osoby prywatne płacą znaczne sumy?",
            placeholder: "np. Analityka danych, tworzenie oprogramowania, pisanie kreatywne, planowanie finansowe, języki obce, terapia...",
          },
          p4_commercial_hobbies: {
            label: "Komercyjny Potencjał Hobby",
            hint: "Które z Twoich osobistych zainteresowań lub hobby ma realistyczny potencjał komercyjny lub skalowalne zapotrzebowanie rynkowe?",
            placeholder: "np. Fotografia, gotowanie, coaching fitness, rękodzieło, produkcja muzyczna, korepetycje, tworzenie treści...",
          },
          p4_high_value_roi: {
            label: "Rozwiązywanie Wartościowych Problemów",
            hint: "Jaki wartościowy problem możesz rozwiązać dla kogoś, który bezpośrednio oszczędza mu czas, pieniądze lub zwiększa jego przychody?",
            placeholder: "np. Mogę pomagać ludziom oszczędzać godziny tygodniowo lub uczyć się umiejętności 3x szybciej...",
          },
          p4_premium_assets: {
            label: "Premium Certyfikaty & Produkty",
            hint: "Jakie certyfikaty, kwalifikacje lub produkty mógłbyś opracować, aby uzyskać premiumowe stawki?",
            placeholder: "np. Certyfikacja zawodowa, kurs online, specjalistyczna książka, wyjątkowe narzędzie lub produkt fizyczny...",
          },
          p4_growth_niches: {
            label: "Najlepiej Pasujące Branże",
            hint: "W jakich rozwijających się branżach lub niszach rynkowych Twoje połączone umiejętności byłyby natychmiast istotne i dobrze wynagradzane?",
            placeholder: "np. Edukacja z zakresu AI i technologii, wellness i zdrowie psychiczne, doradztwo w zakresie zrównoważoności...",
          },
          p4_monetization_fit: {
            label: "Model Monetyzacji",
            hint: "Czy najlepiej nadajesz się do monetyzacji poprzez zatrudnienie, freelancing, tworzenie produktów fizycznych/cyfrowych lub budowanie przedsiębiorstwa?",
            placeholder: "np. Wolę stabilność zatrudnienia z kreatywną swobodą, lub freelancing dla elastyczności i różnorodności...",
          },
        },
      },
      synthesis: {
        title: "Przecięcie & Dopasowanie",
        desc: "Naturalne nakładanie się Twojej miłości, umiejętności, wpływu na świat i potencjału dochodowego.",
        questions: {
          overlap_synthesis: {
            label: "Naturalne Nakładanie się",
            hint: "Patrząc na wszystkie cztery kategorie, gdzie widzisz najbardziej naturalne nakładanie się między Twoją ulubioną umiejętnością, potrzebą rynku i godziwym dochodem?",
            placeholder: "np. Kocham nauczać, jestem doskonały w prostym wyjaśnianiu złożonych rzeczy, rośnie zapotrzebowanie na spersonalizowaną edukację...",
          },
          pilot_30_days: {
            label: "Pomysł Pilotażowy 30 Dni",
            hint: "Jaka jest jedna realistyczna kariera, projekt lub pomysł na venture, który mógłbyś pilotować w ciągu następnych 30 dni i który spełnia wszystkie cztery filary jednocześnie?",
            placeholder: "np. Zaoferować 3 bezpłatne sesje coachingowe, pisać jeden artykuł tygodniowo, uruchomić mały kurs online...",
          },
        },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SPANISH
  // ─────────────────────────────────────────────────────────────────────────────
  es: {
    tabs: {
      passion: "1. Lo Que Amas",
      vocation: "2. En Lo Que Eres Bueno",
      mission: "3. Lo Que el Mundo Necesita",
      profession: "4. Por Lo Que Puedes Ser Pagado",
      synthesis: "5. Intersección",
      archetype: "Arquetipo y Valores",
    },
    ui: {
      badge: "Paso 0 • Descubrimiento Humano",
      title: "Diagnóstico Ikigai de Descubrimiento Personal",
      subtitle: "Descubre quién eres realmente. Comprender tus 4 dimensiones revela qué oportunidades de negocio se alinean con tu naturaleza única — porque el ser humano impulsa el negocio.",
      fillDemo: "Cargar Respuestas de Ejemplo",
      synthesizeBtn: "Auto-Sintetizar Pilares",
      synthesizing: "Sintetizando...",
      progress: "Preguntas Completadas",
      monetizationModels: [
        { id: "EMPLOYMENT", label: "Empleo Tradicional (Salario + Beneficios)" },
        { id: "FREELANCE_CONSULTING", label: "Freelance / Consultoría Independiente" },
        { id: "DIGITAL_PRODUCTS", label: "Productos Digitales & Cursos Online" },
        { id: "PHYSICAL_PRODUCTS", label: "Productos Físicos / Artesanía / Maker" },
        { id: "ENTERPRISE_FOUNDER", label: "Construcción de Empresa / Fundador Startup" },
      ],
    },
    pillars: {
      passion: {
        title: "Pilar 1: Lo Que Amas",
        desc: "Actividades, temas e intereses que te aportan alegría intrínseca y hacen que el tiempo vuele — independientemente del dinero o el estatus.",
        questions: {
          p1_time_loss: {
            label: "Actividades de Inmersión",
            hint: "¿Qué actividades te hacen perder completamente la noción del tiempo cuando las realizas?",
            placeholder: "ej. Escribir historias, crear cosas a mano, resolver puzzles, enseñar a otros, hacer música...",
          },
          p1_spare_time_reading: {
            label: "Curiosidades del Tiempo Libre",
            hint: "¿Qué temas, materias o aficiones te encuentras investigando o leyendo naturalmente en tu tiempo libre?",
            placeholder: "ej. Psicología, filosofía, historia, diseño, tecnología, cocina, naturaleza, arte, astronomía...",
          },
          p1_average_tuesday: {
            label: "Tu Martes Ideal",
            hint: "Si el dinero y el estatus social fueran completamente irrelevantes, ¿cómo elegirías pasar un martes cualquiera?",
            placeholder: "ej. Paseo matutino en la naturaleza, horas de lectura profunda, proyectos creativos, conversaciones significativas...",
          },
          p1_energizing_tasks: {
            label: "Actividades Energizantes",
            hint: "¿Qué actividades te dejan sintiéndote lleno de energía en lugar de agotado, incluso después de horas de esfuerzo?",
            placeholder: "ej. Ayudar a alguien a resolver un problema, organizar información, crear algo original, explorar nuevas ideas...",
          },
          p1_childhood_passions: {
            label: "Pasiones de la Infancia",
            hint: "¿Cuáles eran tus juegos, fascinations o intereses favoritos de la infancia, antes de que las expectativas externas tomaran el control?",
            placeholder: "ej. Dibujar, construir con LEGO, escribir historias, explorar la naturaleza, actuar en obras de teatro...",
          },
          p1_spark_debates: {
            label: "Curiosidad & Entusiasmo",
            hint: "¿Qué tipo de conversaciones o debates despiertan genuinamente tu curiosidad y entusiasmo?",
            placeholder: "ej. Ética de la tecnología, reforma educativa, soluciones medioambientales, potencial humano, filosofía de vida...",
          },
          p1_creative_outlets: {
            label: "Alegría Personal",
            hint: "¿Qué salidas creativas o expresivas te aportan el sentido más profundo de alegría personal?",
            placeholder: "ej. Escritura, pintura, música, fotografía, artesanía, diseño, cocina, jardinería, danza...",
          },
        },
      },
      vocation: {
        title: "Pilar 2: En Lo Que Eres Bueno",
        desc: "Tus fortalezas naturales, habilidades dominadas y formas únicas de abordar y resolver problemas.",
        questions: {
          p2_effortless_skills: {
            label: "Habilidades Naturales",
            hint: "¿Qué tareas o habilidades te resultan fáciles e intuitivas, pero parecen desafiantes para otros?",
            placeholder: "ej. Escuchar profundamente, explicar ideas complejas de forma simple, detectar patrones, organizar información...",
          },
          p2_sought_advice: {
            label: "Tu Área de Asesoramiento",
            hint: "¿Para qué consejos, ayuda u orientación específicos acuden regularmente a ti tus amigos, familia o colegas?",
            placeholder: "ej. Decisiones de carrera, consejos relacionales, problemas técnicos, ideas creativas, cómo aprender algo...",
          },
          p2_hard_skills: {
            label: "Habilidades Técnicas Dominadas",
            hint: "¿Qué habilidades técnicas o prácticas has dominado a través de la práctica o el estudio dedicado?",
            placeholder: "ej. Programación, escritura, diseño, matemáticas, idiomas extranjeros, análisis de datos, investigación...",
          },
          p2_interpersonal_soft: {
            label: "Fortalezas Interpersonales",
            hint: "¿Qué habilidades interpersonales o blandas (ej. empatía, negociación, organización, hablar en público) representan tu mayor fortaleza?",
            placeholder: "ej. Empatía y escucha activa, hablar en público, negociación win-win, unir equipos y comunidades...",
          },
          p2_success_patterns: {
            label: "Patrones de Éxito",
            hint: "¿Qué patrones de éxito o logros recurrentes han definido tu trayectoria académica o profesional hasta ahora?",
            placeholder: "ej. Consistentemente ayudo a otros a alcanzar sus metas, creo claridad de la complejidad, conecto a las personas correctas...",
          },
          p2_problem_solving: {
            label: "Enfoque para Resolver Problemas",
            hint: "Ante un problema complejo, ¿cuál es tu enfoque característico para desglosarlo y encontrar una solución?",
            placeholder: "ej. Primero escucho todas las perspectivas, luego desgloso el problema y pruebo soluciones paso a paso...",
          },
          p2_recurring_praise: {
            label: "Elogios Recurrentes",
            hint: "¿Qué retroalimentación positiva o elogios constructivos recibes repetidamente de directivos, compañeros o mentores?",
            placeholder: "ej. 'Siempre haces las cosas más claras', 'Puedo contar contigo', 'Ves lo que otros no ven'...",
          },
        },
      },
      mission: {
        title: "Pilar 3: Lo Que el Mundo Necesita",
        desc: "Los problemas sociales, comunidades y valores que sientes el auténtico llamado a defender.",
        questions: {
          p3_systemic_injustice: {
            label: "Frustraciones Sociales",
            hint: "¿Qué problemas sistémicos, injusticias o ineficiencias en la sociedad te frustran más y te hacen querer intervenir?",
            placeholder: "ej. Desigualdad educativa, estigma de la salud mental, destrucción medioambiental, soledad, falta de acceso al conocimiento...",
          },
          p3_community_to_help: {
            label: "Personas a Quienes Ayudar",
            hint: "¿A qué grupo específico de personas, comunidad o causa sientes un deseo auténtico de ayudar o proteger?",
            placeholder: "ej. Jóvenes sin mentores, ancianos aislados por la tecnología, comunidades sin acceso a recursos educativos...",
          },
          p3_unlimited_resource: {
            label: "Un Problema a Resolver",
            hint: "Si tuvieras influencia ilimitada para resolver un solo problema mundial o local, ¿cuál sería?",
            placeholder: "ej. Acceso universal a educación de calidad, sistemas de apoyo a la salud mental, medioambiente limpio...",
          },
          p3_immediate_needs: {
            label: "Necesidades del Entorno Inmediato",
            hint: "¿Qué cambios o mejoras prácticas necesitan constantemente las personas de tu entorno inmediato?",
            placeholder: "ej. Las personas a mi alrededor necesitan conexiones más significativas, mejores herramientas de aprendizaje...",
          },
          p3_non_negotiables: {
            label: "Valores No Negociables",
            hint: "¿Qué valores (ej. justicia, claridad, conocimiento, sostenibilidad, belleza) te parecen innegociables defender?",
            placeholder: "ej. Honestidad, equidad, respeto por todos, aprendizaje continuo, responsabilidad medioambiental, dignidad humana...",
          },
          p3_future_gap: {
            label: "Brecha Crítica 10–20 Años",
            hint: "Mirando 10 a 20 años hacia el futuro, ¿qué brecha crítica en la sociedad o tu industria crees que necesita atención urgente?",
            placeholder: "ej. La conexión humana y la resiliencia emocional serán críticas a medida que la automatización transforme el trabajo...",
          },
          p3_legacy_impact: {
            label: "Legado & Impacto",
            hint: "¿Qué legado o impacto positivo concreto te sentirías más orgulloso de dejar a los demás?",
            placeholder: "ej. Haber ayudado a las personas a descubrir su potencial, haber hecho el conocimiento más accesible, comunidades más fuertes...",
          },
        },
      },
      profession: {
        title: "Pilar 4: Por Lo Que Puedes Ser Pagado",
        desc: "Habilidades, conocimientos e intereses con valor de mercado real y potencial comercial.",
        questions: {
          p4_past_paid_services: {
            label: "Trabajo Remunerado Pasado",
            hint: "¿Por qué servicios, entregables o resultados concretos te han pagado personas o empresas en el pasado?",
            placeholder: "ej. Enseñanza, escritura, consultoría, diseño, programación, coaching, gestión de proyectos, traducción...",
          },
          p4_market_paid_skills: {
            label: "Habilidades Monetizables",
            hint: "¿Qué habilidades o conocimientos posees por los que empresas o particulares gastan actualmente sumas significativas?",
            placeholder: "ej. Análisis de datos, desarrollo de software, escritura creativa, planificación financiera, idiomas, terapia...",
          },
          p4_commercial_hobbies: {
            label: "Potencial Comercial de Aficiones",
            hint: "¿Cuál de tus intereses o aficiones personales tiene potencial comercial realista o demanda de mercado escalable?",
            placeholder: "ej. Fotografía, cocina, coaching de fitness, artesanía, producción musical, tutorías, creación de contenido...",
          },
          p4_high_value_roi: {
            label: "Resolución de Problemas de Alto Valor",
            hint: "¿Qué problema de alto valor puedes resolver para alguien que directamente le ahorre tiempo, dinero o aumente sus ingresos?",
            placeholder: "ej. Puedo ayudar a las personas a ahorrar horas cada semana o aprender habilidades 3x más rápido...",
          },
          p4_premium_assets: {
            label: "Certificaciones & Productos Premium",
            hint: "¿Qué certificaciones, credenciales o productos tangibles podrías desarrollar para exigir tarifas premium?",
            placeholder: "ej. Una certificación profesional, un curso online, un libro especializado, una herramienta o producto físico único...",
          },
          p4_growth_niches: {
            label: "Sectores más Adecuados",
            hint: "¿En qué industrias en crecimiento o nichos de mercado tus habilidades combinadas serían inmediatamente relevantes y bien remuneradas?",
            placeholder: "ej. Educación en IA y tecnología, bienestar y salud mental, consultoría de sostenibilidad, optimización del trabajo remoto...",
          },
          p4_monetization_fit: {
            label: "Modelo de Monetización",
            hint: "¿Estás mejor orientado a monetizar mediante empleo, consultoría freelance, creación de productos físicos/digitales o construyendo una empresa?",
            placeholder: "ej. Prefiero la estabilidad del empleo con libertad creativa, o el freelance por la flexibilidad y variedad que ofrece...",
          },
        },
      },
      synthesis: {
        title: "Intersección & Alineación",
        desc: "La superposición natural donde tu amor, habilidades, impacto mundial y potencial de ingresos convergen.",
        questions: {
          overlap_synthesis: {
            label: "La Superposición Natural",
            hint: "Mirando las cuatro categorías, ¿dónde ves la superposición más natural entre tu habilidad favorita, una necesidad del mercado y unos ingresos justos?",
            placeholder: "ej. Me encanta enseñar, soy excelente explicando cosas complejas de forma simple, hay demanda creciente de educación personalizada...",
          },
          pilot_30_days: {
            label: "Idea Piloto 30 Días",
            hint: "¿Cuál es una idea realista de carrera, proyecto o venture que podrías iniciar en los próximos 30 días y que cumpla los cuatro pilares simultáneamente?",
            placeholder: "ej. Ofrecer 3 sesiones de coaching gratuitas, escribir un artículo a la semana, lanzar un pequeño curso online sobre un tema que amo...",
          },
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
      badge: "Intersection",
      title: dict.pillars.synthesis.title,
      desc: dict.pillars.synthesis.desc,
      iconName: "Target",
      colorClass: "amber",
      questions: makeQuestions(dict.pillars.synthesis.questions),
    },
  ];
}
