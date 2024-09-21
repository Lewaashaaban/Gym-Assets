// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth"; // Import sendPasswordResetEmail
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8EZal713uuMFs4WaSfd-wAZtVqQb2mDk",
  authDomain: "assets-for-gym.firebaseapp.com",
  projectId: "assets-for-gym",
  storageBucket: "assets-for-gym.appspot.com",
  messagingSenderId: "1054626854443",
  appId: "1:1054626854443:web:3acd6e0c48bdff5a389c6e",
  measurementId: "G-XSW0K2E8K0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Export sendPasswordResetEmail for use in other files
export { sendPasswordResetEmail };
