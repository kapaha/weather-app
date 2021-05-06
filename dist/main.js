/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showBanner": () => (/* binding */ showBanner),
/* harmony export */   "hideBanner": () => (/* binding */ hideBanner),
/* harmony export */   "toggleSearchSpinner": () => (/* binding */ toggleSearchSpinner),
/* harmony export */   "toggleHomeLocationSpinner": () => (/* binding */ toggleHomeLocationSpinner),
/* harmony export */   "toggleRefreshSpinner": () => (/* binding */ toggleRefreshSpinner),
/* harmony export */   "toggleUnitBtn": () => (/* binding */ toggleUnitBtn),
/* harmony export */   "showDisplay": () => (/* binding */ showDisplay),
/* harmony export */   "updateDisplay": () => (/* binding */ updateDisplay),
/* harmony export */   "convertTemps": () => (/* binding */ convertTemps),
/* harmony export */   "unFocusInput": () => (/* binding */ unFocusInput),
/* harmony export */   "getSearchInput": () => (/* binding */ getSearchInput)
/* harmony export */ });
/* eslint-disable no-param-reassign */

// define elements
const bannerEl = document.getElementById('search-bar__banner');
const locationEl = document.getElementById('results__location');
const descriptionEl = document.getElementById('results__description');
const iconEl = document.getElementById('results__icon');
const tempEl = document.getElementById('results__temp-value');
const tempDegreeEl = document.querySelector('#results__temp-degree');
const input = document.querySelector('#search-bar__input');
const searchSpinner = document.querySelector('#search-spinner');
const homeLocationSpinner = document.querySelector('#home-location-spinner');
const refreshSpinner = document.querySelector('#refresh-spinner');
const resultsSection = document.querySelector('#results-section');
const forecastSection = document.querySelector('#forecast-section');
const tempEls = document.querySelectorAll('[data-temp]');

// error handling
const endAndStartBannerTimer = (() => {
    let timer; // variable persisted here
    return () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            hideBanner();
        }, 3000);
    };
})();

function showBanner(msg, type = 'error') {
    bannerEl.textContent = msg;

    bannerEl.classList.add('banner--active');

    bannerEl.style.backgroundColor =
        type === 'error' ? 'var(--color-red)' : 'var(--color-green)';

    endAndStartBannerTimer();
}

function hideBanner() {
    bannerEl.textContent = '';

    bannerEl.classList.remove('banner--active');
}

// display updaters
function toggleSpinner(element) {
    element.classList.toggle('display-none');
    element.nextElementSibling.classList.toggle('display-block');
    element.nextElementSibling.classList.toggle('display-none');
}

function toggleSearchSpinner() {
    toggleSpinner(searchSpinner);
}

function toggleHomeLocationSpinner() {
    toggleSpinner(homeLocationSpinner);
}

function toggleRefreshSpinner() {
    toggleSpinner(refreshSpinner);
}

function toggleUnitBtn() {
    const activeUnitEl = document.querySelector('[data-active-unit]');
    const notActiveUnitEl = document.querySelector('[data-not-active-unit]');

    activeUnitEl.classList.remove('nav__unit-active');
    activeUnitEl.removeAttribute('data-active-unit');
    activeUnitEl.setAttribute('data-not-active-unit', '');

    notActiveUnitEl.classList.add('nav__unit-active');
    notActiveUnitEl.removeAttribute('data-not-active-unit');
    notActiveUnitEl.setAttribute('data-active-unit', '');
}

function showDisplay() {
    resultsSection.classList.remove('display-none');
    forecastSection.classList.remove('display-none');
    resultsSection.classList.add('display-flex');
    forecastSection.classList.add('display-grid');
}

