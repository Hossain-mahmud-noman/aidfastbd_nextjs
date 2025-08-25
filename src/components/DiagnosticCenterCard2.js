import Link from 'next/link';
import { image_base_endpoint } from '../utils/constants';
import { FaStar, FaPhone } from "react-icons/fa";
import Image from 'next/image';

const DiagnosticCenterCard2 = ({ diagnostic, slug }) => {
    const defaultImageUrl = "/images/diagnostic.jpg";
    const imageUrl = diagnostic.profileImage !== null && diagnostic.profileImage !== "" ? `${image_base_endpoint}${diagnostic.profileImage}` : defaultImageUrl;
    return (
        <Link href={"/diagnostic/" + diagnostic.userId}>
            <div
                className={`${slug === 'page' ? "shadow-custom-light" : "shadow-md hover:shadow-custom-light"} flex flex-col h-full bg-white rounded-lg transition-all duration-300`}
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
                            className="w-full h-20 sm:h-48 md:h-56 lg:h-64 object-cover rounded-full" 
                        />
                    </div>

                    <h3 className="text-md lg:text-xl md:text-base text-[10px] mt-1 md:mt-2 text-black mb-1 md:line-clamp-2 lg:line-clamp-3">{diagnostic.name}</h3>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1 text-[8px] sm:text-sm md:text-base" />
                        <span className="text-[8px] sm:text-sm md:text-base text-gray-600">
                            {diagnostic.rating} (ratings)
                        </span>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t border-gray-300 mb-2" />

                {/* Contact Button */}
                <div className='px-2 pb-2'>
                    <button
                        className="w-full bg-blue-500 text-white py-1 px-2.5 md:py-2 md:px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
                    >
                        <FaPhone className="md:mr-2 mr-1 service-button" /> 
                        <span className="service-button">Contact</span> 
                    </button>
                </div>
            </div>
        </Link>

    );
};

export default DiagnosticCenterCard2;
