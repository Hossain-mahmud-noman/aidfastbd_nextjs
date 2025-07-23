'use client';

import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { map_key } from "../utils/constants";

// Define container style for the map
const containerStyle = {
  "inline-size": "100%",
  "block-size": "400px",
};

function MapComponent({ onLocationSelect, lat, lon }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: map_key, 
    libraries: ["places"], 
  });


  const [markerPosition, setMarkerPosition] = useState({
    lat: lat ?? 23.8103, 
    lng: lon ?? 90.4125, 
  });

  const [zoomLevel, setZoomLevel] = useState(13); 
  const autocompleteRef = useRef(null); 

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    onLocationSelect(lat, lng);
  };

  const handleMarkerDrag = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    onLocationSelect(newLat, newLng); 
  };

  const handlePlaceChanged = () => {


    if (autocompleteRef.current) {

      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        const newLat = lat();
        const newLng = lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        setZoomLevel(16); 
        onLocationSelect(newLat, newLng);
      }
    }
  };

  useEffect(() => {

    if (lat !== undefined && lon !== undefined) {

      setMarkerPosition({ lat, lng: lon });
      setZoomLevel(16); 
    }
  }, [lat, lon]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div>
      <Autocomplete
        className="z-[1000000]"
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={zoomLevel}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        />
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
