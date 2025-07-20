'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import PhysioProfileBasic from './physioProfile/PhysioProfileBasic';
import PhysioProfileServices from './physioProfile/PhysioProfileServices';
import PhysioProfileDoctors from './physioProfile/PhysioProfileDoctors';
import PhysioProfileInfo from './physioProfile/PhysioProfileInfo';


function HearingCareprofile({ token, user }) {
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=4&userId=${user.id}`, { headers: headerx });

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
    { label: 'Basic', content: <PhysioProfileBasic data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <PhysioProfileInfo data={profileData?.genericServiceInfos} user={user} token={token}/> },
    { label: 'Doctors', content: <PhysioProfileDoctors data={profileData?.genericServiceDoctors} user={user} token={token}/> },
    { label: 'Services', content: <PhysioProfileServices data={profileData?.genericServiceDetails} user={user} token={token}/> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default HearingCareprofile