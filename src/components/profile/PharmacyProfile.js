'use client';

import { headerx } from '../../utils/constants';
import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import PharmacyProfileBasic from './pharmacy/PharmacyProfileBasic';
import PharmacyProfileInfo from './pharmacy/PharmacyProfileInfo';
import PharmacyProfileServices from './pharmacy/PharmacyProfileServices';
import PharmacyProfileDrugList from './pharmacy/PharmacyProfileDrugList';
import PharmacyProfileEquipments from './pharmacy/PharmacyProfileEquipments';

function PharmacyProfile({ token, user, isRegister }) {

  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {

    headerx['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllPharmacyList?userid=${user.id}`, { headers: headerx });

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

    if (isRegister) {
      getProfileData();
    }
  }, [token]);

  const tabs = [
    { label: 'Basic', content: <PharmacyProfileBasic isRegister={isRegister} data={profileData} user={user} token={token}></PharmacyProfileBasic> },
    { label: 'Info', content: <PharmacyProfileInfo isRegister={isRegister} data={profileData?.pharmacyAdditionalInfo} user={user} token={token}></PharmacyProfileInfo> },
    { label: 'Services', content: <PharmacyProfileServices isRegister={isRegister} data={profileData?.pharmacyOtherInfo} user={user} token={token}></PharmacyProfileServices> },
    { label: 'Drug List', content: <PharmacyProfileDrugList pharmacyUserId={profileData?.id} isRegister={isRegister} data={profileData?.pharmacyDrugEquipment} user={user} token={token}></PharmacyProfileDrugList> },
    { label: 'Medical Equipments', content: <PharmacyProfileEquipments isRegister={isRegister} data={profileData?.pharmacyDrugEquipment} user={user} token={token}></PharmacyProfileEquipments> },

  ];

  return (
    <div >
      <TabBar tabs={tabs}></TabBar>
    </div>
  )
}

export default PharmacyProfile