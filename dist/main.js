/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/ajax.js":
/*!*****************************!*\
  !*** ./src/modules/ajax.js ***!
  \*****************************/
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

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
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
/* harmony export */   "updateCurrentDisplay": () => (/* binding */ updateCurrentDisplay),
/* harmony export */   "updateForecastDisplay": () => (/* binding */ updateForecastDisplay),
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

function updateCurrentDisplay(data) {
    const { description, iconUrl, location, temp } = data;

    descriptionEl.textContent = description;
    iconEl.src = iconUrl;
    iconEl.alt = description;
    locationEl.textContent = location;
    tempEl.textContent = Math.round(temp);
    tempEl.dataset.temp = temp;
}

function updateForecastDisplay(data) {
    data.forEach((day, index) => {
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

/***/ "./src/modules/eventListeners.js":
/*!***************************************!*\
  !*** ./src/modules/eventListeners.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleWeatherSearch": () => (/* binding */ handleWeatherSearch),
/* harmony export */   "handleHomeButtonClick": () => (/* binding */ handleHomeButtonClick),
/* harmony export */   "handleRefreshBtnClick": () => (/* binding */ handleRefreshBtnClick),
/* harmony export */   "handleUnitBtnClick": () => (/* binding */ handleUnitBtnClick),
/* harmony export */   "handleSaveLocation": () => (/* binding */ handleSaveLocation)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/modules/state.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _utils_convertTemp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/convertTemp */ "./src/modules/utils/convertTemp.js");
/* harmony import */ var _weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weather/weatherFunctions */ "./src/modules/weather/weatherFunctions.js");









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

/***/ "./src/modules/state.js":
/*!******************************!*\
  !*** ./src/modules/state.js ***!
  \******************************/
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

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
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

/***/ "./src/modules/utils/convertTemp.js":
/*!******************************************!*\
  !*** ./src/modules/utils/convertTemp.js ***!
  \******************************************/
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

/***/ "./src/modules/utils/unixToDate.js":
/*!*****************************************!*\
  !*** ./src/modules/utils/unixToDate.js ***!
  \*****************************************/
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

/***/ "./src/modules/weather/weatherApi.js":
/*!*******************************************!*\
  !*** ./src/modules/weather/weatherApi.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentWeather": () => (/* binding */ getCurrentWeather),
/* harmony export */   "getForecastWeather": () => (/* binding */ getForecastWeather)
/* harmony export */ });
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ajax */ "./src/modules/ajax.js");


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

/***/ "./src/modules/weather/weatherFunctions.js":
/*!*************************************************!*\
  !*** ./src/modules/weather/weatherFunctions.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadWeather)
/* harmony export */ });
/* harmony import */ var _utils_unixToDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/unixToDate */ "./src/modules/utils/unixToDate.js");
/* harmony import */ var _weatherApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherApi */ "./src/modules/weather/weatherApi.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./src/modules/state.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom */ "./src/modules/dom.js");








async function loadWeather(location, msg) {
    const data = await getWeatherData(location);

    if (!data) return;

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.hideBanner)();

    if (_state__WEBPACK_IMPORTED_MODULE_2__.default.getCurrentLocation() == null) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_3__.showDisplay)();
    }

    _state__WEBPACK_IMPORTED_MODULE_2__.default.setCurrentLocation(data.currentData.location);

    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.updateCurrentDisplay)(data.currentData);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.updateForecastDisplay)(data.forecastData);
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
/* harmony import */ var _modules_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/state */ "./src/modules/state.js");
/* harmony import */ var _modules_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/storage */ "./src/modules/storage.js");
/* harmony import */ var _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/eventListeners */ "./src/modules/eventListeners.js");
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");
/* harmony import */ var _modules_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/weather/weatherFunctions */ "./src/modules/weather/weatherFunctions.js");










initApp();

function initApp() {
    _modules_state__WEBPACK_IMPORTED_MODULE_0__.default.initAppDatasets();
    initEventListeners();
    loadUserSettings();
}

function initEventListeners() {
    const form = document.querySelector('#search-bar__form');
    form.addEventListener('submit', _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleWeatherSearch);

    const homeButton = document.querySelector('#home-btn');
    homeButton.addEventListener('click', _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleHomeButtonClick);

    const unitBtn = document.querySelector('#toggle-unit-btn');
    unitBtn.addEventListener('click', _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleUnitBtnClick);

    const saveButton = document.querySelector('#save-btn');
    saveButton.addEventListener('click', _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleSaveLocation);

    const refreshButton = document.querySelector('#refresh-btn');
    refreshButton.addEventListener('click', _modules_eventListeners__WEBPACK_IMPORTED_MODULE_2__.handleRefreshBtnClick);
}

