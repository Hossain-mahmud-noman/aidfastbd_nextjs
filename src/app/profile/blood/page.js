import { appname } from '../../../utils/constants';
import React from 'react'
import BloodProfile from '../../../components/profile/BloodProfile';
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Blood Bank Profile | " + appname,
};


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
            <div className="py-10">
                <BloodProfile token={token} user={user}></BloodProfile>
            </div>

        </>
    )
}

export default Page