'use client';

import Image from "next/image";
import React, { useState } from "react";

const ServiceForm = ({ initialData = null, onSubmit, discard ,token,isDental=true}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [details, setDetails] = useState(initialData?.details || "");
  const [imgList, setImgList] = useState(initialData?.imgList || []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {

      const newImages = Array.from(files).map((file) => ({
        Details: "Uploaded Image",
        imgUrl: URL.createObjectURL(file), // Temporary URL for preview
        file, // Store file for submission
      }));

      setImgList([...imgList, ...newImages]);
    }
  };


  // Upload Images to API and Get URLs
  const uploadImages = async () => {
    const uploadedImages = [];

    if (isDental) {
      for (const img of imgList) {

        if (img.file) {        
          const formData = new FormData();
          formData.append("File", img.file);
          formData.append("Details", "Service Image");
  
          try {
            const response = await fetch(
              "https://api.aidfastbd.com/api/GeneralInformation/UploadImg",
              {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
              }
            );
  
            const responseData = await response.json();
            if (response.ok) {
              uploadedImages.push(responseData);
            } else {
              console.error("Image upload failed:", responseData);
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } else {
          uploadedImages.push(img); // Keep existing images
        }
      }
  
    }else{
      for (const img of imgList) {

        if (img?.file) {        
          const formData = new FormData();
          formData.append("File", img.file);
          formData.append("Details", "Service Image");
  
          try {
            const response = await fetch(
              "https://api.aidfastbd.com/api/GeneralInformation/UploadImg",
              {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
              }
            );
  
            const responseData = await response.json();
            
            if (response.ok) {
              uploadedImages.push(responseData.imgUrl);
            } else {
              console.error("Image upload failed:", responseData);
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } else {
          uploadedImages.push(img); // Keep existing images
        }
      }
  
    }

    

    return uploadedImages;
  };

  // Handle Image Removal
  const removeImage = (index) => {
    const updatedImages = imgList.filter((_, i) => i !== index);
    setImgList(updatedImages);
  };

  // Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload new images first
    const finalImgList = await uploadImages();

    setImgList(finalImgList); // Update state
    // Submit data
    onSubmit({ "details": details, "heading": title,imgList: isDental==true? finalImgList:finalImgList.join(",").toString() });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">
        {initialData ? "Update Service" : "Add New Service"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-medium">Service Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Details Input */}
        <div>
          <label className="block font-medium">Service Details</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageUpload}
          />
          {/* Image Preview */}
          <div className="flex flex-wrap mt-2">
            {imgList.map((img, index) => (
              <div key={index} className="relative m-2">
                <Image
                  width={200}
                  height={200}
                  src={img.imgUrl!=null?img.imgUrl:img}
                  alt="Uploaded"
                  className="w-20 h-20 rounded object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded"
        >
          {initialData ? "Update" : "Save"}
        </button>

        {/* Discard Button */}
        <button
          onClick={discard}
          className="w-full bg-gray-500 text-white p-2 rounded mt-2"
        >
          Discard
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
