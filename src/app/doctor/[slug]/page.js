"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  base_endpoint,
  appname,
  frontend_url,
  image_base_endpoint,
  headerx,
} from "../../../utils/constants";
  
import AppBar from "../../../components/AppBar";
import { FaArrowLeft, FaSpinner, FaStar } from "react-icons/fa";
import ShareButton from "../../../components/ShareButton";
import FavouriteToggle from "../../../components/FavouriteToggle";
import DoctorTabs from "../../../components/tabs/DoctorTabs";
import AppointmentBooking from "../../../components/bottom/AppointmentBooking";
import ProfileQR from "../../../components/profileQR";
import Image from "next/image";
import ShowOriginalImage from "../../../components/list/ShowOriginalImage";

const Page = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
console.log("🚀 ~ frontend_url:", frontend_url)
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
          `${base_endpoint}/GeneralWeb/GetDoctorInfoList?userid=${params.slug}`,
          {
            method: "GET",
            headers: headerx,
            cache: "no-store",
          }
        );

        if (res.status === 200) {
          const json = await res.json();
          if (json?.length > 0) {
            const fetchedData = json[0];
            setData(fetchedData);
            setToken(tokenCookie);
            setUser(parsedUser);
          } else {
            setData(null);
          }
        } else {
          setData(null);
        }
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [params.slug, router]);

  const defaultImageUrl = "/images/doctor.jpg";

  const profile =
    data?.imageUrl == null || data?.imageUrl == ""
      ? defaultImageUrl
      : image_base_endpoint + data?.imageUrl;


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        <div className="flex items-center space-x-2">
          <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
          <span className="text-gray-600">Loading doctor...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        No data found.
      </div>
    );
  }

  return (
    <>
      <title>{`Dr. ${data?.firstName} ${data?.lastName} | ${appname}`}</title>
      <meta
        name="description"
        content={`${data?.doctorAdditionalInfo?.title} ${data?.doctorAdditionalInfo?.details}`.slice(
          0,
          150
        )}
      />
      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title="Doctor Detail"
        trailingComponents={
          <div className="flex">
            <ProfileQR id={data?.userId} type={"Doctor"} />
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
        {/* Profile Section */}
        <div className=" rounded-xl">
          {/* <Image
            width={1000}
            height={1000}
            src={profile}
            alt="Doctor"
            className="w-full h-[280px] md:h-[300px] lg:h-[350px] xl:h-[450px] object-fil rounded-md"
          /> */}
          <ShowOriginalImage
            image={
              profile
            }
          />
        </div>

        <div className="">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-lg font-bold">
                Dr. {data?.firstName} {data?.lastName}
              </h2>
              <p className="text-gray-600">{data?.degreeName}</p>
              <p className="text-red-500 font-semibold">
                {data?.specialityName}
              </p>
              <p className="text-gray-500">{data?.designation}</p>
              <p className="text-green-600 font-bold">Fee: {data?.doctorFee}</p>
            </div>
          </div>
          <div className="mt-4 text-gray-700">
            <p>
              <strong>Work At:</strong> {data?.currentWorkingPlace}
            </p>
            <p>
              <strong>Experience:</strong> {data?.experience}
            </p>
            <p>
              <strong>BMDC Number:</strong> {data?.bmdCnumber}
            </p>
            <p className="flex items-center text-center">
              <strong className="mr-2">Rating:</strong>
              {data?.averageRating}{" "}
              <FaStar className="ml-1 mr-1 text-yellow-400 text-[12px]" />(
              {data?.totalRating} reviews)
            </p>
          </div>
          {data?.emergencyNo !== null && (
            <div className="mt-2">
              <a
                href={`tel:${data?.emergencyNo}`}
                className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
              >
                Emergency Call
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Doctor Tabs */}
      <DoctorTabs data={data} />

      {/* Appointment Booking */}
      <AppointmentBooking
        id={params.slug}
        token={token}
        user={user}
        chambers={data?.chamberInformation}
      />
    </>
  );
};

export default Page;
