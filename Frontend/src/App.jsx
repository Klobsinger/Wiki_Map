import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <LoadScript
      googleMapsApiKey='YOUR_API_KEY'
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

export default App
