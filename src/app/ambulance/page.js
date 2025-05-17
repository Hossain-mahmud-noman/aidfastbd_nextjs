import { appname, map_key } from "../../utils/constants";
import LayoutAppBar from "../../components/LayoutAppBar";
import SearchAmbulance from "../../components/search/SearchAmbulance";
import { FaArrowLeft } from "react-icons/fa";
import AmbulanceList from "../../components/list/AmbulanceList";
export const metadata = {
  title: "Ambulances | " + appname,
};

async function page() {

  return (
    <>
      <LayoutAppBar route="/ambulance" leadingIcon={<FaArrowLeft className="h-5 w-5" />} title="Ambulances"  api_key={map_key} />
      <div style={{ insetBlockEnd: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-20">
        <SearchAmbulance />
        <div className="aid-container mx-auto px-2">
          <AmbulanceList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default page