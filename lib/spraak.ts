"use client";

// Voorlezen (Frans) en spraakherkenning, via de browser. Er gaat niets naar een externe dienst
// behalve wat je browser zelf doet voor spraakherkenning (Chrome gebruikt daarvoor Google).

let instellingen = { stem: "", snelheid: 0.9 };

export function stelSpraakIn(stem: string, snelheid: number) {
  instellingen = { stem, snelheid };
}

export function kanVoorlezen(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function fransStemmen(): SpeechSynthesisVoice[] {
  if (!kanVoorlezen()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("fr"));
}

function besteStem(): SpeechSynthesisVoice | undefined {
  const stemmen = fransStemmen();
  if (instellingen.stem) {
    const gekozen = stemmen.find((v) => v.name === instellingen.stem);
    if (gekozen) return gekozen;
  }
  // Voorkeur: Frankrijk-Frans, en de bekende goede stemmen.
  const fr = stemmen.filter((v) => v.lang.toLowerCase().replace("_", "-") === "fr-fr");
  const lijst = fr.length ? fr : stemmen;
  return (
    lijst.find((v) => /google|amélie|amelie|thomas|audrey|marie|premium|enhanced|natural/i.test(v.name)) ?? lijst[0]
  );
}

/** Leest Franse tekst voor. `langzaam` = schildpadknop. */
export function spreek(tekst: string, opties: { langzaam?: boolean; klaar?: () => void } = {}) {
  if (!kanVoorlezen()) {
    opties.klaar?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  // "…" en "___" niet voorlezen.
  const u = new SpeechSynthesisUtterance(tekst.replace(/_+|…/g, " "));
  u.lang = "fr-FR";
  u.rate = opties.langzaam ? 0.55 : instellingen.snelheid;
  const stem = besteStem();
  if (stem) u.voice = stem;
  u.onend = () => opties.klaar?.();
  u.onerror = () => opties.klaar?.();
  synth.speak(u);
}

// ---- Spraakherkenning ----

interface Herkenning {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function herkenningKlasse(): (new () => Herkenning) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: new () => Herkenning; webkitSpeechRecognition?: new () => Herkenning };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function kanHerkennen(): boolean {
  return herkenningKlasse() !== undefined;
}

/** Luistert naar één uiting en geeft de mogelijke transcripties terug. */
export function luisterNaar(
  klaar: (transcripties: string[]) => void,
  fout: (melding: string) => void,
): () => void {
  const Klasse = herkenningKlasse();
  if (!Klasse) {
    fout("Je browser kan geen spraak herkennen.");
    return () => {};
  }
  const r = new Klasse();
  r.lang = "fr-FR";
  r.interimResults = false;
  r.maxAlternatives = 5;
  let gekregen = false;
  r.onresult = (e) => {
    gekregen = true;
    const alternatieven = Array.from(e.results[0] ?? []).map((a) => a.transcript);
    klaar(alternatieven);
  };
  r.onerror = (e) => {
    gekregen = true;
    fout(
      e.error === "not-allowed"
        ? "De app mag je microfoon niet gebruiken. Geef toestemming in je browser."
        : e.error === "no-speech"
          ? "Ik hoorde niets. Probeer het nog eens."
          : "Er ging iets mis met de spraakherkenning.",
    );
  };
  r.onend = () => {
    if (!gekregen) fout("Ik hoorde niets. Probeer het nog eens.");
  };
  r.start();
  return () => r.stop();
}
