"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { hoofdstuk } from "@/lib/cursus";
import { lessenVan } from "@/lib/lessen";
import { lesLink } from "@/lib/links";
import { useAppData, vandaag } from "@/lib/opslag";
import { Blok } from "../components/Blok";
import { useSpraak } from "../components/Frans";
import { IcoonTerug } from "../components/iconen";

function Grammatica() {
  const [data, wijzig] = useAppData();
  const router = useRouter();
  const n = Number(useSearchParams().get("h"));
  const h = hoofdstuk(n);
  useSpraak(data);
  if (!data) return null;
  if (!h) return <p>Dit hoofdstuk bestaat niet.</p>;

  const lessen = lessenVan(h);
  const gelezen = () => {
    wijzig((d) => ({
      ...d,
      lessen: { ...d.lessen, [lessen[0].id]: { op: Date.now(), score: 1 } },
      dagen: d.dagen.includes(vandaag()) ? d.dagen : [...d.dagen, vandaag()],
    }));
    router.push(lesLink(lessen[1].id));
  };

  return (
    <>
      <Link href={`/hoofdstuk?h=${h.nummer}`} className="icoonknop" aria-label="Terug" style={{ margin: "-8px 0 -12px -8px" }}>
        <IcoonTerug />
      </Link>
      <div className="kop">
        <span className="label">Hoofdstuk {h.nummer} · Grammatica</span>
        <h1>{h.titel}</h1>
      </div>
      <p className="tekst-2">{h.doel}</p>
      {h.grammatica.map((b) => (
        <Blok key={b.titel} blok={b} />
      ))}
      <button className="knop breed" onClick={gelezen}>
        Gelezen, naar de eerste les
      </button>
      <p className="zacht klein" style={{ textAlign: "center" }}>
        Je kunt deze uitleg altijd teruglezen via Naslag.
      </p>
    </>
  );
}

export default function Pagina() {
  return (
    <Suspense>
      <Grammatica />
    </Suspense>
  );
}
