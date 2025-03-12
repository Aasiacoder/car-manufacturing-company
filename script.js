'use strict';

/* MOBILE NAVBAR TOGGLE */

document.addEventListener("DOMContentLoaded", function () {
    /* MOBILE NAVBAR TOGGLE */
    const navbar = document.querySelector("[data-navbar]");
    const navToggler = document.querySelector("[data-nav-toggler]");

    // console.log(navToggler, navbar); // Debugging
    // console.log(document.querySelector("[data-nav-toggler]"));
  
    if (navToggler && navbar) {
      navToggler.addEventListener("click", function () {
        navbar.classList.toggle("active");
        this.classList.toggle("active");
      });
    } else {
      console.error(this + "Navbar, Toggler  or login button not found!");
    }
  }); 



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


