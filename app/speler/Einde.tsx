"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Het scherm na een les of oefensessie. */
export function Einde({
  score,
  aantal,
  titel,
  tekst,
  children,
}: {
  score: number;
  aantal: number;
  titel: string;
  tekst?: string;
  children?: ReactNode;
}) {
  const procent = Math.round(score * 100);
  return (
    <>
      <div className="kop" style={{ alignItems: "center", textAlign: "center", marginTop: 24 }}>
        <div className="emoji">{procent >= 90 ? "🏆" : procent >= 70 ? "🎉" : "💪"}</div>
        <h1>{titel}</h1>
      </div>
      <div className="kaart" style={{ flexDirection: "row", justifyContent: "space-around", textAlign: "center" }}>
        <div className="cijfer">
          <span className="waarde">{procent}%</span>
          <span className="naam">in één keer goed</span>
        </div>
        <div className="cijfer">
          <span className="waarde">{aantal}</span>
          <span className="naam">oefeningen</span>
        </div>
      </div>
      {tekst && <p className="tekst-2" style={{ textAlign: "center" }}>{tekst}</p>}
      <div className="duw" />
      <div className="sectie">
        {children}
        <Link className="knop tweede breed" href="/">
          Naar het leerpad
        </Link>
      </div>
    </>
  );
}
