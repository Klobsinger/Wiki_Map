import React, { useState, useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Weather from './Weather';
import MapList from './Maplist';
import MapCreate from './Mapcreate';

const CityDetail = () => {
  const [city, setCity] = useState(null);
  const [maps, setMap] = useState([]);
  const { cityId } = useParams();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const fetchMapData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/maps/city/${cityId}`);
      if (response.data && response.data.length > 0) {
        setMap(response.data[0].maps); // Assuming response.data is the array of maps
      } else {
        setMap([]); // Use an empty array to indicate no maps found
      }
    } catch (error) {
      console.error('Failed to fetch map data:', error);
      setMap([]); 
    }
  };

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
      <MapCreate cityInfo={city} onMapCreated={fetchMapData} />
      <MapList maps={maps} />
    </VStack>
  );
};

export default CityDetail;
