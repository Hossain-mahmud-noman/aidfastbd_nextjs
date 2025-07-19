import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";

function DiagnosticProfileDoctors({ data, user, token }) {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDoctorList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/GetAllDoctorList?doctorName=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      setAllDoctors(result || []);
    } catch (error) {
      toast.error("Error fetching doctors.");
    } finally {
      setLoading(false);
    }
  };

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
        setDoctors((prev) => [...prev, doctor]);
        toast.success("Doctor added successfully!");
        setShowPopup(false);
      } else {
        toast.error("Failed to add doctor.");
      }
    } catch (error) {
      toast.error("Error saving doctor.");
    }
  };

  const removeDoctor = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This doctor will be removed from your profile.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
    });

    if (!confirm.isConfirmed) return;

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
        setDoctors((prev) =>
          prev.filter((doctor) => doctor.doctorUserId !== id)
        );
        toast.success("Doctor removed successfully!");
      } else {
        toast.error("Failed to remove doctor.");
      }
    } catch (error) {
      toast.error("Error removing doctor.");
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Add Doctor profile of your Diagnostic/Hospital (if any)
      </h1>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Doctor
      </button>

      <div className="mt-4 space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <Image
              width={60}
              height={60}
              src={`${image_base_endpoint}${doctor.imageUrl}`}
              alt={doctor.name}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.degree}</p>
              <p className="text-sm text-gray-500">{doctor.location}</p>
            </div>
            <button
              onClick={() => removeDoctor(doctor.doctorUserId)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Doctor Selection Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Select a Doctor</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p className="text-center">Loading doctors...</p>
            ) : (
              <ul className="max-h-72 overflow-y-auto divide-y">
                {allDoctors.map((doctor) => (
                  <li
                    key={doctor.id}
                    className="p-2 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => saveDoctor(doctor)}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={`${image_base_endpoint}${doctor.imageUrl}`}
                      alt={doctor.name}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.degree}</p>
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

export default DiagnosticProfileDoctors;
