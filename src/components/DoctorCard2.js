import Link from 'next/link';
import { image_base_endpoint } from '../utils/constants';
import { FaStar, FaStethoscope, FaPhone } from "react-icons/fa";
import Image from 'next/image';

const DoctorCard2 = ({ doctor, lat = null, lon = null, id = null }) => {

  const defaultImageUrl = "/images/doctor.jpg";
  const profile = doctor.imageUrl == null || doctor.imageUrl == "" ? defaultImageUrl : image_base_endpoint + doctor.imageUrl;
  return (
    <Link href={lat !== null && lon !== null && id !== null ? `/doctor/${id}?lat=${lat}&lon=${lon}` : "/doctor/" + doctor.userId}>
      <div
        className="flex  cursor-pointer flex-col h-full bg-white rounded-lg shadow-custom-light"
        aria-label={`Doctor ${doctor.name} information card`}
      >
        <Image
          width={1000}
          height={1000}
          placeholder="blur"
          blurDataURL="https://user-images.githubusercontent.com/160484/173871411-4d27b6dd-af89-4568-863c-c59b1242ce74.png"
          priority={false}
          src={`${profile}`}
          alt={`Dr. ${doctor.name}`}
          className="w-full h-20 sm:h-48 md:h-56 lg:h-64 object-contain rounded-t-lg"
        />

        <div className="flex-1 p-2 md:p-3">
          <h3 className="text-md lg:text-xl md:text-base text-[10px] text-black mb-1">Dr. {doctor.name}</h3>
          <p className="text-[10px] sm:text-sm md:text-base text-gray-600 mb-1">{doctor.degree}</p>

          <div className="flex items-center mb-1">
            <FaStethoscope className="text-blue-500 mr-1" />
            <span className="text-[8px] sm:text-sm md:text-base text-gray-600">
              {doctor.experience} years experience
            </span>
          </div>

          {doctor.averageRating !== undefined ? <div className="flex items-center mb-1">
            <FaStar className="text-yellow-500 mr-1 text-[8px] sm:text-sm md:text-base" />
            <span className="text-[8px] sm:text-sm md:text-base text-gray-600">
              {doctor.averageRating} ({doctor.totalRating} ratings)
            </span>
          </div> : <div className="flex items-center mb-1">
            <FaStar className="text-yellow-500 mr-1 text-[8px] sm:text-sm md:text-base" />
            <span className="text-[8px] sm:text-sm md:text-base text-gray-600">
              {doctor.rating}
            </span>
          </div>}

          <p className="text-[10px] sm:text-base md:text-lg font-semibold text-green-600">Fee {doctor.doctorFee}</p>
        </div>

        <hr className="border-t border-gray-300 mb-1 md:mb-2" />

        <div className='px-2 pb-2 mt-1 md:mt-3'>
          <button
            className="w-full bg-blue-500 text-white py-1 px-2.5 md:py-2 md:px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
          >
            <FaPhone className="mr-2 service-button" />
            <span className="service-button">Appointment</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard2;
