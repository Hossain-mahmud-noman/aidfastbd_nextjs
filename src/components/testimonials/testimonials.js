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
         comment: "AidFastBD helped me book a doctor within minutes. The service is quick and efficient!",
         rate: 5
      },
      {
        image: "/home/testimonials/t2.jpg",
         user: "Md. Riaz Uddin",
         comment: "I needed an ambulance late at night and got one in just 15 minutes. Great platform!",
         rate: 5
      },
      {
         image: "/home/testimonials/t3.jpg",
         user: "Jannatul Ferdous",
         comment: "The online consultation was smooth, and the doctor was very kind and professional.",
         rate: 4
      },
      {
         image: "/home/testimonials/t4.jpg",
         user: "Sajjad Hossain",
         comment: "Very helpful for elderly people. My parents could consult with doctors from home.",
         rate: 5
      },
      {
         image: "/home/testimonials/t5.jpg",
         user: "Fatema Akter",
         comment: "Ordered medicine through the app — delivery was fast and affordable. Highly recommended.",
         rate: 4
      },
      {
         image: "/home/testimonials/t6.jpg",
         user: "Nurul Islam",
         comment: "A lifesaver during emergencies. Booking services online has never been easier.",
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
                           <div className="w-full mx-auto ">
                              <Image
                                 src={item.image}
                                 width={100}
                                 height={100}
                                 alt={item.user}
                                 className="w-[68px] h-[68px] rounded-full object-fill mx-auto"
                              />
                              <p className="mt-2 description2 text-white text-center">{item.user}</p>
                              <p className="mt-3 lg:mt-4 xl:mt-[18px] description1 text-white text-center">{item.comment}</p>
                              <Rate count={item.rate} defaultValue={item.rate} className="text-[#FFA500] text-center flex items-center justify-center" />
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