function updateDisplay(data, data2) {
    const { description, iconUrl, location, temp } = data;

    data2.forEach((day, index) => {
        const dateEl = document.querySelector(`#forecast__date-${index}`);
        dateEl.textContent = day.dateShort;

        const forecastIconEl = document.querySelector(
            `#forecast__icon-${index}`
        );
        forecastIconEl.src = day.iconUrl;

        const dayTempEl = document.querySelector(
            `#forecast__day-temp-${index}`
        );
        dayTempEl.textContent = `${Math.round(day.dayTemp)}`;
        dayTempEl.dataset.temp = day.dayTemp;

        const nightTempEl = document.querySelector(
            `#forecast__night-temp-${index}`
        );
        nightTempEl.textContent = `${Math.round(day.nightTemp)}`;
        nightTempEl.dataset.temp = day.nightTemp;
    });

    descriptionEl.textContent = description;
    iconEl.src = iconUrl;
    iconEl.alt = description;
    locationEl.textContent = location;
    tempEl.textContent = Math.round(temp);
    tempEl.dataset.temp = temp;
    tempDegreeEl.textContent = '°';
}

function convertTemps(convertTemp) {
    tempEls.forEach((el) => {
        const newTemp = convertTemp(el.dataset.temp);
        el.textContent = Math.round(newTemp);
        el.dataset.temp = newTemp;
    });
}

function unFocusInput() {
    input.blur();
}

// functions to get values
function getSearchInput() {
    return input.value;
}


/***/ }),

/***/ "./src/local-storage.js":
/*!******************************!*\
  !*** ./src/local-storage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setHomeLocation": () => (/* binding */ setHomeLocation),
/* harmony export */   "getHomeLocation": () => (/* binding */ getHomeLocation),
/* harmony export */   "setUnitPreference": () => (/* binding */ setUnitPreference),
/* harmony export */   "getUnitPreference": () => (/* binding */ getUnitPreference)
/* harmony export */ });
const LOCAL_STORAGE_HOME_LOCATION_KEY = 'weatherApp.homeLocation';
const LOCAL_STORAGE_UNIT_PREFERENCE_KEY = 'weatherApp.unitPreference';

function setHomeLocation(location) {
    localStorage.setItem(LOCAL_STORAGE_HOME_LOCATION_KEY, location);
}

function getHomeLocation() {
    return localStorage.getItem(LOCAL_STORAGE_HOME_LOCATION_KEY);
}

function setUnitPreference(unit) {
    localStorage.setItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY, unit);
}

function getUnitPreference() {
    return localStorage.getItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY);
}


/***/ }),

/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "celsiusToFarenheit": () => (/* binding */ celsiusToFarenheit),
/* harmony export */   "farenheitToCelsius": () => (/* binding */ farenheitToCelsius)
/* harmony export */ });
function celsiusToFarenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

function farenheitToCelsius(farenheit) {
    return ((farenheit - 32) * 5) / 9;
}


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stateFactory)
/* harmony export */ });
function stateFactory() {
    const app = document.querySelector('#app');

    let currentLocation = null;
    let currentTemp = null;
    let unitPref = 'celsius';

    app.dataset.currentLocation = currentLocation;
    app.dataset.currentTemp = currentTemp;
    app.dataset.unitPref = unitPref;

    function getCurrentLocation() {
        return currentLocation;
    }

    function setCurrentLocation(location) {
        currentLocation = location;
        app.dataset.currentLocation = location;
    }

    function getCurrentTemp() {
        return currentTemp;
    }

    function setCurrentTemp(temp) {
        currentTemp = Number(temp);
        app.dataset.currentTemp = temp;
    }

    function getUnitPref() {
        return unitPref;
    }

    function setUnitPref(unit) {
        if (unit !== 'celsius' && unit !== 'farenheit') return;
        unitPref = unit;
        app.dataset.unitPref = unit;
    }

    function toggleUnitPref() {
        const unit = unitPref === 'celsius' ? 'farenheit' : 'celsius';
        setUnitPref(unit);
    }

    // testing
    function logState() {
        console.log(app.dataset);
    }

    return {
        getCurrentLocation,
        setCurrentLocation,
        getCurrentTemp,
        setCurrentTemp,
        getUnitPref,
        setUnitPref,
        toggleUnitPref,
        logState,
    };
}


