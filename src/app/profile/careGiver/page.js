import { appname } from '../../../utils/constants';
import React from 'react'
import CareGiverProfile from '../../../components/profile/CareGiverProfile';

export const metadata = {
   title: "Care Giver Center | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <CareGiverProfile />
         </div>
      </>
   )
}

export default Page