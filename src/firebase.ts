import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBfVDTX6UoiYtI1_6VCN9krsdYDHSRbDY",
  authDomain: "homekitchen-5f435.firebaseapp.com",
  projectId: "homekitchen-5f435",
  storageBucket: "homekitchen-5f435.firebasestorage.app",
  messagingSenderId: "673748394611",
  appId: "1:673748394611:web:2386df70b7e14ab6d98006",
  measurementId: "G-ST9RC3HHE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);