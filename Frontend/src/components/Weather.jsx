import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, VStack } from '@chakra-ui/react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog } from 'react-icons/wi';
const Weather = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeather(response.data);
        console.log("Weather data:", response.data);
      })
      .catch(error => console.error("Failed to fetch weather data:", error));
  }, [latitude, longitude]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size="48" />;
      case 'Clouds':
        return <WiCloudy size="48" />;
      case 'Rain':
        return <WiRain size="48" />;
      case 'Snow':
        return <WiSnow size="48" />;
      case 'Fog':
        return <WiFog size="48" />;
      default:
        return <WiDaySunny size="48" />; // Default to sunny icon
    }
  };

  if (!weather) return <Text>Loading weather...</Text>;

  return (
    <VStack bg="blue.100" p={4} borderRadius="md">
      {/* Dynamically choose icon based on weather condition */}
      {getWeatherIcon(weather.weather[0].main)}
      <Text>{weather.main.temp} °C</Text>
      <Text>{weather.weather[0].main}</Text>
    </VStack>
  );
};

export default Weather;