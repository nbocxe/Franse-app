// Service worker: bewaart de app op je telefoon, zodat hij ook zonder internet werkt.
// Elke keer dat je wel internet hebt, haalt hij op de achtergrond de nieuwste versie op;
// die zie je de volgende keer dat je de app opent.
const CACHE = "frans-leren-v1";
const BASIS = new URL(self.registration.scope).pathname;

self.addEventListener("install", (e) => {
  // Alvast de startpagina bewaren; de rest komt erbij zodra je hem gebruikt.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll([BASIS])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const verzoek = e.request;
  if (verzoek.method !== "GET" || new URL(verzoek.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const bewaard = await cache.match(verzoek, { ignoreSearch: verzoek.mode === "navigate" });
      const vers = fetch(verzoek)
        .then((antwoord) => {
          if (antwoord.ok) cache.put(verzoek, antwoord.clone());
          return antwoord;
        })
        .catch(async () => bewaard ?? (await cache.match(BASIS)) ?? Response.error());
      // Bewaarde versie meteen tonen (snel en offline), op de achtergrond verversen.
      return bewaard ?? vers;
    }),
  );
});
