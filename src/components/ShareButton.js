"use client";

import { IoShareSocialSharp } from "react-icons/io5";
import {
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
  FaTwitter,
  FaCopy,
} from "react-icons/fa";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShareButton = ({ link, ShareContentText = "Check this out!" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedLink = encodeURIComponent(link || "");
  const encodedText = encodeURIComponent(ShareContentText);

  const shareOptions = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#3b5998",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      url: `https://wa.me/?text=${encodedText}%20${encodedLink}`,
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "#0088cc",
      url: `https://t.me/share/url?url=${encodedLink}&text=${encodedText}`,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "#1DA1F2",
      url: `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedText}`,
    },
    {
      name: "Copy Link",
      icon: FaCopy,
      color: "#6c757d",
    },
  ];

  const handleShare = (option) => {
    if (option.url) {
      window.open(option.url, "_blank", "width=600,height=400");
    } else if (option.name === "Copy Link") {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none mr-3 transition duration-300 ease-in-out"
        aria-label="Open share options"
      >
        <IoShareSocialSharp className="h-6 w-6" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl text-black font-bold mb-4">Share via</h2>
              <div className="grid grid-cols-3 gap-4">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option)}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition"
                    aria-label={`Share via ${option.name}`}
                  >
                    <option.icon
                      className="text-3xl mb-2"
                      style={{ color: option.color }}
                    />
                    <span className="text-sm text-black text-center">
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Copied feedback */}
              {copied && (
                <p className="mt-4 text-green-600 font-semibold text-center">
                  Link copied to clipboard!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
