import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H10: Hoofdstuk = {
  nummer: 10,
  titel: "Vroeger",
  doel: "Vertellen hoe het vroeger was en een verhaal in de verleden tijd vertellen.",
  tijd: "imparfait",
  werkwoorden: [
    { id: "etre", tijden: ["imparfait"] },
    { id: "avoir", tijden: ["imparfait"] },
    { id: "faire", tijden: ["imparfait"] },
  ],
  grammatica: [
    {
      titel: "De imparfait maken",
      tekst: [
        "De tweede verleden tijd is de **imparfait**. Hij is heel regelmatig: neem de **nous-vorm van de présent**, haal **-ons** eraf en plak de uitgangen erachter.",
        "*nous faisons → fais- → je faisais*. *nous avons → av- → j'avais*.",
        "De enige uitzondering is **être**: de stam is **ét-** (*j'étais*).",
        "Goed nieuws voor je oren: -ais, -ait en -aient klinken allemaal als 'è'.",
      ],
      tabel: {
        kop: ["", "uitgang", "être", "avoir"],
        rijen: [
          ["je", "-ais", "j'étais", "j'avais"],
          ["tu", "-ais", "tu étais", "tu avais"],
          ["il/elle", "-ait", "il était", "il avait"],
          ["nous", "-ions", "nous étions", "nous avions"],
          ["vous", "-iez", "vous étiez", "vous aviez"],
          ["ils/elles", "-aient", "ils étaient", "ils avaient"],
        ],
      },
    },
    {
      titel: "Imparfait of passé composé?",
      tekst: [
        "Denk aan een film. De **imparfait** is het **decor**: hoe het was, wat er altijd gebeurde, wat er bezig was. De **passé composé** is de **actie**: wat er op één moment gebeurde.",
        "**Imparfait**: beschrijving (*il faisait beau*), gewoonte (*chaque été, nous allions à la mer*), gevoel (*j'étais content*).",
        "**Passé composé**: een afgeronde gebeurtenis (*un jour, je suis tombé*).",
      ],
      voorbeelden: [
        { fr: "Il faisait beau quand je suis parti.", nl: "Het was mooi weer toen ik vertrok." },
        { fr: "Quand j'étais petit, j'avais un chien.", nl: "Toen ik klein was, had ik een hond." },
      ],
    },
    {
      titel: "Handige vaste vormen",
      tekst: [
        "**c'était** = het was (*c'était génial*), **il y avait** = er was/waren, **il faisait** + weer = het was … weer.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Vroeger",
      woorden: [
        w("autrefois", "vroeger", "bw", "📜", "otruhfwa"),
        w("quand", "toen, wanneer", "vw", "🕰️", "kã"),
        w("d'habitude", "gewoonlijk", "bw", "🔄", "dabietuud"),
        w("chaque", "elk, ieder", "vnw", "🔢", "sjak"),
        w("l'enfance", "de jeugd (kindertijd)", "v", "🧸", "lãfãs"),
        w("le village", "het dorp", "m", "🏘️", "luh vielazj"),
        w("la campagne", "het platteland", "v", "🌾", "la kãpanj"),
        w("ici", "hier (plaats)", "bw", "📍", "iesie"),
      ],
    },
    {
      titel: "Mensen beschrijven",
      woorden: [
        w("il y avait", "er was, er waren", "uitdr", "🏚️", "iel-javè"),
        w("c'était", "het was", "uitdr", "💭", "seetè"),
        w("gentil", "aardig, lief", "bn", "🤗", "zjãtie", { vrouwelijk: "gentille" }),
        w("vieux", "oud", "bn", "👴", "vjeu", { vrouwelijk: "vieille" }),
        w("jeune", "jong", "bn", "👶", "zjun"),
        w("joli", "mooi, leuk", "bn", "🌸", "zjolie", { vrouwelijk: "jolie" }),
        w("la grand-mère", "de oma", "v", "👵", "la grã-mèr"),
        w("le grand-père", "de opa", "m", "👴🏻", "luh grã-pèr"),
      ],
    },
    {
      titel: "Gevoelens",
      woorden: [
        w("triste", "verdrietig", "bn", "😢", "triest"),
        w("heureux", "gelukkig", "bn", "😄", "eureu", { vrouwelijk: "heureuse" }),
        w("drôle", "grappig", "bn", "😂", "drol"),
        w("calme", "rustig", "bn", "😌", "kalm"),
        w("avoir peur", "bang zijn", "uitdr", "😱", "avwar pur"),
        w("parce que", "omdat", "vw", "💡", "pars kuh"),
      ],
    },
  ],
  zinnen: [
    { fr: "Quand j'étais petit, j'avais un chien.", nl: "Toen ik klein was, had ik een hond.", alt: ["Quand j'étais petite, j'avais un chien."] },
    { fr: "C'était génial !", nl: "Het was geweldig!" },
    { fr: "Il faisait beau et nous étions heureux.", nl: "Het was mooi weer en wij waren gelukkig.", alt: ["Il faisait beau et nous étions heureuses.", "Il faisait beau et on était heureux."] },
    { fr: "Autrefois, il y avait un marché ici.", nl: "Vroeger was er hier een markt.", alt: ["Il y avait un marché ici autrefois."] },
    { fr: "Ma grand-mère était très gentille.", nl: "Mijn oma was heel lief." },
    { fr: "Nous avions une maison à la campagne.", nl: "Wij hadden een huis op het platteland.", alt: ["On avait une maison à la campagne."] },
    { fr: "Chaque été, nous allions à la mer.", nl: "Elke zomer gingen wij naar zee.", alt: ["Chaque été, on allait à la mer."] },
    { fr: "D'habitude, je faisais les courses le samedi.", nl: "Gewoonlijk deed ik op zaterdag boodschappen." },
    { fr: "Il était triste parce qu'il pleuvait.", nl: "Hij was verdrietig omdat het regende." },
    { fr: "Il faisait froid quand je suis parti.", nl: "Het was koud toen ik vertrok.", alt: ["Il faisait froid quand je suis partie."] },
    { fr: "Vous étiez à la maison ?", nl: "Waren jullie thuis?", alt: ["Étiez-vous à la maison ?"] },
    { fr: "Les enfants avaient peur.", nl: "De kinderen waren bang." },
    { fr: "Elle était jeune et très drôle.", nl: "Zij was jong en heel grappig." },
    { fr: "Mon grand-père avait un vieux vélo.", nl: "Mijn opa had een oude fiets." },
    { fr: "Qu'est-ce que tu faisais ?", nl: "Wat was jij aan het doen?" },
  ],
};
