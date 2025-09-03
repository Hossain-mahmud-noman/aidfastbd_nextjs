import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { appname } from '../../../utils/constants';
import ProfileCard from '../../../components/card/ProfileCard'
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from 'react-icons/fa6';

export const metadata = {
   title: "General Profile | " + appname,
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
      user && (
         <div className="pb-10">
            <div className='mb-6'>
               <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title="Profile" />
            </div>
            <ProfileCard token={token} user={user} />
         </div>
      )
   )
}

export default Page