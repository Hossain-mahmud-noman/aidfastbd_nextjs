'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import PharmacyProfileBasic from './pharmacy/PharmacyProfileBasic';
import PharmacyProfileInfo from './pharmacy/PharmacyProfileInfo';
import PharmacyProfileServices from './pharmacy/PharmacyProfileServices';
import PharmacyProfileDrugList from './pharmacy/PharmacyProfileDrugList';
import PharmacyProfileEquipments from './pharmacy/PharmacyProfileEquipments';
import { useAuth } from '../../context/AuthContext';

function PharmacyProfile() {
  const { token, user } = useAuth()
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    if (!user?.userId || !token) return;
    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllPharmacyList?userid=${user.userId}`, { headers: headerx });
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
    if (user && token) {
      getProfileData();
    }
  }, [user, token]);

  const tabs = [
    { label: 'Basic', content: <PharmacyProfileBasic getProfileData={getProfileData} data={profileData} user={user} token={token}></PharmacyProfileBasic> },
    { label: 'Info', content: <PharmacyProfileInfo getProfileData={getProfileData} data={profileData?.pharmacyAdditionalInfo} user={user} token={token}></PharmacyProfileInfo> },
    { label: 'Services', content: <PharmacyProfileServices getProfileData={getProfileData} data={profileData?.pharmacyOtherInfo} user={user} token={token}></PharmacyProfileServices> },
    { label: 'Drug List', content: <PharmacyProfileDrugList pharmacyUserId={profileData?.id} getProfileData={getProfileData} data={profileData?.pharmacyDrugEquipment?.filter(item => item.type === 'Drug')} user={user} token={token}></PharmacyProfileDrugList> },
    { label: 'Medical Equipments', content: <PharmacyProfileEquipments getProfileData={getProfileData} data={profileData?.pharmacyDrugEquipment?.filter(item => item.type === 'Equipments')} user={user} token={token}></PharmacyProfileEquipments> },
  ];

  return (
    <div >
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default PharmacyProfile