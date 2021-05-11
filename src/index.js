import state from './state';

import { getHomeLocation, getUnitPreference } from './storage';

import {
    handleHomeButtonClick,
    handleRefreshBtnClick,
    handleSaveLocation,
    handleUnitBtnClick,
    handleWeatherSearch,
} from './eventListeners';

import { toggleUnitBtn } from './dom';

import loadWeather from './weather/weatherFunctions';

initApp();

function initApp() {
    state.initAppDatasets();
    initEventListeners();
    loadUserSettings();
}

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
