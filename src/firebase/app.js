// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9RnANAlYNO652Ej1jTbraOIuIis4xAVQ",
  authDomain: "grocerysync-6ce60.firebaseapp.com",
  projectId: "grocerysync-6ce60",
  storageBucket: "grocerysync-6ce60.appspot.com",
  messagingSenderId: "96314675202",
  appId: "1:96314675202:web:f79e8e2450df9068b4171b",
  measurementId: "G-4XTJPTPB8E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const auth = getAuth(app);
export default app;