"use client";

// De losse oefeningsoorten. Elke oefening roept `antwoord` aan zodra je iets hebt ingevuld.

import { useEffect, useMemo, useRef, useState } from "react";
import { beoordeel, vergelijkSpraak, type Beoordeling } from "@/lib/controle";
import { getalInWoorden, getalUitspraak } from "@/lib/getallen";
import type { Oefening, Vraag } from "@/lib/oefeningen";
import { kanHerkennen, luisterNaar, spreek } from "@/lib/spraak";
import { TIJD_KORT, TIJD_NAMEN } from "@/lib/types";
import { WERKWOORDEN } from "@/lib/werkwoorden";
import { AccentToetsen, FrWoord, Luister, SOORT_NAMEN, VervoegTabel } from "../components/Frans";
import { IcoonMicrofoon } from "../components/iconen";

export interface Antwoord {
  goed: boolean;
  beoordeling?: Beoordeling;
  /** Wat de spraakherkenning hoorde. */
  gehoord?: string;
}

type Props<S extends Oefening["soort"]> = {
  oef: Extract<Oefening, { soort: S }>;
  antwoord: (a: Antwoord) => void;
  klaar: boolean;
};

export function VraagKop({ vraag }: { vraag: Vraag; klaar?: boolean }) {
  const luisterOefening = vraag.audio && !vraag.tekst;
  return (
    <div className="opgave">
      <span className="label accent">{vraag.opdracht}</span>
      {vraag.emoji && <div className="emoji">{vraag.emoji}</div>}
      {luisterOefening ? (
        <Luister tekst={vraag.audio!} groot auto />
      ) : (
        <div className="rij" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {vraag.tekst && <p className="groot">{vraag.tekst}</p>}
            {vraag.sub && <p className="zacht">{vraag.sub}</p>}
          </div>
          {vraag.audio && <Luister tekst={vraag.audio} />}
        </div>
      )}
    </div>
  );
}

// ---------- Uitleg ----------

export function UitlegWoord({ oef }: { oef: Extract<Oefening, { soort: "uitleg-woord" }> }) {
  const w = oef.woord;
  return (
    <div className="opgave">
      <span className="label accent">Nieuw woord</span>
      <div className="emoji">{w.emoji}</div>
      <div className="tussen">
        <div>
          <p className="groot" style={{ fontSize: 36 }}>
            <FrWoord woord={w} />
          </p>
          <p className="uitspraak">{w.uitspraak}</p>
        </div>
        <Luister tekst={w.vrouwelijk ? `${w.fr}, ${w.vrouwelijk}` : w.fr} auto />
      </div>
      <p className="definitie">{w.nl}</p>
      <p className="zacht klein">{SOORT_NAMEN[w.soort]}</p>
      {w.voorbeeld && (
        <div className="kaart" style={{ gap: 4 }}>
          <div className="tussen">
            <p className="citaat">{w.voorbeeld.fr}</p>
            <Luister tekst={w.voorbeeld.fr} />
          </div>
          <p className="zacht klein">{w.voorbeeld.nl}</p>
        </div>
      )}
    </div>
  );
}

export function UitlegWerkwoord({ oef }: { oef: Extract<Oefening, { soort: "uitleg-werkwoord" }> }) {
  const w = WERKWOORDEN[oef.ww];
  return (
    <div className="opgave">
      <span className="label accent">Nieuw werkwoord · {TIJD_NAMEN[oef.tijd]}</span>
      <div className="tussen">
        <div>
          <p className="groot" style={{ fontSize: 36 }}>
            {w.emoji} {w.inf}
          </p>
          <p className="uitspraak">{w.uitspraak}</p>
        </div>
        <Luister tekst={w.inf} />
      </div>
      <p className="definitie">{w.nl}</p>
      <VervoegTabel ww={oef.ww} tijd={oef.tijd} />
      {oef.tijd === "present" && w.tip && <p className="kaart hulp klein">{w.tip}</p>}
      {oef.tijd === "passe-compose" && (
        <p className="kaart hulp klein">
          {w.hulpwerkwoord === "etre"
            ? `${w.inf} gaat met être. Het deelwoord (${w.participe}) krijgt een e bij een vrouw en een s in het meervoud.`
            : `${w.inf} gaat met avoir + het deelwoord ${w.participe}.`}
        </p>
      )}
      <p className="zacht klein">Lees de vormen hardop mee en tik op het luidsprekertje om ze te horen.</p>
    </div>
  );
}

