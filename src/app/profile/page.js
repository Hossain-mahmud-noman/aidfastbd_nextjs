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


// Function to check if the user is logged in
const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
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
    // If no user, redirect to login
    if (!user) {
        redirect('/login');
    }

    return (
        <>
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='My Profile' ></AppBar>
            <div className="pt-16">
                <ProfileMenu data={data}></ProfileMenu>
            </div>
        </>
    )
}

export default page