"use client";

import { useEffect, useState } from "react";
import { FiMapPin, FiX, FiTarget, FiSearch } from "react-icons/fi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "../redux/features/dataSlice";
import { base_endpoint } from "../utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  setData as setDoctorData,
  setLoading as setDoctorLoading,
  setPage as setDoctorPage,
} from "../redux/features/doctorSlice";
import {
  setData as setDiagnosticData,
  setLoading as setDiagnosticLoading,
  setPage as setDiagnosticPage,
} from "../redux/features/diagnosticSlice";
import {
  setData as setPharmacyData,
  setLoading as setPharmacyLoading,
  setPage as setPharmacyPage,
} from "../redux/features/pharmacySlice";
import {
  setData as setAmbulanceData,
  setLoading as setAmbulanceLoading,
  setPage as setAmbulancePage,
} from "../redux/features/ambulanceSlice";
import {
  setData as setBloodData,
  setLoading as setBloodLoading,
  setPage as setBloodPage,
} from "../redux/features/bloodSlice";
import { setMap } from "../redux/features/locationSlice";

import {
  setData as setDentalData,
  setLoading as setDentalLoading,
  setPage as setDentalPage,
} from "../redux/features/dentalSlice";


import {
  setData as setDrugDeAddictionData,
  setLoading as setDrugDeAddictionLoading,
  setPage as setDrugDeAddictionPage,
} from "../redux/features/drugDeAddictionSlice";

import {
  setData as setPhysiotherapyCenterData,
  setLoading as setPhysiotherapyCenterLoading,
  setPage as setPhysiotherapyCenterPage,
} from "../redux/features/physiotherapyCenterSlice";

import {
  setData as setHearingCareCenterData,
  setLoading as setHearingCareCenterLoading,
  setPage as setHearingCareCenterPage,
} from "../redux/features/hearingCareCenterSlice";

import {
  setData as setEyaCareCenterData,
  setLoading as setEyaCareCenterLoading,
  setPage as setEyaCareCenterPage,
} from "../redux/features/eyeCareCenterSlice";

import {
  setData as setNursingHomeCareData,
  setLoading as setNursingHomeCareLoading,
  setPage as setNursingHomeCarePage,
} from "../redux/features/nursingHomeCareSlice";


import { removeSSRContent } from "../utils/func";

