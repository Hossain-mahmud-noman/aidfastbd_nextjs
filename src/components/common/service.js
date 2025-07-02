'use client'

import Image from "next/image"
import Link from "next/link"
import { BiSolidPhoneCall } from "react-icons/bi"
import { FaArrowRightLong } from "react-icons/fa6"

const CommonService = () => {

   const data = [
      {
         image: "/common/s1.png",
         heading: "Book an appointment now to consult a specialist doctor",
         description: "Book an appointment with trusted and experienced doctors at your preferred date and time. Get fast and reliable healthcare services with AidFastBD",
         link: "/doctor",
         call: "tel:+8801738548662",
         slug: "Book Appointment"
      },
      {
         image: "/common/s2.png",
         heading: "Diagnostic and hospital services at your doorstep",
         description: "Get the best care you need with AidFastBD. Book tests or treatment at your preferred center quickly and easily.",
         link: "/diagnostic",
         call: "tel:+8801738548662",
         slug: "Book Diagnostic"
      },
      {
         image: "/common/ambulence.png",
         heading: "Get ambulance service from your home",
         description: "Get licensed ambulance service delivered to your doorstep within Dhaka in the fastest time — with discounts. Book online now",
         link: "/ambulance",
         call: "tel:+8801738548662",
         slug: "Book Ambulance"
      },
      {
         image: "/common/s3.png",
         heading: "Trusted dental clinics for your oral care",
         description: "Take proper care of your teeth with experienced dental specialists. Get safe and comfortable treatment at a modern dental clinic",
         link: "/dental",
         call: "tel:+8801738548662",
         slug: "Book Dental Care"
      },
      {
         image: "/common/s4.png",
         heading: "Blood Donor Club — Save Lives, Donate Blood",
         description: "Blood donation is a noble deed. Find donors and blood banks near you quickly with AidFastBD, and save lives with ease.",
         link: "/blood",
         call: "tel:+8801738548662",
         slug: "Find Donor"
      },
      {
         image: "/common/s5.png",
         heading: "Medicine Delivery — Fast and Secure",
         description: "Find pharmacies, check medicine prices, and order now. Get the right medicines delivered to your home as per your prescription",
         link: "/pharmacy",
         call: "tel:+8801738548662",
         slug: "Order Medicine"
      },
      {
         image: "/common/s6.png",
         heading: "Get modern physiotherapy care near you",
         description: "With advanced physiotherapy technology and expert care, regain your normal life quickly. Physiotherapy centers are now easily accessible.",
         link: "/physiotherapy-center",
         call: "tel:+8801738548662",
         slug: "Book Physiotherapy"
      },
      {
         image: "/common/s7.png",
         heading: "Trusted eye care centers for your vision health",
         description: "Get accurate treatment from specialist eye doctors using modern equipment. No more worries about minor or major eye problems",
         link: "/eye-care-center",
         call: "tel:+8801738548662",
         slug: "Book Eye Checkup"
      },
      {
         image: "/common/s8.png",
         heading: "A trusted place for drug rehabilitation",
         description: "Get accurate therapy and rehabilitation with expert psychiatrists and compassionate care. Move forward gradually on the path to wellness in a calm and healthy setting",
         link: "/drug-de-addiction",
         call: "tel:+8801738548662",
         slug: "Get Rehab Help"
      },
      {
         image: "/common/s9.png",
         heading: "Compassionate nursing care for the elderly and sick",
         description: "24/7 care by experienced nurses and a caring team. Safe and comfortable nursing services for your loved ones, now at your fingertips",
         link: "/nursing-home-care",
         call: "tel:+8801738548662",
         slug: "Book Nursing Care"
      },
      {
         image: "/common/s10.png",
         heading: "Restore your hearing safely",
         description: "Consult experienced audiologists for accurate solutions. Don’t wait with hearing issues — get safe treatment today",
         link: "/hearing-care-center",
         call: "tel:+8801738548662",
         slug: "Consult Audiologist"
      },
      {
         image: "/common/s11.png",
         heading: "Emergency services 24/7",
         description: "Get the emergency services you need quickly and easily. Contact us anytime in any urgent situation — we are here by your side",
         call: "tel:+8801738548662",
         slug: "Call Emergency"
      },
   ];


   return (
      <section className="aid-container">
         {
            data.map((item, index) => (
               <div key={index} className={`mt-16 md:mt-24 lg:mt-28 xl:mt-[160px] flex items-center ${index % 2 === 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"} xl:gap-[72px] lg:gap-12 gap-5`}>
                  <Image
                     src={item.image}
                     width={1000}
                     height={1000}
                     alt="Abmulence"
                     className="w-full md:w-[429px] xl:h-[303px] lg:h-[280px] h-[200px] object-fill"
                  />
                  <div className="w-full">
                     <h1 className="heading1 text-[#212B36]">{item.heading}</h1>
                     <p className="description2 text-[#061C3D] mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">{item.description}</p>
                     <div className="mt-7 md:mt-8 lg:mt-10 xl:mt-12 flex items-center gap-3 md:gap-4 xl:gap-10">
                        <Link href="tel: +8801738548662" target="_blank" className="bg-[#1087EF] px-4 md:px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                           <BiSolidPhoneCall className="text-white description2" />
                           <p className="description2 text-white whitespace-pre">{item.slug}</p>
                        </Link>
                        {
                           item.link && (
                              <Link href={item.link} target="_blank" className="group bg-white border-2 border-primary px-6 py-3 rounded-[12px] description2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                                 <p className="description2 text-primary group-hover:text-white transition-all duration-300 whitespace-pre">Explore More</p>
                                 <FaArrowRightLong className="description2 text-primary group-hover:text-white transition-all duration-300" />
                              </Link>
                           )
                        }
                     </div>
                  </div>
               </div>
            ))
         }
      </section>
   )
}

export default CommonService;
