import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H4: Hoofdstuk = {
  nummer: 4,
  titel: "In de stad",
  doel: "Zeggen waar je heen gaat, waar je vandaan komt, wat je gaat doen en hoe het weer is.",
  tijd: "present",
  werkwoorden: [
    { id: "aller", tijden: ["present"] },
    { id: "venir", tijden: ["present"] },
    { id: "faire", tijden: ["present"] },
  ],
  getallen: [41, 69],
  grammatica: [
    {
      titel: "Naar: à + lidwoord",
      tekst: [
        "Na aller gebruik je **à** (naar). Samen met le en les smelt het samen: **à + le = au**, **à + les = aux**. Met la en l' verandert er niets.",
      ],
      tabel: {
        rijen: [
          ["à + le", "au", "je vais au marché"],
          ["à + la", "à la", "je vais à la gare"],
          ["à + l'", "à l'", "je vais à l'hôtel"],
          ["à + les", "aux", "je vais aux Pays-Bas"],
        ],
      },
    },
    {
      titel: "Vandaan: de + lidwoord",
      tekst: [
        "Na venir (komen) gebruik je **de** (van, uit). Ook dat smelt samen: **de + le = du**, **de + les = des**. Vóór een klinker wordt de → **d'**: *je viens d'Amsterdam*.",
      ],
      voorbeelden: [{ fr: "Elle vient du supermarché.", nl: "Zij komt van de supermarkt." }],
    },
    {
      titel: "De nabije toekomst: aller + heel werkwoord",
      tekst: [
        "Dit is je eerste toekomende tijd, en hij is makkelijk: **vorm van aller + heel werkwoord**. Precies zoals 'ik ga eten' in het Nederlands.",
        "Hiermee kun je meteen over plannen praten. Ontkennen: *je **ne** vais **pas** manger*.",
      ],
      voorbeelden: [
        { fr: "Je vais manger.", nl: "Ik ga eten." },
        { fr: "Nous allons faire les courses.", nl: "Wij gaan boodschappen doen." },
      ],
    },
    {
      titel: "Het weer: il fait …",
      tekst: ["Voor het weer gebruik je **il fait**: *il fait beau* (mooi weer), *il fait froid* (koud), *il fait chaud* (warm). Regen is een eigen werkwoord: **il pleut**."],
    },
    {
      titel: "Vragen stellen",
      tekst: [
        "De makkelijkste manier: zeg een gewone zin en **laat je stem aan het eind omhoog gaan**. *Tu vas à la plage ?*",
        "**Où** = waar. **Qu'est-ce que** = wat: *Qu'est-ce que tu fais ?* (Wat doe je?)",
      ],
    },
    {
      titel: "Tellen: 41 tot en met 69",
      tekst: ["Hetzelfde patroon als bij 21 t/m 39, met de tientallen **quarante** (40), **cinquante** (50) en **soixante** (60)."],
    },
  ],
  woordgroepen: [
    {
      titel: "In de stad",
      woorden: [
        w("la gare", "het station", "v", "🚉", "la gar"),
        w("la plage", "het strand", "v", "🏖️", "la plazj"),
        w("le marché", "de markt", "m", "🧺", "luh marsjee"),
        w("le musée", "het museum", "m", "🏛️", "luh muuzee"),
        w("la boulangerie", "de bakker", "v", "🥐", "la boelãzjrie"),
        w("le supermarché", "de supermarkt", "m", "🛒", "luh suupèrmarsjee"),
        w("la rue", "de straat", "v", "🛣️", "la ruu"),
        w("l'hôtel", "het hotel", "m", "🏨", "lotèl"),
        w("le parc", "het park", "m", "🌳", "luh park"),
      ],
    },
    {
      titel: "Onderweg",
      woorden: [
        w("le train", "de trein", "m", "🚆", "luh trẽ"),
        w("le bus", "de bus", "m", "🚌", "luh buus"),
        w("le métro", "de metro", "m", "🚇", "luh meetro"),
        w("l'avion", "het vliegtuig", "m", "✈️", "lavjõ"),
        w("à pied", "lopend", "uitdr", "🚶", "a pjee"),
        w("où", "waar", "bw", "❓", "oe"),
        w("dans", "in", "vz", "📦", "dã"),
        w("aujourd'hui", "vandaag", "bw", "📅", "ozjoerdwie"),
        w("demain", "morgen", "bw", "🌅", "duhmẽ"),
      ],
    },
    {
      titel: "Weer en bezigheden",
      woorden: [
        w("il fait beau", "het is mooi weer", "uitdr", "☀️", "iel fè bo"),
        w("il fait froid", "het is koud", "uitdr", "🥶", "iel fè frwa"),
        w("il fait chaud", "het is warm", "uitdr", "🥵", "iel fè sjo"),
        w("il pleut", "het regent", "uitdr", "🌧️", "iel pleu"),
        w("les courses", "de boodschappen", "mv", "🛍️", "lee koers", { voorbeeld: { fr: "Je fais les courses.", nl: "Ik doe boodschappen." } }),
        w("la promenade", "de wandeling", "v", "🥾", "la promnad", { voorbeeld: { fr: "On fait une promenade ?", nl: "Zullen we een wandeling maken?" } }),
        w("qu'est-ce que", "wat (vraag)", "uitdr", "🤔", "kès kuh"),
      ],
    },
  ],
  zinnen: [
    { fr: "Je vais à la gare.", nl: "Ik ga naar het station." },
    { fr: "Tu vas au marché ?", nl: "Ga jij naar de markt?", alt: ["Vas-tu au marché ?"] },
    { fr: "Nous allons à la plage.", nl: "Wij gaan naar het strand.", alt: ["On va à la plage."] },
    { fr: "Ils vont au musée demain.", nl: "Zij gaan morgen naar het museum.", alt: ["Elles vont au musée demain.", "Demain, ils vont au musée."] },
    { fr: "Je viens d'Amsterdam.", nl: "Ik kom uit Amsterdam." },
    { fr: "Elle vient du supermarché.", nl: "Zij komt van de supermarkt." },
    { fr: "Il fait beau aujourd'hui.", nl: "Het is mooi weer vandaag.", alt: ["Aujourd'hui, il fait beau."] },
    { fr: "Qu'est-ce que tu fais ?", nl: "Wat doe jij?" },
    { fr: "Je fais les courses.", nl: "Ik doe boodschappen." },
    { fr: "Nous faisons une promenade dans le parc.", nl: "Wij maken een wandeling in het park.", alt: ["On fait une promenade dans le parc."] },
    { fr: "Je vais manger au restaurant.", nl: "Ik ga in het restaurant eten." },
    { fr: "Où est la gare ?", nl: "Waar is het station?" },
    { fr: "Il pleut, on va au musée.", nl: "Het regent, we gaan naar het museum.", alt: ["Il pleut, nous allons au musée."] },
    { fr: "Vous venez en train ?", nl: "Komen jullie met de trein?", alt: ["Venez-vous en train ?"] },
    { fr: "Demain, je vais aller à Paris en avion.", nl: "Morgen ga ik met het vliegtuig naar Parijs.", alt: ["Demain, je vais à Paris en avion."] },
  ],
};
