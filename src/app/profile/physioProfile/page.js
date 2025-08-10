import { appname } from '../../../utils/constants';
import React from 'react'
import Physioprofile from '../../../components/profile/Physioprofile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <Physioprofile />
         </div>
      </>
   )
}

export default Page