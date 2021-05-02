export default function weatherApiFactory() {
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
