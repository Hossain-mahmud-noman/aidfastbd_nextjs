import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { base_endpoint } from "../../../utils/constants";
import Swal from 'sweetalert2';
function PharmacyProfileDrugList({ token, user, data }) {
  const [drugs, setDrugs] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", packSize: "", unitPrice: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (data) setDrugs(data);
  }, [data]);

  const calculateTotal = (packSize, unitPrice) => {
    const total = parseFloat(packSize) * parseFloat(unitPrice);
    return isNaN(total) ? 0 : total.toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setShowDialog(true);
    setFormData({ name: "", packSize: "", unitPrice: "" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(drugs[index]);
    setEditIndex(index);
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    const { name, packSize, unitPrice } = formData;

    if (!name || !packSize || !unitPrice) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload = {
      pharmacyUserId: user.id,
      name,
      packSize,
      unitPrice,
      type: "Drug",
      totalTaka: calculateTotal(packSize, unitPrice),
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
        payload["id"] = result.id;

        const updatedDrugs =
          editIndex !== null
            ? drugs.map((drug, idx) => (idx === editIndex ? { ...payload } : drug))
            : [...drugs, { ...payload }];

        setDrugs(updatedDrugs);
        toast.success("Drug saved successfully!");
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
    const payload = { ...drugToDelete, isDelete: true };

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${drugToDelete.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
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

        const result = await res.json();

        if (res.ok) {
          setDrugs(drugs.filter((_, idx) => idx !== index));
          Swal.fire('Deleted!', 'The drug has been deleted.', 'success');
        } else {
          Swal.fire('Error', result.message || 'Failed to delete drug.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };


  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Pharmacy Drug List</h2>

      <div className="overflow-x-auto">
        {drugs.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Size</th>
                <th className="border px-3 py-2">Price (Taka)</th>
                <th className="border px-3 py-2">Total</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug, index) => (
                <tr key={index}>
                  <td className="border px-3 py-2">{drug.name}</td>
                  <td className="border px-3 py-2">{drug.packSize}</td>
                  <td className="border px-3 py-2">{drug.unitPrice}</td>
                  <td className="border px-3 py-2">{drug.totalTaka}</td>
                  <td className="border px-3 py-2 flex gap-2 justify-center">
                    <button className="text-blue-600" onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-600" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No drugs available. Add a new one.</p>
        )}
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded mt-3"
        onClick={handleAddNew}
      >
        Add New +
      </button>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Drug" : "Add New Drug"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <input
                  type="number"
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-semibold">
                  {calculateTotal(formData.packSize, formData.unitPrice)} Taka
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {editIndex !== null ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PharmacyProfileDrugList;
