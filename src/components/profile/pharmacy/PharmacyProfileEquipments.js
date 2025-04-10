import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { base_endpoint } from "../../../utils/constants";

function PharmacyProfileEquipments({ token, user, data }) {
  const [drugs, setDrugs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", size: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNew = () => {
    setShowDialog(true);
    setFormData({ name: "", packSize: "", unitPrice: "" });
    setEditIndex(null);
  };


  const handleEdit = (index) => {
    setShowDialog(true);
    setFormData(drugs[index]);
    setEditIndex(index);
  };

  const handleSubmit = async () => {
    const payload = {
      pharmacyUserId: user.id,
      name: formData.name,
      packSize: formData.packSize,
      unitPrice: formData.unitPrice,
      type: "Equipments",
      totalTaka: calculateTotal(formData.packSize, formData.unitPrice).toString(),
      remarks: null,
    };

    try {
      const res = await fetch(
        `${base_endpoint}/GeneralInformation/SavePharmacyDrugEquipment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {

        const data = res.json();
        payload['id'] = data.id;
        const updatedDrugs =
          editIndex !== null
            ? drugs.map((drug, idx) =>
              idx === editIndex ? { ...payload } : drug
            )
            : [...drugs, { ...payload }];

        setDrugs(updatedDrugs);
        alert("Equipment saved successfully!");
      } else {
        const result = await res.json();
        const errorMessages = result.errors
          ? Object.entries(result.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n")
          : result.message || "An unknown error occurred";
        alert(`Error: ${errorMessages}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setShowDialog(false);
  };

  const handleDelete = async (index) => {
    const drugToDelete = drugs[index];
    const payload = { ...drugToDelete, isDelete: true };

    try {
      const res = await fetch(
        `${base_endpoint}/GeneralInformation/UpdatePharmacyDrugEquipment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setDrugs(drugs.filter((_, idx) => idx !== index));
        alert("Equipment deleted successfully!");
      } else {
        const result = await res.json();
        alert(`Error: ${result.message || "Failed to delete drug"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const calculateTotal = (packSize, unitPrice) => {
    return packSize * unitPrice;
  };

  useEffect(() => {
    if (data) {
      setDrugs(data);
    }
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Pharmacy Equipment List</h2>
      <div className="overflow-x-auto">
        {drugs.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Name</th>
                <th className="border border-gray-300 px-2 py-1">Size</th>
                <th className="border border-gray-300 px-2 py-1">Price (Taka)</th>
                <th className="border border-gray-300 px-2 py-1">Total</th>
                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{drug.name}</td>
                  <td className="border border-gray-300 px-2 py-1">{drug.packSize}</td>
                  <td className="border border-gray-300 px-2 py-1">{drug.unitPrice}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {drug.totalTaka}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No equipments available. Add a new drug.</p>
        )}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAddNew}
      >
        Add New +
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">
              {editIndex !== null ? "Edit Drug" : "Add New Drug"}
            </h3>
            <div className="mb-2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Size</label>
              <input
                type="number"
                name="packSize"
                value={formData.packSize}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-2 py-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
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

export default PharmacyProfileEquipments;
