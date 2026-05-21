import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCJzIejJW4NmQa-u0XzcNUpAhkcs5BEmRE",
    authDomain: "pawfect-adoption.firebaseapp.com",
    projectId: "pawfect-adoption",
    storageBucket: "pawfect-adoption.firebasestorage.app",
    messagingSenderId: "703941558552",
    appId: "1:703941558552:web:9e9c3aaa4863f34f435e6d",
    measurementId: "G-053EHY26YY"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)