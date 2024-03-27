import React, { useState } from 'react';
import { Box, Text, Input, Textarea, Button, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const MapCreate = ({ cityInfo }) => {
  const [mapTitle, setMapTitle] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  const [pins, setPins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftPin, setDraftPin] = useState({ lat: null, lng: null, title: '', description: '' });
  
  
  // Styling for the Google Map container
  const mapContainerStyle = {
    width: '700px',
    height: '500px',
  };

  // Starting position for the map, fallback to a default if no cityInfo is provided
  const center = cityInfo ? {
    lat: parseFloat(cityInfo.latitude),
    lng: parseFloat(cityInfo.longitude),
  } : {
    lat: 0, // Default coordinates
    lng: 0,
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setDraftPin({ lat, lng, title: '', description: '' }); // Reset title and description for new pin
    setIsModalOpen(true);
  };

  const addPin = () => {
    setPins([...pins, draftPin]);
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting', { mapTitle, mapDescription });
    //logic to send the map data to your backend
  };

  return (
    <>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} p={4} boxShadow="md" borderRadius="lg" borderWidth="1px" overflow="hidden">
        <Text fontSize="xl" fontWeight="bold">Create a New Map</Text>
        <Input
          placeholder="Map Title"
          value={mapTitle}
          onChange={(e) => setMapTitle(e.target.value)}
        />
        <Textarea
          placeholder="Map Description"
          value={mapDescription}
          onChange={(e) => setMapDescription(e.target.value)}
        />
        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={(e) => handleMapClick(e)}
          >
            {pins.map(pin => (
              <Marker
                key={`${pin.lat}-${pin.lng}`}
                position={{ lat: pin.lat, lng: pin.lng }}
              />
            ))}
          </GoogleMap>
        </LoadScriptNext>
        <Button type="submit" colorScheme="blue">Create Map</Button>
      </VStack>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Pin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Pin Title"
              value={draftPin.title}
              onChange={(e) => setDraftPin({ ...draftPin, title: e.target.value })}
            />
            <Textarea
              mt={4}
              placeholder="Pin Description"
              value={draftPin.description}
              onChange={(e) => setDraftPin({ ...draftPin, description: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addPin}>
              Add Pin
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  
};

export default MapCreate;
