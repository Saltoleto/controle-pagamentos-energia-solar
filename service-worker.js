const CACHE_NAME = "solar-cache-v2";
const FILES_TO_CACHE = [
  "/controle-pagamentos-energia-solar/",
  "/controle-pagamentos-energia-solar/index.html",
  "/controle-pagamentos-energia-solar/manifest.json",
  "/controle-pagamentos-energia-solar/icons/icon-192.png",
  "/controle-pagamentos-energia-solar/icons/icon-512.png"
];

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCjs2EU9JuVHTxI0ZNIszAdH3mdF7obGnA",
  authDomain: "controle-pagamentos-3759d.firebaseapp.com",
  projectId: "controle-pagamentos-3759d",
  messagingSenderId: "219928011798",
  appId: "1:219928011798:web:7946650d61cf0bc2528137"
});

const messaging = firebase.messaging();

// 🔔 RECEBE NOTIFICAÇÃO COM APP FECHADO
messaging.onBackgroundMessage(payload => {
  const notification = payload.notification || {};
  const title = notification.title || "Nova notificação";
  const body = notification.body || "";

  self.registration.showNotification(title, {
    body,
    icon: "/controle-pagamentos-energia-solar/icons/icon-192.png",
    data: {
      url: payload?.data?.url
    }
  });
});

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
