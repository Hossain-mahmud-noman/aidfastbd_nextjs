import SearchBlood from "../../components/search/SearchBlood";
import { appname } from "../../utils/constants";
import BloodList from "../../components/list/BloodList";


export const metadata = {
  title: "Blood Bank Clubs | " + appname,
};


async function page() {

  return (
    <>
      <div className="">
        <div className="aid-container mx-auto">
          <BloodList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default page