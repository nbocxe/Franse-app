// Gedeelde datatypes: de lesstof (hoofdstukken, woorden, werkwoorden, zinnen) en wat de app bewaart.

export type Tijd = "present" | "passe-compose" | "imparfait";

export const TIJD_NAMEN: Record<Tijd, string> = {
  present: "Tegenwoordige tijd (présent)",
  "passe-compose": "Voltooid verleden (passé composé)",
  imparfait: "Onvoltooid verleden (imparfait)",
};

export const TIJD_KORT: Record<Tijd, string> = {
  present: "présent",
  "passe-compose": "passé composé",
  imparfait: "imparfait",
};

/** Soort woord. m/v = zelfstandig naamwoord mannelijk/vrouwelijk, mv = meervoud. */
export type Woordsoort = "m" | "v" | "mv" | "bn" | "bw" | "vz" | "vnw" | "uitdr" | "vw" | "ww";

export interface Woord {
  id: string;
  /** Zoals je het schrijft, met lidwoord bij zelfstandige naamwoorden: "le chat". */
  fr: string;
  nl: string;
  soort: Woordsoort;
  /** Plaatje als hint. */
  emoji: string;
  /** Uitspraak voor Nederlandstaligen; zie de uitspraakgids in hoofdstuk 1. */
  uitspraak: string;
  /** Vrouwelijke vorm van een bijvoeglijk naamwoord of beroep: "contente". */
  vrouwelijk?: string;
  /** Andere goede antwoorden als je het Frans moet schrijven. */
  alt?: string[];
  /** Korte voorbeeldzin. */
  voorbeeld?: { fr: string; nl: string };
}

export interface Werkwoord {
  id: string;
  inf: string;
  nl: string;
  emoji: string;
  uitspraak: string;
  groep: "-er" | "-ir" | "-re" | "onregelmatig";
  /** Présent, volledig met voornaamwoord: je suis, tu es, il est, nous sommes, vous êtes, ils sont. */
  present: string[];
  presentUitspraak: string[];
  /** Voltooid deelwoord (ontbreekt bij wederkerende werkwoorden in deze versie). */
  participe?: string;
  participeUitspraak?: string;
  hulpwerkwoord?: "avoir" | "etre";
  /** Uitspraak van de imparfait-stam (bijv. "mãzj" voor mange-). */
  imparfaitUitspraak?: string;
  /** Afwijkende imparfait-stam; standaard de nous-vorm zonder -ons. */
  imparfaitStam?: string;
  tip?: string;
}

/** Eén vervoegde vorm, zoals "nous sommes". */
export interface Vorm {
  persoon: number;
  /** Het voornaamwoord zoals het in de vorm staat: "je", "j'", "nous". */
  voornaamwoord: string;
  /** Het deel na het voornaamwoord: "sommes", "m'appelle", "suis allé(e)". */
  rest: string;
  /** De hele vorm: "nous sommes". */
  volledig: string;
  uitspraak: string;
  /** Alle goede geschreven antwoorden (volledig of alleen de rest). */
  antwoorden: string[];
}

export interface Zin {
  fr: string;
  nl: string;
  /** Andere goede Franse vertalingen. */
  alt?: string[];
}

export interface Uitlegblok {
  titel: string;
  /** Alinea's. **vet** en *schuin* worden opgemaakt. */
  tekst: string[];
  tabel?: { kop?: string[]; rijen: string[][] };
  voorbeelden?: Zin[];
}

export interface Hoofdstuk {
  nummer: number;
  titel: string;
  /** Wat je na dit hoofdstuk kunt. */
  doel: string;
  tijd: Tijd;
  werkwoorden: { id: string; tijden: Tijd[] }[];
  /** Woordgroepen; elke groep wordt één les. */
  woordgroepen: { titel: string; woorden: Woord[] }[];
  zinnen: Zin[];
  /** Getallen die je in dit hoofdstuk leert tellen (van, tot en met). */
  getallen?: [number, number];
  grammatica: Uitlegblok[];
}

// ---- Wat de app bewaart ----

/** Voortgang per leeritem (woord, werkwoordsvorm of zin), met een Leitner-herhaalschema. */
export interface ItemStand {
  bak: number;
  volgende: number;
  goed: number;
  fout: number;
  laatst: number;
}

export interface Instellingen {
  /** Naam van de gekozen Franse stem; leeg = automatisch. */
  stem: string;
  snelheid: number;
  luisteren: boolean;
  spreken: boolean;
  allesVrij: boolean;
  /** Licht, donker of automatisch (volgt je apparaat). */
  thema: "auto" | "licht" | "donker";
}

export interface AppData {
  versie: 1;
  /** Afgeronde lessen: "h1:werkwoord:etre" enz. */
  lessen: Record<string, { op: number; score: number }>;
  items: Record<string, ItemStand>;
  instellingen: Instellingen;
  /** Dagen (JJJJ-MM-DD) waarop je geoefend hebt, voor je reeks. */
  dagen: string[];
  xp: number;
}
