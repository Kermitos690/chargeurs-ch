
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLcFXeCYGpNQzAAA7s_ilZYHvh3_EZa_Y",
  authDomain: "chargeurs-ch.firebaseapp.com",
  projectId: "chargeurs-ch",
  storageBucket: "chargeurs-ch.firebasestorage.app",
  messagingSenderId: "747950560072",
  appId: "1:747950560072:web:bd6491ecb116b97a2e997d",
  measurementId: "G-345SEMH8Q3"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
