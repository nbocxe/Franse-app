// De opbouw van een hoofdstuk (zoals in een lesboek) en de oefeningen per les of oefenmodule.

import { ALLE_WOORDEN, HOOFDSTUKKEN, woordenVan } from "./cursus/index.ts";
import {
  getalKies, getalKoppel, getalLuister, getallenUit, getalSchrijf, oefeningVoorItem, schud,
  vormDictee, vormKies, vormKoppel, vormSpreek, vormTyp, woordDictee, woordKiesFr, woordKiesNl,
  woordKoppel, woordLuisterKies, woordSpreek, woordTyp, zinBouw, zinDictee, zinLuisterKies, zinSpreek, zinTyp,
  type Oefening, type Rng,
} from "./oefeningen.ts";
import type { Hoofdstuk, ItemStand, Tijd } from "./types.ts";
import { TIJD_KORT } from "./types.ts";
import { tijdenVan, WERKWOORDEN } from "./werkwoorden.ts";

export type LesSoort = "grammatica" | "werkwoord" | "woorden" | "zinnen" | "getallen" | "toets";

export interface Les {
  /** "h1:werkwoord:etre", "h1:woorden:0", enz. */
  id: string;
  hoofdstuk: number;
  soort: LesSoort;
  titel: string;
  sub: string;
  /** Werkwoord-id of index van de woordgroep. */
  sleutel?: string;
}

export const TOETS_DREMPEL = 0.8;

/** Maximaal aantal nieuwe woorden per les. */
const MAX_WOORDEN = 6;

/** Verdeelt een woordgroep eerlijk over lessen: 11 woorden → 6 + 5. */
function woordenInDeel<T>(woorden: T[], deel: number, delen: number): T[] {
  const per = Math.ceil(woorden.length / delen);
  return woorden.slice(deel * per, (deel + 1) * per);
}

export function lessenVan(h: Hoofdstuk): Les[] {
  const n = h.nummer;
  const lessen: Les[] = [
    { id: `h${n}:grammatica`, hoofdstuk: n, soort: "grammatica", titel: "Grammatica", sub: h.grammatica.map((g) => g.titel).slice(0, 3).join(" · ") },
  ];
  const aantal = Math.max(h.werkwoorden.length, h.woordgroepen.length);
  for (let i = 0; i < aantal; i++) {
    const ww = h.werkwoorden[i];
    if (ww) {
      const w = WERKWOORDEN[ww.id];
      lessen.push({
        id: `h${n}:werkwoord:${ww.id}`, hoofdstuk: n, soort: "werkwoord", sleutel: ww.id,
        titel: `Werkwoord: ${w.inf}`, sub: `${w.nl} · ${ww.tijden.map((t) => TIJD_KORT[t]).join(" + ")}`,
      });
    }
    const groep = h.woordgroepen[i];
    if (groep) {
      // Grote groepen worden twee korte lessen, zodat een les niet te lang duurt.
      const delen = Math.ceil(groep.woorden.length / MAX_WOORDEN);
      for (let d = 0; d < delen; d++) {
        const woorden = woordenInDeel(groep.woorden, d, delen);
        lessen.push({
          id: `h${n}:woorden:${i}${delen > 1 ? `.${d}` : ""}`, hoofdstuk: n, soort: "woorden", sleutel: `${i}.${d}.${delen}`,
          titel: `Woorden: ${groep.titel}${delen > 1 ? ` (${d + 1}/${delen})` : ""}`,
          sub: woorden.slice(0, 4).map((w) => w.fr).join(", ") + (woorden.length > 4 ? " …" : ""),
        });
      }
    }
  }
  lessen.push({ id: `h${n}:zinnen`, hoofdstuk: n, soort: "zinnen", titel: "Zinnen maken", sub: "Alles van dit hoofdstuk samen" });
  if (h.getallen) {
    lessen.push({ id: `h${n}:getallen`, hoofdstuk: n, soort: "getallen", titel: "Tellen", sub: `${h.getallen[0]} tot en met ${h.getallen[1]}` });
  }
  lessen.push({ id: `h${n}:toets`, hoofdstuk: n, soort: "toets", titel: "Hoofdstuktoets", sub: `Haal ${TOETS_DREMPEL * 100}% om het volgende hoofdstuk te openen` });
  return lessen;
}

