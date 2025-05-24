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
      <LayoutAppBar
        title="Eye Care Center"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/eye-care-center"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        <div className="aid-container mx-auto px-2">
          <EyeCareCenterDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
