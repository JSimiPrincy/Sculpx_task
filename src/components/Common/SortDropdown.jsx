// src/components/Common/SortDropdown.jsx
import React from 'react';
import './SortDropdown.scss';

const SortDropdown = ({ onSort, currentSort }) => {
  const sortOptions = [
    { label: 'Newest First', value: '-createdAt' },
    { label: 'Oldest First', value: 'createdAt' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
    { label: 'Name: A-Z', value: 'name' },
    { label: 'Name: Z-A', value: '-name' },
  ];

  const handleChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={currentSort} onChange={handleChange}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;