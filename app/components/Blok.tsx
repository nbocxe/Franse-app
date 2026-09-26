"use client";

import type { Uitlegblok } from "@/lib/types";
import { Luister, Opmaak } from "./Frans";

/** Eén blok grammatica-uitleg: tekst, tabel en voorbeeldzinnen om te beluisteren. */
export function Blok({ blok }: { blok: Uitlegblok }) {
  return (
    <section className="kaart" style={{ gap: 12 }}>
      <h2>{blok.titel}</h2>
      {blok.tekst.map((t, i) => (
        <p key={i} className="tekst-2">
          <Opmaak tekst={t} />
        </p>
      ))}
      {blok.tabel && (
        <div className="tabelwrap">
          <table className="tabel">
            {blok.tabel.kop && (
              <thead>
                <tr>
                  {blok.tabel.kop.map((k, i) => (
                    <th key={i}>{k}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {blok.tabel.rijen.map((rij, i) => (
                <tr key={i}>
                  {rij.map((c, j) => (
                    <td key={j} className={j > 0 || !blok.tabel!.kop ? "fr" : undefined}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {blok.voorbeelden?.map((v) => (
        <div key={v.fr} className="tussen">
          <div>
            <p className="citaat">{v.fr}</p>
            <p className="zacht klein">{v.nl}</p>
          </div>
          <Luister tekst={v.fr} />
        </div>
      ))}
    </section>
  );
}
