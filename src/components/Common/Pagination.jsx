// src/components/Common/Pagination.jsx
import React from 'react';
import './Pagination.scss';

const Pagination = ({ currentPage, totalCount, limit, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null; // No need for pagination if only one page or less

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-secondary"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-secondary"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;