import React from 'react'
import { appname } from "../../utils/constants";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayout from '../../components/panel/layout/DashboardLayout';
import Dashboard from '../../components/panel/dashboard/Dashboard';

export const metadata = {
  title: "Panel | " + appname,
};

// Function to check if the user is logged in
const checkPanelLogin = async () => {
  const tokenCookie = cookies().get('panel_token')?.value ?? ""; // Retrieve token cookie
  const is_adminCookie = cookies().get('panel_is_admin')?.value;

  return { token: tokenCookie, is_admin: is_adminCookie };

};

async function Page() {

  const { token, is_admin } = await checkPanelLogin();
  // If no user, redirect to login
  if (!token) {
    redirect('/panel/login');
  }

  return (
    <div>
      <DashboardLayout>
        <Dashboard></Dashboard>
      </DashboardLayout>

    </div>
  )
}

export default Page