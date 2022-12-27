//----------------Types----------------//
type Weather = [{ id: number; main: string }];
type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
};
type Wind = { speed: number; deg: number; gust: number };
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

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=275918102213f3b21d9b6576b944ffca`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
  const weather: CurrentWeather = parseCurrentWeather(data);
  return weather;
}

export async function getForecast(lat:number, lon:number) {
  
}

function parseCurrentWeather({
  weather,
  main,
  wind,
  clouds,
}: {
  weather: Weather;
  main: Main;
  wind: Wind;
  clouds: { all: number };
}) {
  const { id: weatherCode, main: weatherDescription } = weather[0];
  const {
    temp: currentTemp,
    feels_like: feelsLikeTemp,
    temp_min: tempLow,
    temp_max: tempHigh,
    humidity: humidity,
  } = main;
  const { speed: windSpeed, deg: windDirection, gust: windGustSpeed } = wind;
  const { all: cloudCoverage } = clouds;
  return {
    weatherCode: weatherCode,
    weatherDescription: weatherDescription,
    currentTemp: Math.round(currentTemp),
    feelsLikeTemp: Math.round(feelsLikeTemp),
    tempLow: Math.round(tempLow),
    tempHigh: Math.round(tempHigh),
    humidity: humidity,
    windSpeed: windSpeed,
    windDirection: windDirection,
    windGustSpeed: windGustSpeed,
    cloudCoverage: cloudCoverage,
  };
}
