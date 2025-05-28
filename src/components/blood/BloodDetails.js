"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import ShareButton from "../ShareButton";
import FavouriteToggle from "../FavouriteToggle";
import ProfileQR from "../profileQR";
import { FaArrowLeft } from "react-icons/fa";
import { image_base_endpoint, frontend_url, appname } from "../../utils/constants";
import Head from "next/head";
import DentalTabs from "../tabs/DentalTabs";
import FloatingCallButton from "../FloatingCallButton";
import Image from "next/image";
import DiaLocation from "../DiaLocation";
import TextTicker from "../TextTicker";
import BloodTabs from "../tabs/BloodTabs";

const BloodDetails = ({ data }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenCookie = localStorage.getItem("token") ?? "";
    const userCookie = localStorage.getItem("user");
    const parsedUser = userCookie ? JSON.parse(userCookie) : null;

    setToken(tokenCookie);
    setUser(parsedUser);
  }, []);

  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;
  const cover = data?.coverImageUrl == null || data?.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.coverImageUrl;

  return (
    <>
      <Head>
        <title>{`${data?.name} | ${appname}`}</title>
        <meta
          name="description"
          content={`${data?.name ?? ""} ${data?.location ?? ""}`.slice(0, 150)}
        />
        <meta property="og:title" content={`${data?.name} | ${appname}`} />
        <meta property="og:description" content={`${data?.name ?? ""} ${data?.location ?? ""}`} />
        <meta property="og:image" content={profile} />
        <meta property="og:url" content={`${frontend_url}/dental/${data?.userId}`} />
      </Head>

      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Blood Bank Detail' trailingComponents={
        <div className='flex'>
          <ProfileQR id={data?.userId} type={"BloodBank"} />
          <FavouriteToggle isFill={data?.isFavourite} userId={user?.id} id={data?.userId} type={3} token={token} />
          <ShareButton link={`${frontend_url}/blood/${data?.userId}`} />
        </div>
      }
      />

      <div className="pt-16 aid-container">
        <div className='p-4'>
          <div className="w-full lg:h-[70vh] md:h-[50vh] h-[30vh] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt="Blood Bank cover"
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
                alt="Blood Bank Logo"
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
                  <DiaLocation lat={data?.latitude} lon={data?.longitude} />
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
      <div className='aid-container'>
        <BloodTabs data={data} />
      </div>
      <FloatingCallButton number={data?.contact} />

    </>
  );
};

export default BloodDetails;
