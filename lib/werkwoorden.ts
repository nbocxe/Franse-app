// Alle werkwoorden uit de cursus, en het vervoegen ervan.
// De présent staat volledig uitgeschreven; de passé composé en de imparfait rekent de app zelf uit.

import type { Tijd, Vorm, Werkwoord } from "./types.ts";

export const PERSONEN = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
export const PERSONEN_NL = ["ik", "jij", "hij/zij", "wij", "jullie/u", "zij"];

const WERKWOORDEN_LIJST: Werkwoord[] = [
  {
    id: "etre", inf: "être", nl: "zijn", emoji: "🧍", uitspraak: "ètr", groep: "onregelmatig",
    present: ["je suis", "tu es", "il est", "nous sommes", "vous êtes", "ils sont"],
    presentUitspraak: ["zjuh swie", "tuu è", "iel è", "noe som", "voe-zèt", "iel sõ"],
    participe: "été", participeUitspraak: "eetee", hulpwerkwoord: "avoir",
    imparfaitStam: "ét", imparfaitUitspraak: "eet",
    tip: "Het belangrijkste werkwoord van het Frans. Leer het uit je hoofd als een rijtje.",
  },
  {
    id: "avoir", inf: "avoir", nl: "hebben", emoji: "🤲", uitspraak: "avwar", groep: "onregelmatig",
    present: ["j'ai", "tu as", "il a", "nous avons", "vous avez", "ils ont"],
    presentUitspraak: ["zjee", "tuu a", "iel a", "noe-zavõ", "voe-zavee", "iel-zõ"],
    participe: "eu", participeUitspraak: "uu", hulpwerkwoord: "avoir", imparfaitUitspraak: "av",
    tip: "Let op het verschil: ils sont (iel sõ, ze zijn) en ils ont (iel-zõ, ze hebben).",
  },
  {
    id: "sappeler", inf: "s'appeler", nl: "heten", emoji: "📛", uitspraak: "saplee", groep: "-er",
    present: ["je m'appelle", "tu t'appelles", "il s'appelle", "nous nous appelons", "vous vous appelez", "ils s'appellent"],
    presentUitspraak: ["zjuh mapèl", "tuu tapèl", "iel sapèl", "noe noe-zaplõ", "voe voe-zaplee", "iel sapèl"],
    tip: "Letterlijk: ik noem mezelf. Het tweede woordje (me, te, se, nous, vous) betekent 'mezelf, jezelf, zichzelf'. Daarom staat er twee keer nous of vous: nous nous appelons = wij noemen onszelf. Bij je, tu, il en ils schrijf je twee l'en, bij nous en vous één.",
  },
  {
    id: "parler", inf: "parler", nl: "spreken, praten", emoji: "🗣️", uitspraak: "parlee", groep: "-er",
    present: ["je parle", "tu parles", "il parle", "nous parlons", "vous parlez", "ils parlent"],
    presentUitspraak: ["zjuh parl", "tuu parl", "iel parl", "noe parlõ", "voe parlee", "iel parl"],
    participe: "parlé", participeUitspraak: "parlee", hulpwerkwoord: "avoir", imparfaitUitspraak: "parl",
    tip: "Het voorbeeld voor alle werkwoorden op -er: parle, parles, parle en parlent klinken precies hetzelfde.",
  },
  {
    id: "habiter", inf: "habiter", nl: "wonen", emoji: "🏠", uitspraak: "abietee", groep: "-er",
    present: ["j'habite", "tu habites", "il habite", "nous habitons", "vous habitez", "ils habitent"],
    presentUitspraak: ["zjabiet", "tuu abiet", "iel abiet", "noe-zabietõ", "voe-zabietee", "iel-zabiet"],
    participe: "habité", participeUitspraak: "abietee", hulpwerkwoord: "avoir", imparfaitUitspraak: "abiet",
    tip: "De h spreek je niet uit. Daarom wordt je → j': j'habite.",
  },
  {
    id: "aimer", inf: "aimer", nl: "houden van, graag hebben", emoji: "❤️", uitspraak: "èmee", groep: "-er",
    present: ["j'aime", "tu aimes", "il aime", "nous aimons", "vous aimez", "ils aiment"],
    presentUitspraak: ["zjèm", "tuu èm", "iel èm", "noe-zèmõ", "voe-zèmee", "iel-zèm"],
    participe: "aimé", participeUitspraak: "èmee", hulpwerkwoord: "avoir", imparfaitUitspraak: "èm",
    tip: "J'aime le café = ik houd van koffie. J'aime bien = ik vind (het) leuk.",
  },
  {
    id: "manger", inf: "manger", nl: "eten", emoji: "🍽️", uitspraak: "mãzjee", groep: "-er",
    present: ["je mange", "tu manges", "il mange", "nous mangeons", "vous mangez", "ils mangent"],
    presentUitspraak: ["zjuh mãzj", "tuu mãzj", "iel mãzj", "noe mãzjõ", "voe mãzjee", "iel mãzj"],
    participe: "mangé", participeUitspraak: "mãzjee", hulpwerkwoord: "avoir", imparfaitUitspraak: "mãzj",
    tip: "Nous mangeons: de e blijft staan, zodat de g zacht (zj) klinkt.",
  },
  {
    id: "boire", inf: "boire", nl: "drinken", emoji: "🥤", uitspraak: "bwar", groep: "onregelmatig",
    present: ["je bois", "tu bois", "il boit", "nous buvons", "vous buvez", "ils boivent"],
    presentUitspraak: ["zjuh bwa", "tuu bwa", "iel bwa", "noe buuvõ", "voe buuvee", "iel bwav"],
    participe: "bu", participeUitspraak: "buu", hulpwerkwoord: "avoir", imparfaitUitspraak: "buuv",
  },
  {
    id: "vouloir", inf: "vouloir", nl: "willen", emoji: "🙋", uitspraak: "voelwar", groep: "onregelmatig",
    present: ["je veux", "tu veux", "il veut", "nous voulons", "vous voulez", "ils veulent"],
    presentUitspraak: ["zjuh veu", "tuu veu", "iel veu", "noe voelõ", "voe voelee", "iel veul"],
    participe: "voulu", participeUitspraak: "voeluu", hulpwerkwoord: "avoir", imparfaitUitspraak: "voel",
    tip: "Beleefd iets vragen? Gebruik je voudrais (zjuh voedrè): ik zou graag willen.",
  },
  {
    id: "aller", inf: "aller", nl: "gaan", emoji: "🚶", uitspraak: "alee", groep: "onregelmatig",
    present: ["je vais", "tu vas", "il va", "nous allons", "vous allez", "ils vont"],
    presentUitspraak: ["zjuh vè", "tuu va", "iel va", "noe-zalõ", "voe-zalee", "iel võ"],
    participe: "allé", participeUitspraak: "alee", hulpwerkwoord: "etre", imparfaitUitspraak: "al",
    tip: "Ook: Ça va? (Hoe gaat het?) en je vais + werkwoord = ik ga (iets doen).",
  },
  {
    id: "venir", inf: "venir", nl: "komen", emoji: "👋", uitspraak: "vuhnier", groep: "onregelmatig",
    present: ["je viens", "tu viens", "il vient", "nous venons", "vous venez", "ils viennent"],
    presentUitspraak: ["zjuh vjẽ", "tuu vjẽ", "iel vjẽ", "noe vuhnõ", "voe vuhnee", "iel vjèn"],
    participe: "venu", participeUitspraak: "vuhnuu", hulpwerkwoord: "etre", imparfaitUitspraak: "vuhn",
    tip: "Je viens de Paris = ik kom uit Parijs.",
  },
  {
    id: "faire", inf: "faire", nl: "doen, maken", emoji: "🛠️", uitspraak: "fèr", groep: "onregelmatig",
    present: ["je fais", "tu fais", "il fait", "nous faisons", "vous faites", "ils font"],
    presentUitspraak: ["zjuh fè", "tuu fè", "iel fè", "noe fuhzõ", "voe fèt", "iel fõ"],
    participe: "fait", participeUitspraak: "fè", hulpwerkwoord: "avoir", imparfaitUitspraak: "fuhz",
    tip: "Ook voor het weer: il fait beau (het is mooi weer), il fait froid (het is koud).",
  },
  {
    id: "pouvoir", inf: "pouvoir", nl: "kunnen, mogen", emoji: "💪", uitspraak: "poevwar", groep: "onregelmatig",
    present: ["je peux", "tu peux", "il peut", "nous pouvons", "vous pouvez", "ils peuvent"],
    presentUitspraak: ["zjuh peu", "tuu peu", "iel peu", "noe poevõ", "voe poevee", "iel peuv"],
    participe: "pu", participeUitspraak: "puu", hulpwerkwoord: "avoir", imparfaitUitspraak: "poev",
    tip: "Na pouvoir volgt een heel werkwoord: je peux venir (ik kan komen).",
  },
  {
    id: "devoir", inf: "devoir", nl: "moeten", emoji: "☝️", uitspraak: "duhvwar", groep: "onregelmatig",
    present: ["je dois", "tu dois", "il doit", "nous devons", "vous devez", "ils doivent"],
    presentUitspraak: ["zjuh dwa", "tuu dwa", "iel dwa", "noe duhvõ", "voe duhvee", "iel dwav"],
    participe: "dû", participeUitspraak: "duu", hulpwerkwoord: "avoir", imparfaitUitspraak: "duhv",
  },
  {
    id: "savoir", inf: "savoir", nl: "weten, kunnen (geleerd)", emoji: "🧠", uitspraak: "savwar", groep: "onregelmatig",
    present: ["je sais", "tu sais", "il sait", "nous savons", "vous savez", "ils savent"],
    presentUitspraak: ["zjuh sè", "tuu sè", "iel sè", "noe savõ", "voe savee", "iel sav"],
    participe: "su", participeUitspraak: "suu", hulpwerkwoord: "avoir", imparfaitUitspraak: "sav",
    tip: "Je ne sais pas = ik weet het niet. Je sais nager = ik kan zwemmen (geleerd).",
  },
  {
    id: "prendre", inf: "prendre", nl: "nemen, pakken", emoji: "✋", uitspraak: "prãdr", groep: "onregelmatig",
    present: ["je prends", "tu prends", "il prend", "nous prenons", "vous prenez", "ils prennent"],
    presentUitspraak: ["zjuh prã", "tuu prã", "iel prã", "noe pruhnõ", "voe pruhnee", "iel prèn"],
    participe: "pris", participeUitspraak: "prie", hulpwerkwoord: "avoir", imparfaitUitspraak: "pruhn",
    tip: "Je prends le bus = ik neem de bus. Je prends un café = ik neem een koffie.",
  },
  {
    id: "mettre", inf: "mettre", nl: "zetten, leggen, aantrekken", emoji: "🧥", uitspraak: "mètr", groep: "onregelmatig",
    present: ["je mets", "tu mets", "il met", "nous mettons", "vous mettez", "ils mettent"],
    presentUitspraak: ["zjuh mè", "tuu mè", "iel mè", "noe mètõ", "voe mètee", "iel mèt"],
    participe: "mis", participeUitspraak: "mie", hulpwerkwoord: "avoir", imparfaitUitspraak: "mèt",
  },
  {
    id: "selever", inf: "se lever", nl: "opstaan", emoji: "⏰", uitspraak: "suh luhvee", groep: "-er",
    present: ["je me lève", "tu te lèves", "il se lève", "nous nous levons", "vous vous levez", "ils se lèvent"],
    presentUitspraak: ["zjuh muh lèv", "tuu tuh lèv", "iel suh lèv", "noe noe luhvõ", "voe voe luhvee", "iel suh lèv"],
    tip: "Letterlijk: zichzelf opheffen. Ook hier staat twee keer nous of vous: nous nous levons (wij heffen onszelf op). Let op de è bij je, tu, il en ils.",
  },
  {
    id: "finir", inf: "finir", nl: "eindigen, afmaken", emoji: "🏁", uitspraak: "fienier", groep: "-ir",
    present: ["je finis", "tu finis", "il finit", "nous finissons", "vous finissez", "ils finissent"],
    presentUitspraak: ["zjuh fienie", "tuu fienie", "iel fienie", "noe fieniesõ", "voe fieniesee", "iel fienies"],
    participe: "fini", participeUitspraak: "fienie", hulpwerkwoord: "avoir", imparfaitUitspraak: "fienies",
    tip: "Het voorbeeld voor de regelmatige werkwoorden op -ir: meervoud met -iss-.",
  },
  {
    id: "attendre", inf: "attendre", nl: "wachten (op)", emoji: "⏳", uitspraak: "atãdr", groep: "-re",
    present: ["j'attends", "tu attends", "il attend", "nous attendons", "vous attendez", "ils attendent"],
    presentUitspraak: ["zjatã", "tuu atã", "iel atã", "noe-zatãdõ", "voe-zatãdee", "iel-zatãd"],
    participe: "attendu", participeUitspraak: "atãduu", hulpwerkwoord: "avoir", imparfaitUitspraak: "atãd",
    tip: "Zonder voorzetsel: j'attends le bus = ik wacht op de bus.",
  },
  {
    id: "voir", inf: "voir", nl: "zien", emoji: "👀", uitspraak: "vwar", groep: "onregelmatig",
    present: ["je vois", "tu vois", "il voit", "nous voyons", "vous voyez", "ils voient"],
    presentUitspraak: ["zjuh vwa", "tuu vwa", "iel vwa", "noe vwajõ", "voe vwajee", "iel vwa"],
    participe: "vu", participeUitspraak: "vuu", hulpwerkwoord: "avoir", imparfaitUitspraak: "vwaj",
  },
  {
    id: "partir", inf: "partir", nl: "vertrekken, weggaan", emoji: "🧳", uitspraak: "partier", groep: "onregelmatig",
    present: ["je pars", "tu pars", "il part", "nous partons", "vous partez", "ils partent"],
    presentUitspraak: ["zjuh par", "tuu par", "iel par", "noe partõ", "voe partee", "iel part"],
    participe: "parti", participeUitspraak: "partie", hulpwerkwoord: "etre", imparfaitUitspraak: "part",
  },
];

