import React, { useState, useEffect } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import DoctorChemberProfileAccess from "../../../app/profile/doctor/access/page";

function DiagnosticProfileDoctors({ data, user, token, getProfileData }) {
  const [allDoctors, setAllDoctors] = useState([]);
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false);
  const [chamberData, setChamberData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chamberIdInput, setChamberIdInput] = useState("");
  const [diagnosticCenterId, setDiagnosticCenterId] = useState("");

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
            diagnosticCenterUserId: user.userId,
            doctorUserId: doctor.id,
            isDelete: false,
          }),
        }
      );
      if (response.ok) {
        // setDoctors((prev) => [...prev, doctor]);
        toast.success("Doctor added successfully!");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
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
            diagnosticCenterUserId: user.userId,
            doctorUserId: id,
            isDelete: true,
          }),
        }
      );
      if (response.ok) {
        toast.success("Doctor removed successfully!");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        toast.error("Failed to remove doctor.");
      }
    } catch (error) {
      toast.error("Error removing doctor.");
    }
  };


  useEffect(() => {
    fetchDoctorList();
  }, [searchTerm]);


  const fetchAccess = async (doctorId, diagnosticCenterId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://api.aidfastbd.com/api/Doctor/GetChamberInformationByDiagnosticAndDoctorId?diagnosticCenterId=${diagnosticCenterId}&doctorId=${doctorId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          cache: "no-store"
        }
      );

      if (res.status === 400) {
        // Show modal to enter chamber ID
        setDiagnosticCenterId(diagnosticCenterId);
        setIsModalVisible(true);
      } else {
        const data = await res.json();
        setChamberData(data);
        setModalVisible(true);
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      }
    } catch (error) {
      console.error("Fetch access failed:", error);
      toast.error("Something went wrong");
    }
  };

  const handleGetAccess = async () => {
    const token = localStorage.getItem("token");

    if (!chamberIdInput || !diagnosticCenterId) {
      toast.warning("Please enter Chamber ID");
      return;
    }

    const payload = {
      diagnosticCenterId: diagnosticCenterId,
      chamberId: chamberIdInput
    };

    try {
      const res = await fetch("https://api.aidfastbd.com/api/Doctor/UpdateChamberAccessDiagnostic", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
        toast.success("Access granted successfully");
        setIsModalVisible(false);
        // router.push("/profile/doctor/access")
        setChamberIdInput("");
      } else {
        toast.error("Failed to grant access");
      }
    } catch (error) {
      console.error("Error updating access:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Add Doctor profile of your Diagnostic/Hospital (if any)
      </h1>

      <Button
        type="primary"
        onClick={() => setShowPopup(true)}
        className=""
      >
        Add Doctor
      </Button>

      <div className="mt-4 space-y-4">
        {data?.map((doctor) => (
          <div key={doctor.id} className="border p-4 rounded shadow flex items-center justify-between flex-col sm:flex-row" >
            <div className="flex items-center space-x-4">
              <Image
                width={1000}
                height={1000}
                src={`${image_base_endpoint}${doctor.imageUrl}`}
                alt={doctor.name}
                className="rounded-full object-cover h-16 w-16"
              />
              <div className="flex-1">
                <h2 className="font-bold">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.degree}</p>
                <p className="text-sm text-gray-500">{doctor.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Button
                danger
                onClick={() => removeDoctor(doctor.doctorUserId)}
                className=""
              >
                Remove
              </Button>
              <Button
                onClick={() => fetchAccess(doctor?.doctorId, doctor?.diagnosticCenterId)}
                className="bg-primary text-white"
              >
                Get Access
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Selection Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2000]">
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
                      width={1000}
                      height={1000}
                      src={`${image_base_endpoint}${doctor.imageUrl}`}
                      alt={doctor.name}
                      className="rounded-full w-14 h-14"
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

      {/* Modal for Chamber ID input */}
      <Modal
        title="Get Access"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setChamberIdInput("");
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleGetAccess}>
            Get Access
          </Button>,
        ]}
      >
        <p>Enter Chamber ID to get access:</p>
        <Input
          placeholder="Enter Chamber ID"
          value={chamberIdInput}
          onChange={(e) => setChamberIdInput(e.target.value)}
          className="mt-2"
        />
      </Modal>


      <Modal
        title="Chamber Profile Access"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {modalVisible && (
          <DoctorChemberProfileAccess
            isModalOpen={modalVisible}
            modalOpen={setModalVisible}
            data={chamberData}
            getProfileData={getProfileData}
          />
        )}
      </Modal>
    </div>
  );
}

export default DiagnosticProfileDoctors;
