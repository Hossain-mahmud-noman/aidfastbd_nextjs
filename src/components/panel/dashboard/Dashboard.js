'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FaStethoscope, FaUsers, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

import StatsCard from '../dashboard/StatsCard';
import EmergencyBanner from '../dashboard/EmergencyBanner';

import DoctorsList from '../services/DoctorsList';
import DiagnosticsList from '../services/DiagnosticsList';
import PharmacyList from '../services/PharmacyList';
import BloodBankList from '../services/BloodBankList';
import AmbulanceList from '../services/AmbulanceList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const statsData = [
    {
      title: 'Doctors',
      value: '2,458',
      icon: <FaStethoscope className="h-6 w-6" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Hospitals',
      value: '145',
      icon: <FaBuilding className="h-6 w-6" />,
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Patients',
      value: '15.2K',
      icon: <FaUsers className="h-6 w-6" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Appointments',
      value: '342',
      icon: <FaCalendarAlt className="h-6 w-6" />,
      trend: { value: 3, isPositive: false }
    }
  ];
  
  return (
    <div className="space-y-6 ">
      <EmergencyBanner />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="bloodbanks">Blood Banks</TabsTrigger>
          <TabsTrigger value="ambulance">Ambulance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <h1 className="text-3xl font-bold my-3">Medical Services Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>
                    
        </TabsContent>
        
        <TabsContent value="doctors">
          <DoctorsList />
        </TabsContent>
        
        <TabsContent value="diagnostics">
          <DiagnosticsList />
        </TabsContent>
        
        <TabsContent value="pharmacy">
          <PharmacyList />
        </TabsContent>
        
        <TabsContent value="bloodbanks">
          <BloodBankList />
        </TabsContent>
        
        <TabsContent value="ambulance">
          <AmbulanceList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
