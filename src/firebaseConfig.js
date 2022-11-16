import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// to hide these keys, we stored them in .env and getting from that using process.env
const firebaseConfig = {
  apiKey: "AIzaSyAPdfyfhwEH-qMn3H9xmDEg2SQT1ABwe4s",
  authDomain: "typetest-5220a.firebaseapp.com",
  projectId: "typetest-5220a",
  storageBucket: "typetest-5220a.appspot.com",
  messagingSenderId: "755659612811",
  appId: "1:755659612811:web:7b5b0a8a236b48e0572a8e",
  measurementId: "G-FYC0T52C60",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(); // enable us to sign-up and login
