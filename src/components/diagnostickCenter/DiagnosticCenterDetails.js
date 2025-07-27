"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import ShareButton from "../ShareButton";
import FavouriteToggle from "../FavouriteToggle";
import ProfileQR from "../profileQR";
import { FaArrowLeft } from "react-icons/fa";
import { image_base_endpoint, frontend_url, appname } from "../../utils/constants";
import Head from "next/head";
import DiagnosticDetail from "../DiagnosticDetail";
import DiagnosticTabs from "../tabs/DiagnosticTabs";
import FloatingCallButton from "../FloatingCallButton";
import { useI18n } from "../../context/i18n";

const DiagnosticCenterDetails = ({ data }) => {

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const i18n = useI18n()
  useEffect(() => {
    const tokenCookie = localStorage.getItem("token") ?? "";
    const userCookie = localStorage.getItem("user");
    const parsedUser = userCookie ? JSON.parse(userCookie) : null;

    setToken(tokenCookie);
    setUser(parsedUser);
  }, []);
  const defaultImageUrl = '"/images/diagnostic.jpg"'
  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;

  return (
    <>
      <Head>
        <title>{`${data?.name}  | ${appname}`}</title>
        <meta name="description" content={`${data?.diagnosticCenterAdditionalInfo?.details}`.slice(0, 150)} />
        <meta property="og:title" content={`${data?.name}  | ${appname}`} />
        <meta property="og:description" content={`${data?.diagnosticCenterAdditionalInfo?.title ?? ""} ${data?.diagnosticCenterAdditionalInfo?.details ?? ""}`} />
        <meta property="og:image" content={profile} />
        <meta property="og:url" content={`${frontend_url}/diagnostic/${data?.userId}`} />
      </Head>
      <>
        <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title={i18n.t("Diagnostic Detail")} trailingComponents={
          <div className='flex'>
            <ProfileQR id={data?.userId} type={"Diagnostic"} />
            <FavouriteToggle isFill={data?.isFavourite} userId={user?.userId} id={data?.userId} type={2} token={token} />
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
    </>
  );
};

export default DiagnosticCenterDetails;
