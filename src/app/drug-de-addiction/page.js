import React from "react";
import { appname } from "../../utils/constants";
import DeugList from "../../components/list/DeugList";

export const metadata = {
  title: "Drug De-Addiction Center | " + appname,
};


function Page() {
  return (
    <>
      <div className="font-[family-name:var(--font-geist-sans)] pt-10">
        <div className="aid-container">
          <DeugList />
        </div>
      </div>
    </>
  );
}

export default Page;
