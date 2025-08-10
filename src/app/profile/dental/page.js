import { appname } from '../../../utils/constants';
import React from 'react'
import Dentalprofile from '../../../components/profile/Dentalprofile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <Dentalprofile />
         </div>

      </>
   )
}

export default Page