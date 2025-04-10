'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import BloodProfileBasic from './blood/BloodProfileBasic';
import BloodProfileInfo from './blood/BloodProfileInfo';
import BloodProfileServices from './blood/BloodProfileServices';

function BloodProfile({ token, user }) {

  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {

    headerx['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllBloodBankList?userid=${user.id}`, { headers: headerx });

    const data = await res.json();
    if (res.status == 200) {
      if(data.data[0] !==null){
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
    { label: 'Basic', content: <BloodProfileBasic data={profileData} user={user} token={token}></BloodProfileBasic> },
    { label: 'Info', content: <BloodProfileInfo data={profileData?.bloodBankAdditionalInfo} user={user} token={token}></BloodProfileInfo> },
    { label: 'Services', content: <BloodProfileServices data={profileData?.bloodBankServices} user={user} token={token}></BloodProfileServices> },


  ];


  return (
    <div>
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default BloodProfile