import { appname, headerx } from '../../../utils/constants';
import React from 'react'
import DoctorProfile from '../../../components/profile/DoctorProfile';
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Doctor Profile | " + appname,
};



// Function to check if the user is logged in
const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;
    return { token: tokenCookie, user: user };

};


async function Page() {

    const { token, user } = await checkLogin();
    // If no user, redirect to login
    if (!user) {
        redirect('/login');
    }




    return (
        <>
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Doctor Profile' ></AppBar>
            <div className="pt-16">
                <DoctorProfile token={token} user={user}></DoctorProfile>
            </div>

        </>
    )
}

export default Page