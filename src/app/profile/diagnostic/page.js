import { appname } from '../../../utils/constants';
import React from 'react'
import DiagnosticProfile from '../../../components/profile/DiagnosticProfile';

export const metadata = {
   title: "Diagonstic Center & Hospital Profile | " + appname,
};



async function Page() {
   return (
      <>
         <div className="py-10">
            <DiagnosticProfile />
         </div>
      </>
   )
}

export default Page