import Link from 'next/link';
import { image_base_endpoint } from '../utils/constants';
import { FaStar, FaPhone } from "react-icons/fa";
import Image from 'next/image';

const DiagnosticCenterCard = ({ diagnostic, slug }) => {
    const defaultImageUrl = "/images/diagnostic.jpg";
    const imageUrl = diagnostic.profileImage !== null && diagnostic.profileImage !== "" ? `${image_base_endpoint}${diagnostic.profileImage}` : defaultImageUrl;
    return (
        <Link href={"/diagnostic/" + diagnostic.userId}>
            <div
                className={`${slug === 'page' ? "shadow-custom-light" : "shadow-md hover:shadow-custom-light"} border border-primary flex flex-col h-full bg-white rounded-lg transition-all duration-300`}
                aria-label={`Diagnostic ${diagnostic.name} information card`}
            >
                <div className="flex-1 p-1 md:p-2">
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
                            className="w-10 h-10 md:w-16 md:h-16 lg:w-32 lg:h-32 xl:w-28 xl:h-28 object-cover rounded-full border border-primary" 
                        />
                    </div>

                    <h3 className="md:text-md text-[10px] lg:text-xl xl:text-lg mt-1 md:mt-2 text-black mb-1 line-clamp-2">{diagnostic.name}</h3>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 md:text-md text-[10px] lg:text-xl xl:text-lg mr-1" />
                        <span className="md:text-md text-[10px] lg:text-xl xl:text-lg text-gray-600">
                            {diagnostic.rating} (ratings)
                        </span>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t border-gray-300 mb-2" />

                {/* Contact Button */}
                <div className='p-1 md:p-2'>
                    <button
                        className="w-full bg-blue-500 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg"
                    >
                        <FaPhone className="mr-1 md:mr-2 text-[10px] md:text-base lg:text-lg" /> 
                        <span className="text-[10px] md:text-base lg:text-lg">Contact</span> 
                    </button>
                </div>
            </div>
        </Link>

    );
};

export default DiagnosticCenterCard;