export function vindLes(id: string): Les | undefined {
  const n = Number(id.match(/^h(\d+):/)?.[1]);
  const h = HOOFDSTUKKEN.find((x) => x.nummer === n);
  return h ? lessenVan(h).find((l) => l.id === id) : undefined;
}

/** Een les is open als de vorige les af is (of alles is vrijgegeven). */
export function lesOpen(les: Les, afgerond: Record<string, unknown>, allesVrij: boolean): boolean {
  if (allesVrij) return true;
  const h = HOOFDSTUKKEN.find((x) => x.nummer === les.hoofdstuk)!;
  const lijst = lessenVan(h);
  const i = lijst.findIndex((l) => l.id === les.id);
  if (i > 0) return lijst[i - 1].id in afgerond;
  const vorig = HOOFDSTUKKEN.find((x) => x.nummer === les.hoofdstuk - 1);
  return !vorig || `h${vorig.nummer}:toets` in afgerond;
}

export interface Opties {
  luisteren: boolean;
  spreken: boolean;
}

/** Past een reeks aan je instellingen aan: geen luister- of spreekoefeningen als je die uit hebt staan. */
export function filter(oefeningen: Oefening[], opties: Opties): Oefening[] {
  return oefeningen.filter((o) => {
    if (o.soort === "spreek") return opties.spreken;
    if (!opties.luisteren && "vraag" in o && o.vaardigheid === "luisteren") return false;
    return true;
  });
}

function werkwoordLes(ww: string, tijden: Tijd[], rng: Rng): Oefening[] {
  const uit: Oefening[] = [];
  for (const tijd of tijden) {
    const p = schud([0, 1, 2, 3, 4, 5], rng);
    const q = schud([0, 1, 2, 3, 4, 5], rng);
    uit.push({ soort: "uitleg-werkwoord", ww, tijd, items: [], vaardigheid: "lezen" });
    uit.push(vormKoppel(ww, tijd, rng));
    // Eerst herkennen, dan zelf schrijven, dan horen en zeggen.
    if (tijden.length === 1) uit.push(vormKies(ww, tijd, p[0], rng), vormKies(ww, tijd, p[1], rng));
    else uit.push(vormKies(ww, tijd, p[0], rng));
    for (const persoon of tijden.length === 1 ? p : p.slice(0, 4)) uit.push(vormTyp(ww, tijd, persoon));
    uit.push(vormDictee(ww, tijd, q[0]), vormDictee(ww, tijd, q[1]));
    uit.push(vormSpreek(ww, tijd, q[2]));
  }
  return uit;
}

function woordenLes(h: Hoofdstuk, sleutel: string, rng: Rng): Oefening[] {
  const [groepIndex, deel, delen] = sleutel.split(".").map(Number);
  const woorden = woordenInDeel(h.woordgroepen[groepIndex].woorden, deel, delen);
  const pool = [...woorden, ...woordenVan(h), ...ALLE_WOORDEN];
  const uit: Oefening[] = [];
  // Deel 1: steeds één nieuw woord, meteen daarna herkennen.
  woorden.forEach((w, i) => {
    uit.push({ soort: "uitleg-woord", woord: w, items: [], vaardigheid: "lezen" });
    uit.push(i % 2 === 0 ? woordKiesFr(w, pool, rng) : woordKiesNl(w, pool, rng));
    if (i % 4 === 3) uit.push(woordKoppel(woorden.slice(0, i + 1), rng));
  });
  // Deel 2: alles door elkaar, zelf schrijven, luisteren en zeggen.
  const deel2: Oefening[] = [];
  schud(woorden, rng).forEach((w, i) => {
    deel2.push(woordTyp(w));
    if (i % 3 === 0) deel2.push(woordLuisterKies(w, pool, rng));
    if (i % 3 === 1) deel2.push(woordDictee(w));
    if (i % 4 === 2) deel2.push(woordSpreek(w));
  });
  return [...uit, ...schud(deel2, rng), woordKoppel(woorden, rng)];
}

