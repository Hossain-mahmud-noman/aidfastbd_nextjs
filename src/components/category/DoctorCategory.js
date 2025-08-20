'use client';
import React, { useEffect, useRef, useState } from 'react';
import { base_endpoint } from '../../utils/constants';
import DoctorCard from '../DoctorCard';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Navigation, Mousewheel } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { useI18n } from '../../context/i18n';

const DoctorCategory = ({ specialityData = [] }) => {
   const [spData, setSpData] = useState([]);
   const [spActive, setSpActive] = useState(null);
   const [spLoading, setSpLoading] = useState(false);
   const i18n = useI18n()
   const swiperRef = useRef(null);

   useEffect(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.update();
      }
   }, []);

   const Next = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.slideNext();
      }
   };

   const Previous = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.slidePrev();
      }
   };

   return (
      <>
         <div className='mb-1'>
            <h3 className="text-lg ml-3 mb-2">{i18n.t("Speciality")}</h3>
            <div className="w-full">
               <div className="w-full">
                  <div className="w-full relative">
                     <button
                        onClick={Previous}
                        className="absolute bottom-1/2 left-0 z-50 transition-all duration-300 border bg-primary border-[#D7D7D7] text-white flex items-center justify-center w-10 h-10 rounded-full shadow-md"
                     >
                        <GoArrowLeft size={20} />
                     </button>

                     <Swiper
                        keyboard={{ enabled: true }}
                        slidesPerView="auto"
                        spaceBetween={12}
                        loop={true}
                        mousewheel={true}
                        modules={[Keyboard, Navigation, Mousewheel]}
                        ref={swiperRef}
                        className="w-full !py-1"
                     >
                        {specialityData.map((speciality, index) => (
                           <SwiperSlide key={index} className="!w-auto">
                              <div
                                 onClick={async () => {
                                    try {
                                       setSpLoading(true);
                                       let Specialty = "";
                                       if (speciality) {
                                          Specialty = `&Specialty=${speciality.text}`;
                                       }
                                       let location = "";
                                       let lat = localStorage.getItem("lat");
                                       let lon = localStorage.getItem("lon");
                                       if (lat && lon) {
                                          location = `&lat=${lat}&lon=${lon}`;
                                       }
                                       const url = `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=40${Specialty}${location}`;
                                       const response = await fetch(url);
                                       if (response.status === 200) {
                                          const data = await response.json();
                                          setSpData(data['data']);
                                       } else {
                                          setSpData([]);
                                       }
                                    } catch (err) {
                                       setSpData([]);
                                    } finally {
                                       setSpLoading(false);
                                    }

                                    setSpActive(index === spActive ? null : index);
                                 }}
                                 className={`cursor-pointer flex-shrink-0 w-[150px] h-[220px] bg-white shadow-custom-light rounded-lg p-1 ${index === spActive ? "border-green-500 border-t-4 border-2" : ""
                                    }`}
                              >
                                 <Image
                                    width={150}
                                    height={150}
                                    src={speciality.imageUrl}
                                    alt={speciality.text}
                                    className="w-full object-cover rounded-t-lg"
                                 />
                                 <div className="mt-4 text-center">
                                    {/* language */}
                                    <p className="text-sm font-semibold">
                                       {
                                          i18n?.language == 'bn' ? speciality.textBn : speciality.text
                                       }
                                       </p>
                                 </div>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>

                     <button
                        onClick={Next}
                        className="absolute bottom-1/2 right-0 z-50 transition-all duration-300 border bg-primary border-[#D7D7D7] text-white flex items-center justify-center w-10 h-10 rounded-full shadow-md"
                     >
                        <GoArrowRight size={20} />
                     </button>
                  </div>
               </div>
            </div>

            {spActive !== null && spLoading === false && spData.length === 0 ? (
               <div className='h-[180px] w-full flex items-center justify-center text-2xl'>
                  {i18n.t("No data Speciality available")}
               </div>
            ) : (
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 xl:mt-12">
                  {spActive !== null && spData.map((d, index) => (
                     <DoctorCard key={`Speciality_${index}`} doctor={d} />
                  ))}
               </div>
            )}
         </div>
         {spActive !== null && <h3 className="text-lg ml-3 mb-2">{i18n.t("Nearest Doctors")}</h3>}
      </>
   );
};

export default DoctorCategory;
