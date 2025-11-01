// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../services/productService';
import useAuth from '../hooks/useAuth';
import ProductForm from '../components/Common/ProductForm';
import { ROLES } from '../utils/constants';
import './ProductDetailsPage.scss';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]); // Re-fetch if product ID changes

  const handleUpdateProduct = async (updatedData) => {
    setEditLoading(true);
    setEditError(null);
    try {
      const updatedProduct = await productService.updateProduct(id, updatedData);
      setProduct(updatedProduct);
      setIsEditing(false); // Exit edit mode
      alert('Product updated successfully!');
    } catch (err) {
      setEditError(err);
      console.error('Error updating product:', err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setLoading(true); // Indicate deletion is in progress
      setError(null);
      try {
        await productService.deleteProduct(id);
        alert('Product deleted successfully!');
        navigate('/products'); // Redirect to product list
      } catch (err) {
        setError(err);
        console.error('Error deleting product:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading || authLoading) return <p className="loading-message">Loading product details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!product) return <p className="no-product-message">Product not found.</p>;

  const canManageProduct = isAuthenticated && (user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER);

  return (
    <div className="product-details-page">
      <Link to="/products" className="back-link">&larr; Back to Products</Link>

      {isEditing ? (
        <ProductForm
          initialData={product}
          isEditMode={true}
          onSubmit={handleUpdateProduct}
          loading={editLoading}
          error={editError}
        />
      ) : (
        <div className="product-display-card form-card">
          <div className="product-image-container">
            <img src={product.imageUrl || 'https://via.placeholder.com/400x300'} alt={product.name} className="product-main-image" />
          </div>
          <div className="product-info-details">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-category">Category: <span>{product.category}</span></p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
              Stock: <span>{product.stock > 0 ? product.stock : 'Out of Stock'}</span>
            </p>
            <p className={`product-availability ${product.availableForPurchase ? 'available' : 'unavailable'}`}>
              Status: <span>{product.availableForPurchase ? 'Available for Purchase' : 'Not Available for Purchase'}</span>
            </p>
            <p className="product-created-at">Added on: <span>{new Date(product.createdAt).toLocaleDateString()}</span></p>

            {canManageProduct && (
              <div className="product-management-actions">
                <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Product</button>
                <button onClick={handleDeleteProduct} className="btn btn-danger">Delete Product</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;