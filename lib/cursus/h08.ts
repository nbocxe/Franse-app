import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H8: Hoofdstuk = {
  nummer: 8,
  titel: "Wat heb je gedaan?",
  doel: "Vertellen wat je gisteren of op vakantie hebt gedaan: je eerste verleden tijd.",
  tijd: "passe-compose",
  werkwoorden: [
    { id: "manger", tijden: ["passe-compose"] },
    { id: "faire", tijden: ["passe-compose"] },
    { id: "voir", tijden: ["passe-compose"] },
  ],
  grammatica: [
    {
      titel: "Nu naar de verleden tijd",
      tekst: [
        "Je kunt nu in de tegenwoordige tijd een gesprek voeren. Tijd voor de verleden tijd!",
        "De **passé composé** is de tijd die je het meest gebruikt om te vertellen wat er gebeurd is. Hij werkt precies als 'ik heb gegeten' in het Nederlands: **avoir** + **voltooid deelwoord**.",
        "*J'ai mangé* = ik heb gegeten, maar ook: ik at.",
      ],
      tabel: {
        kop: ["", "manger"],
        rijen: [
          ["je", "j'ai mangé"],
          ["tu", "tu as mangé"],
          ["il/elle", "il a mangé"],
          ["nous", "nous avons mangé"],
          ["vous", "vous avez mangé"],
          ["ils/elles", "ils ont mangé"],
        ],
      },
    },
    {
      titel: "Het voltooid deelwoord maken",
      tekst: [
        "Bij de regelmatige werkwoorden is het makkelijk:",
      ],
      tabel: {
        kop: ["groep", "regel", "voorbeeld"],
        rijen: [
          ["-er", "-er → -é", "parler → parlé"],
          ["-ir", "-ir → -i", "finir → fini"],
          ["-re", "-re → -u", "attendre → attendu"],
        ],
      },
    },
    {
      titel: "Onregelmatige deelwoorden",
      tekst: ["De belangrijkste onregelmatige werkwoorden hebben een eigen deelwoord. Deze moet je uit je hoofd leren:"],
      tabel: {
        rijen: [
          ["être → été", "avoir → eu"],
          ["faire → fait", "voir → vu"],
          ["prendre → pris", "mettre → mis"],
          ["boire → bu", "vouloir → voulu"],
          ["pouvoir → pu", "devoir → dû"],
          ["savoir → su", "lire → lu"],
        ],
      },
    },
    {
      titel: "Niet gedaan: ne … pas om avoir",
      tekst: [
        "De ontkenning gaat om het hulpwerkwoord heen, het deelwoord komt erachter: *je **n'**ai **pas** mangé*.",
        "Tijdsaanduidingen: **hier** (gisteren), **hier soir** (gisteravond), **la semaine dernière** (vorige week), **il y a deux jours** (twee dagen geleden).",
      ],
      voorbeelden: [
        { fr: "Je n'ai pas vu le film.", nl: "Ik heb de film niet gezien." },
        { fr: "Qu'est-ce que tu as fait hier ?", nl: "Wat heb je gisteren gedaan?" },
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Wanneer?",
      woorden: [
        w("hier", "gisteren", "bw", "⏪", "jèr"),
        w("hier soir", "gisteravond", "bw", "🌜", "jèr swar"),
        w("ce matin", "vanochtend", "bw", "🌄", "suh matẽ"),
        w("la semaine dernière", "vorige week", "uitdr", "📅", "la suhmèn dèrnjèr"),
        w("l'année dernière", "vorig jaar", "uitdr", "🗓️", "lanee dèrnjèr"),
        w("il y a", "geleden; er is/zijn", "uitdr", "⌛", "iel-ja", { voorbeeld: { fr: "Il y a deux jours.", nl: "Twee dagen geleden." } }),
        w("pas encore", "nog niet", "bw", "⏸️", "pa-zãkor"),
      ],
    },
    {
      titel: "Op vakantie",
      woorden: [
        w("les vacances", "de vakantie", "mv", "🏕️", "lee vakãs"),
        w("la montagne", "de berg, de bergen", "v", "⛰️", "la mõtanj"),
        w("la mer", "de zee", "v", "🌊", "la mèr"),
        w("le voyage", "de reis", "m", "🧭", "luh vwajazj"),
        w("la photo", "de foto", "v", "📸", "la foto"),
        w("le château", "het kasteel", "m", "🏰", "luh sjato"),
        w("le pays", "het land", "m", "🌍", "luh pee-ie"),
      ],
    },
    {
      titel: "Hoe was het?",
      woorden: [
        w("intéressant", "interessant", "bn", "🧐", "ẽteerèsã", { vrouwelijk: "intéressante" }),
        w("ennuyeux", "saai", "bn", "🥱", "ãnwiejeu", { vrouwelijk: "ennuyeuse" }),
        w("génial", "geweldig", "bn", "🤩", "zjeenjal", { vrouwelijk: "géniale" }),
        w("bon", "goed, lekker", "bn", "👌", "bõ", { vrouwelijk: "bonne" }),
        w("mauvais", "slecht, vies", "bn", "👎", "movè", { vrouwelijk: "mauvaise" }),
        w("beau", "mooi", "bn", "🌅", "bo", { vrouwelijk: "belle" }),
        w("cher", "duur", "bn", "💶", "sjèr", { vrouwelijk: "chère" }),
      ],
    },
  ],
  zinnen: [
    { fr: "J'ai mangé du poisson hier.", nl: "Ik heb gisteren vis gegeten.", alt: ["Hier, j'ai mangé du poisson."] },
    { fr: "Qu'est-ce que tu as fait hier ?", nl: "Wat heb jij gisteren gedaan?", alt: ["Tu as fait quoi hier ?"] },
    { fr: "Nous avons fait une promenade à la montagne.", nl: "Wij hebben een wandeling in de bergen gemaakt.", alt: ["On a fait une promenade à la montagne."] },
    { fr: "J'ai vu un film intéressant.", nl: "Ik heb een interessante film gezien." },
    { fr: "Ils ont vu la mer.", nl: "Zij hebben de zee gezien.", alt: ["Elles ont vu la mer."] },
    { fr: "Elle a pris beaucoup de photos.", nl: "Zij heeft veel foto's gemaakt." },
    { fr: "Je n'ai pas mangé ce matin.", nl: "Ik heb vanochtend niet gegeten." },
    { fr: "Vous avez vu le château ?", nl: "Hebben jullie het kasteel gezien?", alt: ["Avez-vous vu le château ?"] },
    { fr: "Nous avons fait un beau voyage.", nl: "Wij hebben een mooie reis gemaakt.", alt: ["On a fait un beau voyage."] },
    { fr: "Il a parlé avec sa mère.", nl: "Hij heeft met zijn moeder gepraat." },
    { fr: "Tu as bu du vin hier soir ?", nl: "Heb jij gisteravond wijn gedronken?", alt: ["As-tu bu du vin hier soir ?"] },
    { fr: "Il y a deux jours, j'ai vu mes amis.", nl: "Twee dagen geleden heb ik mijn vrienden gezien.", alt: ["J'ai vu mes amis il y a deux jours."] },
    { fr: "Je n'ai pas encore fini.", nl: "Ik ben nog niet klaar." },
    { fr: "C'était génial !", nl: "Het was geweldig!" },
    { fr: "Nous avons mangé dans un bon restaurant.", nl: "Wij hebben in een goed restaurant gegeten.", alt: ["On a mangé dans un bon restaurant."] },
  ],
};