function loadUserSettings() {
    loadUnitPreference();
    loadHomeLocation();
}

function loadUnitPreference() {
    const unitPref = (0,_modules_storage__WEBPACK_IMPORTED_MODULE_1__.getUnitPreference)();

    if (unitPref == null) return;

    const currentUnit = _modules_state__WEBPACK_IMPORTED_MODULE_0__.default.getUnitPref();

    if (unitPref !== currentUnit) {
        (0,_modules_dom__WEBPACK_IMPORTED_MODULE_3__.toggleUnitBtn)();
        _modules_state__WEBPACK_IMPORTED_MODULE_0__.default.toggleUnitPref();
    }
}

function loadHomeLocation() {
    const homeLocation = (0,_modules_storage__WEBPACK_IMPORTED_MODULE_1__.getHomeLocation)();

    if (homeLocation == null) return;

    (0,_modules_weather_weatherFunctions__WEBPACK_IMPORTED_MODULE_4__.default)(homeLocation);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvbW9kdWxlcy9hamF4LmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvbW9kdWxlcy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL3V0aWxzL2NvbnZlcnRUZW1wLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL3V0aWxzL3VuaXhUb0RhdGUuanMiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwLy4vc3JjL21vZHVsZXMvd2VhdGhlci93ZWF0aGVyQXBpLmpzIiwid2VicGFjazovLzVfcHJvamVjdF93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNV9wcm9qZWN0X3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly81X3Byb2plY3Rfd2VhdGhl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QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLG1FQUFpQjs7QUFFdEM7O0FBRUEsd0JBQXdCLCtEQUFpQjs7QUFFekM7QUFDQSxRQUFRLDJEQUFhO0FBQ3JCLFFBQVEsa0VBQW9CO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsaUVBQWU7O0FBRXhDOztBQUVBLElBQUksMEVBQVc7QUFDZiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKc29uKGFwaVVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuLy8gZGVmaW5lIGVsZW1lbnRzXG5jb25zdCBiYW5uZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYmFyX19iYW5uZXInKTtcbmNvbnN0IGxvY2F0aW9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fbG9jYXRpb24nKTtcbmNvbnN0IGRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fZGVzY3JpcHRpb24nKTtcbmNvbnN0IGljb25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzX19pY29uJyk7XG5jb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c19fdGVtcC12YWx1ZScpO1xuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcl9faW5wdXQnKTtcbmNvbnN0IHNlYXJjaFNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXNwaW5uZXInKTtcbmNvbnN0IGhvbWVMb2NhdGlvblNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZS1sb2NhdGlvbi1zcGlubmVyJyk7XG5jb25zdCByZWZyZXNoU3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoLXNwaW5uZXInKTtcbmNvbnN0IHJlc3VsdHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtc2VjdGlvbicpO1xuY29uc3QgZm9yZWNhc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LXNlY3Rpb24nKTtcbmNvbnN0IHRlbXBFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZW1wXScpO1xuXG4vLyBlcnJvciBoYW5kbGluZ1xuY29uc3QgZW5kQW5kU3RhcnRCYW5uZXJUaW1lciA9ICgoKSA9PiB7XG4gICAgbGV0IHRpbWVyOyAvLyB2YXJpYWJsZSBwZXJzaXN0ZWQgaGVyZVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhpZGVCYW5uZXIoKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93QmFubmVyKG1zZywgdHlwZSA9ICdlcnJvcicpIHtcbiAgICBiYW5uZXJFbC50ZXh0Q29udGVudCA9IG1zZztcblxuICAgIGJhbm5lckVsLmNsYXNzTGlzdC5hZGQoJ2Jhbm5lci0tYWN0aXZlJyk7XG5cbiAgICBiYW5uZXJFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICB0eXBlID09PSAnZXJyb3InID8gJ3ZhcigtLWNvbG9yLXJlZCknIDogJ3ZhcigtLWNvbG9yLWdyZWVuKSc7XG5cbiAgICBlbmRBbmRTdGFydEJhbm5lclRpbWVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlQmFubmVyKCkge1xuICAgIGJhbm5lckVsLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBiYW5uZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdiYW5uZXItLWFjdGl2ZScpO1xufVxuXG4vLyBkaXNwbGF5IHVwZGF0ZXJzXG5mdW5jdGlvbiB0b2dnbGVTcGlubmVyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXktYmxvY2snKTtcbiAgICBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5LW5vbmUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVNlYXJjaFNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihzZWFyY2hTcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUhvbWVMb2NhdGlvblNwaW5uZXIoKSB7XG4gICAgdG9nZ2xlU3Bpbm5lcihob21lTG9jYXRpb25TcGlubmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVJlZnJlc2hTcGlubmVyKCkge1xuICAgIHRvZ2dsZVNwaW5uZXIocmVmcmVzaFNwaW5uZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlVW5pdEJ0bigpIHtcbiAgICBjb25zdCBhY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3RpdmUtdW5pdF0nKTtcbiAgICBjb25zdCBub3RBY3RpdmVVbml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ub3QtYWN0aXZlLXVuaXRdJyk7XG5cbiAgICBhY3RpdmVVbml0RWwuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X191bml0LWFjdGl2ZScpO1xuICAgIGFjdGl2ZVVuaXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLXVuaXQnKTtcbiAgICBhY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLW5vdC1hY3RpdmUtdW5pdCcsICcnKTtcblxuICAgIG5vdEFjdGl2ZVVuaXRFbC5jbGFzc0xpc3QuYWRkKCduYXZfX3VuaXQtYWN0aXZlJyk7XG4gICAgbm90QWN0aXZlVW5pdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1ub3QtYWN0aXZlLXVuaXQnKTtcbiAgICBub3RBY3RpdmVVbml0RWwuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZS11bml0JywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Rpc3BsYXkoKSB7XG4gICAgcmVzdWx0c1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gICAgZm9yZWNhc3RTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICAgIHJlc3VsdHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktZmxleCcpO1xuICAgIGZvcmVjYXN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWdyaWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnREaXNwbGF5KGRhdGEpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBpY29uVXJsLCBsb2NhdGlvbiwgdGVtcCB9ID0gZGF0YTtcblxuICAgIGRlc2NyaXB0aW9uRWwudGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcbiAgICBpY29uRWwuc3JjID0gaWNvblVybDtcbiAgICBpY29uRWwuYWx0ID0gZGVzY3JpcHRpb247XG4gICAgbG9jYXRpb25FbC50ZXh0Q29udGVudCA9IGxvY2F0aW9uO1xuICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQodGVtcCk7XG4gICAgdGVtcEVsLmRhdGFzZXQudGVtcCA9IHRlbXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGb3JlY2FzdERpc3BsYXkoZGF0YSkge1xuICAgIGRhdGEuZm9yRWFjaCgoZGF5LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JlY2FzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ZvcmVjYXN0X19yZXN1bHQtJHtpbmRleH1gKTtcblxuICAgICAgICBjb25zdCBkYXRlRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9fZGF0ZWApO1xuICAgICAgICBkYXRlRWwudGV4dENvbnRlbnQgPSBkYXkuZGF0ZVNob3J0O1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGVzY3JpcHRpb25FbCA9IGZvcmVjYXN0RWwucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcuZm9yZWNhc3RfX2Rlc2NyaXB0aW9uJ1xuICAgICAgICApO1xuICAgICAgICBmb3JlY2FzdERlc2NyaXB0aW9uRWwudGV4dENvbnRlbnQgPSBkYXkuZGVzY3JpcHRpb247XG5cbiAgICAgICAgY29uc3QgZm9yZWNhc3RJY29uRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9faWNvbmApO1xuICAgICAgICBmb3JlY2FzdEljb25FbC5zcmMgPSBkYXkuaWNvblVybDtcbiAgICAgICAgZm9yZWNhc3RJY29uRWwuYWx0ID0gZGF5LmRlc2NyaXB0aW9uO1xuXG4gICAgICAgIGNvbnN0IGRheVRlbXBFbCA9IGZvcmVjYXN0RWwucXVlcnlTZWxlY3RvcihgLmZvcmVjYXN0X19kYXktdGVtcGApO1xuICAgICAgICBkYXlUZW1wRWwudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS5kYXlUZW1wKX1gO1xuICAgICAgICBkYXlUZW1wRWwuZGF0YXNldC50ZW1wID0gZGF5LmRheVRlbXA7XG5cbiAgICAgICAgY29uc3QgbmlnaHRUZW1wRWwgPSBmb3JlY2FzdEVsLnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdF9fbmlnaHQtdGVtcGApO1xuICAgICAgICBuaWdodFRlbXBFbC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5Lm5pZ2h0VGVtcCl9YDtcbiAgICAgICAgbmlnaHRUZW1wRWwuZGF0YXNldC50ZW1wID0gZGF5Lm5pZ2h0VGVtcDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUZW1wcyhjb252ZXJ0VGVtcCkge1xuICAgIHRlbXBFbHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgbmV3VGVtcCA9IGNvbnZlcnRUZW1wKGVsLmRhdGFzZXQudGVtcCk7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChuZXdUZW1wKTtcbiAgICAgICAgZWwuZGF0YXNldC50ZW1wID0gbmV3VGVtcDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuRm9jdXNJbnB1dCgpIHtcbiAgICBpbnB1dC5ibHVyKCk7XG59XG5cbi8vIGZ1bmN0aW9ucyB0byBnZXQgdmFsdWVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VhcmNoSW5wdXQoKSB7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuIiwiaW1wb3J0IHtcbiAgICBjb252ZXJ0VGVtcHMsXG4gICAgZ2V0U2VhcmNoSW5wdXQsXG4gICAgc2hvd0Jhbm5lcixcbiAgICB0b2dnbGVIb21lTG9jYXRpb25TcGlubmVyLFxuICAgIHRvZ2dsZVJlZnJlc2hTcGlubmVyLFxuICAgIHRvZ2dsZVNlYXJjaFNwaW5uZXIsXG4gICAgdG9nZ2xlVW5pdEJ0bixcbn0gZnJvbSAnLi9kb20nO1xuXG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5cbmltcG9ydCB7XG4gICAgZ2V0SG9tZUxvY2F0aW9uLFxuICAgIHNhdmVIb21lTG9jYXRpb24sXG4gICAgc2F2ZVVuaXRQcmVmZXJlbmNlLFxufSBmcm9tICcuL3N0b3JhZ2UnO1xuXG5pbXBvcnQgeyBjZWxzaXVzVG9GYXJlbmhlaXQsIGZhcmVuaGVpdFRvQ2Vsc2l1cyB9IGZyb20gJy4vdXRpbHMvY29udmVydFRlbXAnO1xuaW1wb3J0IGxvYWRXZWF0aGVyIGZyb20gJy4vd2VhdGhlci93ZWF0aGVyRnVuY3Rpb25zJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVdlYXRoZXJTZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdG9nZ2xlU2VhcmNoU3Bpbm5lcigpO1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSBnZXRTZWFyY2hJbnB1dCgpO1xuXG4gICAgYXdhaXQgbG9hZFdlYXRoZXIobG9jYXRpb24pO1xuXG4gICAgdG9nZ2xlU2VhcmNoU3Bpbm5lcigpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlSG9tZUJ1dHRvbkNsaWNrKCkge1xuICAgIGNvbnN0IGhvbWVMb2NhdGlvbiA9IGdldEhvbWVMb2NhdGlvbigpO1xuXG4gICAgaWYgKGhvbWVMb2NhdGlvbiA9PSBudWxsKSB7XG4gICAgICAgIHNob3dCYW5uZXIoJ05vIEhvbWUgTG9jYXRpb24gU2V0JywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVIb21lTG9jYXRpb25TcGlubmVyKCk7XG5cbiAgICBhd2FpdCBsb2FkV2VhdGhlcihob21lTG9jYXRpb24sICdIb21lIExvY2F0aW9uIExvYWRlZCcpO1xuXG4gICAgdG9nZ2xlSG9tZUxvY2F0aW9uU3Bpbm5lcigpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVmcmVzaEJ0bkNsaWNrKCkge1xuICAgIGlmICghc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkpIHtcbiAgICAgICAgc2hvd0Jhbm5lcignTm8gQ3VycmVudCBMb2NhdGlvbiBUbyBSZWZyZXNoJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVSZWZyZXNoU3Bpbm5lcigpO1xuXG4gICAgYXdhaXQgbG9hZFdlYXRoZXIoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCksICdDdXJyZW50IExvY2F0aW9uIFJlZnJlc2hlZCcpO1xuXG4gICAgdG9nZ2xlUmVmcmVzaFNwaW5uZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVuaXRCdG5DbGljaygpIHtcbiAgICBpZiAoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkpIHtcbiAgICAgICAgY29uc3QgY29udmVydFRlbXBGbiA9XG4gICAgICAgICAgICBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cydcbiAgICAgICAgICAgICAgICA/IGNlbHNpdXNUb0ZhcmVuaGVpdFxuICAgICAgICAgICAgICAgIDogZmFyZW5oZWl0VG9DZWxzaXVzO1xuICAgICAgICBjb252ZXJ0VGVtcHMoY29udmVydFRlbXBGbik7XG4gICAgfVxuICAgIHN0YXRlLnRvZ2dsZVVuaXRQcmVmKCk7XG4gICAgdG9nZ2xlVW5pdEJ0bigpO1xuICAgIHNhdmVVbml0UHJlZmVyZW5jZShzdGF0ZS5nZXRVbml0UHJlZigpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNhdmVMb2NhdGlvbigpIHtcbiAgICBpZiAoIXN0YXRlLmdldEN1cnJlbnRMb2NhdGlvbigpKSB7XG4gICAgICAgIHNob3dCYW5uZXIoJ05vIEN1cnJlbnQgTG9jYXRpb24gVG8gU2F2ZScsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2F2ZUhvbWVMb2NhdGlvbihzdGF0ZS5nZXRDdXJyZW50TG9jYXRpb24oKSk7XG5cbiAgICBzaG93QmFubmVyKCdIb21lIExvY2F0aW9uIFNhdmVkJywgJ3N1Y2Nlc3MnKTtcbn1cbiIsImNvbnN0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKTtcblxubGV0IGN1cnJlbnRMb2NhdGlvbiA9IG51bGw7XG5sZXQgdW5pdFByZWYgPSAnY2Vsc2l1cyc7XG5cbmZ1bmN0aW9uIGluaXRBcHBEYXRhc2V0cygpIHtcbiAgICBhcHAuZGF0YXNldC5jdXJyZW50TG9jYXRpb24gPSBudWxsO1xuICAgIGFwcC5kYXRhc2V0LnVuaXRQcmVmID0gJ2NlbHNpdXMnO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRMb2NhdGlvbjtcbn1cblxuZnVuY3Rpb24gc2V0Q3VycmVudExvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgYXBwLmRhdGFzZXQuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG59XG5cbmZ1bmN0aW9uIGdldFVuaXRQcmVmKCkge1xuICAgIHJldHVybiB1bml0UHJlZjtcbn1cblxuZnVuY3Rpb24gc2V0VW5pdFByZWYodW5pdCkge1xuICAgIGlmICh1bml0ICE9PSAnY2Vsc2l1cycgJiYgdW5pdCAhPT0gJ2ZhcmVuaGVpdCcpIHJldHVybjtcbiAgICB1bml0UHJlZiA9IHVuaXQ7XG4gICAgYXBwLmRhdGFzZXQudW5pdFByZWYgPSB1bml0O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVVbml0UHJlZigpIHtcbiAgICBjb25zdCB1bml0ID0gdW5pdFByZWYgPT09ICdjZWxzaXVzJyA/ICdmYXJlbmhlaXQnIDogJ2NlbHNpdXMnO1xuICAgIHNldFVuaXRQcmVmKHVuaXQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcbiAgICBpbml0QXBwRGF0YXNldHMsXG4gICAgZ2V0Q3VycmVudExvY2F0aW9uLFxuICAgIHNldEN1cnJlbnRMb2NhdGlvbixcbiAgICBnZXRVbml0UHJlZixcbiAgICBzZXRVbml0UHJlZixcbiAgICB0b2dnbGVVbml0UHJlZixcbn0pO1xuIiwiY29uc3QgTE9DQUxfU1RPUkFHRV9IT01FX0xPQ0FUSU9OX0tFWSA9ICd3ZWF0aGVyQXBwLmhvbWVMb2NhdGlvbic7XG5jb25zdCBMT0NBTF9TVE9SQUdFX1VOSVRfUFJFRkVSRU5DRV9LRVkgPSAnd2VhdGhlckFwcC51bml0UHJlZmVyZW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlSG9tZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9IT01FX0xPQ0FUSU9OX0tFWSwgbG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9tZUxvY2F0aW9uKCkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0hPTUVfTE9DQVRJT05fS0VZKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVVbml0UHJlZmVyZW5jZSh1bml0KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9VTklUX1BSRUZFUkVOQ0VfS0VZLCB1bml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXRQcmVmZXJlbmNlKCkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1VOSVRfUFJFRkVSRU5DRV9LRVkpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNlbHNpdXNUb0ZhcmVuaGVpdChjZWxzaXVzKSB7XG4gICAgcmV0dXJuIChjZWxzaXVzICogOSkgLyA1ICsgMzI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmYXJlbmhlaXRUb0NlbHNpdXMoZmFyZW5oZWl0KSB7XG4gICAgcmV0dXJuICgoZmFyZW5oZWl0IC0gMzIpICogNSkgLyA5O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5peFRvRGF0ZSh1bml4VGltZVN0YW1wKSB7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gdW5peFRpbWVTdGFtcCAqIDEwMDA7XG5cbiAgICBjb25zdCBkYXRlT2JqZWN0ID0gbmV3IERhdGUobWlsbGlzZWNvbmRzKTtcblxuICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICAgJ0phbicsXG4gICAgICAgICdGZWInLFxuICAgICAgICAnTWFyJyxcbiAgICAgICAgJ0FwcicsXG4gICAgICAgICdNYXknLFxuICAgICAgICAnSnVuJyxcbiAgICAgICAgJ0p1bCcsXG4gICAgICAgICdBdWcnLFxuICAgICAgICAnU2VwJyxcbiAgICAgICAgJ09jdCcsXG4gICAgICAgICdOb3YnLFxuICAgICAgICAnRGVjJyxcbiAgICBdO1xuXG4gICAgY29uc3QgZGF5cyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J107XG5cbiAgICBjb25zdCBkYXkgPSBkYXlzW2RhdGVPYmplY3QuZ2V0RGF5KCldO1xuICAgIGxldCBkYXRlID0gYCR7ZGF0ZU9iamVjdC5nZXREYXRlKCl9YDtcbiAgICBpZiAoZGF0ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZGF0ZSA9IGAwJHtkYXRlfWA7XG4gICAgfVxuICAgIGNvbnN0IG1vbnRoID0gbW9udGhzW2RhdGVPYmplY3QuZ2V0TW9udGgoKV07XG4gICAgY29uc3QgeWVhciA9IGRhdGVPYmplY3QuZ2V0RnVsbFllYXIoKTtcblxuICAgIGNvbnN0IGhvdXIgPSBkYXRlT2JqZWN0LmdldEhvdXJzKCk7XG4gICAgY29uc3QgbWluID0gZGF0ZU9iamVjdC5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2VjID0gZGF0ZU9iamVjdC5nZXRTZWNvbmRzKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkYXksXG4gICAgICAgIGRhdGUsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBob3VyLFxuICAgICAgICBtaW4sXG4gICAgICAgIHNlYyxcbiAgICB9O1xufVxuIiwiaW1wb3J0IGZldGNoSnNvbiBmcm9tICcuLi9hamF4JztcblxuY29uc3QgYXBpS2V5ID0gJ2I4MjcwZmRkY2I4Mzk2MTliZTVjYzFhZjNjZWJkN2ViJztcbmNvbnN0IGN1cnJlbnRBcGlCYXNlID0gJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyJztcbmNvbnN0IGZvcmVjYXN0QXBpQmFzZSA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnJlbnRXZWF0aGVyQXBpVXJsKHsgbG9jYXRpb24sIHVuaXRzIH0pIHtcbiAgICByZXR1cm4gYCR7Y3VycmVudEFwaUJhc2V9P3E9JHtsb2NhdGlvbn0mYXBwaWQ9JHthcGlLZXl9JnVuaXRzPSR7dW5pdHN9YDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3RXZWF0aGVyQXBpVXJsKHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgZXhjbHVkZSwgdW5pdHMgfSkge1xuICAgIHJldHVybiBgJHtmb3JlY2FzdEFwaUJhc2V9P2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmV4Y2x1ZGU9JHtleGNsdWRlfSZhcHBpZD0ke2FwaUtleX0mdW5pdHM9JHt1bml0c31gO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFdlYXRoZXIocXVlcnkpIHtcbiAgICBjb25zdCBhcGlVcmwgPSBjcmVhdGVDdXJyZW50V2VhdGhlckFwaVVybChxdWVyeSk7XG4gICAgcmV0dXJuIGZldGNoSnNvbihhcGlVcmwpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3RXZWF0aGVyKHF1ZXJ5KSB7XG4gICAgY29uc3QgYXBpVXJsID0gY3JlYXRlRm9yZWNhc3RXZWF0aGVyQXBpVXJsKHF1ZXJ5KTtcbiAgICByZXR1cm4gZmV0Y2hKc29uKGFwaVVybCk7XG59XG4iLCJpbXBvcnQgdW5peFRvRGF0ZSBmcm9tICcuLi91dGlscy91bml4VG9EYXRlJztcblxuaW1wb3J0IHsgZ2V0Q3VycmVudFdlYXRoZXIsIGdldEZvcmVjYXN0V2VhdGhlciB9IGZyb20gJy4vd2VhdGhlckFwaSc7XG5cbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XG5cbmltcG9ydCB7XG4gICAgc2hvd0Jhbm5lcixcbiAgICBzaG93RGlzcGxheSxcbiAgICBoaWRlQmFubmVyLFxuICAgIHVuRm9jdXNJbnB1dCxcbiAgICB1cGRhdGVDdXJyZW50RGlzcGxheSxcbiAgICB1cGRhdGVGb3JlY2FzdERpc3BsYXksXG59IGZyb20gJy4uL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGxvYWRXZWF0aGVyKGxvY2F0aW9uLCBtc2cpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pO1xuXG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgICBoaWRlQmFubmVyKCk7XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q3VycmVudExvY2F0aW9uKCkgPT0gbnVsbCkge1xuICAgICAgICBzaG93RGlzcGxheSgpO1xuICAgIH1cblxuICAgIHN0YXRlLnNldEN1cnJlbnRMb2NhdGlvbihkYXRhLmN1cnJlbnREYXRhLmxvY2F0aW9uKTtcblxuICAgIHVwZGF0ZUN1cnJlbnREaXNwbGF5KGRhdGEuY3VycmVudERhdGEpO1xuICAgIHVwZGF0ZUZvcmVjYXN0RGlzcGxheShkYXRhLmZvcmVjYXN0RGF0YSk7XG4gICAgdW5Gb2N1c0lucHV0KCk7XG5cbiAgICBpZiAobXNnKSB7XG4gICAgICAgIHNob3dCYW5uZXIobXNnLCAnc3VjY2VzcycpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBjb25zdCBjdXJyZW50UXVlcnkgPSBjcmVhdGVDdXJyZW50V2VhdGhlclF1ZXJ5KGxvY2F0aW9uKTtcblxuICAgIGxldCBjdXJyZW50RGF0YSA9IGF3YWl0IGVycm9ySGFuZGxlcihnZXRDdXJyZW50V2VhdGhlciwgY3VycmVudFF1ZXJ5KTtcblxuICAgIGlmICghY3VycmVudERhdGEpIHJldHVybiBmYWxzZTtcblxuICAgIGN1cnJlbnREYXRhID0gcHJvY2Vzc0N1cnJlbnRXZWF0aGVyKGN1cnJlbnREYXRhKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0UXVlcnkgPSBjcmVhdGVGb3JlY2FzdFdlYXRoZXJRdWVyeShjdXJyZW50RGF0YSk7XG4gICAgbGV0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0V2VhdGhlcihmb3JlY2FzdFF1ZXJ5KTtcblxuICAgIGlmICghZm9yZWNhc3REYXRhKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3JlY2FzdERhdGEgPSBwcm9jZXNzRm9yZWNhc3RXZWF0aGVyKGZvcmVjYXN0RGF0YSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50RGF0YSxcbiAgICAgICAgZm9yZWNhc3REYXRhLFxuICAgIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihhcGlGdW5jdGlvbiwgcXVlcnkpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpRnVuY3Rpb24ocXVlcnkpO1xuXG4gICAgICAgIGlmIChkYXRhLmNvZCAhPT0gMjAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNob3dCYW5uZXIoZXJyb3IubWVzc2FnZSwgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBkYXRhLnN5cy5jb3VudHJ5XG4gICAgICAgID8gYCR7ZGF0YS5uYW1lfSwgJHtkYXRhLnN5cy5jb3VudHJ5fWBcbiAgICAgICAgOiBgJHtkYXRhLm5hbWV9YDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIGljb25Vcmw6IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYCxcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uU3RyaW5nLFxuICAgICAgICB0ZW1wOiBkYXRhLm1haW4udGVtcCxcbiAgICAgICAgbGF0aXR1ZGU6IGRhdGEuY29vcmQubGF0LFxuICAgICAgICBsb25naXR1ZGU6IGRhdGEuY29vcmQubG9uLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdFdlYXRoZXIoZGF0YSkge1xuICAgIHJldHVybiBkYXRhLmRhaWx5Lm1hcCgoZGF5KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB1bml4VG9EYXRlKGRheS5kdCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRlU2hvcnQ6IGAke2RhdGUuZGF5fSwgJHtkYXRlLm1vbnRofSAke2RhdGUuZGF0ZX1gLFxuICAgICAgICAgICAgZGF5VGVtcDogZGF5LnRlbXAuZGF5LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgaWNvblVybDogYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RheS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2AsXG4gICAgICAgICAgICBuaWdodFRlbXA6IGRheS50ZW1wLm5pZ2h0LFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDdXJyZW50V2VhdGhlclF1ZXJ5KGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIHVuaXRzOiBzdGF0ZS5nZXRVbml0UHJlZigpID09PSAnY2Vsc2l1cycgPyAnbWV0cmljJyA6ICdpbXBlcmlhbCcsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3RXZWF0aGVyUXVlcnkoeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsYXRpdHVkZSxcbiAgICAgICAgbG9uZ2l0dWRlLFxuICAgICAgICBleGNsdWRlOiAnYWxlcnRzLGhvdXJseSxtaW51dGVseSxjdXJyZW50JyxcbiAgICAgICAgdW5pdHM6IHN0YXRlLmdldFVuaXRQcmVmKCkgPT09ICdjZWxzaXVzJyA/ICdtZXRyaWMnIDogJ2ltcGVyaWFsJyxcbiAgICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9tb2R1bGVzL3N0YXRlJztcblxuaW1wb3J0IHsgZ2V0SG9tZUxvY2F0aW9uLCBnZXRVbml0UHJlZmVyZW5jZSB9IGZyb20gJy4vbW9kdWxlcy9zdG9yYWdlJztcblxuaW1wb3J0IHtcbiAgICBoYW5kbGVIb21lQnV0dG9uQ2xpY2ssXG4gICAgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrLFxuICAgIGhhbmRsZVNhdmVMb2NhdGlvbixcbiAgICBoYW5kbGVVbml0QnRuQ2xpY2ssXG4gICAgaGFuZGxlV2VhdGhlclNlYXJjaCxcbn0gZnJvbSAnLi9tb2R1bGVzL2V2ZW50TGlzdGVuZXJzJztcblxuaW1wb3J0IHsgdG9nZ2xlVW5pdEJ0biB9IGZyb20gJy4vbW9kdWxlcy9kb20nO1xuXG5pbXBvcnQgbG9hZFdlYXRoZXIgZnJvbSAnLi9tb2R1bGVzL3dlYXRoZXIvd2VhdGhlckZ1bmN0aW9ucyc7XG5cbmluaXRBcHAoKTtcblxuZnVuY3Rpb24gaW5pdEFwcCgpIHtcbiAgICBzdGF0ZS5pbml0QXBwRGF0YXNldHMoKTtcbiAgICBpbml0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBsb2FkVXNlclNldHRpbmdzKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXJfX2Zvcm0nKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZVdlYXRoZXJTZWFyY2gpO1xuXG4gICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lLWJ0bicpO1xuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVIb21lQnV0dG9uQ2xpY2spO1xuXG4gICAgY29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2dnbGUtdW5pdC1idG4nKTtcbiAgICB1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVW5pdEJ0bkNsaWNrKTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZS1idG4nKTtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2F2ZUxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaC1idG4nKTtcbiAgICByZWZyZXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUmVmcmVzaEJ0bkNsaWNrKTtcbn1cblxuZnVuY3Rpb24gbG9hZFVzZXJTZXR0aW5ncygpIHtcbiAgICBsb2FkVW5pdFByZWZlcmVuY2UoKTtcbiAgICBsb2FkSG9tZUxvY2F0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRVbml0UHJlZmVyZW5jZSgpIHtcbiAgICBjb25zdCB1bml0UHJlZiA9IGdldFVuaXRQcmVmZXJlbmNlKCk7XG5cbiAgICBpZiAodW5pdFByZWYgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY3VycmVudFVuaXQgPSBzdGF0ZS5nZXRVbml0UHJlZigpO1xuXG4gICAgaWYgKHVuaXRQcmVmICE9PSBjdXJyZW50VW5pdCkge1xuICAgICAgICB0b2dnbGVVbml0QnRuKCk7XG4gICAgICAgIHN0YXRlLnRvZ2dsZVVuaXRQcmVmKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkSG9tZUxvY2F0aW9uKCkge1xuICAgIGNvbnN0IGhvbWVMb2NhdGlvbiA9IGdldEhvbWVMb2NhdGlvbigpO1xuXG4gICAgaWYgKGhvbWVMb2NhdGlvbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICBsb2FkV2VhdGhlcihob21lTG9jYXRpb24pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==