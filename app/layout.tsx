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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <main>{children}</main>
        <TabBalk />
      </body>
    </html>
  );
}
