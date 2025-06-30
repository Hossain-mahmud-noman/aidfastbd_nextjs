import { appname } from "../../utils/constants";
import SearchAmbulance from "../../components/search/SearchAmbulance";
import AmbulanceList from "../../components/list/AmbulanceList";
export const metadata = {
  title: "Ambulances | " + appname,
};

async function page() {
  return (
    <>
      <div  className=" pt-10">
        <SearchAmbulance />
        <div className="aid-container mx-auto px-2">
          <AmbulanceList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default page