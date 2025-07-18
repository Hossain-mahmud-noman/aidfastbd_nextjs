import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { headerx } from "../../../utils/constants";

function PharmacyProfileServices({ data, user, token }) {
  const [services, setServices] = useState(data?.services || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setServices(data.details || "");
    }
  }, [data]);

  const handleSave = async () => {
    if (!services.trim()) {
      toast.error("Please provide details about your pharmacy services.");
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        toast.success("Pharmacy services saved successfully!");
      } else {
        const errorMessages = result.errors
          ? Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n")
          : result.message || "An unknown error occurred";
        toast.error(errorMessages);
      }
    } catch (error) {
      console.error("An error occurred while saving:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Pharmacy Services
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe the services your pharmacy offers
        </label>
        <textarea
          value={services}
          onChange={(e) => setServices(e.target.value)}
          rows={8}
          placeholder="e.g. Home delivery, 24/7 service, doctor consultation, etc."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isSubmitting}
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-2 font-semibold rounded-md transition ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save / Update"}
      </button>
    </div>
  );
}

export default PharmacyProfileServices;
