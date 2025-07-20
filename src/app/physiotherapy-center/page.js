import React from "react";
import { appname } from "../../utils/constants";
import SearchPhysio from "../../components/search/SearchPhysio";
import PhysioList from "../../components/list/PhysioList";

export const metadata = {
  title: "Physiotherapy Center | " + appname,
  description: null,

};

function Page() {
  return (
    <>
      <div className=" pt-10">
        <div className="aid-container">
          <SearchPhysio />
          <PhysioList />
        </div>
      </div>
    </>
  );
}

export default Page;
