// Import necessary Firebase modules using Firebase v9+ (modular API)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnauysWX2yy0E7XN39WiLDSRO-TGOETJA",
  authDomain: "shop-d5ada.firebaseapp.com",
  projectId: "shop-d5ada",
  storageBucket: "shop-d5ada.firebasestorage.app",
  messagingSenderId: "591708672405",
  appId: "1:591708672405:web:b2262482683abbc034a69c",
  measurementId: "G-1X37BVV0F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export necessary functions and instances
export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword };
