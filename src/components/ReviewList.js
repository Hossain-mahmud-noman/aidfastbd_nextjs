'use client';

import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from 'next/image';


function ReviewList({ reviews = [], totalRatings, averageRating }) {

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={`full-${i}`} className="text-primary inline-block" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <FaStarHalfAlt
                    key="half"
                    className="text-primary inline-block"
                />
            );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <FaStar
                    key={`empty-${i}`}
                    className="text-gray-300 inline-block"
                />
            );
        }

        return stars;
    };

    return (
        <div>  <div className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-4">
                <div className="text-4xl font-bold text-gray-800">
                    {averageRating}
                </div>
                <div className="flex items-center">
                    {renderStars(averageRating)}
                </div>
            </div>
            <p className="text-gray-600 mt-2">
                Based on {totalRatings} ratings
            </p>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                {reviews?.map((review,index) => (
                    <div
                        key={`review_${index}`}
                        className=" bg-white border border-primary p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-custom-light"
                    >
                        <div className="flex items-center mb-2">
                            <Image
                                width={100}
                                height={100}
                                src={`https://cdn-icons-png.flaticon.com/128/666/666201.png`}
                                alt={review.username}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = <BiUserCircle className="w-10 h-10" />;
                                }}
                            />
                            <div className="ml-3">
                                <h3 className="font-semibold text-gray-800">{review?.userName}</h3>
                                <p className="text-sm text-gray-600">
                                    {new Date(review?.reviewDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center mb-2">
                            {renderStars(review?.star)}
                        </div>
                        {/* <p className="text-gray-700">{review?.remarks}</p> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewList