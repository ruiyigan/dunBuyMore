// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zN97D90pr-NbgFvNwQs42J3GMhdQiuA",
  authDomain: "lifehack22-d68e6.firebaseapp.com",
  projectId: "lifehack22-d68e6",
  storageBucket: "lifehack22-d68e6.appspot.com",
  messagingSenderId: "871596038402",
  appId: "1:871596038402:web:f71e9dabb9e9e991524a1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialise Firestore, and get reference to it
const db = getFirestore(app);

// Firebase Authentication
const auth = getAuth(app);

export {
  app,
  db,
  auth
}