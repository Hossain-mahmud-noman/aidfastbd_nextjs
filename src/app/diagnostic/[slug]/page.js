
import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import DiagnosticCenterDetails from "../../../components/diagnostickCenter/DiagnosticCenterDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?diagnosticCenterId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];
  if (!data) {
    return { title: "Diagnostic Not Found" };
  }

  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;

  return {
    title: `${data?.name}  | ${appname}`,
    description: `${data?.diagnosticCenterAdditionalInfo?.title ?? ""} ${data?.diagnosticCenterAdditionalInfo?.details ?? ""}`.slice(0, 150),
    openGraph: {
      title: `${data?.name}  | ${appname}`,
      description: `${data?.diagnosticCenterAdditionalInfo?.title ?? ""} ${data?.diagnosticCenterAdditionalInfo?.details ?? ""}`,
      images: [profile],
      url: `${frontend_url}/diagnostic/${data.userId}`,
    },
  };
}

export default async function DoctorPage({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?diagnosticCenterId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg">Diagnostic not found.</div>;
  }

  return <DiagnosticCenterDetails data={data} />;
}
