import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import PhysiotherapyCenterList from "../../components/list/PhysiotherapyCenterList";
import SearchDental from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "Physiotherapy Center | " + appname,
  description: null,

};

function Page() {
  return (
    <>
      <LayoutAppBar
        title="Physiotherapy Center"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/physiotherapy-center"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        {/* Have to work on this search */}
        <SearchDental title={"Physiotherapy Center"}/>
        <div className="container mx-auto px-2">
          <PhysiotherapyCenterList nextPage={1} />
        </div>
      </div>
    </>
  );
}

export default Page;