function zinnenLes(h: Hoofdstuk, rng: Rng, aantal = 10): Oefening[] {
  const indexen = schud(h.zinnen.map((_, i) => i), rng).slice(0, aantal);
  const makers = [
    (i: number) => zinBouw(h.zinnen[i], h.nummer, i, rng),
    (i: number) => zinLuisterKies(h.zinnen[i], h.nummer, i, h.zinnen, rng),
    (i: number) => zinTyp(h.zinnen[i], h.nummer, i),
    (i: number) => zinBouw(h.zinnen[i], h.nummer, i, rng),
    (i: number) => zinDictee(h.zinnen[i], h.nummer, i),
    (i: number) => zinSpreek(h.zinnen[i], h.nummer, i),
  ];
  return indexen.map((zi, k) => makers[k % makers.length](zi));
}

export function getallenOefeningen(van: number, tot: number, rng: Rng, aantal = 12): Oefening[] {
  const g = getallenUit(van, tot, aantal, rng);
  const makers = [
    (n: number) => getalKies(n, van, tot, rng),
    (n: number) => getalLuister(n),
    (n: number) => getalSchrijf(n),
    (n: number) => getalLuister(n),
  ];
  const uit = g.map((n, i) => makers[i % makers.length](n));
  uit.splice(Math.min(4, uit.length), 0, getalKoppel(getallenUit(van, tot, 5, rng), rng));
  return uit;
}

function getallenLes(h: Hoofdstuk, rng: Rng): Oefening[] {
  const [van, tot] = h.getallen!;
  const voorbeelden = tot - van <= 20
    ? Array.from({ length: tot - van + 1 }, (_, i) => van + i)
    : getallenUit(van, tot, 12, rng).sort((a, b) => a - b);
  return [{ soort: "uitleg-getallen", getallen: voorbeelden, items: [], vaardigheid: "lezen" }, ...getallenOefeningen(van, tot, rng)];
}

function toets(h: Hoofdstuk, rng: Rng): Oefening[] {
  const uit: Oefening[] = [];
  for (const { id, tijden } of h.werkwoorden) {
    const tijd = tijden[tijden.length - 1];
    const p = schud([0, 1, 2, 3, 4, 5], rng);
    uit.push(vormTyp(id, tijd, p[0]), vormTyp(id, tijd, p[1]));
  }
  const woorden = schud(woordenVan(h), rng).slice(0, 7);
  woorden.forEach((w, i) => uit.push(i % 3 === 2 ? woordDictee(w) : woordTyp(w)));
  uit.push(...zinnenLes(h, rng, 5).filter((o) => o.soort !== "spreek"));
  if (h.getallen) uit.push(getalSchrijf(getallenUit(h.getallen[0], h.getallen[1], 1, rng)[0]));
  return schud(uit, rng);
}

export function bouwLes(les: Les, rng: Rng, opties: Opties): Oefening[] {
  const h = HOOFDSTUKKEN.find((x) => x.nummer === les.hoofdstuk)!;
  let lijst: Oefening[] = [];
  if (les.soort === "werkwoord") lijst = werkwoordLes(les.sleutel!, h.werkwoorden.find((w) => w.id === les.sleutel)!.tijden, rng);
  if (les.soort === "woorden") lijst = woordenLes(h, les.sleutel!, rng);
  if (les.soort === "zinnen") lijst = zinnenLes(h, rng);
  if (les.soort === "getallen") lijst = getallenLes(h, rng);
  if (les.soort === "toets") lijst = toets(h, rng);
  return filter(lijst, opties);
}

// ---------- Losse oefenmodules ----------

