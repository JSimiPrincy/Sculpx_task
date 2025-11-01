// src/components/Common/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Search</button>
      {searchTerm && (
        <button type="button" className="btn btn-secondary clear-btn" onClick={() => {
          setSearchTerm('');
          onSearch(''); // Clear search results
        }}>Clear</button>
      )}
    </form>
  );
};

export default SearchBar;