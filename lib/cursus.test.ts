// Controleert of de lesstof compleet en consistent is.
import assert from "node:assert/strict";
import { test } from "node:test";
import { beoordeel } from "./controle.ts";
import { ALLE_WOORDEN, HOOFDSTUKKEN } from "./cursus/index.ts";
import { bouwLes, lessenVan } from "./lessen.ts";
import { tegels, zaad } from "./oefeningen.ts";
import { tijdenVan, vervoeg, WERKWOORDEN } from "./werkwoorden.ts";

test("elk woord is compleet en komt maar één keer voor", () => {
  const gezien = new Set<string>();
  for (const w of ALLE_WOORDEN) {
    assert.ok(!gezien.has(w.id), `dubbel woord: ${w.fr}`);
    gezien.add(w.id);
    for (const veld of ["fr", "nl", "emoji", "uitspraak"] as const) assert.ok(w[veld].trim(), `${w.fr}: ${veld} ontbreekt`);
    if (w.soort === "m" || w.soort === "v") {
      assert.match(w.fr, /^(le |la |l'|un )|^[a-z]+di$|^dimanche$|^juillet$/, `${w.fr}: zelfstandig naamwoord zonder lidwoord`);
    }
  }
  assert.ok(ALLE_WOORDEN.length >= 180);
});

test("hoofdstukken zijn opeenvolgend en verwijzen naar bestaande werkwoorden", () => {
  HOOFDSTUKKEN.forEach((h, i) => {
    assert.equal(h.nummer, i + 1);
    assert.ok(h.werkwoorden.length >= 1 && h.werkwoorden.length <= 3, `hoofdstuk ${h.nummer}: 1 tot 3 werkwoorden`);
    for (const { id, tijden } of h.werkwoorden) {
      assert.ok(WERKWOORDEN[id], `onbekend werkwoord ${id}`);
      for (const t of tijden) assert.ok(tijdenVan(WERKWOORDEN[id]).includes(t), `${id} heeft geen ${t}`);
    }
    assert.ok(h.grammatica.length > 0 && h.zinnen.length >= 10);
  });
});

test("de tegenwoordige tijd komt eerst, daarna de verleden tijd", () => {
  const eersteVerleden = HOOFDSTUKKEN.findIndex((h) => h.tijd !== "present");
  assert.ok(eersteVerleden >= 5);
  assert.ok(HOOFDSTUKKEN.slice(eersteVerleden).every((h) => h.tijd !== "present"));
});

test("elk werkwoord heeft zes vormen met de juiste voornaamwoorden en uitspraak", () => {
  const verwacht = [/^(je |j')/, /^tu /, /^il /, /^nous /, /^vous /, /^ils /];
  for (const ww of Object.values(WERKWOORDEN)) {
    assert.equal(ww.present.length, 6, ww.inf);
    assert.equal(ww.presentUitspraak.length, 6, ww.inf);
    ww.present.forEach((v, i) => assert.match(v, verwacht[i], `${ww.inf}: ${v}`));
    if (ww.participe) {
      assert.ok(ww.participeUitspraak && ww.imparfaitUitspraak && ww.hulpwerkwoord, `${ww.inf}: gegevens voor verleden tijd`);
    }
    for (const t of tijdenVan(ww)) {
      for (const v of vervoeg(ww, t)) assert.equal(beoordeel(v.volledig, v.antwoorden).uitslag, "goed");
    }
  }
});

test("bekende vervoegingen kloppen", () => {
  const vorm = (id: string, t: "present" | "passe-compose" | "imparfait", p: number) => vervoeg(WERKWOORDEN[id], t)[p].volledig;
  assert.equal(vorm("etre", "imparfait", 0), "j'étais");
  assert.equal(vorm("faire", "imparfait", 3), "nous faisions");
  assert.equal(vorm("manger", "imparfait", 3), "nous mangions");
  assert.equal(vorm("manger", "imparfait", 0), "je mangeais");
  assert.equal(vorm("avoir", "imparfait", 5), "ils avaient");
  assert.equal(vorm("aller", "passe-compose", 3), "nous sommes allé(e)s");
  assert.equal(vorm("voir", "passe-compose", 0), "j'ai vu");
  assert.equal(vorm("habiter", "imparfait", 0), "j'habitais");
  const allee = vervoeg(WERKWOORDEN.aller, "passe-compose")[0];
  assert.equal(beoordeel("je suis allée", allee.antwoorden).uitslag, "goed");
  assert.equal(beoordeel("suis allé", allee.antwoorden).uitslag, "goed");
});

test("elke zin is als antwoord goed, ook via de tegels", () => {
  for (const h of HOOFDSTUKKEN) {
    for (const z of h.zinnen) {
      assert.match(z.fr, /[.!?]$/, z.fr);
      assert.doesNotMatch(z.fr, /\s{2}/, z.fr);
      assert.equal(beoordeel(z.fr, [z.fr, ...(z.alt ?? [])]).uitslag, "goed");
      assert.equal(beoordeel(tegels(z.fr).join(" "), [z.fr]).uitslag, "goed", z.fr);
    }
  }
});

test("elke les levert geldige oefeningen op", () => {
  const rng = zaad(7);
  for (const h of HOOFDSTUKKEN) {
    for (const les of lessenVan(h)) {
      if (les.soort === "grammatica") continue;
      const lijst = bouwLes(les, rng, { luisteren: true, spreken: true });
      assert.ok(lijst.length >= 5, `${les.id} is te kort`);
      for (const o of lijst) {
        if (o.soort === "kies") {
          assert.ok(o.opties.length >= 3, `${les.id}: te weinig opties`);
          assert.equal(new Set(o.opties.map((x) => x.tekst)).size, o.opties.length, `${les.id}: dubbele opties`);
          assert.ok(o.juist >= 0 && o.juist < o.opties.length);
        }
        if (o.soort === "typ") assert.ok(o.antwoorden.length > 0 && o.antwoorden.every(Boolean));
        if (o.soort === "bouw") {
          for (const t of tegels(o.antwoord)) assert.ok(o.tegels.includes(t), `${les.id}: tegel ${t} ontbreekt`);
        }
        if (o.soort === "koppel") {
          assert.equal(new Set(o.paren.map((p) => p.links)).size, o.paren.length, `${les.id}: dubbele paren`);
          assert.equal(new Set(o.paren.map((p) => p.rechts)).size, o.paren.length, `${les.id}: dubbele paren rechts`);
        }
      }
      const zonder = bouwLes(les, rng, { luisteren: false, spreken: false });
      assert.ok(zonder.every((o) => o.soort !== "spreek" && !(o.vaardigheid === "luisteren" && "vraag" in o)));
    }
  }
});

test("nergens staat je, le, la, ne … vóór een klinker (dat moet j', l', n' zijn)", async () => {
  const { vormKoppel, vormKies, vormTyp } = await import("./oefeningen.ts");
  const fout = /\b(je|le|la|ne|me|te|se|de|que) [aeiouyéèêàâîôûh]/i;
  const klinker = /^[aeiouyéèêàâîôûh]/i;
  const rng = zaad(3);
  // Oefeningen: een los voornaamwoord "je" mag nooit gekoppeld worden aan een vorm die met een klinker begint.
  for (const ww of Object.values(WERKWOORDEN)) {
    for (const t of tijdenVan(ww)) {
      for (let i = 0; i < 5; i++) {
        const k = vormKoppel(ww.id, t, rng);
        if (k.soort !== "koppel") continue;
        for (const p of k.paren) assert.ok(!(p.links === "je" && klinker.test(p.rechts)), `${ww.inf} ${t}: je + ${p.rechts}`);
      }
      for (let p = 0; p < 6; p++) {
        for (const o of [vormKies(ww.id, t, p, rng), vormTyp(ww.id, t, p)]) {
          if (!("vraag" in o) || !o.vraag.tekst) continue;
          const v = vervoeg(ww, t)[p];
          assert.ok(!(o.vraag.tekst.startsWith("je ") && klinker.test(v.rest)), `${ww.inf} ${t}: ${o.vraag.tekst}`);
        }
      }
      for (const v of vervoeg(ww, t)) assert.doesNotMatch(v.volledig, fout, v.volledig);
    }
  }
  // Lesstof: zinnen, voorbeelden en woorden.
  const teksten = [
    ...HOOFDSTUKKEN.flatMap((h) => h.zinnen.flatMap((z) => [z.fr, ...(z.alt ?? [])])),
    ...HOOFDSTUKKEN.flatMap((h) => h.grammatica.flatMap((g) => (g.voorbeelden ?? []).map((v) => v.fr))),
    ...ALLE_WOORDEN.flatMap((w) => [w.fr, w.voorbeeld?.fr ?? ""]),
  ];
  for (const t of teksten) assert.doesNotMatch(t, fout, t);
});
