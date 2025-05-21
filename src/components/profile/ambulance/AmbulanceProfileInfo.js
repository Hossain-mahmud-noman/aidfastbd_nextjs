import React, { useState, useEffect } from "react";

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

// Reusable Dropdown Component
function Dropdown({ label, options, value, onChange, required = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required={required}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Main Component
function AmbulanceProfileInfo({ data, user, token }) {
  const [ambulanceName, setAmbulanceName] = useState("");
  const [ambulanceNumber, setAmbulanceNumber] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("");
  const [dropdownData, setDropdownData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate initial state with props data
  useEffect(() => {
    if (data) {
      setAmbulanceName(data.name || "");
      setAmbulanceNumber(data.number || "");
      setAmbulanceType(data.type || "");
      setDropdownData(data.isAC ? "yes" : "no");
    }
  }, [data]);

  const handleSubmit = async () => {
    // Validation
    if (!ambulanceName || !ambulanceNumber || !dropdownData) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare payload
    const payload = {
      userId: user.id,
      type: ambulanceType,
      name: ambulanceName,
      number: ambulanceNumber,
      isAC: dropdownData === "yes",
      remarks: "",
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.aidfastbd.com/api/GeneralInformation/SaveAmbulanceAbout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Ambulance saved successfully", result);
        alert("Ambulance information saved successfully!");
      } else {
        console.error("Error saving ambulance:", response.statusText);
        alert("Failed to save ambulance information.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred while saving the information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg w-full p-6 border">
      {/* Ambulance Name */}
      <InputField
        label="Ambulance Name"
        placeholder="Enter Ambulance Name"
        value={ambulanceName}
        onChange={(e) => setAmbulanceName(e.target.value)}
        required={true}
      />

      {/* Ambulance Number */}
      <InputField
        label="Ambulance Number"
        placeholder="Enter Ambulance Number"
        value={ambulanceNumber}
        onChange={(e) => setAmbulanceNumber(e.target.value)}
        required={true}
      />

      {/* Ambulance Type */}
      <InputField
        label="Ambulance Type"
        placeholder="Enter Ambulance Type"
        value={ambulanceType}
        onChange={(e) => setAmbulanceType(e.target.value)}
      />

      {/* Dropdown for Environment Condition */}
      <Dropdown
        label="Ambulance Environment Condition"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={dropdownData}
        onChange={(e) => setDropdownData(e.target.value)}
        required={true}
      />

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

export default AmbulanceProfileInfo;
