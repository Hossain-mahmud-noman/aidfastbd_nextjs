import React from "react";
import { appname } from "../../utils/constants";
import PractitionerList from "../../components/list/practitionerList";
import SearchPractitioner from "../../components/search/SearchPractitioner";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container ">
          <SearchPractitioner />
          <PractitionerList />
        </div>
      </div>
    </>
  );
}

export default Page;
