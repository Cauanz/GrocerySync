// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9RnANAlYNO652Ej1jTbraOIuIis4xAVQ",
  authDomain: import.meta.REACT_APP_AUTHDOMAIN,
  projectId: import.meta.REACT_APP_PROJECTID,
  storageBucket: import.meta.REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.REACT_APP_MESSAGINGSENDERID,
  appId: import.meta.REACT_APP_APPID,
  measurementId: import.meta.REACT_APP_MEASUREMENTID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);