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
      <LayoutAppBar
        title="Hearing Care Center"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/hearing-care-center"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        <div className="aid-container">
          <HearingCareCenterDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
