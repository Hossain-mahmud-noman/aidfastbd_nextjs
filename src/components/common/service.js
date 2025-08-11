'use client'

import Image from "next/image"
import Link from "next/link"
import { BiSolidPhoneCall } from "react-icons/bi"
import { FaArrowRightLong } from "react-icons/fa6"
import { useI18n } from "../../context/i18n"
import ContacTactModal from "../../utils/contactModal"
import { useState } from "react"

const CommonService = () => {
   const i18n = useI18n()
   const [showModal, setShowModal] = useState(false);
   const handleOpen = () => setShowModal(true);
   const handleClose = () => setShowModal(false);
   const data = [
      {
         image: "/common/s1.png",
         heading: i18n.t("Book Specialist Doctor"),
         description: i18n.t("Book Specialist Doctor Description"),
         link: "/doctor",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Appointment")
      },
      {
         image: "/common/s2.png",
         heading: i18n.t("Nearby diagnostic and hospital facilities"),
         description: i18n.t("Diagnostics and Hospitals Description"),
         link: "/diagnostic",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Diagnostic")
      },
      {
         image: "/common/ambulence.png",
         heading: i18n.t("Get the nearest ambulance service in emergencies — just one click away"),
         description: i18n.t("Ambulance Service Description2"),
         link: "/ambulance",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Ambulance")
      },
      {
         image: "/common/s3.png",
         heading: i18n.t("Trusted Dental Clinics"),
         description: i18n.t("Trusted Dental Clinics Description"),
         link: "/dental",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Dental Care")
      },
      {
         image: "/common/s4.png",
         heading: i18n.t("Nearest emergency blood bank and donor organization"),
         description: i18n.t("Blood Donor Club Description"),
         link: "/blood",
         call: "tel:+8801338988734",
         slug: i18n.t("Find Donor")
      },
      {
         image: "/common/s5.png",
         heading: i18n.t("Find pharmacies and order the medicines you need."),
         description: i18n.t("Medicine Delivery Description"),
         link: "/pharmacy",
         call: "tel:+8801338988734",
         slug: i18n.t("Order Medicine")
      },
      {
         image: "/common/s6.png",
         heading: i18n.t("Modern Physiotherapy"),
         description: i18n.t("Modern Physiotherapy Description"),
         link: "/physiotherapy-center",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Physiotherapy")
      },
      {
         image: "/common/s7.png",
         heading: i18n.t("Eye Care Support"),
         description: i18n.t("Eye Care Support Description"),
         link: "/eye-care-center",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Eye Checkup")
      },
      {
         image: "/common/s8.png",
         heading: i18n.t("Drug Rehabilitation"),
         description: i18n.t("Drug Rehabilitation Description"),
         link: "/drug-de-addiction",
         call: "tel:+8801338988734",
         slug: i18n.t("Get Rehab Help")
      },
      {
         image: "/common/s9.png",
         heading: i18n.t("Nursing Home Care2"),
         description: i18n.t("Nursing Home Care Description"),
         link: "/nursing-home-care",
         call: "tel:+8801338988734",
         slug: i18n.t("Book Nursing Care")
      },
      {
         image: "/common/s10.png",
         heading: i18n.t("Hearing Aid Center"),
         description: i18n.t("Hearing Aid Support Description"),
         link: "/hearing-care-center",
         call: "tel:+8801338988734",
         slug: i18n.t("Consult Audiologist")
      },
   ];

   return (
      <section className="aid-container">
         {
            data.map((item, index) => (
               <div key={index} className={`mt-16 md:mt-24 lg:mt-28 xl:mt-[160px] flex items-center ${index % 2 === 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"} xl:gap-[72px] lg:gap-12 gap-5`}>
                  <Image
                     src={item.image}
                     width={1000}
                     height={1000}
                     alt="Abmulence"
                     className="w-full md:w-[429px] xl:h-[303px] lg:h-[280px] h-[300px] object-fill"
                  />
                  <div className="w-full">
                     <h1 className="heading1  xl:!leading-[60px] text-[#212B36]">{item.heading}</h1>
                     {/* <p className="description2 text-[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">{item.description}</p> */}
                     <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                        <Link href={item.link} className="hover:scale-105 bg-[#1087EF] px-6 py-3  rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                           {/* <BiSolidPhoneCall className="text-white description2" /> */}
                           <p className="description5 text-white whitespace-pre">{item.slug}</p>
                        </Link>
                        {/* {
                           item.link && (
                              <Link href={item.link} className="hover:scale-105 group bg-white border-2 border-primary md:px-6 md:py-3 px-3 py-2 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                                 <p className="description5 text-primary group-hover:text-white transition-all duration-300 whitespace-pre">{i18n.t("Learn More")}</p>
                                 <FaArrowRightLong className="description2 text-primary group-hover:text-white transition-all duration-300" />
                              </Link>
                           )
                        } */}
                     </div>
                  </div>
               </div>
            ))
         }
         <ContacTactModal
            contact="+8801338988734"
            open={showModal}
            onClose={handleClose}
         />
      </section>
   )
}

export default CommonService;
