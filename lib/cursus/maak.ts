// Hulpje om woorden kort op te schrijven in de hoofdstukbestanden.
import type { Woord, Woordsoort } from "../types.ts";

/** Maakt een id van een Frans woord: "l'eau" → "leau", "le petit-déjeuner" → "le-petit-dejeuner". */
export function maakId(fr: string): string {
  return fr
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function w(
  fr: string,
  nl: string,
  soort: Woordsoort,
  emoji: string,
  uitspraak: string,
  extra: Partial<Pick<Woord, "vrouwelijk" | "alt" | "voorbeeld">> = {},
): Woord {
  return { id: maakId(fr), fr, nl, soort, emoji, uitspraak, ...extra };
}
