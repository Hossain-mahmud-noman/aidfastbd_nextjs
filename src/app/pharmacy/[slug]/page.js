/* eslint-disable react-hooks/rules-of-hooks */

'use client';
import { base_endpoint, appname, frontend_url, image_base_endpoint, headerx } from '../../../utils/constants'
import AppBar from '../../../components/AppBar';
import ShareButton from '../../../components/ShareButton';
import { FaArrowLeft } from "react-icons/fa";
import PharmacyTabs from '../../../components/tabs/PharmacyTabs';
import TextTicker from '../../../components/TextTicker';
import FavouriteToggle from '../../../components/FavouriteToggle';
import DiaLocation from '../../../components/DiaLocation';
import FloatingCallButton from '../../../components/FloatingCallButton'
import ProfileQR from '../../../components/profileQR';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=1&pageSize=1&pharmacyInformationId=${params.slug}`,
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

  const defaultImageUrl = "/images/logo.png";
  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;
  const cover = data?.coverImageUrl == null || data?.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.coverImageUrl;

  return (
    <>
      <title>{`${data?.name}  | ${appname}`}</title>
      <meta name="description" content={`${data?.name}, ${data?.location}`.slice(0, 150)} />
      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Pharmacy Detail' trailingComponents={
        <div className='flex'>
          <ProfileQR id={data?.userId} type={"Pharmacy"} />
          <FavouriteToggle isFill={data?.isFavourite} userId={user?.id} id={data?.userId} type={4} token={token}/>
          <ShareButton link={`${frontend_url}/pharmacy/${data?.userId}`} />
        </div>
      }/>
      <div className="pt-16">
        <div className='p-4'>
          <div className="w-full lg:h-[70vh] md:h-[50vh] h-[30vh] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt="Pharmacy Center cover"
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Name */}
            <div className="flex items-center">
              <Image
                width={1000}
                height={1000}
                src={profile}
                alt="Pharmacy Center Logo"
                className="w-16 h-16 rounded-full mr-3"
              />
              <div>
                <h1 className="text-lg font-bold">
                  {data?.name}
                </h1>
                <div className='flex items-center justify-start text-left space-x-2 mb-2'>
                  {data?.location !== null && (
                    <span className="text-sm text-gray-500">{data?.location}</span>
                  )}
                  <DiaLocation lat={data?.latitude} lon={data?.longitude}/>
                </div>
              </div>
            </div>
          </div>

          {data?.notice != null ? <TextTicker text={data?.notice}></TextTicker> : null}
          {/* Info Section */}
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">Registration No</p>
                <p>{data?.registrationNumber == null ? "N/A" : data?.registrationNumber} </p>
              </div>
              <div>
                <p className="font-bold">Service Time</p>
                <p>{data?.serviceTime}</p>
              </div>
              <div>
                <p className="font-bold">Total Rating</p>
                <p>{data?.averageRating} ⭐ ({data?.atotalRating} reviews)</p>
              </div>
            </div>
          </div>
          <div >
            <a
              href={`tel:${data?.emergencyContactNumber}`}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              Emergency Call
            </a>
          </div>
        </div>
      </div>
      <PharmacyTabs data={data} />
      <FloatingCallButton number={data?.contactNumber} />
    </>
  )
}
export default page

