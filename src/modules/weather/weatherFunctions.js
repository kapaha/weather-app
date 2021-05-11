import unixToDate from '../utils/unixToDate';

import { getCurrentWeather, getForecastWeather } from './weatherApi';

import state from '../state';

import {
    showBanner,
    showDisplay,
    hideBanner,
    unFocusInput,
    updateCurrentDisplay,
    updateForecastDisplay,
} from '../dom';

export default async function loadWeather(location, msg) {
    const data = await getWeatherData(location);

    if (!data) return;

    hideBanner();

    if (state.getCurrentLocation() == null) {
        showDisplay();
    }

    state.setCurrentLocation(data.currentData.location);

    updateCurrentDisplay(data.currentData);
    updateForecastDisplay(data.forecastData);
    unFocusInput();

    if (msg) {
        showBanner(msg, 'success');
    }
}

async function getWeatherData(location) {
    const currentQuery = createCurrentWeatherQuery(location);

    let currentData = await errorHandler(getCurrentWeather, currentQuery);

    if (!currentData) return false;

    currentData = processCurrentWeather(currentData);

    const forecastQuery = createForecastWeatherQuery(currentData);
    let forecastData = await getForecastWeather(forecastQuery);

    if (!forecastData) return false;

    forecastData = processForecastWeather(forecastData);

    return {
        currentData,
        forecastData,
    };
}

async function errorHandler(apiFunction, query) {
    try {
        const data = await apiFunction(query);

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        showBanner(error.message, 'error');
        return false;
    }
}

function processCurrentWeather(data) {
    const locationString = data.sys.country
        ? `${data.name}, ${data.sys.country}`
        : `${data.name}`;

    return {
        description: data.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        location: locationString,
        temp: data.main.temp,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
    };
}

function processForecastWeather(data) {
    return data.daily.map((day) => {
        const date = unixToDate(day.dt);
        return {
            dateShort: `${date.day}, ${date.month} ${date.date}`,
            dayTemp: day.temp.day,
            description: day.weather[0].description,
            iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            nightTemp: day.temp.night,
        };
    });
}

function createCurrentWeatherQuery(location) {
    return {
        location,
        units: state.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
    };
}

function createForecastWeatherQuery({ latitude, longitude }) {
    return {
        latitude,
        longitude,
        exclude: 'alerts,hourly,minutely,current',
        units: state.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
    };
}
