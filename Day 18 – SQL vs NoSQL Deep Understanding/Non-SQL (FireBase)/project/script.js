// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDQh19W_hXM2PLzbLCky_ZDAcoV0TvC44",
  authDomain: "authenticater-981.firebaseapp.com",
  projectId: "authenticater-981",
  storageBucket: "authenticater-981.firebasestorage.app",
  messagingSenderId: "375277974564",
  appId: "1:375277974564:web:4d1f2856bc5c95feb814b1",
  measurementId: "G-WYFP75KQKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register
window.register = function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "Registration Successful!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};

// Login
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "Login Successful!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};

// Logout
window.logout = function () {
  signOut(auth)
    .then(() => {
      document.getElementById("message").innerText = "Logged Out!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};

// Detect Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});