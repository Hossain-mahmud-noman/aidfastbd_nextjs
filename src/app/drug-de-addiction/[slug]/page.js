import { notFound } from "next/navigation";
import {
  base_endpoint,
  appname,
  frontend_url,
  headerx,
  image_base_endpoint,
} from "../../../utils/constants";
import AppBar from "../../../components/AppBar";
import ShareButton from "../../../components/ShareButton";
import { FaArrowLeft } from "react-icons/fa";
import DentalTabs from "../../../components/tabs/DentalTabs";
import TextTicker from "../../../components/TextTicker";
import { cookies } from "next/headers";
import FavouriteToggle from "../../../components/FavouriteToggle";
import DiaLocation from "../../../components/DiaLocation";
import FloatingCallButton from "../../../components/FloatingCallButton";
import ProfileQR from "../../../components/profileQR";
import Image from "next/image";

export const metadata = {
  title: null,
  description: null,
};

const fetchDetail = async (slug) => {
  try {
    const tokenCookie = cookies().get("token")?.value ?? "";
    const userCookie = cookies().get("user")?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (tokenCookie.length === 298) {
      headerx["Authorization"] = `Bearer ${tokenCookie}`;
    }
    const response = await fetch(
      `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?serviceType=2&id=${slug}`,
      {
        method: "GET",
        headers: headerx,
        cache: "no-store",
      }
    );

    if (response.status == 200) {
      const data = await response.json();
      return { token: tokenCookie, user: user, data: data["data"][0] };
    } else {
      return { token: tokenCookie, user: user, data: null };
    }
  } catch (err) {
    return { token: null, user: user, data: null };
  }
};

async function Page({ params }) {
  const { data, token, user } = await fetchDetail(params.slug);

  if (data == null) {
    notFound();
  }

  const defaultImageUrl = "/images/dental.png";

  const profile =
    data.profileImageUrl == null || data.profileImageUrl == ""
      ? defaultImageUrl
      : image_base_endpoint + data.profileImageUrl;

  const cover =
    data.coverImageUrl == null || data.coverImageUrl == ""
      ? defaultImageUrl
      : image_base_endpoint + data.profileImageUrl;

  return (
    <>
      <title>{`${data.name}  | ${appname}`}</title>
      <meta
        name="description"
        content={`${data.name}, ${data.location}`.slice(0, 150)}
      />

      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title="Drug De Addiction Details"
        trailingComponents={
          <div className="flex">
            <ProfileQR id={data?.id} type={"DrugDeAddiction"}></ProfileQR>
            <FavouriteToggle
              isFill={data.isFavourite}
              userId={user?.id}
              id={data?.id}
              type={3}
              token={token}
            ></FavouriteToggle>

            <ShareButton
              link={`${frontend_url}/drug-de-ddiction/${data.id}`}
            ></ShareButton>
          </div>
        }
      ></AppBar>

      <div className="pt-16">
        <div className="p-4">
          <div className="w-full h-[30vh] overflow-hidden">
            <Image
              src={cover}
              alt="Dental cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Name */}
            <div className="flex items-center">
              <Image
                src={profile}
                alt="Dental Logo"
                className="w-16 h-16 rounded-full mr-3"
              />
              <div>
                <h1 className="text-lg font-bold">{data?.name}</h1>

                <div className="flex items-center justify-start text-left space-x-2 mb-2">
                  {data.location !== null && (
                    <span className="text-sm text-gray-500">
                      {data.location}
                    </span>
                  )}
                  <DiaLocation
                    lat={data.latitude}
                    lon={data.longitude}
                  ></DiaLocation>
                </div>
              </div>
            </div>
          </div>

          {data.notice != null ? (
            <TextTicker text={data.notice}></TextTicker>
          ) : null}
          {/* Info Section */}
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">Registration No</p>
                <p>
                  {data.registrationNumber == null
                    ? "N/A"
                    : data.registrationNumber}{" "}
                </p>
              </div>
              <div>
                <p className="font-bold">Service Time</p>
                <p>{data.serviceTime}</p>
              </div>
              <div>
                <p className="font-bold">Total Rating</p>
                <p>
                  {data.averageRating} ⭐ ({data.atotalRating} reviews)
                </p>
              </div>
            </div>
          </div>

          <div>
            <a
              href={`tel:${data.emergencyContactNumber}`}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              Emergency Call
            </a>
          </div>
        </div>
      </div>

      {/* Have to add tabs */}
      <DentalTabs data={data}></DentalTabs>
      <FloatingCallButton number={data.contact}></FloatingCallButton>
    </>
  );
}

export default Page;
