import assert from "node:assert/strict";
import { test } from "node:test";
import { beoordeel } from "./controle.ts";
import { getalInWoorden } from "./getallen.ts";
import { HOOFDSTUKKEN } from "./cursus/index.ts";
import { lesOpen, lessenVan } from "./lessen.ts";
import { DAG, verwerk } from "./srs.ts";

test("getallen worden goed uitgeschreven", () => {
  const verwacht: Record<number, string> = {
    0: "zéro", 16: "seize", 17: "dix-sept", 21: "vingt et un", 22: "vingt-deux", 61: "soixante et un",
    70: "soixante-dix", 71: "soixante et onze", 77: "soixante-dix-sept", 80: "quatre-vingts", 81: "quatre-vingt-un",
    90: "quatre-vingt-dix", 99: "quatre-vingt-dix-neuf", 100: "cent", 101: "cent un", 200: "deux cents",
    203: "deux cent trois", 1000: "mille", 2000: "deux mille", 1998: "mille neuf cent quatre-vingt-dix-huit",
    2026: "deux mille vingt-six", 80000: "quatre-vingt mille",
  };
  for (const [n, w] of Object.entries(verwacht)) assert.equal(getalInWoorden(Number(n)), w);
});

test("controle: accenten, lidwoorden, ontkenning en getallen", () => {
  assert.equal(beoordeel("Je suis content", ["Je suis content."]).uitslag, "goed");
  assert.equal(beoordeel("je suis  CONTENT !", ["Je suis content."]).uitslag, "goed");
  assert.equal(beoordeel("j’ai un chat", ["J'ai un chat."]).uitslag, "goed");
  assert.equal(beoordeel("tu es fatigue", ["Tu es fatigué ?"]).uitslag, "accent");
  assert.equal(beoordeel("tu es", ["tu es", "es"]).uitslag, "goed");
  assert.equal(beoordeel("tu est", ["tu es", "es"]).uitslag, "fout");
  assert.match(beoordeel("le maison", ["la maison"]).tip ?? "", /vrouwelijk/);
  assert.match(beoordeel("maison", ["la maison"]).tip ?? "", /lidwoord/);
  assert.match(beoordeel("je aime le sport", ["J'aime le sport."]).tip ?? "", /ingekort/);
  assert.match(beoordeel("je parle pas anglais", ["Je ne parle pas anglais."]).tip ?? "", /ne … pas/);
  assert.equal(beoordeel("quatre vingt dix", ["quatre-vingt-dix"], { getal: true }).uitslag, "goed");
  assert.equal(beoordeel("la soeur", ["la sœur"]).uitslag, "goed");
});

test("herhaalschema: goed schuift op, fout begint opnieuw", () => {
  const nu = 0;
  const a = verwerk(undefined, true, nu);
  assert.equal(a.bak, 0);
  assert.equal(a.volgende, DAG);
  const b = verwerk(a, true, DAG);
  assert.equal(b.bak, 1);
  const c = verwerk(b, false, 3 * DAG);
  assert.equal(c.bak, 0);
  assert.equal(c.fout, 1);
});

test("lessen gaan na elkaar open, hoofdstukken na de toets", () => {
  const h1 = lessenVan(HOOFDSTUKKEN[0]);
  const h2 = lessenVan(HOOFDSTUKKEN[1]);
  assert.ok(lesOpen(h1[0], {}, false));
  assert.ok(!lesOpen(h1[1], {}, false));
  assert.ok(lesOpen(h1[1], { [h1[0].id]: 1 }, false));
  assert.ok(!lesOpen(h2[0], {}, false));
  assert.ok(lesOpen(h2[0], { "h1:toets": 1 }, false));
  assert.ok(lesOpen(h2[3], {}, true));
  assert.equal(h1[0].soort, "grammatica");
  assert.equal(h1[h1.length - 1].soort, "toets");
});

test("elk soort leeritem levert een herhaaloefening op", async () => {
  const { oefeningVoorItem, zaad } = await import("./oefeningen.ts");
  const rng = zaad(1);
  for (const item of ["w:le-chat", "v:etre:present:3", "v:aller:passe-compose:0", "z:1:0"]) {
    for (let variant = 0; variant < 4; variant++) assert.ok(oefeningVoorItem(item, rng, variant), `${item} variant ${variant}`);
  }
  assert.equal(oefeningVoorItem("w:bestaat-niet", rng), null);
});
