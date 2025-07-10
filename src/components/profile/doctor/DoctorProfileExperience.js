'use client';

import { headerx } from '../../../utils/constants';
import React, { useState } from 'react';
import { toast } from 'sonner';

function DoctorProfileExperience({ data, user, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experienceList, setExperienceList] = useState(data || []);

  const [experience, setExperience] = useState({
    id: null,
    officeName: '',
    designation: '',
    department: '',
    employmentFrom: '',
    employmentTo: '',
    period: '',
  });

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
      employmentFrom: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      employmentTo: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      period: exp.period || '',
    });
    setIsModalOpen(true);
  };

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

  const validateForm = () => {
    const { officeName, designation, employmentFrom } = experience;
    return officeName && designation && employmentFrom;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields.');
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
      endDate: experience.employmentTo,
      period: experience.period,
      userId: user.id,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headerx, 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (isUpdate) {
          toast.success("Experience Information updated successfully!");
          setExperienceList((prevList) =>
            prevList.map((item) =>
              item.id === experience.id
                ? {
                    ...item,
                    officeName: experience.officeName,
                    designation: experience.designation,
                    department: experience.department,
                    startDate: experience.employmentFrom,
                    endDate: experience.employmentTo,
                    period: experience.period,
                  }
                : item
            )
          );
        } else {
          toast.success("Experience Information saved successfully!");
          setExperienceList((prevList) => [
            ...prevList,
            {
              ...body,
              startDate: experience.employmentFrom,
              endDate: experience.employmentTo,
            },
          ]);
        }
        setIsModalOpen(false);
        resetForm();
      } else {
        console.error('Failed to save experience:', await response.text());
        toast.error("Failed to save experience. Please try again.");
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error("Failed to save experience. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
      <p>You can add or update your experience details below.</p>

      {isModalOpen == false ? (
        <>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Add New Experience
          </button>

          <ul className="mt-4">
            {experienceList.map((exp, idx) => (
              <li key={idx} className="mb-2 border-b pb-2">
                <p><strong>Institute:</strong> {exp.officeName}</p>
                <p><strong>Designation:</strong> {exp.designation}</p>
                <p><strong>Department:</strong> {exp.department}</p>
                <p><strong>Period:</strong> {exp.period}</p>
                <p>
                  <strong>From:</strong> {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : 'N/A'}{' '}
                  <strong>To:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                <button
                  onClick={() => openEditModal(exp)}
                  className="mt-2 bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="bg-white rounded-lg w-full max-w-md md:mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {experience.id ? 'Update Experience' : 'Add New Experience'}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
            <input
              type="text"
              name="officeName"
              value={experience.officeName}
              onChange={handleInputChange}
              placeholder="Institute Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={experience.designation}
              onChange={handleInputChange}
              placeholder="Designation"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={experience.department}
              onChange={handleInputChange}
              placeholder="Department"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment From</label>
            <input
              type="date"
              name="employmentFrom"
              value={experience.employmentFrom || ''}
              onChange={handleInputChange}
              placeholder="Start Date"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment To (Optional)</label>
            <input
              type="date"
              name="employmentTo"
              value={experience.employmentTo || ''}
              onChange={handleInputChange}
              placeholder="End Date"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <input
              type="text"
              name="period"
              value={experience.period}
              onChange={handleInputChange}
              placeholder="e.g., 2 years"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {experience.id ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorProfileExperience;
