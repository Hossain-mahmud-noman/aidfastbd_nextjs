import { appname } from '../../../utils/constants';
import React from 'react'
import DoctorHomeVisitProfile from '../../../components/profile/DoctorHomeVisitProfile';

export const metadata = {
   title: "Doctor Home Visit | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <DoctorHomeVisitProfile />
         </div>
      </>
   )
}

export default Page