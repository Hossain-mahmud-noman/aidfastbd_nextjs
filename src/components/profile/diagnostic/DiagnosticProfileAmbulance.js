import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "antd";


function DiagnosticProfileAmbulance({ data, user, token, getProfileData }) {
  const [allAmbulances, setAllAmbulances] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAmbulanceList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Ambulance&userId=${user.userId}&searchValue=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllAmbulances(data || []);
    } catch (error) {
      toast.error("Error loading ambulances.");
    } finally {
      setLoading(false);
    }
  };

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
            diagnosticCenterUserId: user.userId,
            ambulanceUserId: ambulance.value,
            isDelete: false,
          }),
        }
      );

      if (response.ok) {
        toast.success("Ambulance added successfully.");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
        
        setShowPopup(false);
      } else {
        toast.error("Failed to add ambulance.");
      }
    } catch (error) {
      toast.error("Error adding ambulance.");
    }
  };

  const removeAmbulance = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the ambulance from your profile.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

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
            diagnosticCenterUserId: user.userId,
            ambulanceUserId: id,
            isDelete: true,
          }),
        }
      );

      if (response.ok) {
        toast.success("Ambulance removed successfully.");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        toast.error("Failed to remove ambulance.");
      }
    } catch (error) {
      toast.error("Error removing ambulance.");
    }
  };

  useEffect(() => {
    fetchAmbulanceList();
  }, [searchTerm]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Add Ambulance profile of your Diagnostic/Hospital (if any)
      </h1>

      <Button
        icon={<IoMdAddCircleOutline />}
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Ambulance
      </Button>

      <div className="mt-4 space-y-4">
        {data?.map((ambulance) => (
          <div
            key={ambulance.ambulanceUserId}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <Image
              width={60}
              height={60}
              src={`${image_base_endpoint}${ambulance.imageUrl}`}
              alt={ambulance.name}
              className="rounded-full object-cover w-14 h-14"
            />
            <div className="flex-1">
              <h2 className="font-bold">{ambulance.name}</h2>
              <p className="text-sm text-gray-600">
                ⭐ {ambulance.rating ?? "0.0"}
              </p>
            </div>
            <Button danger
              onClick={() => removeAmbulance(ambulance.ambulanceUserId)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Select an Ambulance</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p className="text-center">Loading ambulances...</p>
            ) : (
              <ul className="max-h-72 overflow-y-auto divide-y">
                {allAmbulances?.map((ambulance) => (
                  <li
                    key={ambulance.value}
                    className="p-2 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addAmbulance(ambulance)}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={`${image_base_endpoint}${ambulance.imageUrl}`}
                      alt={ambulance.text}
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <h3 className="font-semibold">{ambulance.text}</h3>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
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
