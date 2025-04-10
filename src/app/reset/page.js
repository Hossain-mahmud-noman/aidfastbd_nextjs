import React from 'react'
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import ResetForm from '../../components/forms/ResetForm';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { appname } from '../../utils/constants';

export const metadata = {
  title: "Reset Password | " + appname,
};


// Function to check if the user is logged in
const checkLogin = () => {
  const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
  const userCookie = cookies().get('user')?.value; // Retrieve user cookie

  const user = userCookie ? JSON.parse(userCookie) : null; // Safely parse user cookie
  return { token: tokenCookie, user };
};

async function page() {

  const { token, user } = checkLogin();
  // If no user, redirect to login
  if (!user) {
    redirect('/login');
  }

  return (

    <>
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Reset Password' ></AppBar>
      <div className='pt-16'>
        <ResetForm user={user} ></ResetForm>
      </div>
    </>

  )
}

export default page