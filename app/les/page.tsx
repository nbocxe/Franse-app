"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { HOOFDSTUKKEN } from "@/lib/cursus";
import { bouwLes, lesOpen, lessenVan, TOETS_DREMPEL, vindLes } from "@/lib/lessen";
import { lesLink } from "@/lib/links";
import type { Oefening } from "@/lib/oefeningen";
import { useAppData, verwerkSessie } from "@/lib/opslag";
import { useSpraak } from "../components/Frans";
import { Einde } from "../speler/Einde";
import { Speler } from "../speler/Speler";

function Les() {
  const [data, wijzig] = useAppData();
  const router = useRouter();
  const id = useSearchParams().get("id") ?? "";
  const les = vindLes(id);
  const [oefeningen, setOefeningen] = useState<Oefening[] | null>(null);
  const [einde, setEinde] = useState<{ score: number; aantal: number } | null>(null);
  useSpraak(data);

  if (!data) return null;
  if (!les) return <p>Deze les bestaat niet. <Link href="/">Terug naar het leerpad</Link></p>;
  if (!lesOpen(les, data.lessen, data.instellingen.allesVrij)) {
    return (
      <>
        <h1>Nog even geduld</h1>
        <p className="tekst-2">Rond eerst de vorige les af. Wil je vrij rondkijken? Zet dan in je profiel ‘Alle lessen openen’ aan.</p>
        <Link className="knop" href={`/hoofdstuk?h=${les.hoofdstuk}`}>Naar het hoofdstuk</Link>
      </>
    );
  }

  const naarHoofdstuk = () => router.push(`/hoofdstuk?h=${les.hoofdstuk}`);

  if (einde) {
    const toets = les.soort === "toets";
    const gehaald = !toets || einde.score >= TOETS_DREMPEL;
    const h = HOOFDSTUKKEN.find((x) => x.nummer === les.hoofdstuk)!;
    const lessen = lessenVan(h);
    const volgende = toets
      ? HOOFDSTUKKEN.find((x) => x.nummer === les.hoofdstuk + 1)
      : undefined;
    const volgendeLes = lessen[lessen.findIndex((l) => l.id === les.id) + 1];
    return (
      <Einde
        score={einde.score}
        aantal={einde.aantal}
        titel={toets ? (gehaald ? "Toets gehaald!" : "Nog niet gehaald") : "Les af!"}
        tekst={
          toets
            ? gehaald
              ? volgende
                ? `Hoofdstuk ${volgende.nummer} is nu open: ${volgende.titel}.`
                : "Je hebt de hele cursus afgerond. Chapeau !"
              : `Je hebt ${Math.round(TOETS_DREMPEL * 100)}% nodig. Oefen de woorden en werkwoorden nog even en probeer het opnieuw.`
            : undefined
        }
      >
        {gehaald && volgendeLes && (
          <Link className="knop breed" href={lesLink(volgendeLes.id)}>
            Volgende: {volgendeLes.titel}
          </Link>
        )}
        {gehaald && volgende && (
          <Link className="knop breed" href={`/grammatica?h=${volgende.nummer}`}>
            Naar hoofdstuk {volgende.nummer}
          </Link>
        )}
        {!gehaald && (
          <button className="knop breed" onClick={() => { setEinde(null); setOefeningen(null); }}>
            Opnieuw proberen
          </button>
        )}
      </Einde>
    );
  }

  if (!oefeningen) {
    const lijst = bouwLes(les, Math.random, data.instellingen);
    return (
      <>
        <div className="kop">
          <span className="label">Hoofdstuk {les.hoofdstuk}</span>
          <h1>{les.titel}</h1>
        </div>
        <p className="tekst-2">{les.sub}</p>
        <p className="zacht klein">
          {lijst.length} stappen · luisteren, schrijven en doen door elkaar. Zet je geluid aan.
        </p>
        <div className="duw" />
        <button className="knop breed" onClick={() => setOefeningen(lijst)}>
          Begin
        </button>
        <button className="linkknop" onClick={naarHoofdstuk}>
          Terug
        </button>
      </>
    );
  }

  return (
    <Speler
      oefeningen={oefeningen}
      stop={naarHoofdstuk}
      klaar={(resultaten, score) => {
        const gehaald = les.soort !== "toets" || score >= TOETS_DREMPEL;
        wijzig((d) => verwerkSessie(d, resultaten, { id: les.id, score, gehaald }));
        setEinde({ score, aantal: resultaten.length });
      }}
    />
  );
}

export default function Pagina() {
  return (
    <Suspense>
      <Les />
    </Suspense>
  );
}
