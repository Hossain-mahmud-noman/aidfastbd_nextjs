import React, { useState } from "react";
import ServiceForm from "../../../components/forms/ServiceForm";
import Image from "next/image";
import { toast } from "sonner";

export default function DentalProfileServices({ data, token, user }) {
  console.log("🚀 ~ DentalProfileServices ~ data:", data)
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
    const isUpdating = selectedService != null;
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
        isUpdating ? "Service updated successfully!" : "New service added successfully!"
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
          {services?.map((service) => (
            <div key={service.id} className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.details}</p>
              <div className="flex mt-2">
                {service.imgList.map((img, index) => (
                  <Image width={100} height={100} key={index} src={img.imgUrl} alt="Service" className="w-10 h-10 mr-1 rounded" />
                ))}
              </div>
              <button
                onClick={() => handleEditService(service)}
                className="absolute top-2 right-2 bg-blue-500 text-white p-3 rounded"
              >
                🖊
              </button>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="fixed bottom-5 left-5 bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            New service add (+)
          </button>
        </>
      )}
    </div>
  );
}
