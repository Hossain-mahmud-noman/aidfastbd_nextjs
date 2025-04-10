import React, { useState } from "react";

// Reusable InputField Component
function InputField({ label, placeholder, type = "text", value, onChange, required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required={required}
      />
    </div>
  );
}

// Main Component
function AmbulanceProfileDriver({ data, user, token }) {
  const [driverName, setDriverName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [driverNID, setDriverNID] = useState("");
  const [dropdownData, setDropdownData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate state with initial data
  useState(() => {
    if (data) {
      setDriverName(data.name || "");
      setMobileNumber(data.mobileNo || "");
      setDriverNID(data.nidNumber || "");
      setDropdownData(data.isLicence ? "yes" : "no");
    }
  }, [data]);

  const handleSubmit = async () => {
    // Validation
    if (!driverName || !mobileNumber || !driverNID || dropdownData === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare payload
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("Name", driverName);
    formData.append("MobileNo", mobileNumber);
    formData.append("NIDNumber", driverNID);
    formData.append("IsLicence", dropdownData === "yes");
    formData.append("Remarks", "");

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.aidfastbd.com/api/GeneralInformation/SaveAmbulanceDriverInfo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Driver info saved successfully:", result);
        alert("Driver information saved successfully!");
      } else {
        console.error("Error saving driver info:", response.statusText);
        alert("Failed to save driver information.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred while saving the information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      {/* Driver Name */}
      <InputField
        label="Driver Name"
        placeholder="Enter Driver Name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
        required={true}
      />

      {/* Mobile Number */}
      <InputField
        label="Driver Mobile Number"
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required={true}
        maxLength={15}
      />

      {/* Driver NID */}
      <InputField
        label="Driver NID Number"
        placeholder="Enter Driver NID Number"
        value={driverNID}
        onChange={(e) => setDriverNID(e.target.value)}
        required={true}
      />

      {/* Driving License Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choice Driving License
          <span className="text-red-500"> *</span>
        </label>
        <select
          value={dropdownData}
          onChange={(e) => setDropdownData(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>
            Select Driving License
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full ${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white p-2 rounded-md transition`}
      >
        {isSubmitting ? "Submitting..." : "Save / Update"}
      </button>
    </div>
  );
}

export default AmbulanceProfileDriver;
