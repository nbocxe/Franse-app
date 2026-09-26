// Franse getallen uitschrijven (traditionele spelling, zoals in lesboeken) met een uitspraakhint.

const EENHEDEN = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf",
];
const EENHEDEN_UITSPRAAK = [
  "zeero", "ẽ", "deu", "trwa", "katr", "sẽk", "sies", "sèt", "wiet", "nuf",
  "dies", "õz", "doez", "trèz", "katorz", "kẽz", "sèz", "dies-sèt", "diez-wiet", "diez-nuf",
];
const TIENTALLEN: Record<number, [string, string]> = {
  2: ["vingt", "vẽ"],
  3: ["trente", "trãt"],
  4: ["quarante", "karãt"],
  5: ["cinquante", "sẽkãt"],
  6: ["soixante", "swasãt"],
};

/** 0 t/m 99. */
function onderHonderd(n: number): [string, string] {
  if (n < 20) return [EENHEDEN[n], EENHEDEN_UITSPRAAK[n]];
  const tiental = Math.floor(n / 10);
  const eenheid = n % 10;
  if (tiental === 7 || tiental === 9) {
    // 70 = 60 + 10, 90 = 4 × 20 + 10
    const [basis, basisU] = tiental === 7 ? TIENTALLEN[6] : ["quatre-vingt", "katruh-vẽ"];
    const [rest, restU] = onderHonderd(10 + eenheid);
    if (tiental === 7 && eenheid === 1) return ["soixante et onze", "swasãt ee õz"];
    return [`${basis}-${rest}`, `${basisU}-${restU}`];
  }
  if (tiental === 8) {
    if (eenheid === 0) return ["quatre-vingts", "katruh-vẽ"];
    return [`quatre-vingt-${EENHEDEN[eenheid]}`, `katruh-vẽ-${EENHEDEN_UITSPRAAK[eenheid]}`];
  }
  const [basis, basisU] = TIENTALLEN[tiental];
  if (eenheid === 0) return [basis, basisU];
  if (eenheid === 1) return [`${basis} et un`, `${basisU} ee ẽ`];
  // Bij 22 t/m 29 spreek je de t van vingt wel uit.
  const u = tiental === 2 ? "vẽt" : basisU;
  return [`${basis}-${EENHEDEN[eenheid]}`, `${u}-${EENHEDEN_UITSPRAAK[eenheid]}`];
}

/** Uitspraak van een telwoord vóór "cent" of "mille" (de slotmedeklinker valt soms weg). */
const VOOR_MEDEKLINKER: Record<number, string> = { 5: "sẽ", 6: "sie", 8: "wie", 10: "die" };

function onderDuizend(n: number, laatste: boolean): [string, string] {
  const honderdtal = Math.floor(n / 100);
  const rest = n % 100;
  const delen: [string, string][] = [];
  if (honderdtal > 0) {
    let cent = honderdtal === 1 ? "cent" : `${EENHEDEN[honderdtal]} cent`;
    const u = honderdtal === 1 ? "sã" : `${VOOR_MEDEKLINKER[honderdtal] ?? EENHEDEN_UITSPRAAK[honderdtal]} sã`;
    // "cents" krijgt alleen een s als er niets achter komt: deux cents, maar deux cent trois.
    if (honderdtal > 1 && rest === 0 && laatste) cent += "s";
    delen.push([cent, u]);
  }
  if (rest > 0 || honderdtal === 0) {
    let [w, u] = onderHonderd(rest);
    // quatre-vingts verliest zijn s als er nog iets achter komt (quatre-vingt mille).
    if (!laatste && w === "quatre-vingts") w = "quatre-vingt";
    delen.push([w, u]);
  }
  return [delen.map((d) => d[0]).join(" "), delen.map((d) => d[1]).join(" ")];
}

/** Schrijft een getal van 0 tot een miljoen uit: 81 → "quatre-vingt-un". */
export function getalInWoorden(n: number): string {
  return getal(n)[0];
}

export function getalUitspraak(n: number): string {
  return getal(n)[1];
}

function getal(n: number): [string, string] {
  if (!Number.isInteger(n) || n < 0 || n >= 1_000_000) throw new Error(`Getal buiten bereik: ${n}`);
  if (n < 1000) return onderDuizend(n, true);
  const duizendtal = Math.floor(n / 1000);
  const rest = n % 1000;
  let [w, u] = ["mille", "miel"];
  if (duizendtal > 1) {
    const [dw, du] = onderDuizend(duizendtal, false);
    const du2 = duizendtal < 11 && VOOR_MEDEKLINKER[duizendtal] ? VOOR_MEDEKLINKER[duizendtal] : du;
    [w, u] = [`${dw} mille`, `${du2} miel`];
  }
  if (rest === 0) return [w, u];
  const [rw, ru] = onderDuizend(rest, true);
  return [`${w} ${rw}`, `${u} ${ru}`];
}
