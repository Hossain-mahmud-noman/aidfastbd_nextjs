"use client";
import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import ShareButton from "../ShareButton";
import FavouriteToggle from "../FavouriteToggle";
import DoctorTabs from "../tabs/DoctorTabs";
import AppointmentBooking from "../bottom/AppointmentBooking";
import ProfileQR from "../profileQR";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import ShowOriginalImage from "../list/ShowOriginalImage";
import { image_base_endpoint, frontend_url, appname } from "../../utils/constants";
import Head from "next/head";

const DoctorDetail = ({ data }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenCookie = localStorage.getItem("token") ?? "";
    const userCookie = localStorage.getItem("user");
    const parsedUser = userCookie ? JSON.parse(userCookie) : null;

    setToken(tokenCookie);
    setUser(parsedUser);
  }, []);

  const profile = data?.imageUrl
    ? image_base_endpoint + data.imageUrl
    : "/images/doctor.jpg";

  return (
    <>
      <Head>
        <title>{`Dr. ${data.firstName} ${data.lastName} | ${appname}`}</title>
        <meta
          name="description"
          content={`${data.doctorAdditionalInfo?.title ?? ""} ${data.doctorAdditionalInfo?.details ?? ""}`.slice(0, 150)}
        />
        <meta property="og:title" content={`Dr. ${data.firstName} ${data.lastName} | ${appname}`} />
        <meta property="og:description" content={`${data.doctorAdditionalInfo?.title ?? ""} ${data.doctorAdditionalInfo?.details ?? ""}`} />
        <meta property="og:image" content={profile} />
        <meta property="og:url" content={`${frontend_url}/doctor/${data.userId}`} />
      </Head>
      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title="Doctor Detail"
        trailingComponents={
          <div className="flex">
            <ProfileQR id={data?.userId} type="Doctor" />
            <FavouriteToggle
              isFill={data?.isFavourite}
              userId={user?.id}
              id={data?.userId}
              type={1}
              token={token}
            />
            <ShareButton link={`${frontend_url}/doctor/${data?.userId}`} />
          </div>
        }
      />

      <div className="pt-16 flex flex-col md:flex-row gap-5 md:gap-10 aid-container mt-6">
        <div className="rounded-xl">
          <ShowOriginalImage image={profile} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Dr. {data.firstName} {data.lastName}
          </h2>
          <p className="text-gray-600">{data.degreeName}</p>
          <p className="text-red-500 font-semibold">{data.specialityName}</p>
          <p className="text-gray-500">{data.designation}</p>
          <p className="text-green-600 font-bold">Fee: {data.doctorFee}</p>

          <div className="mt-4 text-gray-700">
            <p>
              <strong>Work At:</strong> {data.currentWorkingPlace}
            </p>
            <p>
              <strong>Experience:</strong> {data.experience}
            </p>
            <p>
              <strong>BMDC Number:</strong> {data.bmdCnumber}
            </p>
            <p className="flex items-center text-center">
              <strong className="mr-2">Rating:</strong>
              {data.averageRating} <FaStar className="ml-1 text-yellow-400" /> (
              {data.totalRating} reviews)
            </p>
          </div>

          {data.emergencyNo && (
            <a
              href={`tel:${data.emergencyNo}`}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm mt-2 inline-block"
            >
              Emergency Call
            </a>
          )}
        </div>
      </div>
      <DoctorTabs data={data} />
      <AppointmentBooking
        id={data.userId}
        token={token}
        user={user}
        chambers={data.chamberInformation}
      />
    </>
  );
};

export default DoctorDetail;
