'use client';
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }, [data.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };



  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(nextSlide, 3000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, nextSlide]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === " ") {
      togglePlayPause();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden  shadow-lg"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="relative h-[200px] sm:h-70 md:h-96">
        {data.map((image, index) => (
          <Image
            // width={500}
            // height={500}
            // blurDataURL="https://user-images.githubusercontent.com/160484/173871411-4d27b6dd-af89-4568-863c-c59b1242ce74.png"
            // priority={false}
            // placeholder="blur"
            key={index}
            src={image}
            alt={image}
            className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-gray-800" />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight className="text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute bottom-4 right-4 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FaPause className="text-gray-800" /> : <FaPlay className="text-gray-800" />}
      </button>
    </div>
  );
};

export default Carousel;