export const WERKWOORDEN: Record<string, Werkwoord> = Object.fromEntries(WERKWOORDEN_LIJST.map((w) => [w.id, w]));

const VOORNAAMWOORD = /^(je |j'|tu |il |nous |vous |ils )/;

function splits(volledig: string): { voornaamwoord: string; rest: string } {
  const m = volledig.match(VOORNAAMWOORD);
  if (!m) throw new Error(`Geen voornaamwoord in "${volledig}"`);
  return { voornaamwoord: m[1].trim(), rest: volledig.slice(m[1].length) };
}

function begintMetKlinker(s: string): boolean {
  return /^[aeiouyéèêàâîôûh]/.test(s);
}

/** Welke tijden je van dit werkwoord kunt oefenen. */
export function tijdenVan(ww: Werkwoord): Tijd[] {
  return ww.participe ? ["present", "passe-compose", "imparfait"] : ["present"];
}

function presentVormen(ww: Werkwoord): Vorm[] {
  return ww.present.map((volledig, persoon) => {
    const { voornaamwoord, rest } = splits(volledig);
    return {
      persoon, voornaamwoord, rest, volledig,
      uitspraak: ww.presentUitspraak[persoon],
      antwoorden: [volledig, rest],
    };
  });
}

function passeComposeVormen(ww: Werkwoord): Vorm[] {
  const hulp = presentVormen(WERKWOORDEN[ww.hulpwerkwoord ?? "avoir"]);
  const deelwoord = ww.participe!;
  return hulp.map((h, persoon) => {
    const meervoud = persoon >= 3;
    let getoond = deelwoord;
    let varianten = [deelwoord];
    if (ww.hulpwerkwoord === "etre") {
      // Bij être past het deelwoord zich aan: allé, allée, allés, allées.
      getoond = deelwoord + (meervoud ? "(e)s" : "(e)");
      varianten = meervoud ? [deelwoord + "s", deelwoord + "es", getoond] : [deelwoord, deelwoord + "e", getoond];
    }
    const rest = `${h.rest} ${getoond}`;
    const volledig = `${h.volledig} ${getoond}`;
    return {
      persoon, voornaamwoord: h.voornaamwoord, rest, volledig,
      uitspraak: `${h.uitspraak}${verbinding(h.volledig, ww.participeUitspraak!)}${ww.participeUitspraak}`,
      antwoorden: varianten.flatMap((v) => [`${h.volledig} ${v}`, `${h.rest} ${v}`]),
    };
  });
}

/**
 * Liaison: vóór een klinker spreek je de slotmedeklinker van est, sont, ont, sommes en êtes wel uit
 * (il est allé = iel è-talee, ils ont eu = iel-zõ-tuu).
 */
function verbinding(hulpvorm: string, deelwoordUitspraak: string): string {
  if (!/^[aeiouèéêõãẽ]/.test(deelwoordUitspraak)) return " ";
  if (/ (est|sont|ont)$/.test(hulpvorm)) return "-t";
  if (/ (sommes|êtes)$/.test(hulpvorm)) return "-z";
  return " ";
}

const IMPARFAIT_UITGANGEN = ["ais", "ais", "ait", "ions", "iez", "aient"];

function imparfaitVormen(ww: Werkwoord): Vorm[] {
  const nous = splits(ww.present[3]).rest;
  const stam = ww.imparfaitStam ?? nous.replace(/ons$/, "");
  const klinker = begintMetKlinker(stam);
  const vnw = klinker ? ["j'", "tu", "il", "nous", "vous", "ils"] : ["je", "tu", "il", "nous", "vous", "ils"];
  const vnwUitspraak = klinker
    ? ["zj", "tuu ", "iel ", "noe-z", "voe-z", "iel-z"]
    : ["zjuh ", "tuu ", "iel ", "noe ", "voe ", "iel "];
  const su = ww.imparfaitUitspraak ?? "";
  // Na een zachte g (mangeons) valt de e weg voor een i: nous mangions.
  const uitgangUitspraak = su.endsWith("zj") ? ["è", "è", "è", "õ", "ee", "è"] : ["è", "è", "è", "jõ", "jee", "è"];
  return IMPARFAIT_UITGANGEN.map((uitgang, persoon) => {
    const s = uitgang.startsWith("i") && stam.endsWith("ge") ? stam.slice(0, -1) : stam;
    const rest = s + uitgang;
    const voornaamwoord = vnw[persoon];
    const volledig = voornaamwoord.endsWith("'") ? voornaamwoord + rest : `${voornaamwoord} ${rest}`;
    return {
      persoon, voornaamwoord, rest, volledig,
      // Geen dubbele j: nous voyions = noe vwajõ.
      uitspraak: (vnwUitspraak[persoon] + su + uitgangUitspraak[persoon]).replace(/jj/g, "j"),
      antwoorden: [volledig, rest],
    };
  });
}

export function vervoeg(ww: Werkwoord, tijd: Tijd): Vorm[] {
  if (tijd === "present") return presentVormen(ww);
  if (!ww.participe) throw new Error(`${ww.inf} heeft in deze versie alleen de présent`);
  return tijd === "passe-compose" ? passeComposeVormen(ww) : imparfaitVormen(ww);
}

/** Toont "il est" als "il/elle est" en "ils sont" als "ils/elles sont". */
export function toonVorm(vorm: Vorm): string {
  if (vorm.persoon === 2) return vorm.volledig.replace(/^il /, "il/elle ");
  if (vorm.persoon === 5) return vorm.volledig.replace(/^ils /, "ils/elles ");
  return vorm.volledig;
}

/** Het voornaamwoord zoals het in de vorm geschreven wordt: "j'" vóór een klinker, anders "je", "il/elle" enz. */
export function toonVoornaamwoord(vorm: Vorm): string {
  if (vorm.persoon === 2) return "il/elle";
  if (vorm.persoon === 5) return "ils/elles";
  return vorm.voornaamwoord;
}

/** Een opgave met een gat: "nous ___", maar "j'___" (zonder spatie, zoals je het schrijft). */
export function metGat(vorm: Vorm): string {
  const vnw = toonVoornaamwoord(vorm);
  return vnw.endsWith("'") ? `${vnw}___` : `${vnw} ___`;
}
