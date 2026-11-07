import type { Metadata, Viewport } from "next";
import { TabBalk } from "./components/TabBalk";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frans leren",
  description: "Leer Frans zoals uit een lesboek: werkwoorden, woorden, tellen en zinnen, met uitspraak.",
  // Op de iPhone: als app op het beginscherm, zonder adresbalk.
  appleWebApp: { capable: true, title: "Frans", statusBarStyle: "default" },
};

const BASIS = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Registreert de service worker, zodat de app ook zonder internet werkt (bijv. in de trein).
const SW_SCRIPT = `if("serviceWorker" in navigator)window.addEventListener("load",function(){navigator.serviceWorker.register("${BASIS}/sw.js",{scope:"${BASIS}/"}).catch(function(){})});`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
};

const THEMA_SCRIPT = `try{var t=JSON.parse(localStorage.getItem("franseapp:v1")||"{}").instellingen;t=t&&t.thema;if(t==="donker")document.documentElement.dataset.theme="dark";if(t==="licht")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* Zet het gekozen thema al vóór het tekenen, zodat het scherm niet eerst even de verkeerde kleur heeft. */}
        <script dangerouslySetInnerHTML={{ __html: THEMA_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: SW_SCRIPT }} />
      </head>
      <body>
        <main>{children}</main>
        <TabBalk />
      </body>
    </html>
  );
}
