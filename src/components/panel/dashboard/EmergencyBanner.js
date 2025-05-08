"use client";

import { FiPhoneCall } from "react-icons/fi";

export default function EmergencyCallBanner() {
  return (
    <div className="border border-red-300 bg-red-50 text-red-600 p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="font-semibold text-base md:text-lg">
          Emergency Services Available 24/7
        </h2>
        <p className="text-sm">
          Call our emergency hotline for immediate medical assistance or ambulance dispatch.
        </p>
      </div>
      <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
        <FiPhoneCall className="text-lg" />
        <span className="text-sm font-medium">Emergency Call</span>
      </button>
    </div>
  );
}
