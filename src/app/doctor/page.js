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
      <LayoutAppBar route="/doctor" api_key={map_key}></LayoutAppBar>
      <div style={{ paddingBottom: "70px" }} className="font-[family-name:var(--font-geist-sans)] pt-20">
        <SearchDoctor specialityData={speciality}></SearchDoctor>
        <div className="container mx-auto px-2">
          {/* <div id="ssr_grid" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {data.map((d) => (
              <DoctorCard key={d.id} doctor={d}></DoctorCard>
            ))}
          </div>

          <DoctorList nextPage={page} location={location}></DoctorList> */}

          <DoctorList nextPage={1} ></DoctorList>
        </div>
        <BottomNavigation active="/doctor"></BottomNavigation>
      </div>
    </>

  )
}

export default DoctorPage