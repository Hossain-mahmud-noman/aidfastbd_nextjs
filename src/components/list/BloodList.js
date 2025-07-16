'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import BloodBankCard from '../BloodBankCard';
import { FaSpinner } from 'react-icons/fa';
import SearchBlood from '../search/SearchBlood';

const BloodList = () => {
   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const loaderRef = useRef(null);
   const firstLoadRef = useRef(false);

   const fetchBloodBanks = async (pageNumber) => {
      if (loading || !hasMore) return;
      try {
         setLoading(true);
         const lat = localStorage.getItem('lat') || '';
         const lon = localStorage.getItem('lon') || '';

         const res = await axios.get(
            `https://api.aidfastbd.com/api/GeneralWeb/GetAllBloodBankList?pageNumber=${pageNumber}&lat=${lat}&lon=${lon}`
         );

         const response = res.data;
         const newData = response?.data || [];

         setData((prev) => [...prev, ...newData]);

         const totalRecords = response?.totalRecords || 0;
         const pageSize = response?.pageSize || 15;
         const totalPages = Math.ceil(totalRecords / pageSize);

         if (pageNumber >= totalPages) {
            setHasMore(false);
         }
      } catch (error) {
         console.error('Failed to fetch blood banks:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (!firstLoadRef.current) {
         fetchBloodBanks(1);
         firstLoadRef.current = true;
      }
   }, []);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting && hasMore && !loading) {
               const nextPage = page + 1;
               setPage(nextPage);
               fetchBloodBanks(nextPage);
            }
         },
         { root: null, rootMargin: '0px', threshold: 1.0 }
      );

      if (loaderRef.current) {
         observer.observe(loaderRef.current);
      }

      return () => {
         if (loaderRef.current) {
            observer.unobserve(loaderRef.current);
         }
      };
   }, [hasMore, loading, page]);

   return (
      <div className="p-4">
         <div className='py-5'>
            <SearchBlood />
         </div>
         <h1 className="text-xl font-bold mb-4">Blood Banks</h1>

         {data.length === 0 && !loading ? (
            <div className="h-[300px] w-full flex items-center justify-center text-2xl text-gray-500">
               No data available
            </div>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {data.map((d, index) => (
                  <BloodBankCard key={`${d.id}-${index}`} data={d} />
               ))}
            </div>
         )}

         {hasMore && (
            <div
               ref={loaderRef}
               className="flex items-center justify-center p-4 mt-6"
               role="status"
            >
               {loading && (
                  <div className="flex items-center space-x-2 text-indigo-600">
                     <FaSpinner className="animate-spin text-xl" />
                     <span>Loading blood banks...</span>
                  </div>
               )}
            </div>
         )}

         {!hasMore && data.length > 0 && (
            <div className="text-center text-gray-500 mt-6">No more blood banks.</div>
         )}
      </div>
   );
};

export default BloodList;
