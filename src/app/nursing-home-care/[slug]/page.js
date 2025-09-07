

import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import NursingCareHomeDetails from "../../../components/nursingCareHomeDetails/NursingCareHomeDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?serviceType=6&userId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Nursing Home Care Not Found" };
  }

  const defaultImageUrl = "/images/dental.png";

  const profile = !data.profileImageUrl
    ? defaultImageUrl
    : image_base_endpoint + data.profileImageUrl;


  return {
    title: `${data?.name} | ${appname}`,
    description: `${data.name ?? ""} ${data?.location ?? ""}`.slice(0, 150),
    openGraph: {
      title: `${data?.name} | ${appname}`,
      description: `${data?.name ?? ""} ${data?.location ?? ""}`,
      images: [profile],
      url: `${frontend_url}/nursing-home-care/${data.userId}`,
    },
  };
}

export default async function NursingPage({ params }) {
  const res = await fetch(
    // `https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=6&userId=c2dd1982-96aa-4b25-a34a-08ddc94043c7`,
    `https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=6&userId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg">Nursing Home Center not found.</div>;
  }

  return <NursingCareHomeDetails data={data} url={`${base_endpoint}/GeneralInformation/GetAllGenericServiceList?serviceType=6&userId=${params.slug}`} />;
}

