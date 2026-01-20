
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjkjcMRbJNRzphIndaI6JG1n2PeMeNB7o",
  authDomain: "e-commerce-7fc12.firebaseapp.com",
  projectId: "e-commerce-7fc12",
  storageBucket: "e-commerce-7fc12.firebasestorage.app",
  messagingSenderId: "892880257830",
  appId: "1:892880257830:web:9d84b6f3100012543bf7e7",
  measurementId: "G-67SPRD15VW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
