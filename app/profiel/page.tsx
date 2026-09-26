"use client";

import { useEffect, useRef, useState } from "react";
import { HOOFDSTUKKEN, woordenVan } from "@/lib/cursus";
import { leeg, pasThemaToe, reeks, useAppData } from "@/lib/opslag";
import { fransStemmen, isGoedeStem, kanHerkennen, kanVoorlezen, spreek, stelSpraakIn } from "@/lib/spraak";
import { beheersing } from "@/lib/srs";
import type { AppData, Instellingen } from "@/lib/types";
import { WERKWOORDEN } from "@/lib/werkwoorden";

function Schakelaar({ label, uitleg, aan, zet }: { label: string; uitleg?: string; aan: boolean; zet: (v: boolean) => void }) {
  return (
    <label className="schakelaar">
      <span>
        {label}
        {uitleg && <span className="zacht klein" style={{ display: "block" }}>{uitleg}</span>}
      </span>
      <input type="checkbox" checked={aan} onChange={(e) => zet(e.target.checked)} />
    </label>
  );
}

function gemiddelde(items: string[], data: AppData): number {
  if (items.length === 0) return 0;
  return items.reduce((s, id) => s + beheersing(data.items[id]), 0) / items.length;
}

export default function Profiel() {
  const [data, wijzig] = useAppData();
  const [stemmen, setStemmen] = useState<SpeechSynthesisVoice[]>([]);
  const bestand = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!kanVoorlezen()) return;
    const laad = () => setStemmen(fransStemmen());
    laad();
    window.speechSynthesis.addEventListener("voiceschanged", laad);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", laad);
  }, []);

  if (!data) return null;
  const inst = data.instellingen;
  const zet = (deel: Partial<Instellingen>) => {
    const nieuw = { ...inst, ...deel };
    stelSpraakIn(nieuw.stem, nieuw.snelheid);
    pasThemaToe(nieuw.thema);
    wijzig((d) => ({ ...d, instellingen: nieuw }));
  };

  const woorden = Object.keys(data.items).filter((i) => i.startsWith("w:")).length;
  const vormen = Object.keys(data.items).filter((i) => i.startsWith("v:")).length;
  const zinnen = Object.keys(data.items).filter((i) => i.startsWith("z:")).length;

  const exporteer = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `frans-leren-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importeer = async (f: File) => {
    try {
      const d = JSON.parse(await f.text());
      if (d.versie !== 1 || typeof d.items !== "object") throw new Error();
      wijzig(() => ({ ...leeg(), ...d }));
      alert("Je back-up is teruggezet.");
    } catch {
      alert("Dit bestand is geen geldige back-up.");
    }
  };

  return (
    <>
      <div className="kop">
        <span className="label">Frans leren</span>
        <h1>Profiel</h1>
      </div>

      <div className="cijfers">
        <div className="cijfer"><span className="waarde">🔥 {reeks(data.dagen)}</span><span className="naam">dagen op rij</span></div>
        <div className="cijfer"><span className="waarde">{woorden}</span><span className="naam">woorden</span></div>
        <div className="cijfer"><span className="waarde">{vormen}</span><span className="naam">werkwoordsvormen</span></div>
        <div className="cijfer"><span className="waarde">{zinnen}</span><span className="naam">zinnen</span></div>
      </div>

      <section className="sectie">
        <h2>Hoe goed ken je elk hoofdstuk?</h2>
        <p className="zacht klein">Gebaseerd op je herhalingen: hoe vaker achter elkaar goed, hoe voller de balk.</p>
        <div className="kaart" style={{ gap: 10 }}>
          {HOOFDSTUKKEN.map((h) => {
            const items = [
              ...woordenVan(h).map((w) => `w:${w.id}`),
              ...h.werkwoorden.flatMap((w) => w.tijden.flatMap((t) => [0, 1, 2, 3, 4, 5].map((p) => `v:${w.id}:${t}:${p}`))),
            ];
            const g = gemiddelde(items, data);
            return (
              <div key={h.nummer} className="methoderij" style={{ gridTemplateColumns: "140px minmax(0, 1fr) 48px" }}>
                <span className="klein">{h.nummer}. {h.werkwoorden.map((w) => WERKWOORDEN[w.id].inf).join(", ")}</span>
                <div className="balk"><div style={{ width: `${g * 100}%` }} /></div>
                <span className="waarde">{Math.round(g * 100)}%</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="sectie">
        <h2>Instellingen</h2>
        <div className="kaart" style={{ gap: 4 }}>
          <div className="schakelaar">
            <span>Weergave</span>
            <div className="chips" role="radiogroup" aria-label="Weergave">
              {([["licht", "☀️ Licht"], ["donker", "🌙 Donker"], ["auto", "Automatisch"]] as const).map(([t, naam]) => (
                <button key={t} className="chip" role="radio" aria-checked={inst.thema === t} aria-pressed={inst.thema === t} onClick={() => zet({ thema: t })}>
                  {naam}
                </button>
              ))}
            </div>
          </div>
          <Schakelaar label="Luisteroefeningen" uitleg="Uit als je geen geluid kunt gebruiken." aan={inst.luisteren} zet={(v) => zet({ luisteren: v })} />
          <Schakelaar
            label="Spreekoefeningen"
            uitleg={kanHerkennen() ? "Je zegt zinnen hardop; de app luistert mee." : "Je browser ondersteunt geen spraakherkenning (probeer Chrome of Safari)."}
            aan={inst.spreken}
            zet={(v) => zet({ spreken: v })}
          />
          <Schakelaar label="Alle lessen openen" uitleg="Spring vrij door de cursus, zonder volgorde." aan={inst.allesVrij} zet={(v) => zet({ allesVrij: v })} />
          <label className="sectie" style={{ gap: 6, marginTop: 8 }}>
            <span>Franse stem</span>
            <select value={inst.stem} onChange={(e) => zet({ stem: e.target.value })}>
              <option value="">Automatisch</option>
              {stemmen.map((s) => (
                <option key={s.name} value={s.name}>
                  {isGoedeStem(s) ? "★ " : ""}
                  {s.name} ({s.lang})
                </option>
              ))}
            </select>
            {stemmen.length === 0 && (
              <span className="zacht klein">
                Geen Franse stem gevonden op dit apparaat. Dan leest je apparaat het Frans voor met een Nederlandse of
                Engelse stem, en dat klinkt slecht. Zie hieronder hoe je een goede stem krijgt.
              </span>
            )}
            {stemmen.length > 0 && !stemmen.some(isGoedeStem) && (
              <span className="zacht klein">Op dit apparaat staan alleen de eenvoudige, robotachtige stemmen. Zie hieronder hoe je een betere krijgt.</span>
            )}
          </label>
          <label className="sectie" style={{ gap: 6, marginTop: 8 }}>
            <span>Spreeksnelheid: {inst.snelheid.toFixed(2)}×</span>
            <input type="range" min={0.5} max={1.2} step={0.05} value={inst.snelheid} onChange={(e) => zet({ snelheid: Number(e.target.value) })} />
          </label>
          <button className="linkknop" onClick={() => spreek("Bonjour ! Je m'appelle Claire. J'habite à Paris. Un café, s'il vous plaît.")}>
            Probeer de stem
          </button>
          <details className="klein tekst-2">
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>Hoe krijg ik een betere stem?</summary>
            <p style={{ marginTop: 8 }}>
              De app gebruikt de stemmen van je eigen apparaat; de natuurlijke stemmen staan met een ★ in de lijst. Zo krijg je er een:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>iPhone/iPad:</strong> Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen → Frans. Download een stem met ‘Verbeterd’ of ‘Premium’, bijv. Amélie of Thomas. Kies hem daarna hierboven.</li>
              <li><strong>Mac:</strong> Systeeminstellingen → Toegankelijkheid → Gesproken materiaal → Systeemstem → Beheer stemmen → Frans (Premium of Verbeterd).</li>
              <li><strong>Windows/Android:</strong> open de app in <strong>Microsoft Edge</strong>. Die heeft gratis natuurlijke stemmen, zoals ‘Denise Online (Natural)’. In Chrome is ‘Google français’ ook goed.</li>
            </ul>
            <p>Herlaad de app na het installeren van een stem.</p>
          </details>
        </div>
      </section>

      <section className="sectie">
        <h2>Je gegevens</h2>
        <p className="zacht klein">Alles staat alleen in deze browser. Maak af en toe een back-up.</p>
        <div className="knoprij">
          <button className="knop tweede" onClick={exporteer}>Back-up maken</button>
          <button className="knop tweede" onClick={() => bestand.current?.click()}>Back-up terugzetten</button>
          <input ref={bestand} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importeer(e.target.files[0])} />
        </div>
        <button
          className="linkknop"
          style={{ alignSelf: "flex-start", color: "var(--fout)" }}
          onClick={() => confirm("Weet je het zeker? Al je voortgang wordt gewist.") && wijzig(() => ({ ...leeg(), instellingen: inst }))}
        >
          Opnieuw beginnen
        </button>
      </section>
    </>
  );
}
