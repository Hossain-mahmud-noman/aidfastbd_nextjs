'use client'

import Image from "next/image"
import { useI18n } from "../../../context/i18n"
import { FiDownload } from "react-icons/fi"
import { event } from "../../../lib/gtag";
import Link from "next/link";

const MobileApp = () => {
   const i18n = useI18n();

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between  xl:gap-[105px] lg:gap-14 md:gap-8 gap-5">
            <div className="w-full">
               <h1 className="mobile-heading text-[#212B36] lg:!leading-[60px]">
                  {i18n.t("AidFast app — free to download")}
               </h1>
               <p className="hero-description text-[#061C3D] mt-2 md:mt-3 lg:mt-6 xl:mt-[30px]">
                  {i18n.t("Doctor, ambulance, medicine, hospital—all in one app. AidFastBD makes healthcare faster and easier")}
               </p>
               <p className="mobile-description text-[#061C3D] !font-medium mt-2 md:mt-4 lg:mt-6">
                  {i18n.t("Seamless healthcare solutions, now at your fingertips.")}
               </p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-2 md:gap-3 xl:gap-5">

                  <Link
                     href="https://play.google.com/store/apps/details?id=com.aidfastbd.app"
                  >
                     <Image
                        src="/home/service/google.png"
                        width={500}
                        height={500}
                        alt="Google Play"
                        className="w-[76px] h-[30px] lg:w-[150px] xl:w-[160px] md:h-[56px] md:w-[140px] object-contain"
                     />
                  </Link>


                  <Link
                     href="https://play.google.com/store/apps/details?id=com.aidfastbd.app"
                     className="hover:scale-105 bg-[#1087EF] px-3 md:px-6 py-1 md:py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-1 md:gap-2"
                  >
                     <FiDownload className="text-white service-button" />
                     <p className="service-button text-white">{i18n.t("Download Now")}</p>
                  </Link>
               </div>
            </div>

            <Image
               src="/home/service/app.png"
               width={1000}
               height={1000}
               alt="mobile"
               className="w-[64px] h-[137px] md:w-[143px] md:h-[300px] lg:w-[172px] lg:h-[361px] object-fill"
            />
         </div>
      </section>
   );
};

export default MobileApp;
