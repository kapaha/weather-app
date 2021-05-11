const LOCAL_STORAGE_HOME_LOCATION_KEY = 'weatherApp.homeLocation';
const LOCAL_STORAGE_UNIT_PREFERENCE_KEY = 'weatherApp.unitPreference';

export function saveHomeLocation(location) {
    localStorage.setItem(LOCAL_STORAGE_HOME_LOCATION_KEY, location);
}

export function getHomeLocation() {
    return localStorage.getItem(LOCAL_STORAGE_HOME_LOCATION_KEY);
}

export function saveUnitPreference(unit) {
    localStorage.setItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY, unit);
}

export function getUnitPreference() {
    return localStorage.getItem(LOCAL_STORAGE_UNIT_PREFERENCE_KEY);
}
