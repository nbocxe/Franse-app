"use client";

import { useState } from "react";
import { HOOFDSTUKKEN, woordenVan } from "@/lib/cursus";
import { zonderAccenten } from "@/lib/controle";
import { getalInWoorden, getalUitspraak } from "@/lib/getallen";
import { useAppData } from "@/lib/opslag";
import { TIJD_NAMEN } from "@/lib/types";
import { tijdenVan, WERKWOORDEN } from "@/lib/werkwoorden";
import { Blok } from "../components/Blok";
import { FrWoord, Luister, SOORT_NAMEN, useSpraak, VervoegTabel } from "../components/Frans";

const TABS = ["Werkwoorden", "Woorden", "Grammatica", "Getallen"] as const;

function Werkwoorden() {
  const [id, setId] = useState("etre");
  const w = WERKWOORDEN[id];
  return (
    <>
      <select value={id} onChange={(e) => setId(e.target.value)} aria-label="Werkwoord">
        {Object.values(WERKWOORDEN).map((x) => (
          <option key={x.id} value={x.id}>
            {x.inf} — {x.nl}
          </option>
        ))}
      </select>
      <div className="tussen">
        <div>
          <h2 style={{ fontSize: 30 }}>
            {w.emoji} {w.inf}
          </h2>
          <p className="uitspraak">{w.uitspraak}</p>
        </div>
        <Luister tekst={w.inf} />
      </div>
      <p className="tekst-2">
        {w.nl} · {w.groep === "onregelmatig" ? "onregelmatig" : `regelmatig op ${w.groep}`}
        {w.participe && ` · voltooid deelwoord: ${w.participe} (met ${w.hulpwerkwoord === "etre" ? "être" : "avoir"})`}
      </p>
      {w.tip && <p className="kaart hulp klein">{w.tip}</p>}
      {tijdenVan(w).map((t) => (
        <section key={t} className="kaart">
          <span className="label">{TIJD_NAMEN[t]}</span>
          <VervoegTabel ww={id} tijd={t} />
        </section>
      ))}
    </>
  );
}

function Woorden() {
  const [zoek, setZoek] = useState("");
  const z = zonderAccenten(zoek.toLowerCase().trim());
  const past = (s: string) => zonderAccenten(s.toLowerCase()).includes(z);
  return (
    <>
      <input type="search" placeholder="Zoek in het Frans of Nederlands…" value={zoek} onChange={(e) => setZoek(e.target.value)} />
      <p className="zacht klein">
        <span className="m">Blauw</span> = mannelijk, <span className="v">rood</span> = vrouwelijk.
      </p>
      {HOOFDSTUKKEN.map((h) => {
        const woorden = woordenVan(h).filter((w) => !z || past(w.fr) || past(w.nl) || past(w.vrouwelijk ?? ""));
        if (woorden.length === 0) return null;
        return (
          <section key={h.nummer} className="sectie">
            <span className="label">
              Hoofdstuk {h.nummer} · {h.titel}
            </span>
            <div className="lijst">
              {woorden.map((w) => (
                <div key={w.id} className="regel" style={{ cursor: "default" }}>
                  <span className="emoji klein">{w.emoji}</span>
                  <span className="groei">
                    <span className="titel serif" style={{ fontSize: 19 }}>
                      <FrWoord woord={w} />
                    </span>
                    <span className="sub">
                      <span className="uitspraak">{w.uitspraak}</span> · {w.nl} · {SOORT_NAMEN[w.soort]}
                    </span>
                  </span>
                  <Luister tekst={w.vrouwelijk ? `${w.fr}, ${w.vrouwelijk}` : w.fr} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function Grammatica() {
  return (
    <>
      {HOOFDSTUKKEN.map((h) => (
        <details key={h.nummer} className="kaart">
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>
            {h.nummer}. {h.titel}
          </summary>
          <div className="sectie" style={{ marginTop: 12 }}>
            {h.grammatica.map((b) => (
              <Blok key={b.titel} blok={b} />
            ))}
          </div>
        </details>
      ))}
    </>
  );
}

function Getallen() {
  const [n, setN] = useState(81);
  const geldig = Number.isInteger(n) && n >= 0 && n < 1_000_000;
  return (
    <>
      <p className="tekst-2">Typ een getal en zie hoe je het schrijft en uitspreekt.</p>
      <input type="number" min={0} max={999999} value={Number.isNaN(n) ? "" : n} onChange={(e) => setN(e.target.valueAsNumber)} />
      {geldig && (
        <div className="kaart">
          <div className="tussen">
            <p className="groot serif" style={{ fontSize: 26 }}>{getalInWoorden(n)}</p>
            <Luister tekst={getalInWoorden(n)} />
          </div>
          <p className="uitspraak">{getalUitspraak(n)}</p>
        </div>
      )}
      <div className="tabelwrap">
        <table className="tabel">
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 30, 40, 50, 60, 70, 71, 80, 81, 90, 91, 100, 200, 1000].map((x) => (
              <tr key={x}>
                <td style={{ fontWeight: 700, width: 64 }}>{x}</td>
                <td className="fr">{getalInWoorden(x)}</td>
                <td style={{ width: 48 }}>
                  <Luister tekst={getalInWoorden(x)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Naslag() {
  const [data] = useAppData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Werkwoorden");
  useSpraak(data);
  return (
    <>
      <div className="kop">
        <span className="label">Frans leren</span>
        <h1>Naslag</h1>
      </div>
      <div className="chips" role="tablist">
        {TABS.map((t) => (
          <button key={t} className="chip" role="tab" aria-pressed={tab === t} aria-selected={tab === t} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {tab === "Werkwoorden" && <Werkwoorden />}
      {tab === "Woorden" && <Woorden />}
      {tab === "Grammatica" && <Grammatica />}
      {tab === "Getallen" && <Getallen />}
    </>
  );
}
