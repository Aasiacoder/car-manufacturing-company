// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// invoice outvoice 
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaNn6S3D0gr2nXII6qg7T_YGWpit6NJik",
    authDomain: "car-manufacturing-company.firebaseapp.com",
    projectId: "car-manufacturing-company",
    storageBucket: "car-manufacturing-company.firebasestorage.app",
    messagingSenderId: "603524444054",
    appId: "1:603524444054:web:97a921337dd79ef94f37b7",
    measurementId: "G-T3EGTE8PBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// invoice & outvoice
// const db = getFirestore(app);

// export { auth, db };

// Export auth so other files can use it
export { auth };







