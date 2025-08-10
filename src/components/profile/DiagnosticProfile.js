'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import DiagnosticProfileBasic from './diagnostic/DiagnosticProfileBasic';
import DiagnosticProfileInfo from './diagnostic/DiagnosticProfileInfo';
import DiagnosticProfileServices from './diagnostic/DiagnosticProfileServices';
import DiagnosticProfileAmbulance from './diagnostic/DiagnosticProfileAmbulance';
import DiagnosticProfilePharmacy from './diagnostic/DiagnosticProfilePharmacy';
import DiagnosticProfileBlood from './diagnostic/DiagnosticProfileBlood';
import DiagnosticProfileDoctors from './diagnostic/DiagnosticProfileDoctors';
import { useAuth } from '../../context/AuthContext';


function DiagnosticProfile() {
  const [profileData, setProfileData] = useState(null);
  const { token, user } = useAuth()

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllDiagnosticCenterList?userid=${user.userId}`, { headers: headerx });

    const data = await res.json();
    if (res.status == 200) {
      if (data.data[0] !== null) {
        setProfileData(data.data[0]);
      }

    } else if (res.status === 401) {
      window.location.href = "/login";
    }

  }

  useEffect(() => {
    if (user && token)
      getProfileData();
  }, [user, token]);


  const tabs = [
    { label: 'Basic', content: <DiagnosticProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token}></DiagnosticProfileBasic> },
    { label: 'Info', content: <DiagnosticProfileInfo getProfileData={getProfileData} data={profileData?.diagnosticCenterAdditionalInfo} user={user} token={token}></DiagnosticProfileInfo> },
    { label: 'Doctors', content: <DiagnosticProfileDoctors getProfileData={getProfileData} data={profileData?.diagnosticCenterDoctors} user={user} token={token}></DiagnosticProfileDoctors> },
    { label: 'Blood Bank', content: <DiagnosticProfileBlood getProfileData={getProfileData} data={profileData?.diagnosticCenterBloodBank} user={user} token={token}></DiagnosticProfileBlood> },
    { label: 'Pharmacy', content: <DiagnosticProfilePharmacy getProfileData={getProfileData} data={profileData?.diagnosticCenterPharmacy} user={user} token={token}></DiagnosticProfilePharmacy> },
    { label: 'Ambulance', content: <DiagnosticProfileAmbulance getProfileData={getProfileData} data={profileData?.diagnosticCenterAmbulance} user={user} token={token}></DiagnosticProfileAmbulance> },
    { label: 'Services', content: <DiagnosticProfileServices getProfileData={getProfileData} data={profileData?.diagnosticCenterServices} user={user} token={token}></DiagnosticProfileServices> },
  ];

  return (
    <div>
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default DiagnosticProfile