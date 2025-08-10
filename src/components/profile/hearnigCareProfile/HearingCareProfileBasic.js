'use client';

import React, { useEffect, useState } from 'react';
import { image_base_endpoint } from '../../../utils/constants';
import { FaCalendarAlt } from "react-icons/fa";
import MapComponent from '../../MapComponent';
import Image from 'next/image';
import { toast } from 'sonner';
function InputField({ label, placeholder, type = "text", value, onChange, required = false, maxLength = 255, name }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        name={name}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function Dropdown({ label, options, value, onChange, required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

function HearingCareProfileBasic({ data, token, user, getProfileData }) {

  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [ownerImage, setOwnerImage] = useState(null);
  const [availablityStatus, setAvailablityStatus] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [date, setDate] = useState("");

  const [formData, setFormData] = useState({
    dentalCenterEnglish: "",
    dentalCenterBangla: "",
    location: "",
    emergencyContact: "",
    registrationNo: "",
    serviceTime: "",
    contactNo: "",
    organizationNotice: "",
    ownerName: "",
    ownerMobileNo: "",
    ownerNID: "",
  });

  useEffect(() => {
    if (data) {
      setSelectedLogo(image_base_endpoint + data.profileImageUrl);
      setOwnerImage(image_base_endpoint + data.ownerImageUrl);
      setSelectedCover(image_base_endpoint + data.coverImageUrl);

      if (data.latitude !== null) {
        setLatitude(parseFloat(data.latitude));
      }

      if (data.longitude !== null) {
        setLongitude(parseFloat(data.longitude));
      }

      setDate(data.establishedYear);

      setFormData({
        dentalCenterEnglish: data.name || "",
        dentalCenterBangla: data.nameBn || "",
        location: data.location || "",
        emergencyContact: data.emergencyContactNumber || "",
        registrationNo: data.registrationNumber || "",
        serviceTime: data.serviceTime || "",
        contactNo: data.contact || "",
        organizationNotice: data.notice || "",
        ownerName: data.ownerName || "",
        ownerMobileNo: data.ownerMobileNumber || "",
        ownerNID: data.ownerNID || "",
      });
      setAvailablityStatus(data.isOpen);

    }
  }, [data]);

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('ServiceType', '4');
      form.append('CenterInformation', 'test');
      form.append('Name', formData.dentalCenterEnglish);
      form.append('NameBn', formData.dentalCenterBangla);
      form.append('Location', formData.location);
      form.append('EmergencyContactNumber', formData.emergencyContact);
      form.append('Contact', formData.contactNo);
      form.append('RegistrationNumber', formData.registrationNo);
      form.append('ServiceTime', formData.serviceTime);
      form.append('EstablishedYear', date);

      form.append('Notice', formData.organizationNotice);
      form.append('OwnerName', formData.ownerName);
      form.append('OwnerMobileNumber', formData.ownerMobileNo);
      form.append('OwnerNID', formData.ownerNID);

      form.append('IsOpen', availablityStatus === "true");
      form.append('Latitude', latitude);
      form.append('Longitude', longitude);
      form.append('UserId', user?.userId);

      if (selectedLogo) {
        if (typeof selectedLogo === 'string' && !selectedLogo.startsWith(image_base_endpoint)) {
          const blob = await fetch(selectedLogo).then((res) => res.blob());
          form.append('ProfileImageFile', blob, 'image.jpg');
        } else if (selectedLogo instanceof File) {
          form.append('ProfileImageFile', selectedLogo);
        }
      }

      if (selectedCover) {
        if (typeof selectedCover === 'string' && !selectedCover.startsWith(image_base_endpoint)) {
          const blob = await fetch(selectedCover).then((res) => res.blob());
          form.append('CoverImageFile', blob, 'coverImage.jpg');
        } else if (selectedCover instanceof File) {
          form.append('CoverImageFile', selectedCover);
        }
      }

      if (ownerImage) {
        if (typeof ownerImage === 'string' && !ownerImage.startsWith(image_base_endpoint)) {
          const blob = await fetch(ownerImage).then((res) => res.blob());
          form.append('OwnerImageFile', blob, 'ownerImage.jpg');
        } else if (ownerImage instanceof File) {
          form.append('OwnerImageFile', ownerImage);
        }
      }
      // API call
      const response = await fetch(
        'https://api.aidfastbd.com/api/GeneralInformation/GenericServicesRegistration',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      // Handle response
      if (response.ok) {
        toast.success('Profile Updated Successfully');
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || 'Failed to update profile. Please try again'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };


  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xs font-semibold text-gray-700 mb-4">Add a Profile Picture or Logo</h2>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedLogo ? (
              <Image width={100} height={100} src={selectedLogo} alt="Profile/Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-lg">+</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setSelectedLogo)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Cover Photo */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-700 mb-2">Add a Cover Photo</label>
        <div className="mb-4 flex justify-center items-center border rounded-md p-4 bg-gray-50">
          {selectedCover ? (
            <Image
              width={100}
              height={100}
              src={selectedCover}
              alt="Selected Cover"
              className="h-40 w-full object-contain rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-gray-400">No image selected</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setSelectedCover)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <hr className="my-6" />

      <InputField
        required
        label="Hearing Care Center Name (English)"
        placeholder="Dental Name"
        value={formData.dentalCenterEnglish}
        onChange={handleInputChange}
        name="dentalCenterEnglish"
      />

      <InputField
        required
        label="Hearing Care Center Name (Bangla)"
        placeholder="Dental Name Bangla"
        value={formData.dentalCenterBangla}
        onChange={handleInputChange}
        name="dentalCenterBangla"
      />

      <p className="text-xs text-red-500 mb-4">
        ** After submission, name cannot be changed or edited.
      </p>
      <hr className="my-6" />

      <InputField
        required
        label="Location Area"
        placeholder="Enter Location Area"
        value={formData.location}
        onChange={handleInputChange}
        name="location"
      />
      <div className="mb-4 border">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Hearing Care Center Map Location</label>
        <MapComponent
          lat={latitude}
          lon={longitude}
          onLocationSelect={(lat, lon) => {
            setLatitude(lat);
            setLongitude(lon);
          }}
        />
        <p className="text-sm mt-2">
          Selected Location: Lat {latitude || "N/A"}, Lon {longitude || "N/A"}
        </p>
      </div>

      <InputField
        label="Emergency Contact Number"
        placeholder="Enter emergency number"
        value={formData.emergencyContact}
        onChange={handleInputChange}
        name="emergencyContact"
      />

      <p className="text-xs text-red-500 mb-4">
        ** If you want to provide emergency service, add an emergency contact number, otherwise skip.
      </p>

      <InputField
        label="Registration No"
        placeholder="Registration No"
        value={formData.registrationNo}
        onChange={handleInputChange}
        name="registrationNo"
      />

      <InputField
        label="Contact No."
        placeholder="Contact No."
        value={formData.contactNo}
        onChange={handleInputChange}
        name="contactNo"
      />

      <p className="text-xs text-red-500 mb-4">
        Any kind of small information you want to highlight, Give in notice.
      </p>
      <InputField
        label="Service Time"
        placeholder="Service Time"
        value={formData.serviceTime}
        onChange={handleInputChange}
        name="serviceTime"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Established Date</label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <InputField
        label="Notice"
        placeholder="Enter your notice"
        value={formData.organizationNotice}
        onChange={handleInputChange}
        name="organizationNotice"
      />

      <p className="text-xs text-red-500 mb-4">
        Any kind of small information you want to highlight, Give in notice.
      </p>




      <Dropdown
        label="Open"
        options={[
          { value: true, text: "Yes" },
          { value: false, text: "No" }
        ]}
        value={availablityStatus}
        onChange={(e) => setAvailablityStatus(e.target.value)}
      />



      <hr className="my-6" />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Owner Section (Not visible to users)
      </label>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {ownerImage ? (
              <Image
                width={100}
                height={100}
                src={ownerImage}
                alt="Profile/Owner"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">+</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setOwnerImage)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <InputField
        required
        label="Owner Name"
        placeholder="Owner Name"
        value={formData.ownerName}
        onChange={handleInputChange}
        name="ownerName"
      />

      <InputField
        required
        label="Owner Mobile No"
        placeholder="Owner Mobile No"
        value={formData.ownerMobileNo}
        onChange={handleInputChange}
        name="ownerMobileNo"
      />

      <InputField
        label="Owner NID"
        placeholder="Owner NID"
        value={formData.ownerNID}
        onChange={handleInputChange}
        name="ownerNID"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Save / Update
      </button>
    </div>
  );
}

export default HearingCareProfileBasic