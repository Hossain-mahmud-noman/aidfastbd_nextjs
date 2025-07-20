import React from "react";
import { appname } from "../../utils/constants";
import NursingCareList from "../../components/list/NursingCareList";

export const metadata = {
  title: "Nursing Home Care | " + appname,
};

function Page() {
  return (
    <>
      <div className=" pt-10" >
        <div className="aid-container">
          <NursingCareList />
        </div>
      </div>
    </>
  );
}

export default Page;
