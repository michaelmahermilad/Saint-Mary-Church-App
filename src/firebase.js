import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0je3firquV-pcNWyLbHFUIFlVWXaGfbs",
  authDomain: "saint-mary-church.firebaseapp.com",
  databaseURL: "https://saint-mary-church-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "saint-mary-church",
  storageBucket: "saint-mary-church.appspot.com",
  messagingSenderId: "26728570187",
  appId: "1:26728570187:web:8fdd5f81a127eec72adcce",
  measurementId: "G-4L41GGSZ22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, database };
