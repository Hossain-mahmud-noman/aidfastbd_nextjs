'use client';

import { useRouter } from "next/navigation";


const AppBar = ({ title = "AidFast", leadingIcon, trailingComponents }) => {
  const router = useRouter();
  return (
    <header >
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-[10000]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {leadingIcon ? (
              <button onClick={() => {

                if (window.history.length <= 2) {
                  window.location.href = "/"
                } else {
                  router.back();
                }

              }}
                className="ml-4 p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none  transition duration-300 ease-in-out"
                aria-label="Go back"
              >
                {leadingIcon}
              </button>
            ) : null}
            <h1 className="ml-3 text-xl font-semi text-black">{title}</h1>
          </div>
          <div className="md:flex items-center space-x-4">
            {trailingComponents}
          </div>
        </div>
      </div>

    </header>
  );
};

export default AppBar;
