'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"


const Service = () => {
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
      <section className="mt-5 lg:mt-6 xl:mt-8 aid-container">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-[#212121] heading1">Services Of AisFast</h1>
               <p className="text-[#061C3D] description2 mt-3 lg;mt-4">AidFastBD unites medical and support services nationwide to simplify your healthcare</p>
            </div>
            <Link href={"/service"} className="flex items-center gap-1.5">
               <p className="text-[#1087EF] description2"> More Srvices</p>
               <FaArrowRightLong className="description1 text-[#1087EF]" />
            </Link>
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid lg:grid-cols-3 grid-cols-2 xl:gap-6 lg:gap-5 md:gap-4 gap-2">
               {
                  data.map((Item, index) => (
                     <div key={index} className="border border-[#3056D321] bg-[#FFFFFF] xl:rounded-2xl lg:rounded-xl rounded-lg xl:py-8 lg:py-7 py-5 lg:px-5 px-4 mx-auto">
                        <Image
                           src={Item.image}
                           width={100}
                           height={100}
                           className="w-12 h-12 lg:w-14 lg:h-14 xl:w-[76px] xl:h-[76px] object-fill mx-auto"
                           alt="Service image"
                        />
                        <h4 className="heading3 mt-4 md:mt-5 xl:mt-6 text-[#061C3D] text-center">{Item.heading}</h4>
                        <h4 className="description1 mt-2 md:mt-3 text-[#42526B] text-center">{Item.description}</h4>
                     </div>
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default Service
