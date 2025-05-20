import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import DentalDataLoad from "../../components/dataLoad/DentalDataLoad";
import DentalList from "../../components/list/DentalList";
import SearchDental from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <LayoutAppBar
        title="Dental Clinics"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/dental"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        {/* <SearchDental /> */}
        <div className="aid-container ">
          {/* <DentalList nextPage={1} /> */}
          <DentalDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
