'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"


const Information = () => {
   const data = [
      {
         "image": "/services/doctor.png",
         "heading": "General",
         "description": "Consult experienced "
      },
      {
         "image": "/services/ambulance.png",
         "heading": "Ambulance",
         "description": "Get emergency "
      },
      {
         "image": "/services/medicine.png",
         "heading": "Pharmacy",
         "description": "Order medicines "
      },
      {
         "image": "/services/lab-test.png",
         "heading": "Lab ",
         "description": "Book lab "
      },
   ]

   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-[97px]  bg-[#F8FCFF]">
         <div className="aid-container">
            <div className="grid lg:grid-cols-4 grid-cols-2 xl:gap-[124px] lg:gap-10 md:gap-6 gap-3">
               {
                  data.map((Item, index) => (
                     <div key={index} className="mx-auto xl:py-[46px] lg:py-9 md:py-6 py-4">
                        <Image
                           src={Item.image}
                           width={100}
                           height={100}
                           className="w-12 h-12 object-fill mx-auto"
                           alt="Service image"
                        />
                        <h4 className="heading3 mt-4 md:mt-5 xl:mt-6 text-[#061C3D] text-center">{Item.heading}</h4>
                        <h4 className="description1 mt-2 md:mt-3 text-[#42526B] text-center">{Item.description}</h4>
                     </div>
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default Information
