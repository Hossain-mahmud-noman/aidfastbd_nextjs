import { appname } from '../../../utils/constants';
import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Physioprofile from '../../../components/profile/Physioprofile';

export const metadata = {
   title: "Dental Clinic Profile | " + appname,
};


const checkLogin = async () => {
   const tokenCookie = cookies().get('token')?.value ?? "";
   const userCookie = cookies().get('user')?.value;
   const user = userCookie ? JSON.parse(userCookie) : null;
   return { token: tokenCookie, user: user };

};


async function Page() {

   const { token, user } = await checkLogin();
   if (!user) {
      redirect('/login');
   }

   return (
      <>
         <div className="py-10">
            <Physioprofile token={token} user={user} />
         </div>
      </>
   )
}

export default Page