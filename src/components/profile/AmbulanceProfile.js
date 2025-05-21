'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import AmbulanceProfileBasic from './ambulance/AmbulanceProfileBasic';
import AmbulanceProfileInfo from './ambulance/AmbulanceProfileInfo';
import AmbulanceProfileOther from './ambulance/AmbulanceProfileOther';
import AmbulanceProfileDriver from './ambulance/AmbulanceProfileDriver';
import AmbulanceProfileFacilities from './ambulance/AmbulanceProfileFacilities';

function AmbulanceProfile({ token, user }) {
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {

    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllAmbulanceList?userid=${user.id}`, { headers: headerx });

    const data = await res.json();
    if (res.status == 200) {
      if (data.data[0] !== null) {
        setProfileData(data.data[0]);
      }
    } else if (res.status === 401) {
      window.location.href = "/login";
    }

    //
  }

  useEffect(() => {
    getProfileData();
  }, [token]);

  const tabs = [
    { label: 'Basic', content: <AmbulanceProfileBasic data={profileData} token={token} user={user} /> },
    { label: 'Info', content: <AmbulanceProfileInfo data={profileData?.ambulanceAbout} token={token} user={user}></AmbulanceProfileInfo> },
    { label: 'Driver', content: <AmbulanceProfileDriver data={profileData?.ambulanceDriverInfo} token={token} user={user}></AmbulanceProfileDriver> },
    { label: 'Facilities', content: <AmbulanceProfileFacilities data={profileData?.ambulanceFacility} token={token} user={user}></AmbulanceProfileFacilities> },
    { label: 'Other Services', content: <AmbulanceProfileOther data={profileData?.ambulanceOtherFacility} token={token} user={user}></AmbulanceProfileOther> },

  ];
  return (
    <div className='aid-container'>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default AmbulanceProfile