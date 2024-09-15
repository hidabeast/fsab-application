// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzPZEfpy0QK-Xbyj7jYROUsgokvpTKbcg",
    authDomain: "fsab-application.firebaseapp.com",
    projectId: "fsab-application",
    storageBucket: "fsab-application.appspot.com",
    messagingSenderId: "895707054818",
    appId: "1:895707054818:web:f0753dbdc2937460dc14bb"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);