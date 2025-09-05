import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Button, Form, Input, Modal } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

function PhysioProfileDoctors({ data, user, token, id, getProfileData }) {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [doctors, setDoctors] = useState(data || []);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    try {
      const blob = await fetch(selectedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("Deatails", "doctor-image");
      formData.append("File", blob, "doctor-image.jpg");

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
        return result.imgUrl; 
      } else {
        throw new Error(result?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
      throw error;
    }
  };

  const saveDoctor = async (values) => {
    setUploading(true);

    try {
      let imageUrl = null;

      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      if (isEditMode && !imageUrl && editingDoctor?.imageUrl) {
        imageUrl = editingDoctor.imageUrl;
      }

      const formData = new FormData();
      formData.append("GenericServiceId", id);
      formData.append("ServiceType", 3);
      formData.append("Name", values.Name);
      formData.append("Degree", values.Degree);
      formData.append("Age", values.Age);
      formData.append("Experience", values.Experience);

      if (imageUrl) {
        formData.append("ImageUrl", imageUrl);
      }

      const endpoint = isEditMode
        ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateGenericServiceAdditionalProfile"
        : "https://api.aidfastbd.com/api/GeneralInformation/SaveGenericServiceAdditionalProfile";

      const method = isEditMode ? "PUT" : "POST";


      if (isEditMode && editingDoctor) {
        formData.append("Id", editingDoctor.id);
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setModalVisible(false);
        setSelectedImage(null);
        setSelectedFile(null);
        setEditingDoctor(null);
        setIsEditMode(false);
        form.resetFields();

        if (typeof getProfileData === "function") {
          await getProfileData();
        }

        toast.success(`Physiotherapist ${isEditMode ? 'updated' : 'added'} successfully!`);
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'add'} physiotherapist.`);
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast.error(`Something went wrong while ${isEditMode ? 'updating' : 'adding'} physiotherapist.`);
    } finally {
      setUploading(false);
    }
  };


  const editDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setIsEditMode(true);
    setModalVisible(true);

    form.setFieldsValue({
      Name: doctor.name,
      Degree: doctor.degree,
      Experience: doctor.experience,
      Age: doctor.age,
    });

    if (doctor.imageUrl) {
      setSelectedImage(doctor.imageUrl);
    }
  };

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

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
    setSelectedFile(null);
    setEditingDoctor(null);
    setIsEditMode(false);
    form.resetFields();
  };

  const openAddModal = () => {
    setEditingDoctor(null);
    setIsEditMode(false);
    setModalVisible(true);
    form.resetFields();
  };

  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);

  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      <h1 className="text-lg font-bold mb-4">
        Add Physiotherapist profile of your Physiotherapy Center
      </h1>

      <Button
        icon={<IoMdAddCircleOutline />}
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Physiotherapist
      </Button>

      <div className="mt-4 space-y-4">
        {doctors?.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded shadow flex flex-col md:flex-row items-center gap-2 md:gap-3"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                width={64}
                height={64}
                src={doctor?.imageUrl}
                alt={doctor.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.degree}</p>
              <p className="text-sm text-gray-500">{doctor.experience}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                icon={<FaEdit />}
                onClick={() => editDoctor(doctor)}
                className="bg-green-500 text-white"
              >
                Edit
              </Button>
              <Button
                danger
                onClick={() => removeDoctor(doctor.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={isEditMode ? "Edit Physiotherapist" : "Add New Physiotherapist"}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <div className="flex justify-center mb-4 relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedImage ? (
              <img
                src={selectedImage}
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
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={uploading}
              size="large"
            >
              {uploading
                ? "Processing..."
                : isEditMode
                  ? "Update Physiotherapist"
                  : "Add Physiotherapist"
              }
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PhysioProfileDoctors;