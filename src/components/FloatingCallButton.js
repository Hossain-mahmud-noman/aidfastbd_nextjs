'use client';
import React from "react";
import { FiPhone } from "react-icons/fi";

const FloatingCallButton = ({number}) => {
  const handleCall = () => {
    window.location.href = "tel:"+number;
  };

  return (
    <button
      onClick={handleCall}
      aria-label="Call us now"
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 z-50"
    >
      <FiPhone className="text-xl animate-pulse" />
      <span className="font-medium">Call Now</span>
    </button>
  );
};

export default FloatingCallButton;