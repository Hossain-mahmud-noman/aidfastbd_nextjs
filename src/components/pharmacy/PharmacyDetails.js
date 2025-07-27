"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import ShareButton from "../ShareButton";
import FavouriteToggle from "../FavouriteToggle";
import ProfileQR from "../profileQR";
import { FaArrowLeft } from "react-icons/fa";
import { image_base_endpoint, frontend_url, appname } from "../../utils/constants";
import Head from "next/head";
import FloatingCallButton from "../FloatingCallButton";
import Image from "next/image";
import DiaLocation from "../DiaLocation";
import TextTicker from "../TextTicker";
import PharmacyTabs from "../tabs/PharmacyTabs";
import { useI18n } from "../../context/i18n";
import ContacTactModal from "../../utils/contactModal";

const PharmacyDetails = ({ data }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const i18n = useI18n();
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const tokenCookie = localStorage.getItem("token") ?? "";
    const userCookie = localStorage.getItem("user");
    const parsedUser = userCookie ? JSON.parse(userCookie) : null;

    setToken(tokenCookie);
    setUser(parsedUser);
  }, []);

  const defaultImageUrl = "/images/logo.png";
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
        <meta property="og:url" content={`${frontend_url}/pharmacy/${data?.userId}`} />
      </Head>

      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title={i18n.t("Pharmacy Detail")} trailingComponents={
        <div className='flex'>
          <ProfileQR id={data?.userId} type={"Pharmacy"} />
          <FavouriteToggle isFill={data?.isFavourite} userId={user?.id} id={data?.userId} type={4} token={token} />
          <ShareButton link={`${frontend_url}/pharmacy/${data?.userId}`} />
        </div>
      } />
      <div className="mt-5 lg:mt-8 aid-container">
        <div className=''>
          <div className="w-full lg:h-[70vh] md:h-[50vh] h-[30vh] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt="Pharmacy Center cover"
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex items-center justify-between my-5 lg:my-8">
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
                  <DiaLocation lat={data?.latitude} lon={data?.longitude} />
                </div>
              </div>
            </div>
          </div>

          {data?.notice != null ? <TextTicker text={data?.notice} /> : null}
          {/* Info Section */}
          <div className="bg-gray-100 p-3 rounded-lg my-5 lg:my-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">{i18n.t("Registration No")}</p>
                <p>{data?.registrationNumber == null ? "N/A" : data?.registrationNumber} </p>
              </div>
              <div>
                <p className="font-bold">{i18n.t("Service Time")}</p>
                <p>{data?.serviceTime}</p>
              </div>
              <div>
                <p className="font-bold">{i18n.t("Total Rating")}</p>
                <p>{data?.averageRating} ⭐ ({data?.atotalRating} reviews)</p>
              </div>
            </div>
          </div>
          <div >
            <button
              onClick={handleOpen}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              {i18n.t("Call Emergency")}
            </button>
          </div>
        </div>
      </div>
      <div className='aid-container'>
        <PharmacyTabs data={data} />
      </div>
      <FloatingCallButton number={data?.contactNumber} />
      <ContacTactModal
        contact={data?.emergencyContactNumber}
        open={showModal}
        onClose={handleClose}
      />
    </>
  );
};

export default PharmacyDetails;
