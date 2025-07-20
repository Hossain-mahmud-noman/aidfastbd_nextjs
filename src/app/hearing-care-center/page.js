import React from "react";
import { appname } from "../../utils/constants";
import HearingCareList from "../../components/list/HearingCareList";

export const metadata = {
  title: "Hearing Care Center | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container">
          <HearingCareList />
        </div>
      </div>
    </>
  );
}

export default Page;
