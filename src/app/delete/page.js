import { appname, base_endpoint } from "../../utils/constants";
import React from 'react'
import AccountDeletionForm from '../../components/AccountDeletionForm'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const metadata = {
    title: "Account Deletion Request | " + appname,
};

// Function to check if the user is logged in
const checkLogin = async () => {
    const tokenCookie = cookies().get('token')?.value ?? ""; // Retrieve token cookie
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;
    return { token: tokenCookie, user: user };

};

async function Page() {

    const { user, token } = await checkLogin();
    // If no user, redirect to login
    if (!user) {
        redirect('/login');
    }

    return (
        <AccountDeletionForm token={token}></AccountDeletionForm>
    )
}

export default Page