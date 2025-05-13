import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import NursingHomeCareList from "../../components/list/NursingHomeCareList";
import SearchDental from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "Nursing Home Care | " + appname,
};

function Page() {
  return (
    <>
      <LayoutAppBar
        title="Nursing Home Care"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/nursing-home-care"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        <SearchDental title={"Nursing Home Care"}/>
        <div className="container mx-auto px-2">
          <NursingHomeCareList nextPage={1} />
        </div>
      </div>
    </>
  );
}

export default Page;
