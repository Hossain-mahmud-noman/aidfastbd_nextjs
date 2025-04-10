import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";

function DiagnosticProfilePharmacy({ data, user, token }) {
  const [pharmacys, setPharmacys] = useState([]); // List of selected pharmacies
  const [allPharmacys, setAllPharmacys] = useState([]); // All available pharmacies
  const [showPopup, setShowPopup] = useState(false); // To toggle the pharmacy selection popup
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch pharmacy list from API
  const fetchPharmacyList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Pharmacy&userId=${user.id}&searchValue=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllPharmacys(data || []);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a pharmacy
  const addPharmacy = async (pharmacy) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterPharmacy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            pharmacyUserId: pharmacy.value,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        setPharmacys([...pharmacys, pharmacy]);
        setShowPopup(false);
      } else {
        alert("Failed to add pharmacy!");
      }
    } catch (error) {
      console.error("Error adding pharmacy:", error);
    }
  };

  // Remove a pharmacy
  const removePharmacy = async (id) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterPharmacy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            pharmacyUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        setPharmacys(pharmacys.filter((pharmacy) => pharmacy.value !== id));
      } else {
        alert("Failed to remove pharmacy!");
      }
    } catch (error) {
      console.error("Error removing pharmacy:", error);
    }
  };

  // Fetch selected pharmacies when `data` updates
  useEffect(() => {
    if (data) {
      setPharmacys(data);
    }
  }, [data]);

  // Fetch pharmacies when the component mounts or the search term changes
  useEffect(() => {
    fetchPharmacyList();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">
        Add Pharmacy profile of your Diagnostic Center or Hospital.
      </h1>

      {/* Button to open pharmacy selection popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Pharmacy
      </button>

      {/* Selected pharmacies */}
      <div className="mt-4 space-y-4">
        {pharmacys.map((pharmacy) => (
          <div
            key={pharmacy.value}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{pharmacy.name}</h2>
              <p className="text-sm text-gray-600">
                <img
                  src={`${image_base_endpoint}${pharmacy.imageUrl}`}
                  alt={pharmacy.name}
                  className="h-12 w-12 rounded-full"
                />
              </p>
              <p className="text-sm text-gray-600">
                ⭐ {pharmacy.rating !==null?pharmacy.rating:"0.0"}
              </p>
            </div>
            <button
              onClick={() => removePharmacy(pharmacy.value)}
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
            <h2 className="text-lg font-bold mb-4">Select a Pharmacy</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p>Loading pharmacies...</p>
            ) : (
              <ul className="space-y-2">
                {allPharmacys.map((pharmacy) => (
                  <li
                    key={pharmacy.value}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => addPharmacy(pharmacy)}
                  >
                    <h3 className="font-bold">{pharmacy.text}</h3>
                    <p className="text-sm text-gray-600">
                      ⭐ {pharmacy.rating} ({pharmacy.reviews} reviews)
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

export default DiagnosticProfilePharmacy;
