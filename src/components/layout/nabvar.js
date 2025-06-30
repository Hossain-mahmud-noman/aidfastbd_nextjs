
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Drawer } from "antd";
import {
   IoChevronDownOutline,
   IoMenuOutline,
} from "react-icons/io5";
import { FiSearch, FiTarget, FiX } from "react-icons/fi";
import { map_key } from "../../utils/constants.js";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { setMap } from "../../redux/features/locationSlice.js";
import { Tooltip } from 'antd';

const Navbar = ({ textColor = "text-black" }) => {
   const pathname = usePathname();
   const inputRef = useRef(null);
   const router = useRouter();
   let lat = 23.8103;
   let lng = 90.4125;
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [mapCenter, setMapCenter] = useState({ lat, lng });
   const [searchLocation, setSearchLocation] = useState("");
   let name = 'Unknown Location'
   const [error, setError] = useState(null);
   const [locationName, setLocationName] = useState(name);

   const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: map_key,
   });
   const pagesItems = [
      { path: "/about", label: ("About") },
      { path: "/contact", label: ("Contact") },
      { path: "/privacyPolicy", label: ("Privacy Policy") },
      { path: "/termsCondition", label: ("Terms & Conditions") },
   ];

   const fetchLocationName = async (lat, lng) => {
      let name = "Unknown Location";
      try {
         const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${map_key}`
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
               setMapCenter({ lat: latitude, lng: longitude });
               localStorage.setItem("lat", latitude);
               localStorage.setItem("lon", longitude);
               setMap({ lat: latitude, lng: longitude });

               setError(null);
               await fetchLocationName(latitude, longitude);
            },
            async (error) => {
               handleError(error);
               setMapCenter({ lat: lat, lng: lng });
               localStorage.setItem("lat", lat);
               localStorage.setItem("lon", lng);
               setMap({ lat: lat, lng: lng });

               await fetchLocationName(lat, lng);
            }
         );
      } else {
         alert("Geolocation is not supported by this browser.");

         setMapCenter({ lat: defaultLatitude, lng: defaultLongitude });
         localStorage.setItem("lat", defaultLatitude);
         localStorage.setItem("lon", defaultLongitude);

         await fetchLocationName(defaultLatitude, defaultLongitude);
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
   };

   useEffect(() => {
      fetchCurrentLocation();
   }, []);

   function getFormattedLocation(rawLocation) {
      if (!rawLocation) return { shortText: "Select Location", tooltipText: "" };

      const parts = rawLocation.split(',');
      const location = parts.length > 1
         ? parts.slice(1).map(part => part.trim()).join(', ')
         : rawLocation.trim();

      const isLong = location.length > 20;
      const shortText = isLong ? location.slice(0, 20) + '...' : location;
      const tooltipText = isLong ? location : '';

      return { shortText, tooltipText };
   }
   function getFormattedLocation2(rawLocation) {
      if (!rawLocation) return { shortText: "Select Location", tooltipText: "" };

      const parts = rawLocation.split(',');
      const location = parts.length > 1
         ? parts.slice(1).map(part => part.trim()).join(', ')
         : rawLocation.trim();

      const isLong = location.length > 12;
      const shortText2 = isLong ? location.slice(0, 12) + '...' : location;
      const tooltipText2 = isLong ? location : '';

      return { shortText2, tooltipText2 };
   }

   const { shortText, tooltipText } = getFormattedLocation(locationName);
   const { shortText2, tooltipText2 } = getFormattedLocation2(locationName);

   return (
      <div className="w-full font-lato overflow-hidden relative z-50"
         style={{
            background: '#FFF',
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)'
         }}
      >
         <div className="aid-container flex flex-row justify-between items-center md:py-[18px] py-4 lg:px-0 bg-[#FFFFFF] text-[#061C3D]" >
            {/* Logo */}
            <Link href="/">
               <div className="sm:w-[133px] sm:h-[40px] w-[153px] h-[46px] flex justify-start items-center -ml-2 lg:ml-0 mt-1">
                  <Image
                     src="/logo.png"
                     width={153}
                     height={46}
                     className="object-cover"
                     alt="logo"
                  />
               </div>
            </Link>
            {/* Desktop Menu */}
            <ul className=" description1 list-none xl:gap-10 gap-4 items-center hidden lg:flex">
               <NavItem
                  path="/doctor"
                  label={("Doctor")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/diagonistick"
                  label={("Diagonistick")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/blood"
                  label={("Blood Bank")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/eye-care-center"
                  label={("Eye Care Cente")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/blog"
                  label={("Blog")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <DropdownMenuTrigger
                  label={("Pages")}
                  items={pagesItems}
                  textColor={textColor}
               />
            </ul>

            <div className="flex gap-0 sm:gap-2 items-center">
               <div
                  className="flex items-center space-x-1 cursor-pointer	select-none"
                  onClick={() => setIsModalOpen(true)}
               >

                  <div className="hidden md:flex">
                     <Tooltip title={tooltipText || null}>
                        <div className="description1 text-[#212121]">
                           {shortText}
                        </div>
                     </Tooltip>
                  </div>
                  <div className="flex md:hidden">
                     <Tooltip title={tooltipText2 || null}>
                        <div className="description1 text-[#212121]">
                           {shortText2}
                        </div>
                     </Tooltip>
                  </div>
                  <button
                     className=""
                     aria-label="Select location"
                  >
                     <Image
                        src="/home/map.png"
                        width={30}
                        height={30}
                        alt="Location" />
                  </button>
               </div>
               <button
                  className={`lg:hidden ${textColor} text-2xl `}
                  onClick={() => setIsDrawerOpen(true)}
               >
                  <IoMenuOutline className="text-2xl relative z-50 ml-2 sm:ml-0" />
               </button>
            </div>
         </div>

         <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            className="lg:hidden"
         >
            <div className="flex flex-col gap-4">
               <Link
                  href="/doctor"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Doctor")}
               </Link>
               <Link
                  href="/Diagonostick"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("diagonostick")}
               </Link>
               <Link
                  href="/blood"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Blood Bank")}
               </Link>
               <Link
                  href="/eye-care-center"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Eye Care Center")}
               </Link>
               <Link
                  href="/blog"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Blog")}
               </Link>
               <MobileDropdown title="Pages" items={pagesItems} />

               <div className="mt-4 w-full">
                  <Link href="/package" className="view-button">
                     {("Book A Trip")}
                  </Link>
               </div>
            </div>
         </Drawer>
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

                     <div className="flex items-center space-x-2 mb-3">
                        <input
                           ref={inputRef}
                           type="text"
                           className="px-4 py-2 border rounded w-full"
                           placeholder="Search location"
                        />
                        <FiSearch className="w-5 h-5 text-gray-600" />
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

export default Navbar;

const NavItem = ({ path, label, pathname, textColor }) => (
   <li
      className={`description1 hover:text-primary ${pathname === path
         ? "text-primary"
         : textColor === "text-[#061C3D]"
            ? "text-[#061C3D]"
            : "text-[#061C3D]"
         }`}
   >
      <Link href={path}>{label}</Link>
   </li>
);

const DropdownMenuTrigger = ({ label, items, textColor }) => (
   <li className={`description1 ${textColor} hover:text-primary`}>
      <Dropdown
         menu={{
            items: items.map(({ path, label }) => ({
               key: path,
               label: (
                  <Link href={path} className="block w-full">
                     {label}
                  </Link>
               ),
            })),
         }}
         trigger={["hover"]}
      >
         <span className="flex items-center gap-2 cursor-pointer">
            {label}
            <IoChevronDownOutline className="text-lg mt-[2px]" />
         </span>
      </Dropdown>
   </li>
);

const MobileDropdown = ({ title, items }) => {
   const [open, setOpen] = useState(false);
   const pathname = usePathname();

   return (
      <div className="w-full">
         <button
            onClick={() => setOpen(!open)}
            className="description1 flex justify-between items-center w-full py-2"
         >
            {title}
            <IoChevronDownOutline
               className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                  }`}
            />
         </button>

         {open && (
            <div className="flex flex-col ps-4">
               {items.map((item) => (
                  <Link
                     key={item.path}
                     href={item.path}
                     onClick={() => location.assign(item.path)}
                     className={`py-2 text-sm ${pathname === item.path
                        ? "text-primary description1"
                        : "description1"
                        } hover:text-primary`}
                  >
                     {item.label.toUpperCase()}
                  </Link>
               ))}
            </div>
         )}
      </div>
   );
};
