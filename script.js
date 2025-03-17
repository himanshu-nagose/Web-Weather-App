

document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([20, 78], 5);
    let marker = null; // ✅ Declare marker in the global scope

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    getUserLocation();

    updateClock();
    setInterval(updateClock, 1000);

    document.getElementById("search-btn").addEventListener("click", handleSearch);
    document.getElementById("search-box").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        getWeatherData(lat, lng);
        updateMapPin(lat, lng, "Selected Location");
    });

    function handleSearch() {
        const city = document.getElementById("search-box").value.trim();
        if (city) {
            searchWeather(city);
        }
    }

    function searchWeather(city) {
        const apiKey = "8ffcc958d9b4f5beb8726ef5bb7f69e2"; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const { lat, lon } = data.coord;
                    getWeatherData(lat, lon);
                    updateMapPin(lat, lon, city);
                } else {
                    alert("Location not found! Please try again.");
                }
            })
            .catch(error => console.error("Error fetching city weather:", error));
    }

    function getWeatherData(lat, lon) {
        const apiKey = "8ffcc958d9b4f5beb8726ef5bb7f69e2"; // Replace with your OpenWeatherMap API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(weatherData => {
                fetch(aqiUrl)
                    .then(response => response.json())
                    .then(aqiData => {
                        updateWeatherInfo(weatherData, aqiData);
                    })
                    .catch(() => {
                        updateWeatherInfo(weatherData, null);
                    });
            })
            .catch(() => {
                document.getElementById("weather-info").innerText = "Failed to load weather data.";
            });
    }

    function updateWeatherInfo(weatherData, aqiData) {
        document.getElementById("location").innerText = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById("temperature").innerText = Math.round(weatherData.main.temp);
        document.getElementById("humidity").innerText = weatherData.main.humidity;
        document.getElementById("condition").innerText =
            weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);

        let aqi = "N/A";
        if (aqiData && aqiData.list.length > 0) {
            const aqiValue = aqiData.list[0].main.aqi;
            const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
            aqi = `${aqiValue} - ${aqiLevels[aqiValue - 1]}`;
        }
        document.getElementById("aqi").innerText = aqi;
    }

    function updateMapPin(lat, lon, locationName) {
        if (marker) {
            map.removeLayer(marker); // ✅ Fix: Ensure previous marker is removed before adding a new one
        }

        // ✅ Fix: Now properly adding marker
        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${locationName}</b><br>Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`)
            .openPopup();

        map.setView([lat, lon], 10, { animate: true });
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    getWeatherData(lat, lon);
                    updateMapPin(lat, lon, "Your Location");
                },
                () => {
                    console.warn("Location access denied. Defaulting to India.");
                    getWeatherData(20, 78);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            getWeatherData(20, 78);
        }
    }

    function updateClock() {
        const now = new Date();
        document.getElementById("clock").innerHTML = `⏰ ${now.toLocaleTimeString()}`;
        document.getElementById("date").innerHTML = `📅 ${now.toLocaleDateString()}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
});

// 8ffcc958d9b4f5beb8726ef5bb7f69e2