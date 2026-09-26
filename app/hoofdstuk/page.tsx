"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { hoofdstuk } from "@/lib/cursus";
import { lesOpen, lessenVan } from "@/lib/lessen";
import { lesLink } from "@/lib/links";
import { useAppData } from "@/lib/opslag";
import { TIJD_NAMEN } from "@/lib/types";
import { WERKWOORDEN } from "@/lib/werkwoorden";
import { IcoonPijl, IcoonSlot, IcoonTerug, IcoonVink } from "../components/iconen";

const LES_EMOJI = { grammatica: "📘", werkwoord: "🔤", woorden: "🖼️", zinnen: "🧩", getallen: "🔢", toets: "🎓" };

function Hoofdstuk() {
  const [data] = useAppData();
  const n = Number(useSearchParams().get("h"));
  const h = hoofdstuk(n);
  if (!data) return null;
  if (!h) return <p>Dit hoofdstuk bestaat niet. <Link href="/">Terug naar het leerpad</Link></p>;

  const lessen = lessenVan(h);
  return (
    <>
      <Link href="/" className="icoonknop" aria-label="Terug" style={{ margin: "-8px 0 -12px -8px" }}>
        <IcoonTerug />
      </Link>
      <div className="kop">
        <span className="label">Hoofdstuk {h.nummer}</span>
        <h1>{h.titel}</h1>
      </div>
      <p className="tekst-2">{h.doel}</p>
      <div className="rij">
        <span className="badge accent">{TIJD_NAMEN[h.tijd]}</span>
        {h.werkwoorden.map((w) => (
          <span key={w.id} className="badge">
            {WERKWOORDEN[w.id].emoji} {WERKWOORDEN[w.id].inf}
          </span>
        ))}
      </div>

      <div className="lijst">
        {lessen.map((les) => {
          const af = les.id in data.lessen;
          const open = lesOpen(les, data.lessen, data.instellingen.allesVrij);
          const inhoud = (
            <>
              <span className={`hoofdstuk-nr ${af ? "af" : open ? "" : "dicht"}`} style={{ fontSize: 20 }}>
                {af ? <IcoonVink /> : open ? LES_EMOJI[les.soort] : <IcoonSlot />}
              </span>
              <span className="groei">
                <span className="titel">{les.titel}</span>
                <span className="sub">
                  {les.sub}
                  {af && les.soort !== "grammatica" && ` · ${Math.round(data.lessen[les.id].score * 100)}%`}
                </span>
              </span>
              {open && <IcoonPijl />}
            </>
          );
          return open ? (
            <Link key={les.id} className="regel" href={lesLink(les.id)}>
              {inhoud}
            </Link>
          ) : (
            <div key={les.id} className="regel dicht" title="Rond eerst de vorige les af">
              {inhoud}
            </div>
          );
        })}
      </div>

      <section className="sectie">
        <h2>Los oefenen</h2>
        <div className="knoprij">
          <Link className="knop tweede" href={`/oefenen/sessie?m=woorden&h=${h.nummer}`}>
            Woorden
          </Link>
          <Link className="knop tweede" href={`/oefenen/sessie?m=werkwoorden&w=${h.werkwoorden.map((w) => `${w.id}.${w.tijden.at(-1)}`).join(",")}`}>
            Werkwoorden
          </Link>
          <Link className="knop tweede" href={`/oefenen/sessie?m=zinnen&h=${h.nummer}`}>
            Zinnen
          </Link>
        </div>
      </section>
    </>
  );
}

export default function Pagina() {
  return (
    <Suspense>
      <Hoofdstuk />
    </Suspense>
  );
}
