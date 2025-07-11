import { appname, base_endpoint, headerx } from '../../../utils/constants';
import React from 'react'
import PharmacyProfile from '../../../components/profile/PharmacyProfile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Pharmacy Profile | " + appname,
};

const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; 
    const userCookie = cookies().get('user')?.value ?? ""; 
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
    if (!user) {
        redirect('/login');
    }

    return (
        <>
            <div className="py-10 ">
                <PharmacyProfile isRegister={isRegister} token={token} user={user} />
            </div>

        </>
    )
}

export default Page