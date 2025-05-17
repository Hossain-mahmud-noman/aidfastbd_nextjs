/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useRouter } from 'next/navigation';
import { base_endpoint, appname, frontend_url, headerx } from '../../../utils/constants'
import DiagnosticDetail from "../../../components/DiagnosticDetail"
import AppBar from '../../../components/AppBar';
import { FaArrowLeft } from "react-icons/fa";
import ShareButton from '../../../components/ShareButton';
import DiagnosticTabs from '../../../components/tabs/DiagnosticTabs';
import FavouriteToggle from '../../../components/FavouriteToggle';
import FloatingCallButton from '../../../components/FloatingCallButton';
import ProfileQR from '../../../components/profileQR';
import { useEffect, useState } from 'react';

function page({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchDetail = async () => {
      const tokenCookie = localStorage.getItem("token") ?? "";
      const userCookie = localStorage.getItem("user");
      const parsedUser = userCookie ? JSON.parse(userCookie) : null;
      if (tokenCookie.length === 298) {
        headerx["Authorization"] = `Bearer ${tokenCookie}`;
      }
      try {
        const res = await fetch(
          `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?diagnosticCenterId=${params.slug}`,
          {
            method: "GET",
            headers: headerx,
            cache: "no-store",
          }
        );
        if (res.status === 200) {
          const json = await res.json();
          if (json?.data?.length > 0) {
            const fetchedData = json?.data[0];
            setData(fetchedData);
            setToken(tokenCookie);
            setUser(parsedUser);
          } else {
            router.push("/not-found");
          }
        } else {
          router.push("/not-found");
        }
      } catch (err) {
        console.error(err);
        router.push("/not-found");
      }
    };

    fetchDetail();
  }, [params.slug, router]);

  return (
    <>
      <title>{`${data?.name}  | ${appname}`}</title>
      <meta name="description" content={`${data?.diagnosticCenterAdditionalInfo?.details}`.slice(0, 150)} />

      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Diagnostic Detail' trailingComponents={
        <div className='flex'>
          <ProfileQR id={data?.userId} type={"Diagnostic"} />
          <FavouriteToggle isFill={data?.isFavourite} userId={user?.id} id={data?.userId} type={2} token={token} />
          <ShareButton link={`${frontend_url}/diagnostic/${data?.userId}`} />
        </div>}
      />
      <div className="pt-16 aid-container">
        {data && <DiagnosticDetail data={data} />}
      </div>
      <div className='aid-container'>
        {data && <DiagnosticTabs data={data} />}
      </div>
      <FloatingCallButton number={data?.contact} />
    </>
  )
}

export default page


