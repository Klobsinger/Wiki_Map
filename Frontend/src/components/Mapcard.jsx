import React, { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker, InfoWindow } from '@react-google-maps/api';

const MapCard = ({ map }) => {
  const [selectedPin, setSelectedPin] = useState(null);
  if (!map) return null; // Early return if map is not available


  const mapContainerStyle = {
    width: '700px',
    height: '500px',
  }

  const center = {
    lat: map.pins[0]?.pin_latitude || 0,
    lng: map.pins[0]?.pin_longitude || 0,
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Box p={4} boxShadow="md" borderRadius="lg" borderWidth="1px" overflow="hidden">
      <Text fontSize="xl" fontWeight="semibold">{map.map_title}</Text>
      <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          {map.pins.map(pin => (
            <Marker
              key={pin.pin_id}
              position={{ lat: pin.pin_latitude, lng: pin.pin_longitude }}
              title={pin.pin_title}
              onClick={() => setSelectedPin(pin)} // Set selectedPin on click
            >
              {selectedPin && selectedPin.pin_id === pin.pin_id && (
                <InfoWindow
                  position={{ lat: pin.pin_latitude, lng: pin.pin_longitude }}
                  onCloseClick={() => setSelectedPin(null)} // Clear selectedPin on close
                >
                  <div>
                    <h2>{pin.pin_title}</h2>
                    <p>{pin.pin_description}</p>
                    {/* Display additional information or an image if available */}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScriptNext>
    </Box>
  );
};


export default MapCard;