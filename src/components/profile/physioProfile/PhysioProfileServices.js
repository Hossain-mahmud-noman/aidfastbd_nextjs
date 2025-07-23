import React, { useState } from "react";
import ServiceForm from "../../../components/forms/ServiceForm";
import Image from "next/image";
import { toast } from "sonner";

export default function PhysioProfileServices({ data, token, genericServiceId, userId }) {
  const [services, setServices] = useState(data);
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

    const payload = {
      otherInfo: "heading",
      title: newData.heading,
      details: newData.details,
      imgList: newData.imgList,
      isDeleted: false,
      serviceType: 1,
      userId: user?.id,
      id: selectedService?.id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    };

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
          body: JSON.stringify(isUpdating ? payload : [payload]),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData?.message || "Something went wrong!");
      }

      setServices((prev) =>
        isUpdating
          ? prev.map((s) => (s.id === payload.id ? { ...s, ...payload } : s))
          : [...prev, { ...payload, id: responseData.id }]
      );

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
            <h2 className="text-xl font-semibold text-gray-800">Physiotherapy Center Services</h2>
            <button
              onClick={handleAddService}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
            >
              + Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services?.map((service) => (
              <div
                key={service.id}
                className="relative bg-gray-50 border border-purple-200 p-4 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => handleEditService(service)}
                  className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
                  title="Edit Service"
                >
                  ✎
                </button>

                <h3 className="text-lg font-semibold text-purple-800 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-700 mb-3">{service.details}</p>

                {service.imgList?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.imgList.map((img, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 relative rounded overflow-hidden border"
                      >
                        <Image
                          src={img.imgUrl}
                          alt="Service"
                          layout="fill"
                          objectFit="cover"
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
