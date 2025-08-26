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
                     <div className="py-4 md:py-10 lg:py-[55px] aid-container mx-auto flex items justify-between gap-3 md:gap-2 lg:gap-4 xl:gap-10 items-center overflow-hidden">
                        <div className=''>
                           <span className="hero-description text-[#000000] font-semibold bg-[#B1CFEA2E] px-2 py-1 md:px-4 md:py-2.4 rounded-md inline-block">
                              {i18n.t(item.heading)}
                           </span>

                           <h1 className="hero-heading text-[#212121] mt-3 md:mt-5 lg:mt-6 capitalize">
                              {i18n.t(item.title)}
                           </h1>
                           <div className="mt-3 md:mt-5 lg:mt-10 xl:mt-12 flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
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
                                 className="hover:scale-105 bg-[#1087EF] px-3 md:px-6 py-1 md:py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                 <FiDownload className="text-white hero-description" />
                                 <p className="hero-description text-white">{i18n.t("Download Now")}</p>
                              </Link>
                           </div>
                        </div>

                        <div className="relative flex justify-end items-center">
                           <Image
                              src={item.image}
                              width={1000}
                              height={1000}
                              alt="mobile"
                              className="w-[64px] h-[137px] md:w-[143px] md:h-[300px] lg:w-[172px] lg:h-[361px] object-fill"
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
