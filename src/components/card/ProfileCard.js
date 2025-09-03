'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";
const ProfileCard = ({ token, user }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter()

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `https://api.aidfastbd.com/api/Auth/GetAllUserProfile?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        const profile = data[0];
        setName(profile.name || "");
        setEmail(profile.userName || "");
        setAge(profile.age || "");
        setAddress(profile.address || "");
        setImage(
          profile.imageUrl !== "" ? "https://api.aidfastbd.com/" + profile.imageUrl : ""
        );
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };


  // Update user profile
  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("UserId", user.id);
      formData.append("Name", name);
      formData.append("Age", age);
      formData.append("Address", address);

      if (image.startsWith("data:image/")) {
        const blob = await fetch(image).then((res) => res.blob());
        formData.append("ImageFile", blob, "profile-image.jpg");
      }

      const res = await fetch(
        "https://api.aidfastbd.com/api/Auth/UpdateUserProfile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.status === 200) {
        await fetchProfile();
        toast.success("Profile updated successfully!")
        router.push("/profile")
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      toast.error("Error updating profile:", err);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className=" flex py-2 px-4 justify-center">
      <div className="w-full max-w-3xl rounded-lg shadow-custom-light p-6">
        {/* Profile Picture */}
        <div className="relative flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            {image ? (
              <Image
                width={100}
                height={100}
                src={image}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-4xl">👤</span>
            )}
          </div>
          <label
            htmlFor="imageUpload"
            className="absolute bottom-1 right-20 lg:right-64 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <FaCamera />

          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Form Fields */}
        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Enter Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Phone/Email</label>
            <input
              type="text"
              value={email}
              readOnly
              className="w-full p-2 text-sm bg-gray-200 border rounded cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Enter Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Enter Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={updateProfile}
            className="w-full py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
