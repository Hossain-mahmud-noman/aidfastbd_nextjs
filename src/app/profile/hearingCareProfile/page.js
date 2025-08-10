import { appname } from '../../../utils/constants';
import React from 'react'
import HearingCareprofile from '../../../components/profile/HearingCareprofile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


async function Page() {


   return (
      <>
         <div className="py-10">
            <HearingCareprofile  />
         </div>
      </>
   )
}

export default Page