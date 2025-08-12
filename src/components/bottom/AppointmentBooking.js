'use client';

import React, { useState, useEffect } from 'react';
import { headerx } from '../../utils/constants';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

function AppointmentBooking({ id, token, chambers }) {
   const { user } = useAuth();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);
   const [slots, setSlots] = useState([]);
   const today = new Date().toISOString().split('T')[0];

   const [formData, setFormData] = useState({
      name: '',
      age: '',
      mobile: '',
      selectedChamber: '',
      appointmentDate: '',
      slot: null,
   });

   const handleAppoinment = () => {
      if (user) {
         toggleModal();
      } else {
         toast.warning(
            'Please log in first to continue with your appointment booking.'
         );
         router.push(`/login?id=${id}&slug=doctor`);
      }
   };

   const toggleModal = () => {
      setIsOpen(!isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
   };

   const closeModal = (e) => {
      if (e.target.id === 'modal-background') {
         toggleModal();
      }
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
         toggleModal();
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "selectedChamber") {
         setFormData((prev) => ({
            ...prev,
            appointmentDate: "",
            slot: null,
         }));
         setSlots([]);
      }

      if (name === "appointmentDate") {
         const selectedDate = new Date(value);
         const dayNameEn = selectedDate
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase(); // e.g. "FRI"

         const dayNameBnMap = {
            SUN: "রবি",
            MON: "সোম",
            TUE: "মঙ্গল",
            WED: "বুধ",
            THU: "বৃহস্পতি",
            FRI: "শুক্র",
            SAT: "শনি",
         };
         const dayNameBn = dayNameBnMap[dayNameEn];

         const chamberId = formData.selectedChamber;
         const chamber = chambers.find((ch) => ch.id === chamberId);

         if (chamber) {
            const noticeText = chamber.notice || "";

            // Auto-detect closed days from notice
            const closedDaysFromNotice = [
               "FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU",
               "শুক্র", "শনি", "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি",
            ].filter((day) => noticeText.includes(day));

            const closedDays = [...new Set([...closedDaysFromNotice])];

            if (closedDays.includes(dayNameEn) || closedDays.includes(dayNameBn)) {
               setSlots([]);
            } else {
               const filteredSlots = chamber.chamberTimeDetails
                  .filter(
                     (time) =>
                        time.dayName === dayNameEn || time.dayName === dayNameBn
                  )
                  .flatMap((time) => {
                     const slotsArr = [];

                     // Morning slots
                     if (Array.isArray(time.dayTime) && time.dayTime.length > 0) {
                        slotsArr.push(
                           ...time.dayTime.map((slot) => ({
                              // id only time.id (without appended time)
                              id: time.id,
                              value: slot,
                              period: "Morning",
                              day: time.dayName,
                           }))
                        );
                     } else if (typeof time.dayTime === "string" && time.dayTime.trim()) {
                        slotsArr.push({
                           id: time.id,
                           value: time.dayTime,
                           period: "Morning",
                           day: time.dayName,
                        });
                     }

                     // Evening slots
                     if (Array.isArray(time.eveningTime) && time.eveningTime.length > 0) {
                        slotsArr.push(
                           ...time.eveningTime.map((slot) => ({
                              id: time.id,
                              value: slot,
                              period: "Evening",
                              day: time.dayName,
                           }))
                        );
                     } else if (typeof time.eveningTime === "string" && time.eveningTime.trim()) {
                        slotsArr.push({
                           id: time.id,
                           value: time.eveningTime,
                           period: "Evening",
                           day: time.dayName,
                        });
                     }

                     return slotsArr;
                  });

               setSlots(filteredSlots);
            }
         } else {
            setSlots([]);
         }

         setFormData((prev) => ({ ...prev, slot: null }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, age, mobile, selectedChamber, appointmentDate, slot } =
         formData;

      if (
         !name ||
         !age ||
         !mobile ||
         !selectedChamber ||
         !appointmentDate ||
         !slot
      ) {
         toast.warning('Please fill in all required fields.');
         return;
      }

      const payload = {
         name,
         age,
         mobileNo: mobile,
         userId: user.userId,
         doctorInformationId: id,
         chamberInformationId: selectedChamber,
         chamberTimeDetailsId: slot.id, // only the id from chamberTimeDetails
         appointmentDate,
         appointmentTimeSlot: slot.value, // the time string (e.g. "4:30pm")
         isDay: true,
         isDeleted: false,
         isConfirmed: true,
      };

      headerx['Authorization'] = `Bearer ${token}`;

      try {
         const res = await fetch(
            `https://api.aidfastbd.com/api/GeneralInformation/BookAppointment`,
            {
               method: 'POST',
               headers: headerx,
               body: JSON.stringify(payload),
            }
         );

         const data = await res.json();

         if (res.ok) {
            toast.success('Successfully booked appointment');
            router.push('/appointments');
         } else {
            toast.error(data?.message || 'Something went wrong!');
         }
      } catch (error) {
         toast.error('Something went wrong!');
      } finally {
         toggleModal();
      }
   };

   useEffect(() => {
      if (isOpen) document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, [isOpen]);

   return (
      <nav className="fixed bottom-0 left-0 right-0 shadow-lg p-2 z-[10000] aid-container">
         <button
            onClick={handleAppoinment}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
         >
            Book Appointment
         </button>

         {isOpen && (
            <div
               id="modal-background"
               onClick={closeModal}
               className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10001]"
               aria-labelledby="modal-title"
               role="dialog"
            >
               <div className="bg-white w-full max-w-[90%] md:max-w-md p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b pb-2">
                     <h2 id="modal-title" className="text-xl font-semibold">Appointments</h2>
                     <button
                        onClick={toggleModal}
                        aria-label="Close Modal"
                        className="text-gray-500 hover:text-gray-700"
                     >
                        ✖
                     </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                     {/* Select Chamber */}
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Chamber</label>
                        <select
                           name="selectedChamber"
                           value={formData.selectedChamber}
                           onChange={handleChange}
                           className="w-full border border-gray-300 rounded-md px-4 py-2"
                        >
                           <option value="">Select Chamber</option>
                           {chambers.map((chamber) => (
                              <option key={chamber.id} value={chamber.id}>
                                 {chamber.name || chamber.location || "Chamber"}
                              </option>
                           ))}
                        </select>
                     </div>

                     {/* Appointment Date */}
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Appointment Date</label>
                        <input
                           type="date"
                           name="appointmentDate"
                           value={formData.appointmentDate}
                           onChange={handleChange}
                           min={today}
                           className="w-full border border-gray-300 rounded-md px-4 py-2"
                           disabled={!formData.selectedChamber}
                        />
                     </div>

                     {/* Select Slot */}
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Slot</label>
                        <select
                           name="slot"
                           value={formData.slot?.id || ""}
                           onChange={(e) => {
                              const selectedSlot = slots.find(slot => slot.id === e.target.value);
                              setFormData((prev) => ({
                                 ...prev,
                                 slot: selectedSlot || null,
                              }));
                           }}
                           className="w-full border border-gray-300 rounded-md px-4 py-2"
                           disabled={slots.length === 0}
                        >
                           <option value="">Select Slot</option>
                           {slots.map((slot) => (
                              <option key={`${slot.id}-${slot.period}-${slot.value}`} value={slot.id}>
                                 {slot.period} {slot.value}
                              </option>
                           ))}
                        </select>
                        {slots.length === 0 && formData.selectedChamber && formData.appointmentDate && (
                           <p className="text-sm text-red-500 mt-1">
                              No available slots for this date.
                           </p>
                        )}
                     </div>

                     {/* Name */}
                     <div>
                        <label className="block text-gray-600">Enter Name</label>
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           placeholder="Enter Name"
                           className="w-full border rounded-md px-4 py-2"
                        />
                     </div>

                     {/* Age */}
                     <div>
                        <label className="block text-gray-600">Enter Age</label>
                        <input
                           type="number"
                           name="age"
                           value={formData.age}
                           onChange={handleChange}
                           placeholder="Enter Age"
                           className="w-full border rounded-md px-4 py-2"
                        />
                     </div>

                     {/* Mobile */}
                     <div>
                        <label className="block text-gray-600">Enter Mobile Number</label>
                        <input
                           type="tel"
                           name="mobile"
                           value={formData.mobile}
                           onChange={handleChange}
                           placeholder="Enter Mobile Number"
                           className="w-full border rounded-md px-4 py-2"
                        />
                     </div>

                     {/* Submit */}
                     <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
                     >
                        Confirm Appointment
                     </button>
                  </form>
               </div>
            </div>
         )}
      </nav>
   );
}

export default AppointmentBooking;
