import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function BloodProfileServices({ data, user, token }) {

  const [bloodGroups, setBloodGroups] = useState([]);
  const [bloodProducts, setBloodProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    serviceName: "",
    price: "",
    serviceType: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [currentDataSet, setCurrentDataSet] = useState("bloodGroups");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNew = (dataSet) => {
    setShowDialog(true);
    setFormData({
      serviceName: "",
      price: "",
      serviceType: dataSet === "bloodGroups" ? "BloodBank" : "BloodProduct", // Set serviceType dynamically
    });
    setEditIndex(null);
    setCurrentDataSet(dataSet);
  };

  const handleEdit = async (index, dataSet) => {
    setShowDialog(true);
    const data = dataSet === "bloodGroups" ? bloodGroups : bloodProducts;

    setFormData({ ...data[index], serviceType: dataSet === "bloodGroups" ? "BloodBank" : "BloodProduct" });  // Populate the form with the data to be edited
    setEditIndex(index);
    setCurrentDataSet(dataSet);
  };

  const handleSubmit = async () => {
    const data = currentDataSet === "bloodGroups" ? bloodGroups : bloodProducts;
    try {
      const payload = {
        id: formData.id, // The ID of the item to edit or create
        bloodBankInformationUserId: user.id,
        serviceType: formData.serviceType, // This should be 'BloodBank' or 'BloodProduct'
        serviceName: formData.serviceName, // e.g. B+, O-, etc.
        price: formData.price, // The price for the service/product
        remarks: "", // Optional remarks (if needed)
        isDelete: false, // Mark it as not deleted
      };

      const response = await fetch(
        editIndex !== null ? "https://api.aidfastbd.com/api/GeneralInformation/UpdateBloodBankServices" : "https://api.aidfastbd.com/api/GeneralInformation/SaveBloodBankServices",
        {
          method: editIndex !== null ? "PUT" : "POST", // PUT if editing, POST if adding
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (editIndex !== null) {
          const updatedData = data.map((item, idx) =>
            idx === editIndex ? payload : item
          );
          setBloodData(updatedData);
        } else {
          payload['id'] = responseData.id;
          // If it’s a new entry
          setBloodData([...data, payload]);
        }

        setShowDialog(false); // Close the dialog modal after success
      } else {
        const errorData = await response.json();
        console.error("Error saving blood service", errorData);
        alert("Error saving data");
      }
    } catch (error) {
      console.error("Error during the API request", error);
      alert("An unexpected error occurred");
    }
  };

  const setBloodData = (updatedData) => {
    if (currentDataSet === "bloodGroups") {
      setBloodGroups(updatedData);
    } else {
      setBloodProducts(updatedData);
    }
  };

  const handleDelete = async (index, dataSet) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const data = dataSet === "bloodGroups" ? bloodGroups : bloodProducts;
      const itemToDelete = data[index];

      try {
        const payload = {
          id: itemToDelete.id,
          serviceType: itemToDelete.serviceType,
          serviceName: itemToDelete.serviceName,
          price: itemToDelete.price,
          remarks: "", // Optional
          isDelete: true, // Mark the item as deleted
        };

        const response = await fetch(
          "https://api.aidfastbd.com/api/GeneralInformation/UpdateBloodBankServices", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
        );

        if (response.status === 200) {
          const updatedData = data.filter((_, idx) => idx !== index);
          setBloodData(updatedData);
        } else {
          const errorData = await response.json();
          console.error("Error deleting blood service", errorData);
          alert("Error deleting item");
        }
      } catch (error) {
        console.error("Error during the API request", error);
        alert("An unexpected error occurred");
      }
    }
  };

  const renderTable = (data, dataSet) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Sl</th>
            <th className="border border-gray-300 px-2 py-1">Name</th>
            <th className="border border-gray-300 px-2 py-1">Price</th>
            <th className="border border-gray-300 px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
              <td className="border border-gray-300 px-2 py-1">{item.serviceName}</td>
              <td className="border border-gray-300 px-2 py-1">{item.price}</td>
              <td className="border border-gray-300 px-2 py-1">
                <div className="flex justify-center space-x-4">
                  <button
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(index, dataSet,)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(index, dataSet)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const bloodGroupsData = [];
      const bloodProductsData = [];
      data.forEach((e) => {
        if (e.serviceType === "BloodProduct") {
          bloodProductsData.push(e);
        } else if (e.serviceType === "BloodBank") {
          bloodGroupsData.push(e);
        }
      });
      setBloodGroups(bloodGroupsData);
      setBloodProducts(bloodProductsData);
    }
  }, [data]);

  return (
    <div className="p-4">
      {/* Blood Groups Section */}
      <h2 className="text-lg font-bold mb-4">Blood Groups</h2>
      {renderTable(bloodGroups, "bloodGroups")}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => handleAddNew("bloodGroups")}
      >
        Add Blood Group +
      </button>

      {/* Blood Products Section */}
      <h2 className="text-lg font-bold mt-6 mb-4">Blood Products</h2>
      {renderTable(bloodProducts, "bloodProducts")}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => handleAddNew("bloodProducts")}
      >
        Add Blood Product +
      </button>

      {/* Modal Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">
              {editIndex !== null ? "Edit Entry" : "Add New Entry"}
            </h3>
            <div className="mb-2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default BloodProfileServices;
