// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDusEGJfvs0WrGJ5qgFVM9b2oEHXjvtCZg",
  authDomain: "todolist-login-info.firebaseapp.com",
  projectId: "todolist-login-info",
  storageBucket: "todolist-login-info.appspot.com",
  messagingSenderId: "373534982635",
  appId: "1:373534982635:web:e83f181e4d0ab7542e59ae",
  measurementId: "G-XYZPKK4HGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, auth, storage }; // Export storage along with db and auth
