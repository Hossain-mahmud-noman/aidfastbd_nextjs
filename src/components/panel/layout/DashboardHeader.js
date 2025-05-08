import { useState, useRef, useEffect } from "react";
import { FiMenu, FiBell, FiChevronDown, FiUser } from "react-icons/fi";

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow-sm">
{/* Left side: Menu + Logo */}
      <div className="flex items-center space-x-4">
        <button className="text-xl md:hidden">
          <FiMenu />
        </button>
        <span className="text-2xl font-bold text-blue-600">
          Aid<span className="text-black">Fast</span>
        </span>
      </div>

      {/* Right side: Notifications + User */}
      <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
        <div className="relative">
          <FiBell className="text-xl" />
          <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">3</span>
        </div>

        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <FiUser />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">Shohayok</p>
            <p className="text-xs text-gray-500">Panel</p>
          </div>
          <FiChevronDown className="text-gray-500" />
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute top-14 right-0 bg-white border rounded shadow-md w-44 z-50">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li onClick={()=>{
                window.location.href="/api/panel-logout"
              }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
