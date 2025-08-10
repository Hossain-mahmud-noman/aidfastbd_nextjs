import { appname } from '../../../utils/constants';
import React from 'react'
import PharmacyProfile from '../../../components/profile/PharmacyProfile';
export const metadata = {
   title: "Pharmacy Profile | " + appname,
};



async function Page() {
   return (
      <>
         <div className="py-10 ">
            <PharmacyProfile />
         </div>
      </>
   )
}

export default Page