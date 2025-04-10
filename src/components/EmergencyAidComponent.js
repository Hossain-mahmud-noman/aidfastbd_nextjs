import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EmergencyAidComponent = () => {
    return (
        <div className="bg-gray-100 p-4 flex flex-col items-center">
            {/* Grid Container for Service Cards */}
            <div className="w-full mb-4">

                {/* Top Section Start*/}
                <div className='flex w-full h-[300px]'>
                    <div
                        className={`bg-white rounded-lg flex flex-col justify-between h-[300px]  w-full mr-2`} >
                        <Link href={"/doctor"}>

                            <div className=' p-2 '>
                                <h3 className="font-semi text-gray-700">{"Emergency Doctor"}</h3>
                                <p className="text-sm text-gray-500">Take Appointment More Than 1603 Active Doctors</p>
                                <div className="mb-1 mt-3">
                                    <Image width={100} height={100} src={"/icons/doctor.png"} alt={"Doctor Card"} className="w-[100%] h-[160px] object-contain" />
                                </div>
                            </div>

                        </Link>

                    </div>

                    <div className='w-full ml-2 bg-blue[600]'>

                        <div
                            className={`bg-white p-2 rounded-lg flex flex-col justify-between h-[190px]`}
                        >
                            <Link href={"/diagnostic"}>
                                <div>
                                    <h3 className=" font-semi text-gray-700">Emergency Diagnostic Center & Hospital</h3>
                                    <p className="text-sm text-gray-500">More Than 1407 Diagnostic Centers Available</p>
                                </div>

                                <div className="mb-3 flex items-center justify-center">
                                    <img src={"/icons/diagnostic.png"} alt={"Diagnostic Center & Hospital"} className="w-[45px] h-full object-contain" />
                                </div>

                            </Link>
                        </div>


                        <div
                            className={`bg-white p-2 rounded-lg flex flex-col items-center  mt-2  h-[100px]`}
                        >
                            <Link href={"/blood"} className='h-full'>
                                <div className="mb-1">
                                    <img src={"/icons/blood_bank.png"} alt={"Blood Bank & Donor Club"} className="w-[28px] h-[28px] object-contain" />
                                </div>
                                <p className="font-semi text-gray-700">{"Emergency Blood Bank & Donor Club"}</p>
                            </Link>


                        </div>

                    </div>

                </div>


                {/* Bottom Section Start */}
                <div className='flex h-[110px] mt-2 w-full'>
                    <div
                        className={`bg-white p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
                    >
                        <Link href={"/ambulance"} >
                            <div className="mb-3">
                                <img src={"/icons/ambulance.png"} alt={"Ambulance"} className="w-[45px] h-[35px] object-contain" />
                            </div>

                            <h3 className="text-left font-semi text-gray-700">{"Emergency Ambulance"}</h3>
                        </Link>

                    </div>


                    <div
                        className={`h-full bg-white p-2 rounded-lg flex flex-col items-center text-center  ml-2 w-full`}
                    >                        <Link href={"/pharmacy"}>

                            <div className="mb-3">
                                <img src={"/icons/drugs.png"} alt={"Pharmacy"} className="w-[35px] h-[35px] object-contain" />
                            </div>
                            <h3 className="text-left font-semi text-gray-700">{"Emergency Pharmacy"}</h3>
                        </Link>

                    </div>


                </div>

                {/* Bottom Section End */}


                {/* Bottom Section Start */}
                <div className='flex h-[110px] mt-2 w-full'>
                    <div
                        className={`bg-white p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
                    >
                        <Link href={"/diagnostic?emergency=ot"} >
                            <div className="mb-3">
                                <img src={"/icons/ot.png"} alt={"OT"} className="w-[45px] h-[35px] object-contain" />
                            </div>

                            <h3 className="text-left font-semi text-gray-700">Emergency OT</h3>
                        </Link>

                    </div>


                    <div
                        className={`h-full bg-white p-2 rounded-lg flex flex-col items-center text-center  ml-2 w-full`}
                    >                        <Link href={"/diagnostic?emergency=icu"}>

                            <div className="mb-3">
                                <img src={"/icons/icu.png"} alt={"ICU"} className="w-[35px] h-[35px] object-contain" />
                            </div>
                            <h3 className="text-left font-semi text-gray-700">Emergency ICU</h3>
                        </Link>

                    </div>


                </div>

                {/* Bottom Section End */}


            </div>


        </div>
    );
};

export default EmergencyAidComponent;
