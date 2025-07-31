
import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import DoctorDetail from "../../../components/doctor/DoctorDetails"; 

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetDoctorInfoList?userid=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.[0];
  if (!data) {
    return { title: "Doctor Not Found" };
  }

  const profile = data.imageUrl
    ? image_base_endpoint + data.imageUrl
    : "/images/doctor.jpg";

  return {
    title: `Dr. ${data.firstName} ${data.lastName} | ${appname}`,
    description: `${data.doctorAdditionalInfo?.title ?? ""} ${data.doctorAdditionalInfo?.details ?? ""}`.slice(0, 150),
    openGraph: {
      title: `Dr. ${data.firstName} ${data.lastName} | ${appname}`,
      description: `${data.doctorAdditionalInfo?.title ?? ""} ${data.doctorAdditionalInfo?.details ?? ""}`,
      images: [profile],
      url: `${frontend_url}/doctor/${data.userId}`,
    },
  };
}

export default async function DoctorPage({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetDoctorInfoList?userid=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg">Doctor not found.</div>;
  }

  return <DoctorDetail data={data} UserId={params.slug} />;
}
