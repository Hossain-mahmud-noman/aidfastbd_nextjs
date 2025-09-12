'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AmbulanceCard from '../AmbulanceCard';
import { FaSpinner } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

const AmbulanceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(0);

  const lat = typeof window !== 'undefined' ? localStorage.getItem('lat') || '' : '';
  const lon = typeof window !== 'undefined' ? localStorage.getItem('lon') || '' : '';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      setWindowWidth(window.innerWidth);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const fetchAmbulances = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.aidfastbd.com/api/GeneralWeb/GetAllAmbulanceList?pageNumber=${pageNumber}&lat=${lat}&lon=${lon}`
      );

      const response = res.data;
      const newData = response?.data || [];
      setData(newData);

      const totalRecords = response?.totalRecords || 0;
      const pageSize = response?.pageSize || 15;
      const totalPagesCalculated = Math.ceil(totalRecords / pageSize);
      setTotalPages(totalPagesCalculated);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error('Failed to fetch ambulance data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('pageNumber')) || 1;
    fetchAmbulances(pageFromUrl);
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('pageNumber', newPage);
      router.push(`/ambulance?${newSearchParams.toString()}`);
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = windowWidth >= 1024 ? 5 : 3;
    const pages = [];
    let startPage;
    let endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middle = Math.ceil(maxVisiblePages / 2);
      if (currentPage <= middle) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + middle - 1 >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middle + 1;
        endPage = currentPage + middle - 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ambulance List</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <FaSpinner className="animate-spin text-xl text-indigo-600" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="h-[300px] w-full flex items-center justify-center text-2xl text-gray-500">
              No data available
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 xl:gap-5">
              {data.map((d, index) => (
                <AmbulanceCard key={`${d.id}-${index}`} data={d} />
              ))}
            </div>
          )}
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center py-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:text-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          {getVisiblePages().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 border rounded-md ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:text-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AmbulanceList;