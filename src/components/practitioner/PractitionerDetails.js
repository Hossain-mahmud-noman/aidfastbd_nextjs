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
import EmergencyCallButton from "../EmergencyCallButton";
import Image from "next/image";
import DiaLocation from "../DiaLocation";
import TextTicker from "../TextTicker";
import { useI18n } from "../../context/i18n";

const PractitionerDetails = ({ data, url }) => {
  const i18n = useI18n()
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenCookie = localStorage.getItem("token") ?? "";
    const userCookie = localStorage.getItem("user");
    const parsedUser = userCookie ? JSON.parse(userCookie) : null;

    setToken(tokenCookie);
    setUser(parsedUser);
  }, []);

  const profile = data?.profileImageUrl
    ? image_base_endpoint + data.profileImageUrl
    : "/images/doctor.jpg";

  const cover =
    data?.coverImageUrl == null || data?.coverImageUrl === ""
      ? defaultImageUrl
      : image_base_endpoint + data?.coverImageUrl;

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
        <meta property="og:url" content={`${frontend_url}/practitioner/${data?.id}`} />
      </Head>
      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title={i18n.t("Practitioner Detail")}
        trailingComponents={
          <div className="flex">
            <ProfileQR slug={"newService"} id={data?.id} type={"practitioner"} />
            <FavouriteToggle
              isFill={data?.isFavourite}
              userId={user?.id}
              id={data?.id}
              type={3}
              token={token}
            />
            <ShareButton link={`${frontend_url}/practitioner/${data?.id}`} />
          </div>
        }
      />

      <div className="my-5 lg:my-8 aid-container">
        <div className="w-full lg:h-[70vh] md:h-[50vh] h-[30vh] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={cover}
            alt="Practitioner cover"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="flex items-center justify-between my-5 lg:my-8">
          <div className="flex items-center">
            <Image
              width={1000}
              height={1000}
              src={profile}
              alt="Practitioner Logo"
              className="w-16 h-16 rounded-full mr-3"
            />
            <div>
              <h1 className="text-lg font-bold">{data?.name}</h1>
              <div className="flex items-center justify-start text-left space-x-2 mb-2">
                {data?.location && (
                  <span className="text-sm text-gray-500">
                    {data?.location}
                  </span>
                )}
                <DiaLocation lat={data?.latitude} lon={data?.longitude} />
              </div>
            </div>
          </div>
        </div>

        {data?.notice && <TextTicker text={data?.notice} />}

        <EmergencyCallButton number={data?.emergencyContactNumber} />

      </div>
      <div className="aid-container mt-6">
        <DentalTabs data={data} typeId="14" url={url} />
      </div>
      <FloatingCallButton number={data?.contact} />
    </>
  );
};

export default PractitionerDetails;
