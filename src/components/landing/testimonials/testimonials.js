'use client'

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { Rate } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
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
         image: "/home/testimonials/user.jpg",
         user: "রেহানুল ইসলাম",
         location: "সরাইল, ব্রাহ্মণবাড়িয়া",
         identity: "ব্যবসায়ী",
         comment: "AidFast অ্যাপটা হাতে পেয়েই আমি প্রথমে আমার এলাকার ডাক্তার খুঁজে বের করলাম। নাম, সিরিয়াল টাইম, ফোন নাম্বার—সব কিছু এক জায়গায়! এরকম সহজ একটা অ্যাপ আগে পাইনি। গ্রামের মানুষজনের জন্য এটা সত্যিই দরকার ছিল। খুব কাজের অ্যাপ।",
         rate: 5
      },
      {
         image: "/home/testimonials/user.jpg",
         user: "ডা. শবনম রহমান",
         location: "মিরপুর,ঢাকা",
         identity: "MBBS, FCPS (Gynecology)",
         comment: "আমার চেম্বার AidFast প্ল্যাটফর্মে যুক্ত হওয়ার পর রোগীরা আগেই সিরিয়াল নিয়ে আসে। এতে আমার সময় বাঁচে, রোগীরাও দিকবিদিক না ঘুরে সহজে আমার কাছে পৌঁছাতে পারে। ডিজিটাল সেবা বলতে আমরা যেটা বুঝি, AidFast সেটাই করছে।",
         rate: 5
      },
      {
         image: "/home/testimonials/user.jpg",
         user: "সাদিক হাসান",
         location: "আশুগঞ্জ,ঢাকা",
         identity: "Diagnostic Center Owner",
         comment: "AidFast-এ রেজিস্ট্রেশন করার পর আমাদের ডায়াগনস্টিক সেন্টারে কল ও রোগী বেড়েছে। অ্যাপ ও ওয়েবসাইটে ইনফো থাকায় মানুষজন আমাদের খুঁজে পায়। এটা শুধু একটি অ্যাপ না, বরং একটি স্মার্ট মার্কেটিং সল্যুশন।",
         rate: 5
      },
      {
         image: "/home/testimonials/user.jpg",
         user: "মাহফুজা বেগম",
         location: "কসবা,ঢাকা",
         identity: "গৃহিণী",
         comment: "আমার ছেলে হঠাৎ অসুস্থ হলে AidFast দিয়ে কাছের হাসপাতালের নাম ও নম্বর পেয়ে যাই। এমনকি কাছাকাছি এম্বুলেন্সও খুঁজে পাই। এত দ্রুত হেল্প পাবো ভাবিনি। এই অ্যাপটা মোবাইলে থাকা খুব দরকার।",
         rate: 5
      },
      {
         image: "/home/testimonials/l5.jpg",
         user: "জান্নাতুল ফেরদৌস",
         location: "নাসিরনগর,ব্রাহ্মণবাড়িয়া ",
         identity: "বিশ্ববিদ্যালয় শিক্ষার্থী",
         comment: "AidFast-এর ওয়েবসাইট আর অ্যাপ—দুটোই খুব ক্লিন ও ইউজার ফ্রেন্ডলি। হেলথ সার্ভিস খোঁজার জন্য আমি এখন আর ফেসবুকে পোস্ট দেই না। এই একটা অ্যাপই যথেষ্ট।",
         rate: 4
      },
      // {
      //    image: "/home/testimonials/t6.jpg",
      //    user: "Nurul Islam",
      //    comment: "This is what modern healthcare should look like. AidFastBD brings hospitals, doctors, and support to your fingertips.",
      //    rate: 5
      // },
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
                  autoplay={{
                     delay: 3000, 
                     // disableOnInteraction: false, 
                  }}
                  loop={true}
                  mousewheel={true}
                  modules={[Keyboard, Navigation, Autoplay]}
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
                              <p className="mt-2 description2 text-white text-center whitespace-pre">{item.user}  ({item.identity}) </p>
                              <p className="mt-3 description1 text-white text-center max-w-[731px] mx-4 flex items-center gap-2 justify-center">
                                 <FaMapMarkerAlt />
                                 <span>{item.location}</span>
                              </p>
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
