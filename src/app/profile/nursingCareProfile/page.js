import { appname } from '../../../utils/constants';
import React from 'react'
import NursingCareprofile from '../../../components/profile/NursingCareprofile';

export const metadata = {
   title: "Eye Care Center Profile | " + appname,
};



async function Page() {

   return (
      <>
         <div className="py-10">
            <NursingCareprofile  />
         </div>
      </>
   )
}

export default Page