import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CityDetail = () => {
  const [city, setCity] = useState(null);
  const { cityId } = useParams();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cities/${cityId}`);
        setCity(response.data);
      } catch (error) {
        console.error('Failed to fetch city data:', error);
      }
    };

    fetchCityData();
  }, [cityId]);

  if (!city) {
    return <Text>Loading city details...</Text>;
  }

  const mapContainerStyle = {
    width: '600px',
    height: '400px',
  };

  const center = {
    lat: parseFloat(city.latitude),
    lng: parseFloat(city.longitude),
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">{city.name}</Text>
      <Text>{city.description}</Text>
      <Box>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={city.zoom_level}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Box>
    </VStack>
  );
};

export default CityDetail;
