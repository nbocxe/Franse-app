import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H1: Hoofdstuk = {
  nummer: 1,
  titel: "Bonjour ! Wie ben je?",
  doel: "Jezelf voorstellen, zeggen hoe het gaat en vertellen wat je hebt.",
  tijd: "present",
  werkwoorden: [
    { id: "etre", tijden: ["present"] },
    { id: "avoir", tijden: ["present"] },
    { id: "sappeler", tijden: ["present"] },
  ],
  getallen: [0, 10],
  grammatica: [
    {
      titel: "Zo spreek je Frans uit",
      tekst: [
        "Bij elk woord staat een uitspraakhint in Nederlandse klanken. Tik op het luidsprekertje om het echt te horen.",
        "De klemtoon ligt in het Frans **altijd op de laatste lettergreep**. De laatste medeklinker spreek je meestal niet uit: *petit* klinkt als 'puhtie', *vous* als 'voe'.",
        "Neusklanken schrijven we met een golfje: je zegt de klinker door je neus en laat de n weg.",
      ],
      tabel: {
        kop: ["Hint", "Klinkt als", "Voorbeeld"],
        rijen: [
          ["uu", "de u van 'muur'", "tu → tuu"],
          ["oe", "de oe van 'boek'", "vous → voe"],
          ["ee", "de ee van 'thee'", "café → kafee"],
          ["è", "de è van 'crème'", "est → è"],
          ["uh", "de e van 'de' (stomme e)", "je → zjuh"],
          ["zj", "de j van 'journaal'", "je → zjuh"],
          ["sj", "de sj van 'sjaal'", "chat → sja"],
          ["ã", "an/en door je neus", "enfant → ãfã"],
          ["õ", "on door je neus", "bonjour → bõzjoer"],
          ["ẽ", "in/un door je neus", "vin → vẽ"],
          ["wa", "oi", "trois → trwa"],
          ["r", "een keel-r, zoals de Nederlandse g", "rue → ruu"],
        ],
      },
    },
    {
      titel: "Persoonlijke voornaamwoorden",
      tekst: [
        "Elk Frans werkwoord staat met een voornaamwoord. Die leer je dus altijd samen: *je suis*, niet los *suis*.",
        "**Tu** zeg je tegen vrienden, familie en kinderen. **Vous** gebruik je voor 'u' én voor 'jullie'.",
        "**On** betekent 'men', maar in spreektaal bijna altijd 'wij'. Het werkwoord gaat zoals bij il: *on est* (we zijn).",
        "Begint het werkwoord met een klinker of een stomme h, dan wordt **je → j'**: *j'ai*, *j'habite*.",
      ],
      tabel: {
        kop: ["Frans", "Nederlands"],
        rijen: [
          ["je (j')", "ik"],
          ["tu", "jij"],
          ["il / elle / on", "hij / zij / men, wij"],
          ["nous", "wij"],
          ["vous", "jullie / u"],
          ["ils / elles", "zij (meervoud)"],
        ],
      },
    },
    {
      titel: "Mannelijk en vrouwelijk",
      tekst: [
        "Elk zelfstandig naamwoord is **mannelijk** of **vrouwelijk**. Leer het woord daarom altijd mét lidwoord. In deze app zie je mannelijke woorden in blauw en vrouwelijke in rood.",
        "Vóór een klinker of stomme h worden le en la allebei **l'**: *l'homme*, *l'amie*. Aan de kleur zie je dan toch het geslacht.",
        "Bijvoeglijke naamwoorden passen zich aan: meestal komt er een **-e** bij voor vrouwelijk en een **-s** voor meervoud. *Il est petit, elle est petite, ils sont petits.* Soms verandert de uitspraak: bij petite hoor je de t wel.",
        "Ils gebruik je voor een groep met minstens één man; elles alleen voor een groep vrouwen.",
      ],
      tabel: {
        kop: ["", "mannelijk", "vrouwelijk", "meervoud"],
        rijen: [
          ["de", "le (l')", "la (l')", "les"],
          ["een", "un", "une", "des"],
        ],
      },
    },
    {
      titel: "Être en avoir",
      tekst: [
        "**Être** (zijn) en **avoir** (hebben) zijn de twee belangrijkste werkwoorden. Ze zijn onregelmatig: leer ze als rijtje uit je hoofd.",
        "Let op: je leeftijd zeg je met **avoir**. Je *hebt* in het Frans een aantal jaren: *j'ai trente ans*.",
        "**C'est** (het is, dat is) gebruik je heel vaak: *c'est bon*, *c'est mon ami*.",
      ],
    },
    {
      titel: "Je m'appelle: jezelf noemen",
      tekst: [
        "Je naam zeg je met **s'appeler**, letterlijk: 'zichzelf noemen'. *Je m'appelle Anna* = ik noem mezelf Anna.",
        "Er staan dus twee voornaamwoorden: wie het doet (*je*) en 'mezelf' (*me*, vóór een klinker *m'*). Bij nous en vous zijn die twee hetzelfde woord, daarom staat het er twee keer: **nous nous appelons**, **vous vous appelez**. Dat is geen typfout!",
        "In de tabellen zie je het wederkerende woordje in een andere kleur.",
      ],
      tabel: {
        kop: ["wie", "mezelf, jezelf …", "voorbeeld"],
        rijen: [
          ["je", "me (m')", "je m'appelle"],
          ["tu", "te (t')", "tu t'appelles"],
          ["il/elle", "se (s')", "il s'appelle"],
          ["nous", "nous", "nous nous appelons"],
          ["vous", "vous", "vous vous appelez"],
          ["ils/elles", "se (s')", "ils s'appellent"],
        ],
      },
      voorbeelden: [
        { fr: "Je suis content.", nl: "Ik ben blij." },
        { fr: "Il a dix ans.", nl: "Hij is tien (jaar)." },
        { fr: "C'est mon chat.", nl: "Dat is mijn kat (mon = mijn)." },
      ],
    },
    {
      titel: "Tellen: 0 tot en met 10",
      tekst: [
        "Deze tien getallen zijn de basis voor alles wat komt. Oefen ze hardop.",
        "Let op: de slotmedeklinker van *six*, *huit* en *dix* hoor je alleen als het getal alleen staat. Het luidsprekertje laat het je horen.",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Groeten",
      woorden: [
        w("bonjour", "hallo, goedendag", "uitdr", "👋", "bõzjoer"),
        w("bonsoir", "goedenavond", "uitdr", "🌆", "bõswar"),
        w("salut", "hoi, doei", "uitdr", "🙌", "saluu"),
        w("au revoir", "tot ziens", "uitdr", "🚪", "o ruhvwar"),
        w("merci", "dank je, dank u", "uitdr", "🙏", "mèrsie"),
        w("s'il vous plaît", "alstublieft", "uitdr", "🥺", "siel voe plè", { alt: ["s'il te plaît"] }),
        w("oui", "ja", "uitdr", "✅", "wie"),
        w("non", "nee", "uitdr", "❌", "nõ"),
        w("ça va", "het gaat goed; hoe gaat het?", "uitdr", "🙂", "sa va"),
        w("bien", "goed", "bw", "👍", "bjẽ"),
      ],
    },
    {
      titel: "Mensen en hoe ze zijn",
      woorden: [
        w("l'homme", "de man", "m", "👨", "lom"),
        w("la femme", "de vrouw", "v", "👩", "la fam"),
        w("l'ami", "de vriend", "m", "🧑‍🤝‍🧑", "lamie", { vrouwelijk: "l'amie" }),
        w("l'enfant", "het kind", "m", "🧒", "lãfã"),
        w("content", "blij, tevreden", "bn", "😊", "kõtã", { vrouwelijk: "contente" }),
        w("fatigué", "moe", "bn", "😴", "fatiegee", { vrouwelijk: "fatiguée" }),
        w("grand", "groot, lang", "bn", "🦒", "grã", { vrouwelijk: "grande" }),
        w("petit", "klein", "bn", "🐭", "puhtie", { vrouwelijk: "petite" }),
        w("malade", "ziek", "bn", "🤒", "malad"),
        w("néerlandais", "Nederlands", "bn", "🇳🇱", "neerlãdè", { vrouwelijk: "néerlandaise" }),
        w("français", "Frans", "bn", "🇫🇷", "frãsè", { vrouwelijk: "française" }),
      ],
    },
    {
      titel: "Wat heb je?",
      woorden: [
        w("le chat", "de kat", "m", "🐱", "luh sja"),
        w("le chien", "de hond", "m", "🐶", "luh sjiẽ"),
        w("la maison", "het huis", "v", "🏡", "la mèzõ"),
        w("la voiture", "de auto", "v", "🚗", "la vwatuur"),
        w("le frère", "de broer", "m", "👦", "luh frèr"),
        w("la sœur", "de zus", "v", "👧", "la sur", { alt: ["la soeur"] }),
        w("la fille", "het meisje, de dochter", "v", "👧🏻", "la fiej"),
        w("le garçon", "de jongen", "m", "👦🏻", "luh garsõ"),
        w("un an", "een jaar (leeftijd)", "m", "🎂", "ẽ-nã", { voorbeeld: { fr: "J'ai trente ans.", nl: "Ik ben dertig." } }),
        w("c'est", "het is, dat is", "uitdr", "👉", "sè"),
        w("et", "en", "vw", "➕", "ee"),
      ],
    },
  ],
  zinnen: [
    { fr: "Bonjour, je m'appelle Anna.", nl: "Hallo, ik heet Anna." },
    { fr: "Comment tu t'appelles ?", nl: "Hoe heet jij?", alt: ["Tu t'appelles comment ?", "Comment t'appelles-tu ?"] },
    { fr: "Je suis néerlandais.", nl: "Ik ben Nederlands.", alt: ["Je suis néerlandaise."] },
    { fr: "Tu es fatigué ?", nl: "Ben jij moe?", alt: ["Tu es fatiguée ?", "Es-tu fatigué ?", "Es-tu fatiguée ?"] },
    { fr: "Il est grand.", nl: "Hij is lang." },
    { fr: "Elle est petite.", nl: "Zij is klein." },
    { fr: "Nous sommes contents.", nl: "Wij zijn blij.", alt: ["Nous sommes contentes.", "On est contents.", "On est content."] },
    { fr: "Vous êtes français ?", nl: "Bent u Frans?", alt: ["Vous êtes française ?", "Êtes-vous français ?", "Êtes-vous française ?"] },
    { fr: "Ils sont malades.", nl: "Zij zijn ziek.", alt: ["Elles sont malades."] },
    { fr: "J'ai un chat.", nl: "Ik heb een kat." },
    { fr: "Tu as un chien ?", nl: "Heb jij een hond?", alt: ["As-tu un chien ?"] },
    { fr: "Elle a une sœur et un frère.", nl: "Zij heeft een zus en een broer.", alt: ["Elle a une soeur et un frère."] },
    { fr: "Nous avons une voiture.", nl: "Wij hebben een auto.", alt: ["On a une voiture."] },
    { fr: "Il a dix ans.", nl: "Hij is tien (jaar).", alt: ["Il a 10 ans."] },
    { fr: "Ça va ? Oui, ça va bien, merci.", nl: "Hoe gaat het? Ja, het gaat goed, dank je." },
    { fr: "C'est une petite maison.", nl: "Het is een klein huis." },
  ],
};
