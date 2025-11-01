// src/components/Auth/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AuthForm.scss'; // Component-specific styling

const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user', // Default role for registration
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLoginMode) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
  navigate('/products'); // Redirect to product list on successful auth
    } catch (err) {
      setError(err || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    navigate('/products');
    return null;
  }

  return (
    <div className="auth-form-container">
      <div className="form-card">
        <div className="auth-toggle">
          <button
            className={isLoginMode ? 'active' : ''}
            onClick={() => setIsLoginMode(true)}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={!isLoginMode ? 'active' : ''}
            onClick={() => setIsLoginMode(false)}
            disabled={loading}
          >
            Register
          </button>
        </div>

        <h2 className="text-center">{isLoginMode ? 'Login' : 'Register'}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required={!isLoginMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          {!isLoginMode && (
            <>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="********"
                  required={!isLoginMode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <small className="muted">Choose a role. Administrators should verify higher roles server-side.</small>
              </div>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Register')}
          </button>

          {isLoginMode && (
            <p className="forgot-password">
              <a href="#!">Forgot Password?</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;