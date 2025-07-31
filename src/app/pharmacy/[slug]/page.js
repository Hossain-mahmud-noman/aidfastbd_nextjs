

import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
// import BloodDetails from "../../../components/blood/BloodDetails";
import PharmacyDetails from "../../../components/pharmacy/PharmacyDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=1&pageSize=1&pharmacyInformationId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Pharmacy Not Found" };
  }


  const defaultImageUrl = "/images/logo.png";
  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;
  const cover = data?.coverImageUrl == null || data?.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.coverImageUrl;


  return {
    title: `${data?.name} | ${appname}`,
    description: `${data.name ?? ""} ${data?.location ?? ""}`.slice(0, 150),
    openGraph: {
      title: `${data?.name} | ${appname}`,
      description: `${data?.name ?? ""} ${data?.location ?? ""}`,
      images: [profile],
      url: `${frontend_url}/pharmacy/${data.userId}`,
    },
  };
}

export default async function DoctorPage({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=1&pageSize=1&pharmacyInformationId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg">Pharmacy not found.</div>;
  }

  return <PharmacyDetails data={data} userId={params.slug} />;
}



