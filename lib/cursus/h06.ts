import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H6: Hoofdstuk = {
  nummer: 6,
  titel: "Mijn dag en mijn familie",
  doel: "Je dagritme beschrijven, vertellen wat je aantrekt en over je familie praten.",
  tijd: "present",
  werkwoorden: [
    { id: "prendre", tijden: ["present"] },
    { id: "mettre", tijden: ["present"] },
    { id: "selever", tijden: ["present"] },
  ],
  getallen: [100, 1000],
  grammatica: [
    {
      titel: "Wederkerende werkwoorden",
      tekst: [
        "Sommige werkwoorden hebben een extra voornaamwoord dat terugwijst naar jezelf, net als 'zich' in het Nederlands. Je kende er al een: *je m'appelle*.",
        "Het tweede voornaamwoord verandert mee met de persoon. Vóór een klinker wordt me/te/se → **m'/t'/s'**.",
        "Ontkenning: *je **ne** me lève **pas***. De ne staat vóór het wederkerende voornaamwoord.",
      ],
      tabel: {
        kop: ["", "", "se lever"],
        rijen: [
          ["je", "me", "je me lève"],
          ["tu", "te", "tu te lèves"],
          ["il/elle", "se", "il se lève"],
          ["nous", "nous", "nous nous levons"],
          ["vous", "vous", "vous vous levez"],
          ["ils/elles", "se", "ils se lèvent"],
        ],
      },
    },
    {
      titel: "Mijn, jouw, zijn: bezittelijke voornaamwoorden",
      tekst: [
        "Het bezittelijk voornaamwoord past zich aan het **ding** aan, niet aan de bezitter. *Sa mère* is dus zowel 'zijn moeder' als 'haar moeder'.",
        "Vóór een vrouwelijk woord met een klinker gebruik je toch mon/ton/son: *mon amie*.",
      ],
      tabel: {
        kop: ["", "mannelijk", "vrouwelijk", "meervoud"],
        rijen: [
          ["mijn", "mon", "ma", "mes"],
          ["jouw", "ton", "ta", "tes"],
          ["zijn/haar", "son", "sa", "ses"],
          ["ons", "notre", "notre", "nos"],
          ["jullie/uw", "votre", "votre", "vos"],
          ["hun", "leur", "leur", "leurs"],
        ],
      },
    },
    {
      titel: "Hoe laat? Half en kwart",
      tekst: [
        "**et demie** = half (na het uur): *huit heures et demie* = half negen.",
        "**et quart** = kwart over, **moins le quart** = kwart voor: *neuf heures moins le quart* = kwart voor negen.",
        "Minuten zet je er gewoon achter: *sept heures dix* = tien over zeven.",
      ],
    },
    {
      titel: "Tellen: 100 tot 1000",
      tekst: [
        "**cent** = 100, **deux cents** = 200. De s valt weg als er nog een getal volgt: *deux cent trois* (203).",
        "Nooit *un cent*: honderd is gewoon *cent*. Duizend is **mille**.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Mijn ochtend",
      woorden: [
        w("la douche", "de douche", "v", "🚿", "la doesj", { voorbeeld: { fr: "Je prends une douche.", nl: "Ik neem een douche." } }),
        w("tôt", "vroeg", "bw", "🐓", "to"),
        w("tard", "laat", "bw", "🦉", "tar"),
        w("d'abord", "eerst", "bw", "1️⃣", "dabor"),
        w("ensuite", "daarna", "bw", "➡️", "ãswiet"),
        w("le bureau", "het kantoor, het bureau", "m", "🏢", "luh buuro"),
        w("et demie", "half (na het uur)", "uitdr", "🕧", "ee duhmie"),
      ],
    },
    {
      titel: "Kleding",
      woorden: [
        w("le pantalon", "de broek", "m", "👖", "luh pãtalõ"),
        w("la chemise", "het overhemd", "v", "👔", "la sjuhmiez"),
        w("la robe", "de jurk", "v", "👗", "la rob"),
        w("les chaussures", "de schoenen", "mv", "👟", "lee sjosuur"),
        w("le manteau", "de jas", "m", "🧥", "luh mãto"),
        w("le pull", "de trui", "m", "🧶", "luh puul"),
        w("la jupe", "de rok", "v", "🩳", "la zjuup"),
      ],
    },
    {
      titel: "Familie",
      woorden: [
        w("la mère", "de moeder", "v", "👩‍👧", "la mèr"),
        w("le père", "de vader", "m", "👨‍👦", "luh pèr"),
        w("les parents", "de ouders", "mv", "👪", "lee parã"),
        w("le mari", "de echtgenoot", "m", "🤵", "luh marie"),
        w("le fils", "de zoon", "m", "👶", "luh fies"),
        w("la famille", "de familie, het gezin", "v", "🏠", "la famiej"),
        w("mon, ma, mes", "mijn", "vnw", "🙋", "mõ, ma, mee", { alt: ["mon", "ma", "mes"] }),
      ],
    },
  ],
  zinnen: [
    { fr: "Je me lève à sept heures.", nl: "Ik sta om zeven uur op.", alt: ["Je me lève à 7 heures."] },
    { fr: "Tu te lèves tôt !", nl: "Jij staat vroeg op!" },
    { fr: "Nous nous levons tard le week-end.", nl: "Wij staan in het weekend laat op.", alt: ["On se lève tard le week-end."] },
    { fr: "Je prends une douche.", nl: "Ik neem een douche." },
    { fr: "Il prend le train pour aller au bureau.", nl: "Hij neemt de trein om naar kantoor te gaan." },
    { fr: "Je mets un pull, il fait froid.", nl: "Ik trek een trui aan, het is koud." },
    { fr: "Elle met sa robe.", nl: "Zij trekt haar jurk aan." },
    { fr: "Mes parents habitent à Utrecht.", nl: "Mijn ouders wonen in Utrecht." },
    { fr: "Ma mère prend un café.", nl: "Mijn moeder neemt een koffie." },
    { fr: "Mon père se lève à six heures et demie.", nl: "Mijn vader staat om half zeven op." },
    { fr: "D'abord je prends une douche, ensuite je mange.", nl: "Eerst neem ik een douche, daarna eet ik." },
    { fr: "Vous prenez le métro ?", nl: "Neemt u de metro?", alt: ["Prenez-vous le métro ?"] },
    { fr: "Ils mettent leurs chaussures.", nl: "Zij trekken hun schoenen aan.", alt: ["Elles mettent leurs chaussures."] },
    { fr: "Mon fils a quinze ans.", nl: "Mijn zoon is vijftien." },
    { fr: "Tu ne te lèves pas ?", nl: "Sta jij niet op?" },
  ],
};
