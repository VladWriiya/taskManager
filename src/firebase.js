// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8nR5M8JlREBBPey5MsFAhYNDjCPzeb_8",
  authDomain: "taskmanager-cc84e.firebaseapp.com",
  projectId: "taskmanager-cc84e",
  storageBucket: "taskmanager-cc84e.firebasestorage.app",
  messagingSenderId: "168020269059",
  appId: "1:168020269059:web:fcaa2b2a8824a9656b1636",
  measurementId: "G-8Y1QT9B7KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);

export { firebase };