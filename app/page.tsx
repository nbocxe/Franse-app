"use client";

import Link from "next/link";
import { HOOFDSTUKKEN } from "@/lib/cursus";
import { lesOpen, lessenVan, teHerhalen } from "@/lib/lessen";
import { lesLink } from "@/lib/links";
import { reeks, useAppData } from "@/lib/opslag";
import { TIJD_KORT } from "@/lib/types";
import { WERKWOORDEN } from "@/lib/werkwoorden";
import { IcoonPijl, IcoonSlot, IcoonVink } from "./components/iconen";

export default function Leerpad() {
  const [data] = useAppData();
  if (!data) return null;

  const alleLessen = HOOFDSTUKKEN.flatMap(lessenVan);
  const volgende = alleLessen.find((l) => !(l.id in data.lessen) && lesOpen(l, data.lessen, data.instellingen.allesVrij));
  const herhalen = teHerhalen(data.items, Date.now()).length;
  const dagen = reeks(data.dagen);
  const nieuw = Object.keys(data.lessen).length === 0;

  return (
    <>
      <div className="kop">
        <span className="label">Frans leren</span>
        <h1>{nieuw ? "Bienvenue !" : "Leerpad"}</h1>
      </div>

      {nieuw && (
        <p className="tekst-2">
          Je leert Frans zoals uit een lesboek. Elk hoofdstuk begint met de grammatica en leert je drie
          werkwoorden en de woorden om er meteen zinnen mee te maken. Je luistert, schrijft, bouwt zinnen en
          spreekt. Eerst in de tegenwoordige tijd, daarna in de verleden tijd.
        </p>
      )}

      {!nieuw && (
        <div className="cijfers" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          <div className="cijfer">
            <span className="waarde">🔥 {dagen}</span>
            <span className="naam">{dagen === 1 ? "dag" : "dagen"} op rij</span>
          </div>
          <div className="cijfer">
            <span className="waarde">{data.xp}</span>
            <span className="naam">punten</span>
          </div>
          <div className="cijfer">
            <span className="waarde">{Object.keys(data.items).filter((i) => i.startsWith("w:")).length}</span>
            <span className="naam">woorden</span>
          </div>
        </div>
      )}

      {volgende && (
        <div className="kaart">
          <span className="label accent">{nieuw ? "Begin hier" : "Ga verder"}</span>
          <div>
            <p style={{ fontWeight: 600 }}>{volgende.titel}</p>
            <p className="zacht klein">
              Hoofdstuk {volgende.hoofdstuk} · {volgende.sub}
            </p>
          </div>
          <Link className="knop breed" href={lesLink(volgende.id)}>
            {nieuw ? "Start hoofdstuk 1" : "Verder leren"}
          </Link>
        </div>
      )}

      {herhalen > 0 && (
        <div className="kaart" style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <span className="serif" style={{ fontSize: 44, lineHeight: 1, color: "var(--accent)" }}>{herhalen}</span>
          <span style={{ flexGrow: 1, fontWeight: 600 }}>{herhalen === 1 ? "item" : "items"} om te herhalen</span>
          <Link className="knop" href="/oefenen/sessie?m=herhalen">
            Herhalen
          </Link>
        </div>
      )}

      <section className="sectie">
        <h2>Hoofdstukken</h2>
        <div className="lijst">
          {HOOFDSTUKKEN.map((h) => {
            const lessen = lessenVan(h);
            const af = lessen.filter((l) => l.id in data.lessen).length;
            const open = lesOpen(lessen[0], data.lessen, data.instellingen.allesVrij);
            const klaar = af === lessen.length;
            const vorigeTijd = HOOFDSTUKKEN[h.nummer - 2]?.tijd;
            return (
              <div key={h.nummer}>
                {vorigeTijd && vorigeTijd !== h.tijd && (
                  <div className="label" style={{ padding: "12px 14px 0" }}>
                    Vanaf hier: {h.tijd === "passe-compose" ? "verleden tijd" : "nog een verleden tijd"} ({TIJD_KORT[h.tijd]})
                  </div>
                )}
                <Link className={`regel ${open ? "" : "dicht"}`} href={`/hoofdstuk?h=${h.nummer}`}>
                  <span className={`hoofdstuk-nr ${klaar ? "af" : open ? "" : "dicht"}`}>
                    {klaar ? <IcoonVink /> : open ? h.nummer : <IcoonSlot />}
                  </span>
                  <span className="groei">
                    <span className="titel">{h.titel}</span>
                    <span className="sub">
                      {h.werkwoorden.map((w) => WERKWOORDEN[w.id].inf).join(", ")} · {af}/{lessen.length} lessen
                    </span>
                  </span>
                  <IcoonPijl />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
