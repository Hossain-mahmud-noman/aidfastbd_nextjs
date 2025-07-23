'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import DentalProfileBasic from './dental/DentalProfileBasic';
import DentalProfileInfo from './dental/DentalProfileInfo';
import DentalProfileServices from './dental/DentalProfileServices';
import DentalProfileDoctors from './dental/DentalProfileDoctors';


function DentalProfile({ token, user }) {
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=1&userId=${user.id}`, { headers: headerx });

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
    getProfileData();
  }, [token]);

  
  const tabs = [
    { label: 'Basic', content: <DentalProfileBasic data={profileData} user={user} token={token}></DentalProfileBasic> },
    { label: 'Info', content: <DentalProfileInfo id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token}></DentalProfileInfo> },
    { label: 'Doctors', content: <DentalProfileDoctors id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token}></DentalProfileDoctors> },
    { label: 'Services', content: <DentalProfileServices data={profileData?.genericServiceDetails} user={user} token={token}></DentalProfileServices> },
  ];


  return (
    <div>
      
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default DentalProfile