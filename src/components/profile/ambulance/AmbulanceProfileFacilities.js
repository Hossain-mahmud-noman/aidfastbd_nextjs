import React, { useState } from "react";
import { toast } from "sonner";
function AmbulanceProfileFacilities({ data, user, token, getProfileData }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate form with initial data if available
  React.useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setDetails(data.details || "");
    }
  }, [data]);

  const handleSave = async () => {
    if (!title.trim() || !details.trim()) {
      toast.warning("Both fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("UserId", user.userId);
    formData.append("Title", title);
    formData.append("Details", details);

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveAmbulanceFacilityInfo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Facility information saved successfully!");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        console.error("Error saving facility info:", response.statusText);
        toast.error("Failed to save facility information.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("An error occurred while saving the information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      {/* Title Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a short title about your facilities
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Details Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe details about your facilities
        </label>
        <textarea
          rows={8}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSave}
        disabled={isSubmitting}
        className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 rounded-md transition`}
      >
        {isSubmitting ? "Submitting..." : "Save / Update"}
      </button>
    </div>
  );
}

export default AmbulanceProfileFacilities;
