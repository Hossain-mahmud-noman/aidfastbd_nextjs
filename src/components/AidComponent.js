import Image from "next/image";
import Link from "next/link";
import React from "react";

const AidComponent = () => {
  return (
    <div className="bg-white flex flex-col items-center aid-container mt-8">
      {/* Grid Container for Service Cards */}
      <div className="w-full">
        {/* Top Section Start*/}
        <div className="flex w-full h-[270px] gap-3">
          {/* Doctor */}
          <Link
            href={"/doctor"}
            className={`bg-white shadow-custom-light rounded-lg flex flex-col justify-between h-[270px] w-full`}
          >
            <div>
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
            </div>
          </Link>

          <div className="w-full">
            {/* Diagnostic */}
            <Link
              href={"/diagnostic"}
              className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col justify-between h-[170px]`}
            >
              <div>
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
              </div>
            </Link>
            {/* Dental */}
            <div
              className={`bg-white shadow-custom-light mt-3 p-2 rounded-lg flex flex-col items-center text-center w-full`}
            >
              <Link href={"/dental"}>
                <div className="mb-3 flex items-center justify-center">
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
          </div>
        </div>

        <div className="grid grid-cols-2 items-center justify-between w-full gap-3 mt-3">
          {/* Eye Care Center */}
          <Link
            href={"/eye-care-center"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div href={"/eye-care-center"}>
              <div className="mb-2 flex flex-col items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/eye.png"}
                  alt={"Dentals"}
                  className="w-[50px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Eye Care Center"}</h3>
            </div>
          </Link>

          {/* Blood */}
          <Link
            href={"/blood"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div className="w-full h-full">
              <div className="mb-2 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/blood_bank.png"}
                  alt={"Blood Bank & Donor Club"}
                  className="w-[50px] h-[35px] object-contain"
                />
              </div>
              <p className="font-semi text-gray-700">
                {"Blood Bank & Donor Club"}
              </p>
            </div>
          </Link>
        </div>

        {/* Pharmacy and Ambulance */}
        <div className="flex mt-3 w-full gap-3">
          {/* Ambulance */}
          <Link
            href={"/ambulance"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div>
              <div className="mb-2">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/ambulance.png"}
                  alt={"Ambulance"}
                  className="w-[45px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Ambulance"}</h3>
            </div>
          </Link>
          {/* Pharmacy */}
          <Link
            href={"/pharmacy"}
            className={`h-full bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div href={"/pharmacy"}>
              <div className="mb-2">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/drugs.png"}
                  alt={"Pharmacy"}
                  className="w-[35px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Pharmacy"}</h3>
            </div>
          </Link>
        </div>

        {/* Physiotherapy and Hearing Care */}
        <div className="flex items-center justify-between w-full gap-3 mt-3">
          {/* Physiotherapy Center */}
          <Link
            href={"/physiotherapy-center"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div>
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
            </div>
          </Link>
          {/* Hearing Care Center */}
          <Link
            href={"/hearing-care-center"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div className="w-full h-full">
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
            </div>
          </Link>
        </div>

        {/* Drug and Nursing */}
        <div className="flex items-center justify-between w-full gap-3 mt-3">
          {/* Drug de addiction */}
          <Link
            href={"/drug-de-addiction"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div className="w-full h-full">
              <div className="mb-2 flex flex-col items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/drug.png"}
                  alt={"Dentals"}
                  className="w-[50px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Drug De-Addiction"}</h3>
            </div>
          </Link>

          {/* Nursing Home Care */}
          <Link
            href={"/nursing-home-care"}
            className={`bg-white shadow-custom-light p-2 rounded-lg flex flex-col items-center text-center w-full`}
          >
            <div href={"/nursing-home-care"}>
              <div className="mb-2 flex flex-col items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={"/icons/nurse.png"}
                  alt={"Dentals"}
                  className="w-[50px] h-[35px] object-contain"
                />
              </div>
              <h3 className="font-semi text-gray-700">{"Nursing Home Care"}</h3>
            </div>
          </Link>
        </div>

      </div>
      {/* Emergency Button */}
      <Link
        className="mt-6 bg-red-100 text-red-600 text-xl font-semibold w-full py-4 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 text-center"
        href={"/emergency"}
      >
        Emergency
      </Link>
    </div>
  );
};

export default AidComponent;
