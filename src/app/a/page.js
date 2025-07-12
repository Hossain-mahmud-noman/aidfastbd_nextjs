'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDoctors();
  }, [page]);

  const fetchDoctors = async () => {
    try {
      const pageNumber = page + 1; 
      const res = await axios.get(`https://api.aidfastbd.com/api/GeneralWeb/GetDoctorSearchList?pageNumber=${pageNumber}`);

      const response = res.data;
      setDoctors(response?.data || []);

      const totalRecords = response?.totalRecords || 0;
      const pageSize = response?.pageSize || 15; 
      const pages = Math.ceil(totalRecords / pageSize);
      setTotalPages(pages);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Doctors (Page {page + 1})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="border p-4 rounded shadow-sm">
            <img
              src={`https://api.aidfastbd.com/${doc.imageUrl}`}
              alt={doc.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{doc.name}</h2>
            <p className="text-sm text-gray-600">{doc.speciality}</p>
            <p className="text-sm">Fee: {doc.doctorFee}</p>
            <p className="text-sm">Experience: {doc.experience}</p>
            <p className="text-sm">Rating: {doc.averageRating} ⭐</p>
            <p className="text-sm">Location: {doc.location}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <ReactPaginate
            previousLabel={'← Prev'}
            nextLabel={'Next →'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center gap-2'}
            pageClassName={'border rounded px-3 py-1'}
            activeClassName={'bg-blue-500 text-white'}
            previousClassName={'border px-3 py-1 rounded'}
            nextClassName={'border px-3 py-1 rounded'}
            disabledClassName={'opacity-50 pointer-events-none'}
            forcePage={page}
          />
        </div>
      )}
    </div>
  );
};

export default Doctor;
