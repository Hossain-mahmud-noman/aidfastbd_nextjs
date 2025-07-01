import Link from 'next/link';
import { image_base_endpoint } from '../utils/constants';
import { FaStar, FaPhone } from "react-icons/fa";
import Image from 'next/image';

const DiagnosticCenterCard = ({ diagnostic }) => {
    const defaultImageUrl = "/images/diagnostic.jpg";
    const imageUrl = diagnostic.profileImageUrl !== null && diagnostic.profileImageUrl !== "" ? `${image_base_endpoint}${diagnostic.profileImageUrl}` : defaultImageUrl;

    return (
        <Link href={"/diagnostic/" + diagnostic.userId}>
            <div
                className="flex flex-col h-full bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                aria-label={`Diagnostic ${diagnostic.name} information card`}
            >
                <div className="flex-1 pl-3 pt-3 pr-3 pb-1">
                    {/* Centering the image */}
                    <div className="flex justify-center">
                        <Image
                            width={1000}
                            height={1000}
                            src={imageUrl}
                            placeholder="blur"
                            blurDataURL="https://user-images.githubusercontent.com/160484/173871411-4d27b6dd-af89-4568-863c-c59b1242ce74.png"
                            priority={false}
                            alt={diagnostic.name}
                            className="w-40 h-36 sm:w-52 sm:h-52 object-cover rounded-full" 
                        />
                    </div>

                    <h3 className="text-md mt-2 text-black mb-1 line-clamp-3">{diagnostic.name}</h3>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-xs sm:text-sm md:text-base text-gray-600">
                            {diagnostic.averageRating} ({diagnostic.totalRating} ratings)
                        </span>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t border-gray-300 mb-2" />

                {/* Contact Button */}
                <div className='px-2 pb-2'>
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
                    >
                        <FaPhone className="mr-2 text-lg sm:text-xl" /> {/* Responsive icon size */}
                        <span className="text-sm sm:text-base md:text-lg">Contact</span> {/* Responsive text size */}
                    </button>
                </div>
            </div>
        </Link>

    );
};

export default DiagnosticCenterCard;
