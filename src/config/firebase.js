import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyADDoeHB_YR7ZjD3Wj2CFWvY5q2ldrdktQ",
  authDomain: "creamdash-ecommerce.firebaseapp.com",
  projectId: "creamdash-ecommerce",
  storageBucket: "creamdash-ecommerce.firebasestorage.app",
  messagingSenderId: "348410598667",
  appId: "1:348410598667:web:c97ac8ac095825e618fe0e",
  measurementId: "G-XHDV752N2W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
