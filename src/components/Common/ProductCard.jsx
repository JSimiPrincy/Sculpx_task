// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} />
      </Link>
      <div className="product-info">
        <h3>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
        </p>
        {!product.availableForPurchase && (
          <p className="product-unavailable">Not available for purchase</p>
        )}
      </div>
      <div className="product-actions">
        <Link to={`/products/${product._id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;