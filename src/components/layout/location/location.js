import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { map_key } from "../../../utils/constants.js";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setMap } from "../../../redux/features/locationSlice.js";
import { FiSearch, FiTarget, FiX } from "react-icons/fi";

const Location = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const defaultLat = 23.8103;
  const defaultLng = 90.4125;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: defaultLat, lng: defaultLng });
  const [searchLocation, setSearchLocation] = useState("");
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("Unknown Location");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: map_key,
  });

  const fetchLocationName = async (lat, lng) => {
    let name = "Unknown Location";
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${map_key}`
      );
      const data = await response.json();
      if (data.results?.length > 0) {
        name = data.results[0].formatted_address;
        setLocationName(name);
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location");
    } finally {
      await fetch("/api/set-location-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, name }),
      });
    }
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          setMapCenter({ lat: latitude, lng: longitude });
          localStorage.setItem("lat", latitude);
          localStorage.setItem("lon", longitude);
          dispatch(setMap({ lat: latitude, lng: longitude }));
          setError(null);
          await fetchLocationName(latitude, longitude);
        },
        async (error) => {
          handleError(error);
          setMapCenter({ lat: defaultLat, lng: defaultLng });
          localStorage.setItem("lat", defaultLat);
          localStorage.setItem("lon", defaultLng);
          dispatch(setMap({ lat: defaultLat, lng: defaultLng }));
          await fetchLocationName(defaultLat, defaultLng);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setMapCenter({ lat: defaultLat, lng: defaultLng });
      localStorage.setItem("lat", defaultLat);
      localStorage.setItem("lon", defaultLng);
      await fetchLocationName(defaultLat, defaultLng);
    }
  };

  const handleSearchLocation = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setMapCenter({ lat, lng });
        dispatch(setMap({ lat, lng }));
        setLocationName(results[0].formatted_address);
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lng);
      } else {
        setError("Location not found.");
      }
    });
  };

  const handleMarkerDrag = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMapCenter({ lat, lng });
    fetchLocationName(lat, lng);
  };

  const handleConfirmLocation = async () => {
    setIsModalOpen(false);
    localStorage.setItem("lat", mapCenter.lat);
    localStorage.setItem("lon", mapCenter.lng);
    dispatch(setMap(mapCenter));
    await fetchLocationName(mapCenter.lat, mapCenter.lng);
  };

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Location access denied.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location unavailable.");
        break;
      case error.TIMEOUT:
        setError("Location request timed out.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  function getFormattedLocation(rawLocation) {
    if (!rawLocation) return { shortText: "Select Location", tooltipText: "" };
    const parts = rawLocation.split(',');
    const location = parts.length > 1
      ? parts.slice(1).map(part => part.trim()).join(', ')
      : rawLocation.trim();
    const isLong = location.length > 20;
    return {
      shortText: isLong ? location.slice(0, 20) + '...' : location,
      tooltipText: isLong ? location : '',
    };
  }

  const { shortText, tooltipText } = getFormattedLocation(locationName);

  return (
    <div>
      <div className="flex gap-0 sm:gap-2 items-center">
        <div className="flex items-center space-x-1 cursor-pointer select-none" onClick={() => setIsModalOpen(true)}>
          <Tooltip title={tooltipText || null}>
            <div className="description1 text-[#212121]">{shortText}</div>
          </Tooltip>
          <button aria-label="Select location">
            <Image src="/home/map.png" width={30} height={30} alt="Location" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsModalOpen(false)}></div>

            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 shadow-xl z-10">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Select Location</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Search location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button onClick={handleSearchLocation}>
                  <FiSearch className="w-5 h-5 text-gray-600" />
                </button>
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
