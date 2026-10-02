// ===============================
// CityCare Hospital - Login
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";

        // Demo login credentials
        const validEmail = "admin@citycare.com";
        const validPassword = "admin123";

        if (email === "" || password === "") {
            alert("Please enter email and password.");
            return;
        }

        if (email === validEmail && password === validPassword) {

            // Store login status
            localStorage.setItem("isLoggedIn", "true");

            // Store user email
            localStorage.setItem("userEmail", email);

            // Go to dashboard
            window.location.href = "dashboard.html";

        } else {

            alert("Invalid email or password.");

        }

    });

});