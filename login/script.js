document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginSwitch = document.getElementById("login-switch");
    const signupSwitch = document.getElementById("signup-switch");
    const showSignupLink = document.getElementById("show-signup");

    function showLogin() {
        // signupForm.style.display = "none";
        // loginForm.style.display = "block";
        signupForm.style.transform = "translateX(100%)";
        loginForm.style.transform = "translateX(0%)";
    }

    function showSignup() {
        // signupForm.style.display = "block";
        // loginForm.style.display = "none";
        signupForm.style.transform = "translateX(-100%)";
        loginForm.style.transform = "translateX(-100%)";
    }

    loginSwitch.addEventListener("click", showLogin);
    signupSwitch.addEventListener("click", showSignup);
    showSignupLink.addEventListener("click", function (e) {
        e.preventDefault();
        showSignup();
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        login();
    });

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        signup();
    });
});