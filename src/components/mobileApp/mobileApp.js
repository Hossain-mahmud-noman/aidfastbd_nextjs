'use client'

import Image from "next/image"
import Link from "next/link"
import { BiSolidPhoneCall } from "react-icons/bi"
import { FaArrowRightLong } from "react-icons/fa6"

const MobileApp = () => {

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between flex-col md:flex-row xl:gap-[105px] lg:gap-14 md:gap-8 gap-5">
            <div className="w-full">
               <h1 className="heading1 text-[#212B36]">Get Ambulance Service at Home</h1>
               <p className="description2 text[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">Get licensed ambulance service delivered to your doorstep within Dhaka in the fastest time, with discounts. Book online now</p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                  <Link href="tel: 01980445424" className="bg-[#1087EF]  px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <BiSolidPhoneCall className="text-white description2" />
                     <p className="description2 text-white"> Book Ambulence</p>
                  </Link>
                  <Link href="tel: 01980445424" className="bg-[#1087EF]  px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <p className="description2 text-white">Explore More</p>
                     <FaArrowRightLong className="text-white description1" />
                  </Link>
               </div>
            </div>
            <Image
               src="/home/service/ambulence.png"
               width={1000}
               height={1000}
               alt="Abmulence"
               className="w-full md:w-[233px] xl:h-[488px] lg:h-[380px] h-[280px] object-fill"
            />
         </div>
      </section>
   )
}

export default MobileApp
