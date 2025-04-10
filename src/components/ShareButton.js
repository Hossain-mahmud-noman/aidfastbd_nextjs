"use client";
import { IoShareSocialSharp } from "react-icons/io5";
import React, { useState } from "react";
import { FaFacebook, FaWhatsapp, FaTelegram, FaTwitter, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ShareButton = ({ link, ShareContentText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const currentURL = encodeURIComponent(link || window.location.href);
  const contentText = encodeURIComponent(ShareContentText || "Check this out!");

  const shareOptions = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#3b5998",
      url: `https://www.facebook.com/sharer/sharer.php?u=`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      url: `https://wa.me/?text=${contentText}%20`,
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "#0088cc",
      url: `https://t.me/share/url?url=`,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "#1DA1F2",
      url: `https://twitter.com/intent/tweet?url=${currentURL}&text=`,
    },
    {
      name: "Copy Link",
      icon: FaCopy,
      color: "#6c757d",
    },
  ];

  const handleShare = (option) => {
    const urlx = encodeURIComponent(window.location.href);

    setActiveOption(option);
    if (option.url) {
      window.open(option.url + urlx, "_blank", "width=600,height=400");
      setIsModalOpen(false);
    } else if (option.name === "Copy Link") {
      navigator.clipboard.writeText(window.location.href);
      setIsModalOpen(false);
      alert("Link copied to clipboard!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveOption(null);
  };

  return (
    <div className="relative">
      {/* Button to open the share modal */}

      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none mr-3 transition duration-300 ease-in-out"
        aria-label="Open share options"
      >
        <IoShareSocialSharp className="h-6 w-6"></IoShareSocialSharp>
      </button>

      {/* Modal for share options */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl text-black font-bold mb-4">Share via</h2>
              <div className="grid grid-cols-3 gap-4">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition duration-300 ease-in-out ${activeOption === option ? "bg-gray-200" : "hover:bg-gray-100"
                      }`}
                    aria-label={`Share via ${option.name}`}
                  >
                    <option.icon
                      className="text-3xl mb-2"
                      style={{ color: option.color }}
                    />
                    <span className="text-sm text-black">{option.name}</span>
                  </button>
                ))}
              </div>

              {/* Display message when a share option is selected */}
              {activeOption && activeOption.name === "Copy Link" && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Link copied to clipboard!
                  </h3>
                </div>
              )}

              {/* Close button for modal */}
              <button
                onClick={handleCloseModal}
                className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                aria-label="Close share modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;

