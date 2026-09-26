// Maakt oefeningen van de lesstof: kiezen, typen, luisteren, zinnen bouwen, koppelen en spreken.

import { ALLE_WOORDEN, HOOFDSTUKKEN, WOORD } from "./cursus/index.ts";
import { getalInWoorden, getalUitspraak } from "./getallen.ts";
import type { Tijd, Woord, Zin } from "./types.ts";
import { TIJD_KORT } from "./types.ts";
import { metGat, toonVoornaamwoord, toonVorm, vervoeg, WERKWOORDEN } from "./werkwoorden.ts";

export type Vaardigheid = "lezen" | "luisteren" | "schrijven" | "spreken" | "doen";

export interface Vraag {
  /** Korte opdracht bovenaan: "Hoe zeg je dit in het Frans?" */
  opdracht: string;
  /** De tekst waar het om gaat (groot getoond), tenzij het een luisteroefening is. */
  tekst?: string;
  /** Kleinere hulptekst onder de tekst. */
  sub?: string;
  emoji?: string;
  /** Franse tekst die voorgelezen wordt (bij luisteroefeningen automatisch). */
  audio?: string;
}

export interface Optie {
  tekst: string;
  emoji?: string;
}

interface Basis {
  /** Leeritems die met deze oefening geoefend worden (voor het herhaalschema). */
  items: string[];
  vaardigheid: Vaardigheid;
}

/** Wat je na het antwoorden te zien krijgt. */
export interface Uitleg {
  fr: string;
  nl?: string;
  uitspraak?: string;
}

export type Oefening =
  | { soort: "uitleg-woord"; woord: Woord; items: string[]; vaardigheid: "lezen" }
  | { soort: "uitleg-werkwoord"; ww: string; tijd: Tijd; items: string[]; vaardigheid: "lezen" }
  | { soort: "uitleg-getallen"; getallen: number[]; items: string[]; vaardigheid: "lezen" }
  | (Basis & { soort: "kies"; vraag: Vraag; opties: Optie[]; juist: number; uitleg: Uitleg })
  | (Basis & { soort: "typ"; vraag: Vraag; antwoorden: string[]; getal?: boolean; uitleg: Uitleg; plaatshouder?: string })
  | (Basis & { soort: "bouw"; vraag: Vraag; tegels: string[]; antwoord: string; alt: string[]; uitleg: Uitleg })
  | (Basis & { soort: "koppel"; opdracht: string; paren: { links: string; rechts: string; audio?: string }[] })
  | (Basis & { soort: "spreek"; vraag: Vraag; doel: string; uitleg: Uitleg });

export type Rng = () => number;

