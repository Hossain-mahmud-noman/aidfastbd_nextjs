import React from "react";
import { appname } from "../../utils/constants";
import DentalDataLoad from "../../components/dataLoad/DentalDataLoad";
import DentalList from "../../components/list/DentalList";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container ">
          {/* <DentalDataLoad /> */}
          <DentalList />
        </div>
      </div>
    </>
  );
}

export default Page;
