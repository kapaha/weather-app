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
/* harmony export */   "handleRefreshBtnClick": () => (/* binding */ handleRefreshBtnClick),
/* harmony export */   "handleUnitBtnClick": () => (/* binding */ handleUnitBtnClick),
/* harmony export */   "handleSaveLocation": () => (/* binding */ handleSaveLocation)
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

async function handleRefreshBtnClick() {
    if (!_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation()) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showBanner)('No Current Location To Refresh', 'error');
        return;
    }

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleRefreshSpinner)();

    await (0,_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(_state__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentLocation(), 'Current Location Refreshed');

    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.toggleRefreshSpinner)();
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
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
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
            iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3V0aWxzL2NvbnZlcnRUZW1wLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy91dGlscy91bml4VG9EYXRlLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy93ZWF0aGVyL3dlYXRoZXJBcGkuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FB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QUVBO0FBQ0EseUJBQXlCLHlEQUFlOztBQUV4Qzs7QUFFQSxJQUFJLGtFQUFXO0FBQ2YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSnNvbihhcGlVcmwpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaVVybCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbi8vIGRlZmluZSBlbGVtZW50c1xuY29uc3QgYmFubmVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJhcl9fYmFubmVyJyk7XG5jb25zdCBsb2NhdGlvbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX2xvY2F0aW9uJyk7XG5jb25zdCBkZXNjcmlwdGlvbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX2Rlc2NyaXB0aW9uJyk7XG5jb25zdCBpY29uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19faWNvbicpO1xuY29uc3QgdGVtcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX3RlbXAtdmFsdWUnKTtcbmNvbnN0IHRlbXBEZWdyZWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzX190ZW1wLWRlZ3JlZScpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcl9faW5wdXQnKTtcbmNvbnN0IHNlYXJjaFNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXNwaW5uZXInKTtcbmNvbnN0IGhvbWVMb2NhdGlvblNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZS1sb2NhdGlvbi1zcGlubmVyJyk7XG5jb25zdCByZWZyZXNoU3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoLXNwaW5uZXInKTtcbmNvbnN0IHJlc3VsdHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtc2VjdGlvbicpO1xuY29uc3QgZm9yZWNhc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LXNlY3Rpb24nKTtcbmNvbnN0IHRlbXBFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZW1wXScpO1xuXG4vLyBlcnJvciBoYW5kbGluZ1xuY29uc3QgZW5kQW5kU3RhcnRCYW5uZXJUaW1lciA9ICgoKSA9PiB7XG4gICAgbGV0IHRpbWVyOyAvLyB2YXJpYWJsZSBwZXJzaXN0ZWQgaGVyZVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhpZGVCYW5uZXIoKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93QmFubmVyKG1zZywgdHlwZSA9ICdlcnJvcicpIHtcbiAgICBiYW5uZXJFbC50ZXh0Q29udGVudCA9IG1zZztcblxuICAgIGJhbm5lckVsLmNsYXNzTGlzdC5hZGQoJ2Jhbm5lci0tYWN0aXZlJyk7XG5cbiAgICBiYW5uZXJFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICB0eXBlID09PSAnZXJyb3InID8gJ3ZhcigtLWNvbG9yLXJlZCknIDogJ3ZhcigtLWNvbG9yLWdyZWVuKSc7XG5cbiAgICBlbmRBbmRTdGFydEJhbm5lclRpbWVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlQmFubmVyKCkge1xuICAgIGJhbm5lckVsLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBiYW5uZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdiYW5uZXItLWFjdGl2ZScpO1xufVxuXG4vLyBkaXNwbGF5IHVwZGF0ZXJzXG5mdW5jdGlvbiB0b2dnbGVTcGlubmVyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktYmxvY2snKTtcbiAgICBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihzZWFyY2hTcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihob21lTG9jYXRpb25TcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVJlZnJlc2hTcGlubmVyKCkge1xuICAgIHRvZ2dsZVNwaW5uZXIocmVmcmVzaFNwaW5uZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlVW5pdEJ0bigpIHtcbiAgICBjb25zdCBhY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3RpdmUtdW5pdF0nKTtcbiAgICBjb25zdCBub3RBY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ub3QtYWN0aXZlLXVuaXRdJyk7XG5cbiAgICBhY3RpdmVVbml0RWwuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X191bml0LWFjdGl2ZScpO1xuICAgIGFjdGl2ZVVuaXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLXVuaXQnKTtcbiAgICBhY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLW5vdC1hY3RpdmUtdW5pdCcsICcnKTtcblxuICAgIG5vdEFjdGl2ZVVuaXRFbC5jbGFzc0xpc3QuYWRkKCduYXZfX3VuaXQtYWN0aXZlJyk7XG4gICAgbm90QWN0aXZlVW5pdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1ub3QtYWN0aXZlLXVuaXQnKTtcbiAgICBub3RBY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZS11bml0JywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Rpc3BsYXkoKSB7XG4gICAgcmVzdWx0c1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIHJlc3VsdHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktZmxleCcpO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWdyaWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoZGF0YSwgZGF0YTIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBpY29uVXJsLCBsb2NhdGlvbiwgdGVtcCB9ID0gZGF0YTtcblxuICAgIGRhdGEyLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JlY2FzdF9fcmVzdWx0LSR7aW5kZXh9YCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZUVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX2RhdGVgKTtcbiAgICAgICAgZGF0ZUVsLnRleHRDb250ZW50ID0gZGF5LmRhdGVTaG9ydDtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdEljb25FbCA9IGZvcmVjYXN0RWwucXVlcnlTZWxlY3RvcihgLmZvcmVjYXN0X19pY29uYCk7XG4gICAgICAgIGZvcmVjYXN0SWNvbkVsLnNyYyA9IGRheS5pY29uVXJsO1xuICAgICAgICBmb3JlY2FzdEljb25FbC5hbHQgPSBkYXkuZGVzY3JpcHRpb247XG5cbiAgICAgICAgY29uc3QgZGF5VGVtcEVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX2RheS10ZW1wYCk7XG4gICAgICAgIGRheVRlbXBFbC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5LmRheVRlbXApfWA7XG4gICAgICAgIGRheVRlbXBFbC5kYXRhc2V0LnRlbXAgPSBkYXkuZGF5VGVtcDtcblxuICAgICAgICBjb25zdCBuaWdodFRlbXBFbCA9IGZvcmVjYXN0RWwucXVlcnlTZWxlY3RvcihgLmZvcmVjYXN0X19uaWdodC10ZW1wYCk7XG4gICAgICAgIG5pZ2h0VGVtcEVsLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkubmlnaHRUZW1wKX1gO1xuICAgICAgICBuaWdodFRlbXBFbC5kYXRhc2V0LnRlbXAgPSBkYXkubmlnaHRUZW1wO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpcHRpb25FbC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICAgIGljb25FbC5zcmMgPSBpY29uVXJsO1xuICAgIGljb25FbC5hbHQgPSBkZXNjcmlwdGlvbjtcbiAgICBsb2NhdGlvbkVsLnRleHRDb250ZW50ID0gbG9jYXRpb247XG4gICAgdGVtcEVsLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZCh0ZW1wKTtcbiAgICB0ZW1wRWwuZGF0YXNldC50ZW1wID0gdGVtcDtcbiAgICB0ZW1wRGVncmVlRWwudGV4dENvbnRlbnQgPSAnwrAnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRlbXBzKGNvbnZlcnRUZW1wKSB7XG4gICAgdGVtcEVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdUZW1wID0gY29udmVydFRlbXAoZWwuZGF0YXNldC50ZW1wKTtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKG5ld1RlbXApO1xuICAgICAgICBlbC5kYXRhc2V0LnRlbXAgPSBuZXdUZW1wO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5Gb2N1c0lucHV0KCkge1xuICAgIGlucHV0LmJsdXIoKTtcbn1cblxuLy8gZnVuY3Rpb25zIHRvIGdldCB2YWx1ZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWFyY2hJbnB1dCgpIHtcbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG59XG4iLCJpbXBvcnQge1xuICAgIGNvbnZlcnRUZW1wcyxcbiAgICBnZXRTZWFyY2hJbnB1dCxcbiAgICBzaG93QmFubmVyLFxuICAgIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIsXG4gICAgdG9nZ2xlUmVmcmVzaFNwaW5uZXIsXG4gICAgdG9nZ2xlU2VhcmNoU3Bpbm5lcixcbiAgICB0b2dnbGVVbml0QnRuLFxufSBmcm9tICcuL2RvbSc7XG5cbmltcG9ydCBzdGF0ZSBmcm9tICcuL3N0YXRlJztcblxuaW1wb3J0IHtcbiAgICBnZXRIb21lTG9jYXRpb24sXG4gICAgc2F2ZUhvbWVMb2NhdGlvbixcbiAgICBzYXZlVW5pdFByZWZlcmVuY2UsXG59IGZyb20gJy4vc3RvcmFnZSc7XG5cbmltcG9ydCB7IGNlbHNpdXNUb0ZhcmVuaGVpdCwgZmFyZW5oZWl0VG9DZWxzaXVzIH0gZnJvbSAnLi91dGlscy9jb252ZXJ0VGVtcCc7XG5pbXBvcnQgbG9hZFdlYXRoZXIgZnJvbSAnLi93ZWF0aGVyL3dlYXRoZXJGdW5jdGlvbnMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlV2VhdGhlclNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0b2dnbGVTZWFyY2hTcGlubmVyKCk7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGdldFNlYXJjaElucHV0KCk7XG5cbiAgICBhd2FpdCBsb2FkV2VhdGhlcihsb2NhdGlvbik7XG5cbiAgICB0b2dnbGVTZWFyY2hTcGlubmVyKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVIb21lQnV0dG9uQ2xpY2soKSB7XG4gICAgY29uc3QgaG9tZUxvY2F0aW9uID0gZ2V0SG9tZUxvY2F0aW9uKCk7XG5cbiAgICBpZiAoaG9tZUxvY2F0aW9uID09IG51bGwpIHtcbiAgICAgICAgc2hvd0Jhbm5lcignTm8gSG9tZSBMb2NhdGlvbiBTZXQnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKTtcblxuICAgIGF3YWl0IGxvYWRXZWF0aGVyKGhvbWVMb2NhdGlvbiwgJ0hvbWUgTG9jYXRpb24gTG9hZGVkJyk7XG5cbiAgICB0b2dnbGVIb21lTG9jYXRpb25TcGlubmVyKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVSZWZyZXNoQnRuQ2xpY2soKSB7XG4gICAgaWYgKCFzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSkge1xuICAgICAgICBzaG93QmFubmVyKCdObyBDdXJyZW50IExvY2F0aW9uIFRvIFJlZnJlc2gnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZVJlZnJlc2hTcGlubmVyKCk7XG5cbiAgICBhd2FpdCBsb2FkV2VhdGhlcihzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSwgJ0N1cnJlbnQgTG9jYXRpb24gUmVmcmVzaGVkJyk7XG5cbiAgICB0b2dnbGVSZWZyZXNoU3Bpbm5lcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlVW5pdEJ0bkNsaWNrKCkge1xuICAgIGlmIChzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSkge1xuICAgICAgICBjb25zdCBjb252ZXJ0VGVtcEZuID1cbiAgICAgICAgICAgIHN0YXRlLmdldFVuaXRQcmVmKCkgPT09ICdjZWxzaXVzJ1xuICAgICAgICAgICAgICAgID8gY2Vsc2l1c1RvRmFyZW5oZWl0XG4gICAgICAgICAgICAgICAgOiBmYXJlbmhlaXRUb0NlbHNpdXM7XG4gICAgICAgIGNvbnZlcnRUZW1wcyhjb252ZXJ0VGVtcEZuKTtcbiAgICB9XG4gICAgc3RhdGUudG9nZ2xlVW5pdFByZWYoKTtcbiAgICB0b2dnbGVVbml0QnRuKCk7XG4gICAgc2F2ZVVuaXRQcmVmZXJlbmNlKHN0YXRlLmdldFVuaXRQcmVmKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2F2ZUxvY2F0aW9uKCkge1xuICAgIGlmICghc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkpIHtcbiAgICAgICAgc2hvd0Jhbm5lcignTm8gQ3VycmVudCBMb2NhdGlvbiBUbyBTYXZlJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzYXZlSG9tZUxvY2F0aW9uKHN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKTtcblxuICAgIHNob3dCYW5uZXIoJ0hvbWUgTG9jYXRpb24gU2F2ZWQnLCAnc3VjY2VzcycpO1xufVxuIiwiY29uc3QgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpO1xuXG5sZXQgY3VycmVudExvY2F0aW9uID0gbnVsbDtcbmxldCB1bml0UHJlZiA9ICdjZWxzaXVzJztcblxuZnVuY3Rpb24gaW5pdEFwcERhdGFzZXRzKCkge1xuICAgIGFwcC5kYXRhc2V0LmN1cnJlbnRMb2NhdGlvbiA9IG51bGw7XG4gICAgYXBwLmRhdGFzZXQudW5pdFByZWYgPSAnY2Vsc2l1cyc7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gY3VycmVudExvY2F0aW9uO1xufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICBjdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICBhcHAuZGF0YXNldC5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbn1cblxuZnVuY3Rpb24gZ2V0VW5pdFByZWYoKSB7XG4gICAgcmV0dXJuIHVuaXRQcmVmO1xufVxuXG5mdW5jdGlvbiBzZXRVbml0UHJlZih1bml0KSB7XG4gICAgaWYgKHVuaXQgIT09ICdjZWxzaXVzJyAmJiB1bml0ICE9PSAnZmFyZW5oZWl0JykgcmV0dXJuO1xuICAgIHVuaXRQcmVmID0gdW5pdDtcbiAgICBhcHAuZGF0YXNldC51bml0UHJlZiA9IHVuaXQ7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVVuaXRQcmVmKCkge1xuICAgIGNvbnN0IHVuaXQgPSB1bml0UHJlZiA9PT0gJ2NlbHNpdXMnID8gJ2ZhcmVuaGVpdCcgOiAnY2Vsc2l1cyc7XG4gICAgc2V0VW5pdFByZWYodW5pdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xuICAgIGluaXRBcHBEYXRhc2V0cyxcbiAgICBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgc2V0Q3VycmVudExvY2F0aW9uLFxuICAgIGdldFVuaXRQcmVmLFxuICAgIHNldFVuaXRQcmVmLFxuICAgIHRvZ2dsZVVuaXRQcmVmLFxufSk7XG4iLCJjb25zdCBMT0NBTF9TVE9SQUdFX0hPTUVfTE9DQVRJT05fS0VZID0gJ3dlYXRoZXJBcHAuaG9tZUxvY2F0aW9uJztcbmNvbnN0IExPQ0FMX1NUT1JBR0VfVU5JVF9QUkVGRVJFTkNFX0tFWSA9ICd3ZWF0aGVyQXBwLnVuaXRQcmVmZXJlbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVIb21lTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0hPTUVfTE9DQVRJT05fS0VZLCBsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb21lTG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfSE9NRV9MT0NBVElPTl9LRVkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVVuaXRQcmVmZXJlbmNlKHVuaXQpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1VOSVRfUFJFRkVSRU5DRV9LRVksIHVuaXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5pdFByZWZlcmVuY2UoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfVU5JVF9QUkVGRVJFTkNFX0tFWSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvRmFyZW5oZWl0KGNlbHNpdXMpIHtcbiAgICByZXR1cm4gKGNlbHNpdXMgKiA5KSAvIDUgKyAzMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhcmVuaGVpdFRvQ2Vsc2l1cyhmYXJlbmhlaXQpIHtcbiAgICByZXR1cm4gKChmYXJlbmhlaXQgLSAzMikgKiA1KSAvIDk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bml4VG9EYXRlKHVuaXhUaW1lU3RhbXApIHtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSB1bml4VGltZVN0YW1wICogMTAwMDtcblxuICAgIGNvbnN0IGRhdGVPYmplY3QgPSBuZXcgRGF0ZShtaWxsaXNlY29uZHMpO1xuXG4gICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAnSmFuJyxcbiAgICAgICAgJ0ZlYicsXG4gICAgICAgICdNYXInLFxuICAgICAgICAnQXByJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW4nLFxuICAgICAgICAnSnVsJyxcbiAgICAgICAgJ0F1ZycsXG4gICAgICAgICdTZXAnLFxuICAgICAgICAnT2N0JyxcbiAgICAgICAgJ05vdicsXG4gICAgICAgICdEZWMnLFxuICAgIF07XG5cbiAgICBjb25zdCBkYXlzID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcblxuICAgIGNvbnN0IGRheSA9IGRheXNbZGF0ZU9iamVjdC5nZXREYXkoKV07XG4gICAgbGV0IGRhdGUgPSBgJHtkYXRlT2JqZWN0LmdldERhdGUoKX1gO1xuICAgIGlmIChkYXRlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkYXRlID0gYDAke2RhdGV9YDtcbiAgICB9XG4gICAgY29uc3QgbW9udGggPSBtb250aHNbZGF0ZU9iamVjdC5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZU9iamVjdC5nZXRGdWxsWWVhcigpO1xuXG4gICAgY29uc3QgaG91ciA9IGRhdGVPYmplY3QuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW4gPSBkYXRlT2JqZWN0LmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWMgPSBkYXRlT2JqZWN0LmdldFNlY29uZHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRheSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbW9udGgsXG4gICAgICAgIHllYXIsXG4gICAgICAgIGhvdXIsXG4gICAgICAgIG1pbixcbiAgICAgICAgc2VjLFxuICAgIH07XG59XG4iLCJpbXBvcnQgZmV0Y2hKc29uIGZyb20gJy4uL2FqYXgnO1xuXG5jb25zdCBhcGlLZXkgPSAnYjgyNzBmZGRjYjgzOTYxOWJlNWNjMWFmM2NlYmQ3ZWInO1xuY29uc3QgY3VycmVudEFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXInO1xuY29uc3QgZm9yZWNhc3RBcGlCYXNlID0gJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsJztcblxuZnVuY3Rpb24gY3JlYXRlQ3VycmVudFdlYXRoZXJBcGlVcmwoeyBsb2NhdGlvbiwgdW5pdHMgfSkge1xuICAgIHJldHVybiBgJHtjdXJyZW50QXBpQmFzZX0/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke2FwaUtleX0mdW5pdHM9JHt1bml0c31gO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JlY2FzdFdlYXRoZXJBcGlVcmwoeyBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBleGNsdWRlLCB1bml0cyB9KSB7XG4gICAgcmV0dXJuIGAke2ZvcmVjYXN0QXBpQmFzZX0/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mZXhjbHVkZT0ke2V4Y2x1ZGV9JmFwcGlkPSR7YXBpS2V5fSZ1bml0cz0ke3VuaXRzfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50V2VhdGhlcihxdWVyeSkge1xuICAgIGNvbnN0IGFwaVVybCA9IGNyZWF0ZUN1cnJlbnRXZWF0aGVyQXBpVXJsKHF1ZXJ5KTtcbiAgICByZXR1cm4gZmV0Y2hKc29uKGFwaVVybCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdFdlYXRoZXIocXVlcnkpIHtcbiAgICBjb25zdCBhcGlVcmwgPSBjcmVhdGVGb3JlY2FzdFdlYXRoZXJBcGlVcmwocXVlcnkpO1xuICAgIHJldHVybiBmZXRjaEpzb24oYXBpVXJsKTtcbn1cbiIsImltcG9ydCB1bml4VG9EYXRlIGZyb20gJy4uL3V0aWxzL3VuaXhUb0RhdGUnO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFdlYXRoZXIsIGdldEZvcmVjYXN0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlckFwaSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgICBzaG93QmFubmVyLFxuICAgIHNob3dEaXNwbGF5LFxuICAgIGhpZGVCYW5uZXIsXG4gICAgdW5Gb2N1c0lucHV0LFxuICAgIHVwZGF0ZURpc3BsYXksXG59IGZyb20gJy4uL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGxvYWRXZWF0aGVyKGxvY2F0aW9uLCBtc2cpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pO1xuXG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgICBoaWRlQmFubmVyKCk7XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkgPT0gbnVsbCkge1xuICAgICAgICBzaG93RGlzcGxheSgpO1xuICAgIH1cblxuICAgIHN0YXRlLnNldEN1cnJlbnRMb2NhdGlvbihkYXRhLmN1cnJlbnREYXRhLmxvY2F0aW9uKTtcblxuICAgIHVwZGF0ZURpc3BsYXkoZGF0YS5jdXJyZW50RGF0YSwgZGF0YS5mb3JlY2FzdERhdGEpO1xuICAgIHVuRm9jdXNJbnB1dCgpO1xuXG4gICAgaWYgKG1zZykge1xuICAgICAgICBzaG93QmFubmVyKG1zZywgJ3N1Y2Nlc3MnKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgY29uc3QgY3VycmVudFF1ZXJ5ID0gY3JlYXRlQ3VycmVudFdlYXRoZXJRdWVyeShsb2NhdGlvbik7XG5cbiAgICBsZXQgY3VycmVudERhdGEgPSBhd2FpdCBlcnJvckhhbmRsZXIoZ2V0Q3VycmVudFdlYXRoZXIsIGN1cnJlbnRRdWVyeSk7XG5cbiAgICBpZiAoIWN1cnJlbnREYXRhKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjdXJyZW50RGF0YSA9IHByb2Nlc3NDdXJyZW50V2VhdGhlcihjdXJyZW50RGF0YSk7XG5cbiAgICBjb25zdCBmb3JlY2FzdFF1ZXJ5ID0gY3JlYXRlRm9yZWNhc3RXZWF0aGVyUXVlcnkoY3VycmVudERhdGEpO1xuICAgIGxldCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdFdlYXRoZXIoZm9yZWNhc3RRdWVyeSk7XG5cbiAgICBpZiAoIWZvcmVjYXN0RGF0YSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yZWNhc3REYXRhID0gcHJvY2Vzc0ZvcmVjYXN0V2VhdGhlcihmb3JlY2FzdERhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudERhdGEsXG4gICAgICAgIGZvcmVjYXN0RGF0YSxcbiAgICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBlcnJvckhhbmRsZXIoYXBpRnVuY3Rpb24sIHF1ZXJ5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGFwaUZ1bmN0aW9uKHF1ZXJ5KTtcblxuICAgICAgICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEubWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzaG93QmFubmVyKGVycm9yLm1lc3NhZ2UsICdlcnJvcicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGxvY2F0aW9uU3RyaW5nID0gZGF0YS5zeXMuY291bnRyeVxuICAgICAgICA/IGAke2RhdGEubmFtZX0sICR7ZGF0YS5zeXMuY291bnRyeX1gXG4gICAgICAgIDogYCR7ZGF0YS5uYW1lfWA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICBpY29uVXJsOiBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2AsXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblN0cmluZyxcbiAgICAgICAgdGVtcDogZGF0YS5tYWluLnRlbXAsXG4gICAgICAgIGxhdGl0dWRlOiBkYXRhLmNvb3JkLmxhdCxcbiAgICAgICAgbG9uZ2l0dWRlOiBkYXRhLmNvb3JkLmxvbixcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRm9yZWNhc3RXZWF0aGVyKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5kYWlseS5tYXAoKGRheSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRlID0gdW5peFRvRGF0ZShkYXkuZHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0ZVNob3J0OiBgJHtkYXRlLmRheX0sICR7ZGF0ZS5tb250aH0gJHtkYXRlLmRhdGV9YCxcbiAgICAgICAgICAgIGRheVRlbXA6IGRheS50ZW1wLmRheSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXkud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGljb25Vcmw6IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkud2VhdGhlclswXS5pY29ufUAyeC5wbmdgLFxuICAgICAgICAgICAgbmlnaHRUZW1wOiBkYXkudGVtcC5uaWdodCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ3VycmVudFdlYXRoZXJRdWVyeShsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICB1bml0czogc3RhdGUuZ2V0VW5pdFByZWYoKSA9PT0gJ2NlbHNpdXMnID8gJ21ldHJpYycgOiAnaW1wZXJpYWwnLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcmVjYXN0V2VhdGhlclF1ZXJ5KHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGF0aXR1ZGUsXG4gICAgICAgIGxvbmdpdHVkZSxcbiAgICAgICAgZXhjbHVkZTogJ2FsZXJ0cyxob3VybHksbWludXRlbHksY3VycmVudCcsXG4gICAgICAgIHVuaXRzOiBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cycgPyAnbWV0cmljJyA6ICdpbXBlcmlhbCcsXG4gICAgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5pbXBvcnQgeyBnZXRIb21lTG9jYXRpb24sIGdldFVuaXRQcmVmZXJlbmNlIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuaW1wb3J0IHtcbiAgICBoYW5kbGVIb21lQnV0dG9uQ2xpY2ssXG4gICAgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrLFxuICAgIGhhbmRsZVNhdmVMb2NhdGlvbixcbiAgICBoYW5kbGVVbml0QnRuQ2xpY2ssXG4gICAgaGFuZGxlV2VhdGhlclNlYXJjaCxcbn0gZnJvbSAnLi9ldmVudExpc3RlbmVycyc7XG5cbmltcG9ydCB7IHRvZ2dsZVVuaXRCdG4gfSBmcm9tICcuL2RvbSc7XG5cbmltcG9ydCBsb2FkV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucyc7XG5cbmluaXRBcHAoKTtcblxuZnVuY3Rpb24gaW5pdEFwcCgpIHtcbiAgICBzdGF0ZS5pbml0QXBwRGF0YXNldHMoKTtcbiAgICBpbml0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBsb2FkVXNlclNldHRpbmdzKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXJfX2Zvcm0nKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZVdlYXRoZXJTZWFyY2gpO1xuXG4gICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lLWJ0bicpO1xuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIb21lQnV0dG9uQ2xpY2spO1xuXG4gICAgY29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2dnbGUtdW5pdC1idG4nKTtcbiAgICB1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5pdEJ0bkNsaWNrKTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZS1idG4nKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2F2ZUxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaC1idG4nKTtcbiAgICByZWZyZXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrKTtcbn1cblxuZnVuY3Rpb24gbG9hZFVzZXJTZXR0aW5ncygpIHtcbiAgICBsb2FkVW5pdFByZWZlcmVuY2UoKTtcbiAgICBsb2FkSG9tZUxvY2F0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRVbml0UHJlZmVyZW5jZSgpIHtcbiAgICBjb25zdCB1bml0UHJlZiA9IGdldFVuaXRQcmVmZXJlbmNlKCk7XG5cbiAgICBpZiAodW5pdFByZWYgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY3VycmVudFVuaXQgPSBzdGF0ZS5nZXRVbml0UHJlZigpO1xuXG4gICAgaWYgKHVuaXRQcmVmICE9PSBjdXJyZW50VW5pdCkge1xuICAgICAgICB0b2dnbGVVbml0QnRuKCk7XG4gICAgICAgIHN0YXRlLnRvZ2dsZVVuaXRQcmVmKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkSG9tZUxvY2F0aW9uKCkge1xuICAgIGNvbnN0IGhvbWVMb2NhdGlvbiA9IGdldEhvbWVMb2NhdGlvbigpO1xuXG4gICAgaWYgKGhvbWVMb2NhdGlvbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICBsb2FkV2VhdGhlcihob21lTG9jYXRpb24pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==