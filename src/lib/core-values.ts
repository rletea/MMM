// Canonical Brand Core Values definition, cross-language mapping, and normalization utilities.

export type CoreValueKey =
  | "RADICAL_TRANSPARENCY"
  | "DESIGN_ELEGANCE"
  | "SPEED_AGILITY"
  | "ZERO_FLUFF"
  | "CUSTOMER_OBSESSION"
  | "DATA_RIGOR"
  | "CONTRARIAN_INNOVATION"
  | "UNCOMPROMISING_QUALITY"
  | "ETHICAL_STEWARDSHIP"
  | "COMMUNITY_EMPOWERMENT";

export const CORE_VALUE_KEYS: CoreValueKey[] = [
  "RADICAL_TRANSPARENCY",
  "DESIGN_ELEGANCE",
  "SPEED_AGILITY",
  "ZERO_FLUFF",
  "CUSTOMER_OBSESSION",
  "DATA_RIGOR",
  "CONTRARIAN_INNOVATION",
  "UNCOMPROMISING_QUALITY",
  "ETHICAL_STEWARDSHIP",
  "COMMUNITY_EMPOWERMENT",
];

export const CORE_VALUES_CONFIG: Record<CoreValueKey, Record<string, string>> = {
  RADICAL_TRANSPARENCY: {
    en: "Radical Transparency",
    ro: "Transparență Radicală",
    de: "Radikale Transparenz",
    fr: "Transparence Radicale",
    it: "Trasparenza Radicale",
    pl: "Radykalna Przejrzystość",
    es: "Transparencia Radical",
  },
  DESIGN_ELEGANCE: {
    en: "Design Elegance",
    ro: "Eleganță în Design",
    de: "Design-Eleganz",
    fr: "Élégance du Design",
    it: "Eleganza del Design",
    pl: "Elegancja Projektowa",
    es: "Elegancia de Diseño",
  },
  SPEED_AGILITY: {
    en: "Speed & Agility",
    ro: "Viteză & Agilitate",
    de: "Geschwindigkeit & Agilität",
    fr: "Rapidité & Agilité",
    it: "Velocità & Agilità",
    pl: "Szybkość i Zwinność",
    es: "Velocidad y Agilidad",
  },
  ZERO_FLUFF: {
    en: "Zero Fluff / High Signal",
    ro: "Fără Vorbărie / Semnal Puternic",
    de: "Kein Geschwätz / Starkes Signal",
    fr: "Zéro Superflu / Haute Valeur",
    it: "Zero Fronzoli / Alto Valore",
    pl: "Czysta Wartość / Zero Lania Wody",
    es: "Cero Relleno / Alto Valor",
  },
  CUSTOMER_OBSESSION: {
    en: "Customer Obsession",
    ro: "Obsesie pentru Client",
    de: "Kundenfokus",
    fr: "Obsession Client",
    it: "Ossessione per il Cliente",
    pl: "Orientacja na Klienta",
    es: "Obsesión por el Cliente",
  },
  DATA_RIGOR: {
    en: "Data-Driven Rigor",
    ro: "Rigoare Bazată pe Date",
    de: "Datenbasierte Präzision",
    fr: "Rigueur Basée sur les Données",
    it: "Rigore Basato sui Dati",
    pl: "Rygor Oparty na Danych",
    es: "Rigor Basado en Datos",
  },
  CONTRARIAN_INNOVATION: {
    en: "Contrarian Innovation",
    ro: "Inovație Contrariană",
    de: "Querdenker-Innovation",
    fr: "Innovation à Contre-Courant",
    it: "Innovazione Contrarian",
    pl: "Przełomowa Innowacja",
    es: "Innovación a Contracorriente",
  },
  UNCOMPROMISING_QUALITY: {
    en: "Uncompromising Quality",
    ro: "Calitate Fără Compromis",
    de: "Kompromisslose Qualität",
    fr: "Qualité Sans Compromis",
    it: "Qualità Senza Compromessi",
    pl: "Bezkompromisowa Jakość",
    es: "Calidad Sin Concesiones",
  },
  ETHICAL_STEWARDSHIP: {
    en: "Ethical Stewardship",
    ro: "Responsabilitate Etică",
    de: "Ethische Verantwortung",
    fr: "Responsabilité Éthique",
    it: "Responsabilità Etica",
    pl: "Etyczne Przywództwo",
    es: "Responsabilidad Ética",
  },
  COMMUNITY_EMPOWERMENT: {
    en: "Community Empowerment",
    ro: "Împuternicirea Comunității",
    de: "Community-Befähigung",
    fr: "Autonomisation de la Communauté",
    it: "Crescita della Community",
    pl: "Wzmacnianie Społeczności",
    es: "Empoderamiento Comunitario",
  },
};

