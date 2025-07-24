'use client';

import React, { useState, useEffect } from 'react';
import { headerx } from '../../utils/constants';
import { toast } from 'sonner';
import { getUserProfile } from '../../context/getUserProfile';

function AppointmentBooking({ id, token, chambers }) {
   const [user, setUser] = useState(null)
   const [isOpen, setIsOpen] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      age: "",
      mobile: "",
      selectedChamber: "",
      appointmentDate: "",
      slot: null,
   });

   const today = new Date().toISOString().split('T')[0];
   const [slots, setSlots] = useState([]);

   const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile)
   }
   useEffect(() => {
      fetchProfile();
   }, [token])

   const toggleModal = () => {
      setIsOpen(!isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
   };

   const closeModal = (e) => {
      if (e.target.id === "modal-background") {
         toggleModal();
      }
   };

   const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
         toggleModal();
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "selectedChamber") {
         setFormData((prev) => ({ ...prev, appointmentDate: "", slot: null }));
         setSlots([]);
      }

      if (name === "appointmentDate") {
         const selectedDate = new Date(value);
         const dayName = selectedDate
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase();

         const chamberId = formData.selectedChamber;
         const chamber = chambers.find((ch) => ch.id === chamberId);

         if (chamber) {
            const allSlots = chamber.chamberTimeDetails.map((time) => ({
               id: time.id,
               value: `${time.dayName} ${time.dayTime}-${time.eveningTime}`,
               day: time.dayName,
            }));

            const filteredSlots = allSlots.filter((slot) => slot.day === dayName);
            setSlots(filteredSlots);
         } else {
            setSlots([]);
         }

         setFormData((prev) => ({ ...prev, slot: null }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault()
      const { name, age, mobile, selectedChamber, appointmentDate, slot } = formData;

      if (
         !name ||
         !age ||
         !mobile ||
         !selectedChamber ||
         !appointmentDate ||
         !slot ||
         !slot.id
      ) {
         alert("Please fill in all required fields.");
         return;
      }

      const payload = {
         name: name,
         age: age,
         mobileNo: mobile,
         userId: user.id,
         doctorInformationId: id,
         chamberInformationId: selectedChamber,
         chamberTimeDetailsId: slot.id,
         appointmentDate: appointmentDate,
         appointmentTimeSlot: slot.value,
         isDay: true,
         isDeleted: false,
         isConfirmed: true,
      };

      headerx["Authorization"] = `Bearer ${token}`;

      try {
         const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/BookAppointment`, {
            method: "POST",
            headers: headerx,
            body: JSON.stringify(payload),
         });

         const data = await res.json();

         if (res.ok) {
            toast.success("Successfully booked appointment");
         } else {
            toast.error(data?.message || "Something went wrong!");
         }
      } catch (error) {
         toast.error("Something went wrong!");
      } finally {
         toggleModal();
      }
   };


   useEffect(() => {
      if (isOpen) document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
   }, [isOpen]);

   return (
      <nav className="fixed bottom-0 left-0 right-0 shadow-lg p-2 z-[10000] aid-container">
         <button
            onClick={toggleModal}
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
                           className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
                        >
                           <option value="">Select Chamber</option>
                           {chambers.map((chamber) => (
                              <option key={chamber.id} value={chamber.id}>
                                 {chamber.name}
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
                           className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
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
                           className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
                           disabled={slots.length === 0}
                        >
                           <option value="">Select Slot</option>
                           {slots.map((slot) => (
                              <option key={slot.id} value={slot.id}>
                                 {slot.value}
                              </option>
                           ))}
                        </select>
                        {slots.length === 0 && (
                           <p className="text-sm text-red-500 mt-1">
                              Please select a chamber and date to view available slots.
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

                     {/* Submit Button */}
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
