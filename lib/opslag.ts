"use client";

// Alles wordt in de browser bewaard (localStorage). Accounts kunnen later.
import { useCallback, useEffect, useState } from "react";
import { verwerk } from "./srs";
import type { AppData, Instellingen } from "./types";

const SLEUTEL = "franseapp:v1";

export const STANDAARD_INSTELLINGEN: Instellingen = {
  stem: "",
  snelheid: 0.9,
  luisteren: true,
  spreken: true,
  allesVrij: false,
};

export function leeg(): AppData {
  return { versie: 1, lessen: {}, items: {}, instellingen: STANDAARD_INSTELLINGEN, dagen: [], xp: 0 };
}

function laad(): AppData {
  try {
    const ruw = localStorage.getItem(SLEUTEL);
    if (!ruw) return leeg();
    const d = JSON.parse(ruw);
    return { ...leeg(), ...d, instellingen: { ...STANDAARD_INSTELLINGEN, ...d.instellingen } };
  } catch {
    return leeg();
  }
}

function bewaar(data: AppData) {
  try {
    localStorage.setItem(SLEUTEL, JSON.stringify(data));
  } catch {
    // Opslag vol of geblokkeerd; de app blijft werken tot je de pagina sluit.
  }
}

/** Geeft de opgeslagen gegevens (null tijdens het laden) en een functie om ze aan te passen. */
export function useAppData() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(laad());
  }, []);

  const wijzig = useCallback((aanpassing: (huidig: AppData) => AppData) => {
    setData((huidig) => {
      const nieuw = aanpassing(huidig ?? laad());
      bewaar(nieuw);
      return nieuw;
    });
  }, []);

  return [data, wijzig] as const;
}

export function vandaag(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Aantal dagen op rij dat je hebt geoefend (tot en met vandaag of gisteren). */
export function reeks(dagen: string[]): number {
  const set = new Set(dagen);
  const d = new Date();
  if (!set.has(vandaag())) d.setDate(d.getDate() - 1);
  let n = 0;
  for (;;) {
    const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!set.has(s)) return n;
    n++;
    d.setDate(d.getDate() - 1);
  }
}

/** Verwerkt de antwoorden van een sessie: herhaalschema, xp, dagen en eventueel een afgeronde les. */
export function verwerkSessie(
  d: AppData,
  resultaten: { items: string[]; goed: boolean }[],
  les?: { id: string; score: number; gehaald: boolean },
): AppData {
  const nu = Date.now();
  const items = { ...d.items };
  for (const r of resultaten) for (const id of r.items) items[id] = verwerk(items[id], r.goed, nu);
  const lessen = { ...d.lessen };
  if (les?.gehaald) lessen[les.id] = { op: nu, score: Math.max(les.score, d.lessen[les.id]?.score ?? 0) };
  const dag = vandaag();
  return {
    ...d,
    items,
    lessen,
    xp: d.xp + resultaten.filter((r) => r.goed).length * 2,
    dagen: d.dagen.includes(dag) ? d.dagen : [...d.dagen, dag],
  };
}
