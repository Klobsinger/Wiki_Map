import { Text } from '@chakra-ui/react';
import React from 'react';
import MapCard from './Mapcard'; 

const MapList = ({ maps }) => {
  // Filter out maps with no pins before rendering
  const mapsWithPins = maps?.filter(map => map.pins && map.pins.length > 0);

  if (!maps || mapsWithPins.length === 0) {
    return <Text>No user-generated maps with pins available for this city.</Text>;
  }

  return (
    <div>
      {mapsWithPins.map(map => (
        <MapCard key={map.map_id} map={map} />
      ))}
    </div>
  );
};

export default MapList;