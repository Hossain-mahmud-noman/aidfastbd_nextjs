'use client';

import { FaPhone, FaMapMarkerAlt, FaStar, FaStarHalf } from "react-icons/fa";
import { motion } from "framer-motion";
import { image_base_endpoint } from "../utils/constants";
import TextTicker from "./TextTicker";
import Image from "next/image";


const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalf className="text-yellow-400" />}
    </div>
  );
};


function DoctorDetail({ data }) {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Profile Section */}
        <div className="relative">
          <Image
            width={1000}
            height={1000}
            src={image_base_endpoint + data.imageUrl}
            alt="Doctor's profile"
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-white text-2xl font-bold">{data.firstName} {data.lastName}</h1>
            <p className="text-gray-200">{data.degreeName}</p>
          </div>
        </div>

        <div className="p-4">
          {/* Specializations */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {data.specialityName}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {renderStars(data.averageRating)}
            <span className="ml-2 text-gray-600">{data.averageRating} ({data.totalRating} reviews)</span>
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-500 mr-2" />
              <a href={`tel:${data.emergencyNo}`} className="text-blue-600 hover:underline">{data.emergencyNo}</a>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <span>{data.currentWorkingPlace}</span>
            </div>
          </div>

          {data.notice != null ? <TextTicker text={data.notice}></TextTicker> : null}

          {/* Chambers */}
          {/* <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Chambers</h2>
                        {data.chamberInformation.map((chamber, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                                <h3 className="font-medium">{chamber.name}</h3>
                                <p className="text-sm text-gray-600">Fee: {chamber.fee}</p>
                                <p className="text-sm text-gray-600 mt-1">Timings:</p>
                                {Object.entries(chamber.timings).map(([day, time]) => (
                                    <p key={day} className="text-xs text-gray-500">{day}: {time}</p>
                                ))}
                                <p className="text-sm text-gray-600 mt-1">{chamber.location}</p>
                            </div>
                        ))}
                    </div> */}

          {/* Reviews */}
          {/* <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
                        {doctor.reviews.slice(0, showAllReviews ? doctor.reviews.length : 2).map((review, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                                <div className="flex items-center mb-1">
                                    <span className="font-medium mr-2">{review.user}</span>
                                    {renderStars(review.rating)}
                                </div>
                                <p className="text-sm text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                        {doctor.reviews.length > 2 && (
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                {showAllReviews ? "Show less" : "Show all reviews"}
                            </button>
                        )}
                        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Add Review
                        </button>
                    </div> */}

          {/* Additional Information */}
          <div>
            <h2 className="text-lg font-semibold mb-2">{data.doctorAdditionalInfo.title}</h2>
            <p>{data.doctorAdditionalInfo.details}</p>
            <Image height={100} width={100} alt="Additional Information" src={image_base_endpoint + data.doctorAdditionalInfo.imageUrl} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default DoctorDetail

