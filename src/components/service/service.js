'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"
import { useI18n } from '../../context/i18n.js'

const Service = () => {
   const i18n = useI18n();
   const data = [
      {
         image: "/home/service/s1.png",
         heading: i18n.t("Doctor Appointment"),
         description: i18n.t("Doctor Appointment Description"),
         link: "/doctor",
      },
      {
         image: "/home/service/s2.png",
         heading: i18n.t("Diagnostic Centers and Hospitals"),
         description: i18n.t("Diagnostic Centers Description"),
         link: "/diagnostic",
      },
      {
         image: "/home/service/s3.png",
         heading: i18n.t("Dental Clinic"),
         description: i18n.t("Dental Clinic Description"),
         link: "/dental",
      },
      {
         image: "/home/service/s4.png",
         heading: i18n.t("Blood Bank and Donor Club"),
         description: i18n.t("Blood Bank Description"),
         link: "/blood",
      },
      {
         image: "/home/service/s5.png",
         heading: i18n.t("Ambulance Service"),
         description: i18n.t("Ambulance Service Description"),
         link: "/ambulance",
      },
      {
         image: "/home/service/s6.png",
         heading: i18n.t("Pharmacy and Medicine Delivery"),
         description: i18n.t("Pharmacy Description"),
         link: "/pharmacy",
      },
      {
         image: "/home/service/s7.png",
         heading: i18n.t("Physiotherapy Center"),
         description: i18n.t("Physiotherapy Description"),
         link: "/physiotherapy-center",
      },
      {
         image: "/home/service/s8.png",
         heading: i18n.t("Eye Care Center"),
         description: i18n.t("Eye Care Description"),
         link: "/eye-care-center",
      },
      {
         image: "/home/service/s9.png",
         heading: i18n.t("Drug Rehabilitation Center"),
         description: i18n.t("Rehab Description"),
         link: "/drug-de-addiction",
      },
      {
         image: "/home/service/s10.png",
         heading: i18n.t("Nursing Home Care"),
         description: i18n.t("Nursing Description"),
         link: "/nursing-home-care",
      },
      {
         image: "/home/service/s11.png",
         heading: i18n.t("Hearing Aid Center"),
         description: i18n.t("Hearing Description"),
         link: "/hearing-care-center",
      },
      {
         image: "/home/service/s12.png",
         heading: i18n.t("Emergency Services"),
         description: i18n.t("Emergency Description"),
         link: "/emergency",
      }
   ];

   return (
      <section className="mt-8 md:mt-16 lg:mt-20 xl:mt-[109px] aid-container">
         <div className="flex items-center justify-between gap-2">
            <div>
               <h1 className="text-[#212121] heading1">{i18n.t("AidFastBD Services")}</h1>
               <p className="text-[#061C3D] description2 mt-3 lg;mt-4">{i18n.t("AidFastBD Services Description")}</p>
            </div>
            <Link href={"/service"} target="_blank" className="flex items-center gap-1.5">
               <p className="text-[#1087EF] description2 whitespace-pre"> {i18n.t("Explore More")}</p>
               <FaArrowRightLong className="description1 text-[#1087EF]" />
            </Link>
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid lg:grid-cols-3 grid-cols-2 xl:gap-6 lg:gap-5 md:gap-4 gap-4">
               {data.map((item, index) => (
                  <Link
                     href={item.link}
                     key={index}
                     target="_blank"
                     className="hover:scale-105 transition-all hover:border-primary duration-300 flex flex-col justify-start items-center border border-[#3056D321] bg-white xl:rounded-2xl lg:rounded-xl rounded-lg p-6 mx-auto w-full text-center"
                  >
                     <Image
                        src={item.image}
                        width={100}
                        height={100}
                        className="h-12 w-12 md:w-[76px] md:h-[76px] object-contain animate-pulse"
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
