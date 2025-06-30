import React from "react";

import { appname } from "../../utils/constants";
import PhysiotherapyCenterDataLoad from "../../components/dataLoad/PhysiotherapyCenterDataLoad";

export const metadata = {
  title: "Physiotherapy Center | " + appname,
  description: null,

};

function Page() {
  return (
    <>
      <div className=" pt-10">
        <div className="aid-container">
          <PhysiotherapyCenterDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
