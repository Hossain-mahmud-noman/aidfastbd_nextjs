// components/LocationSaver.js
'use client';

import { useEffect, useState } from 'react';

const LocationSaver = () => {
  const [status, setStatus] = useState('Getting location...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Send location to API to set HTTP-only cookie
          const response = await fetch('/api/set-location-cookie', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat: latitude, lon: longitude }),
          });

          if (response.ok) {
            setStatus('Location saved successfully.');
          } else {
            setStatus('Failed to save location.');
          }
        },
        (error) => {
          console.error('Error getting location', error);
          setStatus('Failed to get location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setStatus('Geolocation is not supported.');
    }
  }, []);

  return <p>{status}</p>;
};

export default LocationSaver;
