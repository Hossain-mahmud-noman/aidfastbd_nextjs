
import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import DoctorHomeVisitDetails from "../../../components/doctorHomeVisit/DoctorHomeVisit";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?serviceType=7&genericServiceId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Doctor Home Visit Not Found" };
  }

  const profile = data?.profileImageUrl
    ? image_base_endpoint + data?.profileImageUrl
    : "/images/doctor.jpg";


  return {
    title: `${data?.name} | ${appname}`,
    description: `${data.name ?? ""} ${data?.location ?? ""}`.slice(0, 150),
    openGraph: {
      title: `${data?.name} | ${appname}`,
      description: `${data?.name ?? ""} ${data?.location ?? ""}`,
      images: [profile],
      url: `${frontend_url}/doctor-home-visit/${data.id}`,
    },
  };
}

export default async function DoctorPage({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?genericServiceId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg">Doctor Home Visit not found.</div>;
  }

  return <DoctorHomeVisitDetails data={data} url={`${base_endpoint}/GeneralInformation/GetAllGenericServiceList?genericServiceId=${params.slug}`} />;
}


