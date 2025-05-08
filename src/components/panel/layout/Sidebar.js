import React from 'react';
import { 
  FaHome, 
  FaStethoscope, 
  FaMicroscope, 
  FaPills, 
  FaTint, 
  FaAmbulance, 
  FaCalendarAlt, 
  FaCog, 
  FaLifeRing, 
  FaChevronLeft, 
  FaUserAlt 
} from 'react-icons/fa';

import Button from '../ui/button';

const sidebarItems = [
  { icon: FaHome, label: 'Dashboard', active: true },
  { icon: FaStethoscope, label: 'Doctors' },
  { icon: FaMicroscope, label: 'Diagnostics' },
  { icon: FaPills, label: 'Pharmacy' },
  { icon: FaTint, label: 'Blood Bank' },
  { icon: FaAmbulance, label: 'Ambulance' },
  { icon: FaCalendarAlt, label: 'Appointments' },
  { icon: FaCog, label: 'Settings' },
  { icon: FaLifeRing, label: 'Help & Support' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-primary">
            <span className="text-white font-bold">M</span>
          </div>
          <h1 className="text-xl font-bold text-medical-primary">MedConnect</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleSidebar}
        >
          <FaChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? 'secondary' : 'ghost'}
            className={`justify-start gap-3 h-10 ${
              item.active
                ? 'bg-medical-light text-medical-primary hover:bg-medical-light hover:text-medical-primary'
                : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <FaUserAlt className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium text-gray-700">John Doe</div>
            <div>Patient</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
