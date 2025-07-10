'use client';

import { FaHeartbeat } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="w-48 h-48 mb-4">
        <video
          src="/loading.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-primary font-semibold text-lg animate-pulse">
        Loading AidFast...
      </p>
    </div>
  );
};

export default Loader;
