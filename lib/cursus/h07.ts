import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H7: Hoofdstuk = {
  nummer: 7,
  titel: "Afspreken en plannen",
  doel: "Afspraken maken, zeggen hoe vaak je iets doet en over de seizoenen praten.",
  tijd: "present",
  werkwoorden: [
    { id: "finir", tijden: ["present"] },
    { id: "attendre", tijden: ["present"] },
    { id: "voir", tijden: ["present"] },
  ],
  getallen: [1000, 2100],
  grammatica: [
    {
      titel: "Werkwoorden op -ir en -re",
      tekst: [
        "Naast -er zijn er nog twee regelmatige groepen.",
        "**-ir** (zoals finir): in het meervoud komt er **-iss-** bij: *nous finissons*.",
        "**-re** (zoals attendre): bij il/elle komt er géén uitgang: *il attend*. De d hoor je alleen in het meervoud.",
      ],
      tabel: {
        kop: ["", "finir", "attendre"],
        rijen: [
          ["je", "finis", "attends"],
          ["tu", "finis", "attends"],
          ["il/elle", "finit", "attend"],
          ["nous", "finissons", "attendons"],
          ["vous", "finissez", "attendez"],
          ["ils/elles", "finissent", "attendent"],
        ],
      },
    },
    {
      titel: "Hem, haar, het: le, la, les",
      tekst: [
        "Wil je een zelfstandig naamwoord niet herhalen, dan gebruik je **le** (hem/het), **la** (haar/het) of **les** (ze). Het staat **vóór** het werkwoord.",
        "*Je vois Marie → je **la** vois.* Vóór een klinker: **l'** — *je l'attends*.",
        "Ontkenning: *je ne la vois pas*.",
      ],
      voorbeelden: [
        { fr: "Tu vois le bus ? Oui, je le vois.", nl: "Zie je de bus? Ja, ik zie hem." },
      ],
    },
    {
      titel: "Deze, dit: ce, cet, cette, ces",
      tekst: ["**ce** (mannelijk), **cet** (mannelijk vóór een klinker), **cette** (vrouwelijk), **ces** (meervoud): *ce soir*, *cet été*, *cette année*, *ces films*."],
    },
    {
      titel: "Hoe vaak? En: nooit",
      tekst: [
        "*toujours* (altijd), *souvent* (vaak), *parfois* (soms).",
        "**Nooit** werkt als een ontkenning: **ne … jamais**. *Je ne mange jamais de viande.*",
      ],
    },
    {
      titel: "Tellen: jaartallen",
      tekst: [
        "Jaartallen zeg je als een gewoon getal: 1998 = *mille neuf cent quatre-vingt-dix-huit*, 2026 = *deux mille vingt-six*.",
        "**Mille** krijgt nooit een s: *deux mille*.",
        "'In 2026' = **en** 2026.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Uitgaan",
      woorden: [
        w("le rendez-vous", "de afspraak", "m", "📌", "luh rãdee-voe"),
        w("le film", "de film", "m", "🎞️", "luh fielm"),
        w("le billet", "het kaartje", "m", "🎟️", "luh biejè"),
        w("la fête", "het feest", "v", "🎉", "la fèt"),
        w("l'anniversaire", "de verjaardag", "m", "🎂", "lanieversèr"),
        w("le concert", "het concert", "m", "🎸", "luh kõsèr"),
        w("bientôt", "binnenkort", "bw", "🔜", "bjẽto"),
      ],
    },
    {
      titel: "Hoe vaak?",
      woorden: [
        w("toujours", "altijd", "bw", "♾️", "toezjoer"),
        w("souvent", "vaak", "bw", "🔁", "soevã"),
        w("parfois", "soms", "bw", "🎲", "parfwa"),
        w("ne … jamais", "nooit", "bw", "🚫", "nuh … zjamè", { alt: ["jamais", "ne jamais"] }),
        w("déjà", "al", "bw", "✔️", "deezja"),
        w("encore", "nog, weer", "bw", "🔂", "ãkor"),
      ],
    },
    {
      titel: "Het jaar",
      woorden: [
        w("l'année", "het jaar", "v", "📆", "lanee"),
        w("le mois", "de maand", "m", "🗓️", "luh mwa"),
        w("le printemps", "de lente", "m", "🌷", "luh prẽtã"),
        w("l'été", "de zomer", "m", "🌞", "leetee"),
        w("l'automne", "de herfst", "m", "🍂", "loton"),
        w("l'hiver", "de winter", "m", "⛄", "lievèr"),
        w("juillet", "juli", "m", "🏝️", "zjwiejè"),
      ],
    },
  ],
  zinnen: [
    { fr: "Je finis mon travail à cinq heures.", nl: "Ik maak mijn werk om vijf uur af.", alt: ["Je finis mon travail à 5 heures."] },
    { fr: "Le film finit tard.", nl: "De film eindigt laat." },
    { fr: "Nous finissons le gâteau.", nl: "Wij maken de taart op.", alt: ["On finit le gâteau."] },
    { fr: "J'attends le bus.", nl: "Ik wacht op de bus." },
    { fr: "Tu attends tes amis ?", nl: "Wacht jij op je vrienden?" },
    { fr: "Ils attendent à la gare.", nl: "Zij wachten op het station.", alt: ["Elles attendent à la gare."] },
    { fr: "Je vois souvent mes parents.", nl: "Ik zie mijn ouders vaak." },
    { fr: "Je la vois demain.", nl: "Ik zie haar morgen." },
    { fr: "On se voit bientôt !", nl: "Tot snel!" },
    { fr: "Je ne mange jamais de viande.", nl: "Ik eet nooit vlees." },
    { fr: "Mon anniversaire est en juillet.", nl: "Mijn verjaardag is in juli." },
    { fr: "En été, nous allons à la plage.", nl: "In de zomer gaan wij naar het strand.", alt: ["En été, on va à la plage."] },
    { fr: "Cette année, je vais en France.", nl: "Dit jaar ga ik naar Frankrijk." },
    { fr: "Vous avez un rendez-vous ce soir ?", nl: "Heeft u vanavond een afspraak?", alt: ["Avez-vous un rendez-vous ce soir ?"] },
    { fr: "Il est déjà là ?", nl: "Is hij er al?" },
  ],
};
