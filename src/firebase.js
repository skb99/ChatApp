// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBS2PyHja_KSG2rvN9caOIEVn4dv0D_agU",
  authDomain: "chatapp-21bf3.firebaseapp.com",
  projectId: "chatapp-21bf3",
  storageBucket: "chatapp-21bf3.appspot.com",
  messagingSenderId: "698446666843",
  appId: "1:698446666843:web:b3e0838a15ab69990e737e",
  measurementId: "G-HGXCC1RPKD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(); 
export const db = getFirestore();
export const storage = getStorage();
