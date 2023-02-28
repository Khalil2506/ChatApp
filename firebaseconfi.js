// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR7uEibJ_mq0EjohflS7nOW4EMxIF5aeQ",
  authDomain: "chatapp-14f32.firebaseapp.com",
  projectId: "chatapp-14f32",
  storageBucket: "chatapp-14f32.appspot.com",
  messagingSenderId: "1034206901886",
  appId: "1:1034206901886:web:5bf41ec92e0fd273a98a2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db}