'use client';
import { message } from 'antd';
import Link from 'next/link';
import { FaUser, FaCalendarAlt, FaHeart, FaInfoCircle, FaShieldAlt, FaCog, FaLock, FaLanguage, FaHistory, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlinePolicy } from 'react-icons/md';

const MoreMenu = ({ token = "" }) => {

  return (
    <div className="min-h-screen mt-6">
      {/* General Section */}
      {token !== "" && <div className="mb-4">
        <h3 className="font-semibold text-gray-500 mb-3">General</h3>
        <div className="space-y-2">
          <MenuItem icon={<FaUser />} href={"/profile"} text="Profile" />
          <MenuItem icon={<FaCalendarAlt />} href={"/appointments"} text="Appointments" />
          <MenuItem icon={<FaHistory />} href={"/appointments/history"} text="Appointment History" />
          <MenuItem icon={<FaHeart />} href={"/favorite"} text="Favorite" />
        </div>
      </div>}

      {/* About Section */}
      <div className="mb-4 shadow-custom-light p-4 rounded-md">
        <h3 className="font-semibold text-gray-500 mb-3">Info</h3>
        <div className="space-y-2">
          <MenuItem href={"/about"} icon={<FaInfoCircle />} text="About Us" />
          <MenuItem href={"/privacy"} icon={<FaShieldAlt />} text="Privacy Policy" />
          <MenuItem href={"/terms"} icon={<MdOutlinePolicy />} text="Terms & Conditions" />
        </div>
      </div>

      {/* Other Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-500 mb-3">Other</h3>
        <div className="space-y-2 shadow-custom-light p-2 rounded-md">
          {/* <MenuItem icon={<FaCog />} text="Settings" /> */}
          {/* <MenuItem icon={<FaLanguage />} text="English" /> */}

          {token == "" ? (
            <MenuItem
              href={"/login"}
              icon={<FaSignInAlt />}
              text="Login"
            />
          ) : (<>
            <MenuItem href={"/reset"} icon={<FaLock />} text="Reset Password" />
            <MenuItem
              href={"/logout"}
              icon={<FaSignOutAlt />}
              text="Logout"
            />
          </>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, href = "" }) => {
  if (href == "/logout") {
    return <div onClick={async () => {
      const ret = await fetch("/api/logout", {
        method: "POST", headers: {
          'Content-Type': 'application/json'
        },
      })
      if (ret.status == 200) {
        message.success("Logout Success");
        window.location.href ="/"
      } else {
        message.error("Logout Failed");
      }
    }} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100">
      <div className="text-xl text-gray-600">
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  } else {
    return <Link href={href}>
      <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100">
        <div className="text-xl text-gray-600">
          {icon}
        </div>
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    </Link>
  }

}





export default MoreMenu;
