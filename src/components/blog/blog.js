'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"

const Blog = () => {
   const data = [
      {
         image: "/home/blog/b1.png",
         heading: "When to See a General Physician: Early Signs You Shouldn’t Ignore",
         description: "Discover the key symptoms that signal when it’s time to consult a general physician, and how early intervention can make all the difference.",
         time: 2
      },
      {
         image: "/home/blog/b2.png",
         heading: "How Fast Ambulance Access Can Save Lives",
         description: "Explore the critical role of ambulance response time in emergencies and how technology is helping reduce delays across Bangladesh.",
         time: 3
      },
      {
         image: "/home/blog/b3.png",
         heading: "The Future of Pharmacy: Online Medicine Delivery in Bangladesh",
         description: "Learn how digital pharmacy services are making healthcare more accessible and what you should know before ordering medicines online.",
         time: 6
      },
   ];


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-[#212121] heading1">Browse updated blogs</h1>
               <p className="text-[#061C3D] description2 mt-3 lg:mt-4 max-w-[834px]">Learn about regular health awareness and care from our blog posts. Written by doctors and experts, these articles will help you and your family stay healthy</p>
            </div>
            <Link href={"/service"} className="flex items-center gap-1.5">
               <p className="text-[#1087EF] description2"> More Blog</p>
               <FaArrowRightLong className="description1 text-[#1087EF]" />
            </Link>
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 lg:gap-5 md:gap-4 gap-2">
               {
                  data.map((Item, index) => (
                     <div key={index} className="border border-[#3056D321] bg-[#FFFFFF] rounded-lg lg:rounded-[14px] mx-auto">
                        <Image
                           src={Item.image}
                           width={1000}
                           height={1000}
                           className="w-[360px] h-[264] object-fill mx-auto rounded-t-lg lg:rounded-t-[14px]"
                           alt="Service image"
                        />
                        <div className="p-4 xl:p-5">
                           <h4 className="description2 text-[#061C3D]">{Item.heading}</h4>
                           <div className="py-4 xl:py-5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <div className="bg-[#BBEFFF] rounded-full w-6 h-6 overflow-hidden">
                                    <Image
                                       src="/home/blog/fav.png"
                                       width={100}
                                       height={100}
                                       alt="Logo"
                                       className="object-fill"
                                    />

                                 </div>
                                 <p className="description2 text-[#061C3D]">AidFast</p>
                              </div>
                              <p className="text-xs text-[#717070]">{Item.time} Hours ago</p>
                           </div>
                           <h4 className="text-xs text-[#42526B] text-justify">{Item.description}</h4>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </section>
   )
}

export default Blog
