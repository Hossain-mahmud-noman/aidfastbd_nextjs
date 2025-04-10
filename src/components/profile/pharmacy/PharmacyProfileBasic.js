import React, { useEffect, useState } from 'react';
import { base_endpoint, headerx, image_base_endpoint } from '../../../utils/constants';
import MapComponent from '../../MapComponent';

function InputField({ label, placeholder, type = "text", value, onChange, required = false }) {
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function PharmacyProfileBasic({ data, isRegister, token, user }) {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null); // Added cover image state
  const [ownerImage, setOwnerImage] = useState(null);
  const [availablityStatus, setAvailablityStatus] = useState("");

  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [location, setLocation] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [notice, setNotice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerMobileNumber, setOwnerMobileNumber] = useState('');
  const [ownerNID, setOwnerNID] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleData = async () => {
    if (!name || !nameBn || !location || !ownerName || !ownerMobileNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    formData.append('Name', name);
    formData.append('NameBn', nameBn);
    formData.append('Location', location);
    formData.append('EmergencyContactNumber', emergencyContactNumber);
    formData.append('RegistrationNumber', registrationNumber);
    formData.append('ServiceTime', serviceTime);
    formData.append('ContactNumber', contactNumber);
    formData.append('Notice', notice);
    formData.append('OwnerName', ownerName);
    formData.append('OwnerMobileNumber', ownerMobileNumber);
    formData.append('OwnerNID', ownerNID);
    formData.append('Latitude', latitude ? parseFloat(latitude) : null);
    formData.append('Longitude', longitude ? parseFloat(longitude) : null);
    formData.append('IsOpen', isOpen);
    formData.append('UserId', user?.id);


    // Check if selectedLogo is a string (URL) and not a local file
    if (selectedLogo) {
      if (typeof selectedLogo === 'string' && !selectedLogo.startsWith(image_base_endpoint)) {
        // If it's a URL (not a local file), fetch it and convert to a blob
        const blob = await fetch(selectedLogo).then((res) => res.blob());
        // Append the fetched image as a blob with a name for the file
        formData.append('ProfileImageFile', blob, 'image.jpg');  // You can add dynamic filename extensions here if needed
      } else if (selectedLogo instanceof File) {
        // If selectedLogo is already a File object, just append it
        formData.append('ProfileImageFile', selectedLogo);
      }
    }
    // Handle coverImage
    if (coverImage) {
      if (typeof coverImage === 'string' && !coverImage.startsWith(image_base_endpoint)) {
        // If it's a URL (not a local file), fetch it and convert to a blob
        const blob = await fetch(coverImage).then((res) => res.blob());
        formData.append('CoverImageFile', blob, 'coverImage.jpg');
      } else if (coverImage instanceof File) {
        // If coverImage is already a File object, just append it
        formData.append('CoverImageFile', coverImage);
      }
    }

    // Handle ownerImage
    if (ownerImage) {
      if (typeof ownerImage === 'string' && !ownerImage.startsWith(image_base_endpoint)) {
        // If it's a URL (not a local file), fetch it and convert to a blob
        const blob = await fetch(ownerImage).then((res) => res.blob());
        formData.append('OwnerImageFile', blob, 'ownerImage.jpg');
      } else if (ownerImage instanceof File) {
        // If ownerImage is already a File object, just append it
        formData.append('OwnerImageFile', ownerImage);
      }
    }

    
    try {
      const url = `${base_endpoint}/GeneralInformation/PharmacyRegistration`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Sending FormData as the body
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        // Check for validation errors and show them
        if (result.errors) {
          let errorMessages = "Please address the following errors:\n";
          for (const field in result.errors) {
            errorMessages += `${field}: ${result.errors[field].join(", ")}\n`;
          }
          alert(errorMessages);
        } else {
          alert(`Error: ${result.message || 'An unknown error occurred'}`);
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedLogo(image_base_endpoint + data.profileImageUrl);
      setOwnerImage(image_base_endpoint + data.ownerImageUrl);
      setCoverImage(image_base_endpoint + data.coverImageUrl);
      setName(data.name || '');
      setNameBn(data.nameBn || '');
      setLocation(data.location || '');
      setEmergencyContactNumber(data.emergencyContactNumber || '');
      setRegistrationNumber(data.registrationNumber || '');
      setServiceTime(data.serviceTime || '');
      setContactNumber(data.contactNumber || '');
      setNotice(data.notice || '');
      setOwnerName(data.ownerName || '');
      setOwnerMobileNumber(data.ownerMobileNumber || '');
      setOwnerNID(data.ownerNID || '');

      console.log(data);
      
      setLatitude(data.lat || '');
      setLongitude(data.lon || '');
      setIsOpen(data.isOpen || false);
      setAvailablityStatus(data.availablityStatus || '');
    }
  }, [data]);

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      <h2 className="text-xs font-semibold text-gray-700 mb-4">Add a Profile Picture or Logo</h2>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedLogo ? (
              <img src={selectedLogo} alt="Profile/Logo" className="w-full h-full object-cover" />
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

      {/* Cover Image Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a cover picture of your Pharmacy
        </label>
        <div className="mb-4 flex justify-center items-center border rounded-md p-4 bg-gray-50">
          {coverImage ? (
            <img
              src={coverImage}
              alt="Selected Cover"
              className="h-40 w-full object-cover rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-gray-400">No image selected</div>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setCoverImage)} // handle cover image change
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Input Fields */}
      <InputField required label="Pharmacy Name (English)" placeholder="Enter Pharmacy Name" value={name} onChange={setName} />
      <InputField required label="Pharmacy Name (Bangla)" placeholder="Enter Pharmacy Name Bangla" value={nameBn} onChange={setNameBn} />
      <p className="text-xs text-red-500 mb-4">** After submission, name cannot be changed or edited.</p>
      <hr className="my-6" />
      <InputField required label="Location" placeholder="Enter Location" value={location} onChange={setLocation} />
      <InputField label="Emergency Contact Number" placeholder="Enter emergency number" value={emergencyContactNumber} onChange={setEmergencyContactNumber} />
      <InputField label="Registration No" placeholder="Registration No" value={registrationNumber} onChange={setRegistrationNumber} />
      <InputField label="Service Time" placeholder="Service Time" value={serviceTime} onChange={setServiceTime} />
      <InputField label="Contact No." placeholder="Contact No." value={contactNumber} onChange={setContactNumber} />
      <InputField label="Pharmacy Notice" placeholder="Enter your notice" value={notice} onChange={setNotice} />

      {/* Availability Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pharmacy Availability</label>
        <select
          value={availablityStatus}
          onChange={(e) => setAvailablityStatus(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>Select Pharmacy Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Owner Section */}
      <hr className="my-6" />
      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Section (Not visible to users)</label>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {ownerImage ? (
              <img src={ownerImage} alt="Owner" className="w-full h-full object-cover" />
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

      {/* Owner Fields */}
      <InputField required label="Owner's Name" placeholder="Enter Owner's Name" value={ownerName} onChange={setOwnerName} />
      <InputField required label="Owner's Mobile Number" placeholder="Enter Owner's Mobile Number" value={ownerMobileNumber} onChange={setOwnerMobileNumber} />
      <InputField label="Owner's NID" placeholder="Owner's NID" value={ownerNID} onChange={setOwnerNID} />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Chamber Location</label>
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

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <span className="ml-2 text-sm text-gray-600">Open Pharmacy</span>
      </div>

      <div className="flex justify-center">
        <button onClick={handleData} className="bg-blue-500 text-white p-3 rounded-md shadow-md">Save</button>
      </div>
    </div>
  );
}

export default PharmacyProfileBasic;
