"use client";

// Speelt een reeks oefeningen af: één per scherm, met directe feedback.
// Wat je fout had komt aan het eind nog een keer terug.

import { useCallback, useEffect, useState } from "react";
import type { Oefening } from "@/lib/oefeningen";
import { Luister } from "../components/Frans";
import { Sessiekop } from "../components/Sessiekop";
import { useSessieModus } from "../components/TabBalk";
import { Bouw, Kies, Koppel, Spreek, Typ, UitlegGetallen, UitlegWerkwoord, UitlegWoord, type Antwoord } from "./onderdelen";

export interface Resultaat {
  items: string[];
  goed: boolean;
}

interface Stap {
  oef: Oefening;
  /** Index in de oorspronkelijke reeks; herhalingen tellen niet mee voor de score. */
  bron: number;
  herhaling: boolean;
}

const isUitleg = (o: Oefening) => o.soort.startsWith("uitleg");

export function Speler({
  oefeningen,
  klaar,
  stop,
}: {
  oefeningen: Oefening[];
  klaar: (resultaten: Resultaat[], score: number) => void;
  stop: () => void;
}) {
  const [rij, setRij] = useState<Stap[]>(() => oefeningen.map((oef, bron) => ({ oef, bron, herhaling: false })));
  const [positie, setPositie] = useState(0);
  const [antwoord, setAntwoord] = useState<Antwoord | null>(null);
  const [resultaten, setResultaten] = useState<Map<number, Resultaat>>(new Map());
  useSessieModus(true);

  const stap = rij[positie];

  const verwerk = (a: Antwoord) => {
    setAntwoord(a);
    if (!stap.herhaling && !resultaten.has(stap.bron)) {
      setResultaten(new Map(resultaten).set(stap.bron, { items: stap.oef.items, goed: a.goed }));
    }
    // Fout? Dan komt de oefening aan het eind nog één keer terug.
    if (!a.goed && !stap.herhaling) setRij((r) => [...r, { ...stap, herhaling: true }]);
  };

  const verder = useCallback(() => {
    setAntwoord(null);
    if (positie + 1 >= rij.length) {
      const lijst = [...resultaten.values()];
      const score = lijst.length ? lijst.filter((r) => r.goed).length / lijst.length : 1;
      klaar(lijst, score);
    } else {
      setPositie(positie + 1);
    }
  }, [positie, rij.length, resultaten, klaar]);

  /** "Ik kan nu niet luisteren/spreken": sla deze soort oefening de rest van de sessie over. */
  const slaSoortOver = (soort: "luisteren" | "spreken") => {
    const blijft = (s: Stap, i: number) => i <= positie || s.oef.vaardigheid !== soort;
    const nieuw = rij.filter(blijft);
    // Ook de huidige oefening overslaan.
    nieuw.splice(positie, 1);
    setRij(nieuw);
    setAntwoord(null);
    if (positie >= nieuw.length) {
      const lijst = [...resultaten.values()];
      klaar(lijst, lijst.length ? lijst.filter((r) => r.goed).length / lijst.length : 1);
    }
  };

  // Enter = doorgaan na het antwoord of na een uitlegscherm.
  useEffect(() => {
    if (!stap) return;
    if (!antwoord && !isUitleg(stap.oef)) return;
    const toets = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.repeat) {
        e.preventDefault();
        verder();
      }
    };
    const t = setTimeout(() => window.addEventListener("keydown", toets), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", toets);
    };
  }, [antwoord, stap, verder]);

  if (!stap) return null;
  const { oef } = stap;
  const sleutel = `${positie}-${stap.bron}-${stap.herhaling}`;
  const props = { antwoord: verwerk, klaar: antwoord !== null };

  return (
    <>
      <Sessiekop positie={positie} totaal={rij.length} stop={stop} />
      {stap.herhaling && <span className="badge accent" style={{ alignSelf: "flex-start" }}>Nog een keer</span>}

      <div className="sectie" style={{ gap: 18 }} key={sleutel}>
        {oef.soort === "uitleg-woord" && <UitlegWoord oef={oef} />}
        {oef.soort === "uitleg-werkwoord" && <UitlegWerkwoord oef={oef} />}
        {oef.soort === "uitleg-getallen" && <UitlegGetallen oef={oef} />}
        {oef.soort === "kies" && <Kies oef={oef} {...props} />}
        {oef.soort === "typ" && <Typ oef={oef} {...props} />}
        {oef.soort === "bouw" && <Bouw oef={oef} {...props} />}
        {oef.soort === "koppel" && <Koppel oef={oef} {...props} />}
        {oef.soort === "spreek" && <Spreek oef={oef} {...props} overslaan={() => slaSoortOver("spreken")} />}
        {!antwoord && oef.vaardigheid === "luisteren" && "vraag" in oef && (
          <button className="linkknop" onClick={() => slaSoortOver("luisteren")}>
            Ik kan nu niet luisteren
          </button>
        )}
      </div>

      <div className="duw" />

      {isUitleg(oef) && (
        <div className="onderbalk">
          <button className="knop breed" onClick={verder}>
            Verder
          </button>
        </div>
      )}

      {antwoord && <Feedback oef={oef} antwoord={antwoord} verder={verder} />}
    </>
  );
}

