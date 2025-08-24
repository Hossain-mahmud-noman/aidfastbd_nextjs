import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
function CareGiverProfileInfo({ data, user, token, id, getProfileData }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(data?.title || "");
  const [details, setDetails] = useState(data?.details || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgList, setImgList] = useState(data?.imgList || []);

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

  const handleImageRemove = (index) => {
    const updatedList = [...imgList];
    updatedList.splice(index, 1);
    setImgList(updatedList);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const blob = await fetch(selectedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("Deatails", "lo");
      formData.append("File", blob, "image.jpg");

      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/UploadImg",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setImgList([...imgList, result]);
        setSelectedImage(null);
        toast.success("File Uploaded Successfully")
      } else {
        toast.error(result?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const simplifiedData = imgList.map(({ imgUrl, details }) => ({ imgUrl, details }));

    const payload = { "userId": user?.userId, "title": title, "imgList": simplifiedData, "details": details, "serviceType": 9, "id": id };
    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveGenericServiceAdditionalInfo",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        if (typeof getProfileData === 'function') {
          await getProfileData();
        }
      } else {
        toast.error(result?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {

    if (data) {
      setTitle(data[0]?.title || "");
      setDetails(data[0]?.details || "");
      setImgList(data[0]?.imgList || []);
    }
  }, [data]);

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      {/* Title Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dental Title
        </label>
        <input
          value={title}
          onChange={handleTitleChange}
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Details Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={details}
          onChange={handleDetailsChange}
          rows={4}
          placeholder="Details"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Image List Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Uploaded Images
        </label>
        <div className="grid grid-cols-2 gap-4">
          {imgList.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                width={100}
                height={100}
                src={`${image.imgUrl}`}
                alt="Uploaded"
                className="w-full h-32 object-cover rounded-md"
              />

              {/* Delete Icon */}
              <MdDelete
                onClick={() => handleImageRemove(index)}
                size={32}
                className="absolute top-2 right-2 text-red-500 cursor-pointer  group-hover:block"
                title="Remove Image" // Optional: Tooltip for better accessibility
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload New Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        {selectedImage && (
          <div className="mt-2 flex justify-between items-center">
            <Image
              width={100}
              height={100}
              src={selectedImage}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md"
            />
            <button
              onClick={handleImageUpload}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {isSubmitting ? "Submitting..." : "Save / Update"}
      </button>
    </div>
  );
}


export default CareGiverProfileInfo