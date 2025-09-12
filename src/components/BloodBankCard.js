import Image from "next/image";
import { image_base_endpoint } from "../utils/constants";
import { FaStar, FaPhone } from "react-icons/fa";
import Link from "next/link";

const BloodBankCard = ({ data }) => {
  const defaultImageUrl = "/images/blood.jpg";
  const imageUrl = data.profileImageUrl
    ? `${image_base_endpoint}${data.profileImageUrl}`
    : defaultImageUrl;

  return (
    <Link href={"/blood/" + data.userId}>
      <div
        className="flex flex-col h-full bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-custom-light"
        aria-label={`Blood Bank ${data.name} information card`}
      >
        <div className="flex-1 pl-3 pt-3 pr-3 pb-1">
          {/* Centering the image */}
          <div className="flex justify-center">
            <Image
              width={1000}
              height={1000}
              src={imageUrl}
              priority={false}
              alt={data.name}
              className="w-28 h-28 md:w-40 md:h-40 xl:w-48 xl:h-48 object-cover border border-primary rounded-full" // Fixed sizes
            />
          </div>

          <h3 className="text-sm md:text-md xl:text-lg text-black mb-1 line-clamp-3">
            {data.name}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="text-xs sm:text-sm md:text-base text-gray-600">
              {data.averageRating} ({data.totalRating} ratings)
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-t border-gray-300 mb-2" />

        {/* Contact Button */}
        <div className="px-2 pb-2">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg">
            <FaPhone className="mr-2 text-lg sm:text-xl" />{" "}
            {/* Responsive icon size */}
            <span className="text-sm sm:text-base md:text-lg">
              Contact
            </span>{" "}
            {/* Responsive text size */}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BloodBankCard;
