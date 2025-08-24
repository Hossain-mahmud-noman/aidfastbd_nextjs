import React from "react";
import { appname } from "../../utils/constants";
import DoctorHomeVisitList from "../../components/list/DoctorHomeVisitList";
import SearchDoctorHomeVisit from "../../components/search/SearchDoctorHomeVisit";

export const metadata = {
  title: "Doctor Home Visit | " + appname,
};

function Page() {
  return (
    <>
      <div className="pt-10" >
        <div className="aid-container ">
          {/* <SearchDoctorHomeVisit /> */}
          <DoctorHomeVisitList />
        </div>
      </div>
    </>
  );
}

export default Page;
