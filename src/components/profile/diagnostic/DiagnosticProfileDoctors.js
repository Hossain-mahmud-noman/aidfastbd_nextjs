import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";

function DiagnosticProfileDoctors({ data, user, token }) {
  const [doctors, setDoctors] = useState([]); // List of selected doctors
  const [allDoctors, setAllDoctors] = useState([]); // All available doctors
  const [showPopup, setShowPopup] = useState(false); // To toggle the doctor selection popup
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch doctor list from API
  const fetchDoctorList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/GetAllDoctorList?doctorName=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setAllDoctors(data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add doctor to the list
  const saveDoctor = async (doctor) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterDoctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            doctorUserId: doctor.id,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        setDoctors([...doctors, doctor]);
        setShowPopup(false);
      } else {
        alert("Failed to add doctor!");
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  // Remove doctor from the list
  const removeDoctor = async (id) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateDiagnosticCenterDoctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            diagnosticCenterUserId: user.id,
            doctorUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        setDoctors(doctors.filter((doctor) => doctor.doctorUserId !== id));
      } else {
        alert("Failed to remove doctor!");
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);

  useEffect(() => {
    fetchDoctorList();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">
        Add Doctor profile of your Diagnostic/Hospital (if any)
      </h1>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Doctor
      </button>

      <div className="mt-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <div>
              <h2 className="font-bold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">
                <img
                  src={`${image_base_endpoint}${doctor.imageUrl}`}
                  alt={doctor.name}
                  className="h-12 w-12 rounded-full"
                />
              </p>
              <p>{doctor.degree}</p>
              <p className="text-sm text-gray-600">{doctor.location}</p>
            </div>
            <button
              onClick={() => removeDoctor(doctor.doctorUserId)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Select a Doctor</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p>Loading doctors...</p>
            ) : (
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "300px" }} // Set max height for scroll
              >
                <ul>
                  {allDoctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => saveDoctor(doctor)}
                    >

                      <p className="text-sm text-gray-600">
                        <img
                          src={`${image_base_endpoint}${doctor.imageUrl}`}
                          alt={doctor.name}
                          className="h-12 w-12 rounded-full"
                        />
                      </p>
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.degree}</p>
                    </li>
                  ))}
                </ul>
              </div>
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

export default DiagnosticProfileDoctors;
