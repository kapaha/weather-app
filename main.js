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

        const forecastDescriptionEl = forecastEl.querySelector(
            '.forecast__description'
        );
        forecastDescriptionEl.textContent = day.description;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3V0aWxzL2NvbnZlcnRUZW1wLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy91dGlscy91bml4VG9EYXRlLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy93ZWF0aGVyL3dlYXRoZXJBcGkuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FB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LDBEQUFvQjtBQUM1QjtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHlEQUFlOztBQUV4Qzs7QUFFQSxJQUFJLGtFQUFXO0FBQ2YiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSnNvbihhcGlVcmwpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaVVybCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbi8vIGRlZmluZSBlbGVtZW50c1xuY29uc3QgYmFubmVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJhcl9fYmFubmVyJyk7XG5jb25zdCBsb2NhdGlvbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX2xvY2F0aW9uJyk7XG5jb25zdCBkZXNjcmlwdGlvbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX2Rlc2NyaXB0aW9uJyk7XG5jb25zdCBpY29uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19faWNvbicpO1xuY29uc3QgdGVtcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHNfX3RlbXAtdmFsdWUnKTtcbmNvbnN0IHRlbXBEZWdyZWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzX190ZW1wLWRlZ3JlZScpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcl9faW5wdXQnKTtcbmNvbnN0IHNlYXJjaFNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXNwaW5uZXInKTtcbmNvbnN0IGhvbWVMb2NhdGlvblNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZS1sb2NhdGlvbi1zcGlubmVyJyk7XG5jb25zdCByZWZyZXNoU3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoLXNwaW5uZXInKTtcbmNvbnN0IHJlc3VsdHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtc2VjdGlvbicpO1xuY29uc3QgZm9yZWNhc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LXNlY3Rpb24nKTtcbmNvbnN0IHRlbXBFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZW1wXScpO1xuXG4vLyBlcnJvciBoYW5kbGluZ1xuY29uc3QgZW5kQW5kU3RhcnRCYW5uZXJUaW1lciA9ICgoKSA9PiB7XG4gICAgbGV0IHRpbWVyOyAvLyB2YXJpYWJsZSBwZXJzaXN0ZWQgaGVyZVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhpZGVCYW5uZXIoKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93QmFubmVyKG1zZywgdHlwZSA9ICdlcnJvcicpIHtcbiAgICBiYW5uZXJFbC50ZXh0Q29udGVudCA9IG1zZztcblxuICAgIGJhbm5lckVsLmNsYXNzTGlzdC5hZGQoJ2Jhbm5lci0tYWN0aXZlJyk7XG5cbiAgICBiYW5uZXJFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICB0eXBlID09PSAnZXJyb3InID8gJ3ZhcigtLWNvbG9yLXJlZCknIDogJ3ZhcigtLWNvbG9yLWdyZWVuKSc7XG5cbiAgICBlbmRBbmRTdGFydEJhbm5lclRpbWVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlQmFubmVyKCkge1xuICAgIGJhbm5lckVsLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBiYW5uZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdiYW5uZXItLWFjdGl2ZScpO1xufVxuXG4vLyBkaXNwbGF5IHVwZGF0ZXJzXG5mdW5jdGlvbiB0b2dnbGVTcGlubmVyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktYmxvY2snKTtcbiAgICBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihzZWFyY2hTcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihob21lTG9jYXRpb25TcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVJlZnJlc2hTcGlubmVyKCkge1xuICAgIHRvZ2dsZVNwaW5uZXIocmVmcmVzaFNwaW5uZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlVW5pdEJ0bigpIHtcbiAgICBjb25zdCBhY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3RpdmUtdW5pdF0nKTtcbiAgICBjb25zdCBub3RBY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ub3QtYWN0aXZlLXVuaXRdJyk7XG5cbiAgICBhY3RpdmVVbml0RWwuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X191bml0LWFjdGl2ZScpO1xuICAgIGFjdGl2ZVVuaXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLXVuaXQnKTtcbiAgICBhY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLW5vdC1hY3RpdmUtdW5pdCcsICcnKTtcblxuICAgIG5vdEFjdGl2ZVVuaXRFbC5jbGFzc0xpc3QuYWRkKCduYXZfX3VuaXQtYWN0aXZlJyk7XG4gICAgbm90QWN0aXZlVW5pdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1ub3QtYWN0aXZlLXVuaXQnKTtcbiAgICBub3RBY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZS11bml0JywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Rpc3BsYXkoKSB7XG4gICAgcmVzdWx0c1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIHJlc3VsdHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktZmxleCcpO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWdyaWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoZGF0YSwgZGF0YTIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBpY29uVXJsLCBsb2NhdGlvbiwgdGVtcCB9ID0gZGF0YTtcblxuICAgIGRhdGEyLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JlY2FzdF9fcmVzdWx0LSR7aW5kZXh9YCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZUVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX2RhdGVgKTtcbiAgICAgICAgZGF0ZUVsLnRleHRDb250ZW50ID0gZGF5LmRhdGVTaG9ydDtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdERlc2NyaXB0aW9uRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAnLmZvcmVjYXN0X19kZXNjcmlwdGlvbidcbiAgICAgICAgKTtcbiAgICAgICAgZm9yZWNhc3REZXNjcmlwdGlvbkVsLnRleHRDb250ZW50ID0gZGF5LmRlc2NyaXB0aW9uO1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SWNvbkVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX2ljb25gKTtcbiAgICAgICAgZm9yZWNhc3RJY29uRWwuc3JjID0gZGF5Lmljb25Vcmw7XG4gICAgICAgIGZvcmVjYXN0SWNvbkVsLmFsdCA9IGRheS5kZXNjcmlwdGlvbjtcblxuICAgICAgICBjb25zdCBkYXlUZW1wRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9fZGF5LXRlbXBgKTtcbiAgICAgICAgZGF5VGVtcEVsLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkuZGF5VGVtcCl9YDtcbiAgICAgICAgZGF5VGVtcEVsLmRhdGFzZXQudGVtcCA9IGRheS5kYXlUZW1wO1xuXG4gICAgICAgIGNvbnN0IG5pZ2h0VGVtcEVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX25pZ2h0LXRlbXBgKTtcbiAgICAgICAgbmlnaHRUZW1wRWwudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS5uaWdodFRlbXApfWA7XG4gICAgICAgIG5pZ2h0VGVtcEVsLmRhdGFzZXQudGVtcCA9IGRheS5uaWdodFRlbXA7XG4gICAgfSk7XG5cbiAgICBkZXNjcmlwdGlvbkVsLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgaWNvbkVsLnNyYyA9IGljb25Vcmw7XG4gICAgaWNvbkVsLmFsdCA9IGRlc2NyaXB0aW9uO1xuICAgIGxvY2F0aW9uRWwudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICB0ZW1wRWwudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHRlbXApO1xuICAgIHRlbXBFbC5kYXRhc2V0LnRlbXAgPSB0ZW1wO1xuICAgIHRlbXBEZWdyZWVFbC50ZXh0Q29udGVudCA9ICfCsCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VGVtcHMoY29udmVydFRlbXApIHtcbiAgICB0ZW1wRWxzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1RlbXAgPSBjb252ZXJ0VGVtcChlbC5kYXRhc2V0LnRlbXApO1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQobmV3VGVtcCk7XG4gICAgICAgIGVsLmRhdGFzZXQudGVtcCA9IG5ld1RlbXA7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bkZvY3VzSW5wdXQoKSB7XG4gICAgaW5wdXQuYmx1cigpO1xufVxuXG4vLyBmdW5jdGlvbnMgdG8gZ2V0IHZhbHVlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlYXJjaElucHV0KCkge1xuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cbiIsImltcG9ydCB7XG4gICAgY29udmVydFRlbXBzLFxuICAgIGdldFNlYXJjaElucHV0LFxuICAgIHNob3dCYW5uZXIsXG4gICAgdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcixcbiAgICB0b2dnbGVSZWZyZXNoU3Bpbm5lcixcbiAgICB0b2dnbGVTZWFyY2hTcGlubmVyLFxuICAgIHRvZ2dsZVVuaXRCdG4sXG59IGZyb20gJy4vZG9tJztcblxuaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5pbXBvcnQge1xuICAgIGdldEhvbWVMb2NhdGlvbixcbiAgICBzYXZlSG9tZUxvY2F0aW9uLFxuICAgIHNhdmVVbml0UHJlZmVyZW5jZSxcbn0gZnJvbSAnLi9zdG9yYWdlJztcblxuaW1wb3J0IHsgY2Vsc2l1c1RvRmFyZW5oZWl0LCBmYXJlbmhlaXRUb0NlbHNpdXMgfSBmcm9tICcuL3V0aWxzL2NvbnZlcnRUZW1wJztcbmltcG9ydCBsb2FkV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVXZWF0aGVyU2VhcmNoKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKTtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0U2VhcmNoSW5wdXQoKTtcblxuICAgIGF3YWl0IGxvYWRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUhvbWVCdXR0b25DbGljaygpIHtcbiAgICBjb25zdCBob21lTG9jYXRpb24gPSBnZXRIb21lTG9jYXRpb24oKTtcblxuICAgIGlmIChob21lTG9jYXRpb24gPT0gbnVsbCkge1xuICAgICAgICBzaG93QmFubmVyKCdObyBIb21lIExvY2F0aW9uIFNldCcsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcigpO1xuXG4gICAgYXdhaXQgbG9hZFdlYXRoZXIoaG9tZUxvY2F0aW9uLCAnSG9tZSBMb2NhdGlvbiBMb2FkZWQnKTtcblxuICAgIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJlZnJlc2hCdG5DbGljaygpIHtcbiAgICBpZiAoIXN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKSB7XG4gICAgICAgIHNob3dCYW5uZXIoJ05vIEN1cnJlbnQgTG9jYXRpb24gVG8gUmVmcmVzaCcsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlUmVmcmVzaFNwaW5uZXIoKTtcblxuICAgIGF3YWl0IGxvYWRXZWF0aGVyKHN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpLCAnQ3VycmVudCBMb2NhdGlvbiBSZWZyZXNoZWQnKTtcblxuICAgIHRvZ2dsZVJlZnJlc2hTcGlubmVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVVbml0QnRuQ2xpY2soKSB7XG4gICAgaWYgKHN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRUZW1wRm4gPVxuICAgICAgICAgICAgc3RhdGUuZ2V0VW5pdFByZWYoKSA9PT0gJ2NlbHNpdXMnXG4gICAgICAgICAgICAgICAgPyBjZWxzaXVzVG9GYXJlbmhlaXRcbiAgICAgICAgICAgICAgICA6IGZhcmVuaGVpdFRvQ2Vsc2l1cztcbiAgICAgICAgY29udmVydFRlbXBzKGNvbnZlcnRUZW1wRm4pO1xuICAgIH1cbiAgICBzdGF0ZS50b2dnbGVVbml0UHJlZigpO1xuICAgIHRvZ2dsZVVuaXRCdG4oKTtcbiAgICBzYXZlVW5pdFByZWZlcmVuY2Uoc3RhdGUuZ2V0VW5pdFByZWYoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTYXZlTG9jYXRpb24oKSB7XG4gICAgaWYgKCFzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSkge1xuICAgICAgICBzaG93QmFubmVyKCdObyBDdXJyZW50IExvY2F0aW9uIFRvIFNhdmUnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNhdmVIb21lTG9jYXRpb24oc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkpO1xuXG4gICAgc2hvd0Jhbm5lcignSG9tZSBMb2NhdGlvbiBTYXZlZCcsICdzdWNjZXNzJyk7XG59XG4iLCJjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJyk7XG5cbmxldCBjdXJyZW50TG9jYXRpb24gPSBudWxsO1xubGV0IHVuaXRQcmVmID0gJ2NlbHNpdXMnO1xuXG5mdW5jdGlvbiBpbml0QXBwRGF0YXNldHMoKSB7XG4gICAgYXBwLmRhdGFzZXQuY3VycmVudExvY2F0aW9uID0gbnVsbDtcbiAgICBhcHAuZGF0YXNldC51bml0UHJlZiA9ICdjZWxzaXVzJztcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKCkge1xuICAgIHJldHVybiBjdXJyZW50TG9jYXRpb247XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRMb2NhdGlvbihsb2NhdGlvbikge1xuICAgIGN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIGFwcC5kYXRhc2V0LmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRVbml0UHJlZigpIHtcbiAgICByZXR1cm4gdW5pdFByZWY7XG59XG5cbmZ1bmN0aW9uIHNldFVuaXRQcmVmKHVuaXQpIHtcbiAgICBpZiAodW5pdCAhPT0gJ2NlbHNpdXMnICYmIHVuaXQgIT09ICdmYXJlbmhlaXQnKSByZXR1cm47XG4gICAgdW5pdFByZWYgPSB1bml0O1xuICAgIGFwcC5kYXRhc2V0LnVuaXRQcmVmID0gdW5pdDtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlVW5pdFByZWYoKSB7XG4gICAgY29uc3QgdW5pdCA9IHVuaXRQcmVmID09PSAnY2Vsc2l1cycgPyAnZmFyZW5oZWl0JyA6ICdjZWxzaXVzJztcbiAgICBzZXRVbml0UHJlZih1bml0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XG4gICAgaW5pdEFwcERhdGFzZXRzLFxuICAgIGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBzZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZ2V0VW5pdFByZWYsXG4gICAgc2V0VW5pdFByZWYsXG4gICAgdG9nZ2xlVW5pdFByZWYsXG59KTtcbiIsImNvbnN0IExPQ0FMX1NUT1JBR0VfSE9NRV9MT0NBVElPTl9LRVkgPSAnd2VhdGhlckFwcC5ob21lTG9jYXRpb24nO1xuY29uc3QgTE9DQUxfU1RPUkFHRV9VTklUX1BSRUZFUkVOQ0VfS0VZID0gJ3dlYXRoZXJBcHAudW5pdFByZWZlcmVuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUhvbWVMb2NhdGlvbihsb2NhdGlvbikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfSE9NRV9MT0NBVElPTl9LRVksIGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvbWVMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9IT01FX0xPQ0FUSU9OX0tFWSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlVW5pdFByZWZlcmVuY2UodW5pdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfVU5JVF9QUkVGRVJFTkNFX0tFWSwgdW5pdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVbml0UHJlZmVyZW5jZSgpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9VTklUX1BSRUZFUkVOQ0VfS0VZKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjZWxzaXVzVG9GYXJlbmhlaXQoY2Vsc2l1cykge1xuICAgIHJldHVybiAoY2Vsc2l1cyAqIDkpIC8gNSArIDMyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFyZW5oZWl0VG9DZWxzaXVzKGZhcmVuaGVpdCkge1xuICAgIHJldHVybiAoKGZhcmVuaGVpdCAtIDMyKSAqIDUpIC8gOTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuaXhUb0RhdGUodW5peFRpbWVTdGFtcCkge1xuICAgIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHVuaXhUaW1lU3RhbXAgKiAxMDAwO1xuXG4gICAgY29uc3QgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKG1pbGxpc2Vjb25kcyk7XG5cbiAgICBjb25zdCBtb250aHMgPSBbXG4gICAgICAgICdKYW4nLFxuICAgICAgICAnRmViJyxcbiAgICAgICAgJ01hcicsXG4gICAgICAgICdBcHInLFxuICAgICAgICAnTWF5JyxcbiAgICAgICAgJ0p1bicsXG4gICAgICAgICdKdWwnLFxuICAgICAgICAnQXVnJyxcbiAgICAgICAgJ1NlcCcsXG4gICAgICAgICdPY3QnLFxuICAgICAgICAnTm92JyxcbiAgICAgICAgJ0RlYycsXG4gICAgXTtcblxuICAgIGNvbnN0IGRheXMgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xuXG4gICAgY29uc3QgZGF5ID0gZGF5c1tkYXRlT2JqZWN0LmdldERheSgpXTtcbiAgICBsZXQgZGF0ZSA9IGAke2RhdGVPYmplY3QuZ2V0RGF0ZSgpfWA7XG4gICAgaWYgKGRhdGUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRhdGUgPSBgMCR7ZGF0ZX1gO1xuICAgIH1cbiAgICBjb25zdCBtb250aCA9IG1vbnRoc1tkYXRlT2JqZWN0LmdldE1vbnRoKCldO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlT2JqZWN0LmdldEZ1bGxZZWFyKCk7XG5cbiAgICBjb25zdCBob3VyID0gZGF0ZU9iamVjdC5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbiA9IGRhdGVPYmplY3QuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlYyA9IGRhdGVPYmplY3QuZ2V0U2Vjb25kcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF5LFxuICAgICAgICBkYXRlLFxuICAgICAgICBtb250aCxcbiAgICAgICAgeWVhcixcbiAgICAgICAgaG91cixcbiAgICAgICAgbWluLFxuICAgICAgICBzZWMsXG4gICAgfTtcbn1cbiIsImltcG9ydCBmZXRjaEpzb24gZnJvbSAnLi4vYWpheCc7XG5cbmNvbnN0IGFwaUtleSA9ICdiODI3MGZkZGNiODM5NjE5YmU1Y2MxYWYzY2ViZDdlYic7XG5jb25zdCBjdXJyZW50QXBpQmFzZSA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcic7XG5jb25zdCBmb3JlY2FzdEFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGwnO1xuXG5mdW5jdGlvbiBjcmVhdGVDdXJyZW50V2VhdGhlckFwaVVybCh7IGxvY2F0aW9uLCB1bml0cyB9KSB7XG4gICAgcmV0dXJuIGAke2N1cnJlbnRBcGlCYXNlfT9xPSR7bG9jYXRpb259JmFwcGlkPSR7YXBpS2V5fSZ1bml0cz0ke3VuaXRzfWA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcmVjYXN0V2VhdGhlckFwaVVybCh7IGxhdGl0dWRlLCBsb25naXR1ZGUsIGV4Y2x1ZGUsIHVuaXRzIH0pIHtcbiAgICByZXR1cm4gYCR7Zm9yZWNhc3RBcGlCYXNlfT9sYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfSZleGNsdWRlPSR7ZXhjbHVkZX0mYXBwaWQ9JHthcGlLZXl9JnVuaXRzPSR7dW5pdHN9YDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRXZWF0aGVyKHF1ZXJ5KSB7XG4gICAgY29uc3QgYXBpVXJsID0gY3JlYXRlQ3VycmVudFdlYXRoZXJBcGlVcmwocXVlcnkpO1xuICAgIHJldHVybiBmZXRjaEpzb24oYXBpVXJsKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0V2VhdGhlcihxdWVyeSkge1xuICAgIGNvbnN0IGFwaVVybCA9IGNyZWF0ZUZvcmVjYXN0V2VhdGhlckFwaVVybChxdWVyeSk7XG4gICAgcmV0dXJuIGZldGNoSnNvbihhcGlVcmwpO1xufVxuIiwiaW1wb3J0IHVuaXhUb0RhdGUgZnJvbSAnLi4vdXRpbHMvdW5peFRvRGF0ZSc7XG5pbXBvcnQgeyBnZXRDdXJyZW50V2VhdGhlciwgZ2V0Rm9yZWNhc3RXZWF0aGVyIH0gZnJvbSAnLi93ZWF0aGVyQXBpJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQge1xuICAgIHNob3dCYW5uZXIsXG4gICAgc2hvd0Rpc3BsYXksXG4gICAgaGlkZUJhbm5lcixcbiAgICB1bkZvY3VzSW5wdXQsXG4gICAgdXBkYXRlRGlzcGxheSxcbn0gZnJvbSAnLi4vZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbG9hZFdlYXRoZXIobG9jYXRpb24sIG1zZykge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbik7XG5cbiAgICBpZiAoIWRhdGEpIHJldHVybjtcblxuICAgIGhpZGVCYW5uZXIoKTtcblxuICAgIGlmIChzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSA9PSBudWxsKSB7XG4gICAgICAgIHNob3dEaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgc3RhdGUuc2V0Q3VycmVudExvY2F0aW9uKGRhdGEuY3VycmVudERhdGEubG9jYXRpb24pO1xuXG4gICAgdXBkYXRlRGlzcGxheShkYXRhLmN1cnJlbnREYXRhLCBkYXRhLmZvcmVjYXN0RGF0YSk7XG4gICAgdW5Gb2N1c0lucHV0KCk7XG5cbiAgICBpZiAobXNnKSB7XG4gICAgICAgIHNob3dCYW5uZXIobXNnLCAnc3VjY2VzcycpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBjb25zdCBjdXJyZW50UXVlcnkgPSBjcmVhdGVDdXJyZW50V2VhdGhlclF1ZXJ5KGxvY2F0aW9uKTtcblxuICAgIGxldCBjdXJyZW50RGF0YSA9IGF3YWl0IGVycm9ySGFuZGxlcihnZXRDdXJyZW50V2VhdGhlciwgY3VycmVudFF1ZXJ5KTtcblxuICAgIGlmICghY3VycmVudERhdGEpIHJldHVybiBmYWxzZTtcblxuICAgIGN1cnJlbnREYXRhID0gcHJvY2Vzc0N1cnJlbnRXZWF0aGVyKGN1cnJlbnREYXRhKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0UXVlcnkgPSBjcmVhdGVGb3JlY2FzdFdlYXRoZXJRdWVyeShjdXJyZW50RGF0YSk7XG4gICAgbGV0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0V2VhdGhlcihmb3JlY2FzdFF1ZXJ5KTtcblxuICAgIGlmICghZm9yZWNhc3REYXRhKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3JlY2FzdERhdGEgPSBwcm9jZXNzRm9yZWNhc3RXZWF0aGVyKGZvcmVjYXN0RGF0YSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50RGF0YSxcbiAgICAgICAgZm9yZWNhc3REYXRhLFxuICAgIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihhcGlGdW5jdGlvbiwgcXVlcnkpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpRnVuY3Rpb24ocXVlcnkpO1xuXG4gICAgICAgIGlmIChkYXRhLmNvZCAhPT0gMjAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNob3dCYW5uZXIoZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBkYXRhLnN5cy5jb3VudHJ5XG4gICAgICAgID8gYCR7ZGF0YS5uYW1lfSwgJHtkYXRhLnN5cy5jb3VudHJ5fWBcbiAgICAgICAgOiBgJHtkYXRhLm5hbWV9YDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIGljb25Vcmw6IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYCxcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uU3RyaW5nLFxuICAgICAgICB0ZW1wOiBkYXRhLm1haW4udGVtcCxcbiAgICAgICAgbGF0aXR1ZGU6IGRhdGEuY29vcmQubGF0LFxuICAgICAgICBsb25naXR1ZGU6IGRhdGEuY29vcmQubG9uLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdFdlYXRoZXIoZGF0YSkge1xuICAgIHJldHVybiBkYXRhLmRhaWx5Lm1hcCgoZGF5KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB1bml4VG9EYXRlKGRheS5kdCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRlU2hvcnQ6IGAke2RhdGUuZGF5fSwgJHtkYXRlLm1vbnRofSAke2RhdGUuZGF0ZX1gLFxuICAgICAgICAgICAgZGF5VGVtcDogZGF5LnRlbXAuZGF5LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgaWNvblVybDogYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RheS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2AsXG4gICAgICAgICAgICBuaWdodFRlbXA6IGRheS50ZW1wLm5pZ2h0LFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDdXJyZW50V2VhdGhlclF1ZXJ5KGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHVuaXRzOiBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cycgPyAnbWV0cmljJyA6ICdpbXBlcmlhbCcsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3RXZWF0aGVyUXVlcnkoeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsYXRpdHVkZSxcbiAgICAgICAgbG9uZ2l0dWRlLFxuICAgICAgICBleGNsdWRlOiAnYWxlcnRzLGhvdXJseSxtaW51dGVseSxjdXJyZW50JyxcbiAgICAgICAgdW5pdHM6IHN0YXRlLmdldFVuaXRQcmVmKCkgPT09ICdjZWxzaXVzJyA/ICdtZXRyaWMnIDogJ2ltcGVyaWFsJyxcbiAgICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5cbmltcG9ydCB7IGdldEhvbWVMb2NhdGlvbiwgZ2V0VW5pdFByZWZlcmVuY2UgfSBmcm9tICcuL3N0b3JhZ2UnO1xuXG5pbXBvcnQge1xuICAgIGhhbmRsZUhvbWVCdXR0b25DbGljayxcbiAgICBoYW5kbGVSZWZyZXNoQnRuQ2xpY2ssXG4gICAgaGFuZGxlU2F2ZUxvY2F0aW9uLFxuICAgIGhhbmRsZVVuaXRCdG5DbGljayxcbiAgICBoYW5kbGVXZWF0aGVyU2VhcmNoLFxufSBmcm9tICcuL2V2ZW50TGlzdGVuZXJzJztcblxuaW1wb3J0IHsgdG9nZ2xlVW5pdEJ0biB9IGZyb20gJy4vZG9tJztcblxuaW1wb3J0IGxvYWRXZWF0aGVyIGZyb20gJy4vd2VhdGhlci93ZWF0aGVyRnVuY3Rpb25zJztcblxuaW5pdEFwcCgpO1xuXG5mdW5jdGlvbiBpbml0QXBwKCkge1xuICAgIHN0YXRlLmluaXRBcHBEYXRhc2V0cygpO1xuICAgIGluaXRFdmVudExpc3RlbmVycygpO1xuICAgIGxvYWRVc2VyU2V0dGluZ3MoKTtcbn1cblxuZnVuY3Rpb24gaW5pdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcl9fZm9ybScpO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlV2VhdGhlclNlYXJjaCk7XG5cbiAgICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUtYnRuJyk7XG4gICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUhvbWVCdXR0b25DbGljayk7XG5cbiAgICBjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZ2dsZS11bml0LWJ0bicpO1xuICAgIHVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVVbml0QnRuQ2xpY2spO1xuXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlLWJ0bicpO1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTYXZlTG9jYXRpb24pO1xuXG4gICAgY29uc3QgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoLWJ0bicpO1xuICAgIHJlZnJlc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVSZWZyZXNoQnRuQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBsb2FkVXNlclNldHRpbmdzKCkge1xuICAgIGxvYWRVbml0UHJlZmVyZW5jZSgpO1xuICAgIGxvYWRIb21lTG9jYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gbG9hZFVuaXRQcmVmZXJlbmNlKCkge1xuICAgIGNvbnN0IHVuaXRQcmVmID0gZ2V0VW5pdFByZWZlcmVuY2UoKTtcblxuICAgIGlmICh1bml0UHJlZiA9PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBjdXJyZW50VW5pdCA9IHN0YXRlLmdldFVuaXRQcmVmKCk7XG5cbiAgICBpZiAodW5pdFByZWYgIT09IGN1cnJlbnRVbml0KSB7XG4gICAgICAgIHRvZ2dsZVVuaXRCdG4oKTtcbiAgICAgICAgc3RhdGUudG9nZ2xlVW5pdFByZWYoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRIb21lTG9jYXRpb24oKSB7XG4gICAgY29uc3QgaG9tZUxvY2F0aW9uID0gZ2V0SG9tZUxvY2F0aW9uKCk7XG5cbiAgICBpZiAoaG9tZUxvY2F0aW9uID09IG51bGwpIHJldHVybjtcblxuICAgIGxvYWRXZWF0aGVyKGhvbWVMb2NhdGlvbik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9