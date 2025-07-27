'use client';
import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import ContacTactModal from "../utils/contactModal";
import { useI18n } from "../context/i18n";

const EmergencyCallButton = ({ number }) => {
  const i18n = useI18n()
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label="Call us now"
        className="flex items-center gap-2 my-5 lg:my-8 bg-red-500 text-white py-2 px-4 rounded-lg text-sm shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 z-50"
      >
        <FiPhone className="text-base animate-pulse" />
        <span className="font-medium">{i18n.t("Call Emergency")}</span>
      </button>

      <ContacTactModal
        contact={number}
        open={showModal}
        onClose={handleClose}
      />
    </>
  );
};

export default EmergencyCallButton;