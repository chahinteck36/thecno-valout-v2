import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxcNa2RlyOXQU0xY7oWJmPBw0E6TIPdmY",
    authDomain: "techvault-pro-8a785.firebaseapp.com",
    projectId: "techvault-pro-8a785",
    storageBucket: "techvault-pro-8a785.firebasestorage.app",
    messagingSenderId: "577138404350",
    appId: "1:577138404350:web:17e60367a34601b61daeaf"
  };

// Initialize Firebase App singleton
export const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
