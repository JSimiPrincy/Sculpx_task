// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.scss';

const NotFoundPage = () => {
  return (
    <div className="page-container not-found-page">
      <h1 className="page-title">404 - Page Not Found</h1>
      <p className="page-message">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;