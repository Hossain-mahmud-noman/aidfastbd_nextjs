'use client';

import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import { headerx } from '../../utils/constants';
import DoctorProfileInfo from './doctor/DoctorProfileInfo';
import DoctorProfileBasic from './doctor/DoctorProfileBasic';
import DoctorProfileChamber from './doctor/DoctorProfileChamber';
import DoctorProfileExperience from './doctor/DoctorProfileExperience';


function DoctorProfile({ token, user }) {

   const [profileData, setProfileData] = useState(null);

   const getProfileData = async () => {

      headerx['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetDoctorInfoList?userid=${user.id}`, { headers: headerx });

      const data = await res.json();
      if (res.status == 200) {

         if (data[0] !== null) {
            setProfileData(data[0]);
         }
      } else if (res.status === 401) {
         window.location.href = "/login";
      } else {
         setProfileData(null);
      }

   }


   useEffect(() => {
      getProfileData();
   }, [token]);



   const tabs = [
      { label: 'Basic', content: <DoctorProfileBasic user={user} token={token} data={profileData}></DoctorProfileBasic> },
      { label: 'Info', content: <DoctorProfileInfo user={user} token={token} data={profileData?.doctorAdditionalInfo}></DoctorProfileInfo> },
      { label: 'Chamber', content: <DoctorProfileChamber user={user} token={token} data={profileData?.chamberInformation}></DoctorProfileChamber> },
      { label: 'Experience', content: <DoctorProfileExperience user={user} token={token} data={profileData?.doctorExperiencelInfo}></DoctorProfileExperience> },
   ];

   return (
      <div>
         <TabBar tabs={tabs}></TabBar>
      </div>
   )
}

export default DoctorProfile