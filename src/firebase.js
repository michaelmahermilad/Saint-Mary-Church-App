import firebase from "firebase/compat/app"; // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
 import "firebase/compat/firestore";
import "firebase/compat/auth";
import { GoogleAuthProvider  } from "firebase/auth";

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = getDatabase();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new GoogleAuthProvider();
 export default db;
export { auth, provider, database, ref, set, onValue, remove };
