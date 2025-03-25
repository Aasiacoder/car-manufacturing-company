'use strict';

// import { logout } from "./firebase/auth.js";

/* MOBILE NAVBAR TOGGLE */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");

  if (!navbar || !navToggler) {
    console.error("Navbar or Toggler not found!");
    return;
  }

  // Remove any existing click listeners
  navToggler.replaceWith(navToggler.cloneNode(true));

  // Select the new button
  let newNavToggler = document.querySelector("[data-nav-toggler]");

  newNavToggler.addEventListener("click", function () {
    console.log("Toggler clicked!");

    navbar.classList.toggle("active");
    newNavToggler.classList.toggle("active");

    // apply styles to fix hidden navbar
    navbar.style.opacity = "";
    navbar.style.visibility = "";

    // Output
    // setTimeout(() => {
    //   console.log("Navbar Classes:", navbar.classList);
    //   console.log("Navbar Style - Opacity:", getComputedStyle(navbar).opacity);
    //   console.log("Navbar Style - Visibility:", getComputedStyle(navbar).visibility);
    // }, 1000);
  });
});



/* AUTHENTICATION BUTTON HANDLING */
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("auth-button");
  const actionButton = document.querySelector(".hero-content .btn");

  // Retrieve user info from localStorage
  const userRole = localStorage.getItem("userRole");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    loginButton.innerHTML = "Logout";
    loginButton.href = "#";
    loginButton.onclick = () => logout();

    // Show correct button based on role
    if (userRole === "HR") {
      actionButton.innerHTML = '<span class="span">Salary Maintenance</span>';
      actionButton.href = "./salaryMaintenance/index.html"; // Link to Salary Maintenance Page
    } else if (userRole === "Manager") {
      actionButton.innerHTML = '<span class="span">Invoice & Outvoice</span>';
      actionButton.href = "./invoiceOutvoice/index.html"; // Link to Invoice Page
    } else {
      actionButton.style.display = "none"; // Hide button for regular users
    }
  } else {
    actionButton.style.display = "none"; // Hide button if not logged in
  }
});

