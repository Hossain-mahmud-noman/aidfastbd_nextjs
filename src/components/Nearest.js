'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import DoctorCard from './DoctorCard';
import DiagnosticCenterCard from './DiagnosticCenterCard';
import PharmacyCard from './PharmacyCard';
import AmbulanceCard from './AmbulanceCard';
import BloodBankCard from './BloodBankCard';
import Link from 'next/link';

function Nearest({ emergency = false }) {

    const { doctor, diagnostic, bloodBanks, pharmacy, ambulance, loading, error } = useSelector((state) => state.data);





    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {doctor && doctor.length > 0 && (
                        <div className="container mx-auto px-2">
                            <div className="flex justify-between items-center">
                                <h2 className="mt-3 mb-1 text-xl">
                                    {emergency ? "Emergency " : ""}Nearest Doctors
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {doctor.map((doctorItem) => (
                                    <DoctorCard key={doctorItem.id} doctor={doctorItem} />
                                ))}
                                <Link
                                    href="/doctor"
                                    className="flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                                    style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement
                                >
                                    View All
                                </Link>
                            </div>
                        </div>
                    )}



                    {diagnostic !== null && diagnostic.length > 0 && <div className="container mx-auto px-2">
                        <div class="flex justify-between items-center">
                            <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Diagnostic Centers</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {diagnostic.map((d) => (
                                <DiagnosticCenterCard key={d.id} diagnostic={d}></DiagnosticCenterCard>
                            ))}
                            <Link href={"/diagnostic"}
                                className="flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                                style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                            >View All</Link>


                        </div>
                    </div>}


                    {pharmacy !== null && pharmacy.length > 0 && <div className="container mx-auto px-2">
                        <div class="flex justify-between items-center">
                            <h1 class="mt-3 mb-1 text-xl">{emergency === true ? "Emergency " : ""}Nearest Pharmacies</h1>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {pharmacy.map((d) => (
                                <PharmacyCard key={d.id} data={d}></PharmacyCard>
                            ))}

                            <Link href={"/pharmacy"}
                                className="flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                                style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                            >View All</Link>
                        </div>
                    </div>
                    }



                    {bloodBanks !== null && bloodBanks.length > 0 && <div className="container mx-auto px-2">
                        <div class="flex justify-between items-center">
                            <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Blood Bank Clubs</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {bloodBanks.map((d) => (
                                <BloodBankCard key={d.id} data={d}></BloodBankCard>
                            ))}

                            <Link href={"/blood"}
                                className="flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                                style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                            >View All</Link>
                        </div>
                    </div>}


                    {ambulance !== null && ambulance.length > 0 && <div className="container mx-auto px-2">
                        <div class="flex justify-between items-center">
                            <h2 className='mt-3 mb-1 text-xl'>{emergency === true ? "Emergency " : ""}Nearest Ambulances</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {ambulance.map((d) => (
                                <AmbulanceCard key={d.id} data={d}></AmbulanceCard>
                            ))}

                            <Link href={"/ambulance"}
                                className="flex items-center justify-center border rounded-lg h-full bg-gray-100 text-blue-500 hover:underline"
                                style={{ gridColumn: 'span 1' }} // Ensures consistent grid placement                            
                            >View All</Link>
                        </div>
                    </div>}

                </div>
            )}
        </div>
    );
}

export default Nearest;
