import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { db } from "./firebase-config.js";

// Signup Function
function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        // let role = "";
        .then(() => {
            let role = "User"; // Default role
            if (email === "deena001@gmail.com") {
                role = "HR";
            } else if (email === "gokul123@gmail.com") {
                role = "Manager";
            }

            // Store user data locally
            localStorage.setItem("userRole", role);
            localStorage.setItem("userName", name);
            localStorage.setItem("isLoggedIn", "true");

            alert("Signup successfully!");
            window.location.href = "../index.html";
        })
        .catch((error) => {
            alert("Signup failed: " + error.message + " Try again");
        });
}

// Login Function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     let role = "";
        .then(() => {
            let role = "User"; // Default role
            if (email === "deena001@gmail.com") {
                role = "HR";
            } else if (email === "gokul123@gmail.com") {
                role = "Manager";
            }

            // Store user data locally
            localStorage.setItem("userRole", role);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("isLoggedIn", "true");

            alert("Login successfully!");
            window.location.href = "../index.html";
        })
        .catch(() => {
            alert("Login failed: Error Signing in Please try again"); // " + error.message + "
            window.location.href = "#signup-form";
        });
}

// Logout Function
function logout() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("userRole");
            localStorage.removeItem("isLoggedIn");
            alert("Logged out!");
            window.location.href = "./index.html";
        })
        .catch((error) => {
            alert("Error logging out: " + error.message);
        });
}
// Make logout globally accessible
window.logout = logout;

// Attach functions to buttons
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");

    if (signupBtn) signupBtn.addEventListener("click", e => {
        e.preventDefault();
        signup();
    });

    if (loginBtn) loginBtn.addEventListener("click", e => {
        e.preventDefault();
        login();
    });
});

