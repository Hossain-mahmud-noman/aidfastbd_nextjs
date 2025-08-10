import { appname } from '../../../utils/constants';
import React from 'react'
import EyeCareprofile from '../../../components/profile/EyeCareprofile';

export const metadata = {
   title: "Eye Care Center Profile | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <EyeCareprofile  />
         </div>
      </>
   )
}

export default Page