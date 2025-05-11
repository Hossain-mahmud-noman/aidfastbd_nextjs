// components/TextTicker.js
// import React from 'react';

// const TextTicker = ({ text }) => {
//   return (
//     <div className="rounded overflow-hidden whitespace-nowrap flex items-center bg-black text-white w-full mb-2">
//       <div className="flex animate-scroll">
//         <span className="mx-4">{text}</span>
//         <span className="mx-4">{text}</span>
//       </div>
//     </div>
//   );
// };

// export default TextTicker;



'use client';

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const TextTicker = ({ text }) => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() =>{
        setAnimate(true);
      }, 100);
    }, 20000);

    return () => clearInterval(timer);
  }, []);
  if(text==""){
    return null;
  }

  return (
    <div className="w-full rounded bg-black text-white w-full overflow-hidden py-1">

      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative flex items-center overflow-hidden"
          role="marquee"
          aria-live="polite"
        >
          <div
            className={`flex items-center space-x-8 whitespace-nowrap ${animate ? "animate-ticker" : "transform translate-x-full"
              }`}
          >

            <div
              className="flex items-center space-x-3 text-white font-medium"
            >
              <span className="text-lg">{text}</span>
              <FaArrowRight className="text-yellow-300" />
            </div>

          </div>

          <div
            className={`flex items-center space-x-8 whitespace-nowrap ${animate ? "animate-ticker2" : "transform translate-x-full"
              }`}
          >

            <div
              key={`duplicate-${1}`}
              className="flex items-center space-x-3 text-white font-medium"
            >
              <span className="text-lg">{text}</span>
              <FaArrowRight className="text-yellow-300" />
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes ticker2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-ticker {
          animation: ticker 20s linear infinite;
        }

        .animate-ticker2 {
          animation: ticker2 20s linear infinite;
        }
      }`}</style>
    </div>
  );
};

export default TextTicker;
