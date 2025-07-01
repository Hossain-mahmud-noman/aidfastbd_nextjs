
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Dropdown, Drawer } from "antd";
import {
   IoChevronDownOutline,
} from "react-icons/io5";
import Location from "./location/location.js";
import Language from "./language/language.js";
import { useI18n } from "../../context/i18n.js";

const Navbar = ({ textColor = "text-black" }) => {
   const pathname = usePathname();
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const pagesItems = [
      { path: "/about", label: ("About") },
      { path: "/contact", label: ("Contact") },
      { path: "/privacyPolicy", label: ("Privacy Policy") },
      { path: "/termsCondition", label: ("Terms & Conditions") },
   ];
   const i18n = useI18n()
   return (
      <div className="w-full font-lato overflow-hidden relative z-50"
         style={{
            background: '#FFF',
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)'
         }}
      >
         <div className="aid-container flex flex-row justify-between items-center md:py-[18px] py-4 lg:px-0 bg-[#FFFFFF] text-[#061C3D]" >
            {/* Logo */}
            <Link href="/">
               <div className="sm:w-[133px] sm:h-[40px] w-[153px] h-[46px] flex justify-start items-center -ml-2 lg:ml-0 mt-1">
                  <Image
                     src="/logo.png"
                     width={153}
                     height={46}
                     className="object-cover"
                     alt="logo"
                  />
               </div>
            </Link>
            {/* Desktop Menu */}
            <ul className=" description1 list-none xl:gap-10 gap-4 items-center hidden lg:flex">
               <NavItem
                  path="/doctor"
                  label={i18n.t("Doctor")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/diagnostic"
                  label={i18n.t("Diagonistick")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/blood"
                  label={("Blood Bank")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/dental"
                  label={("Dental")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/blog"
                  label={("Blog")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <DropdownMenuTrigger
                  label={("Pages")}
                  items={pagesItems}
                  textColor={textColor}
               />
            </ul>
            <div className="flex items-center gap-1">
               <Location />
               <Language />
            </div>
         </div>

         <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            className="lg:hidden"
         >
            <div className="flex flex-col gap-4">
               <Link
                  href="/doctor"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Doctor")}
               </Link>
               <Link
                  href="/Diagonostick"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("diagonostick")}
               </Link>
               <Link
                  href="/blood"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Blood Bank")}
               </Link>
               <Link
                  href="/dental"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Dental")}
               </Link>
               <Link
                  href="/blog"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {("Blog")}
               </Link>
               <MobileDropdown title="Pages" items={pagesItems} />

            </div>
         </Drawer>
      </div>
   );
};

export default Navbar;

const NavItem = ({ path, label, pathname, textColor }) => (
   <li
      className={`description1 hover:text-primary ${pathname === path
         ? "text-primary"
         : textColor === "text-[#061C3D]"
            ? "text-[#061C3D]"
            : "text-[#061C3D]"
         }`}
   >
      <Link href={path}>{label}</Link>
   </li>
);

const DropdownMenuTrigger = ({ label, items, textColor }) => (
   <li className={`description1 ${textColor} hover:text-primary`}>
      <Dropdown
         menu={{
            items: items.map(({ path, label }) => ({
               key: path,
               label: (
                  <Link href={path} className="block w-full">
                     {label}
                  </Link>
               ),
            })),
         }}
         trigger={["hover"]}
      >
         <span className="flex items-center gap-2 cursor-pointer">
            {label}
            <IoChevronDownOutline className="text-lg mt-[2px]" />
         </span>
      </Dropdown>
   </li>
);

const MobileDropdown = ({ title, items }) => {
   const [open, setOpen] = useState(false);
   const pathname = usePathname();

   return (
      <div className="w-full">
         <button
            onClick={() => setOpen(!open)}
            className="description1 flex justify-between items-center w-full py-2"
         >
            {title}
            <IoChevronDownOutline
               className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                  }`}
            />
         </button>

         {open && (
            <div className="flex flex-col ps-4">
               {items.map((item) => (
                  <Link
                     key={item.path}
                     href={item.path}
                     onClick={() => location.assign(item.path)}
                     className={`py-2 text-sm ${pathname === item.path
                        ? "text-primary description1"
                        : "description1"
                        } hover:text-primary`}
                  >
                     {item.label.toUpperCase()}
                  </Link>
               ))}
            </div>
         )}
      </div>
   );
};
