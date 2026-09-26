import type { Metadata, Viewport } from "next";
import { TabBalk } from "./components/TabBalk";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frans leren",
  description: "Leer Frans zoals uit een lesboek: werkwoorden, woorden, tellen en zinnen, met uitspraak.",
};

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
      </head>
      <body>
        <main>{children}</main>
        <TabBalk />
      </body>
    </html>
  );
}
