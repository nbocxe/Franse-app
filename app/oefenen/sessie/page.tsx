"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { filter, getallenOefeningen, herhaalModule, werkwoordenModule, woordenModule, zinnenModule } from "@/lib/lessen";
import type { Oefening } from "@/lib/oefeningen";
import { useAppData, verwerkSessie } from "@/lib/opslag";
import type { AppData, Tijd } from "@/lib/types";
import { useSpraak } from "../../components/Frans";
import { Einde } from "../../speler/Einde";
import { Speler } from "../../speler/Speler";

const TITELS: Record<string, string> = {
  herhalen: "Herhalen",
  woorden: "Woorden oefenen",
  werkwoorden: "Werkwoorden oefenen",
  zinnen: "Zinnen oefenen",
  getallen: "Tellen",
};

function maak(params: URLSearchParams, data: AppData): Oefening[] {
  const m = params.get("m");
  const nu = Date.now();
  const opties = data.instellingen;
  const hoofdstukken = (params.get("h") ?? "").split(",").map(Number).filter(Boolean);
  if (m === "herhalen") return herhaalModule(data.items, nu, Math.random, opties);
  if (m === "woorden") return woordenModule(hoofdstukken, data.items, nu, Math.random, opties);
  if (m === "zinnen") return zinnenModule(hoofdstukken, Math.random, opties);
  if (m === "werkwoorden") {
    const keuze = (params.get("w") ?? "").split(",").filter(Boolean).map((x) => {
      const [ww, tijd] = x.split(".");
      return { ww, tijd: tijd as Tijd };
    });
    return werkwoordenModule(keuze, data.items, nu, Math.random, opties);
  }
  if (m === "getallen") {
    const van = Number(params.get("van") ?? 0);
    const tot = Number(params.get("tot") ?? 20);
    return filter(getallenOefeningen(van, Math.max(van, tot), Math.random), opties);
  }
  return [];
}

function Sessie() {
  const [data, wijzig] = useAppData();
  const router = useRouter();
  const params = useSearchParams();
  const [oefeningen, setOefeningen] = useState<Oefening[] | null>(null);
  const [einde, setEinde] = useState<{ score: number; aantal: number } | null>(null);
  const [ronde, setRonde] = useState(0);
  useSpraak(data);

  // De reeks wordt één keer per ronde gemaakt, zodra je gegevens geladen zijn.
  useEffect(() => {
    if (data && !oefeningen && !einde) setOefeningen(maak(params, data));
  }, [data, oefeningen, einde, params]);

  if (!data) return null;
  const titel = TITELS[params.get("m") ?? ""] ?? "Oefenen";

  if (einde) {
    return (
      <Einde score={einde.score} aantal={einde.aantal} titel="Goed geoefend!">
        {params.get("m") !== "herhalen" && (
          <button className="knop breed" onClick={() => { setEinde(null); setOefeningen(null); setRonde(ronde + 1); }}>
            Nog een ronde
          </button>
        )}
        <Link className="knop tweede breed" href="/oefenen">
          Terug naar oefenen
        </Link>
      </Einde>
    );
  }

  if (!oefeningen) return null;
  if (oefeningen.length === 0) {
    return (
      <>
        <h1>{titel}</h1>
        <p className="tekst-2">
          {params.get("m") === "herhalen"
            ? "Er is nu niets te herhalen. Kom later terug of leer een nieuwe les."
            : "Er is niets om te oefenen met deze keuze."}
        </p>
        <Link className="knop" href="/oefenen">
          Terug
        </Link>
      </>
    );
  }

  return (
    <Speler
      key={ronde}
      oefeningen={oefeningen}
      stop={() => router.push("/oefenen")}
      klaar={(resultaten, score) => {
        wijzig((d) => verwerkSessie(d, resultaten));
        setEinde({ score, aantal: resultaten.length });
      }}
    />
  );
}

export default function Pagina() {
  return (
    <Suspense>
      <Sessie />
    </Suspense>
  );
}
