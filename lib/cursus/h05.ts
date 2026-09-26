import type { Hoofdstuk } from "../types.ts";
import { w } from "./maak.ts";

export const H5: Hoofdstuk = {
  nummer: 5,
  titel: "Kunnen en moeten",
  doel: "Afspreken, zeggen wat je kunt en moet, en vragen hoe laat het is.",
  tijd: "present",
  werkwoorden: [
    { id: "pouvoir", tijden: ["present"] },
    { id: "devoir", tijden: ["present"] },
    { id: "savoir", tijden: ["present"] },
  ],
  getallen: [70, 100],
  grammatica: [
    {
      titel: "Werkwoord + heel werkwoord",
      tekst: [
        "Na **pouvoir** (kunnen), **devoir** (moeten), **savoir** (weten/kunnen), **vouloir** (willen) en **aller** (gaan) volgt gewoon een heel werkwoord. Anders dan in het Nederlands staat het direct erachter, niet achteraan de zin.",
        "*Je peux venir demain.* — Ik kan morgen komen.",
        "De ontkenning gaat om het eerste werkwoord: *je **ne** peux **pas** venir*.",
      ],
    },
    {
      titel: "Pouvoir of savoir?",
      tekst: [
        "Allebei betekenen ze soms 'kunnen'. **Savoir** gebruik je voor iets dat je **geleerd** hebt: *je sais nager* (ik kan zwemmen).",
        "**Pouvoir** gebruik je als iets **mogelijk of toegestaan** is: *je peux venir* (ik kan/mag komen).",
      ],
    },
    {
      titel: "Drie manieren om te vragen",
      tekst: [
        "1. Met je stem omhoog (spreektaal): *Tu veux venir ?*",
        "2. Met **est-ce que** vooraan (altijd goed): *Est-ce que tu veux venir ?*",
        "3. Werkwoord en voornaamwoord omdraaien, met een streepje (netjes): *Veux-tu venir ?*",
      ],
    },
    {
      titel: "Hoe laat is het?",
      tekst: [
        "**Quelle heure est-il ?** — Hoe laat is het? Antwoord: **Il est** + getal + **heure(s)**.",
        "Om een bepaalde tijd: **à** — *à huit heures* (om acht uur). Fransen gebruiken vaak de 24-uursklok: *à vingt heures*.",
      ],
      voorbeelden: [
        { fr: "Il est une heure.", nl: "Het is één uur." },
        { fr: "Il est dix heures.", nl: "Het is tien uur." },
      ],
    },
    {
      titel: "Dagen van de week",
      tekst: [
        "Dagen schrijf je zonder hoofdletter. *Lundi* = (op) maandag. *Le lundi* = op maandagen, elke maandag.",
      ],
    },
    {
      titel: "Tellen: 70 tot en met 100",
      tekst: [
        "Hier wordt het Frans creatief. **70 = 60 + 10**: *soixante-dix*, 71 = *soixante et onze*, 72 = *soixante-douze*.",
        "**80 = 4 × 20**: *quatre-vingts*. 81 = *quatre-vingt-un* (zonder s en zonder et!).",
        "**90 = 4 × 20 + 10**: *quatre-vingt-dix*, 91 = *quatre-vingt-onze*.",
        "**100** = *cent*. (In België en Zwitserland zeggen ze *septante* en *nonante*.)",
      ],
    },
  ],
  woordgroepen: [
    {
      titel: "Tijd",
      woorden: [
        w("l'heure", "het uur, de tijd", "v", "🕐", "lur"),
        w("le matin", "de ochtend", "m", "🌄", "luh matẽ"),
        w("l'après-midi", "de middag", "m", "🌤️", "laprè-miedie"),
        w("le soir", "de avond", "m", "🌙", "luh swar"),
        w("ce soir", "vanavond", "bw", "🌃", "suh swar"),
        w("la semaine", "de week", "v", "🗓️", "la suhmèn"),
        w("le week-end", "het weekend", "m", "🛋️", "luh wiekènd"),
        w("maintenant", "nu", "bw", "⏱️", "mẽtnã"),
      ],
    },
    {
      titel: "Dagen van de week",
      woorden: [
        w("lundi", "maandag", "m", "1️⃣", "lẽdie"),
        w("mardi", "dinsdag", "m", "2️⃣", "mardie"),
        w("mercredi", "woensdag", "m", "3️⃣", "mèrkruhdie"),
        w("jeudi", "donderdag", "m", "4️⃣", "zjeudie"),
        w("vendredi", "vrijdag", "m", "5️⃣", "vãdruhdie"),
        w("samedi", "zaterdag", "m", "6️⃣", "samdie"),
        w("dimanche", "zondag", "m", "7️⃣", "diemãsj"),
      ],
    },
    {
      titel: "Wat kun je?",
      woorden: [
        w("nager", "zwemmen", "ww", "🏊", "nazjee"),
        w("travailler", "werken", "ww", "👩‍💻", "travajee"),
        w("dormir", "slapen", "ww", "🛌", "dormier"),
        w("lire", "lezen", "ww", "📚", "lier"),
        w("écrire", "schrijven", "ww", "✍️", "eekrier"),
        w("cuisiner", "koken", "ww", "👩‍🍳", "kwiezienee"),
        w("aider", "helpen", "ww", "🆘", "èdee"),
        w("est-ce que", "(maakt een vraag)", "uitdr", "❔", "ès kuh"),
      ],
    },
  ],
  zinnen: [
    { fr: "Je peux venir lundi.", nl: "Ik kan maandag komen." },
    { fr: "Tu peux m'aider ?", nl: "Kun jij me helpen?", alt: ["Peux-tu m'aider ?", "Est-ce que tu peux m'aider ?"] },
    { fr: "Nous devons travailler demain.", nl: "Wij moeten morgen werken.", alt: ["On doit travailler demain.", "Demain, nous devons travailler."] },
    { fr: "Il doit dormir.", nl: "Hij moet slapen." },
    { fr: "Je ne sais pas.", nl: "Ik weet het niet." },
    { fr: "Vous savez nager ?", nl: "Kunt u zwemmen?", alt: ["Savez-vous nager ?", "Est-ce que vous savez nager ?"] },
    { fr: "Elle sait très bien cuisiner.", nl: "Zij kan heel goed koken." },
    { fr: "Est-ce que tu veux venir samedi ?", nl: "Wil jij zaterdag komen?", alt: ["Tu veux venir samedi ?", "Veux-tu venir samedi ?"] },
    { fr: "Quelle heure est-il ?", nl: "Hoe laat is het?" },
    { fr: "Il est huit heures.", nl: "Het is acht uur.", alt: ["Il est 8 heures."] },
    { fr: "Je travaille le matin.", nl: "Ik werk 's ochtends." },
    { fr: "On peut aller au cinéma ce soir.", nl: "We kunnen vanavond naar de bioscoop gaan.", alt: ["Nous pouvons aller au cinéma ce soir."] },
    { fr: "Ils ne peuvent pas venir dimanche.", nl: "Zij kunnen zondag niet komen.", alt: ["Elles ne peuvent pas venir dimanche."] },
    { fr: "Vous devez lire le livre.", nl: "Jullie moeten het boek lezen." },
    { fr: "Je dois écrire à mon ami.", nl: "Ik moet mijn vriend schrijven." },
  ],
};
