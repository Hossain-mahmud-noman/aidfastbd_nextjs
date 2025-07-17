import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import MapComponent from '../../MapComponent';
import { image_base_endpoint } from '../../../utils/constants';
import Image from 'next/image';
import { toast } from 'sonner';
function InputField({ label, placeholder, type = "text", value, onChange, required = false, maxLength }) {
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
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function BloodProfileBasic({ data, user, token }) {
  console.log("🚀 ~ BloodProfileBasic ~ data:", data)

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [dateOfEstablish, setDateOfEstablish] = useState("");
  const [ownerImage, setOwnerImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [location, setLocation] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [notice, setNotice] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerMobileNumber, setOwnerMobileNumber] = useState("");
  const [ownerNid, setOwnerNid] = useState("");
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.warning("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!name) errors.name = "Club name is required.";
    if (!location) errors.location = "Location is required.";
    if (!emergencyContact) errors.emergencyContact = "Emergency contact is required.";
    if (!registrationNo) errors.registrationNo = "Registration number is required.";
    if (!serviceTime) errors.serviceTime = "Service time is required.";
    if (!dateOfEstablish) errors.dateOfEstablish = "Establish date is required.";
    if (!ownerName) errors.ownerName = "Owner name is required.";
    if (!ownerMobileNumber) errors.ownerMobileNumber = "Owner mobile number is required.";
    if (!ownerNid) errors.ownerNid = "Owner NID is required.";
    if (!latitude || !longitude) errors.locationSelect = "Location on map is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("NameBn", nameBn);
    formData.append("Location", location);
    formData.append("EmergencyContactNumber", emergencyContact);
    formData.append("RegistrationNumber", registrationNo);
    formData.append("ServiceTime", serviceTime);
    formData.append("EstablishedYear", dateOfEstablish);
    formData.append("Notice", notice);
    formData.append("OwnerName", ownerName);
    formData.append("OwnerMobileNumber", ownerMobileNumber);
    formData.append("OwnerNID", ownerNid);
    formData.append("Latitude", latitude);
    formData.append("Longitude", longitude);
    formData.append("IsOpen", isOpen);
    formData.append("UserId", user.id);
    formData.append("Contact", emergencyContact);

    if (selectedLogo) {
      if (typeof selectedLogo === 'string' && !selectedLogo.startsWith(image_base_endpoint)) {
        const blob = await fetch(selectedLogo).then((res) => res.blob());
        formData.append('ProfileImageFile', blob, 'image.jpg');
      } else if (selectedLogo instanceof File) {
        formData.append('ProfileImageFile', selectedLogo);
      }
    }

    if (selectedCover) {
      if (typeof selectedCover === 'string' && !selectedCover.startsWith(image_base_endpoint)) {
        const blob = await fetch(selectedCover).then((res) => res.blob());
        formData.append('CoverImageFile', blob, 'coverImage.jpg');
      } else if (selectedCover instanceof File) {
        formData.append('CoverImageFile', selectedCover);
      }
    }

    if (ownerImage) {
      if (typeof ownerImage === 'string' && !ownerImage.startsWith(image_base_endpoint)) {
        const blob = await fetch(ownerImage).then((res) => res.blob());
        formData.append('OwnerImageFile', blob, 'ownerImage.jpg');
      } else if (ownerImage instanceof File) {
        formData.append('OwnerImageFile', ownerImage);
      }
    }

    try {
      const response = await fetch("https://api.aidfastbd.com/api/GeneralInformation/BloodBankRegistration", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        if (data.id) {
          toast.success("Blood Profile Updated Successfully!");
        }
        else {
          toast.success("Blood Profile Created Successfully!");
        }

      } else {
        toast.error("Failed to create blood profile.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while submitting the profile.");
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedLogo(image_base_endpoint + data.profileImageUrl);
      setOwnerImage(image_base_endpoint + data.ownerImageUrl);
      setSelectedCover(image_base_endpoint + data.coverImageUrl);
      setName(data.name || '');
      setNameBn(data.nameBn || '');
      setLocation(data.location || '');
      setEmergencyContact(data.emergencyContactNumber || '');
      setRegistrationNo(data.registrationNumber || '');
      setDateOfEstablish(data.establishedYear || '');
      setServiceTime(data.serviceTime || '');
      setNotice(data.notice || '');
      setOwnerName(data.ownerName || '');
      setOwnerMobileNumber(data.ownerMobileNumber || '');
      setOwnerNid(data.ownerNID || '');
      setLatitude(+data.latitude || '');
      setLongitude(+data.longitude || '');
      setIsOpen(data.isOpen || false);
    }
  }, [data]);



  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xs font-semibold text-gray-700 mb-4">Add a Profile Picture or Logo</h2>

      {/* Profile/Logo Picture */}
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
              width={1000}
              height={1000}
              src={selectedCover}
              alt="Selected Cover"
              className="h-40 w-full object-cover rounded-md"
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
      <InputField label="Blood Bank Club Name" placeholder="Enter Club Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <InputField label="Blood Bank Club Name" placeholder="Enter Club Name(Bangla)" value={nameBn} onChange={(e) => setNameBn(e.target.value)} required />

      {/* Input Fields */}
      <InputField label="Emergency Contact Number (Visible for users)" placeholder="Enter Contact Number" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} required />
      <InputField label="Location" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <InputField label="Registration No" placeholder="Enter Registration Number" value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} required />
      <InputField label="Service Time" placeholder="Enter Service Time" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} required />
      <InputField label="Blood Bank Club Notice" placeholder="Enter Blood Bank Club Notice" value={notice} onChange={(e) => setNotice(e.target.value)} />
      <p className="text-xs text-red-500 mb-4">Any kind of small information you want to highlight, give in notice</p>

      {/* Establish Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Establish Date</label>
        <div className="relative">
          <input
            type="date"
            value={dateOfEstablish}
            onChange={(e) => setDateOfEstablish(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-red-500 mb-4">** After submission, the name cannot be changed or edited **</p>


      <hr className="my-6" />
      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Section (Not visible to users)</label>

      {/* Profile/Logo Picture for Owner */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {ownerImage ? (
              <Image
                width={1000}
                height={1000}
                src={ownerImage}
                alt="Owner"
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

      <div className="mb-4 border">
        <label className="block text-sm font-medium text-gray-700 mb-2 ">Select Chamber Location</label>
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

      <InputField required={true} label="Owner Name" placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
      <InputField required={true} label="Owner Mobile No" placeholder="Owner Mobile No" value={ownerMobileNumber} onChange={(e) => setOwnerMobileNumber(e.target.value)} />
      <InputField label="Owner NID" placeholder="Owner NID" value={ownerNid} onChange={(e) => setOwnerNid(e.target.value)} />



      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <span className="ml-2 text-sm text-gray-600">Open Blood Bank Club</span>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default BloodProfileBasic;
