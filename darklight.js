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
