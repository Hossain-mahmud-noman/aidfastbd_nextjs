'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import HearingCareProfileBasic from './hearnigCareProfile/HearingCareProfileBasic';
import HearingCareProfileInfo from './hearnigCareProfile/HearingCareProfileInfo';
import HearingCareProfileDoctors from './hearnigCareProfile/HearingCareProfileDoctors';
import HearingCareProfileServices from './hearnigCareProfile/HearingCareProfileServices';


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
    { label: 'Basic', content: <HearingCareProfileBasic data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <HearingCareProfileInfo id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token}/> },
    { label: 'Doctors', content: <HearingCareProfileDoctors id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token}/> },
    { label: 'Services', content: <HearingCareProfileServices data={profileData?.genericServiceDetails} user={user} token={token}/> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default HearingCareprofile