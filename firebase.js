// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBQ-AIUdvsN_PBEOtWN2hhCRbt9-MlAf4",
  authDomain: "first-app-1b0ca.firebaseapp.com",
  projectId: "first-app-1b0ca",
  storageBucket: "first-app-1b0ca.firebasestorage.app",
  messagingSenderId: "564776819094",
  appId: "1:564776819094:web:8712c775acd792afaba5b7",
  measurementId: "G-RXXP0VVBV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };


