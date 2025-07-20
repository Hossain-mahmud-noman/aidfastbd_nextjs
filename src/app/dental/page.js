import React from "react";
import { appname } from "../../utils/constants";
import DentalList from "../../components/list/DentalList";
import SearchDental from "../../components/search/SearchDental";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container ">
          <SearchDental />
          <DentalList />
        </div>
      </div>
    </>
  );
}

export default Page;
