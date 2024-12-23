// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVhAbrrboZW86pfs1-Fep03jGnRVktJVI",
  authDomain: "flick-ce873.firebaseapp.com",
  projectId: "flick-ce873",
  storageBucket: "flick-ce873.firebasestorage.app",
  messagingSenderId: "100153856223",
  appId: "1:100153856223:web:e5a43a49ca01f217ee196a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
