import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basis = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Zorgt dat je de app op je telefoon op het beginscherm kunt zetten.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frans leren",
    short_name: "Frans",
    description: "Leer Frans zoals uit een lesboek.",
    start_url: `${basis}/`,
    icons: [
      { src: `${basis}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basis}/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${basis}/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: `${basis}/icon.svg`, sizes: "any", type: "image/svg+xml" },
    ],
    scope: `${basis}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f1e7",
    theme_color: "#f6f1e7",
    lang: "nl",
  };
}
