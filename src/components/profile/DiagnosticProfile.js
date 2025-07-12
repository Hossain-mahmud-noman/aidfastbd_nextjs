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


function DiagnosticProfile({ token, user }) {
  const [profileData, setProfileData] = useState(null);


  const getProfileData = async () => {
    headerx['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllDiagnosticCenterList?userid=${user.id}`, { headers: headerx });

    const data = await res.json();
    console.log("🚀 ~ getProfileData ~ data:", data)
    if (res.status == 200) {
      if (data.data[0] !== null) {
        setProfileData(data.data[0]);
      }


    } else if (res.status === 401) {
      window.location.href = "/login";
    }

  }


  useEffect(() => {
    getProfileData();
  }, [token]);



  const tabs = [
    { label: 'Basic', content: <DiagnosticProfileBasic data={profileData} user={user} token={token}></DiagnosticProfileBasic> },
    { label: 'Info', content: <DiagnosticProfileInfo data={profileData?.diagnosticCenterAdditionalInfo} user={user} token={token}></DiagnosticProfileInfo> },
    { label: 'Doctors', content: <DiagnosticProfileDoctors data={profileData?.diagnosticCenterDoctors} user={user} token={token}></DiagnosticProfileDoctors> },
    { label: 'Blood Bank', content: <DiagnosticProfileBlood data={profileData?.diagnosticCenterBloodBank} user={user} token={token}></DiagnosticProfileBlood> },
    { label: 'Pharmacy', content: <DiagnosticProfilePharmacy data={profileData?.diagnosticCenterPharmacy} user={user} token={token}></DiagnosticProfilePharmacy> },
    { label: 'Ambulance', content: <DiagnosticProfileAmbulance data={profileData?.diagnosticCenterAmbulance} user={user} token={token}></DiagnosticProfileAmbulance> },
    { label: 'Services', content: <DiagnosticProfileServices data={profileData?.diagnosticCenterServices} user={user} token={token}></DiagnosticProfileServices> },
  ];


  return (
    <div>
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default DiagnosticProfile