import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import DentalDataLoad from "../../components/dataLoad/DentalDataLoad";
import { FaArrowLeft } from "react-icons/fa";

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
