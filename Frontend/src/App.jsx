import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Cityinfo from './components/Cityinfo';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <VStack spacing={8} justify="center" align="center" height="100vh" bg="teal.500" color="white">
            <Text fontSize="5xl" fontWeight="bold">Welcome to WikiMaps</Text>
            <Text fontSize="xl">Explore cities and discover wonders.</Text>
            <Button colorScheme="teal" variant="outline" size="lg">
              Get Started
            </Button>
          </VStack>
        } />
        <Route path="/city/:cityId" element={<Cityinfo />} />
      </Routes>
    </>
  );
}

export default App;
