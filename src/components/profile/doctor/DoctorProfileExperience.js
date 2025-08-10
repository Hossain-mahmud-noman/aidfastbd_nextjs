'use client';

import { headerx } from '../../../utils/constants';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Button } from 'antd';

function DoctorProfileExperience({ data, user, token, refreshProfile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experience, setExperience] = useState({
    id: null,
    officeName: '',
    designation: '',
    department: '',
    employmentFrom: '',
    employmentTo: '',
    period: '',
  });

  const resetForm = () => {
    setExperience({
      id: null,
      officeName: '',
      designation: '',
      department: '',
      employmentFrom: '',
      employmentTo: '',
      period: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (exp) => {
    setExperience({
      id: exp.id,
      officeName: exp.officeName || '',
      designation: exp.designation || '',
      department: exp.department || '',
      employmentFrom: exp.startDate
        ? new Date(exp.startDate).toISOString().split('T')[0]
        : '',
      employmentTo:
        exp.endtDate && exp.endtDate !== '0001-01-01T00:00:00'
          ? new Date(exp.endtDate).toISOString().split('T')[0]
          : '',
      period: exp.period || '',
    });
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const { officeName, designation, employmentFrom } = experience;
    return officeName && designation && employmentFrom;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const isUpdate = !!experience.id;
    const endpoint = isUpdate
      ? 'https://api.aidfastbd.com/api/GeneralInformation/ExperienceInformationUpdate'
      : 'https://api.aidfastbd.com/api/GeneralInformation/ExperienceInformationSave';

    const body = {
      id: isUpdate ? experience.id : undefined,
      officeName: experience.officeName,
      designation: experience.designation,
      department: experience.department,
      startDate: experience.employmentFrom,
      endtDate: experience.employmentTo || null, 
      period: experience.period,
      userId: user.userId,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...headerx,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(isUpdate ? 'Experience updated successfully!' : 'Experience saved successfully!');
        if (typeof refreshProfile === 'function') {
          await refreshProfile();
        }
        setIsModalOpen(false);
        resetForm();
      } else {
        toast.error('Failed to save experience.');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Error saving experience.');
    }
  };

  return (
    <div className="bg-white shadow-custom-light rounded-xl w-full max-w-4xl mx-auto p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Professional Experience</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus size={16} /> Add Experience
        </button>
      </div>

      {/* Experience List */}
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((exp, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{exp.officeName}</h3>
                  <p className="text-sm text-gray-600">{exp.designation} - {exp.department}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString()
                      : 'N/A'}{' '}
                    -{' '}
                    {exp.endtDate && exp.endtDate !== '0001-01-01T00:00:00'
                      ? new Date(exp.endtDate).toLocaleDateString()
                      : 'Present'}
                  </p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <Button
                  onClick={() => openEditModal(exp)}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition"
                >
                  <FaEdit size={16} /> Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No experience added yet.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {experience.id ? 'Update Experience' : 'Add New Experience'}
            </h2>

            {[
              { label: 'Institute Name', name: 'officeName', type: 'text' },
              { label: 'Designation', name: 'designation', type: 'text' },
              { label: 'Department', name: 'department', type: 'text' },
              { label: 'Employment From', name: 'employmentFrom', type: 'date' },
              { label: 'Employment To (Optional)', name: 'employmentTo', type: 'date' },
              { label: 'Period', name: 'period', type: 'text' },
            ].map((field, idx) => (
              <div className="mb-4" key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={experience[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {experience.id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorProfileExperience;
