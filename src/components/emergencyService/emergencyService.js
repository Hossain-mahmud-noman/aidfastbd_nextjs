/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Image from "next/image"
import { BiSolidPhoneCall } from "react-icons/bi"
import { useI18n } from "../../context/i18n"
import { useState } from "react"
import ContacTactModal from "../../utils/contactModal"

const EmergencyService = () => {
   const i18n = useI18n()
   const [showModal, setShowModal] = useState(false);
   const handleOpen = () => setShowModal(true);
   const handleClose = () => setShowModal(false);
   const data = [
      {
         image: "/common/s11.png",
         heading: i18n.t("Emergency Service 24/7"),
         description: i18n.t("Emergency Service Description"),
         call: "tel:+8801338988734",
         slug: i18n.t("Call Emergency")
      }
   ];

   return (
      <section className="aid-container">
         {
            data.map((item, index) => (
               <div key={index} className={`mt-5 md:mt-6 lg:mt-8 xl:mt-10 flex items-center ${index % 2 === 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"} xl:gap-[72px] lg:gap-12 gap-5`}>
                  <Image
                     src={item.image}
                     width={1000}
                     height={1000}
                     alt="Abmulence"
                     className="w-full md:w-[429px] xl:h-[303px] lg:h-[280px] h-[300px] object-fill"
                  />
                  <div className="w-full">
                     <h1 className="heading1 text-[#212B36]">{item.heading}</h1>
                     <p className="description2 text-[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">{item.description}</p>
                     <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                        <button onClick={handleOpen} target="_blank" className="hover:scale-105 bg-[#1087EF] px-3 md:px-6 md:py-3 py-2 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                           <BiSolidPhoneCall className="text-white description2" />
                           <p className="description5 text-white whitespace-pre">{item.slug}</p>
                        </button>
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

export default EmergencyService;
