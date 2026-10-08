import { apiKey, apiUrl } from "./config.js";

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherGif = document.querySelector(".weather-gif");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const weatherCondition =
    document.querySelector(".weather-condition");
const humidity =
    document.querySelector(".humidity");
const windSpeed =
    document.querySelector(".wind-speed");
const errorMessage =
    document.querySelector(".error-message");

function getWeatherIcon(condition) {
    if (condition === "Clear") {
        return "./assets/clear-day.png";
    }
    else if (condition === "Clouds") {
        return "./assets/cloudy.png";
    }
    else if (condition === "Rain") {
        return "./assets/rain.png";
    }
    else if (condition === "Drizzle") {
        return "./assets/rain.png";
    }
    else if (condition === "Thunderstorm") {
        return "./assets/thunder-rain.png";
    }
    else if (condition === "Snow") {
        return "./assets/snow.png";
    }
    else if (condition === "Mist" ||
        condition === "Fog" ||
        condition === "Haze" ||
        condition === "Smoke") {
        return "./assets/fog.png";
    }
    else {
        return "./assets/clear-day.png";
    }
}

async function getWeather(city) {
    try {
        errorMessage.textContent = "";
        if (city.trim() === "") {
            errorMessage.textContent =
                "Please enter a city name.";
            return;
        }
        const response = await fetch(
            `${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);
        cityName.textContent =
            data.name;
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;
        weatherCondition.textContent =
            data.weather[0].description;
        humidity.textContent =
            `${data.main.humidity}%`;
        const windInKmh =
            Math.round(data.wind.speed * 3.6);
        windSpeed.textContent =
            `${windInKmh} km/h`;
        weatherIcon.src =
            getWeatherIcon(data.weather[0].main);
        setWeatherBackground(data.weather[0].main);
    }
    catch (error) {
        console.error(error);
        cityName.textContent =
            "City not found";
        temperature.textContent =
            "--°C";
        weatherCondition.textContent =
            "--";
        humidity.textContent =
            "--%";
        windSpeed.textContent =
            "-- km/h";
        weatherIcon.src =
            "./assets/clear-day.png";
        errorMessage.textContent =
            "Unable to find that city.";
    }
}

searchButton.addEventListener("click", () => {
    getWeather(searchInput.value);
})

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather(searchInput.value);
    }
});

const weatherBackground = document.querySelector(".weather-background");

function setWeatherBackground(condition) {

    if (condition === "Clear") {
        weatherGif.src = "./assets/clear.gif";
    }
    else if (condition === "Clouds") {
        weatherGif.src = "./assets/clouds.gif";
    }
    else if (condition === "Rain" || condition === "Drizzle") {
        weatherGif.src = "./assets/rain.gif";
    }
    else if (condition === "Thunderstorm") {
        weatherGif.src = "./assets/thunder.gif";
    }
    else if (condition === "Snow") {
        weatherGif.src = "./assets/snow.gif";
    }
    else if (
        condition === "Mist" ||
        condition === "Fog" ||
        condition === "Haze" ||
        condition === "Smoke"
    ) {
        weatherGif.src = "./assets/fog.gif";
    }
    else {
        weatherGif.src = "./assets/storm.gif";
    }
}

getWeather("Bokaro");