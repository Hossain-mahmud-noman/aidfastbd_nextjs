'use client'

import Image from "next/image"
import { useI18n } from "../../context/i18n";

const Information = () => {
   const i18n = useI18n()
   const data = [
      {
         image: "/home/info/i1.png",
         heading: i18n.t("7900+"),
         description: i18n.t("Active Users Nationwide")
      },
      {
         image: "/home/info/i2.png",
         heading: i18n.t("94%"),
         description: i18n.t("Received 5-Star Feedback")
      },
      {
         image: "/home/info/i3.png",
         heading: i18n.t("29+"),
         description: i18n.t("Trusted Healthcare Services")
      },
      {
         image: "/home/info/i4.png",
         heading: i18n.t("1200+"),
         description: i18n.t("App Installs Across Devices")
      }
   ];


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-[97px]  bg-[#F8FCFF]">
         <div className="aid-container">
            <div className="grid lg:grid-cols-4 grid-cols-2 xl:gap-[124px] lg:gap-10 md:gap-6 gap-3">
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
                        <h4 className="description1 mt-2 md:mt-3 text-[#42526B] text-center sm:whitespace-pre">{Item.description}</h4>
                     </div>
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default Information
