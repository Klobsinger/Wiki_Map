import { Box, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const MapCard = ({ map }) => {
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
      <Text fontSize="xl" fontWeight="bold" mb={2}>{map.map_title}</Text>
      <Text mb={4}>{map.map_description}</Text>
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
   />
))}

        </GoogleMap>
      </LoadScriptNext>
    </Box>
  );
}


export default MapCard;