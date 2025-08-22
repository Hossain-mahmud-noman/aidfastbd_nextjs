'use client'

import { useI18n } from '../../context/i18n.js'
import Image from 'next/image'
import Link from 'next/link'
import { FiDownload } from 'react-icons/fi'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Pagination, Autoplay } from "swiper/modules";
import { useRef } from 'react'
const Hero = () => {
   const paginationRef = useRef(null);
   const i18n = useI18n();
   const data = [
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
      {
         heading: "Welcome to AidFast",
         title: "All-in-One Healthcare – AidFast",
         image: "/home/service/app.png"
      },
   ]

   return (
      <div className='hero'>
         <div className="bg-[#F2F4F8] w-full ">
            <Swiper
               keyboard={{ enabled: true }}
               breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 1, spaceBetween: 10 },
                  768: { slidesPerView: 1, spaceBetween: 16 },
                  1024: { slidesPerView: 1, spaceBetween: 20 },
               }}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
               }}
               speed={1000}
               loop={true}
               pagination={{
                  clickable: true,
                  el: paginationRef.current,
               }}
               onBeforeInit={(swiper) => {
                  swiper.params.pagination.el = paginationRef.current;
               }}
               modules={[Keyboard, Autoplay, Pagination]}
               className="w-full"
            >
               {data.map((item, index) => (
                  <SwiperSlide key={index} >
                     <div className="py-8 md:py-10 lg:py-[55px] aid-container mx-auto flex flex-col md:flex-row items justify-between gap-8 md:gap-2 lg:gap-4 xl:gap-10 items-center overflow-hidden">
                        <div className='xl:pl-10 lg:pl-8 pl-5'>
                           <span className=" description2 text-[#000000] font-semibold bg-[#B1CFEA2E] px-3 py-1 rounded-md inline-block mb-4">
                              {i18n.t(item.heading)}
                           </span>

                           <h1 className="heading2 text-[#212121] mt-5 lg:mt-6 capitalize">
                              {i18n.t(item.title)}
                           </h1>
                           <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center flex-col md:flex-row gap-3 md:gap-4 xl:gap-5">

                              <Link
                                 href="https://play.google.com/store/apps/details?id=com.aidfastbd.app"
                                 className="relative w-[150px] h-[50px]"
                              >
                                 <Image
                                    src="/home/service/google.png"
                                    fill
                                    alt="Google Play"
                                    className="object-contain"
                                 />
                              </Link>

                              <Link
                                 href="https://play.google.com/store/apps/details?id=com.aidfastbd.app"
                                 className="hover:scale-105 bg-[#1087EF] px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                 <FiDownload className="text-white description1" />
                                 <p className="description2 text-white">{i18n.t("Download Now")}</p>
                              </Link>
                           </div>
                        </div>

                        <div className="relative flex justify-end items-center">
                           <Image
                              src={item.image}
                              width={1000}
                              height={1000}
                              alt="mobile"
                              className="w-[220px] md:w-[233px] xl:h-[488px] lg:h-[380px] h-[400px] object-fill"
                           />
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
            
         </div>
         <div ref={paginationRef} className="custom-pagination py-4 flex justify-center"></div>
      </div>
   )
}

export default Hero
