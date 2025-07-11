'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MapComponent from '../../MapComponent';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
// Reusable InputField component
function InputField({ label, placeholder, value, onChange, type = "text", required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function DoctorProfileChamber({ data, user, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chamberName, setChamberName] = useState('');
  const [address, setAddress] = useState('');
  const [noticeNumber, setNoticeNumber] = useState('');
  const [fee, setFee] = useState('');
  const [oldPatientFee, setOldPatientFee] = useState('');
  const [reportShowFee, setReportShowFee] = useState('');
  const [floor, setFloor] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitingHours, setVisitingHours] = useState(initialVisitingHours());
  const [chamberList, setChamberList] = useState([]);
  const [editingChamber, setEditingChamber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    setChamberList(data);
  }, [data]);

  function initialVisitingHours() {
    return {
      Sat: { morning: '', evening: '' },
      Sun: { morning: '', evening: '' },
      Mon: { morning: '', evening: '' },
      Tue: { morning: '', evening: '' },
      Wed: { morning: '', evening: '' },
      Thu: { morning: '', evening: '' },
      Fri: { morning: '', evening: '' },
    };
  }

  function resetModal() {
    setChamberName('');
    setAddress('');
    setNoticeNumber('');
    setFee('');
    setOldPatientFee('');
    setReportShowFee('');
    setFloor('');
    setRoomNo('');
    setPhoneNumber('');
    setVisitingHours(initialVisitingHours());
    setLatitude(null);
    setLongitude(null);
    setEditingChamber(null);
  }

  const handleChange = (day, time, value) => {
    setVisitingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: value },
    }));
  };

  const handleSubmit = async () => {
    if (!latitude || !longitude) {
      alert("Please set the chamber location on the map.");
      return;
    }

    const updatedChamber = {
      name: chamberName,
      location: address,
      notice: noticeNumber,
      userId: user.id,
      lat: latitude.toString(),
      lon: longitude.toString(),
      additionalInfo
        :
        "",
      fee,
      oldPatientFee,
      reportShowFee,
      roomNo,
      floor,
      phoneNumber,
      timeDetails: Object.keys(visitingHours).map((day) => ({
        dayName: day.toUpperCase(),
        dayTime: visitingHours[day].morning || '',
        eveningTime: visitingHours[day].evening || '',
        isOpen: !!visitingHours[day].morning || !!visitingHours[day].evening,
      })),
    };

    try {
      let response;
      if (editingChamber) {
        response = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/ChamberInformationUpdate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingChamber.id, ...updatedChamber }),
        });
      } else {
        response = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/ChamberInformationSave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedChamber),
        });
      }

      if (response.status == 200) {
        const result = await response.json();

        if (!editingChamber) {
          toast.success("Chamber Information Save successfully")
          setChamberList((prev) => [...prev, {
            id: result.id, chamberTimeDetails
              : updatedChamber['timeDetails'], ...updatedChamber,
          }]);
        } else {
          toast.success("Chamber Information update successfully")
          setChamberList((prev) =>
            prev.map((chamber) =>
              chamber.id === editingChamber.id ? { ...chamber, ...updatedChamber } : chamber
            )
          );
        }

        setIsModalOpen(false);
        resetModal();
      } else {
        console.error('Failed to save/update chamber.');
      }
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This chamber will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    const apiUrl = 'https://api.aidfastbd.com/api/GeneralInformation/ChamberInformationDelete';
    const payload = {
      id: id,
      isDeleted: true
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        Swal.fire('Deleted!', 'Chamber deleted successfully.', 'success');
        setChamberList((prevList) => prevList.filter((chamber) => chamber.id !== id));
      } else {
        Swal.fire('Error', 'Failed to delete chamber.', 'error');
      }
    } catch (error) {
      console.error('Error deleting chamber:', error);
      Swal.fire('Error', 'An error occurred while deleting the chamber.', 'error');
    }
  };


  useEffect(() => {
    if (editingChamber) {
      const visitingHoursData = editingChamber.chamberTimeDetails.reduce((acc, timeDetail) => {
        acc[timeDetail.dayName] = {
          morning: timeDetail.dayTime || '',
          evening: timeDetail.eveningTime || '',
        };
        return acc;
      }, {});

      setVisitingHours(visitingHoursData);
    }
  }, [editingChamber]);

  const handleEdit = (chamber) => {
    setEditingChamber(chamber);
    setChamberName(chamber.name || '');
    setAddress(chamber.location || '');
    setNoticeNumber(chamber.notice || '');
    setFee(chamber.fee || '');
    setOldPatientFee(chamber.oldPatient || '');
    setReportShowFee(chamber.reportShow || '');
    setFloor(chamber.floor || '');
    setRoomNo(chamber.room || '');
    setPhoneNumber(chamber.phoneNumber || '');
    setLatitude(+chamber.lat || null);
    setLongitude(+chamber.lon || null);

    const visitingHoursData = {
      Sat: { morning: '', evening: '' },
      Sun: { morning: '', evening: '' },
      Mon: { morning: '', evening: '' },
      Tue: { morning: '', evening: '' },
      Wed: { morning: '', evening: '' },
      Thu: { morning: '', evening: '' },
      Fri: { morning: '', evening: '' },
    };

    chamber.chamberTimeDetails?.forEach((timeDetail) => {
      const day = timeDetail.dayName.charAt(0) + timeDetail.dayName.slice(1).toLowerCase(); // e.g., 'SAT' -> 'Sat'
      if (visitingHoursData[day]) {
        visitingHoursData[day] = {
          morning: timeDetail.dayTime || '',
          evening: timeDetail.eveningTime || '',
        };
      }
    });

    setVisitingHours(visitingHoursData);
    setIsModalOpen(true);
  };




  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto p-6">
      <p className="text-xs text-red-500 mb-4">
        ** Add a Chamber and Set Chamber location on map otherwise patients cannot see your profile on the user end **
      </p>

      {isModalOpen == false ? <>
        <button
          onClick={() => {
            resetModal();
            setIsModalOpen(true);
          }}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add New Chamber
        </button>

        {/* Chamber List */}
        <div className="mt-6">
          {chamberList?.map((chamber, index) => (
            <div key={`chamber_id_${index}`} className="mb-6 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{chamber.name}</h3>
              <p className="text-sm text-gray-500">{chamber.location}</p>
              <p className="text-sm">{chamber.notice}</p>
              <p className="text-sm">{chamber.phoneNumber}</p>

              {/* Time Table */}
              <div className="mt-4">
                <h4 className="font-medium">Visiting Hours:</h4>
                <table className="w-full table-auto mt-2">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Day</th>
                      <th className="border px-4 py-2">Morning</th>
                      <th className="border px-4 py-2">Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamber?.chamberTimeDetails.map((timeDetail) => (
                      <tr key={timeDetail.id}>
                        <td className="border px-4 py-2">{timeDetail?.dayName}</td>
                        <td className="border px-4 py-2">{timeDetail?.dayTime || 'Not Available'}</td>
                        <td className="border px-4 py-2">{timeDetail?.eveningTime || 'Not Available'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Edit and Delete Buttons */}
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEdit(chamber)}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chamber.id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </> : (
        <div className="bg-white rounded-lg w-full max-w-md  md:mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {editingChamber ? 'Edit Chamber' : 'Add New Chamber'}
          </h2>

          <InputField label="Chamber Name" value={chamberName} onChange={(e) => setChamberName(e.target.value)} required />
          <InputField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <InputField label="Notice Number" value={noticeNumber} onChange={(e) => setNoticeNumber(e.target.value)} />
          <InputField label="Fee" value={fee} onChange={(e) => setFee(e.target.value)} />
          <InputField label="Old Patient Fee" value={oldPatientFee} onChange={(e) => setOldPatientFee(e.target.value)} />
          <InputField label="Report Show Fee" value={reportShowFee} onChange={(e) => setReportShowFee(e.target.value)} />
          <InputField label="Floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
          <InputField label="Room No" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
          <InputField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />


          <div className="mb-4 border">
            <label className="block text-sm font-medium text-gray-700 mb-2 ">Select Chamber Location</label>
            <MapComponent
              lat={latitude}
              lon={longitude}
              onLocationSelect={(lat, lon) => {
                setLatitude(lat);
                setLongitude(lon);
              }}
            />
            <p className="text-sm mt-2">
              Selected Location: Lat {latitude || "N/A"}, Lon {longitude || "N/A"}
            </p>
          </div>


          {/* Visiting Hours */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visiting Hours
            </label>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Morning Time</th>
                  <th className="border px-4 py-2">Evening Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(visitingHours).map((day) => (
                  <tr key={day}>
                    <td className="border px-4 py-2">{day.toUpperCase()}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={visitingHours[day].morning}
                        onChange={(e) => handleChange(day, 'morning', e.target.value)}
                        className="w-full p-1"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={visitingHours[day].evening}
                        onChange={(e) => handleChange(day, 'evening', e.target.value)}
                        className="w-full p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetModal();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`${isSubmitting ? 'bg-blue-300' : 'bg-blue-500'} text-white px-4 py-2 rounded-md hover:bg-blue-600`}
              disabled={isSubmitting}
            >
              {editingChamber ? 'Update Chamber' : 'Save Chamber'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

DoctorProfileChamber.propTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default DoctorProfileChamber;
