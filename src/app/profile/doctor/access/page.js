'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MapComponent from '../../../../components/MapComponent';
import { useAuth } from '../../../../context/AuthContext';

function InputField({ label, value, onChange, required = false, type = 'text' }) {
   return (
      <div className="mb-4">
         {label && (
            <label className="block font-medium mb-1">
               {label} {required && <span className="text-red-500">*</span>}
            </label>
         )}
         <input
            type={type}
            className="w-full p-2 border rounded"
            value={value}
            onChange={onChange}
            required={required}
         />
      </div>
   );
}

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

export default function DoctorChemberProfileAccess({ isModalOpen, modalOpen, data, getProfileData }) {

   const { user, token } = useAuth();

   const [chamber, setChamber] = useState({
      id: '',
      name: '',
      state: '',
      location: '',
      fee: '',
      oldPatientFee: '',
      reportShowFee: '',
      roomNo: '',
      floor: '',
      additionalInfo: '',
      phoneNumber: '',
      notice: '',
      lat: null,
      lon: null,
   });

   const [visitingHours, setVisitingHours] = useState(initialVisitingHours());
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      if (isModalOpen && data) {
         setChamber({
            id: data.id || '',
            name: data.name || '',
            state: data.state || '',
            location: data.location || '',
            fee: data.fee || '',
            oldPatientFee: data.oldPatientFee || data.oldPatient || '',
            reportShowFee: data.reportShowFee || data.reportShow || '',
            roomNo: data.roomNo || data.room || '',
            floor: data.floor || '',
            additionalInfo: data.additionalInfo || '',
            phoneNumber: data.phoneNumber || '',
            notice: data.notice || '',
            lat: data.lat ? +data.lat : null,
            lon: data.lon ? +data.lon : null,
         });

         const hours = initialVisitingHours();

         (data.chamberTimeDetails || []).forEach(({ dayName, dayTime, eveningTime }) => {
            const dayKey = dayName.charAt(0) + dayName.slice(1).toLowerCase(); // e.g. "SAT" -> "Sat"
            if (hours[dayKey]) {
               hours[dayKey] = { morning: dayTime || '', evening: eveningTime || '' };
            }
         });

         setVisitingHours(hours);
      }
   }, [isModalOpen, data]);

   const handleInputChange = (key) => (e) => {
      setChamber((prev) => ({ ...prev, [key]: e.target.value }));
   };

   const handleVisitingHoursChange = (day, time) => (e) => {
      setVisitingHours((prev) => ({
         ...prev,
         [day]: { ...prev[day], [time]: e.target.value },
      }));
   };

   const handleSubmit = async () => {
      if (!chamber.lat || !chamber.lon) {
         toast.error('Please select the chamber location on the map.');
         return;
      }

      setIsSubmitting(true);

      const payload = {
         id: chamber.id,
         name: chamber.name,
         state: chamber.state,
         location: chamber.location,
         fee: chamber.fee,
         oldPatientFee: chamber.oldPatientFee,
         reportShowFee: chamber.reportShowFee,
         roomNo: chamber.roomNo,
         floor: chamber.floor,
         additionalInfo: chamber.additionalInfo,
         phoneNumber: chamber.phoneNumber,
         notice: chamber.notice,
         lat: chamber.lat.toString(),
         lon: chamber.lon.toString(),
         userId: user?.userId || '',
         timeDetails: Object.entries(visitingHours).map(([day, times]) => ({
            dayName: day.toUpperCase(),
            dayTime: times.morning,
            eveningTime: times.evening,
            isOpen: !!times.morning || !!times.evening,
         })),
      };

      try {
         const res = await fetch(
            'https://api.aidfastbd.com/api/GeneralInformation/ChamberInformationUpdate',
            {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(payload),
            }
         );

         if (res.ok) {
            toast.success('Chamber information updated successfully');
            getProfileData()
            modalOpen(false);
         } else {
            toast.error('Failed to update chamber information');
         }
      } catch (error) {
         toast.error('An error occurred. Please try again.');
         console.error(error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div>
         <InputField
            label="Chamber Name"
            value={chamber.name}
            onChange={handleInputChange('name')}
            required
         />
         <InputField
            label="Location"
            value={chamber.location}
            onChange={handleInputChange('location')}
            required
         />
         <InputField
            label="Notice"
            value={chamber.notice}
            onChange={handleInputChange('notice')}
         />
         <InputField
            label="Fee"
            value={chamber.fee}
            onChange={handleInputChange('fee')}
         />
         <InputField
            label="Old Patient Fee"
            value={chamber.oldPatientFee}
            onChange={handleInputChange('oldPatientFee')}
         />
         <InputField
            label="Report Show Fee"
            value={chamber.reportShowFee}
            onChange={handleInputChange('reportShowFee')}
         />
         <InputField
            label="Floor"
            value={chamber.floor}
            onChange={handleInputChange('floor')}
         />
         <InputField
            label="Room No"
            value={chamber.roomNo}
            onChange={handleInputChange('roomNo')}
         />
         <InputField
            label="Additional Info"
            value={chamber.additionalInfo}
            onChange={handleInputChange('additionalInfo')}
         />
         <InputField
            label="Phone Number"
            value={chamber.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
            required
            type="tel"
         />

         <div className="mb-4">
            <label className="block font-medium mb-1">Select Chamber Location</label>
            <MapComponent
               lat={chamber.lat}
               lon={chamber.lon}
               onLocationSelect={(lat, lon) =>
                  setChamber((prev) => ({ ...prev, lat, lon }))
               }
            />
            <p className="mt-2 text-sm">
               Selected Location: Lat {chamber.lat ?? 'N/A'}, Lon {chamber.lon ?? 'N/A'}
            </p>
         </div>

         <div className="mb-4">
            <label className="block font-medium mb-2">Visiting Hours</label>
            <table className="w-full border border-gray-300 text-sm">
               <thead>
                  <tr>
                     <th className="border px-3 py-1">Day</th>
                     <th className="border px-3 py-1">Morning Time</th>
                     <th className="border px-3 py-1">Evening Time</th>
                  </tr>
               </thead>
               <tbody>
                  {Object.keys(visitingHours).map((day) => (
                     <tr key={day}>
                        <td className="border px-3 py-1">{day.toUpperCase()}</td>
                        <td className="border px-3 py-1">
                           <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={visitingHours[day].morning}
                              onChange={handleVisitingHoursChange(day, 'morning')}
                           />
                        </td>
                        <td className="border px-3 py-1">
                           <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={visitingHours[day].evening}
                              onChange={handleVisitingHoursChange(day, 'evening')}
                           />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded"
         >
            {isSubmitting ? 'Saving...' : 'Save / Update'}
         </button>
      </div>
   );
}
