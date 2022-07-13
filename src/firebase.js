// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4CDnfkjN3vrIDz9J-mo_yjjlFFJHmdjE",
    authDomain: "chuckattack-6c4b8.firebaseapp.com",
    databaseURL: "https://chuckattack-6c4b8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chuckattack-6c4b8",
    storageBucket: "chuckattack-6c4b8.appspot.com",
    messagingSenderId: "530499542777",
    appId: "1:530499542777:web:89aeb30735d1860e388c28",
    measurementId: "G-PJ7DC3CRW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
