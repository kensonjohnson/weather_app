import { fromUnixTime, intlFormat } from "date-fns";

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

//----------------Current Weather----------------//
export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=275918102213f3b21d9b6576b944ffca`,
    { mode: "cors" }
  );
  const data = await response.json();
  const weather: CurrentWeather = parseCurrentWeather(data);
  return weather;
}

function parseCurrentWeather({
  weather,
  main,
  wind,
  clouds,
  name,
}: {
  weather: Weather;
  main: Main;
  wind: Wind;
  clouds: { all: number };
  name: string;
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
    cityName: name,
    weatherCode: weatherCode,
    weatherDescription: weatherDescription,
    currentTemp: Math.round(currentTemp),
    feelsLikeTemp: Math.round(feelsLikeTemp),
    tempLow: Math.round(tempLow),
    tempHigh: Math.round(tempHigh),
    humidity: humidity,
    windSpeed: Math.round(windSpeed) || 0,
    windDirection: windDirection,
    windGustSpeed: Math.round(windGustSpeed) || Math.round(windSpeed),
    cloudCoverage: cloudCoverage,
  };
}

//----------------5 Day Forecast----------------//
type Forecast = {
  weatherCode: number;
  weatherDescription: string;
  temp: number;
  time: string;
};

type ForecastList = Forecast[];

type DataList = [
  {
    weather: [{ id: number; main: string }];
    dt: number;
    main: { temp: number };
  }
];

export async function getForecast(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=275918102213f3b21d9b6576b944ffca`,
    { mode: "cors" }
  );
  const data = await response.json();
  const forecast: ForecastList = parseForecast(data.list);
  return forecast;
}

function parseForecast(list: DataList) {
  let forecast: ForecastList = [];
  list.forEach((entry) => {
    forecast.push({
      weatherCode: entry.weather[0].id,
      weatherDescription: entry.weather[0].main,
      temp: Math.round(entry.main.temp),
      time: intlFormat(fromUnixTime(entry.dt), {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  });

  return forecast;
}
