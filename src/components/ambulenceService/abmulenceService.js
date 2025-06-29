'use client'

import Image from "next/image"
import Link from "next/link"
import { BiSolidPhoneCall } from "react-icons/bi"
import { FaArrowRightLong } from "react-icons/fa6"

const AmbulenceService = () => {
   const data = [
      {
         "image": "/services/doctor.png",
         "heading": "General Physicians",
         "description": "Consult experienced doctors for primary health concerns."
      },
      {
         "image": "/services/ambulance.png",
         "heading": "Ambulance Services",
         "description": "Get emergency ambulance support anywhere in the country."
      },
      {
         "image": "/services/medicine.png",
         "heading": "Pharmacy Delivery",
         "description": "Order medicines online and receive them at your doorstep."
      },
      {
         "image": "/services/lab-test.png",
         "heading": "Lab Tests",
         "description": "Book lab tests and get reports from trusted labs."
      },
      {
         "image": "/services/telemedicine.png",
         "heading": "Telemedicine",
         "description": "Consult doctors via video call from the comfort of your home."
      },
      {
         "image": "/services/diagnostics.png",
         "heading": "Diagnostic Centers",
         "description": "Access top diagnostic centers for accurate health checkups."
      },
      {
         "image": "/services/nursing.png",
         "heading": "Home Nursing",
         "description": "Hire professional nursing care at home for patients."
      },
      {
         "image": "/services/counseling.png",
         "heading": "Mental Health Support",
         "description": "Get counseling and support for mental wellness."
      },
      {
         "image": "/services/physio.png",
         "heading": "Physiotherapy",
         "description": "Book physical therapy sessions at clinics or home."
      },
      {
         "image": "/services/health-insurance.png",
         "heading": "Health Insurance",
         "description": "Explore affordable health insurance plans."
      },
      {
         "image": "/services/blood-bank.png",
         "heading": "Blood Bank",
         "description": "Find and request blood donors quickly and reliably."
      },
      {
         "image": "/services/medical-equip.png",
         "heading": "Medical Equipment",
         "description": "Rent or purchase essential medical equipment."
      }
   ]

   return (
      <section className="mt-16 md:mt-24 lg:mt-28 xl:mt-[180px] aid-container">
         <div className="flex items-center flex-col md:flex-row xl:gap-[72px] lg:gap-12 gap-5">
            <Image
               src="/home/service/ambulence.png"
               width={1000}
               height={1000}
               alt="Abmulence"
               className="w-full md:w-[429px] xl:h-[303px] lg:h-[280px] h-[200px] object-fill"
            />
            <div className="w-full">
               <h1 className="heading1 text-[#212B36]">Get Ambulance Service at Home</h1>
               <p className="description2 text[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">Get licensed ambulance service delivered to your doorstep within Dhaka in the fastest time, with discounts. Book online now</p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                  <Link href="tel: 01980445424" className="bg-[#1087EF] px-4 md:px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <BiSolidPhoneCall className="text-white description2" />
                     <p className="description2 text-white whitespace-pre">Book Ambulence</p>
                  </Link>
                  <Link href="tel: 01980445424" className="bg-[#1087EF] px-4 md:px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <p className="description2 text-white whitespace-pre">Explore More</p>
                     <FaArrowRightLong className="text-white description1" />
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AmbulenceService
