// Controleert wat je typt. Accentfouten tellen als goed (met een opmerking),
// andere fouten niet. Bij veelgemaakte fouten geeft de app een gerichte tip.

export type Uitslag = "goed" | "accent" | "fout";

export interface Beoordeling {
  uitslag: Uitslag;
  /** Het antwoord waar je het dichtst bij zat, om te tonen. */
  juist: string;
  tip?: string;
  /** Per woord van jouw antwoord: klopt het (true) of niet. */
  woorden?: { woord: string; goed: boolean }[];
}

/** Maakt twee antwoorden vergelijkbaar: kleine letters, gewone apostrof, geen leestekens, enkele spaties. */
export function normaliseer(s: string, getal = false): string {
  let t = s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[’‘`´]/g, "'")
    .replace(/œ/g, "oe")
    .replace(/[.,!?;:«»"()…¿¡]/g, " ");
  // Bij getallen maakt het niet uit of je een streepje of een spatie gebruikt (vingt-deux, vingt deux).
  if (getal) t = t.replace(/-/g, " ");
  return t.replace(/'\s+/g, "'").replace(/\s+/g, " ").trim();
}

export function zonderAccenten(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ç/g, "c");
}

export function afstand(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

/** Markeert per woord of het in het goede antwoord voorkomt (op de juiste volgorde, via LCS). */
function markeer(invoer: string, juist: string): { woord: string; goed: boolean }[] {
  const a = invoer.split(" ").filter(Boolean);
  const b = juist.split(" ");
  const l = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      l[i][j] = a[i] === b[j] ? l[i + 1][j + 1] + 1 : Math.max(l[i + 1][j], l[i][j + 1]);
    }
  }
  const uit: { woord: string; goed: boolean }[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length) {
    if (j < b.length && a[i] === b[j]) {
      uit.push({ woord: a[i], goed: true });
      i++;
      j++;
    } else if (j < b.length && l[i][j + 1] >= l[i + 1][j]) {
      j++;
    } else {
      uit.push({ woord: a[i], goed: false });
      i++;
    }
  }
  return uit;
}

const LIDWOORDEN = /^(le |la |l'|les |un |une |des |du |de la |de l')/;

/** Zoekt een bekende, veelgemaakte fout en legt uit wat er mis is. */
function zoekTip(invoer: string, juist: string): string | undefined {
  const i = zonderAccenten(invoer);
  const j = zonderAccenten(juist);
  // je aime → j'aime
  if (/\b(je|le|la|de|ne|me|te|se) [aeiouhy]/.test(i) && i.replace(/\b(j|l|d|n|m|t|s)e (?=[aeiouhy])/g, "$1'").replace(/\bla (?=[aeiouhy])/g, "l'") === j) {
    return "Vóór een klinker of stomme h wordt je, le, la, de, ne, me, te en se ingekort: j'aime, l'ami, je n'ai pas.";
  }
  // le ↔ la verwisseld
  const lidI = i.match(LIDWOORDEN)?.[1];
  const lidJ = j.match(LIDWOORDEN)?.[1];
  if (lidI && lidJ && lidI !== lidJ && i.slice(lidI.length) === j.slice(lidJ.length)) {
    const vrouwelijk = /^(la |une )/.test(lidJ);
    const mannelijk = /^(le |un )/.test(lidJ);
    if (vrouwelijk || mannelijk) return `Let op het geslacht: dit woord is ${vrouwelijk ? "vrouwelijk" : "mannelijk"}, dus ${lidJ.trim()}.`;
    return `Let op het lidwoord: ${lidJ.trim()}.`;
  }
  // lidwoord vergeten
  if (lidJ && !lidI && i === j.slice(lidJ.length)) {
    return "Vergeet het lidwoord niet. Franse zelfstandige naamwoorden staan bijna altijd met le, la, un of une.";
  }
  // ontkenning: ne of pas vergeten
  if (/\bne |\bn'/.test(j) && /\bpas\b/.test(j) && !(/\bne |\bn'/.test(i) && /\bpas\b/.test(i))) {
    return "Een ontkenning bestaat uit twee delen om het werkwoord heen: ne … pas.";
  }
  if (afstand(i, j) === 1) return "Bijna! Je zit er één letter naast.";
  return undefined;
}

/**
 * Vergelijkt jouw antwoord met alle goede antwoorden.
 * `getal`: streepjes en spaties zijn uitwisselbaar (voor uitgeschreven getallen).
 */
export function beoordeel(invoer: string, goede: string[], opties: { getal?: boolean } = {}): Beoordeling {
  const n = normaliseer(invoer, opties.getal);
  const kandidaten = goede.map((g) => ({ origineel: g, n: normaliseer(g, opties.getal) }));

  const exact = kandidaten.find((k) => k.n === n);
  if (exact) return { uitslag: "goed", juist: exact.origineel };

  const bijnaAccent = kandidaten.find((k) => zonderAccenten(k.n) === zonderAccenten(n));
  if (bijnaAccent) {
    return {
      uitslag: "accent",
      juist: bijnaAccent.origineel,
      tip: "Goed, maar let op de accenten.",
      woorden: markeer(n, bijnaAccent.n),
    };
  }

  // Het dichtstbijzijnde antwoord tonen we als verbetering.
  const dichtst = kandidaten.reduce((best, k) =>
    afstand(zonderAccenten(k.n), zonderAccenten(n)) < afstand(zonderAccenten(best.n), zonderAccenten(n)) ? k : best,
  );
  return {
    uitslag: "fout",
    juist: dichtst.origineel,
    tip: n === "" ? undefined : zoekTip(n, dichtst.n),
    woorden: n === "" ? undefined : markeer(n, dichtst.n),
  };
}

/**
 * Vergelijkt wat de spraakherkenning hoorde met wat je moest zeggen. Herkenning is niet perfect,
 * dus we zijn mild: accenten en leestekens tellen niet, en 80% van de woorden moet kloppen.
 */
export function vergelijkSpraak(transcripties: string[], doel: string): { goed: boolean; gehoord: string } {
  const woorden = (s: string) => zonderAccenten(normaliseer(s).replace(/'/g, "' ")).split(" ").filter(Boolean);
  const d = woorden(doel);
  let beste = { score: -1, gehoord: transcripties[0] ?? "" };
  for (const t of transcripties) {
    const g = woorden(t);
    const over = [...g];
    let raak = 0;
    for (const w of d) {
      const i = over.indexOf(w);
      if (i >= 0) {
        raak++;
        over.splice(i, 1);
      }
    }
    const score = raak / Math.max(d.length, g.length);
    if (score > beste.score) beste = { score, gehoord: t };
  }
  return { goed: beste.score >= 0.8 || (d.length <= 2 && beste.score >= 0.5), gehoord: beste.gehoord };
}
