import { useState } from 'react';
import { Modal, Button, message, Input } from 'antd';
import { image_base_endpoint } from '../utils/constants';
import { FaStar, FaStethoscope, FaEdit } from "react-icons/fa";
import Image from 'next/image';

const DiagnostickDoctorCard = ({ doctor }) => {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [chamberIdInput, setChamberIdInput] = useState("");
   const [diagnosticCenterId, setDiagnosticCenterId] = useState("");

   const defaultImageUrl = "/images/doctor.jpg";
   const profile = !doctor.imageUrl ? defaultImageUrl : image_base_endpoint + doctor.imageUrl;

   const fetchAccess = async (doctorId, diagnosticCenterId) => {
      const token = localStorage.getItem("token");

      try {
         const res = await fetch(
            `https://api.aidfastbd.com/api/Doctor/GetChamberInformationByDiagnosticAndDoctorId?diagnosticCenterId=${diagnosticCenterId}&doctorId=${doctorId}`,
            {
               method: "GET",
               headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
               },
               cache: "no-store"
            }
         );

         if (res.status === 400) {
            // Show modal to enter chamber ID
            setDiagnosticCenterId(diagnosticCenterId);
            setIsModalVisible(true);
         } else {
            const data = await res.json();
            message.success("Access granted");
            // console.log("✅ Chamber data:", data);
         }
      } catch (error) {
         console.error("Fetch access failed:", error);
         message.error("Something went wrong");
      }
   };

   const handleGetAccess = async () => {
      const token = localStorage.getItem("token");

      if (!chamberIdInput || !diagnosticCenterId) {
         message.warning("Please enter Chamber ID");
         return;
      }

      const payload = {
         diagnosticCenterId: diagnosticCenterId,
         chamberId: chamberIdInput
      };

      try {
         const res = await fetch("https://api.aidfastbd.com/api/Doctor/UpdateChamberAccessDiagnostic", {
            method: "POST",
            headers: {
               "Authorization": `Bearer ${token}`,
               "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
         });

         if (res.ok) {
            message.success("Access granted successfully");
            setIsModalVisible(false);
            setChamberIdInput("");
         } else {
            message.error("Failed to grant access");
         }
      } catch (error) {
         console.error("Error updating access:", error);
         message.error("Something went wrong");
      }
   };

   return (
      <div>
         <div className="flex flex-col h-full bg-white rounded-lg hover:shadow-custom-light transition-all duration-300">
            <Image
               width={1000}
               height={1000}
               placeholder="blur"
               blurDataURL="https://user-images.githubusercontent.com/160484/173871411-4d27b6dd-af89-4568-863c-c59b1242ce74.png"
               priority={false}
               src={profile}
               alt={`Dr. ${doctor.name}`}
               className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-contain rounded-t-lg"
            />

            <div className="flex-1 p-3">
               <h3 className="text-md md:text-xl text-black mb-1">Dr. {doctor.name}</h3>
               <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1">{doctor.degree}</p>

               <div className="flex items-center mb-1">
                  <FaStethoscope className="text-blue-500 mr-1" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-600">
                     {doctor.experience} years experience
                  </span>
               </div>

               <div className="flex items-center mb-1">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-600">
                     {doctor.averageRating ?? doctor.rating} ({doctor.totalRating ?? "0"} ratings)
                  </span>
               </div>

               <p className="text-sm sm:text-base md:text-lg font-semibold text-green-600">Fee {doctor.doctorFee}</p>
            </div>

            <hr className="border-t border-gray-300 my-2" />

            <div className='px-2 pb-2'>
               <button
                  onClick={() => fetchAccess(doctor?.doctorId, doctor?.diagnosticCenterId)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
               >
                  <FaEdit className="mr-2 text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base md:text-lg">Edit</span>
               </button>
            </div>
         </div>

         {/* Modal for Chamber ID input */}
         <Modal
            title="Get Access"
            open={isModalVisible}
            onCancel={() => {
               setIsModalVisible(false);
               setChamberIdInput("");
            }}
            footer={[
               <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                  Cancel
               </Button>,
               <Button key="submit" type="primary" onClick={handleGetAccess}>
                  Get Access
               </Button>,
            ]}
         >
            <p>Enter Chamber ID to get access:</p>
            <Input
               placeholder="Enter Chamber ID"
               value={chamberIdInput}
               onChange={(e) => setChamberIdInput(e.target.value)}
               className="mt-2"
            />
         </Modal>
      </div>
   );
};

export default DiagnostickDoctorCard;
