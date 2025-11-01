// src/components/Forms/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import './ProductForm.scss';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Food'];

const ProductForm = ({ onSubmit, initialData = {}, isEditMode = false, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
    availableForPurchase: true,
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        stock: initialData.stock || '',
        imageUrl: initialData.imageUrl || '',
        availableForPurchase: initialData.availableForPurchase !== undefined ? initialData.availableForPurchase : true,
      });
    }
  }, [isEditMode, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="product-form form-card">
      <h2 className="text-center">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Gaming Laptop"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A detailed description of the product..."
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 1200.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g., 50"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="availableForPurchase"
            name="availableForPurchase"
            checked={formData.availableForPurchase}
            onChange={handleChange}
          />
          <label htmlFor="availableForPurchase">Available for Purchase</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : (isEditMode ? 'Update Product' : 'Add Product')}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;