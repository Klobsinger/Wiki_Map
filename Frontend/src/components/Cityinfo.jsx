import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Weather from './Weather';
import MapCard from './Mapcard';

const CityDetail = () => {
  const [city, setCity] = useState(null);
  const [map, setMap] = useState(null);
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

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/maps/${cityId}`);
        if (response.data && response.data.length > 0) {
          setMap(response.data[0]);
        } else {
          setMap(null); // Explicitly set map to null if no data is found
        }
      } catch (error) {
        console.error('Failed to fetch map data:', error);
        setMap(null); 
      }
    };
  
    fetchMapData();
  }, [cityId]);


  if (!city) {
    return <Text>Loading city details...</Text>;
  }

  const mapContainerStyle = {
    width: '700px',
    height: '500px',
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
        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={city.zoom_level}
          >
          </GoogleMap>
        </LoadScriptNext>
        {city && <Weather latitude={city.latitude} longitude={city.longitude} />}
      </Box>
      {map && <MapCard key={map.map_id} map={map} />}

    </VStack>
  );
};

export default CityDetail;
