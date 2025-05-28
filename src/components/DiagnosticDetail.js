
import { image_base_endpoint } from "../utils/constants";
import TextTicker from "./TextTicker";
import DiaLocation from "./DiaLocation";
import Image from "next/image";

const DiagnosticDetail = ({ data }) => {
  const defaultImageUrl = "/images/diagnostic.jpg";
  const profile = data?.profileImageUrl == null || data?.profileImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.profileImageUrl;
  const cover = data?.coverImageUrl == null || data?.coverImageUrl == "" ? defaultImageUrl : image_base_endpoint + data?.coverImageUrl;
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="w-full lg:h-[70vh] md:h-[50vh] h-[30vh] overflow-hidden">
        <Image
          width={1000}
          height={1000}
          priority={false}
          src={cover}
          alt="Diagnostic Center cover"
          className="w-full h-full object-fill "
        />
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 mt-4">
        {/* Logo and Name */}
        <div className="flex items-center ">
          <Image
            width={100}
            height={100}
            src={profile}
            alt="Diagnostic Center Logo"
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
              <DiaLocation lat={data?.latitude} lon={data?.longitude} ></DiaLocation>
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
  );
};

export default DiagnosticDetail;
