'use client';
import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import ContacTactModal from "../utils/contactModal";
import { useI18n } from "../context/i18n";

const FloatingCallButton = ({ number }) => {
  const i18n = useI18n()
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label="Call us now"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 z-50"
      >
        <FiPhone className="text-xl animate-pulse" />
        <span className="font-medium">{i18n.t("Call Now")}</span>
      </button>

      <ContacTactModal
        contact={number}
        open={showModal}
        onClose={handleClose}
      />
    </>
  );
};

export default FloatingCallButton;