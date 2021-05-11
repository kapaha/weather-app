import {
    convertTemps,
    getSearchInput,
    showBanner,
    toggleHomeLocationSpinner,
    toggleRefreshSpinner,
    toggleSearchSpinner,
    toggleUnitBtn,
} from './dom';

import state from './state';

import {
    getHomeLocation,
    saveHomeLocation,
    saveUnitPreference,
} from './storage';

import { celsiusToFarenheit, farenheitToCelsius } from './utils/convertTemp';
import loadWeather from './weather/weatherFunctions';

export async function handleWeatherSearch(event) {
    event.preventDefault();

    toggleSearchSpinner();

    const location = getSearchInput();

    await loadWeather(location);

    toggleSearchSpinner();
}

export async function handleHomeButtonClick() {
    const homeLocation = getHomeLocation();

    if (homeLocation == null) {
        showBanner('No Home Location Set', 'error');
        return;
    }

    toggleHomeLocationSpinner();

    await loadWeather(homeLocation, 'Home Location Loaded');

    toggleHomeLocationSpinner();
}

export function handleUnitBtnClick() {
    if (state.getCurrentLocation()) {
        const convertTempFn =
            state.getUnitPref() === 'celsius'
                ? celsiusToFarenheit
                : farenheitToCelsius;
        convertTemps(convertTempFn);
    }
    state.toggleUnitPref();
    toggleUnitBtn();
    saveUnitPreference(state.getUnitPref());
}

export function handleSaveLocation() {
    if (!state.getCurrentLocation()) {
        showBanner('No Current Location To Save', 'error');
        return;
    }

    saveHomeLocation(state.getCurrentLocation());

    showBanner('Home Location Saved', 'success');
}

export function handleRefreshBtnClick() {
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
