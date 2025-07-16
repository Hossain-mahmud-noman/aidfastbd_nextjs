"use client";
import { useEffect, useState } from "react";
import DataLoad from "./dataLoad";
import { FaSpinner } from "react-icons/fa";
import ServiceCard from "../ServiceCard";

const HearingCareCenterDataLoad = () => {
  const [genericData, setGenericData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const buildApiUrl = (term = "") => {
    const base = "https://api.aidfastbd.com/api/Generic/SearchAllGenericService";
    const params = new URLSearchParams({
      serviceType: "4",
    });
    if (term) {
      params.append("searchTerm", term);
    }
    return `${base}?${params.toString()}`;
  };

  const handleDataLoad = (data, isLoading) => {
    setGenericData(data);
    setLoading(isLoading);
  };

  return (
    <div className="aid-container mt-10">
      <div className="relative w-full mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        />
      </div>

      <DataLoad
        key={debouncedSearch}
        apiUrl={buildApiUrl(debouncedSearch)}
        onDataLoad={handleDataLoad}
      />
      <>
        {loading === false && genericData?.length == 0 ? (
          <div className="h-[300px] w-full flex items-center justify-center text-2xl">
            No data available
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {genericData?.map((d, index) => (
              <ServiceCard slug="hearing-care-center" key={index} data={d} />
            ))}
          </div>
        )}
        <div
          // ref={loader}
          className="flex items-center justify-center p-4 mt-6"
          role="status"
          aria-label="Loading more content"
        >
          {loading && (
            <div className="flex items-center space-x-2">
              <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
              <span className="text-gray-600">Loading dental...</span>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default HearingCareCenterDataLoad;
