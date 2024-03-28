import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

const PinInfoWindow = ({ pin, onClose }) => {
    return (
        <InfoWindow
          position={{ lat: pin.pin_latitude, lng: pin.pin_longitude }}
          onCloseClick={onClose}
        >
            <div>
                <h2>{pin.pin_title}</h2>
                <p>{pin.pin_description}</p>
            </div>
        </InfoWindow>
    );
};

export default PinInfoWindow;
