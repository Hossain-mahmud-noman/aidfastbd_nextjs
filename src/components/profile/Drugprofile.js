'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import DrugProfileBasic from './drug/DrugProfileBasic';
import DrugProfileInfo from './drug/DrugProfileInfo';
import DrugProfileServices from './drug/DrugProfileServices';
import DrugProfileDoctors from './drug/DrugProfileDoctors';
import { useAuth } from '../../context/AuthContext';


function DrugProfile() {
  const { token, user } = useAuth()
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=2&userId=${user.userId}`, { headers: headerx });

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
    if (user, token)
      getProfileData();
  }, [user, token]);


  const tabs = [
    { label: 'Basic', content: <DrugProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <DrugProfileInfo getProfileData={getProfileData} id={profileData?.id} data={profileData?.genericServiceInfos} user={user} token={token} /> },
    { label: 'Doctors', content: <DrugProfileDoctors getProfileData={getProfileData} id={profileData?.userId} data={profileData?.genericServiceDoctors} user={user} token={token} /> },
    { label: 'Services', content: <DrugProfileServices getProfileData={getProfileData} genericServiceId={profileData?.id} userId={profileData?.userId} data={profileData?.genericServiceDetails} user={user} token={token} /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default DrugProfile