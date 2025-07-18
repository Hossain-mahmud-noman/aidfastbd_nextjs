import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { base_endpoint } from "../../../utils/constants";
import { toast } from "sonner";
import Swal from "sweetalert2";

function PharmacyProfileEquipments({ token, user, data }) {
  const [drugs, setDrugs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", packSize: "", unitPrice: "" });
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

  const calculateTotal = (packSize, unitPrice) => {
    return Number(packSize) * Number(unitPrice);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.packSize || !formData.unitPrice) {
      toast.error("Please fill in all fields.");
      return;
    }

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

      const result = await res.json();

      if (res.ok) {
        payload.id = result.id;
        const updatedDrugs =
          editIndex !== null
            ? drugs.map((drug, idx) => (idx === editIndex ? { ...payload } : drug))
            : [...drugs, { ...payload }];

        setDrugs(updatedDrugs);
        toast.success("Equipment saved successfully!");
        setShowDialog(false);
      } else {
        const errorMessages = result.errors
          ? Object.entries(result.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n")
          : result.message || "An unknown error occurred";
        toast.error(errorMessages);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (index) => {
    const drugToDelete = drugs[index];

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${drugToDelete.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
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
          Swal.fire("Deleted!", `"${drugToDelete.name}" has been removed.`, "success");
        } else {
          const result = await res.json();
          Swal.fire("Error", result.message || "Failed to delete equipment", "error");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };


  useEffect(() => {
    if (data) {
      setDrugs(data);
    }
  }, [data]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
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
                  <td className="border border-gray-300 px-2 py-1">{drug.totalTaka}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEdit(index)}
                      aria-label="Edit Equipment"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(index)}
                      aria-label="Delete Equipment"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No equipments available. Add a new equipment.</p>
        )}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAddNew}
      >
        Add New +
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Equipment" : "Add New Equipment"}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Size</label>
              <input
                type="number"
                name="packSize"
                value={formData.packSize}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
