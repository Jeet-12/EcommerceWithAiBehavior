import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDv43kwxTuA6QKI2sQWnVrjDsp_UABrMds",
  authDomain: "ecommerceai-c4e8b.firebaseapp.com",
  projectId: "ecommerceai-c4e8b",
  storageBucket: "ecommerceai-c4e8b.appspot.com",
  messagingSenderId: "400167713795",
  appId: "1:400167713795:web:c0faafab6bba9796ef2236"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);