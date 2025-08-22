'use client'

import Image from "next/image"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Keyboard, Autoplay, Pagination } from "swiper/modules"
import { GoArrowRight, GoArrowLeft } from "react-icons/go"
import { useI18n } from "../../../context/i18n"
import { FaArrowRightLong } from "react-icons/fa6"

const Consultation = () => {
   const i18n = useI18n()
   const [swiperInstance, setSwiperInstance] = useState(null)
   const paginationRef = useRef(null)

   const data = [
      {
         image: "/home/consultation/d1.png",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/d1.png",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/d1.png",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/d1.png",
         heading: "Live Video Consultation",
         description: {
            before: "Get a doctor’s consultation now at just",
            oldPrice: "200 Taka",
            newPrice: "100 Taka!!"
         }
      },
      {
         image: "/home/consultation/d1.png",
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
         <div className="aid-container py-6 md:py-7 lg:py-8 xl:py-10 w-full">

            {/* Prev Button */}
            <button
               onClick={() => swiperInstance?.slidePrev()}
               className="swipper-button-left z-50 absolute left-3 top-1/2 -translate-y-1/2"
            >
               <GoArrowLeft size={24} />
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
                        <div className="w-full flex items-center gap-6 md:gap-8 lg:gap-10">
                           <div>
                              <Image
                                 src={item.image}
                                 width={500}
                                 height={500}
                                 alt="consultation"
                                 className="w-full md:w-[277px] h-[184px] md:h-[234px] object-fill md:pl-4 lg:pl-10 xl:pl-12 pt-3 lg:pt-4"
                              />
                           </div>
                           <div className="py-5 md:py-0">
                              <p className="description1 text-[#474747] ">{i18n.t(item.heading)}</p>
                              <h3 className="mt-3 heading4 text-[#000000] ">
                                 {i18n.t(item.description.before)}
                                 <del className="text-red-500 ml-1">{i18n.t(item.description.oldPrice)}</del>,
                                 <span className="text-green-600 font-semibold">{i18n.t(item.description.newPrice)}</span>
                              </h3>

                              <div className="mt-5 md:mt-6 lg:mt-7 xl:mt-[30px]">
                                 <button
                                    type="button"
                                    className="bg-[#1087EF] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4  rounded-full description1 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
                                 >
                                    <p className="description2 text-white">{i18n.t("Begin Live Consultation")}</p>
                                    <FaArrowRightLong className="text-white description2" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>

            {/* Next Button */}
            <button
               onClick={() => swiperInstance?.slideNext()}
               className="swipper-button-right z-50 absolute right-3 top-1/2 -translate-y-1/2"
            >
               <GoArrowRight size={24} />
            </button>

            <div ref={paginationRef} className="custom-pagination py-4 flex justify-center"></div>
         </div>
      </section>
   )
}

export default Consultation
