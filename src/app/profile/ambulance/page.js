import { appname } from '../../../utils/constants';
import React from 'react'
import { cookies } from 'next/headers';
import AmbulanceProfile from '../../../components/profile/AmbulanceProfile'
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Ambulance Profile | " + appname,
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
            <div className="py-10 aid-container">
                <AmbulanceProfile token={token} user={user}></AmbulanceProfile>
            </div>

        </>
    )
}

export default Page