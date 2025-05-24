'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BloodBankCard from '../BloodBankCard';
import { getBloodList } from '../../utils/func';
import { FaSpinner } from "react-icons/fa";

function BloodList({ location, nextPage }) {
    const dispatch = useDispatch();

    const { data, loading, page, error } = useSelector((state) => state.blood);

    const loader = useRef(null);
    
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !loading && nextPage !== -1) {
            // getBloodList({ dispatch, lat: location.lat, lon: location.lng, page: page })
            getBloodList({ dispatch, lat: localStorage.getItem("lat"), lon: localStorage.getItem("lon"), page: page })
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handleObserver, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading]);


    return (
        <>
            <>
                {loading == false && data.length == 0 ? <div className='h-[300px] w-full flex items-center justify-center text-2xl'>No data available</div> : <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {data.map((d) => (
                        <BloodBankCard key={d.id} data={d}></BloodBankCard>
                    ))}
                </div>}


                <div
                    ref={loader}
                    className="flex items-center justify-center p-4 mt-6"
                    role="status"
                    aria-label="Loading more content"
                >
                    {loading && (
                        <div className="flex items-center space-x-2">
                            <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
                            <span className="text-gray-600">Loading blood banks...</span>
                        </div>
                    )}
                </div>
            </>
            {/* } */}
        </>
    )
}

export default BloodList