/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ weatherApiFactory)
/* harmony export */ });
function weatherApiFactory() {
    const apiKey = 'b8270fddcb839619be5cc1af3cebd7eb';
    const currentApiBase = 'https://api.openweathermap.org/data/2.5/weather';
    const forcastApiBase = 'https://api.openweathermap.org/data/2.5/onecall';

    async function getCurrentData({ location, units }) {
        const apiUrl = `${currentApiBase}?q=${location}&appid=${apiKey}&units=${units}`;

        try {
            const response = await fetch(apiUrl, { mode: 'cors' });
            return response.json();
        } catch (error) {
            return false;
        }
    }

    async function getForecastData({ latitude, longitude, exclude, units }) {
        const apiUrl = `${forcastApiBase}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}&units=${units}`;

        try {
            const response = await fetch(apiUrl, { mode: 'cors' });
            return response.json();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return {
        getCurrentData,
        getForecastData,
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/weather.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local-storage */ "./src/local-storage.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math */ "./src/math.js");
/* eslint-disable consistent-return */










const state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.default)();

const weatherApi = (0,_weather__WEBPACK_IMPORTED_MODULE_0__.default)();

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
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)(error.message, 'error');
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
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)(error.message, 'error');
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
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showDisplay)();
    }

    state.setCurrentLocation(currentData.location);
    state.setCurrentTemp(currentData.temp);

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.hideBanner)();

    if (msg) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)(msg, 'success');
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.updateDisplay)(currentData, forecastData);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.unFocusInput)();
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
    const unitPref = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.getUnitPreference)();

    if (unitPref == null) return;

    const currentUnit = state.getUnitPref();

    if (unitPref !== currentUnit) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleUnitBtn)();
        state.toggleUnitPref();
    }
}

function loadHomeLocation() {
    const homeLocation = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.getHomeLocation)();

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

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleSearchSpinner)();

    const location = (0,_dom__WEBPACK_IMPORTED_MODULE_3__.getSearchInput)();

    loadWeather(location, _dom__WEBPACK_IMPORTED_MODULE_3__.toggleSearchSpinner);
}

function handleHomeButtonClick() {
    const homeLocation = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.getHomeLocation)();

    if (homeLocation == null) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)('No Home Location Set', 'error');
        return;
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleHomeLocationSpinner)();

    loadWeather(
        homeLocation,
        _dom__WEBPACK_IMPORTED_MODULE_3__.toggleHomeLocationSpinner,
        'Home Location Loaded'
    );
}

function handleUnitBtnClick() {
    if (state.getCurrentLocation()) {
        const convertTemp =
            state.getUnitPref() === 'celsius'
                ? _math__WEBPACK_IMPORTED_MODULE_4__.celsiusToFarenheit
                : _math__WEBPACK_IMPORTED_MODULE_4__.farenheitToCelsius;
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.convertTemps)(convertTemp);
    }
    state.toggleUnitPref();
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleUnitBtn)();
    (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.setUnitPreference)(state.getUnitPref());
}

function handleSaveLocation() {
    if (!state.getCurrentLocation()) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)('No Current Location To Save', 'error');
        return;
    }

    (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.setHomeLocation)(state.getCurrentLocation());

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)('Home Location Saved', 'success');
}

function handleRefreshBtnClick() {
    if (!state.getCurrentLocation()) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)('No Current Location To Refresh', 'error');
        return;
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleRefreshSpinner)();

    loadWeather(
        state.getCurrentLocation(),
        _dom__WEBPACK_IMPORTED_MODULE_3__.toggleRefreshSpinner,
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

})();

/******/ })()
;
//# sourceMappingURL=main.js.map