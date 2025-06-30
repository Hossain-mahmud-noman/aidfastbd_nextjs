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
      <div className="pt-10">
        <SearchBlood />
        <div className="aid-container mx-auto">
          <BloodList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default page