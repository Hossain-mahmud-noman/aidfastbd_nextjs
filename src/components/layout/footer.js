
'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { PiMapPinAreaBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { useI18n } from "../../context/i18n";
import ContacTactModal from "../../utils/contactModal";


const Footer = () => {
   const i18n = useI18n();
   const [currentYear, setCurrentYear] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const handleOpen = () => setShowModal(true);
   const handleClose = () => setShowModal(false);
   useEffect(() => {
      if (typeof window !== "undefined") {
         setCurrentYear(new Date().getFullYear());
      }
   }, []);

   const navLinks1 = [
      { name: i18n.t("Doctor"), link: "/doctor" },
      { name: i18n.t("Diagnostic"), link: "/diagnostic" },
      { name: i18n.t("Blood Bank"), link: "/blood" },
      { name: i18n.t("Dental"), link: "/dental" },
      { name: i18n.t("Ambulance"), link: "/ambulance" },
      { name: i18n.t("Pharmacy"), link: "/pharmacy" },
   ];

   const navLinks2 = [
      { name: i18n.t("Blog"), link: "/blog" },
      { name: i18n.t("Physiotherapy Center"), link: "/physiotherapy-center" },
      { name: i18n.t("Nursing Care Home"), link: "/nursing-home-care" },
      { name: i18n.t("Eye Care Center"), link: "/eye-care-center" },
      { name: i18n.t("Drug Rehabilitation"), link: "/drug-de-addiction" },
      { name: i18n.t("Hearing Care Center"), link: "/hearing-care-center" },
   ];

   const navLinks3 = [
      {
         name: i18n.t("Dhaka-1209, Bangladesh"),
         link: "https://maps.app.goo.gl/k5caWFQUjbj88H5T7",
         icon: <PiMapPinAreaBold />,
      },
      {
         name: "contact@aidfastbd.com",
         link: "mailto:contact@aidfastbd.com",
         icon: <MdOutlineEmail />,
      },
      {
         name: "+8801338988734",
         link: handleOpen,
         icon: <BiPhoneCall />,
      },
   ];

   const navIcons = [
      {
         icon: FaWhatsapp,
         link: handleOpen
      },
      {
         icon: FaFacebookF,
         link: 'https://www.facebook.com/profile.php?id=61552667941624'
      },
      // {
      //    icon: FaTwitter,
      //    link: '/'
      // },
      // {
      //    icon: FaLinkedin,
      //    link: '/'
      // },
   ];
   return (
      <div className="bg-[#1087EF] w-full xl:pt-10 lg:pt-9 md:pt-7 pt-5 pb-1 mt-10">
         <div className="relative max-w-[1440px] mx-auto ">
            <div className="absolute top-1/2 -left-3">
               <Image
                  className=""
                  src="/hart.png"
                  alt="logo"
                  width={200}
                  height={200}
               />
            </div>
            <div className="absolute top-1 right-3">
               <Image
                  className=""
                  src="/dental.png"
                  alt="logo"
                  width={200}
                  height={200}
               />
            </div>
         </div>
         <div className="aid-container "
            style={{
               backgroundImage: `url('/lung.png')`,
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               backgroundSize: 'contain',
               backgroundBlendMode: 'overlay',
               opacity: 1,
            }}
         >

            <div className="flex flex-col md:flex-row justify-center gap-3 lg:gap-0">
               <div className="w-full md:w-[30%] lg:w-[35%]">
                  <Image
                     className=""
                     src="/logo1.png"
                     alt="logo"
                     width={137}
                     height={34}
                  />
                  <p className="description1 mt-4 text-white md:max-w-[326px]">{i18n.t("AidFast Tagline")}</p>
                  <p className="description1 mt-4 text-white ">{i18n.t("Download AidFast App")}</p>
                  <div className="mt-4 lg:mt-5 xl:mt-8 flex items-center gap-3 md:gap-4 xl:gap-5">
                     <Link href="https://play.google.com/store/apps/details?id=com.aidfastbd.app" className="relative w-[150px] h-[50px]">
                        <Image
                           src="/home/service/google.png"
                           fill
                           alt="Google Play"
                           className="object-contain"
                        />
                     </Link>
                     {/* <Link href="/www.google.com" className="relative w-[150px] h-[50px]">
                        <Image
                           src="/home/service/apple.png"
                           fill
                           alt="App Store"
                           className="object-contain"
                        />
                     </Link> */}
                  </div>
               </div>
               <div className="w-full md:w-[70%] lg:w-[65%] mt-5 sm:mt-0">
                  <div className="flex flex-col sm:flex-row justify-between ">
                     {/* first part */}
                     <div className="flex flex-col items-center sm:items-start">
                        <h3 className="description3 text-white mt-4 sm:mt-0">{i18n.t("Services")}</h3>
                        <ul className="xl:mt-8 lg:mt-7 md:mt-6 mt-5">
                           {navLinks1?.map((item, index) => (
                              <li key={index} className="flex flex-col items-center sm:items-start first:mt-0 md:mt-[18px] mt-4 descruiption1 text-white transform duration-300 hover:text-black cursor-pointer">
                                 <Link target="_blank" className="text-center" href={item?.link}>{item?.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     {/* second part */}
                     <div className="flex flex-col items-center sm:items-start -mt-4 sm:-mt-0">
                        <ul className="xl:mt-[60px] lg:mt-12 md:mt-10 mt-8">
                           {navLinks2?.map((item, index) => (
                              <li key={index} className="flex flex-col items-center sm:items-start first:mt-0 md:mt-[18px] mt-4 description1 text-white transform duration-300 hover:text-black cursor-pointer">
                                 <Link target="_blank" className="" href={item?.link}>{item?.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     {/* third part */}
                     <div className="flex flex-col items-center sm:items-start">
                        <h3 className="description3 text-white mt-8 sm:mt-0">{i18n.t("Address")}</h3>
                        <ul className="xl:mt-8 lg:mt-7 md:mt-6 mt-5">
                           {navLinks3?.map((item, index) => (
                              <li
                                 key={index}
                                 className="flex flex-col items-center sm:items-start first:mt-0 md:mt-[18px] mt-4 descruiption1 text-white transform duration-300 hover:text-black cursor-pointer"
                              >
                                 {typeof item.link === "function" ? (
                                    <button
                                       onClick={item.link}
                                       className="flex items-center gap-2 text-left"
                                       type="button"
                                    >
                                       {item.icon}
                                       {item.name}
                                    </button>
                                 ) : (
                                    <Link
                                       className="flex items-center gap-2"
                                       target="_blank"
                                       href={item.link}
                                    >
                                       {item.icon}
                                       {item.name}
                                    </Link>
                                 )}
                              </li>
                           ))}

                           <div className="flex justify-center sm:justify-start gap-2 sm:gap-[13px] mt-4 md:mt-5 lg:mt-6">
                              {navIcons.map((item, index) => {
                                 const IconComponent = item.icon;
                                 const isFunction = typeof item.link === 'function';

                                 const commonClasses =
                                    "group border border-white rounded-full transition-all duration-300 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:border-black";

                                 return isFunction ? (
                                    <button
                                       key={index}
                                       onClick={item.link}
                                       className={commonClasses}
                                       type="button"
                                    >
                                       <IconComponent className="text-white text-base lg:text-xl group-hover:text-black transition-all duration-300" />
                                    </button>
                                 ) : (
                                    <Link
                                       key={index}
                                       href={item.link}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className={commonClasses}
                                    >
                                       <IconComponent className="text-white text-base lg:text-xl group-hover:text-black transition-all duration-300" />
                                    </Link>
                                 );
                              })}

                           </div>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="xl:mt-14 lg:mt-12 md:mt-10 mt-5 bg-white w-full h-[1px]"> </div>
            <div className="xl:my-7 lg:my-6 md:my-5 my-4 flex flex-col sm:flex-row items-center justify-between ">
               <p className="text-white description-2 mt-3 sm:mt-0">
                  {i18n.t("Copyright")} © {currentYear || new Date().getFullYear()} {i18n.t("All rights reserved")} <Link className="text-black/70 description2 hover:text-white/50 transition-all duration-300" href="/">AidFast</Link>
               </p>
               <div className="flex items-center gap-3 md:gap-4 xl:gap-10 mt-3 md:mt-0">
                  <Link target="_blank" href="/privacy" className="text-white description1 hover:text-black transition-all duration-300">
                     {i18n.t("Privacy & Policy")}
                  </Link>
                  <Link target="_blank" href="/terms" className="text-white description1 hover:text-black transition-all duration-300">
                     {i18n.t("Terms & Conditions")}
                  </Link>
               </div>
            </div>
         </div>
         <ContacTactModal
            contact="+8801338988734"
            open={showModal}
            onClose={handleClose}
         />
      </div>
   );
};
export default Footer;
