import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBLPtBYqXk2yEwyySFPJO0-ZglW-m5MWj0",
  authDomain: "curso-14977.firebaseapp.com",
  projectId: "curso-14977",
  storageBucket: "curso-14977.appspot.com",
  messagingSenderId: "90256139385",
  appId: "1:90256139385:web:143ee2c908a39118a9e0a8",
  measurementId: "G-37JG1V6MX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;