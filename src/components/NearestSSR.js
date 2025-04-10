import React from 'react';
import DoctorCard from './DoctorCard';
import DiagnosticCenterCard from './DiagnosticCenterCard';
import PharmacyCard from './PharmacyCard';
import AmbulanceCard from './AmbulanceCard';
import BloodBankCard from './BloodBankCard';
import Link from 'next/link';



function NearestSSR({ data,emergency=false }) {

    const { doctor, diagnostic, bloodBanks, pharmacy, ambulance } = data;


    return (
        <div id='nearest_ssr'>

            <div>
                <div className="container mx-auto px-2">
                    <div class="flex justify-between items-center">
                        <h2 className='mt-3 mb-1 text-xl'>{emergency===true?"Emergency ":""}Nearest Doctors</h2>
                        <Link href={"/doctor"} class="text-blue-500 hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {doctor !== null && doctor.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>
                        ))}
                    </div>
                </div>
                <div className="container mx-auto px-2">
                    <div class="flex justify-between items-center">
                        <h2 className='mt-3 mb-1 text-xl'>{emergency===true?"Emergency ":""} Nearest Diagnostic Centers</h2>
                        <Link href={"/diagnostic"} class="text-blue-500 hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {diagnostic !== null && diagnostic.map((d) => (
                            <DiagnosticCenterCard key={d.id} diagnostic={d}></DiagnosticCenterCard>
                        ))}
                    </div>
                </div>
                <div className="container mx-auto px-2">
                    <div class="flex justify-between items-center">
                        <h1 class="mt-3 mb-1 text-xl">{emergency===true?"Emergency ":""} Nearest Pharmacies</h1>
                        <Link href={"/pharmacy"} class="text-blue-500 hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {pharmacy !== null && pharmacy.map((d) => (
                            <PharmacyCard key={d.id} data={d}></PharmacyCard>
                        ))}
                    </div>
                </div>



                <div className="container mx-auto px-2">
                    <div class="flex justify-between items-center">
                        <h2 className='mt-3 mb-1 text-xl'>{emergency===true?"Emergency ":""}Nearest Blood Bank Clubs</h2>
                        <Link href={"/blood"} class="text-blue-500 hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {bloodBanks !== null && bloodBanks.map((d) => (
                            <BloodBankCard key={d.id} data={d}></BloodBankCard>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-2">
                    <div class="flex justify-between items-center">
                        <h2 className='mt-3 mb-1 text-xl'>{emergency===true?"Emergency ":""}Nearest Ambulances</h2>
                        <Link href={"/ambulance"} class="text-blue-500 hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {ambulance !== null && ambulance.map((d) => (
                            <AmbulanceCard key={d.id} data={d}></AmbulanceCard>
                        ))}
                    </div>
                </div>





            </div>

        </div>
    );
}

export default NearestSSR;
