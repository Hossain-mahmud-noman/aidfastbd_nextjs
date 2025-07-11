'use client';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md mb-4">
        <img
          src="/loading.gif"
          alt="Loading"
          className="w-full h-auto"
        />
      </div>
      <p className="text-primary font-semibold text-lg md:text-3xl lg:text-5xl xl:text-8xl animate-pulse">
        Loading AidFast...
      </p>
    </div>
  );
};

export default Loader;
