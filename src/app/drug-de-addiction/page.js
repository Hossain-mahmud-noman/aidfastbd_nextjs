import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import DrugDeAddictionList from "../../components/list/DrugDeAddictionList";
import SearchDental from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

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
        {/* Have to work on this search */}
        <SearchDental />
        <div className="container mx-auto px-2">
          <DrugDeAddictionList nextPage={1} />
        </div>
      </div>
    </>
  );
}

export default Page;
