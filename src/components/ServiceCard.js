import Image from "next/image";
import { image_base_endpoint } from "../utils/constants";
import { FaStar, FaPhone } from "react-icons/fa";
import Link from "next/link";
import ContacTactModal from "../utils/contactModal";
import { useState } from "react";

const ServiceCard = ({ data, slug, nurse = false }) => {
  const defaultImageUrl = "/images/dental.png";
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const imageUrl = data.profileImageUrl
    ? `${image_base_endpoint}${data.profileImageUrl}`
    : defaultImageUrl;
  return (
    <div>
      <div
        className="border hover:shadow-custom-light flex flex-col h-full bg-white rounded-lg  transition-all duration-300 shadow-md"
        aria-label={`Dental ${data.name} information card`}
      >
        <Link
          // href={`/${slug}/` + data.id}
          href={nurse == true ? `/${slug}/` + data.userId : `/${slug}/` + data.id}
          className="flex-1 pl-3 pt-3 pr-3 pb-1"
        >
          <div className="flex justify-center">
            <Image
              width={1000}
              height={1000}
              src={imageUrl}
              placeholder="blur"
              blurDataURL="https://user-images.githubusercontent.com/160484/173871411-4d27b6dd-af89-4568-863c-c59b1242ce74.png"
              priority={false}
              alt={data.name}
              className="w-40 h-36 sm:w-52 sm:h-52 object-cover rounded-full"
            />
          </div>
          <h3 className="text-md mt-2 text-black mb-1 line-clamp-3">
            {data.name}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="text-xs sm:text-sm md:text-base text-gray-600">
              {data.averageRating} ({data.totalRating} ratings)
            </span>
          </div>
        </Link>

        <hr className="border-t border-gray-300 mb-2" />

        <div className="px-2 pb-2">
          <button
            onClick={handleOpen}
            className="relative z-10 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
          >
            <FaPhone className="mr-2 text-lg sm:text-xl" />
            <span className="text-sm sm:text-base md:text-lg">Contact</span>
          </button>
        </div>
      </div>
      <ContacTactModal
        contact={data.contact}
        open={showModal}
        onClose={handleClose}
      />
    </div>
  );
};

export default ServiceCard;
