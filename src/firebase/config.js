
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAK1m-M2Z5WN05Al3TDp7GU057_8JLJ90A",
    authDomain: "taskflow-f4c8c.firebaseapp.com",
    projectId: "taskflow-f4c8c",
    storageBucket: "taskflow-f4c8c.appspot.com",
    messagingSenderId: "373707341995",
    appId: "1:373707341995:web:5d6322cf33d6af353f77ee",
    measurementId: "G-D2RSGHKDGN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }
