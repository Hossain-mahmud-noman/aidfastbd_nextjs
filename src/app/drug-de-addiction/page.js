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
      <div className="font-[family-name:var(--font-geist-sans)] pt-10">
        <div className="aid-container">
          <DrugDeAddictionDataLoad />
        </div>
      </div>
    </>
  );
}

export default Page;
