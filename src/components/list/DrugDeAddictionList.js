/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrugDeAddictionList } from '../../utils/func';
import { FaSpinner } from "react-icons/fa";
import DrugDeAddictionCard from '../DrugDeAddictionCard';

function DrugDeAddictionList({ location, nextPage }) {
    const dispatch = useDispatch();
    const { data, loading, page, error } = useSelector((state) => state.dental);
    const loader = useRef(null);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !loading && nextPage !== -1) {
            getDrugDeAddictionList({ dispatch, lat: localStorage.getItem("lat"), lon: localStorage.getItem("lon"), page: page })
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
            {loading == false && data.length == 0 ? <div className='h-[300px] w-full flex items-center justify-center text-2xl'>No data available</div> : <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {data.map((d) => (
<<<<<<< HEAD
                    <DrugDeAddictionCard key={d.id} data={d}></DrugDeAddictionCard>
=======
                    <DrugDeAddictionCard key={d.id} data={d} />
>>>>>>> jewel
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
                        <span className="text-gray-600">Loading Drug De Addiction...</span>
                    </div>
                )}
            </div>
        </>

    )
}

export default DrugDeAddictionList