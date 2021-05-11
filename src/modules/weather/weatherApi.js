import fetchJson from '../ajax';

const apiKey = 'b8270fddcb839619be5cc1af3cebd7eb';
const currentApiBase = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiBase = 'https://api.openweathermap.org/data/2.5/onecall';

function createCurrentWeatherApiUrl({ location, units }) {
    return `${currentApiBase}?q=${location}&appid=${apiKey}&units=${units}`;
}

function createForecastWeatherApiUrl({ latitude, longitude, exclude, units }) {
    return `${forecastApiBase}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}&units=${units}`;
}

export async function getCurrentWeather(query) {
    const apiUrl = createCurrentWeatherApiUrl(query);
    return fetchJson(apiUrl);
}

export async function getForecastWeather(query) {
    const apiUrl = createForecastWeatherApiUrl(query);
    return fetchJson(apiUrl);
}
