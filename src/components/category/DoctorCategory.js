'use client';
import React, { useState } from 'react';
import { base_endpoint } from '../../utils/constants';
import DoctorCard from '../DoctorCard';
import Image from 'next/image';

const DoctorCategory = ({ specialityData = [] }) => {
   const [spData, setSpData] = useState([]);
   const [spActive, setSpActive] = useState(null);
   const [spLoading, setSpLoading] = useState(false);
   const [searchTerm, setSearchTerm] = useState("")

   return (
      <>
         <div className='mb-1'>
            <div className="relative w-full mb-4">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                     />
                  </svg>
               </span>
               <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
               />
            </div>

            <h3 className="text-lg ml-3 mb-2">Speciality</h3>
            <div className="w-full overflow-x-scroll ">
               <div className="flex gap-3">
                  {specialityData.map((speciality, index) => (
                     <div

                        key={index}
                        onClick={async () => {
                           try {
                              setSpLoading(true);
                              let Specialty = "";
                              if (speciality) {
                                 Specialty = `&Specialty=${speciality.text}`;
                              }
                              let location = "";
                              let lat = localStorage.getItem("lat");
                              let lon = localStorage.getItem("lon");
                              if (lat && lon) {
                                 location = `&lat=${lat}&lon=${lon}`;
                              }
                              const url = `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=40${Specialty}${location}`;
                              const response = await
                                 fetch(url);
                              if (response.status === 200) {
                                 const data = await response.json();
                                 const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;

                                 setSpData(data['data']);

                              }
                              else {
                                 setSpData([]);
                              }
                           } catch (err) {
                              setSpData([]);

                           } finally {
                              setSpLoading(false);

                           }

                           setSpActive(index === spActive ? null : index);

                        }}
                        className={`cursor-pointer flex-shrink-0 w-[150px] h-[220px] bg-white shadow-lg rounded-lg p-1 ${index === spActive ? "border-green-500 border-t-4 border-2" : ""
                           }`}
                     >
                        <Image
                           width={150}
                           height={150}
                           src={speciality.imageUrl}
                           alt={speciality.text}
                           className="w-full object-cover rounded-t-lg"
                        />
                        <div className="mt-4 text-center">
                           <p className="text-sm font-semibold">{speciality.text}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>


            {spActive !== null && (spLoading == false && spData.length == 0) ? <div className='h-[180px] w-full flex items-center justify-center text-2xl'>No data Speciality available</div> :
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 xl:mt-12">
                  {spActive !== null && spData.map((d, index) => (
                     <DoctorCard key={`Speciality_${index}`} doctor={d} />
                  ))
                  }
               </div>}
         </div>
         {spActive !== null && <h3 className="text-lg ml-3 mb-2">Nearest Doctor</h3>}
      </>
   );
};

export default DoctorCategory;
