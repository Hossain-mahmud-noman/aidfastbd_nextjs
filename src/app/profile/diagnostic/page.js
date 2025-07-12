import { appname } from '../../../utils/constants';
import React from 'react'
import DiagnosticProfile from '../../../components/profile/DiagnosticProfile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export const metadata = {
    title: "Diagonstic Center & Hospital Profile | " + appname,
};



const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; 
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
                <DiagnosticProfile token={token} user={user}></DiagnosticProfile>
            </div>

        </>
    )
}

export default Page