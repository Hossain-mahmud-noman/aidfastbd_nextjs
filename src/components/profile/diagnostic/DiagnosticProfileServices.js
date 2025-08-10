import React, { useEffect, useState } from "react";
import ServiceForm from "../../../components/forms/ServiceForm";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Button } from "antd";

function DiagnosticProfileServices({ data = [], token, user, getProfileData }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [datax, setDatax] = useState({
    investigation: [],
    healthPackage: [],
    otList: [],
    bedCategory: [],
    screeningPackage: [],
  });

  const [dialogState, setDialogState] = useState({
    show: false,
    section: "",
    formData: {},
    editIndex: null,
  });

  const fields = {
    investigation: ["serviceName", "price"],
    healthPackage: ["serviceName", "price"],
    otList: ["serviceName", "price", "remarks"],
    bedCategory: ["serviceName", "price"],
    screeningPackage: ["serviceName", "price"],
  };

  const openDialog = (section, index = null) => {
    setDialogState({
      show: true,
      section,
      formData:
        index !== null
          ? { ...datax[section][index] }
          : fields[section].reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
      editIndex: index,
    });
  };

  const closeDialog = () => {
    setDialogState({ show: false, section: "", formData: {}, editIndex: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDialogState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
    }));
  };

  const handleSubmit = () => {
    const { section, formData, editIndex } = dialogState;

    if (editIndex == null && fields[section].some((field) => !formData[field]?.trim())) {
      alert("All fields are required!");
      return;
    }

    let payload = {
      ...formData,
      isDelete: false,
      diagnosticCenterUserId: user.userId,
    };

    switch (section) {
      case "screeningPackage":
        payload.serviceType = "Diabetics Screening Package";
        break;
      case "otList":
        payload.serviceType = "OT List";
        break;
      case "investigation":
        payload.serviceType = "Investigation";
        break;
      case "bedCategory":
        payload.serviceType = "BED Category";
        break;
      case "healthPackage":
        payload.serviceType = "Health Package";
        break;
      default:
        break;
    }

    if (editIndex !== null) {
      payload.id = datax[section][editIndex].id;
    }

    const method = editIndex !== null ? "PUT" : "POST";
    const url =
      editIndex !== null
        ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices"
        : "https://api.aidfastbd.com/api/GeneralInformation/SaveDiagnosticCenterServices";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setDatax((prevData) => {
          const updatedSection = [...prevData[section]];
          if (editIndex !== null) {
            updatedSection[editIndex] = formData;
          } else {
            formData.id = responseData.id;
            updatedSection.push(formData);
          }
          return { ...prevData, [section]: updatedSection };
        });
        toast.success(`${editIndex !== null ? "Updated" : "Added"} successfully.`);
        if (typeof getProfileData === 'function') {
          getProfileData();
        }
        closeDialog();
      })
      .catch((error) => {
        toast.error("Error occurred while saving service.");
        console.error("Error:", error);
      });
  };

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
      serviceType: "heading",
      serviceName: newData.heading,
      price: newData.details,
      remarks: newData.imgList,
      isDeleted: false,
      id: selectedService?.id,
      diagnosticCenterUserId: user?.id || "",
    };

    try {
      const response = await fetch(
        isUpdating
          ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices"
          : "https://api.aidfastbd.com/api/GeneralInformation/SaveDiagnosticCenterServices",
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

      toast.success(`Service ${isUpdating ? "updated" : "added"} successfully.`);
      if (typeof getProfileData === 'function') {
        await getProfileData();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = (section, data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${data.serviceName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = { ...data, isDelete: true };
        fetch("https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then(() => {
            setDatax((prevData) => ({
              ...prevData,
              [section]: prevData[section].filter((item) => item.id !== data.id),
            }));
            toast.success("Deleted successfully.");
            if (typeof getProfileData === 'function') {
              getProfileData();
            }
          })
          .catch((error) => {
            toast.error("Error occurred while deleting service.");
            console.error("Error:", error);
          });
      }
    });
  };

  useEffect(() => {
    if (data?.length) {
      const grouped = {
        screeningPackage: [],
        otList: [],
        investigation: [],
        healthPackage: [],
        bedCategory: [],
      };
      data.forEach((item) => {
        switch (item.serviceType) {
          case "Diabetics Screening Package":
            grouped.screeningPackage.push(item);
            break;
          case "OT List":
            grouped.otList.push(item);
            break;
          case "Investigation":
            grouped.investigation.push(item);
            break;
          case "BED Category":
            grouped.bedCategory.push(item);
            break;
          case "Health Package":
            grouped.healthPackage.push(item);
            break;
          default:
            break;
        }
      });
      setDatax((prev) => ({ ...prev, ...grouped }));
    }
  }, [data]);

  const renderTable = (section) => (
    <div key={section} className="w-full">
      <h2 className="text-lg font-bold mt-4 mb-2">
        {section
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .trim()}
      </h2>

      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1 whitespace-nowrap">#</th>
              {fields[section].map((field) => (
                <th
                  key={field}
                  className="border border-gray-300 px-2 py-1 whitespace-nowrap"
                >
                  {field}
                </th>
              ))}
              <th className="border border-gray-300 px-2 py-1 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {(datax[section] || []).map((item, index) => (
              <tr key={item.id ?? index}>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">{index + 1}</td>
                {fields[section].map((field) => (
                  <td key={field} className="border border-gray-300 px-2 py-1 whitespace-nowrap">
                    {item[field]}
                  </td>
                ))}
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap flex items-center justify-between">
                  <Button
                    className="text-blue-500 mr-2"
                    onClick={() => openDialog(section, index)}
                  >
                    Edit
                  </Button>
                  <Button danger
                    className="text-red-500"
                    onClick={() => handleDelete(section, item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => openDialog(section)}
      >
        Add New +
      </button>
    </div>
  );

  return (
    <div className="p-4 pt-0 max-w-3xl mx-auto">
      {isModalOpen ? (
        <ServiceForm
          isDental={false}
          initialData={
            selectedService == null
              ? null
              : {
                title: selectedService?.serviceName || "",
                details: selectedService?.price || "",
                imgList: selectedService?.remarks
                  ? selectedService.remarks.split(",").map((i) => i.trim())
                  : [],
              }
          }
          onSubmit={handleFormSubmit}
          token={token}
          discard={() => setIsModalOpen(false)}
        />
      ) : (
        <>
          {data
            ?.filter((service) => service.serviceType === "heading")
            .map((service) => (
              <div
                key={service.id}
                className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3"
              >
                <h3 className="text-lg font-bold">{service.serviceName}</h3>
                <p className="text-gray-600">{service.price}</p>
                <div className="flex mt-2">
                  {service.remarks
                    ?.split(",")
                    .map((i) => i.trim())
                    .map((img, index) => (
                      <Image
                        width={100}
                        height={100}
                        key={index}
                        src={img}
                        alt="Service"
                        className="w-10 h-10 mr-1 rounded"
                      />
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
            className="bg-purple-500 text-white px-4 py-2 rounded-full"
          >
            New service add (+)
          </button>
        </>
      )}
      {Object.keys(fields).map(renderTable)}

      {dialogState.show && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {dialogState.editIndex !== null ? "Edit" : "Add"}{" "}
              {dialogState.section.replace(/([A-Z])/g, " $1")}
            </h2>
            {fields[dialogState.section].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={dialogState.formData[field] || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiagnosticProfileServices;
