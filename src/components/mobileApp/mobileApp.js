'use client'

import Image from "next/image"
import Link from "next/link"

const MobileApp = () => {

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between flex-col md:flex-row xl:gap-[105px] lg:gap-14 md:gap-8 gap-5">
            <div className="w-full">
               <h1 className="heading1 text-[#212B36]">Get Ambulance Service at Home</h1>
               <p className="description2 text[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">{"Searching for doctors, booking appointments, calling an ambulance, ordering medicine, or viewing reports—everything is now possible through a single app. No more long queues at hospitals. With AidFastBD, healthcare becomes faster, easier, and more reliable"}</p>
               <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-5">
                  <Link href="/www.google.com" className="relative w-[150px] h-[50px]">
                     <Image
                        src="/home/service/google.png"
                        fill
                        alt="Google Play"
                        className="object-contain"
                     />
                  </Link>
                  <Link href="/www.google.com" className="relative w-[150px] h-[50px]">
                     <Image
                        src="/home/service/apple.png"
                        fill
                        alt="App Store"
                        className="object-contain"
                     />
                  </Link>
               </div>

            </div>
            <Image
               src="/home/service/mobile.jpg"
               width={1000}
               height={1000}
               alt="mobile"
               className="w-full md:w-[233px] xl:h-[488px] lg:h-[380px] h-[280px] object-fill"
            />
         </div>
      </section>
   )
}

export default MobileApp
