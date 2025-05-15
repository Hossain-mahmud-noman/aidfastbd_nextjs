import { notFound } from 'next/navigation';
import { appname, frontend_url, image_base_endpoint, headerx, panel_base } from '../../../../utils/constants'
import AppBar from '../../../../components/AppBar';
import ShareButton from '../../../../components/ShareButton';
import { FaArrowLeft } from "react-icons/fa";
import AmbulanceTabs from '../../../../components/tabs/AmbulanceTabs';
import TextTicker from '../../../../components/TextTicker';
import { cookies } from 'next/headers';
import FavouriteToggle from '../../../../components/FavouriteToggle';
import DiaLocation from '../../../../components/DiaLocation';
import FloatingCallButton from '../../../../components/FloatingCallButton'
import ProfileQR from '../../../../components/profileQR';
import Image from 'next/image';

export const metadata = {
  title: null,
  description: null,
};


const fetchDetail = async (slug) => {
  try {
    const tokenCookie = cookies().get('token')?.value ?? "";
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (tokenCookie.length === 298) {
      headerx['Authorization'] = `Bearer ${tokenCookie}`
    }
    const response = await fetch(`${panel_base}/ambulance/${slug}`, {
      method: "GET",
      headers: headerx,
      cache: "no-store"

    });
    if (response.status == 200) {
      const data = await response.json();

      return { token: tokenCookie, user: user, data: data['data'][0] };
    } else {
      return { token: tokenCookie, user: user, data: null };
    }

  } catch (err) {
    return { token: null, user: user, data: null };
  }
}



async function page({ params }) {

  const { data, token, user } = await fetchDetail(params.slug);

  if (data == null) {
    notFound();
  }

  const defaultImageUrl = "/images/logo.png";

  const profile = data.profileImageUrl == null || data.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data.profileImageUrl;
  const cover = data.coverImageUrl == null || data.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data.profileImageUrl;

  return (
    <>

      <title>{`${data.name}  | ${appname}`}</title>
      <meta name="description" content={`${data.meta_description}`} />

      <AppBar leadingIcon={<FaArrowLeft className="h-5 w-5" />} title='Ambulance Detail' trailingComponents={
        <div className='flex'>
          <ProfileQR userId={data.userId} type={"Ambulance"}></ProfileQR>

          <FavouriteToggle isFill={data.isFavourite} userId={user?.id} id={data.userId} type={5} token={token}  ></FavouriteToggle>
          <ShareButton link={`${frontend_url}/ambulance/${data.userId}`}></ShareButton>
        </div>
      }></AppBar>

      <div className="pt-16">


        <div className='p-4'>

          <div className="w-full h-[30vh] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt="Blood Bank cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            {/* Logo and Name */}
            <div className="flex items-center">
              <Image
                width={1000}
                height={1000}
                src={profile}
                alt="Ambulance Center Logo"
                className="w-16 h-16 rounded-full mr-3"
              />
              <div>
                <h1 className="text-lg font-bold">
                  {data.name}
                </h1>
                <div className='flex items-center justify-start text-left space-x-2 mb-2'>
                  {data.location !== null && (
                    <span className="text-sm text-gray-500">{data.location}</span>
                  )}
                  <DiaLocation lat={data.latitude} lon={data.longitude} ></DiaLocation>

                </div>
              </div>
            </div>

          </div>



          {data.notice != null ? <TextTicker text={data.notice}></TextTicker> : null}
          {/* Info Section */}
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">Registration No</p>
                <p>{data.registrationNumber == null ? "N/A" : data.registrationNumber} </p>
              </div>
              <div>
                <p className="font-bold">Service Time</p>
                <p>{data.serviceTime}</p>
              </div>
              <div>
                <p className="font-bold">Total Rating</p>
                <p>{data.averageRating} ⭐ ({data.atotalRating} reviews)</p>
              </div>
            </div>
          </div>



          <div >
            <a
              href={`tel:${data.emergencyContactNumber}`}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              Emergency Call
            </a>

          </div>

        </div>

      </div>

      <AmbulanceTabs data={data}></AmbulanceTabs>
      <FloatingCallButton number={data.contactNumber}></FloatingCallButton>


    </>

  )
}

export default page

// https://api.aidfastbd.com/api/GeneralWeb/GetAllAmbulanceList?pageNumber=1&pageSize=1&ambulanceInformationId=04fe71cc-c628-4748-435f-08dc0f459b35
