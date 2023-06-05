import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALjrshU_6-t_SDwOZXPiJRhZd-NRMk3kY",
  authDomain: "chat-b35ec.firebaseapp.com",
  projectId: "chat-b35ec",
  storageBucket: "chat-b35ec.appspot.com",
  messagingSenderId: "476025691132",
  appId: "1:476025691132:web:fe5b8543ab1b76bb323079",
  measurementId: "G-CWHP1FCETT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
