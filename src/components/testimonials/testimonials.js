'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Rate } from "antd";
const Testimonials = () => {
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
         image: "/home/testimonials/t1.jpg",
         user: "Halima Khatun",
         comment: "Thanks to AidFastBD, I was able to consult a qualified doctor without stepping out of my house. It’s truly a revolutionary service for busy people like me.",
         rate: 5
      },
      {
         image: "/home/testimonials/t2.jpg",
         user: "Md. Riaz Uddin",
         comment: "In an emergency, AidFastBD’s ambulance reached us faster than I expected. Their service is dependable and life-saving.",
         rate: 5
      },
      {
         image: "/home/testimonials/t3.jpg",
         user: "Jannatul Ferdous",
         comment: "From doctor appointments to lab tests, everything was seamless. I felt cared for every step of the way. Highly recommended!",
         rate: 5
      },
      {
         image: "/home/testimonials/t4.jpg",
         user: "Sajjad Hossain",
         comment: "AidFastBD has made healthcare simpler for my parents. They no longer have to wait in long queues — everything is just a few taps away.",
         rate: 5
      },
      {
         image: "/home/testimonials/t5.jpg",
         user: "Fatema Akter",
         comment: "I ordered medicines through the app, and they arrived on time with proper packaging. Safe, reliable, and stress-free!",
         rate: 4
      },
      {
         image: "/home/testimonials/t6.jpg",
         user: "Nurul Islam",
         comment: "This is what modern healthcare should look like. AidFastBD brings hospitals, doctors, and support to your fingertips.",
         rate: 5
      },
     
   ];


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 bg-[#1087EF] rouonded-[12px]">
         <div className="aid-container py-6 md:py-7 lg:py-8 xl:py-10 w-full">
            <div className="w-full relative">
               <button
                  onClick={Previous}
                  className={`absolute top-1/2 left-1 z-50 transition-all duration-300 text-white border hover:border-[#1087EF] hover:bg-white border-white hover:text-[#1087EF] flex items-center justify-center w-10 h-10 rounded-full shadow-md`}
               >
                  <GoArrowLeft size={20} />
               </button>
               <Swiper
                  keyboard={{ enabled: true }}
                  breakpoints={{
                     320: { slidesPerView: 1, spaceBetween: 10 },
                     640: { slidesPerView: 1, spaceBetween: 10 },
                     768: { slidesPerView: 1, spaceBetween: 16 },
                     1024: { slidesPerView: 1, spaceBetween: 20 },
                  }}
                  loop={true}
                  mousewheel={true}
                  modules={[Keyboard, Navigation, Mousewheel]}
                  ref={swiperRef}
                  className="w-full"
               >
                  {data.map((item, index) => (
                     <SwiperSlide key={index} >
                        <div className="max-w-4xl mx-auto flex items-center justify-center">
                           <div className="w-full mx-12">
                              <Image
                                 src={item.image}
                                 width={100}
                                 height={100}
                                 alt={item.user}
                                 className="w-[68px] h-[68px] rounded-full object-fill mx-auto"
                              />
                              <p className="mt-2 description2 text-white text-center">{item.user}</p>
                              <p className="mt-3 lg:mt-4 xl:mt-[18px] description1 text-white text-center max-w-[731px] mx-4">{item.comment}</p>
                              <Rate count={item.rate} defaultValue={item.rate} className="mt-4 lg:mt-5 text-[#FFA500] text-center flex items-center justify-center" />
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>

               <button
                  onClick={Next}
                  className={`absolute top-1/2 right-1 z-50 transition-all duration-300 text-white border hover:border-[#1087EF] hover:bg-white border-white hover:text-[#1087EF] flex items-center justify-center w-10 h-10 rounded-full shadow-md`}
               >
                  <GoArrowRight size={20} />
               </button>
            </div>

         </div>
      </section>
   )
}

export default Testimonials
