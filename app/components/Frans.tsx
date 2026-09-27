"use client";

// Kleine bouwstenen die overal terugkomen: voorleesknop, woord in geslachtskleur,
// opgemaakte uitlegtekst, vervoegingstabel en accenttoetsen.

import { Fragment, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { spreek, stelSpraakIn } from "@/lib/spraak";
import type { AppData, Tijd, Woord } from "@/lib/types";
import { toonVorm, vervoeg, WERKWOORDEN } from "@/lib/werkwoorden";
import { IcoonLuister } from "./iconen";

/** Zorgt dat het voorlezen de gekozen stem en snelheid gebruikt. */
export function useSpraak(data: AppData | null) {
  useEffect(() => {
    if (data) stelSpraakIn(data.instellingen.stem, data.instellingen.snelheid);
  }, [data]);
}

/** Luidspreker (normaal) en schildpad (langzaam). */
export function Luister({ tekst, groot = false, auto = false }: { tekst: string; groot?: boolean; auto?: boolean }) {
  const [bezig, setBezig] = useState(false);
  const speel = (langzaam = false) => {
    setBezig(true);
    spreek(tekst, { langzaam, klaar: () => setBezig(false) });
  };
  useEffect(() => {
    if (!auto) return;
    // Heel even wachten, zodat het scherm eerst staat.
    const t = setTimeout(() => spreek(tekst), 250);
    return () => clearTimeout(t);
  }, [auto, tekst]);

  if (groot) {
    return (
      <div className="rij" style={{ justifyContent: "center", gap: 16 }}>
        <button className="icoonknop grote-luister" onClick={() => speel()} aria-label="Luister">
          <IcoonLuister />
        </button>
        <button className="icoonknop" style={{ fontSize: 30, width: 60, height: 60 }} onClick={() => speel(true)} aria-label="Luister langzaam">
          🐢
        </button>
      </div>
    );
  }
  return (
    <span className="luister">
      <button className="icoonknop" onClick={() => speel()} aria-label={`Luister: ${tekst}`} aria-busy={bezig}>
        <IcoonLuister />
      </button>
    </span>
  );
}

/** Frans woord in de kleur van het geslacht (blauw = mannelijk, rood = vrouwelijk). */
export function FrWoord({ woord }: { woord: Woord }) {
  const kleur = woord.soort === "m" ? "m" : woord.soort === "v" ? "v" : undefined;
  return (
    <span className={kleur}>
      {woord.fr}
      {woord.vrouwelijk && (
        <>
          {" "}
          <span className="zacht">/</span> <span className="v">{woord.vrouwelijk}</span>
        </>
      )}
    </span>
  );
}

export const SOORT_NAMEN: Record<Woord["soort"], string> = {
  m: "mannelijk", v: "vrouwelijk", mv: "meervoud", bn: "bijvoeglijk naamwoord", bw: "bijwoord",
  vz: "voorzetsel", vnw: "voornaamwoord", uitdr: "uitdrukking", vw: "voegwoord", ww: "werkwoord",
};

/** Zet **vet** en *schuin* om in opmaak. */
export function Opmaak({ tekst }: { tekst: string }) {
  const delen = tekst.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {delen.map((d, i) => {
        if (d.startsWith("**")) return <strong key={i}>{d.slice(2, -2)}</strong>;
        if (d.startsWith("*")) return <em key={i}>{d.slice(1, -1)}</em>;
        return <Fragment key={i}>{d}</Fragment>;
      })}
    </>
  );
}

/** Kleurt het wederkerende voornaamwoord: je <m'>appelle, nous <nous> appelons. */
function MetWederkerend({ tekst }: { tekst: string }) {
  const m = tekst.match(/^(je |tu |il\/elle |nous |vous |ils\/elles )(me |m'|te |t'|se |s'|nous |vous )(.+)$/);
  if (!m) return <>{tekst}</>;
  return (
    <>
      {m[1]}
      <span className="wederkerend">{m[2]}</span>
      {m[3]}
    </>
  );
}

export function VervoegTabel({ ww, tijd }: { ww: string; tijd: Tijd }) {
  const vormen = vervoeg(WERKWOORDEN[ww], tijd);
  return (
    <div className="tabelwrap">
      <table className="tabel">
        <tbody>
          {vormen.map((v) => (
            <tr key={v.persoon}>
              <td className="fr">
                <MetWederkerend tekst={toonVorm(v)} />
              </td>
              <td className="uitspraak klein">{v.uitspraak}</td>
              <td style={{ width: 48 }}>
                <Luister tekst={v.volledig.replace(/\(e\)s?/, "")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ACCENTEN = ["é", "è", "ê", "à", "â", "ç", "ù", "û", "ô", "î", "ï", "ë", "œ", "'"];

/** Knoppen om Franse tekens in te voegen op de plek van de cursor. */
export function AccentToetsen({ veld, zet }: { veld: RefObject<HTMLInputElement | null>; zet: (waarde: string) => void }) {
  const voegIn = (teken: string) => {
    const el = veld.current;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const eind = el.selectionEnd ?? el.value.length;
    const nieuw = el.value.slice(0, start) + teken + el.value.slice(eind);
    zet(nieuw);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + teken.length, start + teken.length);
    });
  };
  return (
    <div className="accenten" aria-label="Franse tekens">
      {ACCENTEN.map((a) => (
        <button key={a} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => voegIn(a)}>
          {a}
        </button>
      ))}
    </div>
  );
}

export function useFocus<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
}

export function Kaart({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`kaart ${className}`}>{children}</div>;
}