function Feedback({ oef, antwoord, verder }: { oef: Oefening; antwoord: Antwoord; verder: () => void }) {
  const b = antwoord.beoordeling;
  const uitleg = "uitleg" in oef ? oef.uitleg : undefined;
  const accent = b?.uitslag === "accent";
  const koppel = oef.soort === "koppel";
  const kop = antwoord.goed
    ? accent ? "Goed, maar let op de accenten" : "Goed zo!"
    : koppel ? "Gelukt, maar niet in één keer. Hij komt straks terug." : "Nog niet goed";
  // Het dichtstbijzijnde goede antwoord, maar liefst de hele vorm ("nous sommes" in plaats van "sommes").
  const vorm = oef.items[0]?.startsWith("v:");
  const juist = uitleg && (vorm || (b && uitleg.fr.endsWith(b.juist))) ? uitleg.fr : (b?.juist ?? uitleg?.fr);
  return (
    <div className="onderbalk">
      <div className={`feedback ${antwoord.goed ? "goed" : "fout"}`} role="status">
        <span className="kopje">{kop}</span>
        {!antwoord.goed && b?.woorden && b.woorden.length > 0 && (
          <p className="klein">
            Jij schreef:{" "}
            {b.woorden.map((w, i) => (
              <span key={i} className={w.goed ? undefined : "woord-fout"}>
                {w.woord}{" "}
              </span>
            ))}
          </p>
        )}
        {antwoord.gehoord !== undefined && <p className="klein">Ik hoorde: “{antwoord.gehoord}”</p>}
        {juist && (!antwoord.goed || accent || oef.soort === "spreek" || oef.vaardigheid === "luisteren") && (
          <div className="tussen">
            <div>
              {!antwoord.goed && <span className="klein">Goed antwoord: </span>}
              <span className="fr">{juist}</span>
              {uitleg?.uitspraak && <span className="uitspraak klein" style={{ marginLeft: 8 }}>{uitleg.uitspraak}</span>}
            </div>
            {uitleg && !/^\d+$/.test(uitleg.fr) && <Luister tekst={uitleg.fr.replace(/\(e\)s?/, "").split(" / ")[0]} />}
          </div>
        )}
        {uitleg?.nl && <p className="klein tekst-2">{uitleg.nl}</p>}
        {b?.tip && !accent && <p className="klein">💡 {b.tip}</p>}
      </div>
      <button className="knop breed" onClick={verder} autoFocus>
        Doorgaan
      </button>
    </div>
  );
}
