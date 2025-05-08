'use client';

import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <div className="flex flex-1 flex-col">
      <DashboardHeader toggleSidebar={toggleSidebar} />

      <main className="flex-1 overflow-y-auto  p-4 pt-[70px]">
      {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
