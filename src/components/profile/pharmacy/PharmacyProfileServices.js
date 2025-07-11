import React, { useEffect, useState } from "react";
import { headerx } from "../../../utils/constants";

function PharmacyProfileServices({ data, user, token }) {
  const [services, setServices] = useState(data?.services || ""); // Pre-fill with existing data if available
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!services.trim()) {
      alert("Please provide details about your pharmacy services.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/SavePharmacyOtherInfo`,
        {
          method: "POST",
          headers: {
            ...headerx,
            "Content-Type": "application/json", // Ensure Content-Type is set for JSON data
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
          body: JSON.stringify({
            userId: user.id,
            title: "Other Services",
            details: services,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        const errorMessages = result.errors
          ? Object.entries(result.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n")
          : result.message || "An unknown error occurred";
        alert(`Error: ${errorMessages}`);
      }
    } catch (error) {
      console.error("An error occurred while saving:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {

    if (data) {
      setServices(data.details || "")
    }

  }, [data])

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto p-6">
      {/* Textarea for Services */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pharmacy Services
        </label>
        <textarea
          value={services}
          onChange={(e) => setServices(e.target.value)}
          rows={8}
          placeholder="Describe your pharmacy services..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          disabled={isSubmitting} // Disable input while submitting
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSave}
        className={`w-full p-2 rounded-md transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        disabled={isSubmitting} // Disable button while submitting
      >
        {isSubmitting ? "Saving..." : "Save / Update"}
      </button>
    </div>
  );
}

export default PharmacyProfileServices;
