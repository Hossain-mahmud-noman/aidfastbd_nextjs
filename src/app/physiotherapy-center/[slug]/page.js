

import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import PhysiotherapyCenterDetails from "../../../components/physiotherapyCenter/PhysiotherapyCenterDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?genericServiceId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Physiotherapy Center Not Found" };
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
      url: `${frontend_url}/physiotherapy-center/${data.id}`,
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
    return <div className="p-8 text-center text-lg">Physiotherapy Center not found.</div>;
  }

  return <PhysiotherapyCenterDetails data={data} />;
}







// "use client";
// import {
//   base_endpoint,
//   appname,
//   frontend_url,
//   headerx,
//   image_base_endpoint,
// } from "../../../utils/constants";
// import AppBar from "../../../components/AppBar";
// import ShareButton from "../../../components/ShareButton";
// import { FaArrowLeft, FaSpinner } from "react-icons/fa";
// import DentalTabs from "../../../components/tabs/DentalTabs";
// import TextTicker from "../../../components/TextTicker";
// import FavouriteToggle from "../../../components/FavouriteToggle";
// import DiaLocation from "../../../components/DiaLocation";
// import FloatingCallButton from "../../../components/FloatingCallButton";
// import ProfileQR from "../../../components/profileQR";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// function Page({ params }) {
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       const tokenCookie = localStorage.getItem("token") ?? "";
//       const userCookie = localStorage.getItem("user");
//       const parsedUser = userCookie ? JSON.parse(userCookie) : null;

//       if (tokenCookie.length === 298) {
//         headerx["Authorization"] = `Bearer ${tokenCookie}`;
//       }

//       try {
//         const res = await fetch(
//           `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?genericServiceId=${params.slug}`,
//           {
//             method: "GET",
//             headers: headerx,
//             cache: "no-store",
//           }
//         );
//         if (res.status === 200) {
//           const json = await res.json();
//           const fetchedData = json.data[0];
//           setData(fetchedData);
//           setToken(tokenCookie);
//           setUser(parsedUser);
//         } else {
//           router.push("/not-found");
//         }
//       } catch (err) {
//         console.error(err);
//         router.push("/not-found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetail();
//   }, [params.slug, router]);

//   if (!data) return <div className="p-4 text-gray-600">Loading...</div>;

//   const defaultImageUrl = "/images/dental.png";

//   const profile = !data?.profileImageUrl
//     ? defaultImageUrl
//     : image_base_endpoint + data?.profileImageUrl;

//   const cover = !data?.coverImageUrl
//     ? defaultImageUrl
//     : image_base_endpoint + data?.coverImageUrl;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         <div className="flex items-center space-x-2">
//           <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
//           <span className="text-gray-600">Loading physiotherapy center...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         No data found.
//       </div>
//     );
//   }

//   return (
//     <>
//       <title>{`${data?.name} | ${appname}`}</title>
//       <meta
//         name="description"
//         content={`${data?.name}, ${data?.location}`.slice(0, 150)}
//       />

      
//     </>
//   );
// }

// export default Page;
