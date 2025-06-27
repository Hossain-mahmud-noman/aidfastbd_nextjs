'use client'
import Image from 'next/image'
const Hero = () => {
   return (
      <section className="aid-container bg-[#EEF8FF] lg:rounded-[20px] rounded-[10px]">
         <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Left Side Content */}
            <div className='xl:pl-10 lg:pl-8 pl-5'>
               <span className="text-sm md:text-base text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full inline-block mb-4">
                  AidFast-এ আপনাকে স্বাগতম
               </span>

               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
                  স্বাস্থ্যসেবা খুঁজে পাওয়া নিয়ে আর <span className="text-blue-600">দুশ্চিন্তা</span> নয়
               </h1>

               <p className="text-gray-600 mb-6 leading-relaxed">
                  আমরা আপনাকে সঠিক ডাক্তার, হাসপাতাল ও সেবাগুলো খুঁজে পেতে সহায়তা করি—আপনার ও আপনার পরিবারের জন্য।
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#1087EF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">
                     অ্যাপয়েন্টমেন্ট নিন →
                  </button>
                  <button className="text-[#1087EF] font-medium underline hover:text-blue-800 transition-all duration-300">
                     একটি কল নির্ধারণ করুন
                  </button>
               </div>

               <div className="flex items-center mt-6 gap-3">
                  <div className="flex -space-x-2">
                     <Image
                        src="/user1.jpg"
                        alt="User 1"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                     />
                     <Image
                        src="/user2.jpg"
                        alt="User 2"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                     />
                     <Image
                        src="/user3.jpg"
                        alt="User 3"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                     />
                  </div>
                  <p className="text-sm text-gray-600">
                     ১২০০+ রোগীর বিশ্বাসে রেটিং ৫/৫
                  </p>
               </div>
            </div>

            {/* Right Side Image */}
            <div className=" -mr-7 relative flex-1 bg-[url('/home/frame.png')] bg-no-repeat bg-center bg-contain">
               <Image
                  src="/home/d.png"
                  alt="Doctor"
                  width={1000}
                  height={1000}
                  className="w-[343px] h-[400px] mx-auto object-cover"
               />

               <div className="absolute top-6 left-6 bg-white shadow-lg rounded-xl px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-gray-800">২৪+</p>
                  <p className="text-xs text-gray-500">ঘন্টা অনলাইন সাপোর্ট</p>
               </div>

               <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-xl px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-gray-800">৩০+</p>
                  <p className="text-xs text-gray-500">অভিজ্ঞ ডাক্তার</p>
               </div>
            </div>

         </div>
      </section>
   )
}

export default Hero
