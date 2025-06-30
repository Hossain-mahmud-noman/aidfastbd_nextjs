import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import { FaArrowLeft } from "react-icons/fa";
import NursingCareHomeDataLoad from "../../components/dataLoad/NursingCareHomeDataLoad";

export const metadata = {
  title: "Nursing Home Care | " + appname,
};

function Page() {
  return (
    <>
      <div className=" pt-10" >
        <div className="aid-container">
          <NursingCareHomeDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
