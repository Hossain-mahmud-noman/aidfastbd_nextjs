import SearchDoctor from "../../components/search/SearchDoctor";
import { appname, base_endpoint, } from "../../utils/constants";
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
      <div className="font-[family-name:var(--font-geist-sans)] pt-10">
        <div className="aid-container">
          <SearchDoctor specialityData={speciality} />
        </div>
        <div className="aid-container mx-auto px-2">
          <DoctorList nextPage={1} />
        </div>
      </div>
    </>
  )
}

export default DoctorPage