'use client'

import Image from "next/image"
import { useI18n } from "../../context/i18n";

const Information = () => {
   const i18n = useI18n()
   const data = [
      {
         image: "/home/info/i1.png",
         heading: i18n.t("15249+"),
         description: i18n.t("AidFast Beneficiary")
      },
      {
         image: "/home/info/i2.png",
         heading: i18n.t("98%"),
         description: i18n.t("Rated 5 stars by our customers.")
      },
      {
         image: "/home/info/i3.png",
         heading: i18n.t("16 + Service"),
         description: i18n.t("Available through AidFast app")
      },
      {
         image: "/home/info/i4.png",
         heading: i18n.t("5000+"),
         description: i18n.t("App Installs Across Devices")
      }
   ];


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-[97px]  bg-[#F8FCFF]">
         <div className="aid-container">
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-3">
               {
                  data.map((Item, index) => (
                     <div key={index} className="mx-auto xl:py-[46px] lg:py-9 md:py-6 py-4">
                        <Image
                           src={Item.image}
                           width={100}
                           height={100}
                           className="w-8 md:w-12 h-8 md:h-12 object-fill mx-auto animate-bounce [animation-duration:1500ms]"
                           alt="Service image"
                        />
                        <h4 className="heading3 mt-4 md:mt-5 xl:mt-6 text-[#061C3D] text-center">{Item.heading}</h4>
                        <h4 className="description1 mt-2 md:mt-3 text-[#42526B] text-center ">{Item.description}</h4>
                     </div>
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default Information
