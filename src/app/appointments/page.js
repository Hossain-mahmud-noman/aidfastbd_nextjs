import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appname } from "../../utils/constants";
import AppointmentClient from './AppointmentClient'
// import { useAuth } from "/context/AuthContext";
import { useAuth } from "../../context/AuthContext";
export const metadata = {
  title: "Appointments | " + appname,
};

async function page() {
  const tokenCookie = cookies().get("token")?.value ?? "";
  const { user } = useAuth;
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="pt-16 pl-2 pr-2 mt-3">
      <AppointmentClient token={tokenCookie} />
    </div>
  );
}

export default page;
