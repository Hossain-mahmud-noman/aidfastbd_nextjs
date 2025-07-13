'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../DoctorCard';
import { FaSpinner } from 'react-icons/fa';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const firstLoadRef = useRef(false); 

  const fetchDoctors = async (pageNumber) => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);

      const lat = localStorage.getItem('lat') || '';
      const lon = localStorage.getItem('lon') || '';

      const res = await axios.get(
        `https://api.aidfastbd.com/api/GeneralWeb/GetDoctorSearchList?pageNumber=${pageNumber}&lat=${lat}&lon=${lon}`
      );

      const response = res.data;
      const newDoctors = response?.data || [];

      setDoctors((prev) => [...prev, ...newDoctors]);

      const totalRecords = response?.totalRecords || 0;
      const pageSize = response?.pageSize || 15;
      const totalPages = Math.ceil(totalRecords / pageSize);

      if (pageNumber >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!firstLoadRef.current) {
      fetchDoctors(1);
      firstLoadRef.current = true;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchDoctors(nextPage); 
            return nextPage;
          });
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
  }, [loading, hasMore]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Doctors List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {doctors.map((doc, index) => (
          <DoctorCard key={`${doc.id}-${index}`} doctor={doc} />
        ))}
      </div>

      {hasMore && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center py-6"
          role="status"
        >
          {loading && (
            <div className="flex items-center space-x-2 text-indigo-600">
              <FaSpinner className="animate-spin text-xl" />
              <span>Loading Doctors...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-gray-500 mt-6">No more doctors.</div>
      )}
    </div>
  );
};

export default Doctor;
