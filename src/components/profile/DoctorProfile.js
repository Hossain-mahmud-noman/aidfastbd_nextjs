'use client';

import React, { useEffect, useState } from 'react'
import TabBar from '../Tabbar';
import { headerx } from '../../utils/constants';
import DoctorProfileInfo from './doctor/DoctorProfileInfo';
import DoctorProfileBasic from './doctor/DoctorProfileBasic';
import DoctorProfileChamber from './doctor/DoctorProfileChamber';
import DoctorProfileExperience from './doctor/DoctorProfileExperience';
import { useAuth } from '../../context/AuthContext';

function DoctorProfile() {

   const [profileData, setProfileData] = useState(null);
   const { user, token } = useAuth()

   const getProfileData = async () => {
      if (!user?.userId || !token) return;

      const headers = {
         ...headerx,
         'Authorization': `Bearer ${token}`
      };

      try {
         const res = await fetch(
            `https://api.aidfastbd.com/api/GeneralInformation/GetDoctorInfoList?userid=${user.userId}`,
            { headers }
         );

         if (res.status === 401) {
            window.location.href = "/login";
            return;
         }

         if (res.ok) {
            const data = await res.json();
            setProfileData(data[0] || null);
         } else {
            setProfileData(null);
         }
      } catch (error) {
         console.error("Failed to fetch profile:", error);
         setProfileData(null);
      }
   };

   useEffect(() => {
      if (user && token) {
         getProfileData();
      }
   }, [user, token]);


   const tabs = [
      { label: 'Basic', content: <DoctorProfileBasic user={user} token={token} data={profileData} refreshProfile={getProfileData} /> },
      { label: 'Info', content: <DoctorProfileInfo user={user} token={token} data={profileData?.doctorAdditionalInfo} refreshProfile={getProfileData} /> },
      { label: 'Chamber', content: <DoctorProfileChamber user={user} token={token} data={profileData?.chamberInformation} refreshProfile={getProfileData} /> },
      { label: 'Experience', content: <DoctorProfileExperience user={user} token={token} data={profileData?.doctorExperiencelInfo} refreshProfile={getProfileData} /> },
   ];

   return (
      <div>
         <TabBar tabs={tabs} />
      </div>
   )
}

export default DoctorProfile