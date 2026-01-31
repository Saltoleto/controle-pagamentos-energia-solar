const CACHE_NAME = "solar-cache-v1";
const FILES_TO_CACHE = [
  "/controle-pagamentos-energia-solar/",
  "/controle-pagamentos-energia-solar/index.html",
  "/controle-pagamentos-energia-solar/manifest.json"
  "/controle-pagamentos-energia-solar/icons/icon-192.png",
  "/controle-pagamentos-energia-solar/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
