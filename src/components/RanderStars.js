import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function RenderStars(rating) {
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

