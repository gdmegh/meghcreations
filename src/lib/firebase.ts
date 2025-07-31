
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqHCGYsDZrMLTp9Xig5sMMdnWI_f-TCUk",
  authDomain: "meghcreations-98639.firebaseapp.com",
  projectId: "meghcreations-98639",
  storageBucket: "meghcreations-98639.appspot.com",
  messagingSenderId: "528168904684",
  appId: "1:528168904684:web:3fe8fed94f30324661c2c9",
  measurementId: "G-X6W6H01190"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
