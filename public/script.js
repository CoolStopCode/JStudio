document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("createBtn");
    const loginButton = document.getElementById("loginBtn");
    const signupButton = document.getElementById("signupBtn");
    const exploreButton = document.getElementById("exploreBtn");

    // Simulate a function to check if the user is logged in
    function isLoggedIn() {
        // Placeholder logic; replace with real authentication check
        return sessionStorage.getItem("isLoggedIn") === "true";
    }

    // Redirects
    exploreButton.addEventListener("click", () => {
        window.location.href = "/explore";
    });

    createButton.addEventListener("click", () => {
        if (isLoggedIn()) {
            window.location.href = "/create";
        } else {
            window.location.href = "/login";
        }
    });

    loginButton.addEventListener("click", () => {
        window.location.href = "/login";
    });

    signupButton.addEventListener("click", () => {
        window.location.href = "/signup";
    });
});
