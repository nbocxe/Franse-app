// De hele cursus: hoofdstukken in volgorde, plus snelle opzoeklijsten.
import type { Hoofdstuk, Woord } from "../types.ts";
import { H1 } from "./h01.ts";
import { H2 } from "./h02.ts";
import { H3 } from "./h03.ts";
import { H4 } from "./h04.ts";
import { H5 } from "./h05.ts";
import { H6 } from "./h06.ts";
import { H7 } from "./h07.ts";
import { H8 } from "./h08.ts";
import { H9 } from "./h09.ts";
import { H10 } from "./h10.ts";

export const HOOFDSTUKKEN: Hoofdstuk[] = [H1, H2, H3, H4, H5, H6, H7, H8, H9, H10];

export function hoofdstuk(nummer: number): Hoofdstuk | undefined {
  return HOOFDSTUKKEN.find((h) => h.nummer === nummer);
}

export function woordenVan(h: Hoofdstuk): Woord[] {
  return h.woordgroepen.flatMap((g) => g.woorden);
}

export const ALLE_WOORDEN: Woord[] = HOOFDSTUKKEN.flatMap(woordenVan);

export const WOORD: Record<string, Woord> = Object.fromEntries(ALLE_WOORDEN.map((w) => [w.id, w]));

/** In welk hoofdstuk een woord voor het eerst voorkomt. */
export const HOOFDSTUK_VAN_WOORD: Record<string, number> = Object.fromEntries(
  HOOFDSTUKKEN.flatMap((h) => woordenVan(h).map((w) => [w.id, h.nummer])),
);
