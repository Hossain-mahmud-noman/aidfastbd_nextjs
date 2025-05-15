'use client';

import React, { useEffect, useState } from "react";
import { base_endpoint, headerx } from "../../utils/constants";
import Image from "next/image";


export default function FavoriteCard({ user, token }) {

  const [favorites, setFavorites] = useState({
    doctorInfo: [],
    diagnosticInfo: [],
    bloodBankInfo: [],
    pharmacyInfo: [],
    ambulanceInfo: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      headerx["Authorization"] = "Bearer " + token;
      const res = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/GetAllFavouriteProfilesList?userId=${user.id}`,
        { headers: headerx }
      );

      if (res.status === 200) {
        const data = await res.json();
        setFavorites(data[0]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };





  useEffect(() => {
    fetchData();
  }, [user, token]);


  const ToggleSatatus = async (type, profileUserId) => {
    setLoading(true); // Show loading while removing
    try {

      headerx['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base_endpoint}/GeneralInformation/FavouriteProfilesSaveUpdate`, { method: "POST", body: JSON.stringify({ "typeId": type, "profileUserId": profileUserId, "userId": user.id, "isDeleted": true }), headers: headerx },);
      const data = await res.json();
      if (res.status == 200) {
        window.location.reload();
      } else {
        alert("Something wring");
      }
    } catch (err) {
      alert("Browser Side error")
    } finally {
      setLoading(true); // Show loading while removing
    }
  }

  // Base URL for images
  const imageBaseUrl = "https://api.aidfastbd.com/";

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
        </div>
      ) : (
        <>
          {/* Render each category */}
          {[
            { category: "Doctor", data: favorites.doctorInfo, type: 1 },
            { category: "Diagnostic Center & Hospital", data: favorites.diagnosticInfo, type: 2 },
            { category: "Blood Bank & Donor Club", data: favorites.bloodBankInfo, type: 3 },
            { category: "Pharmacy", data: favorites.pharmacyInfo, type: 4 },
            { category: "Ambulance", data: favorites.ambulanceInfo, type: 5 },
          ].map((section, index) => (
            <div key={index} className="mb-6">
              {/* Category Title */}
              <h2 className="text-md font-semibold text-gray-800 mb-2">
                {section.category}
              </h2>

              {/* Category Items */}
              <div className="grid grid-cols-2 gap-4">
                {section.data.length > 0 ? (
                  section.data.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative bg-white shadow-md rounded-lg overflow-hidden"
                    >
                      {/* Image */}
                      <Image
                        width={100}
                        height={100}
                        src={
                          item.imageUrl
                            ? imageBaseUrl + item.imageUrl
                            : "https://via.placeholder.com/100"
                        }
                        alt={item.name}
                        className="w-full h-24 object-cover"
                      />
                      {/* Heart Icon */}
                      <div onClick={() => {
                        ToggleSatatus(section.type, item.profileUserId);
                      }} className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="white"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.172 6.832a4 4 0 015.656 0L12 10.004l3.172-3.172a4 4 0 115.656 5.656l-8.128 8.128a1 1 0 01-1.416 0l-8.128-8.128a4 4 0 010-5.656z"
                          />
                        </svg>
                      </div>
                      {/* Details */}
                      <div className="p-2">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-600">{item.typeName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No items found</p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
