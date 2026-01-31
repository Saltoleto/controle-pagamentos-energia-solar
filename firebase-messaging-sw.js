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
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icon.png"
      body: payload.data.body,
      data: {
        url: payload.data.url
      }
    }
  );
});
