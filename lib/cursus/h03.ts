import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H3: Hoofdstuk = {
  nummer: 3,
  titel: "Aan tafel",
  doel: "Eten en drinken bestellen, zeggen wat je lekker vindt en of je honger hebt.",
  tijd: "present",
  werkwoorden: [
    { id: "manger", tijden: ["present"] },
    { id: "boire", tijden: ["present"] },
    { id: "vouloir", tijden: ["present"] },
  ],
  getallen: [21, 40],
  grammatica: [
    {
      titel: "Een deel van iets: du, de la, des",
      tekst: [
        "Als je een **onbepaalde hoeveelheid** bedoelt (brood, water, wat groente), zet je er in het Frans altijd een 'delend lidwoord' voor. In het Nederlands staat daar niets.",
        "Dat is de + het lidwoord: **de + le = du**, **de + la = de la**, **de + l' = de l'**, **de + les = des**.",
      ],
      tabel: {
        kop: ["", "Frans", "Nederlands"],
        rijen: [
          ["mannelijk", "du pain", "brood"],
          ["vrouwelijk", "de la viande", "vlees"],
          ["klinker", "de l'eau", "water"],
          ["meervoud", "des légumes", "groente"],
        ],
      },
      voorbeelden: [{ fr: "Je bois de l'eau.", nl: "Ik drink water." }],
    },
    {
      titel: "Geen: ne … pas de",
      tekst: [
        "Na een ontkenning worden du, de la, de l' en des allemaal **de** (of **d'** vóór een klinker).",
        "*Je mange **du** pain* → *je ne mange **pas de** pain*. *Il boit **de l'**eau* → *il ne boit **pas d'**eau*.",
      ],
    },
    {
      titel: "Beleefd bestellen: je voudrais",
      tekst: [
        "*Je veux* (ik wil) klinkt bot. In een winkel of restaurant zeg je **je voudrais** ('zjuh voedrè'): ik zou graag willen.",
        "Na vouloir kan ook een heel werkwoord volgen: *je veux manger* (ik wil eten).",
      ],
      voorbeelden: [
        { fr: "Je voudrais un café, s'il vous plaît.", nl: "Ik wil graag een koffie, alstublieft." },
        { fr: "L'addition, s'il vous plaît.", nl: "De rekening, alstublieft." },
      ],
    },
    {
      titel: "Honger en dorst: avoir",
      tekst: ["Net als bij je leeftijd gebruik je avoir: je *hebt* honger. **J'ai faim**, **j'ai soif**."],
    },
    {
      titel: "Tellen: 21 tot en met 40",
      tekst: [
        "Het patroon is: tiental + streepje + eenheid: *vingt-deux*, *trente-cinq*.",
        "Alleen bij **1** zeg je **et** zonder streepjes: *vingt et un*, *trente et un*.",
        "Bij *vingt-deux* tot *vingt-neuf* hoor je de t van vingt: 'vẽt-deu'.",
      ],
      tabel: { rijen: [["20", "vingt"], ["30", "trente"], ["40", "quarante"]] },
    },
  ],
  woordgroepen: [
    {
      titel: "Eten",
      woorden: [
        w("le pain", "het brood", "m", "🥖", "luh pẽ"),
        w("le fromage", "de kaas", "m", "🧀", "luh fromazj"),
        w("la viande", "het vlees", "v", "🥩", "la vjãd"),
        w("le poisson", "de vis", "m", "🐟", "luh pwasõ"),
        w("la pomme", "de appel", "v", "🍎", "la pom"),
        w("les légumes", "de groente", "mv", "🥦", "lee leeguum"),
        w("l'œuf", "het ei", "m", "🥚", "luf", { alt: ["l'oeuf"] }),
        w("le gâteau", "de taart", "m", "🍰", "luh gato"),
      ],
    },
    {
      titel: "Drinken",
      woorden: [
        w("l'eau", "het water", "v", "💧", "lo"),
        w("le café", "de koffie", "m", "☕", "luh kafee"),
        w("le thé", "de thee", "m", "🍵", "luh tee"),
        w("le vin", "de wijn", "m", "🍷", "luh vẽ"),
        w("la bière", "het bier", "v", "🍺", "la bjèr"),
        w("le lait", "de melk", "m", "🥛", "luh lè"),
        w("le jus d'orange", "het sinaasappelsap", "m", "🧃", "luh zjuu dorãzj"),
      ],
    },
    {
      titel: "Uit eten",
      woorden: [
        w("le petit-déjeuner", "het ontbijt", "m", "🥐", "luh puhtie-deezjeunee"),
        w("le déjeuner", "de lunch", "m", "🥗", "luh deezjeunee"),
        w("le dîner", "het avondeten", "m", "🍝", "luh dienee"),
        w("le restaurant", "het restaurant", "m", "🍴", "luh rèstorã"),
        w("l'addition", "de rekening", "v", "🧾", "ladiesjõ"),
        w("avoir faim", "honger hebben", "uitdr", "😋", "avwar fẽ", { voorbeeld: { fr: "J'ai faim.", nl: "Ik heb honger." } }),
        w("avoir soif", "dorst hebben", "uitdr", "🥵", "avwar swaf", { voorbeeld: { fr: "Tu as soif ?", nl: "Heb je dorst?" } }),
        w("délicieux", "heerlijk", "bn", "😍", "deeliesjeu", { vrouwelijk: "délicieuse" }),
      ],
    },
  ],
  zinnen: [
    { fr: "Je mange du pain.", nl: "Ik eet brood." },
    { fr: "Tu bois du café ?", nl: "Drink jij koffie?", alt: ["Bois-tu du café ?"] },
    { fr: "Elle ne mange pas de viande.", nl: "Zij eet geen vlees." },
    { fr: "Nous buvons de l'eau.", nl: "Wij drinken water.", alt: ["On boit de l'eau."] },
    { fr: "Je voudrais un café, s'il vous plaît.", nl: "Ik wil graag een koffie, alstublieft." },
    { fr: "Vous voulez du vin ?", nl: "Wilt u wijn?", alt: ["Voulez-vous du vin ?"] },
    { fr: "Ils veulent manger au restaurant.", nl: "Zij willen in het restaurant eten.", alt: ["Elles veulent manger au restaurant."] },
    { fr: "J'ai faim !", nl: "Ik heb honger!" },
    { fr: "Tu as soif ?", nl: "Heb jij dorst?", alt: ["As-tu soif ?"] },
    { fr: "Le fromage est délicieux.", nl: "De kaas is heerlijk." },
    { fr: "Je bois du thé avec du lait.", nl: "Ik drink thee met melk." },
    { fr: "L'addition, s'il vous plaît.", nl: "De rekening, alstublieft." },
    { fr: "Il boit une bière.", nl: "Hij drinkt een biertje." },
    { fr: "Nous mangeons du poisson et des légumes.", nl: "Wij eten vis en groente.", alt: ["On mange du poisson et des légumes."] },
    { fr: "Je ne veux pas de gâteau, merci.", nl: "Ik wil geen taart, dank je." },
  ],
};
