import React, { useEffect, useState } from 'react'
import { image_base_endpoint } from '../../../utils/constants';
import Image from 'next/image';

function BloodProfileInfo({ data, user, token }) {


  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(data?.title);
  const [details, setDetails] = useState(data?.details);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };



  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('UserId', user?.id || '96afe4ea-6021-4f6f-e116-08dceabe4a3c');
    formData.append('Lat', '0');
    formData.append('Lon', '0');
    formData.append('Title', title);
    formData.append('Deatails', details);

    // Only append the image if it's local
    if (selectedImage && !selectedImage.startsWith(image_base_endpoint)) {
      const blob = await fetch(selectedImage).then((res) => res.blob());
      formData.append('File', blob, 'image.jpg');
    }

    try {
      const response = await fetch('https://api.aidfastbd.com/api/GeneralInformation/SaveBloodBankAdditionalInfo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(`Error: ${result?.message || 'Failed to update profile'}`);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while updating the profile.');
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    if (data !== null) {
      setTitle(data.title);
      setDetails(data.details);
      setSelectedImage(data.imageUrl !== null ? image_base_endpoint + data.imageUrl : null)
    }
  }, [data])

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">

      {/* BCS Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add a short title about your blood bank/donor club</label>
        <input
          value={title}
          onChange={handleTitleChange}
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* BCS Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Describe  breif about it</label>
        <textarea
          value={details}
          onChange={handleDetailsChange}
          type="text"
          rows={8}
          placeholder="Details"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Image Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a picture of your diagnostic center or hospital
        </label>

        {/* Preview Section */}
        <div className="mb-4 flex justify-center items-center border rounded-md p-4 bg-gray-50">
          {selectedImage ? (
            <Image
              width={200}
              height={200}
              src={selectedImage}
              alt="Selected Cover"
              className="h-40 w-full object-cover rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-gray-400">No image selected</div>
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                ×
              </button>

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

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Save / Update'}
      </button>

    </div>

  )
}


export default BloodProfileInfo