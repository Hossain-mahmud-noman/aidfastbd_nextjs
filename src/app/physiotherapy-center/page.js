import React from "react";

import { appname } from "../../utils/constants";

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
          <PhysioList />
        </div>
      </div>
    </>
  );
}

export default Page;
