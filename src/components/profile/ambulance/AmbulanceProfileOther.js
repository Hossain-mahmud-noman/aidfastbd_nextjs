import React, { useState } from "react";

function AmbulanceProfileOther({ data, user, token }) {
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
      alert("Both fields are required!");
      return;
    }

    const payload = {
      userId: user.id,
      title: title,
      details: details,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveAmbulanceOtherFacility",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Other facility info saved successfully:", result);
        alert("Other facility information saved successfully!");
      } else {
        console.error("Error saving other facility info:", response.statusText);
        alert("Failed to save other facility information.");
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
      {/* Title Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a short title about your service
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
          Describe details about your services
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
        className={`w-full ${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white p-2 rounded-md transition`}
      >
        {isSubmitting ? "Submitting..." : "Save / Update"}
      </button>
    </div>
  );
}

export default AmbulanceProfileOther;
