import React from 'react'
import ResetForm from '../../components/forms/ResetForm';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { appname } from '../../utils/constants';

export const metadata = {
  title: "Reset Password | " + appname,
};

const checkLogin = () => {
  const tokenCookie = cookies().get('token')?.value ?? ""; 
  const userCookie = cookies().get('user')?.value; 

  const user = userCookie ? JSON.parse(userCookie) : null; 
  return { token: tokenCookie, user };
};

async function page() {
  const { token, user } = checkLogin();
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <div className='py-10 aid-container'>
        <ResetForm user={user} ></ResetForm>
      </div>
    </>
  )
}

export default page