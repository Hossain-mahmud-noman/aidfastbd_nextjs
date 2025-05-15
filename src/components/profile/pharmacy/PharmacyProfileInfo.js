import Image from 'next/image';
import { image_base_endpoint, base_endpoint } from '../../../utils/constants';
import React, { useEffect, useState } from 'react';

function PharmacyProfileInfo({ data, user, token }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(data?.title || '');
  const [details, setDetails] = useState(data?.details || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailsChange = (e) => setDetails(e.target.value);

  const handleImageRemove = () => setSelectedImage(null);

  const handleData = async () => {
    if (!title || !details) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    setIsSubmitting(true);

    formData.append('Title', title);
    formData.append('Details', details);
    formData.append('UserId', user?.id);

    if (selectedImage && typeof selectedImage === 'string' && !selectedImage.startsWith(image_base_endpoint)) {
      const blob = await fetch(selectedImage).then((res) => res.blob());
      formData.append('File', blob, 'image.jpg');
    } else if (selectedImage instanceof File) {
      formData.append('File', selectedImage);
    }

    try {
      const url = `${base_endpoint}/GeneralInformation/SavePharmacyAdditionalInfo`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Profile saved successfully!');
      } else {
        const errorMessages = result.errors
          ? Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
              .join('\n')
          : result.message || 'An unknown error occurred';
        alert(`Error: ${errorMessages}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDetails(data.details || '');
      setSelectedImage(data.imageUrl ? `${image_base_endpoint}${data.imageUrl}` : null);
    }
  }, [data]);

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a short title about your Pharmacy
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe briefly about it
        </label>
        <textarea
          value={details}
          onChange={handleDetailsChange}
          placeholder="Details"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add your Pharmacy picture
        </label>
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
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        {selectedImage && (
          <button
            type="button"
            onClick={handleImageRemove}
            className="mt-2 text-red-500 text-sm underline"
          >
            Remove image
          </button>
        )}
      </div>

      <button
        onClick={handleData}
        disabled={isSubmitting}
        className={`w-full p-2 rounded-md transition ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Save / Update'}
      </button>
    </div>
  );
}

export default PharmacyProfileInfo;
