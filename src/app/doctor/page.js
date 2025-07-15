import { appname, base_endpoint, } from "../../utils/constants";
import DoctorList from '../../components/list/DoctorList';
import DoctorCategory from '../../components/category/DoctorCategory.js'
import SearchDoctor from "../../components/search/SearchDoctor";
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
      <div className="aid-container pt-10">
        <DoctorCategory specialityData={speciality} />
        <SearchDoctor specialityData={speciality} />
        <DoctorList nextPage={1} />
      </div>
    </>
  )
}

export default DoctorPage