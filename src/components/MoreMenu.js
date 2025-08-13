'use client';
import Link from 'next/link';
import {
  FaUser, FaCalendarAlt, FaInfoCircle, FaShieldAlt, FaLock,
} from 'react-icons/fa';
import { MdOutlinePolicy } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import AppBar from './AppBar';
import { FaArrowLeft } from 'react-icons/fa6';
import { useI18n } from '../context/i18n';
import { CgLogOut } from "react-icons/cg";
import { LuLogIn } from "react-icons/lu";
const MoreMenu = () => {
  const { user, logout } = useAuth();
  const i18n = useI18n()
  const MenuItem = ({ icon, text, href = "", onClick }) => {
    const content = (
      <div
        className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
        onClick={onClick}
      >
        <div className="text-xl text-gray-600">{icon}</div>
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    );
    return href && href !== "/logout" ? <Link href={href}>{content}</Link> : content;
  };
  return (
    <div className="min-h-screen">
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title={i18n.t("More Menu")} />
      <div className='mt-5 lg:mt-8'>
        {user && (
          <div className="mb-4 shadow-custom-light p-4 rounded-md">
            <h3 className="font-semibold text-gray-500 mb-3">General</h3>
            <div className="space-y-2">
              <MenuItem icon={<FaUser />} href="/profile" text="Profile" />
              <MenuItem icon={<FaCalendarAlt />} href="/appointments" text="Appointments" />
              {/* <MenuItem icon={<FaHeart />} href="/favorite" text="Favorite" /> */}
            </div>
          </div>
        )}

      </div>
      <div className="mb-4 shadow-custom-light p-4 rounded-md">
        <h3 className="font-semibold text-gray-500 mb-3">Info</h3>
        <div className="space-y-2">
          {
            !user &&
            <MenuItem icon={<LuLogIn />} href="/login" text="Login" />
          }
          <MenuItem icon={<FaInfoCircle />} href="/about" text="About Us" />
          <MenuItem icon={<FaShieldAlt />} href="/privacy" text="Privacy Policy" />
          <MenuItem icon={<MdOutlinePolicy />} href="/terms" text="Terms & Conditions" />
        </div>
      </div>

      {
        user &&
        <div className="mb-4">
          <h3 className="font-semibold text-gray-500 mb-3">Other</h3>
          <div className="space-y-2 shadow-custom-light p-2 rounded-md">
            <MenuItem icon={<FaLock />} href="/reset" text="Reset Password" />
            <MenuItem icon={<CgLogOut />} onClick={logout} text="Logout" />
          </div>
        </div>
      }
    </div>
  );
};

export default MoreMenu;
