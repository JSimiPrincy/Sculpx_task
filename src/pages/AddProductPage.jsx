// src/pages/AddProductPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/Common/ProductForm';
import productService from '../services/productService';
import './AddProductPage.scss'; // Page-specific styling

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      await productService.createProduct(productData);
      alert('Product added successfully!');
      navigate('/products'); // Redirect to product list after successful add
    } catch (err) {
      setError(err);
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h1 className="page-title">Add New Product</h1>
      <ProductForm onSubmit={handleAddProduct} loading={loading} error={error} />
    </div>
  );
};

export default AddProductPage;