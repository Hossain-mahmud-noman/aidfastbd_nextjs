'use client'

import { useI18n } from '../../context/i18n.js'
import { Avatar } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { FaArrowRightLong } from 'react-icons/fa6'
import ContacTactModal from '../../utils/contactModal.js'
const Hero = () => {
   const router = useRouter();
   const i18n = useI18n();
   const [showModal, setShowModal] = useState(false);
   const handleOpen = () => setShowModal(true);
   const handleClose = () => setShowModal(false);
   const hamdleInput = () => {
      router.push(`/doctor?name=${searchTerm}`)
   }
   return (
      <section className="">
         <div className="bg-[#EEF8FF] rounded-[10px] xl:rounded-[20px] aid-container mx-auto flex flex-col md:flex-row items justify-between gap-8 md:gap-2 lg:gap-4 xl:gap-10 items-center overflow-hidden">
            {/* Left Side Content */}
            <div className='xl:pl-10 lg:pl-8 pl-5'>
               <span className="mt-5 md:mt-5 description2 text-[#1087EF] font-semibold bg-[#7AC1FF2E] px-3 py-1 rounded-md inline-block mb-4">
                  {i18n.t("Welcome to AidFast")}
               </span>

               <h1 className="heading2 text-[#212121] mb-4 capitalize">
                  {/* No more <span className="text-[#1087EF]">worries</span>  about finding healthcare */}
                  {i18n.t("No more worrying about finding healthcare")}
               </h1>

               <p className="text-gray-600 mb-6 leading-relaxed">
                  {i18n.t("We help you find the right doctors, hospitals, and services—for you and your family")}
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/doctor" className="hover:scale-105 bg-[#1087EF] px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                     <p className="description2 text-white">{i18n.t("Book Appointment")}</p>
                     <FaArrowRightLong className="text-white description1" />
                  </Link>
                  <button onClick={handleOpen}
                     className="hover:scale-105 group bg-[#EEF8FF] border-2 border-primary px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                     <BiSolidPhoneCall className="description2 text-primary group-hover:!text-white transition-all duration-300" />
                     <p className="description2 text-primary group-hover:text-white transition-all duration-300">{i18n.t("Call Now")}</p>
                  </button>
               </div>

               <div className="flex items-center mt-6 gap-3">
                  <Avatar.Group>
                     <Avatar size={40} src="/home/hero/d1.png" />
                     <Avatar size={40} src="/home/hero/d2.png" />
                     <Avatar size={40} src="/home/hero/d3.png" />
                     <Avatar size={40} src="/home/hero/d4.png" />
                  </Avatar.Group>
                  <p className="text-sm text-gray-600">
                     {i18n.t("Trusted by 4500+ patients with 5/5 rating")}
                  </p>
               </div>
            </div>

            {/* Right Side Image aligned to far right */}
            <div className="relative flex justify-end items-center h-[300px] md:h-[350px] lg:h-[400px] xl:h-[421px] w-full lg:w-[412px] overflow-hidden">
               <div className="relative h-full w-full bg-[url('/home/frame.png')] bg-no-repeat bg-center bg-cover rounded-[10px] xl:rounded-[20px]">
                  <div className="absolute bottom-0 right-0 w-[300px] h-[250px] md:h-[300px] lg:h-[330px] overflow-hidden">
                     <Image
                        src="/home/d.png"
                        alt="Doctor"
                        width={1000}
                        height={1000}
                        className="w-[300px] h-[330px] object-fill"
                     />
                  </div>
                  <div className="absolute top-4 right-4 bg-white shadow-[12px] rounded-xl px-2 py-2 text-center">
                     <p className="description2 text-[#252525]">{i18n.t("24+")}</p>
                     <p className="text-[10px] text-[#555555]">{i18n.t("24/7 Emergency Service")}</p>
                  </div>

                  <div className="absolute bottom-1/4 lg:bottom-1/2 left-4 bg-white shadow-md rounded-xl px-2 py-2 text-center">
                     <div className='flex items-center justify-center'>
                        <div>
                           <Avatar.Group>
                              <Avatar src="/home/hero/d1.png" />
                              <Avatar src="/home/hero/d2.png" />
                              <Avatar src="/home/hero/d3.png" />
                           </Avatar.Group>
                        </div>
                        <div>
                           <p className="description2 text-[#252525] text-left">{i18n.t("200+")}</p>
                           <p className="text-[10px] text-[#555555]">{i18n.t("Experienced Doctors")}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <div className="relative w-full aid-container mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">
            <div className="relative w-full">
               <button
                  className="absolute left-5 top-1/2 transform -translate-y-1/2"
                  aria-label="Search Icon"
               >
                  <IoSearch className="h-5 w-5 text-primary" />
               </button>

               <input
                  type="search"
                  placeholder={("Search here")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-black border rounded-[10px] py-3 pl-12 pr-[110px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
               />

               <button
                  className="text-white text-base font-semibold rounded-r-[10px] py-3 px-6 absolute right-0 top-1/2 transform -translate-y-1/2 max-w-[104px] bg-primary"
                  aria-label="Search"
                  onClick={hamdleInput}
               >
                  {("Search")}
               </button>
            </div>
         </div> */}
          <ContacTactModal
            contact="+8801338988734"
            open={showModal}
            onClose={handleClose}
         />
      </section >
   )
}

export default Hero
