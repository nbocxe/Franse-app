"use client";

import Link from "next/link";
import { useState } from "react";
import { HOOFDSTUKKEN } from "@/lib/cursus";
import { teHerhalen } from "@/lib/lessen";
import { useAppData } from "@/lib/opslag";
import { TIJD_KORT, type Tijd } from "@/lib/types";
import { tijdenVan, WERKWOORDEN } from "@/lib/werkwoorden";

const GETAL_BEREIKEN: [number, number, string][] = [
  [0, 20, "0 – 20"],
  [21, 69, "21 – 69"],
  [70, 100, "70 – 100"],
  [0, 100, "0 – 100"],
  [100, 1000, "100 – 1000"],
  [1900, 2100, "Jaartallen"],
];

/** Hoofdstukken waar je al aan begonnen bent (of alles, als je nog nergens bent). */
function begonnen(lessen: Record<string, unknown>): number[] {
  const n = HOOFDSTUKKEN.filter((h) => Object.keys(lessen).some((id) => id.startsWith(`h${h.nummer}:`))).map((h) => h.nummer);
  return n.length ? n : [1];
}

function Chips<T extends string | number>({
  opties,
  gekozen,
  zet,
  naam,
}: {
  opties: T[];
  gekozen: T[];
  zet: (x: T[]) => void;
  naam: (x: T) => string;
}) {
  return (
    <div className="chips">
      {opties.map((o) => (
        <button
          key={String(o)}
          className="chip"
          aria-pressed={gekozen.includes(o)}
          onClick={() => zet(gekozen.includes(o) ? gekozen.filter((x) => x !== o) : [...gekozen, o])}
        >
          {naam(o)}
        </button>
      ))}
    </div>
  );
}

export default function Oefenen() {
  const [data] = useAppData();
  const [hoofdstukken, setHoofdstukken] = useState<number[] | null>(null);
  const [werkwoorden, setWerkwoorden] = useState<string[]>([]);
  const [tijd, setTijd] = useState<Tijd>("present");
  const [bereik, setBereik] = useState(0);
  if (!data) return null;

  const h = hoofdstukken ?? begonnen(data.lessen);
  const herhalen = teHerhalen(data.items, Date.now()).length;
  const wwOpties = Object.values(WERKWOORDEN).filter((w) => tijdenVan(w).includes(tijd)).map((w) => w.id);
  const wwGekozen = werkwoorden.filter((w) => wwOpties.includes(w));
  const hParam = h.join(",");
  const [van, tot] = GETAL_BEREIKEN[bereik];

  return (
    <>
      <div className="kop">
        <span className="label">Frans leren</span>
        <h1>Oefenen</h1>
      </div>
      <p className="tekst-2">Oefen los van het leerpad: alleen woorden, alleen werkwoorden, tellen of zinnen.</p>

      <section className="kaart">
        <div className="tussen">
          <h2>🔁 Herhalen</h2>
          <span className="badge accent">{herhalen} klaar</span>
        </div>
        <p className="zacht klein">
          Wat je geleerd hebt komt terug vlak voordat je het zou vergeten: na 1, 2, 4, 8 dagen en steeds langer.
        </p>
        <Link
          className={`knop breed ${herhalen ? "" : "tweede"}`}
          href="/oefenen/sessie?m=herhalen"
          aria-disabled={!herhalen}
          onClick={(e) => !herhalen && e.preventDefault()}
        >
          {herhalen ? "Start herhaling" : "Niets te herhalen"}
        </Link>
      </section>

      <section className="kaart">
        <h2>🖼️ Woorden en zinnen</h2>
        <p className="zacht klein">Kies de hoofdstukken:</p>
        <Chips opties={HOOFDSTUKKEN.map((x) => x.nummer)} gekozen={h} zet={setHoofdstukken} naam={(n) => `H${n}`} />
        <div className="knoprij">
          <Link className="knop" href={`/oefenen/sessie?m=woorden&h=${hParam}`} aria-disabled={!h.length}>
            Woorden
          </Link>
          <Link className="knop tweede" href={`/oefenen/sessie?m=zinnen&h=${hParam}`} aria-disabled={!h.length}>
            Zinnen
          </Link>
        </div>
      </section>

      <section className="kaart">
        <h2>🔤 Werkwoorden vervoegen</h2>
        <div className="chips">
          {(["present", "passe-compose", "imparfait"] as Tijd[]).map((t) => (
            <button key={t} className="chip" aria-pressed={tijd === t} onClick={() => setTijd(t)}>
              {TIJD_KORT[t]}
            </button>
          ))}
        </div>
        <p className="zacht klein">Kies één werkwoord om de tabel te leren, of meer om door elkaar te oefenen:</p>
        <Chips opties={wwOpties} gekozen={wwGekozen} zet={setWerkwoorden} naam={(id) => WERKWOORDEN[id].inf} />
        <div className="knoprij">
          <button className="linkknop" style={{ alignSelf: "flex-start" }} onClick={() => setWerkwoorden(wwOpties)}>
            Alles kiezen
          </button>
        </div>
        {wwGekozen.length > 0 ? (
          <Link className="knop breed" href={`/oefenen/sessie?m=werkwoorden&w=${wwGekozen.map((w) => `${w}.${tijd}`).join(",")}`}>
            Oefen {wwGekozen.length === 1 ? WERKWOORDEN[wwGekozen[0]].inf : `${wwGekozen.length} werkwoorden`}
          </Link>
        ) : (
          <button className="knop breed" disabled>
            Kies een werkwoord
          </button>
        )}
      </section>

      <section className="kaart">
        <h2>🔢 Tellen</h2>
        <div className="chips">
          {GETAL_BEREIKEN.map(([, , naam], i) => (
            <button key={naam} className="chip" aria-pressed={bereik === i} onClick={() => setBereik(i)}>
              {naam}
            </button>
          ))}
        </div>
        <Link className="knop breed" href={`/oefenen/sessie?m=getallen&van=${van}&tot=${tot}`}>
          Oefen getallen
        </Link>
      </section>
    </>
  );
}
