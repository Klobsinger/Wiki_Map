import './App.css';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

function App() {
  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: -25.344,
    lng: 131.036
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
      >
        <Marker
          position={center}
          title="Uluru"
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default App;