const LayoutAppBar = ({
  route = "/",
  emergency = false,
  lat = 23.8103,
  name = "",
  lng = 90.4125,
  api_key,
  title = "AidFast",
  leadingIcon,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat, lng });
  const [searchLocation, setSearchLocation] = useState(""); // Search input state

  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState(name);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  const fetchIndexNearestData = async ({ lat, lon }) => {
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }
    let Emergency = "";
    if (emergency == true) {
      Emergency = "&emergency=yes";
    }
    location += Emergency;

    switch (route) {
      case "/":
        try {
          removeSSRContent(route);
          dispatch(fetchDataStart());
          const [
            doctorResponse,
            diagnosticCenterResponse,
            bloodBanksResponse,
            pharmacyResponse,
            ambulanceResponse,
          ] = await Promise.all([
            fetch(
              `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=5${location}`
            ),
            fetch(
              `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?pageNumber=1&pageSize=5${location}`
            ),
            fetch(
              `${base_endpoint}/GeneralWeb/GetAllBloodBankList?pageNumber=1&pageSize=5${location}`
            ),
            fetch(
              `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=1&pageSize=5${location}`
            ),
            fetch(
              `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=5${location}`
            ),
          ]);

          if (
            doctorResponse.ok &&
            bloodBanksResponse.ok &&
            pharmacyResponse.ok &&
            ambulanceResponse.ok &&
            diagnosticCenterResponse.ok
          ) {
            const doctorData = await doctorResponse.json();
            const bloodBanksData = await bloodBanksResponse.json();
            const pharmacyData = await pharmacyResponse.json();
            const ambulanceData = await ambulanceResponse.json();
            const diagnosticData = await diagnosticCenterResponse.json();
            dispatch(
              fetchDataSuccess({
                doctor: doctorData["data"],
                bloodBanks: bloodBanksData["data"],
                pharmacy: pharmacyData["data"],
                ambulance: ambulanceData["data"],
                diagnostic: diagnosticData["data"],
              })
            );
          } else {
            dispatch(fetchDataFailure("Failed to fetch all data"));
          }
        } catch (err) {
          dispatch(fetchDataFailure("An error occurred while fetching data"));
        }
        break;
      case "/doctor":
        try {
          removeSSRContent(route);
          dispatch(setDoctorLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();
            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setDoctorPage(next));
            dispatch(setDoctorData(data["data"]));
          } else {
            dispatch(setDoctorData([]));
          }
        } catch (err) {
          dispatch(setDoctorData([]));
        } finally {
          dispatch(setDoctorLoading(false));
        }
        break;

      case "/diagnostic":
        try {
          removeSSRContent(route);
          dispatch(setDiagnosticLoading(true));
          // Get the current URL's search parameters
          const searchParams = new URLSearchParams(window.location.search);
          // Get the 'emergency' parameter from the URL
          let emergencyValue = searchParams.get("emergency") ?? "";
          if (emergencyValue === "icu") {
            emergencyValue = "&emergencyICU=yes";
          } else if (emergencyValue === "ot") {
            emergencyValue = "&emergencyOT=yes";
          }
          const response = await fetch(
            `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?pageNumber=1&pageSize=20${location}${emergencyValue}`
          );

          if (response.ok) {
            const data = await response.json();
            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setDiagnosticPage(next));
            dispatch(setDiagnosticData(data["data"]));
          } else {
            dispatch(setDiagnosticData([]));
          }
        } catch (err) {
          dispatch(setDiagnosticData([]));
        } finally {
          dispatch(setDiagnosticLoading(false));
        }
        break;

      case "/pharmacy":
        try {
          removeSSRContent(route);
          dispatch(setPharmacyLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=1&pageSize20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setPharmacyPage(next));
            dispatch(setPharmacyData(data["data"]));
          } else {
            dispatch(setPharmacyData([]));
          }
        } catch (err) {
          dispatch(setPharmacyData([]));
        } finally {
          dispatch(setPharmacyLoading(false));
        }
        break;

      case "/blood":
        try {
          removeSSRContent(route);
          dispatch(setBloodLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralWeb/GetAllBloodBankList?pageNumber=1&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setBloodPage(next));
            dispatch(setBloodData(data["data"]));
          } else {
            dispatch(setBloodData([]));
          }
        } catch (err) {
          dispatch(setBloodData([]));
        } finally {
          dispatch(setBloodLoading(false));
        }
        break;

      case "/dental":
        try {
          removeSSRContent(route);
          dispatch(setDentalLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=1&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setDentalPage(next));
            dispatch(setDentalData(data["data"]));
          } else {
            dispatch(setDentalData([]));
          }
        } catch (err) {
          dispatch(setDentalData([]));
        } finally {
          dispatch(setDentalLoading(false));
        }
        break;

      // Drug De Addiction
      case "/drug-de-addiction":
        try {
          removeSSRContent(route);
          dispatch(setDrugDeAddictionLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=2&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setDrugDeAddictionPage(next));
            dispatch(setDrugDeAddictionData(data["data"]));
          } else {
            dispatch(setDrugDeAddictionData([]));
          }
        } catch (err) {
          dispatch(setDrugDeAddictionData([]));
        } finally {
          dispatch(setDrugDeAddictionLoading(false));
        }
        break;

      // physiotherapyCenter
      case "/physiotherapyCenter":
        try {
          removeSSRContent(route);
          dispatch(setPhysiotherapyCenterLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=3&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setPhysiotherapyCenterPage(next));
            dispatch(setPhysiotherapyCenterData(data["data"]));
          } else {
            dispatch(setPhysiotherapyCenterData([]));
          }
        } catch (err) {
          dispatch(setPhysiotherapyCenterData([]));
        } finally {
          dispatch(setPhysiotherapyCenterLoading(false));
        }
        break;

      // hearingCareCenter
      case "/hearing-care-center":
        try {
          removeSSRContent(route);
          dispatch(setHearingCareCenterLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=4&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setHearingCareCenterPage(next));
            dispatch(setHearingCareCenterData(data["data"]));
          } else {
            dispatch(setHearingCareCenterData([]));
          }
        } catch (err) {
          dispatch(setHearingCareCenterData([]));
        } finally {
          dispatch(setHearingCareCenterLoading(false));
        }
        break;

      // eyeCareCenter
      case "/eyeCareCenter":
        try {
          removeSSRContent(route);
          dispatch(setEyaCareCenterLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=5&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setEyaCareCenterPage(next));
            dispatch(setEyaCareCenterData(data["data"]));
          } else {
            dispatch(setEyaCareCenterData([]));
          }
        } catch (err) {
          dispatch(setEyaCareCenterData([]));
        } finally {
          dispatch(setEyaCareCenterLoading(false));
        }
        break;



      // Nursing Home Care
      case "/nursingHomeCare":
        try {
          removeSSRContent(route);
          dispatch(setNursingHomeCareLoading(true));

          const response = await fetch(
            `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?pageNumber=1&serviceType=6&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setNursingHomeCarePage(next));
            dispatch(setNursingHomeCareData(data["data"]));
          } else {
            dispatch(setNursingHomeCareData([]));
          }
        } catch (err) {
          dispatch(setNursingHomeCareData([]));
        } finally {
          dispatch(setNursingHomeCareLoading(false));
        }
        break;










      case "/ambulance":
        try {
          removeSSRContent(route);
          dispatch(setAmbulanceLoading(true));
          const response = await fetch(
            `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=20${location}`
          );

          if (response.ok) {
            const data = await response.json();

            const next =
              data["pageNumber"] * 20 < data["totalRecords"]
                ? data["pageNumber"] + 1
                : -1;
            dispatch(setAmbulancePage(next));
            dispatch(setAmbulanceData(data["data"]));
          } else {
            dispatch(setAmbulanceData([]));
          }
        } catch (err) {
          dispatch(setAmbulanceData([]));
        } finally {
          dispatch(setAmbulanceLoading(false));
        }
        break;

      default:
        break;
    }
  };

  const fetchLocationName = async (lat, lng) => {
    let name = "Unknown Location";
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        name = data.results[0].formatted_address;
        setLocationName(data.results[0].formatted_address);
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location");
    } finally {
      await fetch("/api/set-location-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat,
          lng,
          name,
        }),
      });
    }
  };

  const handleSearchLocation = async () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setMap({ lat: location.lat(), lng: location.lng() });
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        setLocationName(results[0].formatted_address);
      } else {
        setError("Location not found");
      }
    });
  };
  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Set the map center to the user's location
          setMapCenter({ lat: latitude, lng: longitude });

          // Store the coordinates in local storage
          localStorage.setItem("lat", latitude);
          localStorage.setItem("lon", longitude);
          setMap({ lat: latitude, lng: longitude });

          // Reset any existing errors
          setError(null);

          // Fetch the location name and nearest data
          await fetchLocationName(latitude, longitude);
          await fetchIndexNearestData({ lat: latitude, lon: longitude });
        },
        async (error) => {
          // Handle error from geolocation (e.g., location denied or unavailable)
          handleError(error);

          // Fallback to the default location if geolocation fails
          setMapCenter({ lat: lat, lng: lng });
          localStorage.setItem("lat", lat);
          localStorage.setItem("lon", lng);
          setMap({ lat: lat, lng: lng });

          // Fetch the nearest data using default location
          await fetchLocationName(lat, lng);
          await fetchIndexNearestData({ lat: lat, lon: lng });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");

      // Fallback to the default location if geolocation is not supported
      setMapCenter({ lat: defaultLatitude, lng: defaultLongitude });
      localStorage.setItem("lat", defaultLatitude);
      localStorage.setItem("lon", defaultLongitude);

      // Fetch the nearest data using default location
      await fetchLocationName(defaultLatitude, defaultLongitude);
      await fetchIndexNearestData({
        lat: defaultLatitude,
        lon: defaultLongitude,
      });
    }
  };

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Location access denied by user.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("Location request timed out.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
  };

  const handleMarkerDrag = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMapCenter({ lat: newLat, lng: newLng });
    fetchLocationName(newLat, newLng);
  };

  const handleConfirmLocation = async () => {
    setIsModalOpen(false);
    await fetchLocationName(mapCenter.lat, mapCenter.lng);
    localStorage.setItem("lat", mapCenter.lat);
    localStorage.setItem("lon", mapCenter.lng);
    await fetchIndexNearestData({ lat: mapCenter.lat, lon: mapCenter.lng });
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-[10000]">
      <div className="bg-white shadow-lg">
        <div className={leadingIcon ? "" : "container mx-auto px-4"}>
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              {leadingIcon ? (
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      router.back();
                    }}
                    className="ml-4 p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none  transition duration-300 ease-in-out"
                    aria-label="Go back"
                  >
                    {leadingIcon}
                  </button>

                  <h1 className="ml-3 text-xl font-semi text-black">{title}</h1>
                </div>
              ) : (
                <div
                  onClick={() => {
                    router.replace("/");
                  }}
                  className="flex flex-row items-center justify-center text-center"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/icons/profile.png"
                    alt="Profile"
                    className="h-8 w-auto cursor-pointer"
                  />
                  <h3 className="mt-1">{title}</h3>
                </div>
              )}
            </div>

            <div
              className="flex items-center space-x-1 cursor-pointer	select-none"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {locationName === "" ? "Select Location" : locationName}
              </div>
              <button
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select location"
              >
                <FiMapPin className="w-7 h-7 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" id="modal-title">
                  Select Location
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2  mb-2">
                <input
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Search location"
                  value={searchLocation}
                  onKeyDown={handleSearchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button
                  onClick={handleSearchLocation}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Search location"
                >
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

              <div className="flex justify-between space-x-4">
                <button
                  onClick={fetchCurrentLocation}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  <FiTarget className="inline-block mr-2" /> Get Current
                  Location
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

export default LayoutAppBar;
