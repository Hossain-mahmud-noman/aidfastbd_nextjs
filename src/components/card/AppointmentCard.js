'use client';

import React from "react";
import { toast } from "sonner";
import Swal from 'sweetalert2';


export default function AppointmentCard({ data, isHistory = false, token }) {

   const cancelBooking = async ({ id }) => {
      try {
         const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel this appointment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Cancel it!'
         });

         if (!confirm.isConfirmed) return;

         const url = `${base_endpoint}/GeneralInformation/CancelBooking`;
         headerx['Authorization'] = `Bearer ${token}`;

         const response = await fetch(url, {
            method: "PUT",
            headers: headerx,
            body: JSON.stringify({ isCanceled: true, id })
         });

         const result = await response.json();

         if (response.status === 200) {
            toast.success("Appointment cancelled successfully!");
            setTimeout(() => window.location.reload(), 1000);
         } else {
            toast.error("Failed to cancel appointment.");
         }

      } catch (err) {
         toast.error("Something went wrong!");
         console.error(err);
      }
   };

   return (
      <div className="aid-container p-3 lg:p-5 border border-gray-300 rounded-xl bg-white shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
         
         {/* Serial Number */}
         <div className="text-sm font-semibold text-gray-800 px-3 lg:px-5">
            Serial No: {data.serial}
         </div>
         <hr className="border-gray-200" />

         {/* Doctor Info */}
         <div className="text-sm text-gray-700 space-y-1 px-3 lg:px-5">
            <p><span className="font-semibold">Doctor:</span> {data.doctorName}</p>
            <p><span className="font-semibold">Designation:</span> {data.doctorDesignation}</p>
            {data.doctorSpeciality && <p><span className="font-semibold">Speciality:</span> {data.doctorSpeciality}</p>}
         </div>

         {/* Patient Info */}
         <div className="text-sm text-gray-700 space-y-1 px-3 lg:px-5">
            <p><span className="font-semibold">Patient:</span> {data.name}</p>
            <p><span className="font-semibold">Age:</span> {data.age}</p>
            <p><span className="font-semibold">Mobile No:</span> {data.mobileNo}</p>
         </div>

         <hr className="border-gray-200" />

         {/* Chamber and Date */}
         <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-700 gap-3 px-3 lg:px-5">
            <div>
               <p><span className="font-semibold">Chamber:</span> {data.chamberName}</p>
               <p><span className="font-semibold">Schedule:</span> {data.dayName} {data.eveningTime}</p>
            </div>
            <div className="text-green-600 font-semibold">
               Appointment: {new Date(data.appointmentDate).toLocaleDateString()}
            </div>
         </div>

         {/* Action Buttons */}
         <div className="flex justify-end items-center gap-2 pt-2 px-3 lg:px-5">
            {isHistory ? (
               <span className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm">
                  Closed
               </span>
            ) : (
               <>
                  <button
                     className={`px-4 py-2 rounded-md text-sm font-medium shadow-md 
                        ${data.isConfirmed ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} 
                        text-white transition`}
                  >
                     {data.isConfirmed ? "Confirmed" : "Pending"}
                  </button>
                  <button
                     onClick={() => cancelBooking({ id: data.id })}
                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition"
                  >
                     Cancel
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
