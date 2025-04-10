import { appname, base_endpoint, headerx } from '../../../utils/constants';
import React from 'react'
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import PharmacyProfile from '../../../components/profile/PharmacyProfile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Pharmacy Profile | " + appname,
};



// Function to check if the user is logged in
const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;


    let data = null;
    let isRegister=false;
    if (user !== null) {
        headerx['Authorization'] = `Bearer ${tokenCookie}`;
        try {
            const res = await fetch(`${base_endpoint}/GeneralInformation/GetUserProfileInfo?userId=${user.id}`, { headers: headerx });
            data = await res.json();
            isRegister=data.isPharmacyProfile;
        } catch (err) {

        }
    }

    return { token: tokenCookie, user: user,isRegister:isRegister };

};


async function Page() {

    const { token, user,isRegister } = await checkLogin();
    // If no user, redirect to login
    if (!user) {
        redirect('/login');
    }




    return (
        <>
            <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Pharmacy Profile' ></AppBar>
            <div className="pt-16">
                <PharmacyProfile isRegister={isRegister} token={token} user={user}></PharmacyProfile>
            </div>

        </>
    )
}

export default Page