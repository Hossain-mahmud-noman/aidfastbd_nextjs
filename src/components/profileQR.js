"use client";
import React, { useState } from "react";
import { IoQrCode } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaWhatsapp, FaShareAlt } from "react-icons/fa";

function ProfileQR({ id = null, type = null, slug = null, }) {
  console.log("🚀 ~ ProfileQR ~ id:", id);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchQRCode = async () => {
    if (!id) return;
    if (slug === "newService") {
      const qrUrl = `https://api.aidfastbd.com/api/QR/GetQRCodeGenericService?id=${id}`;
      setQrCodeUrl(qrUrl);
      setIsModalOpen(true);
    } else {
      const qrUrl = `https://api.aidfastbd.com/api/QR/GetQRCode${type}?id=${id}`;
      setQrCodeUrl(qrUrl);
      setIsModalOpen(true);
    }
    // https://api.aidfastbd.com/api/QR/GetQRCodeDoctor?id=260caa70-1d41-4a94-46cd-08dc7a08e14c
    // const qrUrl = `https://api.aidfastbd.com/api/QR/GetQRCodeGenericService?id=${id}`;
    // https://api.aidfastbd.com/api/QR/GetQRCodeGenericService?id=778f9bcb-5fa6-4c8e-cc1e-08dd83644117
  };

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `qr_code_${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this QR Code!",
          text: "Scan this QR code to access the link.",
          url: qrCodeUrl,
        });
      } else {
        alert("Web Share API not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
    }
  };

  return (
    <div className="relative">
      {/* QR Code Button */}
      <button
        onClick={fetchQRCode}
        className="p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none transition duration-300 ease-in-out "
        aria-label="Show QR Code"
      >
        <IoQrCode size={24} />
      </button>

      {/* QR Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Profile QR Code</h2>
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            )}

            <div className="flex justify-center gap-4">
              {/* Download Button */}
              <button
                onClick={downloadQRCode}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Download
              </button>

              {/* Share Button */}
              <button
                onClick={shareQRCode}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center gap-2"
              >
                <FaShareAlt /> Share
              </button>
            </div>

            {/* Social Media Links (Fallback) */}
            <div className="mt-4 flex justify-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  qrCodeUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-2xl"
                title="Share on Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  qrCodeUrl
                )}&text=Scan this QR Code!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-2xl"
                title="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=Scan this QR Code: ${encodeURIComponent(
                  qrCodeUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 text-2xl"
                title="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileQR;
