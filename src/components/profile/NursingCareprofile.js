'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import NursingCareProfileInfo from './nursingCareProfile/NursingCareProfileInfo';
import NursingCareProfileBasic from './nursingCareProfile/NursingCareProfileBasic';
import NursingCareProfileDoctors from './nursingCareProfile/NursingCareProfileDoctors';
import NursingCareProfileServices from './nursingCareProfile/NursingCareProfileServices';


function NursingCareprofile({ token, user }) {
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=6&userId=${user.id}`, { headers: headerx });

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
    { label: 'Basic', content: <NursingCareProfileBasic data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <NursingCareProfileInfo id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token}/> },
    { label: 'Doctors', content: <NursingCareProfileDoctors id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token}/> },
    { label: 'Services', content: <NursingCareProfileServices data={profileData?.genericServiceDetails} user={user} token={token}/> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default NursingCareprofile