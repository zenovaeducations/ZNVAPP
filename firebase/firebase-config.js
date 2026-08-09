// =====================================
// ZENOVA EDUCATIONS
// Firebase Configuration
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcqxS2SIpMyaY-jYOz0Y-t67Taa04Fy1o",
  authDomain: "zenova-educations.firebaseapp.com",
  projectId: "zenova-educations",
  storageBucket: "zenova-educations.firebasestorage.app",
  messagingSenderId: "66782392979",
  appId: "1:66782392979:web:ce1cf80afe1c67734f5366",
  measurementId: "G-9JND0JB1T4"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export {

    app,

    analytics,

    auth,

    db,

    storage

};
