import './App.css';
import WeatherCard from './components/WeatherCard/WeatherCard';
import React, { useState } from 'react';

import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="toggle-button-container">
        <button className="toggle-button" onClick={handleToggle}>
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
      <WeatherCard />
    </div>
  );
};

export default App;

