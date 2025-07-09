// components/Loader.js
'use client';

import { FaHeartbeat } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <FaHeartbeat className="animate-pulse text-primary text-5xl mb-2" />
      <p className="text-primary font-semibold text-lg animate-pulse">Loading AidFast...</p>
    </div>
  );
};

export default Loader;
