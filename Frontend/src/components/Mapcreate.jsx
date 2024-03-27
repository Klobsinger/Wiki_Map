import React, { useState } from 'react';
import { 
  Box, Text, Input, Textarea, Button, VStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, 
} from '@chakra-ui/react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const MapCreate = ({ cityInfo }) => {
  // State for the map's title and description
  const [mapTitle, setMapTitle] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  // State for managing pins on the map
  const [pins, setPins] = useState([]);
  // State to control the visibility of the modal for adding a new pin
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Draft state for the new pin being added
  const [draftPin, setDraftPin] = useState({ lat: null, lng: null, title: '', description: '' });

  // Google Map container styling
  const mapContainerStyle = {
    width: '700px',
    height: '500px',
  };

  // Determine the starting position of the map
  const center = cityInfo ? {
    lat: parseFloat(cityInfo.latitude),
    lng: parseFloat(cityInfo.longitude),
  } : {
    lat: 0, // Fallback coordinates
    lng: 0,
  };

  //Google Maps API key
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Handles clicks on the map to add a new pin
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    // Update the draft pin with the clicked location
    setDraftPin({ lat, lng, title: '', description: '' });
    // Open the modal to edit the new pin's details
    setIsModalOpen(true);
  };

  // Adds the draft pin to the list of pins
  const addPin = () => {
    setPins([...pins, draftPin]);
    setIsModalOpen(false); // Close the modal after adding
  };

  // Handles the submission of the form to create a new map
  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you would integrate with your backend to save the map
    console.log('Submitting', { mapTitle, mapDescription, pins });
  };

  return (
    <>
      {/* Form for creating a new map */}
      <VStack as="form" onSubmit={handleSubmit} spacing={4} p={4} boxShadow="md" borderRadius="lg" borderWidth="1px" overflow="hidden">
        <Text fontSize="xl" fontWeight="bold">Create a New Map</Text>
        
        {/* Inputs for map title and description */}
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
        
        {/* Google Map component */}
        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
          >
            {/* Displaying markers for each pin */}
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
      
      {/* Modal for adding/editing a pin */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Pin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Inputs for new pin title and description */}
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
            <Button colorScheme="blue"
               mr={3} onClick={addPin}>
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
