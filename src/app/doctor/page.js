import BottomNavigation from "../../components/BottomNavigation"
import SearchDoctor from "../../components/search/SearchDoctor";
import { appname, base_endpoint, map_key } from "../../utils/constants";
import LayoutAppBar from "../../components/LayoutAppBar";
import DoctorList from '../../components/list/DoctorList';

export const metadata = {
  title: "Doctors | " + appname,
};

const fetchSpecialityData = async () => {
  try {
    const res = await fetch(`${base_endpoint}/Dropdown/GetDropDownList?type=Speciality`, { next: { revalidate: 3600 } });
    if (res.status) {
      const data = await res.json();
      return data;
    } return [];

  } catch (err) {
    return [];
  }
}

async function DoctorPage() {
  const speciality = await fetchSpecialityData();
  return (
    <>
      {/* <LayoutAppBar route="/doctor" api_key={map_key} /> */}
      <div  className="font-[family-name:var(--font-geist-sans)] pt-10">
        <SearchDoctor specialityData={speciality} />
        <div className="aid-container mx-auto px-2">
          <DoctorList nextPage={1}/>
        </div>
        {/* <BottomNavigation active="/doctor" /> */}
      </div>
    </>
  )
}

export default DoctorPage