// Aliases for older presets or freeform synonyms
const LEGACY_ALIASES: Record<string, CoreValueKey> = {
  craftsmanship: "DESIGN_ELEGANCE",
  măiestrie: "DESIGN_ELEGANCE",
  maiestrie: "DESIGN_ELEGANCE",
  meisterschaft: "DESIGN_ELEGANCE",
  mastery: "DESIGN_ELEGANCE",
  "asymmetric leverage": "SPEED_AGILITY",
  "asymmetrische effizienz": "SPEED_AGILITY",
  "eficiență asimetrică": "SPEED_AGILITY",
  "eficienta asimetrica": "SPEED_AGILITY",
  "unapologetic focus": "ZERO_FLUFF",
  "focalizare neclintită": "ZERO_FLUFF",
  "focalizare neclintita": "ZERO_FLUFF",
  integrity: "ETHICAL_STEWARDSHIP",
  innovation: "CONTRARIAN_INNOVATION",
};

function cleanStr(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, "a")
    .replace(/î/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/[éèê]/g, "e")
    .replace(/[áà]/g, "a")
    .replace(/[óò]/g, "o")
    .replace(/[ü]/g, "u")
    .replace(/[ä]/g, "a")
    .replace(/[ö]/g, "o")
    .replace(/[ł]/g, "l")
    .replace(/[ń]/g, "n")
    .replace(/[ś]/g, "s")
    .replace(/[źż]/g, "z")
    .replace(/[^\w\s&/-]/g, "")
    .trim();
}

/**
 * Normalizes any string (canonical ID, localized label in any language, or legacy preset alias)
 * into a canonical CoreValueKey. If unrecognized, returns the trimmed original string.
 */
export function normalizeCoreValueId(val: string): CoreValueKey | string {
  if (!val || typeof val !== "string") return val;
  const trimmed = val.trim();
  if (CORE_VALUE_KEYS.includes(trimmed as CoreValueKey)) {
    return trimmed as CoreValueKey;
  }

  const cleaned = cleanStr(trimmed);

  // Check alias table
  if (LEGACY_ALIASES[cleaned]) {
    return LEGACY_ALIASES[cleaned];
  }

  // Check all translations in CORE_VALUES_CONFIG
  for (const key of CORE_VALUE_KEYS) {
    const translations = CORE_VALUES_CONFIG[key];
    for (const localized of Object.values(translations)) {
      if (cleanStr(localized) === cleaned) {
        return key;
      }
    }
  }

  return trimmed;
}

/**
 * Normalizes a list of core values, cleaning up duplicates and resolving mixed-language
 * artifacts where both Romanian and English strings were concurrently stored.
 */
export function normalizeCoreValues(values: string[]): string[] {
  if (!Array.isArray(values) || values.length === 0) return [];

  // Check if there are Romanian-specific strings in the array
  // When user switched between English and Romanian in previous buggy versions,
  // Romanian explicit selections got mixed with English defaults.
  const hasRomanian = values.some((v) => {
    const cleaned = cleanStr(v);
    return Object.values(CORE_VALUES_CONFIG).some((cfg) => cleanStr(cfg.ro) === cleaned);
  });
  const hasEnglish = values.some((v) => {
    const cleaned = cleanStr(v);
    return Object.values(CORE_VALUES_CONFIG).some((cfg) => cleanStr(cfg.en) === cleaned);
  });

  // If mixed (both Romanian and English literal strings present in old store),
  // prioritize the Romanian ones as that represents the user's deliberate choices
  let source = values;
  if (hasRomanian && hasEnglish) {
    const roItems = values.filter((v) => {
      const cleaned = cleanStr(v);
      return Object.values(CORE_VALUES_CONFIG).some((cfg) => cleanStr(cfg.ro) === cleaned);
    });
    if (roItems.length >= 2) {
      source = roItems;
    }
  }

  const normalized = source
    .map((v) => normalizeCoreValueId(v))
    .filter(Boolean);

  return Array.from(new Set(normalized));
}

/**
 * Retrieves the localized display string for a given core value key or text.
 */
export function getLocalizedCoreValue(val: string, lang: string = "en"): string {
  if (!val) return "";
  const key = normalizeCoreValueId(val);
  if (CORE_VALUE_KEYS.includes(key as CoreValueKey)) {
    const config = CORE_VALUES_CONFIG[key as CoreValueKey];
    return config[lang] || config.en || key;
  }
  return val;
}
