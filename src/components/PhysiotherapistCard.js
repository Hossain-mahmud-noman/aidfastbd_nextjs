import Link from "next/link";
import { image_base_endpoint } from "../utils/constants";
import { FaStar, FaStethoscope, FaPhone } from "react-icons/fa";
import Image from "next/image";
import { FaBriefcaseMedical } from "react-icons/fa6";

const PhysiotherapistCard = ({
  doctor,
  lat = null,
  lon = null,
  id = null,
  diagnosticCenterid = null,
}) => {
  const defaultImageUrl = "/images/doctor.jpg";
  const profile =
    doctor.imageUrl == null || doctor.imageUrl == ""
      ? defaultImageUrl
      : image_base_endpoint + doctor.imageUrl;
  return (
    <div className="border border-primary rounded-lg md:rounded-xl flex flex-col h-full bg-primary/10 shadow-lg hover:shadow-custom-light transition-all duration-300 ">
      <div className="flex items-center justify-center gap-2 bg-primary m-3 py-2 rounded-[20px]">
        <FaBriefcaseMedical className="text-white text-sm" />
        <p className="text-white text-xs mt-0.5">Healthcare Processional</p>
      </div>
      <div className="flex justify-center">
        <Image
          width={1000}
          height={1000}
          src={`${profile}`}
          alt={`Dr. ${doctor.name}`}
          className="rounded-full w-20 border-2 border-primary"
        />
      </div>

      <div className="flex-1 p-3">
        <h3 className="text-md md:text-lg text-black my-1 text-center">{doctor.name}</h3>
        <div className="my-2 border border-green-400 bg-green-100 p-2 rounded-lg md:rounded-xl">
          <p className="text-center text-gray-500 text-xs">Degree</p>
          <p className="sm:text-sm text-yellow-600 text-center mt-2">
            {doctor.degree}
          </p>
          <hr className="border-t border-purple-300 my-2" />
          <p className="text-center text-gray-500 text-xs">Experience</p>
          <p className="sm:text-sm text-purple-600 text-center mt-2">
            {doctor.experience} Years
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapistCard;
