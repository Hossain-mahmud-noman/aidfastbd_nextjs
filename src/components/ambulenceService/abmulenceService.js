'use client'

import Image from "next/image"
import Link from "next/link"
import { BiSolidPhoneCall } from "react-icons/bi"
import { FaArrowRightLong } from "react-icons/fa6"

const AmbulenceService = () => {

   return (
      <section className="mt-16 md:mt-24 lg:mt-28 xl:mt-[160px] aid-container">
         <div className="flex items-center flex-col md:flex-row xl:gap-[72px] lg:gap-12 gap-5">
            <Image
               src="/home/service/ambulence.png"
               width={1000}
               height={1000}
               alt="Abmulence"
               className="w-full md:w-[429px] xl:h-[303px] lg:h-[280px] h-[200px] object-fill"
            />
            <div className="w-full">
               <h1 className="heading1 text-[#212B36]">Get Ambulance Service at Home</h1>
               <p className="description2 text-[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">Get licensed ambulance service delivered to your doorstep within Dhaka in the fastest time, with discounts. Book online now</p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                  <Link href="tel: +8801738548662" target="_blank" className="bg-[#1087EF] px-4 md:px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                     <BiSolidPhoneCall className="text-white description2" />
                     <p className="description2 text-white whitespace-pre">Book Ambulence</p>
                  </Link>
                  <Link href="/ambulance" target="_blank" className="group bg-white border-2 border-primary px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                     <p className="description2 text-primary group-hover:text-white transition-all duration-300 whitespace-pre">Explore More</p>
                     <FaArrowRightLong className="description2 text-primary group-hover:text-white transition-all duration-300" />
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AmbulenceService
