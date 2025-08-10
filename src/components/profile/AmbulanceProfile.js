'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import AmbulanceProfileBasic from './ambulance/AmbulanceProfileBasic';
import AmbulanceProfileInfo from './ambulance/AmbulanceProfileInfo';
import AmbulanceProfileOther from './ambulance/AmbulanceProfileOther';
import AmbulanceProfileDriver from './ambulance/AmbulanceProfileDriver';
import AmbulanceProfileFacilities from './ambulance/AmbulanceProfileFacilities';
import { useAuth } from '../../context/AuthContext';

function AmbulanceProfile() {
  const { token, user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllAmbulanceList?userid=${user.userId}`, { headers: headerx });

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
    { label: 'Basic', content: <AmbulanceProfileBasic getProfileData={getProfileData} data={profileData} token={token} user={user} /> },
    { label: 'Info', content: <AmbulanceProfileInfo getProfileData={getProfileData} data={profileData?.ambulanceAbout} token={token} user={user} /> },
    { label: 'Driver', content: <AmbulanceProfileDriver getProfileData={getProfileData} data={profileData?.ambulanceDriverInfo} token={token} user={user} /> },
    { label: 'Facilities', content: <AmbulanceProfileFacilities getProfileData={getProfileData} data={profileData?.ambulanceFacility} token={token} user={user} /> },
    { label: 'Other Services', content: <AmbulanceProfileOther getProfileData={getProfileData} data={profileData?.ambulanceOtherFacility} token={token} user={user} /> },

  ];
  return (
    <div className='aid-container'>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default AmbulanceProfile