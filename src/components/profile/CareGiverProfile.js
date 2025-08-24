'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import CareGiverProfileBasic from './careGiver/CareGiverProfileBasic';
import CareGiverProfileInfo from './careGiver/CareGiverProfileInfo';
import CareGiverVisitServices from './careGiver/CareGiverVisitServices';
import CareGiverProfileDoctors from './careGiver/CareGiverProfileDoctors';
import { useAuth } from '../../context/AuthContext';


function CareGiverProfile() {
  const { token, user } = useAuth()
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=9&userId=${user.userId}`, { headers: headerx });

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
    { label: 'Basic', content: <CareGiverProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <CareGiverProfileInfo getProfileData={getProfileData} id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token} /> },
    { label: 'Doctors', content: <CareGiverProfileDoctors getProfileData={getProfileData} id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token} /> },
    { label: 'Services', content: <CareGiverVisitServices getProfileData={getProfileData} genericServiceId={profileData?.id} userId={profileData?.userId} data={profileData?.genericServiceDetails} token={token} /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default CareGiverProfile