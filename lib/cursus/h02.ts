import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H2: Hoofdstuk = {
  nummer: 2,
  titel: "Wat doe je graag?",
  doel: "Vertellen waar je woont, welke talen je spreekt en waar je van houdt.",
  tijd: "present",
  werkwoorden: [
    { id: "parler", tijden: ["present"] },
    { id: "habiter", tijden: ["present"] },
    { id: "aimer", tijden: ["present"] },
  ],
  getallen: [11, 20],
  grammatica: [
    {
      titel: "Regelmatige werkwoorden op -er",
      tekst: [
        "Negen van de tien Franse werkwoorden eindigen op **-er**. Ze gaan allemaal hetzelfde: haal -er van het hele werkwoord af en plak er de uitgang aan.",
        "Goed nieuws voor het spreken: **-e, -es, -e en -ent klinken allemaal hetzelfde** (je hoort ze niet). Alleen bij nous (-õ) en vous (-ee) hoor je de uitgang.",
      ],
      tabel: {
        kop: ["", "uitgang", "parler", "uitspraak"],
        rijen: [
          ["je", "-e", "je parle", "zjuh parl"],
          ["tu", "-es", "tu parles", "tuu parl"],
          ["il/elle", "-e", "il parle", "iel parl"],
          ["nous", "-ons", "nous parlons", "noe parlõ"],
          ["vous", "-ez", "vous parlez", "voe parlee"],
          ["ils/elles", "-ent", "ils parlent", "iel parl"],
        ],
      },
    },
    {
      titel: "Niet: ne … pas",
      tekst: [
        "Een ontkenning bestaat uit **twee delen om het werkwoord heen**: *je **ne** parle **pas***.",
        "Vóór een klinker wordt ne → **n'**: *je n'aime pas*, *il n'habite pas*.",
        "In spreektaal laten Fransen de ne vaak weg (*je parle pas*), maar schrijf hem wel.",
      ],
      voorbeelden: [
        { fr: "Je ne parle pas anglais.", nl: "Ik spreek geen Engels." },
        { fr: "Il n'aime pas le sport.", nl: "Hij houdt niet van sport." },
      ],
    },
    {
      titel: "In een stad, in een land",
      tekst: [
        "In of naar een **stad**: **à** — *j'habite à Utrecht*.",
        "In of naar een **vrouwelijk land** (de meeste landen op -e): **en** — *en France*, *en Belgique*.",
        "In of naar een **mannelijk land**: **au** — *au Portugal*. Meervoud: **aux** — *aux Pays-Bas*.",
      ],
    },
    {
      titel: "Houden van: altijd met lidwoord",
      tekst: [
        "Na aimer gebruik je het bepaalde lidwoord, ook als het Nederlands dat niet doet: *j'aime **la** musique* (ik houd van muziek).",
        "Een taal na parler staat zonder lidwoord: *je parle français*.",
        "Met **beaucoup** (veel) maak je het sterker: *j'aime beaucoup le cinéma*.",
      ],
    },
    {
      titel: "Tellen: 11 tot en met 20",
      tekst: [
        "Van 11 tot en met 16 zijn het eigen woorden. Vanaf 17 plak je ze aan elkaar: *dix-sept* = tien-zeven.",
        "Bij *dix-huit* en *dix-neuf* klinkt de x als een z: 'diez-wiet', 'diez-nuf'.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Talen en landen",
      woorden: [
        w("le français", "het Frans (taal)", "m", "🥖", "luh frãsè", { alt: ["français"] }),
        w("l'anglais", "het Engels", "m", "💂", "lãglè", { alt: ["anglais"] }),
        w("le néerlandais", "het Nederlands (taal)", "m", "🌷", "luh neerlãdè", { alt: ["néerlandais"] }),
        w("la France", "Frankrijk", "v", "🗼", "la frãs"),
        w("les Pays-Bas", "Nederland", "mv", "🧀", "lee pee-ie-ba"),
        w("la Belgique", "België", "v", "🍟", "la bèlzjiek"),
        w("la ville", "de stad", "v", "🏙️", "la viel"),
      ],
    },
    {
      titel: "Vrije tijd",
      woorden: [
        w("la musique", "de muziek", "v", "🎵", "la muuziek"),
        w("le sport", "de sport", "m", "⚽", "luh spor"),
        w("le cinéma", "de bioscoop, de film", "m", "🎬", "luh sieneema"),
        w("le chocolat", "de chocolade", "m", "🍫", "luh sjokola"),
        w("le livre", "het boek", "m", "📖", "luh lievr"),
        w("le vélo", "de fiets", "m", "🚲", "luh veelo"),
        w("le travail", "het werk", "m", "💼", "luh travaj"),
        w("l'école", "de school", "v", "🏫", "leekol"),
      ],
    },
    {
      titel: "Kleine woorden",
      woorden: [
        w("mais", "maar", "vw", "↔️", "mè"),
        w("aussi", "ook", "bw", "➕", "osie"),
        w("beaucoup", "veel, erg", "bw", "💯", "bokoe"),
        w("très", "zeer, heel", "bw", "‼️", "trè"),
        w("un peu", "een beetje", "bw", "🤏", "ẽ peu"),
        w("avec", "met", "vz", "🤝", "avèk"),
        w("à", "in, naar (stad)", "vz", "📍", "a"),
        w("en", "in, naar (land)", "vz", "🗺️", "ã"),
      ],
    },
  ],
  zinnen: [
    { fr: "Je parle néerlandais.", nl: "Ik spreek Nederlands." },
    { fr: "Tu parles anglais ?", nl: "Spreek jij Engels?", alt: ["Parles-tu anglais ?"] },
    { fr: "Nous parlons un peu français.", nl: "Wij spreken een beetje Frans.", alt: ["On parle un peu français."] },
    { fr: "J'habite à Amsterdam.", nl: "Ik woon in Amsterdam." },
    { fr: "Elle habite en France.", nl: "Zij woont in Frankrijk." },
    { fr: "Vous habitez aux Pays-Bas ?", nl: "Woont u in Nederland?", alt: ["Habitez-vous aux Pays-Bas ?"] },
    { fr: "J'aime beaucoup la musique.", nl: "Ik houd erg van muziek." },
    { fr: "Il n'aime pas le sport.", nl: "Hij houdt niet van sport." },
    { fr: "Je ne parle pas anglais.", nl: "Ik spreek geen Engels." },
    { fr: "Ils aiment le chocolat.", nl: "Zij houden van chocolade.", alt: ["Elles aiment le chocolat."] },
    { fr: "Nous n'habitons pas à Paris.", nl: "Wij wonen niet in Parijs.", alt: ["On n'habite pas à Paris."] },
    { fr: "Tu aimes le cinéma ?", nl: "Houd jij van film?", alt: ["Aimes-tu le cinéma ?"] },
    { fr: "J'aime le vélo, mais j'aime aussi le sport.", nl: "Ik houd van fietsen, maar ik houd ook van sport." },
    { fr: "Paris est une très grande ville.", nl: "Parijs is een heel grote stad." },
    { fr: "Elle parle avec l'enfant.", nl: "Zij praat met het kind." },
  ],
};
