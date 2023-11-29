import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCCaCTVCKo5rZK9IuCi8mooS7VcIwjUmRY",
  authDomain: "ecom-b0a42.firebaseapp.com",
  projectId: "ecom-b0a42",
  storageBucket: "ecom-b0a42.appspot.com",
  messagingSenderId: "543613697026",
  appId: "1:543613697026:web:f0109dd95390eb08d67b1b",
  measurementId: "G-Z1J9QG4XPT"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);