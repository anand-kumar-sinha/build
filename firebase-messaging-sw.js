importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDoOn5JOhxPscApKQ_iJBCj-56Fi7eSHCw",
    authDomain: "instagram-770e1.firebaseapp.com",
    projectId: "instagram-770e1",
    storageBucket: "instagram-770e1.appspot.com",
    messagingSenderId: "90302667726",
    appId: "1:90302667726:web:15ccd4bc74a7b502ef699f",
    measurementId: "G-FXQ3KF461D",
  };
  

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload?.data?.title;
  const notificationOptions = {
    body: payload?.data?.body,
    icon: payload?.data?.icon,
    image: payload?.data?.image,
    data: {
      click_action: payload?.data?.click_action, 
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
  console.log("Notification clicked", event.notification);

  // Close the notification
  event.notification.close();

  // Get the YouTube video URL from the notification's data
  const videoUrl = event.notification.data.click_action

  // Open the URL in a new window
  event.waitUntil(clients.openWindow(videoUrl));
});