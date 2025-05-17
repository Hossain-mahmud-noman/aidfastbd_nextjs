'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import DoctorCard from './DoctorCard';
import DiagnosticCenterCard from './DiagnosticCenterCard';
import PharmacyCard from './PharmacyCard';
import AmbulanceCard from './AmbulanceCard';
import BloodBankCard from './BloodBankCard';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';

function Nearest({ emergency = false }) {
  const { doctor, diagnostic, bloodBanks, pharmacy, ambulance, loading, error } = useSelector((state) => state.data);

  return (
    <div>
      {
        loading ? (
          <div className='w-full h-full flex justify-center items-center my-10'>
            <div className="flex items-center space-x-2">
              <FaSpinner className="animate-spin text-indigo-600 text-3xl md:text-4xl" />
              <span className="text-gray-600 text-xl md:text-3xl">Loading ...</span>
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className='aid-container'>
            {doctor && doctor.length > 0 && (
              <div className="mx-auto mt-6">
                <div className="flex justify-between items-center">
                  <h2 className="mt-3 mb-1 text-xl">
                    {emergency ? "Emergency " : ""}Nearest Doctors
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {doctor.map((doctorItem) => (
                    <DoctorCard key={doctorItem.id} doctor={doctorItem} />
                  ))}
                  <Link
                    href="/doctor"
                    className="mt-3 flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                    style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement
                  >
                    View All
                  </Link>
                </div>
              </div>
            )}



            {diagnostic !== null && diagnostic.length > 0 &&
              <div className=" mx-auto mt-10">
                <div class="flex justify-between items-center">
                  <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Diagnostic Centers</h2>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {diagnostic.map((d) => (
                    <DiagnosticCenterCard key={d.id} diagnostic={d}></DiagnosticCenterCard>
                  ))}
                  <Link href={"/diagnostic"}
                    className="mt-3 flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                    style={{ gridColumn: 'span 1' }}
                  >View All</Link>

                </div>
              </div>}


            {pharmacy !== null && pharmacy.length > 0 &&
              <div className=" mx-auto mt-10">
                <div class="flex justify-between items-center">
                  <h1 class="mt-3 mb-1 text-xl">{emergency === true ? "Emergency " : ""}Nearest Pharmacies</h1>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {pharmacy.map((d) => (
                    <PharmacyCard key={d.id} data={d}></PharmacyCard>
                  ))}

                  <Link href={"/pharmacy"}
                    className="mt-3 flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                    style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                  >View All</Link>
                </div>
              </div>
            }



            {bloodBanks !== null && bloodBanks.length > 0 &&
              <div className=" mx-auto mt-10">
                <div class="flex justify-between items-center">
                  <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Blood Bank Clubs</h2>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {bloodBanks.map((d) => (
                    <BloodBankCard key={d.id} data={d}></BloodBankCard>
                  ))}

                  <Link href={"/blood"}
                    className="mt-3 flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                    style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                  >View All</Link>
                </div>
              </div>}


            {ambulance !== null && ambulance.length > 0 &&
              <div className="mx-auto mt-10">
                <div class="flex justify-between items-center">
                  <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Ambulances</h2>
                </div>

                <div className="mt-4  mb-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {ambulance.map((d) => (
                    <AmbulanceCard key={d.id} data={d}></AmbulanceCard>
                  ))}

                  <Link href={"/ambulance"}
                    className="mt-3 flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                    style={{ gridColumn: 'span 1' }}                         
                  >View All</Link>
                </div>
              </div>}
          </div>
        )}
    </div>
  );
}

export default Nearest;
