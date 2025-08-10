import { appname } from '../../../utils/constants';
import React from 'react'
import DrugProfile from '../../../components/profile/Drugprofile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


async function Page() {

   return (
      <>
         <div className="py-10">
            <DrugProfile />
         </div>
      </>
   )
}

export default Page