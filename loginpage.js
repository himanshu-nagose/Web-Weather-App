document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("button");
    const inputs = document.querySelectorAll("textarea");
    const signupBtn = document.getElementById("signup-btn");
    const forgetPasswordBtn = document.getElementById("forget-password-btn");

    // Select the toggle switch
    const themeToggle = document.getElementById("themeToggle");

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.checked = true;
    }

    // Toggle theme on click
    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-theme");

        // Save theme preference in localStorage
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
    // Add focus effect on inputs
    inputs.forEach(input => {
        input.addEventListener("focus", function () {
            this.style.boxShadow = "0 0 10px rgba(255, 204, 51, 0.8)";
        });
        input.addEventListener("blur", function () {
            this.style.boxShadow = "none";
        });
    });

    // Button click animations
    loginButton.addEventListener("mousedown", function () {
        this.style.transform = "scale(0.95)";
    });

    loginButton.addEventListener("mouseup", function () {
        this.style.transform = "scale(1)";
    });

    loginButton.addEventListener("click", function () {
        alert("Logging in... (Replace this with real authentication)");
        window.location.href = "./index.html";
    });

    signupBtn.addEventListener("click", function () {
        window.location.href = "./signup.html";
    });

    forgetPasswordBtn.addEventListener("click", function () {
        window.location.href = "./forget.html";
    });
});
