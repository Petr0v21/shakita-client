import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Libraries,
} from '@react-google-maps/api';

const libraries: Libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '40vh',
};
const center = {
  lat: 48.677951329701045,
  lng: 28.859801715595555,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyATl4r2NDDpWf8Ff22GpsOXQAYI21bSQYg',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
