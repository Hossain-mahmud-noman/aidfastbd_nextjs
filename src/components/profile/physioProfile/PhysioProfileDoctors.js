import React, { useState } from "react";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Button, Form, Input, Modal } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";

function PhysioProfileDoctors({ data, user, token, id, getProfileData }) {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);   
  const [preview, setPreview] = useState(null);
  // Save new physiotherapist
  const saveDoctor = async (values) => {
    try {
      const formData = new FormData();
      formData.append("GenericServiceId", id);
      formData.append("ServiceType", 3);
      formData.append("Name", values.Name);
      formData.append("Degree", values.Degree);
      formData.append("Age", values.Age);
      formData.append("Experience", values.Experience);

      if (image) {
        if (typeof image === "string" && !image.startsWith(image_base_endpoint)) {
          const blob = await fetch(image).then((res) => res.blob());
          formData.append("ImageFile", blob, "image.jpg");
        } else if (image instanceof File) {
          formData.append("ImageFile", image);
        }
      }



      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/SaveGenericServiceAdditionalProfile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setModalVisible(false);
        form.resetFields();
        setImage(null);
        if (typeof getProfileData === "function") {
          await getProfileData();
        }
        toast.success("Physiotherapist added successfully!");
      } else {
        toast.error("Failed to add physiotherapist.");
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast.error("Something went wrong while adding physiotherapist.");
    }
  };

  // Remove doctor
  const removeDoctor = async (doctorId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (!result.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.append("id", doctorId);

      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/DeleteGenericServiceAdditionalProfile",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        if (typeof getProfileData === "function") {
          await getProfileData();
        }
        toast.success("Doctor removed successfully!");
      } else {
        toast.error("Failed to remove doctor.");
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
      toast.error("Something went wrong while removing doctor.");
    }
  };


  // Handle file input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warning("File size should be less than 2MB");
        return;
      }

      setImage(file); // Keep file for FormData

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Set preview
      };
      reader.readAsDataURL(file);
    }
  };


  const closeModal = () => {
    setModalVisible(false);
    setImage(null);
    setPreview(null);
    form.resetFields();
  };

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h1 className="text-lg font-bold mb-4">
        Add Physiotherapist profile of your Physiotherapy Center
      </h1>

      <Button
        icon={<IoMdAddCircleOutline />}
        onClick={() => setModalVisible(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Physiotherapist
      </Button>

      <div className="mt-4 space-y-4">
        {data?.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded shadow flex items-center space-x-4"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                width={64}
                height={64}
                src={`${image_base_endpoint}${doctor.imageUrl}`}
                alt={doctor.name}
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.degree}</p>
              <p className="text-sm text-gray-500">{doctor.experience}</p>
            </div>
            <Button danger onClick={() => removeDoctor(doctor.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for Add Physiotherapist */}
      <Modal
        title="Add New Physiotherapist"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >

        <div className="flex justify-center mb-4 relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {preview ? (
              // Use a regular img tag for local previews
              <img
                src={preview}
                alt="Doctor preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-lg">+</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <Form layout="vertical" form={form} onFinish={saveDoctor}>

          <Form.Item
            name="Name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter physiotherapist name" />
          </Form.Item>

          <Form.Item
            name="Degree"
            label="Degree"
            rules={[{ required: true, message: "Please enter degree" }]}
          >
            <Input placeholder="Enter degree" />
          </Form.Item>

          <Form.Item
            name="Experience"
            label="Experience"
            rules={[{ required: true, message: "Please enter experience" }]}
          >
            <Input placeholder="Enter years of experience" />
          </Form.Item>

          <Form.Item
            name="Age"
            label="Age"
            rules={[{ required: true, message: "Please enter age" }]}
          >
            <Input placeholder="Enter age" type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PhysioProfileDoctors;
