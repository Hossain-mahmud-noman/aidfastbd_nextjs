import React from "react";
import { appname } from "../../utils/constants";
import AppointmentClient from './AppointmentClient'
export const metadata = {
  title: "Appointments | " + appname,
};

async function page() {

  return (
    <div className="pt-16 mt-3">
      <AppointmentClient  />
    </div>
  );
}

export default page;
