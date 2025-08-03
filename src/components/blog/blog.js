'use client'

import Image from "next/image"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6"
import { useI18n } from "../../context/i18n"

const Blog = () => {
   const i18n = useI18n()
   const data = [
      {
         image: "/home/blog/b1.webp",
         heading: "কমিশন, ভুয়া টেস্ট ও দালাল থেকে বাঁচার উপায়: সচেতন থাকুন, নিজের সিদ্ধান্ত নিজে নিন, AidFast এর সাথে থাকুন, নিজেকে বাচান",
         description: "স্বাস্থ্যসেবায় দালাল ও প্রতারণাবাংলাদেশের অনেক জেলা শহর ও উপজেলায় এখনো রোগীরা চিকিৎসা নিতে গিয়ে দালাল ও অসাধু চক্রের হাতে পড়ে ভোগে থাকেন....",
         time: 2
      },
      {
         image: "/home/blog/b2.webp",
         heading: "ডেঙ্গু বাড়ছে, সচেতনতা কম! জরুরি সময়েও মিলছে না ডাক্তার বা রক্ত, AidFast হতে পারে আপনার জীবনরক্ষাকারী হাতিয়ার",
         description: "বর্ষা এলেই বাড়ে ডেঙ্গুর ভয়! বাংলাদেশে প্রতিবছর বর্ষাকালে ডেঙ্গু জ্বর যেনো একটি আতঙ্ক হয়ে দাঁড়ায়। শহর তো বটেই, এখন তো গ্রামগঞ্জেও ডেঙ্গু ছড়িয়ে পড়ছে দ্রুত....",
         time: 3
      },
      {
         image: "/home/blog/b3.webp",
         heading: "স্বাস্থ্যসেবায় খরচ কমানোর উপায় ও সচেতনতার গুরুত্ব: দালাল ও অপ্রয়োজনীয় টেস্ট এড়িয়ে প্রযুক্তির মাধ্যমে সাশ্রয়ী চিকিৎসা",
         description: "স্বাস্থ্যসেবা মানুষের মৌলিক অধিকার হলেও, আমাদের দেশে এটি এখন অনেকের জন্য দুশ্চিন্তার কারণ হয়ে দাঁড়িয়েছে। কারণ কী? অপ্রয়োজনীয় খরচ যেসব....",
         time: 6
      },
   ];


   return (
      <section className="mt-10 md:mt-14 lg:mt-20 xl:mt-20 aid-container">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-[#212121] heading1">{i18n.t("Browse updated blogs")}</h1>
               <p className="text-[#061C3D] description2 mt-3 lg:mt-4 max-w-[834px]">{i18n.t("Learn about regular health awareness and care from our blog posts. Written by doctors and experts, these articles will help you and your family stay healthy")}</p>
            </div>
            <Link href={"/blog"} target="_blank" className="flex items-center gap-1.5">
               <p className="text-[#1087EF] description2">{i18n.t("Explore More")}</p>
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

                           <Link href={`/blog/${index + 1}`} className="flex items-center gap-1.5 mt-3 md:mt-4">
                              <p className="text-[#1087EF] description1">{i18n.t("Read More")}</p>
                              <FaArrowRightLong className="description1 text-[#1087EF]" />
                           </Link>
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
