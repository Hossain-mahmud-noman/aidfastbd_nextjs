import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { base_endpoint, appname, frontend_url, image_base_endpoint, headerx } from '../../../utils/constants';
import AppBar from '../../../components/AppBar';
import { FaArrowLeft, FaStar } from "react-icons/fa";
import ShareButton from '../../../components/ShareButton';
import FavouriteToggle from '../../../components/FavouriteToggle';
import DoctorTabs from '../../../components/tabs/DoctorTabs';
import AppointmentBooking from '../../../components/bottom/AppointmentBooking';
import ProfileQR from '../../../components/profileQR';

const fetchDetail = async (slug) => {
  try {
    const tokenCookie = cookies().get('token')?.value ?? "";
    const userCookie = cookies().get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;
    if (tokenCookie.length === 298) {
      headerx['Authorization'] = `Bearer ${tokenCookie}`;
    }
    const response = await fetch(`${base_endpoint}/GeneralWeb/GetDoctorInfoList?userid=${slug}`, {
      method: "GET",
      headers: headerx,
      cache: "no-store"
    });

    if (response.status === 200) {
      const data = await response.json();
      return { token: tokenCookie, user: user, data: data[0] };
    } else {
      return { token: tokenCookie, user: null, data: null };
    }
  } catch (err) {
    return { token: "", user: null, data: null };
  }
};

const Page = async ({ params }) => {
  const { data, token, user } = await fetchDetail(params.slug);

  if (!data) {
    notFound(); // Automatically show 404 page
  }

  const defaultImageUrl = "/images/doctor.jpg";

  const profile = data.imageUrl == null || data.imageUrl == "" ? defaultImageUrl : image_base_endpoint + data.imageUrl;

  return (
    <>
      <title>{`Dr. ${data.firstName} ${data.lastName} | ${appname}`}</title>
      <meta name="description" content={`${data.doctorAdditionalInfo?.title} ${data.doctorAdditionalInfo?.details}`.slice(0, 150)} />
      <AppBar
        leadingIcon={<FaArrowLeft className="h-5 w-5" />}
        title="Doctor Detail"
        trailingComponents={
          <div className="flex">
            <ProfileQR userId={data?.id} type={"Doctor"}></ProfileQR>
            <FavouriteToggle
              isFill={data.isFavourite}
              userId={user?.id}
              id={data.userId}
              type={1}
              token={token}
            />
            <ShareButton link={`${frontend_url}/doctor/${data.userId}`} />
          </div>
        }
      />

      <div className="pt-16">
        {/* Profile Section */}
        <div>
          <img
            src={profile}
            alt="Doctor"
            className="w-full h-[180px] object-contain"
          />
        </div>

        <div className="p-4">

          <div className="flex items-center space-x-4">
            {/* <img
              src={`${image_base_endpoint}${data.imageUrl}`}
              alt="Doctor"
              className="w-24 h-24 rounded-lg"
            /> */}
            <div>
              <h2 className="text-lg font-bold">Dr. {data.firstName} {data.lastName}</h2>
              <p className="text-gray-600">{data.degreeName}</p>
              <p className="text-red-500 font-semibold">{data.specialityName}</p>
              <p className="text-gray-500">{data.designation}</p>
              <p className="text-green-600 font-bold">Fee: {data.doctorFee}</p>
            </div>
          </div>
          <div className="mt-4 text-gray-700">
            <p><strong>Work At:</strong> {data.currentWorkingPlace}</p>
            <p><strong>Experience:</strong> {data.experience}</p>
            <p><strong>BMDC Number:</strong> {data.bmdCnumber}</p>
            <p className="flex items-center text-center">
              <strong className="mr-2">Rating:</strong>
              {data.averageRating} <FaStar className="ml-1 mr-1 text-yellow-400 text-[12px]" />
              ({data.totalRating} reviews)
            </p>
          </div>
          {data.emergencyNo !== null && <div className='mt-2'>
            <a
              href={`tel:${data.emergencyNo}`}
              className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              Emergency Call
            </a>

          </div>}

        </div>
      </div>

      {/* Doctor Tabs */}
      <DoctorTabs data={data} />

      {/* Appointment Booking */}
      <AppointmentBooking
        id={params.slug}
        token={token}
        user={user}
        chambers={data.chamberInformation}
      />
    </>
  );
};

export default Page;
