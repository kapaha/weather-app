export default function stateFactory() {
    const app = document.querySelector('#app');

    let currentLocation = null;
    let unitPref = 'celsius';

    app.dataset.currentLocation = currentLocation;
    app.dataset.unitPref = unitPref;

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

    return {
        getCurrentLocation,
        setCurrentLocation,
        getUnitPref,
        setUnitPref,
        toggleUnitPref,
    };
}
