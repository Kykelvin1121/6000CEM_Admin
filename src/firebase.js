import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ims-reactjs.firebaseapp.com",
  databaseURL: "https://ims-reactjs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ims-reactjs",
  storageBucket: "ims-reactjs.appspot.com",
  messagingSenderId: "523303252798",
  appId: "1:523303252798:web:8d4aadce226f49e5d1726f",
  measurementId: "G-G09XT4B206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
