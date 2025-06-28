'use client'

import { Avatar } from 'antd'
import Image from 'next/image'

const Hero = () => {
   return (
      <section className="">
         <div className="bg-[#EEF8FF] rounded-[10px] xl:rounded-[20px] aid-container mx-auto flex flex-col lg:flex-row items justify-between gap-10 items-center overflow-hidden">
            {/* Left Side Content */}
            <div className='xl:pl-10 lg:pl-8 pl-5'>
               <span className="description2 text-[#1087EF] font-semibold bg-[#7AC1FF2E] px-3 py-1 rounded-md inline-block mb-4">
                  AidFast-এ আপনাকে স্বাগতম
               </span>

               <h1 className="heading2 text-[#212121] mb-4 ">
                  স্বাস্থ্যসেবা খুঁজে পাওয়া নিয়ে আর <span className="text-[#1087EF]">দুশ্চিন্তা</span> নয়
               </h1>

               <p className="text-gray-600 mb-6 leading-relaxed">
                  আমরা আপনাকে সঠিক ডাক্তার, হাসপাতাল ও সেবাগুলো খুঁজে পেতে সহায়তা করি—আপনার ও আপনার পরিবারের জন্য।
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#1087EF] text-white px-6 py-3 description2 hover:bg-blue-700 transition-all duration-300">
                     অ্যাপয়েন্টমেন্ট নিন →
                  </button>
                  <button className="text-[#1087EF] font-medium underline hover:text-blue-800 transition">
                     একটি কল নির্ধারণ করুন
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
                     ১২০০+ রোগীর বিশ্বাসে রেটিং ৫/৫
                  </p>
               </div>
            </div>

            {/* Right Side Image aligned to far right */}
            <div className="relative flex justify-end items-center h-[421px] w-[412px]">
               <div className="relative h-full w-full bg-[url('/home/frame.png')] bg-no-repeat bg-center bg-cover rounded-[10px] xl:rounded-[20px]">
                  {/* Doctor Image at bottom right */}
                  <div className="absolute bottom-0 right-0 w-[300px] h-[330px] overflow-hidden">
                     <Image
                        src="/home/d.png"
                        alt="Doctor"
                        width={1000}
                        height={1000}
                        className="w-[300px] h-[330px] object-fill"
                     />
                  </div>
                  <div className="absolute top-4 right-4 bg-white shadow-[12px] rounded-xl px-2 py-2 text-center">
                     <p className="description2 text-[#252525]">২৪+</p>
                     <p className="text-[10px] text-[#555555]">ঘন্টা জরুরি সার্ভিস</p>
                  </div>

                  <div className="absolute bottom-1/2 left-4 bg-white shadow-md rounded-xl px-2 py-2 text-center">
                     <div className='flex items-center justify-center'>
                        <div>
                           <Avatar.Group>
                              <Avatar src="/home/hero/d1.png" />
                              <Avatar src="/home/hero/d2.png" />
                              <Avatar src="/home/hero/d3.png" />

                           </Avatar.Group>
                        </div>
                        <div>
                           <p className="description2 text-[#252525] text-left">৩০+</p>
                           <p className="text-[10px] text-[#555555]">অভিজ্ঞ ডাক্তার</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>
   )
}

export default Hero
