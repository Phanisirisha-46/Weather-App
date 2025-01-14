import React from 'react';
import './WeatherBackground.css';

const WeatherBackground = ({ temperature, condition }) => {
  let backgroundImage;

  // Select background image based on weather condition
  if (condition.toLowerCase().includes('rain')) {
    backgroundImage = '/assets/rain.png';  // Path to your rain image
  } else if (temperature > 30) {
    backgroundImage = '/assets/summer.png';  // Path to your summer image
  } else if (temperature <= 0) {
    backgroundImage = '/assets/winter.png';  // Path to your winter image
  } else if (condition.toLowerCase().includes('cloud')) {
    backgroundImage = '/assets/cloudy.png';  // Path to your cloudy image
  } else {
    backgroundImage = '/assets/sky.png';  // Default to sky image
  }

  return (
    <div
      className="weather-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        borderRadius: '10px', // Ensure the background image matches the border-radius
      }}
    />
  );
};

export default WeatherBackground;
