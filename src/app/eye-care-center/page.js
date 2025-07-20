import React from "react";
import { appname } from "../../utils/constants";
import EyeCareList from "../../components/list/EyeCareList";
import SearchEyeCare from "../../components/search/SearchEyeCare";

export const metadata = {
  title: "Eye Care Center | " + appname,
};

function Page() {
  return (
    <>
      <div
        className=" pt-10" >
        <div className="aid-container mx-auto px-2">
          <SearchEyeCare />
          <EyeCareList />
        </div>
      </div>
    </>
  );
}

export default Page;
