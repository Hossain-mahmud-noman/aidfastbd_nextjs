

import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
} from "../../../utils/constants";
import AmbulanceDetails from "../../../components/ambulance/AmbulanceDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=1&ambulanceInformationId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return { title: "Ambulance Not Found" };
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
      url: `${frontend_url}/ambulance/${data.userId}`,
    },
  };
}

export default async function DoctorPage({ params }) {
  const res = await fetch(
    `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=1&ambulanceInformationId=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const data = json?.data?.[0];

  if (!data) {
    return <div className="p-8 text-center text-lg"> Ambulance not found.</div>;
  }

  return <AmbulanceDetails data={data} />;
}







// 'use client';
// import { base_endpoint, appname, frontend_url, image_base_endpoint, headerx } from '../../../utils/constants'
// import AppBar from '../../../components/AppBar';
// import ShareButton from '../../../components/ShareButton';
// import { FaArrowLeft, FaSpinner } from "react-icons/fa";
// import AmbulanceTabs from '../../../components/tabs/AmbulanceTabs';
// import TextTicker from '../../../components/TextTicker';
// import FavouriteToggle from '../../../components/FavouriteToggle';
// import DiaLocation from '../../../components/DiaLocation';
// import FloatingCallButton from '../../../components/FloatingCallButton'
// import ProfileQR from '../../../components/profileQR';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// function page({ params }) {
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
//           `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=1&ambulanceInformationId=${params.slug}`,
//           {
//             method: "GET",
//             headers: headerx,
//             cache: "no-store",
//           }
//         );

//         if (res.status === 200) {
//           const json = await res.json();
//           if (json?.data?.length > 0) {
//             const fetchedData = json.data[0];
//             setData(fetchedData);
//             setToken(tokenCookie);
//             setUser(parsedUser);
//           } else {
//             setData(null);
//           }
//         } else {
//           setData(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetail();
//   }, [params.slug, router]);

//   const defaultImageUrl = "/images/logo.png";
//   const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;
//   const cover = data?.coverImageUrl == null || data?.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.coverImageUrl;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         <div className="flex items-center space-x-2">
//           <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
//           <span className="text-gray-600">Loading ambulance...</span>
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
//       <title>{`${data?.name}  | ${appname}`}</title>
//       <meta name="description" content={`${data?.name}, ${data?.location}`.slice(0, 150)} />
      
      
//     </>
//   )
// }

// export default page

