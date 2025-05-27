'use client';

import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { base_endpoint, headerx } from '../utils/constants';

function FavouriteToggle({ isFill = false, userId = null, id, type, token }) {

    const [isFavorite, setIsFavorite] = useState(isFill);

    const toggleFavorite = () => {
        ToggleSatatus();
    };

    const ToggleSatatus = async () => {
        headerx['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`${base_endpoint}/GeneralInformation/FavouriteProfilesSaveUpdate`, { method: "POST", body: JSON.stringify({ "typeId": type, "profileUserId": id, "userId": userId, "isDeleted": isFavorite }), headers: headerx },);
        const data = await res.json();


        if (res.status == 200) {
            setIsFavorite((prev) => !prev);
        }

    }


    return (

        <div className="relative">

            <button
                onClick={toggleFavorite}
                className="p-2 rounded-md text-black hover:bg-black hover:bg-opacity-10 focus:outline-none transition duration-300 ease-in-out text-red-500 hover:text-red-600"
                aria-label="Open share options"
            >
                {isFavorite ? (
                    <AiFillHeart size={24} />
                ) : (
                    <AiOutlineHeart style={{ color: "black" }} size={24} />
                )}      </button>

        </div>

    );
}

export default FavouriteToggle;
