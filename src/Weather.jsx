import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [city, setCity] = useState("Ragusa, IT"); 
    const [weather, setWeather] = useState({});
// updated api key
    const api = {
        key: import.meta.env.VITE_OPENWEATHER_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/"
    }

    useEffect(() => {
        const intervalId = setInterval(() => fetchData(city), 10 * 60 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [city]); 

    function fetchData(city) {
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then(result => {
                setWeather(result);
                console.log(result)
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function getWeatherIcon(iconCode) {
        const base = "https://raw.githubusercontent.com/kleon-web-dev/weather-icons/main/";
    
        const iconReplacements = {
            "03n": "03d",
            "04n": "04d",
            "09n": "09d",
            "11n": "11d",
            "13n": "13d",
            "50n": "50d"
        };
    
        return `${base}${iconReplacements[iconCode] || iconCode}.png`;
    }
    

    return (
        <div className='weather-container'>
            <div className="sb-container">
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder='Cerca Città'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    /></div>
                <div className="search-button-container"><button onClick={() => fetchData(city)}>Cerca</button></div>
            </div>
            

            {weather.main && (
                <div className='weather-display'>
                    <div className='weather-name'>{weather.name}</div>
                    <img src={getWeatherIcon(weather.weather[0].icon)} className='weather-icon'/>
                    
                    <div className="weather-info-display">
                        <div>Temperatura: {Math.floor(weather.main.temp)} °C</div>
                        <div>Percepita come: {Math.floor(weather.main.feels_like)} °C</div>
                        <div>Umidità: {weather.main.humidity} %</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
