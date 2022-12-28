import "./style.css";
import { getCurrentWeather, getForecast } from "./weather";
import { ICON_MAP } from "./iconMapping";

//------------HTML Elements------------//
const searchButton = document.querySelector(
  "[data-search-button]"
) as HTMLButtonElement;
const searchInput = document.querySelector(
  "[data-searchbar]"
) as HTMLInputElement;
const locationButton = document.querySelector(
  "[data-location-button]"
) as HTMLButtonElement;
const searchClearButton = document.querySelector(
  "[data-clear-button]"
) as HTMLButtonElement;
const currentWeatherIcon = document.querySelector(
  "[data-current-weather-icon]"
) as HTMLImageElement;
const currentWeatherDescription = document.querySelector(
  "[data-weather-desc]"
) as HTMLDivElement;
const currentTemp = document.querySelector(
  "[data-current-temp]"
) as HTMLSpanElement;
const cityName = document.querySelector("[data-city]") as HTMLHeadingElement;
const feelsLikeTemp = document.querySelector(
  "[data-fl-temp"
) as HTMLSpanElement;
const windSpeed = document.querySelector(
  "[data-wind-speed]"
) as HTMLSpanElement;
const tempHigh = document.querySelector("[data-temp-high]") as HTMLSpanElement;
const humidity = document.querySelector("[data-humidity]") as HTMLSpanElement;
const windDirection = document.querySelector(
  "[data-wind-direction]"
) as HTMLDivElement;
const tempLow = document.querySelector("[data-temp-low]") as HTMLSpanElement;
const cloudCoverage = document.querySelector(
  "[data-clouds]"
) as HTMLSpanElement;
const windGustSpeed = document.querySelector(
  "[data-wind-gust-speed]"
) as HTMLSpanElement;
const forecastDiv = document.querySelector("[data-forecast]") as HTMLDivElement;

//----------------Types-----------------//

type CurrentWeather = {
  cityName: string;
  weatherCode: number;
  weatherDescription: string;
  currentTemp: number;
  feelsLikeTemp: number;
  tempLow: number;
  tempHigh: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGustSpeed: number;
  cloudCoverage: number;
};

type Forecast = {
  weatherCode: number;
  weatherDescription: string;
  temp: number;
  time: string;
};

//----------------Main-----------------//
function renderCurrentWeather(currentWeather: CurrentWeather) {
  currentWeatherIcon.src = `images/${
    ICON_MAP.get(currentWeather.weatherCode) ?? "sun-light"
  }.svg`;
  currentWeatherDescription.innerText = currentWeather.weatherDescription;
  currentTemp.innerText = currentWeather.currentTemp.toString();
  cityName.innerText = `Today in ${currentWeather.cityName}`;
  feelsLikeTemp.innerText = currentWeather.feelsLikeTemp.toString();
  windSpeed.innerText = currentWeather.windSpeed.toString();
  tempHigh.innerText = currentWeather.tempHigh.toString();
  humidity.innerText = currentWeather.humidity.toString();
  windDirection.innerText = getWindDirection(currentWeather.windDirection);
  tempLow.innerText = currentWeather.tempLow.toString();
  cloudCoverage.innerText = currentWeather.cloudCoverage.toString();
  windGustSpeed.innerText = currentWeather.windGustSpeed.toString();
}

function getWindDirection(deg: number) {
  let direction: string = "Unknown";

  if (deg >= 337.5 || deg < 22.5) {
    direction = "Northern";
  } else if (deg >= 22.5 && deg < 67.5) {
    direction = "North-Eastern";
  } else if (deg >= 67.5 && deg < 112.5) {
    direction = "Eastern";
  } else if (deg >= 112.5 && deg < 157.5) {
    direction = "South-Eastern";
  } else if (deg >= 157.5 && deg < 202.5) {
    direction = "Southern";
  } else if (deg >= 202.5 && deg < 247.5) {
    direction = "South-Western";
  } else if (deg >= 247.5 && deg < 292.5) {
    direction = "Western";
  } else if (deg >= 292.5 && deg < 337.5) {
    direction = "North-Western";
  }

  return direction;
}

function renderForecast(forecast: Forecast[]) {
  forecastDiv.innerHTML = "";
  forecast.forEach((entry: Forecast) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastDiv.appendChild(forecastCard);
    const forecastCardLeft = document.createElement("div");
    forecastCardLeft.classList.add("forecast-card-left");
    forecastCard.appendChild(forecastCardLeft);
    const forecastTime = document.createElement("h2");
    forecastTime.classList.add("forecast-time");
    forecastTime.innerText = entry.time;
    forecastCardLeft.appendChild(forecastTime);
    const forecastTemp = document.createElement("div");
    forecastTemp.classList.add("forecast-text");
    forecastTemp.innerHTML = `${entry.temp}&deg;`;
    forecastCardLeft.appendChild(forecastTemp);
    const forecastDescription = document.createElement("div");
    forecastDescription.classList.add("forecast-text");
    forecastDescription.innerText = entry.weatherDescription;
    forecastCardLeft.appendChild(forecastDescription);
    const forecastIcon = document.createElement("img");
    forecastIcon.classList.add("forecast-weather-icon");
    forecastIcon.src = `images/${
      ICON_MAP.get(entry.weatherCode) ?? "sun-light"
    }.svg`;
    forecastCard.appendChild(forecastIcon);
  });
}
//-----------Event Listeners-----------//
searchButton.addEventListener("click", handleInput);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleInput();
  }
});

async function handleInput() {
  if (searchInput.value.length !== 5) {
    return alert("Please enter a valid US Zipcode");
  }
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${searchInput.value},US&appid=275918102213f3b21d9b6576b944ffca`,
    { mode: "cors" }
  );
  const coords = await response.json();
  renderCurrentWeather(await getCurrentWeather(coords.lat, coords.lon));
  renderForecast(await getForecast(coords.lat, coords.lon));
}

locationButton.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(
    async ({ coords }: GeolocationPosition) => {
      renderCurrentWeather(
        await getCurrentWeather(coords.latitude, coords.longitude)
      );
      renderForecast(await getForecast(coords.latitude, coords.longitude));
    }
  );
});

searchClearButton.addEventListener("click", () => {
  searchInput.value = "";
  console.log("clicked");
});
