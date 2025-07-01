'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
const AmbulenceService = () => {
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
   const data = [
      {
         image: "/home/d1.png",
      },
      {
         image: "/home/d2.png"
      },
      {
         image: "/home/d3.png",
      },
   ];
   return (
      <section className="mt-8 md:mt-16 lg:mt-20 xl:mt-[109px] aid-container">
         <div className="flex items-center flex-col md:flex-row xl:gap-[72px] lg:gap-12 gap-5">
            <div className="w-full md:w-[40%] expert"
               style={{
                  backgroundImage: `url('/home/bg.png')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundBlendMode: 'overlay',
                  opacity: 1,
               }}
            >
               <div className="w-full">
                  <Swiper
                     keyboard={{ enabled: true }}
                     pagination={{ clickable: true }}
                     breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        768: { slidesPerView: 1, spaceBetween: 16 },
                        1024: { slidesPerView: 1, spaceBetween: 20 },
                     }}
                     loop={true}
                     mousewheel={true}
                     modules={[Keyboard, Navigation, Pagination]}
                     ref={swiperRef}
                     className="w-full"
                  >
                     {data.map((item, index) => (
                        <SwiperSlide key={index} >
                           <div className="mx-auto flex items-center justify-center">
                              <Image
                                 src={item.image}
                                 width={1000}
                                 height={1000}
                                 alt="Abmulence"
                                 className="w-[261px] lg:h-[330px] md:h-[280px]  object-fill rounded-b-full"
                              />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>

               <div className="max-w-[230px] mx-auto relative flex items-center justify-center -mt-8">
                  <button
                     onClick={Previous}
                     className={`absolute top-1/2 left-1 z-50 transition-all duration-300 text-primary border hover:border-[#1087EF] hover:bg-primary border-[#D7D7D7] hover:text-white flex items-center justify-center w-10 h-10 rounded-full shadow-md`}
                  >
                     <GoArrowLeft size={20} />
                  </button>
                  <button
                     onClick={Next}
                     className={`absolute top-1/2 right-1 z-50 transition-all duration-300 text-primary border hover:border-[#1087EF] hover:bg-primary border-[#D7D7D7] hover:text-white flex items-center justify-center w-10 h-10 rounded-full shadow-md`}
                  >
                     <GoArrowRight size={20} />
                  </button>
               </div>


            </div>
            <div className="w-full md:w-[60%] mt-10 md:mt-0">
               <div className="flex items-center gap-2">
                  <div className="bg-primary w-20 h-1 -mt-1"></div>
                  <h1 className="heading3 text-primary">About AidFastBD</h1>
               </div>
               <h1 className="heading1 mt-4 xl:mt-[22px] text-[#212B36]">We provide you with your desired service</h1>
               <p className="description1 text-[#5F5F5F] mt-4 xl:mt-[22px]">We offer patients quick access to doctor appointments, ambulance services, pharmacy, and diagnostic test bookings. Our mission is to make healthcare in Bangladesh more accessible to everyone. Your health is our priority — AidFastBD is always ready to serve</p>
               <div className="">
                  <div className="flex items-center gap-3 mt-4 xl:mt-[22px]">
                     <FaCheckCircle className="text-primary description2" />
                     <p className="text-[#000A2D] description1">Reduced anxiety</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 lg:mt-[18px]">
                     <FaCheckCircle className="text-primary description2" />
                     <p className="text-[#000A2D] description1">Better stress control</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 lg:mt-[16px]">
                     <FaCheckCircle className="text-primary description2" />
                     <p className="text-[#000A2D] description1">Better mental control</p>
                  </div>
               </div>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12">
                  <button href="tel: 01980445424" className="bg-[#1087EF] px-4 md:px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <p className="description2 text-white whitespace-pre">Explore More</p>
                     <FaArrowRightLong className="text-white description2" />
                  </button>

               </div>
            </div>
         </div>
      </section>
   )
}

export default AmbulenceService
