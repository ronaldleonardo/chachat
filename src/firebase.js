import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgQsNJa2joqzYbaA9bK81MRbKAjUCM2gM",
  authDomain: "chat-app-c3523.firebaseapp.com",
  projectId: "chat-app-c3523",
  storageBucket: "chat-app-c3523.appspot.com",
  messagingSenderId: "493201685334",
  appId: "1:493201685334:web:aa4a909151a9449f0174f7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
