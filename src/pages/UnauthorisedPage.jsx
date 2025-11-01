// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.scss'; // General page styling

const UnauthorizedPage = () => {
  return (
    <div className="page-container unauthorized-page">
      <h1 className="page-title">403 - Unauthorized Access</h1>
      <p className="page-message">You do not have the necessary permissions to view this page.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default UnauthorizedPage;