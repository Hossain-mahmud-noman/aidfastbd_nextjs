import React, { useState } from "react";
import ServiceForm from "../../../components/forms/ServiceForm";
import Image from "next/image";
import { toast } from "sonner";
import { Image as AntdImage, Button } from "antd";
import { FaEdit } from "react-icons/fa";

export default function PractitionerServices({ data, token, genericServiceId, userId, getProfileData }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  const handleFormSubmit = async (newData) => {
    const isUpdating = selectedService !== null;

    const commonService = {
      otherInfo: "heading",
      title: newData.heading,
      details: newData.details,
      imgList: (newData.imgList || []).map((img) => ({
        imgUrl: img.imgUrl,
        details: img.details || ""
      })),
      userId: userId,
      id: genericServiceId,
      serviceType: 9
    };
    const updatingService = {
      otherInfo: "heading",
      title: newData.heading,
      details: newData.details,
      imgList: (newData.imgList || []).map((img) => ({
        imgUrl: img.imgUrl,
        details: img.details || ""
      })),
      userId: userId,
      id: selectedService?.id,
    };

    const payload = isUpdating ? updatingService : [commonService];

    try {
      const response = await fetch(
        isUpdating
          ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateGenericService_Services"
          : "https://api.aidfastbd.com/api/GeneralInformation/SaveGenericService_Services",
        {
          method: isUpdating ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData?.message || "Something went wrong!");
      }


      if (typeof getProfileData === 'function') {
        await getProfileData();
      }
      toast.success(
        isUpdating
          ? "Service updated successfully!"
          : "New service added successfully!"
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };



  return (
    <div className="bg-white shadow-custom-light rounded-lg w-full max-w-3xl mx-auto p-6">
      {isModalOpen ? (
        <ServiceForm
          initialData={selectedService}
          onSubmit={handleFormSubmit}
          token={token}
          discard={() => setIsModalOpen(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">General Practitioner Services</h2>
            <button
              onClick={handleAddService}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
            >
              + Add Service
            </button>
          </div>

          <div className="space-y-4">
            {data?.map((service) => (
              <div
                key={service.id}
                className="relative bg-gray-50 border border-purple-200 p-4 rounded-lg shadow-sm"
              >
                <Button
                  icon={<FaEdit />}
                  onClick={() => handleEditService(service)}
                  className="absolute top-3 right-3 "
                  title="Edit Service"
                >
                  Edit
                </Button>

                <h3 className="text-lg font-semibold text-purple-800 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-700 mb-3">{service.details}</p>

                {service.imgList?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.imgList.map((img, index) => (
                      <div
                        key={index}
                        className="relative rounded border"
                      >
                        <AntdImage
                          src={img.imgUrl}
                          alt="Service"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
