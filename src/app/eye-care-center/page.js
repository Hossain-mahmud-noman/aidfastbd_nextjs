import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import { FaArrowLeft } from "react-icons/fa";
import EyeCareCenterDataLoad from "../../components/dataLoad/EyeCareCenterDataLoad";

export const metadata = {
  title: "Eye Care Center | " + appname,
};

function Page() {
  return (
    <>
      <div
        className=" pt-10" >
        <div className="aid-container mx-auto px-2">
          <EyeCareCenterDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
