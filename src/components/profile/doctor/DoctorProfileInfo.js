'use client';

import React, { useState } from 'react';
import { image_base_endpoint } from '../../../utils/constants';
import Image from 'next/image';
import { toast } from 'sonner';
function DoctorProfileInfo({ data, user, token }) {
    console.log("🚀 ~ DoctorProfileInfo ~ data:", data)
    const [selectedImage, setSelectedImage] = useState(data?.imageUrl !== undefined ? image_base_endpoint + data?.imageUrl : null);
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
            const response = await fetch('https://api.aidfastbd.com/api/GeneralInformation/SaveDoctorAdditionalInfo', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            console.log("🚀 ~ handleSubmit ~ result:", result)
            if (response.ok) {
                toast.success("Profile information updated successfully!")
            } else {
                toast.error(`Error: ${result?.message || 'Failed to update profile information'}`)
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error("An error occurred while updating the profile.")

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
            {/* Title Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Give a short title about your treatment or about yourself</label>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Details Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe details about your treatment or yourself</label>
                <textarea
                    rows={8}
                    value={details}
                    onChange={handleDetailsChange}
                    placeholder="Details"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Image Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add your cover photo / chamber photo
                </label>

                {/* Preview Section */}
                <div className="mb-4 flex justify-center items-center border rounded-md p-4 bg-gray-50">
                    {selectedImage ? (
                        <div className="relative">
                            <Image
                                width={200}
                                height={200}
                                src={selectedImage}
                                alt="Selected Cover"
                                className="h-40 w-full object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={handleImageRemove}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                                ×
                            </button>
                        </div>
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
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full p-2 rounded-md transition ${
                    isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
                {isSubmitting ? 'Saving...' : 'Save / Update'}
            </button>
        </div>
    );
}

export default DoctorProfileInfo;
