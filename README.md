# Frans leren

Een app om jezelf Frans te leren, opgebouwd als een lesboek. Het doel: zo snel mogelijk leren praten.

## Hoe de cursus is opgebouwd

Tien hoofdstukken. Elk hoofdstuk:

1. begint met **grammatica-uitleg** (met tabellen en voorbeeldzinnen om te beluisteren);
2. leert je **drie werkwoorden**, met de hele vervoeging en de uitspraak van elke vorm;
3. leert je na elk werkwoord de **woorden** om er meteen zinnen mee te maken (met een plaatje als hint);
4. laat je daarna **zinnen maken** met alles uit het hoofdstuk;
5. leert je **tellen** (0 tot een miljoen, verdeeld over de hoofdstukken);
6. sluit af met een **toets**. Haal je 80%, dan gaat het volgende hoofdstuk open.

| Hoofdstuk | Werkwoorden | Tijd |
|---|---|---|
| 1. Bonjour ! Wie ben je? | être, avoir, s'appeler | présent |
| 2. Wat doe je graag? | parler, habiter, aimer | présent |
| 3. Aan tafel | manger, boire, vouloir | présent |
| 4. In de stad | aller, venir, faire (+ nabije toekomst) | présent |
| 5. Kunnen en moeten | pouvoir, devoir, savoir | présent |
| 6. Mijn dag en mijn familie | prendre, mettre, se lever | présent |
| 7. Afspreken en plannen | finir, attendre, voir | présent |
| 8. Wat heb je gedaan? | manger, faire, voir | passé composé (avoir) |
| 9. Op reis | aller, venir, partir | passé composé (être) |
| 10. Vroeger | être, avoir, faire | imparfait |

Eerst de tegenwoordige tijd, dus. Vanaf hoofdstuk 8, als je genoeg kunt om een gesprek te voeren, komt de verleden tijd.

## Oefenvormen

De oefeningen wisselen elkaar af tussen **luisteren, schrijven en doen**:

- **Kiezen**: plaatje + Nederlands → kies het Franse woord, of andersom.
- **Schrijven**: typ het Franse woord, de werkwoordsvorm of de hele zin. Er zijn knoppen voor é, è, ç enzovoort.
- **Luisteren**: hoor een woord, vorm, zin of getal en schrijf op wat je hoort, of kies wat het betekent. Met een schildpadknop om het langzaam te horen.
- **Zinnen bouwen**: zet woordtegels in de goede volgorde, met een paar verwarrende extra's ertussen.
- **Koppelen**: je ↔ suis, tu ↔ es …
- **Spreken**: zeg het hardop; de spraakherkenning van je browser luistert mee (werkt in Chrome en Safari).

### Controle op wat je typt

- Hoofdletters, leestekens en extra spaties maken niet uit.
- Een **accentfout** telt als goed, maar je krijgt een seintje.
- Bij veelgemaakte fouten krijg je een **gerichte tip**: *le* of *la* verwisseld, lidwoord vergeten, *je aime* in plaats van *j'aime*, of de *ne* van *ne … pas* vergeten.
- Je ziet welke woorden van je antwoord fout waren.
- Wat je fout had, komt aan het eind van de les nog een keer terug.

### Uitspraak

Bij elk woord en elke werkwoordsvorm staat een uitspraakhint in Nederlandse klanken (bijv. *je suis* [zjuh swie]).
De uitleg daarvan staat aan het begin van hoofdstuk 1. Tik op het luidsprekertje om het echt te horen. Dat doet de
Franse stem van je apparaat. In je profiel kies je de stem en de snelheid.

## Los oefenen

Via **Oefenen** kun je buiten het leerpad om trainen:

- **Herhalen**: wat je geleerd hebt komt terug na 1, 2, 4, 8, 16 … dagen (*spaced repetition*).
- **Alleen woorden** of **alleen zinnen** van de hoofdstukken die je kiest.
- **Alleen werkwoorden**: kies één of meer werkwoorden en een tijd.
- **Tellen**: kies een bereik, van 0–20 tot jaartallen.

Onder **Naslag** vind je alle vervoegingstabellen, de woordenlijst (doorzoekbaar), alle grammatica en een
getallen-omzetter.

## De app starten

Je hebt [Node.js](https://nodejs.org) versie 22 of nieuwer nodig.

```bash
npm install   # eenmalig
npm run dev   # start de app op http://localhost:3000
```

Andere commando's:

```bash
npm test            # controleert de lesstof, vervoegingen, getallen en de antwoordcontrole
npm run typecheck   # controleert de code op typefouten
npm run build       # maakt de online versie in de map out/
```

## Online zetten

De app bestaat uit losse bestanden en kan gratis op GitHub Pages. Bij elke wijziging op `main` bouwt GitHub de app
opnieuw (zie `.github/workflows/pages.yml`). Zet eenmalig bij *Settings → Pages* de bron op **GitHub Actions**.

## Lesstof aanpassen

| Bestand | Wat erin staat |
|---|---|
| `lib/cursus/h01.ts` … `h10.ts` | Per hoofdstuk: grammatica, woorden (met plaatje en uitspraak), zinnen en getallen |
| `lib/werkwoorden.ts` | Alle werkwoorden. De présent staat uitgeschreven; passé composé en imparfait rekent de app zelf uit |
| `lib/getallen.ts` | Getallen uitschrijven (traditionele spelling) met uitspraak |
| `lib/controle.ts` | De controle op je antwoorden en de tips |
| `lib/oefeningen.ts` | De oefensoorten |
| `lib/lessen.ts` | Hoe een hoofdstuk in lessen wordt verdeeld, en de oefenmodules |

Na een aanpassing: draai `npm test`. Die controleert onder meer dat elk woord compleet is, dat er geen dubbele
woorden zijn en dat elke zin met de tegels te bouwen is.

## Nog te doen

- **Ontwerp**: de vormgeving is tijdelijk overgenomen van de Taal-app; het echte ontwerp volgt nog.
- Je voortgang staat alleen in je browser. Maak af en toe een back-up via je profiel.
- De uitspraak komt van de stem van je apparaat; de kwaliteit verschilt per apparaat.
