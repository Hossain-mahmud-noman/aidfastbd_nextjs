import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Button } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";

function NursingCareProfileDoctors({ data, user, token, id, getProfileData }) {
  const [allDoctors, setAllDoctors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

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

  const saveDoctor = async (doctor) => {
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateGenericServiceDoctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            genericServiceUserId: id,
            doctorUserId: doctor.id,
            isDelete: false,
            serviceType: 6
          }),
        }
      );
      if (response.ok) {
        setShowPopup(false);
        toast.success("Doctor added successfully!");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        toast.error("Failed to add doctor.");
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast.error("Something went wrong while adding doctor.");
    }
  };

  const removeDoctor = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveUpdateGenericServiceDoctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            genericServiceUserId: user.userId,
            doctorUserId: id,
            isDelete: true,
            serviceType: 6
          }),
        }
      );
      if (response.ok) {
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
        toast.success("Doctor removed successfully!");
      } else {
        toast.error("Failed to remove doctor.");
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
      toast.error("Something went wrong while removing doctor.");
    }
  };


  useEffect(() => {
    fetchDoctorList();
  }, [searchTerm]);

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h1 className="text-lg font-bold mb-4">
        Add Doctor profile of your Nursing Care Home
      </h1>

      <Button
        icon={<IoMdAddCircleOutline />}
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Doctor
      </Button>

      <div className="mt-4 space-y-4">
        {data?.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                width={64}
                height={64}
                src={`${image_base_endpoint}${doctor.imageUrl}`}
                alt={doctor.name}
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.degree}</p>
              <p className="text-sm text-gray-500">{doctor.location}</p>
            </div>
            <Button danger
              onClick={() => removeDoctor(doctor.doctorUserId)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
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
              <div className="overflow-y-auto max-h-[60vh]">
                <ul className="space-y-2">
                  {allDoctors?.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex gap-3 items-center border rounded"
                      onClick={() => saveDoctor(doctor)}
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          width={48}
                          height={48}
                          src={`${image_base_endpoint}${doctor.imageUrl}`}
                          alt={doctor.name}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.degree}</p>
                        <p className="text-xs text-gray-400">{doctor.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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

export default NursingCareProfileDoctors;
