// src/components/Common/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import './FilterPanel.scss';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Food'];

const FilterPanel = ({ onFilter, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    priceMin: initialFilters.priceMin || '',
    priceMax: initialFilters.priceMax || '',
    availableForPurchase: initialFilters.availableForPurchase || 'all',
  });

  useEffect(() => {
    setFilters({
      category: initialFilters.category || '',
      priceMin: initialFilters.priceMin || '',
      priceMax: initialFilters.priceMax || '',
      availableForPurchase: initialFilters.availableForPurchase || 'all',
    });
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      category: '',
      priceMin: '',
      priceMax: '',
      availableForPurchase: 'all',
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <div className="filter-panel form-card">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={filters.category} onChange={handleChange}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price Range</label>
          <div className="price-inputs">
            <input
              type="number"
              name="priceMin"
              placeholder="Min"
              value={filters.priceMin}
              onChange={handleChange}
            />
            <span>-</span>
            <input
              type="number"
              name="priceMax"
              placeholder="Max"
              value={filters.priceMax}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="availableForPurchase">Availability</label>
          <select id="availableForPurchase" name="availableForPurchase" value={filters.availableForPurchase} onChange={handleChange}>
            <option value="all">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">Apply Filters</button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear Filters</button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;