export default function stateFactory() {
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

    return {
        getCurrentLocation,
        setCurrentLocation,
        getCurrentTemp,
        setCurrentTemp,
        getUnitPref,
        setUnitPref,
        toggleUnitPref,
    };
}
