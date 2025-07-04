'use client'
import Image from "next/image"
import Link from "next/link"
import CommonService from '../../components/common/service.js'

const Service = () => {
   const data = [
      {
         image: "/home/service/s1.png",
         heading: "Appointment of Doctor",
         description: "Consult experienced doctors for primary health concerns.",
         link: "/doctor",
      },
      {
         image: "/home/service/s2.png",
         heading: "Diagnostic Center",
         description: "Get emergency ambulance support anywhere in the country.",
         link: "/diagnostic",
      },
      {
         image: "/home/service/s3.png",
         heading: "Dental Clinic",
         description: "Order medicines online and receive them at your doorstep.",
         link: "/dental",
      },
      {
         image: "/home/service/s4.png",
         heading: "Blood Bank",
         description: "Book lab tests and get reports from trusted labs.",
         link: "/blood",
      },
      {
         image: "/home/service/s5.png",
         heading: "Ambulance Service",
         description: "Consult doctors via video call from the comfort of your home.",
         link: "/ambulance",
      },
      {
         image: "/home/service/s6.png",
         heading: "Pharmacy Service",
         description: "Access top diagnostic centers for accurate health checkups.",
         link: "/pharmacy",
      },
      {
         image: "/home/service/s7.png",
         heading: "Physiotherapy Center",
         description: "Hire professional nursing care at home for patients.",
         link: "/physiotherapy-center",
      },
      {
         image: "/home/service/s8.png",
         heading: "Eye Care Center",
         description: "Get counseling and support for mental wellness.",
         link: "/eye-care-center",
      },
      {
         image: "/home/service/s9.png",
         heading: "Drug Rehabilitation",
         description: "Book physical therapy sessions at clinics or home.",
         link: "/drug-de-addiction",
      },
      {
         image: "/home/service/s10.png",
         heading: "Nursing Care Home",
         description: "Explore affordable health insurance plans.",
         link: "/nursing-home-care",
      },
      {
         image: "/home/service/s11.png",
         heading: "Hearing Care Center",
         description: "Find and request blood donors quickly and reliably.",
         link: "/hearing-care-center",
      },
      {
         image: "/home/service/s12.png",
         heading: "Emergency Service",
         description: "Rent or purchase essential medical equipment.",
         link: "/emergency",
      }
   ];

   return (
      <section className="mt-5 lg:mt-6 xl:mt-8 aid-container">
         <div className="flex items-center justify-between gap-2">
            <div>
               <h1 className="text-[#212121] heading1">Services Of AisFast</h1>
               <p className="text-[#061C3D] description2 mt-3 lg:mt-4">AidFastBD unites medical and support services nationwide to simplify your healthcare</p>
            </div>
         </div>
         <div className="mt-8 md:mt-12 lg:mt-14 xl:mt-[70px]">
            <div className="grid lg:grid-cols-3 grid-cols-2 xl:gap-6 lg:gap-5 md:gap-4 gap-4">
               {data.map((item, index) => (
                  <Link
                     href={item.link}
                     key={index}
                     target="_blank"
                     className="flex flex-col justify-start items-center border border-[#3056D321] bg-white xl:rounded-2xl lg:rounded-xl rounded-lg p-6 mx-auto w-full text-center"
                  >
                     <Image
                        src={item.image}
                        width={100}
                        height={100}
                        className="h-12 w-12 md:w-[76px] md:h-[76px] object-contain"
                        alt="Service image"
                     />
                     <h4 className="heading3 mt-6 text-[#061C3D]">{item.heading}</h4>
                     <p className="description1 mt-3 text-[#42526B]">{item.description}</p>
                  </Link>
               ))}
            </div>
         </div>
         <div className="lg:mt-10 mt-8 mt">
            <CommonService />
         </div>
      </section>
   )
}

export default Service
