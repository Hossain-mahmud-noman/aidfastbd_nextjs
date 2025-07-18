import Image from 'next/image';
import { image_base_endpoint, base_endpoint } from '../../../utils/constants';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function PharmacyProfileInfo({ data, user, token }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(data?.title || '');
  const [details, setDetails] = useState(data?.details || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDetails(data.details || '');
      setSelectedImage(data.imageUrl ? `${image_base_endpoint}${data.imageUrl}` : null);
    }
  }, [data]);

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
    if (!title.trim() || !details.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    setIsSubmitting(true);

    formData.append('Title', title);
    formData.append('Details', details);
    formData.append('UserId', user?.id);

    try {
      if (selectedImage && typeof selectedImage === 'string' && !selectedImage.startsWith(image_base_endpoint)) {
        const blob = await fetch(selectedImage).then((res) => res.blob());
        formData.append('File', blob, 'image.jpg');
      }

      const url = `${base_endpoint}/GeneralInformation/SavePharmacyAdditionalInfo`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Pharmacy profile saved successfully!');
      } else {
        const errorMessages = result.errors
          ? Object.entries(result.errors)
              .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
              .join('\n')
          : result.message || 'An unknown error occurred';
        toast.error(errorMessages);
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Pharmacy Profile Info</h2>

      {/* Title Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pharmacy Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a short title"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Details Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={details}
          onChange={handleDetailsChange}
          placeholder="Brief description about your pharmacy"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pharmacy Image
        </label>
        <div className="flex justify-center items-center border rounded-md p-4 bg-gray-50">
          {selectedImage ? (
            <div className="w-48 h-40 relative rounded overflow-hidden border">
              <Image
                src={selectedImage}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              No image selected
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-3 w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        {selectedImage && (
          <button
            type="button"
            onClick={handleImageRemove}
            className="mt-2 text-red-500 text-sm underline hover:text-red-700"
          >
            Remove image
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleData}
        disabled={isSubmitting}
        className={`w-full py-2 text-white font-semibold rounded-md transition ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Save / Update'}
      </button>
    </div>
  );
}

export default PharmacyProfileInfo;
