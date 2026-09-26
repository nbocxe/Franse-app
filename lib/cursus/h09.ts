import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H9: Hoofdstuk = {
  nummer: 9,
  titel: "Op reis",
  doel: "Over een reis vertellen: waar je heen bent gegaan, wanneer je vertrok en aankwam.",
  tijd: "passe-compose",
  werkwoorden: [
    { id: "aller", tijden: ["passe-compose"] },
    { id: "venir", tijden: ["passe-compose"] },
    { id: "partir", tijden: ["present", "passe-compose"] },
  ],
  grammatica: [
    {
      titel: "Passé composé met être",
      tekst: [
        "Een kleine groep werkwoorden gebruikt **être** in plaats van avoir, net als 'ik ben gegaan' in het Nederlands. Het zijn vooral werkwoorden van **beweging** (van A naar B) en **verandering**.",
        "Alle **wederkerende** werkwoorden gaan ook met être: *je me suis levé*.",
      ],
      tabel: {
        kop: ["werkwoord", "deelwoord", "betekenis"],
        rijen: [
          ["aller", "allé", "gaan"],
          ["venir", "venu", "komen"],
          ["partir", "parti", "vertrekken"],
          ["arriver", "arrivé", "aankomen"],
          ["entrer", "entré", "binnengaan"],
          ["sortir", "sorti", "uitgaan"],
          ["rester", "resté", "blijven"],
          ["rentrer", "rentré", "thuiskomen"],
          ["tomber", "tombé", "vallen"],
          ["naître / mourir", "né / mort", "geboren worden / sterven"],
        ],
      },
    },
    {
      titel: "Het deelwoord past zich aan",
      tekst: [
        "Bij être gedraagt het deelwoord zich als een bijvoeglijk naamwoord: **+e** als het onderwerp vrouwelijk is, **+s** in het meervoud.",
        "*Il est allé*, *elle est allée*, *ils sont allés*, *elles sont allées*.",
        "In de tabellen zie je daarom *allé(e)*. Ben je een vrouw, dan schrijf je: *je suis allée*. Je hoort het verschil niet.",
      ],
      voorbeelden: [
        { fr: "Elle est partie hier.", nl: "Zij is gisteren vertrokken." },
        { fr: "Nous sommes arrivés à midi.", nl: "Wij zijn om twaalf uur aangekomen." },
      ],
    },
    {
      titel: "Landen: en, au, aux",
      tekst: [
        "Herhaling: **en** + vrouwelijk land (*en Espagne*, *en Italie*), **au** + mannelijk land (*au Portugal*), **aux** + meervoud (*aux Pays-Bas*).",
        "Naar het buitenland = **à l'étranger**.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Reizen",
      woorden: [
        w("l'aéroport", "het vliegveld", "m", "🛫", "la-eeropor"),
        w("la valise", "de koffer", "v", "🧳", "la valiez"),
        w("le passeport", "het paspoort", "m", "🛂", "luh paspor"),
        w("la chambre", "de kamer", "v", "🛏️", "la sjãbr"),
        w("la clé", "de sleutel", "v", "🔑", "la klee"),
        w("à l'étranger", "in/naar het buitenland", "uitdr", "🌐", "a leetrãzjee"),
      ],
    },
    {
      titel: "Bewegingswerkwoorden",
      woorden: [
        w("arriver", "aankomen", "ww", "🏁", "arievee", { voorbeeld: { fr: "Je suis arrivé à Paris.", nl: "Ik ben in Parijs aangekomen." } }),
        w("rester", "blijven", "ww", "🛋️", "rèstee", { voorbeeld: { fr: "Elle est restée à la maison.", nl: "Zij is thuisgebleven." } }),
        w("rentrer", "thuiskomen, terugkeren", "ww", "🏠", "rãtree", { voorbeeld: { fr: "Nous sommes rentrés tard.", nl: "Wij zijn laat thuisgekomen." } }),
        w("sortir", "uitgaan, naar buiten gaan", "ww", "🚪", "sortier", { voorbeeld: { fr: "Tu es sorti hier soir ?", nl: "Ben je gisteravond uitgegaan?" } }),
        w("tomber", "vallen", "ww", "🤕", "tõbee", { voorbeeld: { fr: "Il est tombé.", nl: "Hij is gevallen." } }),
        w("entrer", "binnengaan", "ww", "🚶‍➡️", "ãtree"),
      ],
    },
    {
      titel: "Landen",
      woorden: [
        w("l'Espagne", "Spanje", "v", "🇪🇸", "lèspanj"),
        w("l'Italie", "Italië", "v", "🇮🇹", "lietalie"),
        w("l'Allemagne", "Duitsland", "v", "🇩🇪", "lalmanj"),
        w("l'Angleterre", "Engeland", "v", "🇬🇧", "lãgluhtèr"),
        w("la Suisse", "Zwitserland", "v", "🇨🇭", "la swies"),
        w("le Portugal", "Portugal", "m", "🇵🇹", "luh portuugal"),
      ],
    },
  ],
  zinnen: [
    { fr: "Je suis allé à Paris.", nl: "Ik ben naar Parijs gegaan.", alt: ["Je suis allée à Paris."] },
    { fr: "Elle est allée en Espagne.", nl: "Zij is naar Spanje gegaan." },
    { fr: "Nous sommes partis tôt.", nl: "Wij zijn vroeg vertrokken.", alt: ["Nous sommes parties tôt.", "On est partis tôt."] },
    { fr: "Ils sont venus en train.", nl: "Zij zijn met de trein gekomen.", alt: ["Elles sont venues en train."] },
    { fr: "Tu es venu à la fête ?", nl: "Ben jij naar het feest gekomen?", alt: ["Tu es venue à la fête ?", "Es-tu venu à la fête ?"] },
    { fr: "Elle est arrivée à l'aéroport.", nl: "Zij is op het vliegveld aangekomen." },
    { fr: "Nous sommes restés à l'hôtel.", nl: "Wij zijn in het hotel gebleven.", alt: ["Nous sommes restées à l'hôtel.", "On est restés à l'hôtel."] },
    { fr: "Je ne suis pas sorti hier soir.", nl: "Ik ben gisteravond niet uitgegaan.", alt: ["Je ne suis pas sortie hier soir."] },
    { fr: "Mes amis sont rentrés de vacances.", nl: "Mijn vrienden zijn teruggekomen van vakantie." },
    { fr: "Il est parti avec sa valise.", nl: "Hij is met zijn koffer vertrokken." },
    { fr: "Vous êtes allés en Italie ?", nl: "Zijn jullie naar Italië gegaan?", alt: ["Vous êtes allées en Italie ?", "Êtes-vous allés en Italie ?"] },
    { fr: "Il est tombé dans la rue.", nl: "Hij is op straat gevallen." },
    { fr: "Hier, je suis resté à la maison.", nl: "Gisteren ben ik thuisgebleven.", alt: ["Hier, je suis restée à la maison.", "Je suis resté à la maison hier."] },
    { fr: "Je pars demain en Allemagne.", nl: "Ik vertrek morgen naar Duitsland.", alt: ["Demain, je pars en Allemagne."] },
    { fr: "J'ai perdu la clé de la chambre.", nl: "Ik ben de sleutel van de kamer kwijt." },
  ],
};
