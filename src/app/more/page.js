
import MoreMenu from '../../components/MoreMenu';
import { appname } from "../../utils/constants";


export const metadata = {
  title: "More | " + appname,
};


async function page() {

  return (
    <>
      <div className="aid-container">
        <MoreMenu />
      </div>
    </>
  )
}

export default page