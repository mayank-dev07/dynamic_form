// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMOoit6EyeVKtlMnaAIJFuQ1D5EkG1wks",
  authDomain: "dynamic-form-a4dff.firebaseapp.com",
  projectId: "dynamic-form-a4dff",
  storageBucket: "dynamic-form-a4dff.appspot.com",
  messagingSenderId: "440312800566",
  appId: "1:440312800566:web:d39d3667907d893f657f97",
  measurementId: "G-THSTVRZVWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
