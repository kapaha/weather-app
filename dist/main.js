/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ajax.js":
/*!*********************!*\
  !*** ./src/ajax.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchJson)
/* harmony export */ });
async function fetchJson(apiUrl) {
    try {
        const response = await fetch(apiUrl, { mode: 'cors' });
        return response.json();
    } catch (error) {
        return error;
    }
}


/***/ }),

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
        const forecastEl = document.querySelector(`#forecast__result-${index}`);

        const dateEl = forecastEl.querySelector(`.forecast__date`);
        dateEl.textContent = day.dateShort;

        const forecastIconEl = forecastEl.querySelector(`.forecast__icon`);
        forecastIconEl.src = day.iconUrl;
        forecastIconEl.alt = day.description;

        const dayTempEl = forecastEl.querySelector(`.forecast__day-temp`);
        dayTempEl.textContent = `${Math.round(day.dayTemp)}`;
        dayTempEl.dataset.temp = day.dayTemp;

        const nightTempEl = forecastEl.querySelector(`.forecast__night-temp`);
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

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleWeatherSearch": () => (/* binding */ handleWeatherSearch),
/* harmony export */   "handleHomeButtonClick": () => (/* binding */ handleHomeButtonClick),
/* harmony export */   "handleUnitBtnClick": () => (/* binding */ handleUnitBtnClick),
/* harmony export */   "handleSaveLocation": () => (/* binding */ handleSaveLocation),
/* harmony export */   "handleRefreshBtnClick": () => (/* binding */ handleRefreshBtnClick)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _utils_convertTemp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/convertTemp */ "./src/utils/convertTemp.js");
/* harmony import */ var _weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weather/weatherFunctions */ "./src/weather/weatherFunctions.js");









async function handleWeatherSearch(event) {
    event.preventDefault();

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleSearchSpinner)();

    const location = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getSearchInput)();

    await (0,_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(location);

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleSearchSpinner)();
}

async function handleHomeButtonClick() {
    const homeLocation = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.getHomeLocation)();

    if (homeLocation == null) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showBanner)('No Home Location Set', 'error');
        return;
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleHomeLocationSpinner)();

    await (0,_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(homeLocation, 'Home Location Loaded');

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleHomeLocationSpinner)();
}

function handleUnitBtnClick() {
    if (_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation()) {
        const convertTempFn =
            _state__WEBPACK_IMPORTED_MODULE_1__.default.getUnitPref() === 'celsius'
                ? _utils_convertTemp__WEBPACK_IMPORTED_MODULE_3__.celsiusToFarenheit
                : _utils_convertTemp__WEBPACK_IMPORTED_MODULE_3__.farenheitToCelsius;
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.convertTemps)(convertTempFn);
    }
    _state__WEBPACK_IMPORTED_MODULE_1__.default.toggleUnitPref();
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleUnitBtn)();
    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveUnitPreference)(_state__WEBPACK_IMPORTED_MODULE_1__.default.getUnitPref());
}

function handleSaveLocation() {
    if (!_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation()) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showBanner)('No Current Location To Save', 'error');
        return;
    }

    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveHomeLocation)(_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation());

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showBanner)('Home Location Saved', 'success');
}

function handleRefreshBtnClick() {
    if (!_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation()) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showBanner)('No Current Location To Refresh', 'error');
        return;
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleRefreshSpinner)();

    (0,_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(
        _state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation(),
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleRefreshSpinner,
        'Current Location Refreshed'
    );
}


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const app = document.querySelector('#app');

let currentLocation = null;
let unitPref = 'celsius';

function initAppDatasets() {
    app.dataset.currentLocation = null;
    app.dataset.unitPref = 'celsius';
}

function getCurrentLocation() {
    return currentLocation;
}

function setCurrentLocation(location) {
    currentLocation = location;
    app.dataset.currentLocation = location;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze({
    initAppDatasets,
    getCurrentLocation,
    setCurrentLocation,
    getUnitPref,
    setUnitPref,
    toggleUnitPref,
}));


/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "saveHomeLocation": () => (/* binding */ saveHomeLocation),
/* harmony export */   "getHomeLocation": () => (/* binding */ getHomeLocation),
/* harmony export */   "saveUnitPreference": () => (/* binding */ saveUnitPreference),
/* harmony export */   "getUnitPreference": () => (/* binding */ getUnitPreference)
/* harmony export */ });
const LOCAL_STORAGE_HOME_LOCATION_KEY = 'weatherApp.homeLocation';
const LOCAL_STORAGE_UNIT_PREFERENCE_KEY = 'weatherApp.unitPreference';

function saveHomeLocation(location) {
    localStorage.setItem(LOCAL_STORAGE_HOME_LOCATION_KEY, location);
}

function getHomeLocation() {
    return localStorage.getItem(LOCAL_STORAGE_HOME_LOCATION_KEY);
}

function saveUnitPreference(unit) {
    localStorage.setItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY, unit);
}

function getUnitPreference() {
    return localStorage.getItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY);
}


/***/ }),

/***/ "./src/utils/convertTemp.js":
/*!**********************************!*\
  !*** ./src/utils/convertTemp.js ***!
  \**********************************/
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

/***/ "./src/utils/unixToDate.js":
/*!*********************************!*\
  !*** ./src/utils/unixToDate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unixToDate)
/* harmony export */ });
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


