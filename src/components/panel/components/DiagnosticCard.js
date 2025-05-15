import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { panel_base } from '../../../utils/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function  DiagnosticCard({ service, onSave }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serviceData, setDoctorData] = useState({ ...service });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    const panelToken = Cookies.get('panel_token');
    if (!panelToken) {
      console.error('panel_token not found in cookies.');
      return;
    }

    try {
      const response = await axios.put(
        `${panel_base}/diagnostic/${serviceData.id}/meta-update`,
        {
          slug: serviceData.slug,
          meta_description: serviceData.meta_description },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${panelToken}`,
          },
        }
      );

      if (response.status === 200) {
        onSave(serviceData);
        setIsPopupOpen(false);
      } else if (response.status === 401) {
        window.location.href = "/api/panel-logout";
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/api/panel-logout";
      } else {
        console.error('Error updating service:', error);
      }
    }
  };

  return (
    <div>
      <div
        className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <Image
          width={200}
          height={200}
          src={
            service.profileImageUrl
              ? `https://api.aidfastbd.com/${service.profileImageUrl}`
              : '/default-service.png'
          }
          alt={service.name}
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h3 className="font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-500">
          Slug: {service.slug ? service.slug : 'N/A'}
        </p>
      </div>

      {serviceData.slug && <div
        onClick={() => {
          window.open("https://aidfastbd.com/diagnostic/d/" +serviceData.slug, "_blank");
        }}
        className="bg-green-500 text-white w-full h-10 flex items-center justify-center rounded cursor-pointer hover:bg-green-600"
      >
        Visit Profile
      </div>}

      {/* Modal for editing service */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-start z-50">
          <div
            className="bg-white p-6 rounded-lg max-h-[80vh] overflow-auto"
            style={{
              marginTop: '5%', // Adds 5% top margin
              width: "90%"
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit  Details</h2>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <FaTimes color='red' size={20} /> {/* Close icon */}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-semibold">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={serviceData.slug || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>



              <hr className="mt-4 mb-4 border-t border-gray-300" />


             

              <div className="mb-4">
                <label className="block text-sm font-semibold">Meta Description</label>
                <textarea
                  name="meta_description"
                  value={serviceData.meta_description || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
