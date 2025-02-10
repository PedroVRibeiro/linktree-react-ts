// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGlyI2lZl_ZTwVgseOeeEyxgZ79jXO6GE",
  authDomain: "mylinks-ea2d3.firebaseapp.com",
  projectId: "mylinks-ea2d3",
  storageBucket: "mylinks-ea2d3.firebasestorage.app",
  messagingSenderId: "1018352688686",
  appId: "1:1018352688686:web:151a9b1499692af876c9bf",
  measurementId: "G-RBBFBPRT9H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, auth, db };
