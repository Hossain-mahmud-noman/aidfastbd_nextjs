'use client'

import Image from "next/image"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Keyboard, Autoplay, Pagination } from "swiper/modules"
import { GoArrowRight, GoArrowLeft } from "react-icons/go"
import { useI18n } from "../../../context/i18n"
import { useRouter } from "next/navigation"

const Consultation = () => {
   const [swiperInstance, setSwiperInstance] = useState(null)
   const paginationRef = useRef(null)
   const router = useRouter()

   const data = [
      {
         image: "/home/consultation/b1.jpg",
         link: "/blood",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/b2.jpg",
         link: "/diagnostic",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/b3.jpg",
         link: "/doctor",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
   ];

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20  rouonded-[12px] relative max-w-[1320px] mx-auto hero">
         <div className="aid-container py-3 md:py-5 lg:py-8 xl:py-10 w-full">

            {/* Prev Button */}
            <button
               onClick={() => swiperInstance?.slidePrev()}
               className="swipper-button-left"
            >
               <GoArrowLeft className="text-sm md:text-base lg:text-lg xl:text-xl" />
            </button>

            <div className="w-full bg-[#E6F4FF] rounded-xl lg:rounded-[20px] relative">
               <Swiper
                  onSwiper={setSwiperInstance}
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
                     swiper.params.pagination.el = paginationRef.current
                  }}
                  modules={[Keyboard, Autoplay, Pagination]}
                  className="w-full"
               >
                  {data.map((item, index) => (
                     <SwiperSlide key={index}>
                        <div className="w-full">
                           <div
                              onClick={() => router.push(item.link)}
                           >
                              <Image
                                 src={item.image}
                                 width={2000}
                                 height={2000}
                                 alt="consultation"
                                 loading="lazy"
                                 className="rounded-xl lg:rounded-[20px] w-full h-[102px] md:h-[200px] lg:h-[260px] xl:h-[266px]"
                              />
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>

            {/* Next Button */}
            <button
               onClick={() => swiperInstance?.slideNext()}
               className="swipper-button-right"
            >
               <GoArrowRight className="text-sm md:text-base lg:text-lg xl:text-xl" />
            </button>

            <div ref={paginationRef} className="custom-pagination py-4 flex justify-center"></div>
         </div>
      </section>
   )
}

export default Consultation
