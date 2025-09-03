import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";


function DiagnosticProfileBlood({ data, user, token, getProfileData }) {
  const [allBloods, setAllBloods] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBloodList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=BloodBank&userId=${user.userId}&searchValue=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllBloods(data || []);
    } catch (error) {
      toast.error("Error fetching blood banks.");
    } finally {
      setLoading(false);
    }
  };

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
            diagnosticCenterUserId: user.userId,
            bloodBankUserId: blood.value,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        toast.success("Blood bank added successfully.");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
        setShowPopup(false);
      } else {
        toast.error("Failed to add blood bank.");
      }
    } catch (error) {
      toast.error("Error adding blood bank.");
    }
  };

  const removeBlood = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will remove the blood bank.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

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
            diagnosticCenterUserId: user.userId,
            bloodBankUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        toast.success("Blood bank removed successfully.");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        toast.error("Failed to remove blood bank.");
      }
    } catch (error) {
      toast.error("Error removing blood bank.");
    }
  };


  useEffect(() => {
    fetchBloodList();
  }, [searchTerm]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Add Blood Bank profile of your Diagnostic/Hospital (if any)
      </h1>

      <Button
      icon={<IoMdAddCircleOutline />}
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Blood Bank
      </Button>

      <div className="mt-4 space-y-4">
        {data?.map((blood) => (
          <div
            key={blood.bloodBankUserId}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <Image
              width={60}
              height={60}
              src={`${image_base_endpoint}${blood.imageUrl}`}
              alt={blood.name}
              className="rounded-full w-16 h-16 object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold">{blood.name}</h2>
            </div>
            <Button danger
              onClick={() => removeBlood(blood.bloodBankUserId)}
              className=""
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Select a Blood Bank</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            {loading ? (
              <p className="text-center">Loading blood banks...</p>
            ) : (
              <ul className="max-h-72 overflow-y-auto divide-y">
                {allBloods.map((blood) => (
                  <li
                    key={blood.value}
                    className="p-2 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addBlood(blood)}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={`${image_base_endpoint}${blood.imageUrl}`}
                      alt={blood.text}
                      className="rounded-full h-14 w-14 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{blood.text}</h3>
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

export default DiagnosticProfileBlood;
