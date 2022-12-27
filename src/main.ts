import "./style.css";
import { getCurrentWeather } from "./weather";
import { ICON_MAP } from "./iconMapping";

//------------HTML Elements------------//
const searchButton = document.querySelector(
  "[data-search-button]"
) as HTMLButtonElement;

const searchInput = document.querySelector(
  "[data-searchbar]"
) as HTMLInputElement;

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

//----------------Types-----------------//

type CurrentWeather = {
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

//----------------Main-----------------//
function renderCurrentWeather(currentWeather: CurrentWeather) {
  currentWeatherIcon.src = ICON_MAP.get(currentWeather.weatherCode);
  currentWeatherDescription.innerText = currentWeather.weatherDescription;
  currentTemp.innerText = currentWeather.currentTemp.toString();
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

//-----------Event Listeners-----------//
searchButton.addEventListener("click", async () => {
  renderCurrentWeather(await getCurrentWeather(36, -92));
});

searchClearButton.addEventListener("click", () => {
  searchInput.value = "";
  console.log("clicked");
});