export function UitlegGetallen({ oef }: { oef: Extract<Oefening, { soort: "uitleg-getallen" }> }) {
  return (
    <div className="opgave">
      <span className="label accent">Tellen · {TIJD_KORT.present}</span>
      <p className="tekst-2">Luister en lees mee. Let op het patroon.</p>
      <div className="tabelwrap">
        <table className="tabel">
          <tbody>
            {oef.getallen.map((n) => (
              <tr key={n}>
                <td style={{ fontWeight: 700, width: 64 }}>{n}</td>
                <td className="fr">{getalInWoorden(n)}</td>
                <td className="uitspraak klein">{getalUitspraak(n)}</td>
                <td style={{ width: 48 }}>
                  <Luister tekst={getalInWoorden(n)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Meerkeuze ----------

export function Kies({ oef, antwoord, klaar }: Props<"kies">) {
  const [gekozen, setGekozen] = useState<number | null>(null);
  return (
    <>
      <VraagKop vraag={oef.vraag} klaar={klaar} />
      <div className="keuzes">
        {oef.opties.map((o, i) => {
          const status = klaar ? (i === oef.juist ? "juist" : i === gekozen ? "onjuist" : "") : "";
          return (
            <button
              key={o.tekst}
              className={`keuze ${status}`}
              disabled={klaar}
              onClick={() => {
                setGekozen(i);
                antwoord({ goed: i === oef.juist });
              }}
            >
              {o.emoji && <span className="emoji klein">{o.emoji}</span>}
              <span>{o.tekst}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ---------- Typen ----------

export function Typ({ oef, antwoord, klaar }: Props<"typ">) {
  const [waarde, setWaarde] = useState("");
  const veld = useRef<HTMLInputElement>(null);
  useEffect(() => {
    veld.current?.focus();
  }, []);
  const controleer = () => {
    if (!waarde.trim() || klaar) return;
    const b = beoordeel(waarde, oef.antwoorden, { getal: oef.getal });
    antwoord({ goed: b.uitslag !== "fout", beoordeling: b });
  };
  const cijfers = oef.antwoorden.every((a) => /^\d+$/.test(a));
  return (
    <>
      <VraagKop vraag={oef.vraag} klaar={klaar} />
      <input
        ref={veld}
        className="invoer"
        value={waarde}
        disabled={klaar}
        onChange={(e) => setWaarde(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            controleer();
          }
        }}
        placeholder={oef.plaatshouder ?? "Typ je antwoord…"}
        inputMode={cijfers ? "numeric" : "text"}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        lang="fr"
      />
      {!cijfers && !klaar && <AccentToetsen veld={veld} zet={setWaarde} />}
      {!klaar && (
        <button className="knop breed" onClick={controleer} disabled={!waarde.trim()}>
          Controleer
        </button>
      )}
    </>
  );
}

// ---------- Zin bouwen ----------

export function Bouw({ oef, antwoord, klaar }: Props<"bouw">) {
  const [gekozen, setGekozen] = useState<number[]>([]);
  const zin = gekozen.map((i) => oef.tegels[i]).join(" ");
  const controleer = () => {
    const b = beoordeel(zin, [oef.antwoord, ...oef.alt]);
    // Fout? Vergelijk dan met de zin die je met deze tegels kon bouwen.
    antwoord({ goed: b.uitslag !== "fout", beoordeling: b.uitslag === "fout" ? beoordeel(zin, [oef.antwoord]) : b });
  };
  return (
    <>
      <VraagKop vraag={oef.vraag} klaar={klaar} />
      <div className="tegels antwoord" aria-label="Jouw zin">
        {gekozen.map((i, k) => (
          <button key={k} className="tegel-knop" disabled={klaar} onClick={() => setGekozen(gekozen.filter((x) => x !== i))}>
            {oef.tegels[i]}
          </button>
        ))}
      </div>
      <div className="tegels" aria-label="Woorden">
        {oef.tegels.map((t, i) => (
          <button key={i} className={`tegel-knop ${gekozen.includes(i) ? "gebruikt" : ""}`} disabled={klaar || gekozen.includes(i)} onClick={() => setGekozen([...gekozen, i])}>
            {t}
          </button>
        ))}
      </div>
      {!klaar && (
        <button className="knop breed" onClick={controleer} disabled={gekozen.length === 0}>
          Controleer
        </button>
      )}
    </>
  );
}

// ---------- Koppelen ----------

export function Koppel({ oef, antwoord, klaar }: Props<"koppel">) {
  const rechts = useMemo(() => [...oef.paren].sort(() => Math.random() - 0.5).map((p) => p.rechts), [oef]);
  const [links, setLinks] = useState<number | null>(null);
  const [rechtsKeuze, setRechtsKeuze] = useState<number | null>(null);
  const [af, setAf] = useState<Set<number>>(new Set());
  const [fout, setFout] = useState<[number, number] | null>(null);
  const [fouten, setFouten] = useState(0);

  const probeer = (l: number | null, r: number | null) => {
    if (l === null || r === null) return;
    if (oef.paren[l].rechts === rechts[r]) {
      const nieuw = new Set(af).add(l);
      setAf(nieuw);
      setLinks(null);
      setRechtsKeuze(null);
      if (nieuw.size === oef.paren.length) antwoord({ goed: fouten === 0 });
    } else {
      setFouten((f) => f + 1);
      setFout([l, r]);
      setTimeout(() => {
        setFout(null);
        setLinks(null);
        setRechtsKeuze(null);
      }, 600);
    }
  };

  return (
    <>
      <span className="label accent">{oef.opdracht}</span>
      <div className="koppel">
        <div className="keuzes">
          {oef.paren.map((p, i) => (
            <button
              key={p.links}
              className={`keuze ${af.has(i) ? "juist weg" : fout?.[0] === i ? "onjuist" : links === i ? "gekozen" : ""}`}
              disabled={af.has(i) || klaar}
              onClick={() => {
                setLinks(i);
                if (p.audio) spreek(p.audio);
                probeer(i, rechtsKeuze);
              }}
            >
              {p.links}
            </button>
          ))}
        </div>
        <div className="keuzes">
          {rechts.map((r, i) => {
            const klaarRechts = [...af].some((l) => oef.paren[l].rechts === r);
            return (
              <button
                key={r}
                className={`keuze ${klaarRechts ? "juist weg" : fout?.[1] === i ? "onjuist" : rechtsKeuze === i ? "gekozen" : ""}`}
                disabled={klaarRechts || klaar}
                onClick={() => {
                  setRechtsKeuze(i);
                  probeer(links, i);
                }}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ---------- Spreken ----------

export function Spreek({ oef, antwoord, klaar, overslaan }: Props<"spreek"> & { overslaan: () => void }) {
  const [status, setStatus] = useState<"klaar" | "luistert" | string>("klaar");
  const kan = useMemo(() => kanHerkennen(), []);
  const start = () => {
    setStatus("luistert");
    luisterNaar(
      (t) => {
        setStatus("klaar");
        const { goed, gehoord } = vergelijkSpraak(t, oef.doel);
        antwoord({ goed, gehoord });
      },
      (melding) => setStatus(melding),
    );
  };
  return (
    <>
      <VraagKop vraag={{ ...oef.vraag, audio: undefined }} klaar={klaar} />
      <div className="rij" style={{ justifyContent: "center" }}>
        <span className="zacht klein">Eerst horen hoe het klinkt?</span>
        <Luister tekst={oef.doel} />
      </div>
      {kan ? (
        <>
          <button className="knop breed" onClick={start} disabled={klaar || status === "luistert"} style={{ minHeight: 72 }}>
            <IcoonMicrofoon />
            {status === "luistert" ? "Ik luister… spreek nu" : "Tik en spreek"}
          </button>
          {status !== "klaar" && status !== "luistert" && <p className="zacht klein">{status}</p>}
        </>
      ) : (
        <p className="zacht klein">Je browser kan geen spraak herkennen. Zeg het hardop en ga dan verder.</p>
      )}
      {!klaar && (
        <button className="linkknop" onClick={kan ? overslaan : () => antwoord({ goed: true })}>
          {kan ? "Ik kan nu niet spreken" : "Ik heb het hardop gezegd"}
        </button>
      )}
    </>
  );
}
