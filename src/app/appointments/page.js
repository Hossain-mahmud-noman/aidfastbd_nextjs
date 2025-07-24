import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appname } from "../../utils/constants";
import AppointmentClient from './AppointmentClient'
export const metadata = {
  title: "Appointments | " + appname,
};

async function page() {
  const tokenCookie = cookies().get("token")?.value ?? "";
  const userCookie = cookies().get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!tokenCookie || !user) {
    redirect("/login");
  }

  return (
    <div className="pt-16 pl-2 pr-2 mt-3">
      <AppointmentClient token={tokenCookie} userId={user.id} />
    </div>
  );
}

export default page;
