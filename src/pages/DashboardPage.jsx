// src/pages/DashboardPage.jsx
import React from 'react';
import useAuth from '../hooks/useAuth';
import './DashboardPage.scss';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Welcome to your Dashboard, {user?.name || 'User'}!</h1>
      <p className="page-message">Your role: {user?.role}</p>

      <section className="dashboard-widgets">
        <div className="widget-card">
          <h3>Recent Activity</h3>
          <p>No recent activity.</p>
          {/* Add more dynamic content here */}
        </div>
        <div className="widget-card">
          <h3>Your Products</h3>
          <p>View or manage your assigned products.</p>
          {/* Link to product list filtered by user if applicable */}
        </div>
        {user?.role === 'admin' && (
          <div className="widget-card admin-widget">
            <h3>Admin Tools</h3>
            <p>Access user management and other administrative functions.</p>
            {/* Link to admin-specific pages */}
          </div>
        )}
      </section>

      <p className="dashboard-footer">Explore the navigation to manage products or users.</p>
    </div>
  );
};

export default DashboardPage;