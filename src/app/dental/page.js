import React from "react";
import LayoutAppBar from "../../components/LayoutAppBar";
import { appname, map_key } from "../../utils/constants";
import DentalList from "../../components/list/DentalList";
import SearchDental, {
  DentalSearchByName,
} from "../../components/search/SearchDental";
import { FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "Dentals | " + appname,
};

function Page() {
  return (
    <>
      <LayoutAppBar
        title="Dental Clinics"
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        route="/dental"
        api_key={map_key}
      />
      <div
        style={{ insetBlockEnd: "70px" }}
        className="font-[family-name:var(--font-geist-sans)] pt-20"
      >
        <SearchDental />
        {/* <DentalSearchByName nextPage={1} /> */}
        <div className="aid-container mx-auto px-2">
          <DentalList nextPage={1} />
        </div>
      </div>
    </>
  );
}

export default Page;
