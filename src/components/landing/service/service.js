'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"
import { useI18n } from '../../../context/i18n.js'
import { useState } from "react"
import ContacTactModal from "../../../utils/contactModal.js"
const Service = ({ slug = null }) => {
   const [showModal, setShowModal] = useState(false);
   const handleOpen = () => setShowModal(true);
   const handleClose = () => setShowModal(false);
   const i18n = useI18n();
   const data = [
      {
         image: "/home/service/d1.jpg",
         heading: i18n.t("Doctor"),
         button: i18n.t("Book Appointment"),
         link: "/doctor",
      },
      {
         image: "/home/service/s2.png",
         heading: i18n.t("Diagnostic Center"),
         button: i18n.t("Find Center"),
         link: "/diagnostic",
      },
      {
         image: "/home/service/s3.png",
         heading: i18n.t("Dental Clinic"),
         button: i18n.t("Book Appointment"),
         link: "/dental",
      },
      {
         image: "/home/service/s4.png",
         heading: i18n.t("Eye Care Center"),
         button: i18n.t("Book Appointment"),
         link: "/eye-care-center",
      },
      {
         image: "/home/service/s5.png",
         heading: i18n.t("Blood Bank and Donor Club"),
         button: i18n.t("Find Doner"),
         link: "/blood",
      },
      {
         image: "/home/service/s6.png",
         heading: i18n.t("Ambulance Service"),
         button: i18n.t("Book Ambulance"),
         link: "/ambulance",
      },
      {
         image: "/home/service/s7.png",
         heading: i18n.t("Doctor Home Visit"),
         button: i18n.t("Book Appointment"),
         link: "/doctor-home-visit",
      },
      {
         image: "/home/service/s8.png",
         heading: i18n.t("General Practitioner"),
         button: i18n.t("Book Appointment"),
         link: "/practitioner",
      },
      {
         image: "/home/service/s9.png",
         heading: i18n.t("Drug De-Addiction Center"),
         button: i18n.t("Find Service"),
         link: "/drug-de-addiction",
      },
      {
         image: "/home/service/s10.png",
         heading: i18n.t("Physiotherapy Center"),
         button: i18n.t("Find Center"),
         link: "/physiotherapy-center",
      },
      {
         image: "/home/service/s11.png",
         heading: i18n.t("Hearing Aid Center"),
         button: i18n.t("Find Center"),
         link: "/hearing-care-center",
      },
      {
         image: "/home/service/s12.png",
         heading: i18n.t("Pharmacy & Medicines"),
         button: i18n.t("Order Medicines"),
         link: "/pharmacy",
      },
      {
         image: "/home/service/s13.png",
         heading: i18n.t("Nursing Care Home"),
         button: i18n.t("Book Appointment"),
         link: "/nursing-home-care",
      },
      {
         image: "/home/service/s14.png",
         heading: i18n.t("Caregiver Center"),
         button: i18n.t("Book Appointment"),
         // button: i18n.t("Call Now"),
         link: "/care-giver-center"
         // phone: "+8801338988734",
      },
      {
         image: "/home/service/s15.png",
         heading: i18n.t("Emergency Helpline"),
         button: i18n.t("Call Now"),
         phone: "+8801338988734",
      }
   ];

   return (
      <section className="mt-2 md:mt-4 lg:mt-10 xl:mt-12 2xl:mt-14 aid-container">
         <div className="flex items-center justify-between gap-2">
            <div>
               <h1 className="text-[#212121] service-heading">{i18n.t("AidFastBD Services")}</h1>
            </div>
            {
               slug == null ?
                  <Link href={"/service"} className="flex items-center gap-1.5">
                     <p className="text-[#1087EF] hero-description whitespace-pre"> {i18n.t("Explore More")}</p>
                     <FaArrowRightLong className="hero-description  text-[#1087EF]" />
                  </Link> :
                  ""
            }
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid grid-cols-3 xl:gap-5 lg:gap-4 md:gap-3 gap-2">
               {data.map((item, index) => (
                  item.link ?
                     <Link
                        href={item.link}
                        key={index}
                        className="shadow-custom-light hover:scale-105 transition-all hover:border-primary duration-300 flex flex-col justify-start items-center border border-[#3056D321] bg-white xl:rounded-[20px] lg:rounded-xl rounded-lg mx-auto w-full text-center"
                     >
                        <Image
                           src={item.image}
                           width={1000}
                           height={1000}
                           className="w-full md:w-[358px] xl:h-[230px] lg:h-[200px] md:h-[150px] h-[78px] object-fill"
                           alt="Service image"
                        />
                        <h4 className="service-title mt-1.5 md:mt-4 lg:mt-6 text-[#061C3D] whitespace-pre">{item.heading}</h4>
                        <div className="my-2 md:my-4 lg:my-7 flex justify-center">
                           <div className="flex items-center gap-1 lg:gap-2">
                              <p className="service-button text-primary whitespace-pre">{item.button}</p>
                              <FaArrowRightLong className="text-primary service-button" />
                           </div>
                        </div>
                     </Link> :
                     <div
                        key={index}
                        className="shadow-custom-light hover:scale-105 transition-all hover:border-primary duration-300 flex flex-col justify-start items-center border border-[#3056D321] bg-white xl:rounded-2xl lg:rounded-xl rounded-lg mx-auto w-full text-center"
                     >
                        <Image
                           src={item.image}
                           width={500}
                           height={500}
                           className="w-full md:w-[358px] xl:h-[230px] lg:h-[200px] md:h-[150px] h-[78px] object-fill"
                           alt="Service image"
                        />
                        <h4 className="service-title mt-1.5 md:mt-4 lg:mt-6 text-[#061C3D] whitespace-pre">{item.heading}</h4>
                        <div className="my-2 md:my-4 lg:my-7 flex justify-center">
                           <button onClick={handleOpen} className="flex items-center gap-2">
                              <p className="service-button text-primary">{item.button}</p>
                              <FaArrowRightLong className="text-primary service-button" />
                           </button>
                        </div>
                        <ContacTactModal
                           contact={item.phone}
                           open={showModal}
                           onClose={handleClose}
                        />
                     </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Service
