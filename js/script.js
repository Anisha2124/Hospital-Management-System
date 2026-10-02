// ===============================
// CityCare Hospital - Main Script
// ===============================


// -------------------------------
// Logout
// -------------------------------

function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
}


// -------------------------------
// Check Login Status
// -------------------------------

function checkLogin() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "login.html";

    }

}


// -------------------------------
// Get Logged-in User Email
// -------------------------------

function getUserEmail() {

    return localStorage.getItem("userEmail") || "Admin";

}


// -------------------------------
// Display User Name / Email
// -------------------------------

document.addEventListener("DOMContentLoaded", function () {

    const userEmailElement = document.getElementById("userEmail");

    if (userEmailElement) {

        userEmailElement.textContent = getUserEmail();

    }

});