'use client';
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
import FavouriteToggle from "../../../components/FavouriteToggle";
import DiaLocation from "../../../components/DiaLocation";
import FloatingCallButton from "../../../components/FloatingCallButton";
import ProfileQR from "../../../components/profileQR";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  console.log("🚀 ~ Page ~ data:", data)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      console.log('appppppppppppppppppppppppppppppppppppppp',params.slug);
      const tokenCookie = localStorage.getItem("token") ?? "";
      const userCookie = localStorage.getItem("user");
      const parsedUser = userCookie ? JSON.parse(userCookie) : null;

      if (tokenCookie.length === 298) {
        headerx["Authorization"] = `Bearer ${tokenCookie}`;
      }

      try {
        const res = await fetch(
          `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?serviceType=5&id=${params.slug}`,
          {
            method: "GET",
            headers: headerx,
            cache: "no-store",
          }
        );
        if (res.status === 200) {
          const json = await res.json();
          const fetchedData = json.data[0];
          setData(fetchedData);
          setToken(tokenCookie);
          setUser(parsedUser);
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

  if (!data) return <div className="p-4 text-gray-600">Loading...</div>;

  const defaultImageUrl = "/images/dental.png";

  const profile =
    !data.profileImageUrl
      ? defaultImageUrl
      : image_base_endpoint + data.profileImageUrl;

  const cover =
    !data.coverImageUrl
      ? defaultImageUrl
      : image_base_endpoint + data.profileImageUrl;

  return (
    <>
      <title>{`${data.name} | ${appname}`}</title>
      <meta name="description" content={`${data.name}, ${data.location}`.slice(0, 150)} />

      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title="Eye Care Center Detail"
        trailingComponents={
          <div className="flex">
            <ProfileQR id={data?.id} type={"Eye Care Center"} />
            <FavouriteToggle
              isFill={data.isFavourite}
              userId={user?.id}
              id={data.userId}
              type={3}
              token={token}
            />
            <ShareButton link={`${frontend_url}/eyeCareCenter/${data.id}`} />
          </div>
        }
      />

      <div className="pt-16">
        <div className="p-4">
          <div className="w-full h-[30vh] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt="Dental cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                width={1000}
                height={1000}
                src={profile}
                alt="Dental Logo"
                className="w-16 h-16 rounded-full mr-3"
              />
              <div>
                <h1 className="text-lg font-bold">{data.name}</h1>
                <div className="flex items-center text-left space-x-2 mb-2">
                  {data.location && (
                    <span className="text-sm text-gray-500">{data.location}</span>
                  )}
                  <DiaLocation lat={data.latitude} lon={data.longitude} />
                </div>
              </div>
            </div>
          </div>

          {data.notice && <TextTicker text={data.notice} />}

          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">Registration No</p>
                <p>{data.registrationNumber || "N/A"}</p>
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

      <DentalTabs data={data} />
      <FloatingCallButton number={data.contact} />
    </>
  );
}

export default Page;
