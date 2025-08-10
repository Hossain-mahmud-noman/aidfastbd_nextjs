'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import EyeCareProfileBasic from './eyeCareProfile/EyeCareProfileBasic';
import EyeCareProfileDoctors from './eyeCareProfile/EyeCareProfileDoctors';
import EyeCareProfileInfo from './eyeCareProfile/EyeCareProfileInfo';
import EyeCareProfileServices from './eyeCareProfile/EyeCareProfileServices';
import { useAuth } from '../../context/AuthContext';


function EyeCareprofile() {
  const { user, token } = useAuth()
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=5&userId=${user.userId}`, { headers: headerx });

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
    { label: 'Basic', content: <EyeCareProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <EyeCareProfileInfo getProfileData={getProfileData} id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token} /> },
    { label: 'Doctors', content: <EyeCareProfileDoctors getProfileData={getProfileData} id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token} /> },
    { label: 'Services', content: <EyeCareProfileServices getProfileData={getProfileData} genericServiceId={profileData?.id} userId={profileData?.userId} data={profileData?.genericServiceDetails} user={user} token={token} /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default EyeCareprofile