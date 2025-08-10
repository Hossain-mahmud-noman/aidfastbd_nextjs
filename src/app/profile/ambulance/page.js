import { appname } from '../../../utils/constants';
import React from 'react'
import AmbulanceProfile from '../../../components/profile/AmbulanceProfile'

export const metadata = {
   title: "Ambulance Profile | " + appname,
};

async function Page() {

   return (
      <>
         <div className="py-10 aid-container">
            <AmbulanceProfile />
         </div>

      </>
   )
}

export default Page