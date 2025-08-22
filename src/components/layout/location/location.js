"use client";

import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { map_key } from "../../../utils/constants.js";
import { FiSearch, FiTarget, FiX } from "react-icons/fi";
import { useI18n } from "../../../context/i18n.js";

const Location = () => {
  const i18n = useI18n();
  const inputRef = useRef(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [searchLocation, setSearchLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationName, setLocationName] = useState("Detecting location...");
  const [fullAddress, setFullAddress] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeolocating, setIsGeolocating] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: map_key,
    libraries: ["places"]
  });

  const formatAddress = (results) => {
    if (!results || results.length === 0) return "Location not specified";
    const preciseAddress = results.find(result =>
      result.types.includes("street_address") ||
      result.types.includes("premise")
    ) || results[0];
    return preciseAddress.formatted_address;
  };

  const getDisplayName = (components) => {
    const streetNumber = components.find(c => c.types.includes("street_number"));
    const route = components.find(c => c.types.includes("route"));
    const locality = components.find(c => c.types.includes("locality"));

    if (streetNumber && route) {
      return `${streetNumber.long_name}, ${route.long_name}`;
    }
    if (route) {
      return route.long_name;
    }
    return locality?.long_name || "Current Location";
  };

  const fetchLocationDetails = async (lat, lng) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${map_key}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedAddress = formatAddress(data.results);
        const displayName = getDisplayName(data.results[0].address_components);

        setFullAddress(formattedAddress);
        setLocationName(displayName);

        await fetch("/api/set-location-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat,
            lng,
            name: displayName,
            address: formattedAddress
          }),
        });

        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lng);
        localStorage.setItem("fullAddress", formattedAddress);
        localStorage.setItem("locationName", displayName);
      } else {
        setLocationName("Location not found");
        setFullAddress("Address not available");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setError("Failed to load location details");
      setLocationName("Location error");
      setFullAddress("");
    } finally {
      setIsLoading(false);
      setIsGeolocating(false);
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
        setFullAddress(results[0].formatted_address);
        setLocationName(getDisplayName(results[0].address_components));
        setSuggestions([]);
        setSearchLocation(results[0].formatted_address);
      } else {
        setError("Location not found");
      }
    });
  };

  const fetchCurrentLocation = () => {
    setIsGeolocating(true);
    setError(null);

    if (!navigator.geolocation) {
      setIsGeolocating(false);
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        await fetchLocationDetails(latitude, longitude);
        setIsModalOpen(false);
      },
      (err) => {
        setIsGeolocating(false);
        console.error("Geolocation error:", err);
        if (err.code === 1) {
          setError("Location access denied. Please enable GPS.");
        } else if (err.code === 2) {
          setError("Location unavailable. Please check your GPS signal.");
        } else if (err.code === 3) {
          setError("Location request timed out. Try again.");
        } else {
          setError("Failed to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // wait up to 20 seconds
        maximumAge: 0   // always fresh location
      }
    );
  };

  const handleMarkerDrag = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMapCenter({ lat: newLat, lng: newLng });
    await fetchLocationDetails(newLat, newLng);
  };

  const handleConfirmLocation = async () => {
    await fetchLocationDetails(mapCenter.lat, mapCenter.lng);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const initializeLocation = async () => {
      const latStored = localStorage.getItem("lat");
      const lngStored = localStorage.getItem("lon");
      const storedAddress = localStorage.getItem("fullAddress");

      if (latStored && lngStored) {
        setMapCenter({ lat: parseFloat(latStored), lng: parseFloat(lngStored) });
        if (storedAddress) {
          setFullAddress(storedAddress);
          setLocationName(localStorage.getItem("locationName") || "Current Location");
          setIsLoading(false);
        } else {
          await fetchLocationDetails(parseFloat(latStored), parseFloat(lngStored));
        }
      } else {
        fetchCurrentLocation();
      }
    };

    initializeLocation();
  }, [i18n]);

  const cleanLocationName = (locationName || "").replace(/^[^,]+,\s*/, "");
  const formattedShortLocation =
    locationName.length > 20 ? locationName.slice(0, 20) + "..." : locationName;
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
          <button
            aria-label="Select location"
            className="flex items-center justify-center"
          >
            <Image
              src="/home/map.png"
              width={24}
              height={24}
              alt="Location pin"
              className="w-6 md:w-8 h-6 md:h-8"
            />
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
                <h2 className="text-xl font-semibold">Select Your Exact Location</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {fullAddress || "Search or drag the marker to your exact location"}
                </p>
                {error && (
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
              </div>

              <div className="relative mb-3">
                <input
                  ref={inputRef}
                  value={searchLocation}
                  onChange={handleSearchLocation}
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Search for exact address..."
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
                    zoom={17}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      zoomControl: true,
                      clickableIcons: false
                    }}
                  >
                    <Marker
                      position={mapCenter}
                      draggable={true}
                      onDragEnd={handleMarkerDrag}
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        scaledSize: new window.google.maps.Size(40, 40)
                      }}
                    />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Loading map...</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={fetchCurrentLocation}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 flex items-center"
                  disabled={isGeolocating}
                >
                  <FiTarget className="mr-2" />
                  {isGeolocating ? "Locating..." : "Use My Precise Location"}
                </button>

                <button
                  onClick={handleConfirmLocation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Confirming..." : "Confirm This Location"}
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