/***/ }),

/***/ "./src/weather/weatherApi.js":
/*!***********************************!*\
  !*** ./src/weather/weatherApi.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentWeather": () => (/* binding */ getCurrentWeather),
/* harmony export */   "getForecastWeather": () => (/* binding */ getForecastWeather)
/* harmony export */ });
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ajax */ "./src/ajax.js");


const apiKey = 'b8270fddcb839619be5cc1af3cebd7eb';
const currentApiBase = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiBase = 'https://api.openweathermap.org/data/2.5/onecall';

function createCurrentWeatherApiUrl({ location, units }) {
    return `${currentApiBase}?q=${location}&appid=${apiKey}&units=${units}`;
}

function createForecastWeatherApiUrl({ latitude, longitude, exclude, units }) {
    return `${forecastApiBase}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}&units=${units}`;
}

async function getCurrentWeather(query) {
    const apiUrl = createCurrentWeatherApiUrl(query);
    return (0,_ajax__WEBPACK_IMPORTED_MODULE_0__.default)(apiUrl);
}

async function getForecastWeather(query) {
    const apiUrl = createForecastWeatherApiUrl(query);
    return (0,_ajax__WEBPACK_IMPORTED_MODULE_0__.default)(apiUrl);
}


/***/ }),

/***/ "./src/weather/weatherFunctions.js":
/*!*****************************************!*\
  !*** ./src/weather/weatherFunctions.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadWeather)
/* harmony export */ });
/* harmony import */ var _utils_unixToDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/unixToDate */ "./src/utils/unixToDate.js");
/* harmony import */ var _weatherApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherApi */ "./src/weather/weatherApi.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./src/state.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom */ "./src/dom.js");





async function loadWeather(location, msg) {
    const data = await getWeatherData(location);

    if (!data) return;

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.hideBanner)();

    if (_state__WEBPACK_IMPORTED_MODULE_2__.default.getCurrentLocation() == null) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showDisplay)();
    }

    _state__WEBPACK_IMPORTED_MODULE_2__.default.setCurrentLocation(data.currentData.location);

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.updateDisplay)(data.currentData, data.forecastData);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.unFocusInput)();

    if (msg) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)(msg, 'success');
    }
}

async function getWeatherData(location) {
    const currentQuery = createCurrentWeatherQuery(location);

    let currentData = await errorHandler(_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather, currentQuery);

    if (!currentData) return false;

    currentData = processCurrentWeather(currentData);

    const forecastQuery = createForecastWeatherQuery(currentData);
    let forecastData = await (0,_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getForecastWeather)(forecastQuery);

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
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showBanner)(error.message, 'error');
        return false;
    }
}

function processCurrentWeather(data) {
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

function processForecastWeather(data) {
    return data.daily.map((day) => {
        const date = (0,_utils_unixToDate__WEBPACK_IMPORTED_MODULE_0__.default)(day.dt);
        return {
            dateShort: `${date.day}, ${date.month} ${date.date}`,
            dayTemp: day.temp.day,
            description: day.weather[0].description,
            iconUrl: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            nightTemp: day.temp.night,
        };
    });
}

function createCurrentWeatherQuery(location) {
    return {
        location,
        units: _state__WEBPACK_IMPORTED_MODULE_2__.default.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
    };
}

function createForecastWeatherQuery({ latitude, longitude }) {
    return {
        latitude,
        longitude,
        exclude: 'alerts,hourly,minutely,current',
        units: _state__WEBPACK_IMPORTED_MODULE_2__.default.getUnitPref() === 'celsius' ? 'metric' : 'imperial',
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
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weather/weatherFunctions */ "./src/weather/weatherFunctions.js");










initApp();

function initApp() {
    _state__WEBPACK_IMPORTED_MODULE_0__.default.initAppDatasets();
    initEventListeners();
    loadUserSettings();
}

function initEventListeners() {
    const form = document.querySelector('#search-bar__form');
    form.addEventListener('submit', _eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleWeatherSearch);

    const homeButton = document.querySelector('#home-btn');
    homeButton.addEventListener('click', _eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleHomeButtonClick);

    const unitBtn = document.querySelector('#toggle-unit-btn');
    unitBtn.addEventListener('click', _eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleUnitBtnClick);

    const saveButton = document.querySelector('#save-btn');
    saveButton.addEventListener('click', _eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleSaveLocation);

    const refreshButton = document.querySelector('#refresh-btn');
    refreshButton.addEventListener('click', _eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleRefreshBtnClick);
}

function loadUserSettings() {
    loadUnitPreference();
    loadHomeLocation();
}

function loadUnitPreference() {
    const unitPref = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getUnitPreference)();

    if (unitPref == null) return;

    const currentUnit = _state__WEBPACK_IMPORTED_MODULE_0__.default.getUnitPref();

    if (unitPref !== currentUnit) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.toggleUnitBtn)();
        _state__WEBPACK_IMPORTED_MODULE_0__.default.toggleUnitPref();
    }
}

function loadHomeLocation() {
    const homeLocation = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getHomeLocation)();

    if (homeLocation == null) return;

    (0,_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(homeLocation);
}

})();

/******/ })()
;
//# sourceMappingURL=main.js.map