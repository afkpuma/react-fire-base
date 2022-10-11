import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDKa4fKWp9KHipJSQNBxvPSmIgTu62TF-Y",
  authDomain: "todolist-3ee23.firebaseapp.com",
  projectId: "todolist-3ee23",
  storageBucket: "todolist-3ee23.appspot.com",
  messagingSenderId: "499460415484",
  appId: "1:499460415484:web:e2ace3bdf3280c20671c79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;