/** Rangschikt items: eerst wat aan de beurt is, dan wat je vaak fout doet, dan de rest. */
export function prioriteit(items: string[], stand: Record<string, ItemStand>, nu: number, rng: Rng): string[] {
  const score = (id: string) => {
    const s = stand[id];
    if (!s) return 1 + rng();
    const teLaat = s.volgende <= nu ? 3 : 0;
    return teLaat + s.fout / (s.goed + s.fout + 1) * 2 + rng() * 0.5 - s.bak * 0.2;
  };
  return [...items].sort((a, b) => score(b) - score(a));
}

export function woordenModule(hoofdstukken: number[], stand: Record<string, ItemStand>, nu: number, rng: Rng, opties: Opties): Oefening[] {
  const woorden = HOOFDSTUKKEN.filter((h) => hoofdstukken.includes(h.nummer)).flatMap(woordenVan);
  if (woorden.length === 0) return [];
  const volgorde = prioriteit(woorden.map((w) => `w:${w.id}`), stand, nu, rng).slice(0, 14);
  const gekozen = volgorde.map((id) => woorden.find((w) => `w:${w.id}` === id)!);
  const makers = [
    (w: (typeof gekozen)[0]) => woordTyp(w),
    (w: (typeof gekozen)[0]) => woordKiesFr(w, woorden, rng),
    (w: (typeof gekozen)[0]) => woordLuisterKies(w, woorden, rng),
    (w: (typeof gekozen)[0]) => woordTyp(w),
    (w: (typeof gekozen)[0]) => woordDictee(w),
    (w: (typeof gekozen)[0]) => woordSpreek(w),
  ];
  const lijst = gekozen.map((w, i) => makers[i % makers.length](w));
  lijst.splice(6, 0, woordKoppel(gekozen.slice(0, 5), rng));
  return filter(lijst, opties);
}

export function werkwoordenModule(
  keuze: { ww: string; tijd: Tijd }[],
  stand: Record<string, ItemStand>,
  nu: number,
  rng: Rng,
  opties: Opties,
): Oefening[] {
  const geldig = keuze.filter((k) => WERKWOORDEN[k.ww] && tijdenVan(WERKWOORDEN[k.ww]).includes(k.tijd));
  if (geldig.length === 0) return [];
  // Eén werkwoord kiezen = eerst de tabel zien; bij meerdere ga je meteen oefenen.
  if (geldig.length === 1) return filter(werkwoordLes(geldig[0].ww, [geldig[0].tijd], rng), opties);
  const items = geldig.flatMap(({ ww, tijd }) => [0, 1, 2, 3, 4, 5].map((p) => `v:${ww}:${tijd}:${p}`));
  const lijst = prioriteit(items, stand, nu, rng)
    .slice(0, 14)
    .map((id, i) => {
      const [, ww, tijd, p] = id.split(":");
      const t = tijd as Tijd;
      const makers = [vormTyp, vormTyp, vormDictee, vormTyp, vormSpreek];
      return i % 5 === 1 ? vormKies(ww, t, Number(p), rng) : makers[i % 5](ww, t, Number(p));
    });
  return filter(lijst, opties);
}

export function zinnenModule(hoofdstukken: number[], rng: Rng, opties: Opties): Oefening[] {
  const lijst = HOOFDSTUKKEN.filter((h) => hoofdstukken.includes(h.nummer)).flatMap((h) => zinnenLes(h, rng, 4));
  return filter(schud(lijst, rng).slice(0, 12), opties);
}

/** Herhalen: alles wat volgens het herhaalschema aan de beurt is (maximaal 15). */
export function teHerhalen(stand: Record<string, ItemStand>, nu: number): string[] {
  return Object.entries(stand)
    .filter(([, s]) => s.volgende <= nu)
    .sort((a, b) => a[1].volgende - b[1].volgende)
    .map(([id]) => id);
}

export function herhaalModule(stand: Record<string, ItemStand>, nu: number, rng: Rng, opties: Opties): Oefening[] {
  const lijst = teHerhalen(stand, nu)
    .slice(0, 15)
    .map((id) => oefeningVoorItem(id, rng))
    .filter((o): o is Oefening => o !== null);
  return filter(schud(lijst, rng), opties);
}
