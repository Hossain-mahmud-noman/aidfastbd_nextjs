import Image from "next/image";
import Link from "next/link";
import React from "react";

const AidComponent = () => {
  return (
    <div className="bg-gray-100 p-4 flex flex-col items-center">
      {/* Grid Container for Service Cards */}
      <div className="w-full mb-4">
        {/* Top Section Start*/}
        <div className="flex w-full h-[270px]">
          <div
            className={`bg-white rounded-lg flex flex-col justify-between h-[270px]  w-full mr-2`}
          >
            <Link href={"/doctor"}>
              <div className=" p-2 ">
                <h3 className="font-semi text-gray-700">{"Doctor"}</h3>
                <p className="text-sm text-gray-500">
                  Take Appointment More Than 1603 Active Doctors
                </p>
                <div className="mb-1 mt-3">
                  <Image
                    width={100}
                    height={100}
                    src={"/icons/doctor.png"}
                    alt={"Doctor Card"}
                    className="w-[100%] h-[160px] object-contain"
                  />
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full ml-2 bg-blue[600]">
            <div
              className={`bg-white p-2 rounded-lg flex flex-col justify-between h-[170px]`}
            >
              <Link href={"/diagnostic"}>
                <div>
                  <h3 className=" font-semi text-gray-700">
                    Diagnostic Center & Hospital
                  </h3>
                  <p className="text-sm text-gray-500">
                    More Than 1407 Diagnostic Centers Available
                  </p>
                </div>

                <div className="mb-3 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src={"/icons/diagnostic.png"}
                    alt={"Diagnostic Center & Hospital"}
                    className="w-[45px] h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            <div
              className={`bg-white p-2 rounded-lg flex flex-col items-center  mt-2  h-[90px]`}
            >
              <Link href={"/blood"} className="h-full">
                <div className="mb-1">
                  <Image
                    width={100}
                    height={100}
                    src={"/icons/blood_bank.png"}
                    alt={"Blood Bank & Donor Club"}
                    className="w-[28px] h-[28px] object-contain"
                  />
                </div>
                <p className="font-semi text-gray-700">
                  {"Blood Bank & Donor Club"}
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* Top Section End*/}

        <div
          className={`bg-white mt-2 p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
        >
          <Link href={"/dental"}>
            <div className="mb-3">
              <Image
                width={100}
                height={100}
                src={"/images/dental.png"}
                alt={"Dentals"}
                className="w-[45px] h-[35px] object-contain"
              />
            </div>
            <h3 className="font-semi text-gray-700">{"Dental Clinic"}</h3>
          </Link>
        </div>

        {/* Drug de addiction */}
        <div
          className={`bg-white mt-2 p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
        >
          <Link href={"/drugDeAddiction"}>
            <div className="mb-2 flex flex-col items-center justify-center">
              <Image
                width={100}
                height={100}
                src={"/icons/drug.png"}
                alt={"Dentals"}
                className="w-[50px] h-[35px] object-contain"
              />
            </div>
            <h3 className="font-semi text-gray-700">{"Drug De Addiction"}</h3>
          </Link>
        </div>



        {/* Physiotherapy Center */}
        <div
          className={`bg-white mt-2 p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
        >
          <Link href={"/physiotherapyCenter"}>
            <div className="mb-2 flex flex-col items-center justify-center">
              <Image
                width={100}
                height={100}
                src={"/icons/psy.png"}
                alt={"Dentals"}
                className="w-[50px] h-[35px] object-contain"
              />
            </div>
            <h3 className="font-semi text-gray-700">{"Physiotherapy Center"}</h3>
          </Link>
        </div>



        {/* Hearing Care Center */}
        <div
          className={`bg-white mt-2 p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
        >
          <Link href={"/hearingCareCenter"}>
            <div className="mb-2 flex flex-col items-center justify-center">
              <Image
                width={100}
                height={100}
                src={"/icons/hear.png"}
                alt={"Dentals"}
                className="w-[50px] h-[35px] object-contain"
              />
            </div>
            <h3 className="font-semi text-gray-700">{"Hearing Care Center"}</h3>
          </Link>
        </div>




        {/* Bottom Section Start */}
        <div className="flex h-[90px] mt-2 w-full">
          <div
            className={`bg-white p-2 rounded-lg flex flex-col items-center text-center  mr-2 w-full`}
          >
            <Link href={"/ambulance"}>
              <div className="mb-3">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/ambulance.png"}
                  alt={"Ambulance"}
                  className="w-[45px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Ambulance"}</h3>
            </Link>
          </div>

          <div
            className={`h-full bg-white p-2 rounded-lg flex flex-col items-center text-center  ml-2 w-full`}
          >
            {" "}
            <Link href={"/pharmacy"}>
              <div className="mb-3">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/drugs.png"}
                  alt={"Pharmacy"}
                  className="w-[35px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Pharmacy"}</h3>
            </Link>
          </div>
        </div>

        {/* Bottom Section End */}
      </div>
      {/* Emergency Button */}
      <Link
        className="bg-red-100 text-red-600 text-xl font-semibold w-full py-4 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 text-center"
        href={"/emergency"}
      >
        Emergency
      </Link>
    </div>
  );
};

export default AidComponent;
