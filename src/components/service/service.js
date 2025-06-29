'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Service = () => {
   const data = [
      {
         "image": "/home/service/s1.png",
         "heading": "Appoinment of Doctor",
         "description": "Consult experienced doctors for primary health concerns.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s2.png",
         "heading": "Diagonistick Center",
         "description": "Get emergency ambulance support anywhere in the country.",
         "link": "/diagonistick"
      },
      {
         "image": "/home/service/s3.png",
         "heading": "Dental Clinik",
         "description": "Order medicines online and receive them at your doorstep.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s4.png",
         "heading": "Blood Bank",
         "description": "Book lab tests and get reports from trusted labs.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s5.png",
         "heading": "Ambulence Service",
         "description": "Consult doctors via video call from the comfort of your home.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s6.png",
         "heading": "Pharmacy Service",
         "description": "Access top diagnostic centers for accurate health checkups.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s7.png",
         "heading": "Physiotherapy Center",
         "description": "Hire professional nursing care at home for patients.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s8.png",
         "heading": "Eye care Center",
         "description": "Get counseling and support for mental wellness.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s9.png",
         "heading": "Drug Rehabilitation Center",
         "description": "Book physical therapy sessions at clinics or home.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s10.png",
         "heading": "Nursing Care home",
         "description": "Explore affordable health insurance plans.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s11.png",
         "heading": "Haring Care Center",
         "description": "Find and request blood donors quickly and reliably.",
         "link": "/doctor"
      },
      {
         "image": "/home/service/s12.png",
         "heading": "Emmergency Service",
         "description": "Rent or purchase essential medical equipment.",
         "link": "/doctor"
      }
   ]

   return (
      <section className="mt-5 lg:mt-6 xl:mt-8 aid-container">
         <div className="flex items-center justify-between gap-2">
            <div>
               <h1 className="text-[#212121] heading1">Services Of AisFast</h1>
               <p className="text-[#061C3D] description2 mt-3 lg;mt-4">AidFastBD unites medical and support services nationwide to simplify your healthcare</p>
            </div>
            <Link href={"/service"} className="flex items-center gap-1.5">
               <p className="text-[#1087EF] description2 whitespace-pre"> More Srvices</p>
               <FaArrowRightLong className="description1 text-[#1087EF]" />
            </Link>
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid lg:grid-cols-3 grid-cols-2 xl:gap-6 lg:gap-5 md:gap-4 gap-4">
               {data.map((item, index) => (
                  <Link
                     href={item.link}
                     key={index}
                     className="flex flex-col justify-start items-center border border-[#3056D321] bg-white xl:rounded-2xl lg:rounded-xl rounded-lg p-6 mx-auto w-full text-center"
                  >
                     <Image
                        src={item.image}
                        width={100}
                        height={100}
                        className="h-12 w-12 md:w-[76px] md:h-[76px] object-contain"
                        alt="Service image"
                     />
                     <h4 className="heading3 mt-6 text-[#061C3D]">{item.heading}</h4>
                     <p className="description1 mt-3 text-[#42526B]">{item.description}</p>
                  </Link>
               ))}
            </div>

         </div>
      </section>
   )
}

export default Service
