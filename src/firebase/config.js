// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
let app;
let db;
let auth;
let timestamp;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    timestamp = serverTimestamp();
} else {
    app = getApp()
}


export {
    db,
    auth,
    timestamp
}