"use client";

import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { map_key } from "../../../utils/constants.js";
import { FiSearch, FiTarget, FiX } from "react-icons/fi";

const Location = () => {
  const inputRef = useRef(null);
  const router = useRouter();

  let defaultLat = 23.8103;
  let defaultLng = 90.4125;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: defaultLat, lng: defaultLng });
  const [searchLocation, setSearchLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationName, setLocationName] = useState("Unknown Location");
  const [error, setError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: map_key,
    libraries: ["places"]
  });

  const fetchLocationName = async (lat, lng, optionalName = null) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${map_key}`
      );
      const data = await response.json();
      let name = "Unknown Location";
      if (data.results && data.results.length > 0) {
        name = data.results[0].formatted_address;
        setLocationName(name);
      } else {
        setLocationName(name);
      }

      await fetch("/api/set-location-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, name: optionalName || name }),
      });
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location");
    }
  };

  const handleSearchLocation = (e) => {
    const input = e.target.value;
    setSearchLocation(input);

    if (!input || !window.google || !window.google.maps) {
      setSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (predictions, status) => {
      if (status === "OK") {
        setSuggestions(predictions || []);
      } else {
        setSuggestions([]);
      }
    });
  };

  const handleSelectSuggestion = (placeId) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setMapCenter({ lat, lng });
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lng);
        setLocationName(results[0].formatted_address);
        setSuggestions([]);
        setSearchLocation(results[0].formatted_address);
      } else {
        setError("Location not found");
      }
    });
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          await fetchLocationName(latitude, longitude);
          localStorage.setItem("lat", latitude);
          localStorage.setItem("lon", longitude);
          setIsModalOpen(false);
        },
        async () => {
          setMapCenter({ lat: defaultLat, lng: defaultLng });
          await fetchLocationName(defaultLat, defaultLng);
          setIsModalOpen(false);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  const handleMarkerDrag = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMapCenter({ lat: newLat, lng: newLng });
    localStorage.setItem("lat", newLat);
    localStorage.setItem("lon", newLng);
    fetchLocationName(newLat, newLng);
  };

  const handleConfirmLocation = async () => {
    setIsModalOpen(false);
    await fetchLocationName(mapCenter.lat, mapCenter.lng);
    localStorage.setItem("lat", mapCenter.lat);
    localStorage.setItem("lon", mapCenter.lng);
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const cleanLocationName = locationName.replace(/^[^,]+,\s*/, '');
  const formattedShortLocation =
    cleanLocationName.length > 20 ? cleanLocationName.slice(0, 20) + "..." : cleanLocationName;
  const formattedShortLocationMobile =
    cleanLocationName.length > 6 ? cleanLocationName.slice(0, 6) + "..." : cleanLocationName;

  return (
    <div>
      <div className="flex gap-0 sm:gap-2 items-center">
        <div
          className="flex items-center space-x-1 cursor-pointer select-none"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="hidden md:flex">
            <Tooltip title={locationName}>
              <div className="description1 text-[#212121]">{formattedShortLocation}</div>
            </Tooltip>
          </div>
          <div className="flex md:hidden">
            <Tooltip title={locationName}>
              <div className="description1 text-[#212121]">{formattedShortLocationMobile}</div>
            </Tooltip>
          </div>
          <button aria-label="Select location">
            <Image src="/home/map.png" width={30} height={30} alt="Location" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 shadow-xl z-10">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Select Location</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="relative mb-3">
                <input
                  ref={inputRef}
                  value={searchLocation}
                  onChange={handleSearchLocation}
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Search location"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-600" />
                {suggestions.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-auto">
                    {suggestions.map((sugg) => (
                      <div
                        key={sugg.place_id}
                        onClick={() => handleSelectSuggestion(sugg.place_id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {sugg.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-96 mb-4">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerClassName="w-full h-full rounded-lg"
                    center={mapCenter}
                    zoom={13}
                  >
                    <Marker
                      position={mapCenter}
                      draggable={true}
                      onDragEnd={handleMarkerDrag}
                    />
                  </GoogleMap>
                ) : (
                  <p>Loading map...</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={fetchCurrentLocation}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  <FiTarget className="inline-block mr-2" /> Get Current Location
                </button>

                <button
                  onClick={handleConfirmLocation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Confirm Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
