import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";

function DiagnosticProfileBlood({ data, user, token }) {
  const [bloods, setBloods] = useState([]); // List of selected bloods
  const [allBloods, setAllBloods] = useState([]); // All available blood banks
  const [showPopup, setShowPopup] = useState(false); // To toggle the blood selection popup
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch blood bank list from API
  const fetchBloodList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=BloodBank&userId=${user.id}&searchValue=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllBloods(data || []);
    } catch (error) {
      console.error("Error fetching blood banks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a blood bank
  const addBlood = async (blood) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterBloodBank",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            bloodBankUserId: blood.value,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        setBloods([...bloods, blood]);
        setShowPopup(false);
      } else {
        alert("Failed to add blood bank!");
      }
    } catch (error) {
      console.error("Error adding blood bank:", error);
    }
  };

  // Remove a blood bank
  const removeBlood = async (id) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterBloodBank",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            bloodBankUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        setBloods(bloods.filter((blood) => blood.value !== id));
      } else {
        alert("Failed to remove blood bank!");
      }
    } catch (error) {
      console.error("Error removing blood bank:", error);
    }
  };

  // Fetch selected blood banks when `data` updates
  useEffect(() => {
    if (data) {
      setBloods(data);
    }
  }, [data]);

  // Fetch blood banks when the component mounts or the search term changes
  useEffect(() => {
    fetchBloodList();
  }, [searchTerm]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Add Blood Bank club profile of your diagnostic center or hospital.
      </h1>

      {/* Button to open blood bank selection popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Blood Bank Club
      </button>

      {/* Selected blood banks */}
      <div className="mt-4 space-y-4">
        {bloods.map((blood) => (
          <div
            key={blood.value}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{blood.name}</h2>
              <p className="text-sm text-gray-600">
                <Image
                  width={100}
                  height={100}
                  src={`${image_base_endpoint}${blood.imageUrl}`}
                  alt={blood.name}
                  className="h-12 w-12 rounded-full"
                />
              </p>
            </div>
            <button
              onClick={() => removeBlood(blood.bloodBankUserId)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Select a Blood Bank</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p>Loading blood banks...</p>
            ) : (
              <ul className="space-y-2">
                {allBloods.map((blood) => (
                  <li
                    key={blood.value}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addBlood(blood)}
                  >
                    <h3 className="font-bold">{blood.text}</h3>
                    <p className="text-sm text-gray-600">
                      <Image
                        width={100}
                        height={100}
                        src={`${image_base_endpoint}${blood.imageUrl}`}
                        alt={blood.text}
                        className="h-8 w-8 rounded-full"
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

export default DiagnosticProfileBlood;
