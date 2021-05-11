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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3V0aWxzL2NvbnZlcnRUZW1wLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy91dGlscy91bml4VG9EYXRlLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy93ZWF0aGVyL3dlYXRoZXJBcGkuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FB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O0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIseURBQWU7O0FBRXhDOztBQUVBLElBQUksa0VBQVc7QUFDZiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKc29uKGFwaVVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuLy8gZGVmaW5lIGVsZW1lbnRzXG5jb25zdCBiYW5uZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYmFyX19iYW5uZXInKTtcbmNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fbG9jYXRpb24nKTtcbmNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fZGVzY3JpcHRpb24nKTtcbmNvbnN0IGljb25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzX19pY29uJyk7XG5jb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fdGVtcC12YWx1ZScpO1xuY29uc3QgdGVtcERlZ3JlZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHNfX3RlbXAtZGVncmVlJyk7XG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyX19pbnB1dCcpO1xuY29uc3Qgc2VhcmNoU3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtc3Bpbm5lcicpO1xuY29uc3QgaG9tZUxvY2F0aW9uU3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lLWxvY2F0aW9uLXNwaW5uZXInKTtcbmNvbnN0IHJlZnJlc2hTcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlZnJlc2gtc3Bpbm5lcicpO1xuY29uc3QgcmVzdWx0c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy1zZWN0aW9uJyk7XG5jb25zdCBmb3JlY2FzdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3Qtc2VjdGlvbicpO1xuY29uc3QgdGVtcEVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRlbXBdJyk7XG5cbi8vIGVycm9yIGhhbmRsaW5nXG5jb25zdCBlbmRBbmRTdGFydEJhbm5lclRpbWVyID0gKCgpID0+IHtcbiAgICBsZXQgdGltZXI7IC8vIHZhcmlhYmxlIHBlcnNpc3RlZCBoZXJlXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaGlkZUJhbm5lcigpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dCYW5uZXIobXNnLCB0eXBlID0gJ2Vycm9yJykge1xuICAgIGJhbm5lckVsLnRleHRDb250ZW50ID0gbXNnO1xuXG4gICAgYmFubmVyRWwuY2xhc3NMaXN0LmFkZCgnYmFubmVyLS1hY3RpdmUnKTtcblxuICAgIGJhbm5lckVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgIHR5cGUgPT09ICdlcnJvcicgPyAndmFyKC0tY29sb3ItcmVkKScgOiAndmFyKC0tY29sb3ItZ3JlZW4pJztcblxuICAgIGVuZEFuZFN0YXJ0QmFubmVyVGltZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVCYW5uZXIoKSB7XG4gICAgYmFubmVyRWwudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGJhbm5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jhbm5lci0tYWN0aXZlJyk7XG59XG5cbi8vIGRpc3BsYXkgdXBkYXRlcnNcbmZ1bmN0aW9uIHRvZ2dsZVNwaW5uZXIoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzcGxheS1ub25lJyk7XG4gICAgZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzcGxheS1ibG9jaycpO1xuICAgIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlU2VhcmNoU3Bpbm5lcigpIHtcbiAgICB0b2dnbGVTcGlubmVyKHNlYXJjaFNwaW5uZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcigpIHtcbiAgICB0b2dnbGVTcGlubmVyKGhvbWVMb2NhdGlvblNwaW5uZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlUmVmcmVzaFNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihyZWZyZXNoU3Bpbm5lcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVVbml0QnRuKCkge1xuICAgIGNvbnN0IGFjdGl2ZVVuaXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGl2ZS11bml0XScpO1xuICAgIGNvbnN0IG5vdEFjdGl2ZVVuaXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5vdC1hY3RpdmUtdW5pdF0nKTtcblxuICAgIGFjdGl2ZVVuaXRFbC5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX3VuaXQtYWN0aXZlJyk7XG4gICAgYWN0aXZlVW5pdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUtdW5pdCcpO1xuICAgIGFjdGl2ZVVuaXRFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbm90LWFjdGl2ZS11bml0JywgJycpO1xuXG4gICAgbm90QWN0aXZlVW5pdEVsLmNsYXNzTGlzdC5hZGQoJ25hdl9fdW5pdC1hY3RpdmUnKTtcbiAgICBub3RBY3RpdmVVbml0RWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW5vdC1hY3RpdmUtdW5pdCcpO1xuICAgIG5vdEFjdGl2ZVVuaXRFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLXVuaXQnLCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGlzcGxheSgpIHtcbiAgICByZXN1bHRzU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbiAgICBmb3JlY2FzdFNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gICAgcmVzdWx0c1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1mbGV4Jyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktZ3JpZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGlzcGxheShkYXRhLCBkYXRhMikge1xuICAgIGNvbnN0IHsgZGVzY3JpcHRpb24sIGljb25VcmwsIGxvY2F0aW9uLCB0ZW1wIH0gPSBkYXRhO1xuXG4gICAgZGF0YTIuZm9yRWFjaCgoZGF5LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JlY2FzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ZvcmVjYXN0X19yZXN1bHQtJHtpbmRleH1gKTtcblxuICAgICAgICBjb25zdCBkYXRlRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9fZGF0ZWApO1xuICAgICAgICBkYXRlRWwudGV4dENvbnRlbnQgPSBkYXkuZGF0ZVNob3J0O1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SWNvbkVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX2ljb25gKTtcbiAgICAgICAgZm9yZWNhc3RJY29uRWwuc3JjID0gZGF5Lmljb25Vcmw7XG4gICAgICAgIGZvcmVjYXN0SWNvbkVsLmFsdCA9IGRheS5kZXNjcmlwdGlvbjtcblxuICAgICAgICBjb25zdCBkYXlUZW1wRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9fZGF5LXRlbXBgKTtcbiAgICAgICAgZGF5VGVtcEVsLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkuZGF5VGVtcCl9YDtcbiAgICAgICAgZGF5VGVtcEVsLmRhdGFzZXQudGVtcCA9IGRheS5kYXlUZW1wO1xuXG4gICAgICAgIGNvbnN0IG5pZ2h0VGVtcEVsID0gZm9yZWNhc3RFbC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3RfX25pZ2h0LXRlbXBgKTtcbiAgICAgICAgbmlnaHRUZW1wRWwudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS5uaWdodFRlbXApfWA7XG4gICAgICAgIG5pZ2h0VGVtcEVsLmRhdGFzZXQudGVtcCA9IGRheS5uaWdodFRlbXA7XG4gICAgfSk7XG5cbiAgICBkZXNjcmlwdGlvbkVsLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgaWNvbkVsLnNyYyA9IGljb25Vcmw7XG4gICAgaWNvbkVsLmFsdCA9IGRlc2NyaXB0aW9uO1xuICAgIGxvY2F0aW9uRWwudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICB0ZW1wRWwudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHRlbXApO1xuICAgIHRlbXBFbC5kYXRhc2V0LnRlbXAgPSB0ZW1wO1xuICAgIHRlbXBEZWdyZWVFbC50ZXh0Q29udGVudCA9ICfCsCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VGVtcHMoY29udmVydFRlbXApIHtcbiAgICB0ZW1wRWxzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1RlbXAgPSBjb252ZXJ0VGVtcChlbC5kYXRhc2V0LnRlbXApO1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQobmV3VGVtcCk7XG4gICAgICAgIGVsLmRhdGFzZXQudGVtcCA9IG5ld1RlbXA7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bkZvY3VzSW5wdXQoKSB7XG4gICAgaW5wdXQuYmx1cigpO1xufVxuXG4vLyBmdW5jdGlvbnMgdG8gZ2V0IHZhbHVlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlYXJjaElucHV0KCkge1xuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cbiIsImltcG9ydCB7XG4gICAgY29udmVydFRlbXBzLFxuICAgIGdldFNlYXJjaElucHV0LFxuICAgIHNob3dCYW5uZXIsXG4gICAgdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcixcbiAgICB0b2dnbGVSZWZyZXNoU3Bpbm5lcixcbiAgICB0b2dnbGVTZWFyY2hTcGlubmVyLFxuICAgIHRvZ2dsZVVuaXRCdG4sXG59IGZyb20gJy4vZG9tJztcblxuaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5pbXBvcnQge1xuICAgIGdldEhvbWVMb2NhdGlvbixcbiAgICBzYXZlSG9tZUxvY2F0aW9uLFxuICAgIHNhdmVVbml0UHJlZmVyZW5jZSxcbn0gZnJvbSAnLi9zdG9yYWdlJztcblxuaW1wb3J0IHsgY2Vsc2l1c1RvRmFyZW5oZWl0LCBmYXJlbmhlaXRUb0NlbHNpdXMgfSBmcm9tICcuL3V0aWxzL2NvbnZlcnRUZW1wJztcbmltcG9ydCBsb2FkV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVXZWF0aGVyU2VhcmNoKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKTtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0U2VhcmNoSW5wdXQoKTtcblxuICAgIGF3YWl0IGxvYWRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUhvbWVCdXR0b25DbGljaygpIHtcbiAgICBjb25zdCBob21lTG9jYXRpb24gPSBnZXRIb21lTG9jYXRpb24oKTtcblxuICAgIGlmIChob21lTG9jYXRpb24gPT0gbnVsbCkge1xuICAgICAgICBzaG93QmFubmVyKCdObyBIb21lIExvY2F0aW9uIFNldCcsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcigpO1xuXG4gICAgYXdhaXQgbG9hZFdlYXRoZXIoaG9tZUxvY2F0aW9uLCAnSG9tZSBMb2NhdGlvbiBMb2FkZWQnKTtcblxuICAgIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVuaXRCdG5DbGljaygpIHtcbiAgICBpZiAoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkpIHtcbiAgICAgICAgY29uc3QgY29udmVydFRlbXBGbiA9XG4gICAgICAgICAgICBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cydcbiAgICAgICAgICAgICAgICA/IGNlbHNpdXNUb0ZhcmVuaGVpdFxuICAgICAgICAgICAgICAgIDogZmFyZW5oZWl0VG9DZWxzaXVzO1xuICAgICAgICBjb252ZXJ0VGVtcHMoY29udmVydFRlbXBGbik7XG4gICAgfVxuICAgIHN0YXRlLnRvZ2dsZVVuaXRQcmVmKCk7XG4gICAgdG9nZ2xlVW5pdEJ0bigpO1xuICAgIHNhdmVVbml0UHJlZmVyZW5jZShzdGF0ZS5nZXRVbml0UHJlZigpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNhdmVMb2NhdGlvbigpIHtcbiAgICBpZiAoIXN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKSB7XG4gICAgICAgIHNob3dCYW5uZXIoJ05vIEN1cnJlbnQgTG9jYXRpb24gVG8gU2F2ZScsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2F2ZUhvbWVMb2NhdGlvbihzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSk7XG5cbiAgICBzaG93QmFubmVyKCdIb21lIExvY2F0aW9uIFNhdmVkJywgJ3N1Y2Nlc3MnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJlZnJlc2hCdG5DbGljaygpIHtcbiAgICBpZiAoIXN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKSB7XG4gICAgICAgIHNob3dCYW5uZXIoJ05vIEN1cnJlbnQgTG9jYXRpb24gVG8gUmVmcmVzaCcsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlUmVmcmVzaFNwaW5uZXIoKTtcblxuICAgIGxvYWRXZWF0aGVyKFxuICAgICAgICBzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSxcbiAgICAgICAgdG9nZ2xlUmVmcmVzaFNwaW5uZXIsXG4gICAgICAgICdDdXJyZW50IExvY2F0aW9uIFJlZnJlc2hlZCdcbiAgICApO1xufVxuIiwiY29uc3QgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpO1xuXG5sZXQgY3VycmVudExvY2F0aW9uID0gbnVsbDtcbmxldCB1bml0UHJlZiA9ICdjZWxzaXVzJztcblxuZnVuY3Rpb24gaW5pdEFwcERhdGFzZXRzKCkge1xuICAgIGFwcC5kYXRhc2V0LmN1cnJlbnRMb2NhdGlvbiA9IG51bGw7XG4gICAgYXBwLmRhdGFzZXQudW5pdFByZWYgPSAnY2Vsc2l1cyc7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gY3VycmVudExvY2F0aW9uO1xufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICBjdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICBhcHAuZGF0YXNldC5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbn1cblxuZnVuY3Rpb24gZ2V0VW5pdFByZWYoKSB7XG4gICAgcmV0dXJuIHVuaXRQcmVmO1xufVxuXG5mdW5jdGlvbiBzZXRVbml0UHJlZih1bml0KSB7XG4gICAgaWYgKHVuaXQgIT09ICdjZWxzaXVzJyAmJiB1bml0ICE9PSAnZmFyZW5oZWl0JykgcmV0dXJuO1xuICAgIHVuaXRQcmVmID0gdW5pdDtcbiAgICBhcHAuZGF0YXNldC51bml0UHJlZiA9IHVuaXQ7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVVuaXRQcmVmKCkge1xuICAgIGNvbnN0IHVuaXQgPSB1bml0UHJlZiA9PT0gJ2NlbHNpdXMnID8gJ2ZhcmVuaGVpdCcgOiAnY2Vsc2l1cyc7XG4gICAgc2V0VW5pdFByZWYodW5pdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xuICAgIGluaXRBcHBEYXRhc2V0cyxcbiAgICBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgc2V0Q3VycmVudExvY2F0aW9uLFxuICAgIGdldFVuaXRQcmVmLFxuICAgIHNldFVuaXRQcmVmLFxuICAgIHRvZ2dsZVVuaXRQcmVmLFxufSk7XG4iLCJjb25zdCBMT0NBTF9TVE9SQUdFX0hPTUVfTE9DQVRJT05fS0VZID0gJ3dlYXRoZXJBcHAuaG9tZUxvY2F0aW9uJztcbmNvbnN0IExPQ0FMX1NUT1JBR0VfVU5JVF9QUkVGRVJFTkNFX0tFWSA9ICd3ZWF0aGVyQXBwLnVuaXRQcmVmZXJlbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVIb21lTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0hPTUVfTE9DQVRJT05fS0VZLCBsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb21lTG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfSE9NRV9MT0NBVElPTl9LRVkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVVuaXRQcmVmZXJlbmNlKHVuaXQpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1VOSVRfUFJFRkVSRU5DRV9LRVksIHVuaXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5pdFByZWZlcmVuY2UoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfVU5JVF9QUkVGRVJFTkNFX0tFWSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvRmFyZW5oZWl0KGNlbHNpdXMpIHtcbiAgICByZXR1cm4gKGNlbHNpdXMgKiA5KSAvIDUgKyAzMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhcmVuaGVpdFRvQ2Vsc2l1cyhmYXJlbmhlaXQpIHtcbiAgICByZXR1cm4gKChmYXJlbmhlaXQgLSAzMikgKiA1KSAvIDk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bml4VG9EYXRlKHVuaXhUaW1lU3RhbXApIHtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSB1bml4VGltZVN0YW1wICogMTAwMDtcblxuICAgIGNvbnN0IGRhdGVPYmplY3QgPSBuZXcgRGF0ZShtaWxsaXNlY29uZHMpO1xuXG4gICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAnSmFuJyxcbiAgICAgICAgJ0ZlYicsXG4gICAgICAgICdNYXInLFxuICAgICAgICAnQXByJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW4nLFxuICAgICAgICAnSnVsJyxcbiAgICAgICAgJ0F1ZycsXG4gICAgICAgICdTZXAnLFxuICAgICAgICAnT2N0JyxcbiAgICAgICAgJ05vdicsXG4gICAgICAgICdEZWMnLFxuICAgIF07XG5cbiAgICBjb25zdCBkYXlzID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcblxuICAgIGNvbnN0IGRheSA9IGRheXNbZGF0ZU9iamVjdC5nZXREYXkoKV07XG4gICAgbGV0IGRhdGUgPSBgJHtkYXRlT2JqZWN0LmdldERhdGUoKX1gO1xuICAgIGlmIChkYXRlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkYXRlID0gYDAke2RhdGV9YDtcbiAgICB9XG4gICAgY29uc3QgbW9udGggPSBtb250aHNbZGF0ZU9iamVjdC5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZU9iamVjdC5nZXRGdWxsWWVhcigpO1xuXG4gICAgY29uc3QgaG91ciA9IGRhdGVPYmplY3QuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW4gPSBkYXRlT2JqZWN0LmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWMgPSBkYXRlT2JqZWN0LmdldFNlY29uZHMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRheSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbW9udGgsXG4gICAgICAgIHllYXIsXG4gICAgICAgIGhvdXIsXG4gICAgICAgIG1pbixcbiAgICAgICAgc2VjLFxuICAgIH07XG59XG4iLCJpbXBvcnQgZmV0Y2hKc29uIGZyb20gJy4uL2FqYXgnO1xuXG5jb25zdCBhcGlLZXkgPSAnYjgyNzBmZGRjYjgzOTYxOWJlNWNjMWFmM2NlYmQ3ZWInO1xuY29uc3QgY3VycmVudEFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXInO1xuY29uc3QgZm9yZWNhc3RBcGlCYXNlID0gJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsJztcblxuZnVuY3Rpb24gY3JlYXRlQ3VycmVudFdlYXRoZXJBcGlVcmwoeyBsb2NhdGlvbiwgdW5pdHMgfSkge1xuICAgIHJldHVybiBgJHtjdXJyZW50QXBpQmFzZX0/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke2FwaUtleX0mdW5pdHM9JHt1bml0c31gO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JlY2FzdFdlYXRoZXJBcGlVcmwoeyBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBleGNsdWRlLCB1bml0cyB9KSB7XG4gICAgcmV0dXJuIGAke2ZvcmVjYXN0QXBpQmFzZX0/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mZXhjbHVkZT0ke2V4Y2x1ZGV9JmFwcGlkPSR7YXBpS2V5fSZ1bml0cz0ke3VuaXRzfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50V2VhdGhlcihxdWVyeSkge1xuICAgIGNvbnN0IGFwaVVybCA9IGNyZWF0ZUN1cnJlbnRXZWF0aGVyQXBpVXJsKHF1ZXJ5KTtcbiAgICByZXR1cm4gZmV0Y2hKc29uKGFwaVVybCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdFdlYXRoZXIocXVlcnkpIHtcbiAgICBjb25zdCBhcGlVcmwgPSBjcmVhdGVGb3JlY2FzdFdlYXRoZXJBcGlVcmwocXVlcnkpO1xuICAgIHJldHVybiBmZXRjaEpzb24oYXBpVXJsKTtcbn1cbiIsImltcG9ydCB1bml4VG9EYXRlIGZyb20gJy4uL3V0aWxzL3VuaXhUb0RhdGUnO1xuaW1wb3J0IHsgZ2V0Q3VycmVudFdlYXRoZXIsIGdldEZvcmVjYXN0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlckFwaSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgICBzaG93QmFubmVyLFxuICAgIHNob3dEaXNwbGF5LFxuICAgIGhpZGVCYW5uZXIsXG4gICAgdW5Gb2N1c0lucHV0LFxuICAgIHVwZGF0ZURpc3BsYXksXG59IGZyb20gJy4uL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGxvYWRXZWF0aGVyKGxvY2F0aW9uLCBtc2cpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pO1xuXG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgICBoaWRlQmFubmVyKCk7XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkgPT0gbnVsbCkge1xuICAgICAgICBzaG93RGlzcGxheSgpO1xuICAgIH1cblxuICAgIHN0YXRlLnNldEN1cnJlbnRMb2NhdGlvbihkYXRhLmN1cnJlbnREYXRhLmxvY2F0aW9uKTtcblxuICAgIHVwZGF0ZURpc3BsYXkoZGF0YS5jdXJyZW50RGF0YSwgZGF0YS5mb3JlY2FzdERhdGEpO1xuICAgIHVuRm9jdXNJbnB1dCgpO1xuXG4gICAgaWYgKG1zZykge1xuICAgICAgICBzaG93QmFubmVyKG1zZywgJ3N1Y2Nlc3MnKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgY29uc3QgY3VycmVudFF1ZXJ5ID0gY3JlYXRlQ3VycmVudFdlYXRoZXJRdWVyeShsb2NhdGlvbik7XG5cbiAgICBsZXQgY3VycmVudERhdGEgPSBhd2FpdCBlcnJvckhhbmRsZXIoZ2V0Q3VycmVudFdlYXRoZXIsIGN1cnJlbnRRdWVyeSk7XG5cbiAgICBpZiAoIWN1cnJlbnREYXRhKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjdXJyZW50RGF0YSA9IHByb2Nlc3NDdXJyZW50V2VhdGhlcihjdXJyZW50RGF0YSk7XG5cbiAgICBjb25zdCBmb3JlY2FzdFF1ZXJ5ID0gY3JlYXRlRm9yZWNhc3RXZWF0aGVyUXVlcnkoY3VycmVudERhdGEpO1xuICAgIGxldCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdFdlYXRoZXIoZm9yZWNhc3RRdWVyeSk7XG5cbiAgICBpZiAoIWZvcmVjYXN0RGF0YSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yZWNhc3REYXRhID0gcHJvY2Vzc0ZvcmVjYXN0V2VhdGhlcihmb3JlY2FzdERhdGEpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudERhdGEsXG4gICAgICAgIGZvcmVjYXN0RGF0YSxcbiAgICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBlcnJvckhhbmRsZXIoYXBpRnVuY3Rpb24sIHF1ZXJ5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGFwaUZ1bmN0aW9uKHF1ZXJ5KTtcblxuICAgICAgICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEubWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzaG93QmFubmVyKGVycm9yLm1lc3NhZ2UsICdlcnJvcicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGxvY2F0aW9uU3RyaW5nID0gZGF0YS5zeXMuY291bnRyeVxuICAgICAgICA/IGAke2RhdGEubmFtZX0sICR7ZGF0YS5zeXMuY291bnRyeX1gXG4gICAgICAgIDogYCR7ZGF0YS5uYW1lfWA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICBpY29uVXJsOiBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2AsXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblN0cmluZyxcbiAgICAgICAgdGVtcDogZGF0YS5tYWluLnRlbXAsXG4gICAgICAgIGxhdGl0dWRlOiBkYXRhLmNvb3JkLmxhdCxcbiAgICAgICAgbG9uZ2l0dWRlOiBkYXRhLmNvb3JkLmxvbixcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRm9yZWNhc3RXZWF0aGVyKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5kYWlseS5tYXAoKGRheSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRlID0gdW5peFRvRGF0ZShkYXkuZHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0ZVNob3J0OiBgJHtkYXRlLmRheX0sICR7ZGF0ZS5tb250aH0gJHtkYXRlLmRhdGV9YCxcbiAgICAgICAgICAgIGRheVRlbXA6IGRheS50ZW1wLmRheSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXkud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGljb25Vcmw6IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkud2VhdGhlclswXS5pY29ufUAyeC5wbmdgLFxuICAgICAgICAgICAgbmlnaHRUZW1wOiBkYXkudGVtcC5uaWdodCxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ3VycmVudFdlYXRoZXJRdWVyeShsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICB1bml0czogc3RhdGUuZ2V0VW5pdFByZWYoKSA9PT0gJ2NlbHNpdXMnID8gJ21ldHJpYycgOiAnaW1wZXJpYWwnLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcmVjYXN0V2VhdGhlclF1ZXJ5KHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGF0aXR1ZGUsXG4gICAgICAgIGxvbmdpdHVkZSxcbiAgICAgICAgZXhjbHVkZTogJ2FsZXJ0cyxob3VybHksbWludXRlbHksY3VycmVudCcsXG4gICAgICAgIHVuaXRzOiBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cycgPyAnbWV0cmljJyA6ICdpbXBlcmlhbCcsXG4gICAgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5pbXBvcnQgeyBnZXRIb21lTG9jYXRpb24sIGdldFVuaXRQcmVmZXJlbmNlIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuaW1wb3J0IHtcbiAgICBoYW5kbGVIb21lQnV0dG9uQ2xpY2ssXG4gICAgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrLFxuICAgIGhhbmRsZVNhdmVMb2NhdGlvbixcbiAgICBoYW5kbGVVbml0QnRuQ2xpY2ssXG4gICAgaGFuZGxlV2VhdGhlclNlYXJjaCxcbn0gZnJvbSAnLi9ldmVudExpc3RlbmVycyc7XG5cbmltcG9ydCB7IHRvZ2dsZVVuaXRCdG4gfSBmcm9tICcuL2RvbSc7XG5cbmltcG9ydCBsb2FkV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucyc7XG5cbmluaXRBcHAoKTtcblxuZnVuY3Rpb24gaW5pdEFwcCgpIHtcbiAgICBzdGF0ZS5pbml0QXBwRGF0YXNldHMoKTtcbiAgICBpbml0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBsb2FkVXNlclNldHRpbmdzKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXJfX2Zvcm0nKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZVdlYXRoZXJTZWFyY2gpO1xuXG4gICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lLWJ0bicpO1xuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIb21lQnV0dG9uQ2xpY2spO1xuXG4gICAgY29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2dnbGUtdW5pdC1idG4nKTtcbiAgICB1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5pdEJ0bkNsaWNrKTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZS1idG4nKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2F2ZUxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaC1idG4nKTtcbiAgICByZWZyZXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrKTtcbn1cblxuZnVuY3Rpb24gbG9hZFVzZXJTZXR0aW5ncygpIHtcbiAgICBsb2FkVW5pdFByZWZlcmVuY2UoKTtcbiAgICBsb2FkSG9tZUxvY2F0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRVbml0UHJlZmVyZW5jZSgpIHtcbiAgICBjb25zdCB1bml0UHJlZiA9IGdldFVuaXRQcmVmZXJlbmNlKCk7XG5cbiAgICBpZiAodW5pdFByZWYgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY3VycmVudFVuaXQgPSBzdGF0ZS5nZXRVbml0UHJlZigpO1xuXG4gICAgaWYgKHVuaXRQcmVmICE9PSBjdXJyZW50VW5pdCkge1xuICAgICAgICB0b2dnbGVVbml0QnRuKCk7XG4gICAgICAgIHN0YXRlLnRvZ2dsZVVuaXRQcmVmKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkSG9tZUxvY2F0aW9uKCkge1xuICAgIGNvbnN0IGhvbWVMb2NhdGlvbiA9IGdldEhvbWVMb2NhdGlvbigpO1xuXG4gICAgaWYgKGhvbWVMb2NhdGlvbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICBsb2FkV2VhdGhlcihob21lTG9jYXRpb24pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==