import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";

import { FaArrowLeft } from "react-icons/fa";
import DrugDeAddictionDataLoad from "../../components/dataLoad/DrugDeAddictionDataLoad";

export const metadata = {
  title: "Drug De-Addiction Center | " + appname,
};


function Page() {
  return (
    <>
      <LayoutAppBar
        title="Drug De-Addiction Center"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/drug-de-addiction"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        <div className="aid-container">
          <DrugDeAddictionDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
