const CACHE_NAME = "solar-cache-v2";
const FILES_TO_CACHE = [
  "/controle-pagamentos-energia-solar/",
  "/controle-pagamentos-energia-solar/index.html",
  "/controle-pagamentos-energia-solar/manifest.json",
  "/controle-pagamentos-energia-solar/icon-192.png",
  "/controle-pagamentos-energia-solar/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
