'use client'

import Image from "next/image"
import { useI18n } from "../../context/i18n"
import { FiDownload } from "react-icons/fi"
import { event } from "../../lib/gtag";

const MobileApp = () => {
   const i18n = useI18n();

   const handleClick = (label, url) => {
      event({
         action: 'app_download_click',
         category: 'App Download',
         label: label,
      });

      // Delay to let gtag send before navigation
      setTimeout(() => {
         window.open(url, "_blank");
      }, 150); // 150ms is usually enough
   };

   const playStoreUrl = "https://play.google.com/store/apps/details?id=com.aidfastbd.app";

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between flex-col md:flex-row xl:gap-[105px] lg:gap-14 md:gap-8 gap-5">
            <div className="w-full">
               <h1 className="heading1 text-[#212B36] !leading-[60px]">
                  {i18n.t("AidFast app — free to download")}
               </h1>
               <p className="description2 text[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">
                  {i18n.t("Doctor, ambulance, medicine, hospital—all in one app. AidFastBD makes healthcare faster and easier")}
               </p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center flex-col md:flex-row gap-3 md:gap-4 xl:gap-5">

                  {/* Google Play Image Link */}
                  <button
                     onClick={() => handleClick("Google Play Image", playStoreUrl)}
                     className="relative w-[150px] h-[50px]"
                  >
                     <Image
                        src="/home/service/google.png"
                        fill
                        alt="Google Play"
                        className="object-contain"
                     />
                  </button>

                  {/* Download Button */}
                  <button
                     onClick={() => handleClick("Google Play Button", playStoreUrl)}
                     className="hover:scale-105 bg-[#1087EF] px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                     <FiDownload className="text-white description1" />
                     <p className="description2 text-white">{i18n.t("Download Now")}</p>
                  </button>
               </div>
            </div>

            <Image
               src="/home/service/mobile.jpg"
               width={1000}
               height={1000}
               alt="mobile"
               className="w-[220px] md:w-[233px] xl:h-[488px] lg:h-[380px] h-[400px] object-fill"
            />
         </div>
      </section>
   );
};

export default MobileApp;
