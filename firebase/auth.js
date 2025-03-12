import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Signup Function
function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let role = "";
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

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let role = "";
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
        .catch((error) => {
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
document.getElementById("signup-btn").addEventListener("click", (e) => {
    e.preventDefault();
    signup();
});
document.getElementById("login-btn").addEventListener("click", (e) => {
    e.preventDefault();
    login();
});
document.getElementById("logout-btn")?.addEventListener("click", logout);
