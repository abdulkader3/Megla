import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatgpt-clone-c4307.firebaseapp.com",
  projectId: "chatgpt-clone-c4307",
  storageBucket: "chatgpt-clone-c4307.firebasestorage.app",
  messagingSenderId: "227029702485",
  appId: "1:227029702485:web:5847c519d8fb8eeed301dc",
  measurementId: "G-KN922GF9W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db }; 