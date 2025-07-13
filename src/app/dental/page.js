import React from "react";
import { appname } from "../../utils/constants";
import DentalDataLoad from "../../components/dataLoad/DentalDataLoad";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container ">
          <DentalDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
