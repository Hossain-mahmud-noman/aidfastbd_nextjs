'use client';

import React from "react";
import { cancelBooking } from "../../utils/func";

export default function AppointmentCard({ data, isHistory = false, token }) {

    return (

        <div className="border rounded-md p-2 bg-gray-50">
            {/* Serial Number */}
            <div className="text-sm font-medium text-gray-600 mb-2">
                {/* <span>Serial No: </span> */}
                <span className="font-semibold text-gray-800">Serial No:  {data.serial}</span>
            </div>
            <hr class="h-px  bg-gray-300 border-0 "></hr>


            {/* Doctor Info */}
            <div className="text-sm text-gray-700 mb-2">
                <p>
                    <span className="font-semibold">Doctor: </span> {data.doctorName}
                </p>
                <p>
                    <span className="font-semibold">Designation: </span> {data.doctorDesignation}
                </p>
                <p>
                    <span className="font-semibold">Speciality: </span> {data.doctorSpeciality}
                </p>
            </div>

            {/* Patient Info */}
            <div className="text-sm text-gray-700 mb-2">
                <p>
                    <span className="font-semibold">Patient: </span> {data.name}
                </p>
                <p>
                    <span className="font-semibold">Age: </span> {data.age}
                </p>
                <p>
                    <span className="font-semibold">Mobile No: </span> {data.mobileNo}
                </p>
            </div>

            <hr class="h-px bg-gray-300 border-0 "></hr>

            <div className="flex justify-between">

                <div>
                    {/* Chamber Info */}
                    <div className="text-sm text-gray-700">
                        <p>
                            <span className="font-semibold">Chamber: </span> {data.chamberName}
                        </p>
                        <p>
                            <span className="font-semibold">Schedule: </span> {data.dayName} {data.eveningTime}
                        </p>
                    </div>

                    {/* Appointment Date */}
                    <div className="text-sm text-green-600 font-semibold">
                        Appointment: {new Date(data.appointmentDate).toLocaleDateString()}
                    </div>
                </div>

                {/* Action Buttons */}

                {isHistory == true ? <div className="flex items-center">
                    <button className="bg-red-300 text-white px-4 py-2 rounded-md shadow-md text-sm">
                        Closed
                    </button>
                </div> : <div className="flex items-center gap-1">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 text-sm">
                        {data.isConfirmed == true ? "Confirmed" : "Pending"}
                    </button>

                    <button onClick={async () => {
                        await cancelBooking({ id: data.id, token: token });
                    }} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 text-sm">
                        Cancel
                    </button>
                </div>}


            </div>
        </div>
    );
}
