// src/components/Common/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.scss'; // Component-specific styling

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">SCULPTECH LABS</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            {loading ? (
              <li>Loading...</li>
            ) : isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {user && user.role === 'admin' && <li><Link to="/users">Users</Link></li>}
                <li><button onClick={handleLogout} className="btn-outline">Logout ({user?.name || 'User'})</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                {/* Registration is handled in the same form, but could have a separate link to AuthPage in register mode */}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;