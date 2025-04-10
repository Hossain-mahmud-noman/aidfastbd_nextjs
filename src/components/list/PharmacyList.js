'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PharmacyCard from '../PharmacyCard';
import { getPharmacyList } from '../../utils/func';
import { FaSpinner } from "react-icons/fa";


function PharmacyList({ location, nextPage }) {
    const dispatch = useDispatch();

    const { data, loading, page, error } = useSelector((state) => state.pharmacy);


    const loader = useRef(null);
    // let x = 0;
    // useEffect(() => {
    //     if (data.length == 0 && nextPage == 2 && x == 0) {
    //         x = 1;
    //         getPharmacyList({ dispatch, lat: location.lat, lon: location.lng, page: nextPage })
    //     }
    // }, [])




    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !loading && nextPage !== -1) {
            // getPharmacyList({ dispatch, lat: location.lat, lon: location.lng, page: page })
            getPharmacyList({ dispatch, lat: localStorage.getItem("lat"), lon: localStorage.getItem("lon"), page: page })
            
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
            {/* {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) :  */}

            <>
                {loading == false && data.length == 0 ? <div className='h-[300px] w-full flex items-center justify-center text-2xl'>No data available</div> : <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {data.map((d) => (
                        <PharmacyCard key={d.id} data={d}></PharmacyCard>
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
                            <span className="text-gray-600">Loading pharmacies...</span>
                        </div>
                    )}
                </div>
            </>
            {/* } */}
        </>
    )
}

export default PharmacyList