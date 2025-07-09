import React from 'react'
import AppBar from '../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { appname, base_endpoint, headerx } from '../../utils/constants';
import ProfileMenu from '../../components/ProfileMenu';

export const metadata = {
  title: "My Profile | " + appname,
};

const checkLogin = async () => {
  const tokenCookie = cookies().get('token')?.value ?? "";
  const userCookie = cookies().get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  let data = null;
  if (user !== null) {
    headerx['Authorization'] = `Bearer ${tokenCookie}`;
    try {
      const res = await fetch(`${base_endpoint}/GeneralInformation/GetUserProfileInfo?userId=${user.id}`, { headers: headerx });
      data = await res.json();
    } catch (err) {
    }
  }

  return { token: tokenCookie, user: user, data: data };

};

async function page() {

  const { user, data } = await checkLogin();
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <div className="pt-10 aid-container">
        <ProfileMenu data={data}></ProfileMenu>
      </div>
    </>
  )
}

export default page