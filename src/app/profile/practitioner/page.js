import { appname } from '../../../utils/constants';
import React from 'react'
import PractitionerProfile from '../../../components/profile/PractitionerProfile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <PractitionerProfile />
         </div>

      </>
   )
}

export default Page