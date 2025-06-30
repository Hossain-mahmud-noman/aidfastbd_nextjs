import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import { FaArrowLeft } from "react-icons/fa";
import HearingCareCenterDataLoad from "../../components/dataLoad/HearingCareCenterDataLoad";

export const metadata = {
  title: "Hearing Care Center | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container">
          <HearingCareCenterDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
