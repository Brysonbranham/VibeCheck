// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBxxx-xxxxxxxxxxxx",
  authDomain: "emoji-database-79871.firebaseapp.com",
  projectId: "emoji-database-79871",
  storageBucket: "emoji-database-79871.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (or other Firebase services you plan to use)
const db = getFirestore(app);

export { db };
