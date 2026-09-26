// Herhaalschema (Leitner): elke keer dat je een item goed hebt, zie je het pas later terug.

import type { ItemStand } from "./types.ts";

export const DAG = 24 * 60 * 60 * 1000;

/** Wachttijd in dagen per bak. */
export const INTERVALLEN = [1, 2, 4, 8, 16, 35, 90];

export function verwerk(stand: ItemStand | undefined, goed: boolean, nu: number): ItemStand {
  const huidig = stand ?? { bak: 0, volgende: nu, goed: 0, fout: 0, laatst: nu };
  // Nieuw en meteen goed: bak 0 (morgen terug). Fout: terug naar bak 0.
  const bak = !stand ? 0 : goed ? Math.min(huidig.bak + 1, INTERVALLEN.length - 1) : 0;
  return {
    bak,
    volgende: nu + INTERVALLEN[bak] * DAG,
    goed: huidig.goed + (goed ? 1 : 0),
    fout: huidig.fout + (goed ? 0 : 1),
    laatst: nu,
  };
}

/** Hoe goed je een item kent, van 0 tot 1. */
export function beheersing(stand: ItemStand | undefined): number {
  if (!stand) return 0;
  return Math.min(1, (stand.bak + 1) / 5);
}