export function schud<T>(lijst: T[], rng: Rng = Math.random): T[] {
  const a = [...lijst];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function kies<T>(lijst: T[], rng: Rng = Math.random): T {
  return lijst[Math.floor(rng() * lijst.length)];
}

/** Voorspelbare willekeur, handig voor tests. */
export function zaad(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Meerkeuze: de juiste optie plus afleiders, geschud. */
function meerkeuze(juist: Optie, afleiders: Optie[], rng: Rng, aantal = 4): { opties: Optie[]; juist: number } {
  const uniek = afleiders.filter((a, i) => a.tekst !== juist.tekst && afleiders.findIndex((b) => b.tekst === a.tekst) === i);
  const opties = schud([juist, ...schud(uniek, rng).slice(0, aantal - 1)], rng);
  return { opties, juist: opties.findIndex((o) => o.tekst === juist.tekst) };
}

// ---------- Woorden ----------

export const woordItem = (w: Woord) => `w:${w.id}`;

export function woordTekst(w: Woord): string {
  return w.vrouwelijk ? `${w.fr} / ${w.vrouwelijk}` : w.fr;
}

function woordUitleg(w: Woord): Uitleg {
  return { fr: woordTekst(w), nl: w.nl, uitspraak: w.uitspraak };
}

/** Afleiders die op het woord lijken: liefst dezelfde soort (zodat je het niet aan het lidwoord ziet). */
function lijkendeWoorden(w: Woord, pool: Woord[]): Woord[] {
  const kandidaten = pool.filter((x) => x.id !== w.id && x.nl !== w.nl);
  const zelfde = kandidaten.filter((x) => x.soort === w.soort);
  return zelfde.length >= 3 ? zelfde : kandidaten;
}

export function woordKiesFr(w: Woord, pool: Woord[], rng: Rng): Oefening {
  const { opties, juist } = meerkeuze(
    { tekst: w.fr },
    lijkendeWoorden(w, pool).map((x) => ({ tekst: x.fr })),
    rng,
  );
  return {
    soort: "kies", items: [woordItem(w)], vaardigheid: "lezen",
    vraag: { opdracht: "Kies het juiste Franse woord", emoji: w.emoji, tekst: w.nl },
    opties, juist, uitleg: woordUitleg(w),
  };
}

export function woordKiesNl(w: Woord, pool: Woord[], rng: Rng): Oefening {
  const { opties, juist } = meerkeuze(
    { tekst: w.nl, emoji: w.emoji },
    lijkendeWoorden(w, pool).map((x) => ({ tekst: x.nl, emoji: x.emoji })),
    rng,
  );
  return {
    soort: "kies", items: [woordItem(w)], vaardigheid: "lezen",
    vraag: { opdracht: "Wat betekent dit?", tekst: woordTekst(w), sub: w.uitspraak, audio: w.fr },
    opties, juist, uitleg: woordUitleg(w),
  };
}

export function woordLuisterKies(w: Woord, pool: Woord[], rng: Rng): Oefening {
  const { opties, juist } = meerkeuze(
    { tekst: w.nl, emoji: w.emoji },
    lijkendeWoorden(w, pool).map((x) => ({ tekst: x.nl, emoji: x.emoji })),
    rng,
  );
  return {
    soort: "kies", items: [woordItem(w)], vaardigheid: "luisteren",
    vraag: { opdracht: "Wat hoor je?", audio: w.fr },
    opties, juist, uitleg: woordUitleg(w),
  };
}

function woordAntwoorden(w: Woord): string[] {
  return [w.fr, ...(w.vrouwelijk ? [w.vrouwelijk] : []), ...(w.alt ?? [])];
}

export function woordTyp(w: Woord): Oefening {
  const zn = w.soort === "m" || w.soort === "v" || w.soort === "mv";
  return {
    soort: "typ", items: [woordItem(w)], vaardigheid: "schrijven",
    vraag: {
      opdracht: zn ? "Schrijf in het Frans, met lidwoord" : "Schrijf in het Frans",
      emoji: w.emoji, tekst: w.nl,
    },
    antwoorden: woordAntwoorden(w), uitleg: woordUitleg(w),
  };
}

export function woordDictee(w: Woord): Oefening {
  return {
    soort: "typ", items: [woordItem(w)], vaardigheid: "luisteren",
    vraag: { opdracht: "Schrijf op wat je hoort", audio: w.fr },
    antwoorden: woordAntwoorden(w), uitleg: woordUitleg(w), plaatshouder: "In het Frans…",
  };
}

export function woordSpreek(w: Woord): Oefening {
  return {
    soort: "spreek", items: [woordItem(w)], vaardigheid: "spreken",
    vraag: { opdracht: "Zeg hardop in het Frans", emoji: w.emoji, tekst: w.nl, audio: w.fr },
    doel: w.fr, uitleg: woordUitleg(w),
  };
}

export function woordKoppel(woorden: Woord[], rng: Rng): Oefening {
  const gekozen = schud(woorden, rng).slice(0, 5);
  return {
    soort: "koppel", items: gekozen.map(woordItem), vaardigheid: "doen",
    opdracht: "Maak de paren",
    paren: gekozen.map((w) => ({ links: w.fr, rechts: w.nl, audio: w.fr })),
  };
}

// ---------- Werkwoorden ----------

export const vormItem = (ww: string, tijd: Tijd, persoon: number) => `v:${ww}:${tijd}:${persoon}`;

function vormUitleg(ww: string, tijd: Tijd, persoon: number): Uitleg {
  const v = vervoeg(WERKWOORDEN[ww], tijd)[persoon];
  return { fr: toonVorm(v), uitspraak: v.uitspraak, nl: `${WERKWOORDEN[ww].inf} · ${TIJD_KORT[tijd]}` };
}

export function vormTyp(ww: string, tijd: Tijd, persoon: number): Oefening {
  const w = WERKWOORDEN[ww];
  const v = vervoeg(w, tijd)[persoon];
  return {
    soort: "typ", items: [vormItem(ww, tijd, persoon)], vaardigheid: "schrijven",
    vraag: {
      opdracht: `Vervoeg ${w.inf} (${TIJD_KORT[tijd]})`,
      tekst: metGat(v),
      sub: `${w.inf} = ${w.nl}`,
      emoji: w.emoji,
    },
    antwoorden: v.antwoorden, uitleg: vormUitleg(ww, tijd, persoon), plaatshouder: "Alleen het werkwoord is genoeg",
  };
}

export function vormKies(ww: string, tijd: Tijd, persoon: number, rng: Rng): Oefening {
  const w = WERKWOORDEN[ww];
  const vormen = vervoeg(w, tijd);
  const v = vormen[persoon];
  const { opties, juist } = meerkeuze({ tekst: v.rest }, vormen.map((x) => ({ tekst: x.rest })), rng);
  return {
    soort: "kies", items: [vormItem(ww, tijd, persoon)], vaardigheid: "lezen",
    vraag: { opdracht: `Kies de juiste vorm van ${w.inf}`, tekst: metGat(v), sub: TIJD_KORT[tijd], emoji: w.emoji },
    opties, juist, uitleg: vormUitleg(ww, tijd, persoon),
  };
}

export function vormDictee(ww: string, tijd: Tijd, persoon: number): Oefening {
  const v = vervoeg(WERKWOORDEN[ww], tijd)[persoon];
  return {
    soort: "typ", items: [vormItem(ww, tijd, persoon)], vaardigheid: "luisteren",
    vraag: { opdracht: "Schrijf op wat je hoort", audio: v.volledig.replace(/\(e\)s?$/, "") },
    antwoorden: v.antwoorden.filter((a) => a.startsWith(v.voornaamwoord)),
    uitleg: vormUitleg(ww, tijd, persoon), plaatshouder: "Met voornaamwoord",
  };
}

export function vormSpreek(ww: string, tijd: Tijd, persoon: number): Oefening {
  const w = WERKWOORDEN[ww];
  const v = vervoeg(w, tijd)[persoon];
  const gesproken = v.volledig.replace(/\(e\)s?/, "");
  return {
    soort: "spreek", items: [vormItem(ww, tijd, persoon)], vaardigheid: "spreken",
    vraag: { opdracht: `Zeg hardop: ${w.inf}, ${TIJD_KORT[tijd]}`, tekst: `${toonVoornaamwoord(v)}${toonVoornaamwoord(v).endsWith("'") ? "" : " "}…`, emoji: w.emoji, audio: gesproken },
    doel: gesproken, uitleg: vormUitleg(ww, tijd, persoon),
  };
}

export function vormKoppel(ww: string, tijd: Tijd, rng: Rng): Oefening {
  // Vormen die hetzelfde geschreven worden (je parle, il parle) kunnen niet allebei in één koppeloefening.
  const vormen = schud(vervoeg(WERKWOORDEN[ww], tijd), rng)
    .filter((v, i, alle) => alle.findIndex((x) => x.rest === v.rest) === i)
    .slice(0, 5);
  return {
    soort: "koppel", items: vormen.map((v) => vormItem(ww, tijd, v.persoon)), vaardigheid: "doen",
    opdracht: `Wat hoort bij elkaar? (${WERKWOORDEN[ww].inf}, ${TIJD_KORT[tijd]})`,
    // Links het voornaamwoord zoals je het schrijft (j' vóór een klinker), rechts de rest: j' + ai = j'ai.
    // Alleen het voornaamwoord laten horen: de hele vorm zou het antwoord verklappen.
    paren: vormen.map((v) => {
      const vnw = toonVoornaamwoord(v);
      return { links: vnw, rechts: v.rest, audio: vnw === "j'" ? "je" : vnw.replace("/", ", ") };
    }),
  };
}

// ---------- Zinnen ----------

export const zinItem = (h: number, i: number) => `z:${h}:${i}`;

export function zinVanItem(item: string): Zin | undefined {
  const [, h, i] = item.split(":");
  return HOOFDSTUKKEN.find((x) => x.nummer === Number(h))?.zinnen[Number(i)];
}

/** Splitst een zin in tegels: woorden zonder leestekens, "j'" en "l'" blijven aan hun woord vast. */
export function tegels(zin: string): string[] {
  return zin
    .replace(/[.,!?;:]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Verwarrende extra tegels: andere vormen van dezelfde werkwoorden en woorden uit hetzelfde hoofdstuk. */
function afleidTegels(zin: Zin, hoofdstukNr: number, rng: Rng): string[] {
  const juist = new Set(tegels(zin.fr).map((t) => t.toLowerCase()));
  const kandidaten = new Set<string>();
  for (const ww of Object.values(WERKWOORDEN)) {
    const vormen = vervoeg(ww, "present").map((v) => v.rest);
    if (vormen.some((r) => juist.has(r))) vormen.forEach((r) => !r.includes(" ") && kandidaten.add(r));
  }
  const h = HOOFDSTUKKEN.find((x) => x.nummer === hoofdstukNr);
  for (const w of h ? h.woordgroepen.flatMap((g) => g.woorden) : []) {
    for (const t of tegels(w.fr)) if (t.length > 2) kandidaten.add(t);
  }
  ["le", "la", "un", "une", "pas", "de", "du"].forEach((x) => kandidaten.add(x));
  return schud([...kandidaten].filter((k) => !juist.has(k.toLowerCase())), rng).slice(0, 3);
}

function zinUitleg(zin: Zin): Uitleg {
  return { fr: zin.fr, nl: zin.nl };
}

export function zinBouw(zin: Zin, h: number, i: number, rng: Rng): Oefening {
  const t = tegels(zin.fr);
  return {
    soort: "bouw", items: [zinItem(h, i)], vaardigheid: "doen",
    vraag: { opdracht: "Bouw de zin in het Frans", tekst: zin.nl },
    tegels: schud([...t, ...afleidTegels(zin, h, rng)], rng),
    antwoord: zin.fr, alt: zin.alt ?? [], uitleg: zinUitleg(zin),
  };
}

export function zinTyp(zin: Zin, h: number, i: number): Oefening {
  return {
    soort: "typ", items: [zinItem(h, i)], vaardigheid: "schrijven",
    vraag: { opdracht: "Vertaal in het Frans", tekst: zin.nl },
    antwoorden: [zin.fr, ...(zin.alt ?? [])], uitleg: zinUitleg(zin),
  };
}

export function zinDictee(zin: Zin, h: number, i: number): Oefening {
  return {
    soort: "typ", items: [zinItem(h, i)], vaardigheid: "luisteren",
    vraag: { opdracht: "Schrijf op wat je hoort", audio: zin.fr },
    antwoorden: [zin.fr], uitleg: zinUitleg(zin), plaatshouder: "In het Frans…",
  };
}

export function zinLuisterKies(zin: Zin, h: number, i: number, pool: Zin[], rng: Rng): Oefening {
  const { opties, juist } = meerkeuze({ tekst: zin.nl }, pool.map((z) => ({ tekst: z.nl })), rng, 3);
  return {
    soort: "kies", items: [zinItem(h, i)], vaardigheid: "luisteren",
    vraag: { opdracht: "Wat betekent wat je hoort?", audio: zin.fr },
    opties, juist, uitleg: zinUitleg(zin),
  };
}

export function zinSpreek(zin: Zin, h: number, i: number): Oefening {
  return {
    soort: "spreek", items: [zinItem(h, i)], vaardigheid: "spreken",
    vraag: { opdracht: "Lees hardop voor", tekst: zin.fr, sub: zin.nl, audio: zin.fr },
    doel: zin.fr, uitleg: zinUitleg(zin),
  };
}

// ---------- Getallen ----------

function getalUitleg(n: number): Uitleg {
  return { fr: getalInWoorden(n), nl: String(n), uitspraak: getalUitspraak(n) };
}

export function getalLuister(n: number): Oefening {
  return {
    soort: "typ", items: [], vaardigheid: "luisteren",
    vraag: { opdracht: "Welk getal hoor je? Typ het in cijfers.", audio: getalInWoorden(n) },
    antwoorden: [String(n)], uitleg: getalUitleg(n), plaatshouder: "Bijv. 42",
  };
}

export function getalSchrijf(n: number): Oefening {
  return {
    soort: "typ", items: [], vaardigheid: "schrijven",
    vraag: { opdracht: "Schrijf dit getal in het Frans", tekst: String(n) },
    antwoorden: [getalInWoorden(n)], getal: true, uitleg: getalUitleg(n),
  };
}

export function getalKies(n: number, van: number, tot: number, rng: Rng): Oefening {
  // Afleiders die lijken: dicht in de buurt, of met dezelfde eenheid.
  const buren = [n - 1, n + 1, n + 10, n - 10, n + 2, n - 2].filter((x) => x >= Math.max(0, van - 5) && x <= tot + 5 && x !== n);
  const { opties, juist } = meerkeuze({ tekst: String(n) }, buren.map((x) => ({ tekst: String(x) })), rng);
  return {
    soort: "kies", items: [], vaardigheid: "lezen",
    vraag: { opdracht: "Welk getal is dit?", tekst: getalInWoorden(n), sub: getalUitspraak(n), audio: getalInWoorden(n) },
    opties, juist, uitleg: getalUitleg(n),
  };
}

export function getalKoppel(getallen: number[], rng: Rng): Oefening {
  const g = schud(getallen, rng).slice(0, 5);
  return {
    soort: "koppel", items: [], vaardigheid: "doen", opdracht: "Welk getal hoort bij welk woord?",
    paren: g.map((n) => ({ links: getalInWoorden(n), rechts: String(n), audio: getalInWoorden(n) })),
  };
}

/** Een handvol getallen uit een bereik: de lastige 'mijlpalen' plus willekeurige. */
export function getallenUit(van: number, tot: number, aantal: number, rng: Rng): number[] {
  const alle = tot - van <= 60 ? Array.from({ length: tot - van + 1 }, (_, i) => van + i) : [];
  const mijlpalen = [van, tot, 21, 71, 80, 81, 91, 100, 200, 201, 1000, 2000].filter((x) => x >= van && x <= tot);
  const gekozen = new Set<number>(schud(mijlpalen, rng).slice(0, Math.ceil(aantal / 3)));
  while (gekozen.size < aantal && gekozen.size < tot - van + 1) {
    gekozen.add(alle.length ? kies(alle, rng) : van + Math.floor(rng() * (tot - van + 1)));
  }
  return schud([...gekozen], rng);
}

// ---------- Eén oefening per leeritem (voor herhalen) ----------

export function oefeningVoorItem(item: string, rng: Rng, variant = Math.floor(rng() * 4)): Oefening | null {
  const [soort, a, b, c] = item.split(":");
  if (soort === "w") {
    const w = WOORD[a];
    if (!w) return null;
    return [woordTyp(w), woordKiesFr(w, ALLE_WOORDEN, rng), woordDictee(w), woordTyp(w)][variant];
  }
  if (soort === "v") {
    if (!WERKWOORDEN[a]) return null;
    const tijd = b as Tijd;
    const p = Number(c);
    return [vormTyp(a, tijd, p), vormTyp(a, tijd, p), vormDictee(a, tijd, p), vormKies(a, tijd, p, rng)][variant];
  }
  if (soort === "z") {
    const zin = zinVanItem(item);
    if (!zin) return null;
    const h = Number(a);
    const i = Number(b);
    return [zinTyp(zin, h, i), zinBouw(zin, h, i, rng), zinDictee(zin, h, i), zinTyp(zin, h, i)][variant];
  }
  return null;
}
