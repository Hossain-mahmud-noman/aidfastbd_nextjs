'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import DrugProfileBasic from './drug/DrugProfileBasic';
import DrugProfileInfo from './drug/DrugProfileInfo';
import DrugProfileServices from './drug/DrugProfileServices';
import DrugProfileDoctors from './drug/DrugProfileDoctors';


function DrugProfile({ token, user }) {
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=2&userId=${user.id}`, { headers: headerx });

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
    { label: 'Basic', content: <DrugProfileBasic data={profileData} user={user} token={token} /> },
    { label: 'Info', content: <DrugProfileInfo data={profileData?.genericServiceInfos} user={user} token={token}/> },
    { label: 'Doctors', content: <DrugProfileDoctors data={profileData?.genericServiceDoctors} user={user} token={token}/> },
    { label: 'Services', content: <DrugProfileServices data={profileData?.genericServiceDetails} user={user} token={token}/> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} />
    </div>
  )
}

export default DrugProfile