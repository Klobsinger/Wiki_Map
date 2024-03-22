import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, VStack, Button, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Cityinfo from './components/Cityinfo';

function App() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      {/* Main content area with consistent padding from the top */}
      <Box as="main" paddingTop="4rem" flex="1">
        <Routes>
          <Route path="/" element={
            <VStack spacing={8} justify="center" align="center" height="full" bg="teal.500" color="white">
              <Text fontSize="5xl" fontWeight="bold">Welcome to WikiMaps</Text>
              <Text fontSize="xl">Explore cities and discover wonders.</Text>
              <Button colorScheme="teal" variant="outline" size="lg">
                Get Started
              </Button>
            </VStack>
          } />
          <Route path="/city/:cityId" element={<Cityinfo />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
