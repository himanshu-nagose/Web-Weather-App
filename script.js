// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map and set the default view (India)
    const map = L.map("map").setView([20, 78], 5);

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ask for user's location on load
    getUserLocation();

    // Start the real-time clock
    updateClock();
    setInterval(updateClock, 1000);

    // Add event listener for search button click
    document.getElementById("search-btn").addEventListener("click", () => {
        handleSearch();
    });

    // Add event listener for "Enter" key press in search box
    document.getElementById("search-box").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Add event listener for live city suggestions
    document.getElementById("search-box").addEventListener("input", function () {
        const input = this.value.trim();
        if (input.length >= 3) {
            fetchCitySuggestions(input);
        } else {
            document.getElementById("suggestions-box").style.display = "none";
        }
    });

    // Add click event to fetch weather at clicked location
    map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        getWeatherData(lat, lng);
    });
});

// Function to ask for user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherData(lat, lon);
                fetchCitySuggestionsByLocation(lat, lon);
            },
            error => {
                console.warn("Location access denied. Defaulting to India.");
                getWeatherData(20, 78); // Default location: India
            }
        );
    } else {
        console.warn("Geolocation is not supported by this browser.");
        getWeatherData(20, 78);
    }
}

// Function to fetch nearby city suggestions based on user's location
function fetchCitySuggestionsByLocation(lat, lon) {
    const apiKey = ""; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const searchBox = document.getElementById("search-box");
                searchBox.placeholder = `Try: ${data[0].name}, ${data[0].state}, ${data[0].country}`;
            }
        })
        .catch(error => console.error("Error fetching nearby city suggestions:", error));
}

// Function to fetch city suggestions based on user input
function fetchCitySuggestions(query) {
    const apiKey = ""; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const suggestionsBox = document.getElementById("suggestions-box");
            suggestionsBox.innerHTML = "";
            if (data.length > 0) {
                suggestionsBox.style.display = "block";
                data.forEach(city => {
                    const listItem = document.createElement("li");
                    listItem.innerText = `${city.name}, ${city.state || ""}, ${city.country}`;
                    listItem.addEventListener("click", () => {
                        document.getElementById("search-box").value = city.name;
                        suggestionsBox.style.display = "none";
                        getWeatherData(city.lat, city.lon);
                    });
                    suggestionsBox.appendChild(listItem);
                });
            } else {
                suggestionsBox.style.display = "none";
            }
        })
        .catch(error => console.error("Error fetching city suggestions:", error));
}

// Function to handle search
function handleSearch() {
    const city = document.getElementById("search-box").value.trim();
    if (city) {
        searchWeather(city);
    }
}

// Function to fetch weather by city name
function searchWeather(city) {
    const apiKey = ""; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                getWeatherData(data.coord.lat, data.coord.lon); // Fetch detailed weather using coordinates
            } else {
                alert("City not found! Please try again.");
            }
        })
        .catch(error => console.error("Error fetching city weather:", error));
}

// Function to fetch weather and AQI data by coordinates
function getWeatherData(lat, lon) {
    const apiKey = ""; // Replace with your OpenWeatherMap API key

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch weather data
    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            // Fetch AQI data
            fetch(aqiUrl)
                .then(response => response.json())
                .then(aqiData => {
                    updateWeatherInfo(weatherData, aqiData);
                })
                .catch(error => {
                    console.error("Error fetching AQI data:", error);
                    updateWeatherInfo(weatherData, null);
                });
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather-info").innerText = "Failed to load weather data.";
        });
}

// Function to update the weather info box
function updateWeatherInfo(weatherData, aqiData) {
    document.getElementById("location").innerText = weatherData.name || "Unknown Location";
    document.getElementById("temperature").innerText = Math.round(weatherData.main.temp);
    document.getElementById("humidity").innerText = weatherData.main.humidity;
    document.getElementById("condition").innerText =
        weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);

    // Get AQI value
    let aqi = "N/A";
    if (aqiData && aqiData.list && aqiData.list.length > 0) {
        const aqiValue = aqiData.list[0].main.aqi;
        const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
        aqi = `${aqiValue} - ${aqiLevels[aqiValue - 1]}`;
    }
    document.getElementById("aqi").innerText = aqi;
}

// Function to update the clock and date in real-time
function updateClock() {
    const now = new Date();

    document.getElementById("clock").innerHTML = `⏰ ${now.toLocaleTimeString()}`;
    document.getElementById("date").innerHTML = `📅 ${now.toLocaleDateString()}`;
}

// Start the real-time clock
updateClock();
setInterval(updateClock, 1000);


// 8ffcc958d9b4f5beb8726ef5bb7f69e2