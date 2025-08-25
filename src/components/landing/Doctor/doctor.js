'use client'
0
import { FaArrowRightLong } from "react-icons/fa6";
import { useI18n } from "../../../context/i18n"
import { usePaginatedFetch } from '../../../utils/usePaginatedFetch ';
import DoctorCard2 from '../../DoctorCard2';
import Link from "next/link";

const Doctor = () => {
   const i18n = useI18n()
   const { data } = usePaginatedFetch(
      'https://api.aidfastbd.com/api/GeneralWeb/GetDoctorSearchList'
   );
   return (
      <div className="mt-8 md:mt-16 lg:mt-20 xl:mt-[109px]">
         <div className="aid-container">
            <h1 className="service-heading  text-center text-[#252525]">{i18n.t("Nearest Doctor")}</h1>
            <div className="hidden mt-7 md:mt-9 lg:mt-12 lg:grid grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2 lg:gap-3 xl:gap-4">
               {data.slice(0, 4).map((data, index) => (
                  <DoctorCard2 key={index} doctor={data} slug='page' />
               ))}
            </div>

            <div className="lg:hidden mt-7 md:mt-9 lg:mt-12 grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2 lg:gap-3 xl:gap-4">
               {data.slice(0, 3).map((data, index) => (
                  <DoctorCard2 key={index} doctor={data} slug='page' />
               ))}
            </div>
            <div className="mt-6 md:mt-8 lg:mt-10 flex justify-center">
               <Link href='/doctor' className="bg-[#1087EF] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-5  rounded-full description1 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                  <p className="service-button text-white">{i18n.t("See All Doctor")}</p>
                  <FaArrowRightLong className="text-white service-button" />
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Doctor