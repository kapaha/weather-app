/* eslint-disable consistent-return */
import weatherApiFactory from './weather';

import {
    setHomeLocation,
    getHomeLocation,
    setUnitPreference,
    getUnitPreference,
} from './local-storage';

import stateFactory from './state';

import {
    showBanner,
    hideBanner,
    updateDisplay,
    toggleUnitBtn,
    getSearchInput,
    toggleSearchSpinner,
    toggleHomeLocationSpinner,
    toggleRefreshSpinner,
    showDisplay,
    convertTemps,
} from './dom';

import { celsiusToFarenheit, farenheitToCelsius } from './math';

const state = stateFactory();

const weatherApi = weatherApiFactory();

initApp();

// process JSON data geting only required data for app
function processCurrentWeatherData(data) {
    const locationString = data.sys.country
        ? `${data.name}, ${data.sys.country}`
        : `${data.name}`;

    return {
        description: data.weather[0].description,
        iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        location: locationString,
        temp: data.main.temp,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
    };
}

function processForecastWeatherData(data) {
    return data.daily.map((day) => {
        const date = unixToDate(day.dt);
        return {
            dateShort: `${date.day}, ${date.month} ${date.date}`,
            dayTemp: day.temp.day,
            description: day.weather[0].description,
            iconUrl: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            nightTemp: day.temp.night,
        };
    });
}

// get and process weather data
async function getCurrentWeatherData(query) {
    try {
        const data = await weatherApi.getCurrentData(query);

        if (data.cod === '404') {
            throw new Error(data.message);
        }

        return processCurrentWeatherData(data);
    } catch (error) {
        showBanner(error.message, 'error');
        return false;
    }
}

async function getForecastWeatherData(query) {
    try {
        const data = await weatherApi.getForecastData(query);

        if (data.cod === '404') {
            throw new Error(data.message);
        }

        return processForecastWeatherData(data);
    } catch (error) {
        showBanner(error.message, 'error');
        return false;
    }
}

// handle loading of weather
async function loadWeather(location, spinnerCallback, msg) {
    const currentQuery = createCurrentWeatherQuery(location);
    const currentData = await getCurrentWeatherData(currentQuery);

    if (!currentData) {
        if (spinnerCallback) {
            spinnerCallback();
        }
        return;
    }

    const forecastQuery = createForecastWeatherQuery(currentData);
    const forecastData = await getForecastWeatherData(forecastQuery);

    if (spinnerCallback) {
        spinnerCallback();
    }

    if (!forecastData) return;

    if (state.getCurrentLocation() == null) {
        showDisplay();
    }

    state.setCurrentLocation(currentData.location);
    state.setCurrentTemp(currentData.temp);

    hideBanner();

    if (msg) {
        showBanner(msg, 'success');
    }

    updateDisplay(currentData, forecastData);
}

// helper functions
function createCurrentWeatherQuery(location) {
    return {
        location,
        units: state.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
    };
}

function createForecastWeatherQuery({ latitude, longitude }) {
    // async function getForecastData({ latitude, longitude, exclude, units }) {
    return {
        latitude,
        longitude,
        exclude: 'alerts,hourly,minutely,current',
        units: state.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
    };
}

function loadUnitPreference() {
    const unitPref = getUnitPreference();

    if (unitPref == null) return;

    const currentUnit = state.getUnitPref();

    if (unitPref !== currentUnit) {
        toggleUnitBtn();
        state.toggleUnitPref();
    }
}

function loadHomeLocation() {
    const homeLocation = getHomeLocation();

    if (homeLocation == null) return;

    loadWeather(homeLocation);
}

function unixToDate(unixTimeStamp) {
    const milliseconds = unixTimeStamp * 1000;

    const dateObject = new Date(milliseconds);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const day = days[dateObject.getDay()];
    let date = `${dateObject.getDate()}`;
    if (date.length === 1) {
        date = `0${date}`;
    }
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const hour = dateObject.getHours();
    const min = dateObject.getMinutes();
    const sec = dateObject.getSeconds();

    return {
        day,
        date,
        month,
        year,
        hour,
        min,
        sec,
    };
}

// functions called by event listeners
function handleWeatherSearch(event) {
    event.preventDefault();

    toggleSearchSpinner();

    const location = getSearchInput();

    loadWeather(location, toggleSearchSpinner);
}

function handleHomeButtonClick() {
    const homeLocation = getHomeLocation();

    if (homeLocation == null) {
        showBanner('No Home Location Set', 'error');
        return;
    }

    toggleHomeLocationSpinner();

    loadWeather(
        homeLocation,
        toggleHomeLocationSpinner,
        'Home Location Loaded'
    );
}

function handleUnitBtnClick() {
    if (state.getCurrentLocation()) {
        const convertTemp =
            state.getUnitPref() === 'celsius'
                ? celsiusToFarenheit
                : farenheitToCelsius;
        convertTemps(convertTemp);
    }
    state.toggleUnitPref();
    toggleUnitBtn();
    setUnitPreference(state.getUnitPref());
}

function handleSaveLocation() {
    if (!state.getCurrentLocation()) {
        showBanner('No Current Location To Save', 'error');
        return;
    }

    setHomeLocation(state.getCurrentLocation());

    showBanner('Home Location Saved', 'success');
}

function handleRefreshBtnClick() {
    if (!state.getCurrentLocation()) {
        showBanner('No Current Location To Refresh', 'error');
        return;
    }

    toggleRefreshSpinner();

    loadWeather(
        state.getCurrentLocation(),
        toggleRefreshSpinner,
        'Current Location Refreshed'
    );
}

// init app functions
function initEventListeners() {
    const form = document.querySelector('#search-bar__form');
    form.addEventListener('submit', handleWeatherSearch);

    const homeButton = document.querySelector('#home-btn');
    homeButton.addEventListener('click', handleHomeButtonClick);

    const unitBtn = document.querySelector('#toggle-unit-btn');
    unitBtn.addEventListener('click', handleUnitBtnClick);

    const saveButton = document.querySelector('#save-btn');
    saveButton.addEventListener('click', handleSaveLocation);

    const refreshButton = document.querySelector('#refresh-btn');
    refreshButton.addEventListener('click', handleRefreshBtnClick);
}

function loadUserSettings() {
    loadUnitPreference();
    loadHomeLocation();
}

function initApp() {
    initEventListeners();
    loadUserSettings();
}
