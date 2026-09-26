"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IcoonLeren, IcoonNaslag, IcoonOefenen, IcoonProfiel } from "./iconen";

const TABS = [
  { href: "/", naam: "Leerpad", icoon: <IcoonLeren /> },
  { href: "/oefenen", naam: "Oefenen", icoon: <IcoonOefenen /> },
  { href: "/naslag", naam: "Naslag", icoon: <IcoonNaslag /> },
  { href: "/profiel", naam: "Profiel", icoon: <IcoonProfiel /> },
];

export function TabBalk() {
  const pad = usePathname().replace(/\/$/, "") || "/";
  const actief = (href: string) =>
    href === "/" ? pad === "/" || pad.startsWith("/hoofdstuk") || pad.startsWith("/les") || pad.startsWith("/grammatica") : pad.startsWith(href);
  return (
    <nav className="tabbalk" aria-label="Hoofdmenu">
      <ul>
        {TABS.map((tab) => (
          <li key={tab.href}>
            <Link href={tab.href} aria-current={actief(tab.href) ? "page" : undefined}>
              {tab.icoon}
              {tab.naam}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Verbergt de tabbalk zolang een les of oefensessie loopt. */
export function useSessieModus(actief: boolean) {
  useEffect(() => {
    if (!actief) return;
    document.body.dataset.sessie = "1";
    return () => {
      delete document.body.dataset.sessie;
    };
  }, [actief]);
}
