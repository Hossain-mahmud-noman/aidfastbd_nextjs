import { appname } from '../../../utils/constants';
import React from 'react'
import BloodProfile from '../../../components/profile/BloodProfile';

export const metadata = {
   title: "Blood Bank Profile | " + appname,
};



async function Page() {

   return (
      <>
         <div className="py-10">
            <BloodProfile />
         </div>
      </>
   )
}

export default Page