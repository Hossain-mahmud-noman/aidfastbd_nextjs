'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DiagnosticCenterCard from '../DiagnosticCenterCard';
import { FaSpinner } from 'react-icons/fa';

const DiagnosticList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const firstLoadRef = useRef(false); // ✅ flag to avoid double-fetch

  const fetchDiagnostics = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const lat = localStorage.getItem('lat') || '';
      const lon = localStorage.getItem('lon') || '';

      const res = await axios.get(`https://api.aidfastbd.com/api/GeneralWeb/GetAllDiagnosticCenterList?pageNumber=${pageNumber}&lat=${lat}&lon=${lon}`);
      const response = res.data;
      const newDiagnostics = response?.data || [];

      setData((prev) => [...prev, ...newDiagnostics]);

      const totalRecords = response?.totalRecords || 0;
      const pageSize = response?.pageSize || 15;
      const totalPages = Math.ceil(totalRecords / pageSize);

      if (pageNumber >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch diagnostic centers:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ First load only
  useEffect(() => {
    if (!firstLoadRef.current) {
      fetchDiagnostics(1);
      firstLoadRef.current = true;
    }
  }, []);

  // ✅ Infinite scroll (fetch next page when scrolled)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchDiagnostics(nextPage); // directly fetch the next page
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
  }, [loading, hasMore, page]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Diagnostic Centers</h1>

      {data.length === 0 && !loading ? (
        <div className="h-[300px] w-full flex items-center justify-center text-2xl text-gray-500">
          No data available
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {data.map((d, index) => (
            <DiagnosticCenterCard key={`${d.id}-${index}`} diagnostic={d} />
          ))}
        </div>
      )}

      {hasMore && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center py-6"
          role="status"
        >
          {loading && (
            <div className="flex items-center space-x-2 text-indigo-600">
              <FaSpinner className="animate-spin text-xl" />
              <span>Loading Diagnostics...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && data.length > 0 && (
        <div className="text-center text-gray-500 mt-6">
          No more diagnostic centers.
        </div>
      )}
    </div>
  );
};

export default DiagnosticList;
