
import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import EyeCareCenterDetails from "../../../components/eyeCareCenter/EyeCareCenterDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?genericServiceId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Eye Care Center Not Found" };
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
      url: `${frontend_url}/eye-care-center/${data.id}`,
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
    return <div className="p-8 text-center text-lg">Eye Care Center not found.</div>;
  }

  return <EyeCareCenterDetails data={data} />;
}



