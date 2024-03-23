import React from 'react';
import Mapcard from './Mapcard'; 

const MapList = ({ maps }) => {
  if (!maps || maps.length === 0) return null; // Early return if no maps

  return (
    <div>
      {maps.map(map => (
        <Mapcard key={map.map_id} map={map} />
      ))}
    </div>
  );
};

export default MapList;
