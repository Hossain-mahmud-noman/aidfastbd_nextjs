'use client';
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaRegHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { setTranslations } from '../redux/features/translationSlice';

const BottomNavigation = ({ active = "/" }) => {


  const dispatch = useDispatch();
  const { translations, locale } = useSelector((state) => state.translation);

  useEffect(() => {
    async function fetchTranslations() {
      const res = await fetch(`/locales/${locale}`);
      const data = await res.json();
      dispatch(setTranslations({ translations: data, locale }));
    }

    fetchTranslations();
  }, [locale, dispatch]);

  const navItems = [
    { id: "/", icon: GrHomeRounded, label: translations?.navigation?.home || 'Home' },
    { id: "/doctor", icon: FaUserDoctor, label: translations?.navigation?.doctor || 'Doctor' },
    { id: "/diagnostic", icon: FaRegHospital, label: translations?.navigation?.diagnostic || 'Diagnostic' },
    { id: "/more", icon: TbCategoryPlus, label: translations?.navigation?.more || 'More' },
  ];

  const router = useRouter();

  const handleNavClick = (itemId) => {
    router.push(itemId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">

      <ul className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => {
                handleNavClick(item.id);
              }}
              className={`w-full h-full flex flex-col items-center justify-center  transition-all duration-300 ${active === item.id
                ? "text-blue-500"
                : "text-gray-500 hover:text-blue-500 hover:scale-105"
                }`}
              aria-label={item.label}
            >
              <div className="relative">
                <item.icon className="text-2xl mb-1" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs  sm:block">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
