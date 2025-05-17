import LayoutAppBar from "../../components/LayoutAppBar";
import SearchBlood from "../../components/search/SearchBlood";
import { FaArrowLeft } from "react-icons/fa";
import { appname, map_key } from "../../utils/constants";
import BloodList from "../../components/list/BloodList";


export const metadata = {
  title: "Blood Bank Clubs | " + appname,
};


async function page() {

  return (
    <>
      <LayoutAppBar route="/blood" leadingIcon={<FaArrowLeft className="h-5 w-5" />} title="Blood Bank" api_key={map_key} />
      <div style={{ insetBlockEnd: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-20">
        <SearchBlood />
        <div className="aid-container mx-auto">
          <BloodList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default page