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

export function showBanner(msg, type = 'error') {
    bannerEl.textContent = msg;

    bannerEl.classList.add('banner--active');

    bannerEl.style.backgroundColor =
        type === 'error' ? 'var(--color-red)' : 'var(--color-green)';

    endAndStartBannerTimer();
}

export function hideBanner() {
    bannerEl.textContent = '';

    bannerEl.classList.remove('banner--active');
}

// display updaters
function toggleSpinner(element) {
    element.classList.toggle('display-none');
    element.nextElementSibling.classList.toggle('display-block');
    element.nextElementSibling.classList.toggle('display-none');
}

export function toggleSearchSpinner() {
    toggleSpinner(searchSpinner);
}

export function toggleHomeLocationSpinner() {
    toggleSpinner(homeLocationSpinner);
}

export function toggleRefreshSpinner() {
    toggleSpinner(refreshSpinner);
}

export function toggleUnitBtn() {
    const activeUnitEl = document.querySelector('[data-active-unit]');
    const notActiveUnitEl = document.querySelector('[data-not-active-unit]');

    activeUnitEl.classList.remove('nav__unit-active');
    activeUnitEl.removeAttribute('data-active-unit');
    activeUnitEl.setAttribute('data-not-active-unit', '');

    notActiveUnitEl.classList.add('nav__unit-active');
    notActiveUnitEl.removeAttribute('data-not-active-unit');
    notActiveUnitEl.setAttribute('data-active-unit', '');
}

export function showDisplay() {
    resultsSection.classList.remove('display-none');
    forecastSection.classList.remove('display-none');
    resultsSection.classList.add('display-flex');
    forecastSection.classList.add('display-flex');
}

export function updateDisplay(data, data2) {
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

export function convertTemps(convertTemp) {
    tempEls.forEach((el) => {
        const newTemp = convertTemp(el.dataset.temp);
        el.textContent = Math.round(newTemp);
        el.dataset.temp = newTemp;
    });
}

// functions to get values
export function getSearchInput() {
    return input.value;
}
