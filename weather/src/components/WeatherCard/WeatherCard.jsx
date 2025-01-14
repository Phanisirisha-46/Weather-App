import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherCard.css';
import { WiHumidity, WiBarometer, WiCloudy, WiWindy } from 'react-icons/wi';

const WeatherCard = () => {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState({
    current: {
      temperature: 26,
      condition: "Mist",
      sunrise: "06:49 AM",
      sunset: "06:00 PM",
      humidity: 61,
      pressure: 1015,
      visibility: 3000,
      windSpeed: 6.17,
    },
    forecast: [],
  });

  const fetchWeather = async () => {
    const apiKey = "f1c7282cb5c2421dba374021251401"; // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      setWeather({
        current: {
          temperature: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb,
          visibility: data.current.vis_km * 1000,
          windSpeed: data.current.wind_kph / 3.6,
        },
        forecast: data.forecast.forecastday.map((day) => ({
          date: day.date,
          minTemp: Math.round(day.day.mintemp_c),
          maxTemp: Math.round(day.day.maxtemp_c),
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        })),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="weather-card-container">
      <div className="weather-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>🔍</button>
        </div>
        <div className="weather-info">
          <div className="weather-icon">
            <img
              src={`https:${weather.forecast[0]?.icon}`}
              alt={weather.current.condition}
            />
          </div>
          <h2>{weather.current.temperature}°C</h2>
          <p>{weather.current.condition}</p>
          <p>Sunrise: {weather.current.sunrise}</p>
          <p>Sunset: {weather.current.sunset}</p>
        </div>
        <div className="additional-info">
          <div className="info-item">
            <WiHumidity /> <span>Humidity: {weather.current.humidity}%</span>
          </div>
          <div className="info-item">
            <WiBarometer /> <span>Pressure: {weather.current.pressure} hPa</span>
          </div>
          <div className="info-item">
            <WiCloudy /> <span>Visibility: {weather.current.visibility} m</span>
          </div>
          <div className="info-item">
            <WiWindy /> <span>Wind: {weather.current.windSpeed.toFixed(2)} m/s</span>
          </div>
        </div>
      </div>

      <div className="forecast-card">
        <h3>3-Day Forecast</h3>
        <div className="nyc-icon">
          <img src="https://cdn1.iconfinder.com/data/icons/ui-glynh-04-of-5/100/UI_Glyph_07-19-512.png" alt="Forecast Icon" />
        </div>
        <div className="weather-forecast">
          {weather.forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <p>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}</p>
              <img src={`https:${day.icon}`} alt={day.condition} />
              <p>{day.condition}</p>
              <p>
                {day.minTemp}°C / {day.maxTemp}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
