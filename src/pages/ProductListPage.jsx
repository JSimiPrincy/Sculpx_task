// src/pages/ProductListPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import useAuth from '../hooks/useAuth';
import ProductCard from '../components/Common/ProductCard';
import SearchBar from '../components/Common/SearchBar';
import SortDropdown from '../components/Common/SortDropdown';
import FilterPanel from '../components/Common/FilterPanel';
import Pagination from '../components/Common/Pagination';
import { ROLES } from '../utils/constants';
import './ProductListPage.scss';

const ProductListPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 12,
    sort: '-createdAt',
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
    availableForPurchase: 'all',
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build API query params based on current state
      const apiQueryParams = {
        page: queryParams.page,
        limit: queryParams.limit,
        sort: queryParams.sort,
      };
      if (queryParams.search) apiQueryParams.search = queryParams.search;
      if (queryParams.category) apiQueryParams.category = queryParams.category;
      if (queryParams.priceMin) apiQueryParams['price[gte]'] = queryParams.priceMin;
      if (queryParams.priceMax) apiQueryParams['price[lte]'] = queryParams.priceMax;
      if (queryParams.availableForPurchase !== 'all') {
        apiQueryParams.availableForPurchase = queryParams.availableForPurchase;
      }

      const data = await productService.getAllProducts(apiQueryParams);
      setProducts(data.data.products);
      setTotalProducts(data.totalCount);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleSearch = (searchTerm) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleSort = (sortOption) => {
    setQueryParams((prev) => ({ ...prev, sort: sortOption, page: 1 }));
  };

  const handleFilter = (filters) => {
    setQueryParams((prev) => ({
      ...prev,
      category: filters.category,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      availableForPurchase: filters.availableForPurchase,
      page: 1, // Reset to first page on new filters
    }));
  };

  const handleExport = async () => {
    // Exclude pagination/limit from export query
    const exportQueryParams = { ...queryParams };
    delete exportQueryParams.page;
    delete exportQueryParams.limit;

    try {
      await productService.exportProducts(exportQueryParams);
      alert('Products exported successfully!');
    } catch (err) {
      alert(`Export failed: ${err}`);
      console.error(err);
    }
  };

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  const canManageProducts = isAuthenticated && (user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER);

  return (
    <div className="product-list-page">
      <h1 className="page-title">Product Catalog</h1>

      <div className="product-controls">
        <SearchBar onSearch={handleSearch} />
        <div className="action-buttons">
          {canManageProducts && (
            <Link to="/products/add" className="btn btn-primary">Add New Product</Link>
          )}
          {canManageProducts && (
             <button onClick={handleExport} className="btn btn-secondary">Export to CSV</button>
          )}
        </div>
      </div>

      <div className="product-content-area">
        <FilterPanel onFilter={handleFilter} initialFilters={{
          category: queryParams.category,
          priceMin: queryParams.priceMin,
          priceMax: queryParams.priceMax,
          availableForPurchase: queryParams.availableForPurchase,
        }} />

        <div className="product-main-view">
          <div className="product-list-header">
            <p className="results-count">Showing {products.length} of {totalProducts} products</p>
            <SortDropdown onSort={handleSort} currentSort={queryParams.sort} />
          </div>

          {products.length === 0 ? (
            <p className="no-products-message">No products found matching your criteria.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={queryParams.page}
            totalCount={totalProducts}
            limit={queryParams.limit}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;