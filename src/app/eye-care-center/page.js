import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import EyeCareCenterList from "../../components/list/EyeCareCenterList";
import SearchDental from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

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
        <SearchDental></SearchDental>
        <div className="container mx-auto px-2">
          <EyeCareCenterList nextPage={1} />
        </div>
      </div>
    </>
  );
}

export default Page;
