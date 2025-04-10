import React, { useEffect, useState } from "react";
import ServiceForm from "../../../components/forms/ServiceForm";

function DiagnosticProfileServices({ data, token, user }) {


  const [services, setServices] = useState(data);
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

    //
    setDialogState({
      show: true,
      section,
      formData: index !== null ? { ...datax[section][index] } : fields[section].reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
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

    // Check if all required fields are filled (for new entries)
    if (editIndex == null && fields[section].some((field) => !formData[field]?.trim())) {
      alert("All fields are required!");
      return;
    }

    // Prepare the payload for submission
    let payload = {
      ...formData,
      isDelete: false,
      diagnosticCenterUserId: user.id,
    };



    if (section === "screeningPackage") {
      payload['serviceType'] = "Diabetics Screening Package";
    } else if (section === "otList") {
      payload['serviceType'] = "OT List"; // Append item to otList
    }
    else if (section === "investigation") {
      payload['serviceType'] = "Investigation"; // Append item to otList
    }
    else if (section === "bedCategory") {
      payload['serviceType'] = "BED Category"; // Append item to otList
    }
    else if (section === "healthPackage") {
      payload['serviceType'] = "Health Package"; // Append item to otList
    }
    // If editing, include the id in the payload
    if (editIndex !== null) {
      payload = { ...payload, id: datax[section][editIndex].id }; // Add the id to the payload
    }

    // Send the request based on whether it's a PUT (edit) or POST (new entry)
    const method = editIndex !== null ? "PUT" : "POST"; // Use PUT for editing and POST for adding
    const url = editIndex !== null
      ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices"
      : "https://api.aidfastbd.com/api/GeneralInformation/SaveDiagnosticCenterServices";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // After a successful request, update the local state
        setDatax((prevData) => {
          const updatedSection = [...prevData[section]];

          if (editIndex !== null) {
            updatedSection[editIndex] = formData; // Update the existing item at editIndex
          } else {
            formData['id'] = responseData.id;
            updatedSection.push(formData); // Add the new entry
          }

          return { ...prevData, [section]: updatedSection };
        });
        closeDialog(); // Close the dialog after a successful submission

      })
      .catch((error) => {
        console.error("Error occurred during the fetch:", error);
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
      diagnosticCenterUserId:  user?.id || "",
    };

    try {
      const response = await fetch(
        isUpdating ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices" : "https://api.aidfastbd.com/api/GeneralInformation/SaveDiagnosticCenterServices",
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

      setServices((prev) =>
        isUpdating
          ? prev.map((s) => {
            if (s.id === payload.id) {
              return { ...s, ...payload }; // Update the service object with the new payload
            } else {
              return s; // Return the service as is if not the one being updated
            }
          })
          : [...prev, { ...payload, id: responseData.id }] // Add new service if it's not an update
      );

    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsModalOpen(false);
    }
  };


  const handleDelete = (section, data) => {
    // Create a copy of the data and add 'isDelete' field
    const payload = { ...data, isDelete: true };

    // Make the fetch request to the API
    fetch("https://api.aidfastbd.com/api/GeneralInformation/UpdateDiagnosticCenterServices", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json()) // Handle the response
      .then((responseData) => {
        // If deletion is successful, update the state
        setDatax((prevData) => ({
          ...prevData,
          [section]: prevData[section].filter((item) => item.id !== data.id), // Use item.id to filter
        }));

      })
      .catch((error) => {
        console.error("Error occurred during the fetch:", error);
      });
  };


  useEffect(() => {
    if (data) {

      let screeningPackage = [];
      let otList = [];
      let investigation = [];
      let healthPackage = [];
      let bedCategory = [];

      // Iterate over the data array
      data.forEach((item) => {
        if (item.serviceType === "Diabetics Screening Package") {
          screeningPackage = [...screeningPackage, item];
        } else if (item.serviceType === "OT List") {
          otList = [...otList, item]; // Append item to otList
        }
        else if (item.serviceType === "Investigation") {
          investigation = [...investigation, item]; // Append item to otList
        }
        else if (item.serviceType === "BED Category") {
          bedCategory = [...bedCategory, item]; // Append item to otList
        }
        else if (item.serviceType === "Health Package") {
          healthPackage = [...healthPackage, item]; // Append item to otList
        }
      });

      // Update state with consolidated data
      setDatax((prevDatax) => ({
        ...prevDatax,
        screeningPackage,
        otList,
        investigation,
        healthPackage,
        bedCategory
      }));
    }
  }, [data]);

  const renderTable = (section) => (
    <div key={section}>
      <h2 className="text-lg font-bold mt-4 mb-2">
        {section
          .replace(/([A-Z])/g, " $1") // Insert space before capital letters
          .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter of the entire string
          .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize the first letter of each word
          .trim()}
      </h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">#</th>
            {fields[section].map((field) => (
              <th key={field} className="border border-gray-300 px-2 py-1">{field}</th>
            ))}
            <th className="border border-gray-300 px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {datax[section]?.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
              {fields[section].map((field) => (
                <td key={field} className="border border-gray-300 px-2 py-1">{item[field]}</td>
              ))}
              <td className="border border-gray-300 px-2 py-1">
                <button className="text-blue-500 mr-2" onClick={() => openDialog(section, index)}>Edit</button>
                <button className="text-red-500" onClick={() => handleDelete(section, item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => openDialog(section)}
      >
        Add New +
      </button>
    </div>
  );

  return (
    <div className="p-4 pt-0">
      {isModalOpen ? (
        <ServiceForm
        isDental={false}
        initialData={selectedService==null?null:{
          title: selectedService?.serviceName || "",
          details: selectedService?.price || "",
          imgList: selectedService?.remarks
          ? selectedService.remarks.split(",").map(i => i.trim())
          : []
                }}
        
          onSubmit={handleFormSubmit}
          token={token}
          discard={() => setIsModalOpen(false)}
        />
      ) : (
        <>
         {services
  ?.filter(service => service.serviceType === "heading")
  .map(service => (
            <div key={service.id} className="relative bg-purple-100 p-4 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-bold">{service.serviceName}</h3>
              <p className="text-gray-600">{service.price}</p>
              <div className="flex mt-2">
                { service.remarks.split(",").map(i => i.trim()).map((img, index) => 
                   <img key={index} src={img} alt="Service" className="w-10 h-10 mr-1 rounded" />
                )}
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
      {Object.keys(fields).map(renderTable)}

      {dialogState.show && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {dialogState.editIndex !== null ? "Edit" : "Add"} {dialogState.section.replace(/([A-Z])/g, " $1")}
            </h2>
            {fields[dialogState.section].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
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
