import { appname } from '../../../utils/constants';
import React from 'react'
import DoctorProfile from '../../../components/profile/DoctorProfile';

export const metadata = {
   title: "Doctor Profile | " + appname,
};


async function Page() {
   return (
      <div className="py-10">
         <DoctorProfile />
      </div>
   )
}

export default Page