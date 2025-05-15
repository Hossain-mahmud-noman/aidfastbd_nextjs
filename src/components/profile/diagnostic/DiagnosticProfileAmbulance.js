import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";

function DiagnosticProfileAmbulance({ data, user, token }) {
  const [ambulances, setAmbulances] = useState([]); // Selected ambulances
  const [allAmbulances, setAllAmbulances] = useState([]); // Available ambulances
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false); // Loading state


  const defaultImage=""

  // Fetch ambulance list from API
  const fetchAmbulanceList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Ambulance&userId=${user.id}&searchValue=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllAmbulances(data || []);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add an ambulance
  const addAmbulance = async (ambulance) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterAmbulance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            ambulanceUserId: ambulance.value,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        setAmbulances([...ambulances, ambulance]);
        setShowPopup(false);
      } else {
        alert("Failed to add ambulance!");
      }
    } catch (error) {
      console.error("Error adding ambulance:", error);
    }
  };

  // Remove an ambulance
  const removeAmbulance = async (id) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterAmbulance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            ambulanceUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        setAmbulances(ambulances.filter((ambulance) => ambulance.value !== id));
      } else {
        alert("Failed to remove ambulance!");
      }
    } catch (error) {
      console.error("Error removing ambulance:", error);
    }
  };

  // Fetch selected ambulances when `data` updates
  useEffect(() => {
    if (data) {
      setAmbulances(data);
    }
  }, [data]);

  // Fetch ambulances when the component mounts or search term changes
  useEffect(() => {
    fetchAmbulanceList();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">
        Add Ambulance profile of your Diagnostic Center or Hospital.
      </h1>

      {/* Button to open ambulance selection popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Ambulance
      </button>

      {/* Selected ambulances */}
      <div className="mt-4 space-y-4">
        {ambulances.map((ambulance) => (
          <div
            key={ambulance.value}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{ambulance.name}</h2>

              <p className="text-sm text-gray-600">
                <Image
                  width={48}
                  height={48}
                  src={`${image_base_endpoint}${ambulance.imageUrl}`}
                  alt={ambulance.name}
                  className="h-12 w-12 rounded-full"
                />
              </p>
              <p className="text-sm text-gray-600">
                ⭐ {ambulance.rating !== null ? ambulance.rating : "0.0"}
              </p>
            </div>
            <button
              onClick={() => removeAmbulance(ambulance.value)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Select an Ambulance</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p>Loading ambulances...</p>
            ) : (
              <ul className="space-y-2">
                {allAmbulances.map((ambulance) => (
                  <li
                    key={ambulance.value}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addAmbulance(ambulance)}
                  >
                    <h3 className="font-bold">{ambulance.text}</h3>
                    <p className="text-sm text-gray-600">
                      <Image
                        width={48}
                        height={48}
                        src={`${image_base_endpoint}${ambulance.imageUrl}`}
                        alt={ambulance.text}
                        className="h-12 w-12 rounded-full"
                      />
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiagnosticProfileAmbulance;
