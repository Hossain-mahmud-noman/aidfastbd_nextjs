'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import HearingCareProfileBasic from './hearnigCareProfile/HearingCareProfileBasic';
import HearingCareProfileInfo from './hearnigCareProfile/HearingCareProfileInfo';
import HearingCareProfileServices from './hearnigCareProfile/HearingCareProfileServices';
import { useAuth } from '../../context/AuthContext';


function HearingCareprofile() {
  const { user, token } = useAuth()
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=4&userId=${user.userId}`, { headers: headerx });

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
    { label: 'Basic', content: <HearingCareProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <HearingCareProfileInfo getProfileData={getProfileData} id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token} /> },
    { label: 'Services', content: <HearingCareProfileServices getProfileData={getProfileData} genericServiceId={profileData?.id} userId={profileData?.userId} data={profileData?.genericServiceDetails} user={user} token={token} /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default HearingCareprofile