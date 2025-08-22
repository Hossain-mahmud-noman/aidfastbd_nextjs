
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Dropdown, Drawer } from "antd";
import {
   IoChevronDownOutline,
   IoMenuOutline,
} from "react-icons/io5";
import Location from "./location/location.js";
import Language from "./language/language.js";
import LoginPage from "./loginPage/login.js"
import { useI18n } from "../../context/i18n.js";

const Navbar = ({ textColor = "text-black" }) => {
   const i18n = useI18n()
   const pathname = usePathname();
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const pagesItems = [
      { path: "/blog", label: i18n.t("Blog") },
      { path: "/service", label: i18n.t("Services") },
      { path: "/more", label: i18n.t("Additional Content") },
      { path: "/privacy", label: i18n.t("Privacy & Policy") },
      { path: "/privacy", label: i18n.t("Terms & Conditions") },
   ];
   return (
      <div className="w-full font-lato overflow-hidden relative z-20"
         style={{
            background: '#FFF',
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)'
         }}
      >
         <div className="aid-container flex flex-row justify-between items-center md:py-[18px] py-1 lg:px-0 bg-[#FFFFFF] text-[#061C3D]" >
            {/* Logo */}
            <Link href="/">
               <div className="md:w-[133px] w-[100px] h-[80px] md:h-[40px] lg:w-[153px] lg:h-[46px]  flex justify-start items-center -ml-2 lg:ml-0 mt-1">
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
            <ul className=" description1 list-none xl:gap-5 gap-4 items-center hidden lg:flex">
               <NavItem
                  path="/doctor"
                  label={i18n.t("Doctor")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/diagnostic"
                  label={i18n.t("Diagnostic")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/pharmacy"
                  label={i18n.t("Pharmacy")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/ambulance"
                  label={i18n.t("Ambulance")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <NavItem
                  path="/emergency"
                  label={i18n.t("Emergency")}
                  pathname={pathname}
                  textColor={textColor}
               />
               <DropdownMenuTrigger
                  label={i18n.t("Pages")}
                  items={pagesItems}
                  textColor={textColor}
               />
            </ul>
            <div className="flex items-center gap-0.5 md:gap-1">
               <Location />
               <Language />
               <LoginPage />
               <button
                  className={`lg:hidden text-primary text-2xl `}
                  onClick={() => setIsDrawerOpen(true)}
               >
                  <IoMenuOutline className="text-3xl md:text-4xl relative z-20 sm:ml-0" />
               </button>
            </div>
         </div>

         <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            className="lg:hidden"
            width={250}
         >
            <div className="flex flex-col gap-4">
               <Link
                  href="/doctor"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {i18n.t("Doctor")}
               </Link>
               <Link
                  href="/diagnostic"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {i18n.t("Diagnostic")}
               </Link>
               <Link
                  href="/pharmacy"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {i18n.t("Pharmacy")}
               </Link>
               <Link
                  href="/dental"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {i18n.t("Dental")}
               </Link>
               <Link
                  href="/ambulance"
                  className="text-lg"
                  onClick={() => setIsDrawerOpen(false)}
               >
                  {i18n.t("Ambulance")}
               </Link>
               <MobileDropdown  title="Pages" items={pagesItems} />
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
            className="description2 flex justify-between items-center w-full py-2">
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
                        ? "text-primary description2"
                        : "description2"
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
