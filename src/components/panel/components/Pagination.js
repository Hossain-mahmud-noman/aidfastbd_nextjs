import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the start and end page for the visible page buttons (limit to 6 pages)
  const maxVisiblePages = 6;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevRange = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1);
    }
  };

  const handleNextRange = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
        onClick={handlePrevRange}
        disabled={startPage === 1}
      >
        &laquo; Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
        onClick={handleNextRange}
        disabled={endPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
