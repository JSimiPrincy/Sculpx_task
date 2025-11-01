// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss'; // Component-specific styling

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to SCULPTECH LABS</h1>
        <p>Your one-stop solution for managing cutting-edge products.</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">View Products</Link>
          <Link to="/login" className="btn btn-outline">Login / Register</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Secure Authentication</h3>
            <p>Robust user login and registration with JWT and refresh tokens.</p>
          </div>
          <div className="feature-item">
            <h3>Product Management</h3>
            <p>Add, view, update, and delete products with rich details.</p>
          </div>
          <div className="feature-item">
            <h3>Advanced Filtering</h3>
            <p>Easily search, filter, sort, and paginate through your product catalog.</p>
          </div>
          <div className="feature-item">
            <h3>Role-Based Access</h3>
            <p>Granular control over who can access what, based on user roles (Admin, Manager, User).</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;