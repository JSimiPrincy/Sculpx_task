// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import api from '../utils/api'; // Ensure API interceptor has access to logout

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to load user from access token (if available)
  const loadUser = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        // Here, you'd typically have a /api/v1/users/me endpoint
        // or decode the token to get user info if it's self-contained.
        // For simplicity, we'll assume a successful token means a logged-in user
        // and fetch full user details if needed from /users/me in a later step.
        // For now, we'll just set a placeholder user based on the presence of token.

        // TODO: Replace this with an actual API call to /api/v1/users/me
        // For now, let's assume we store minimal user data with access token
        const response = await api.get('/users/me'); // Make API call to get user details
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch user on app load:', error);
        localStorage.removeItem('accessToken'); // Clear invalid token
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();

    // Set `authService.logout` to be accessible by the api interceptor
    // This allows the interceptor to trigger a logout if refresh token fails
    api.interceptors.response.eject(api.interceptors.response.handlers[0]?.fulfilled); // Remove existing one if any
    api.interceptors.response.eject(api.interceptors.response.handlers[0]?.rejected); // Remove existing one if any
    
    // Re-add the response interceptor with access to the logout function
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry && originalRequest.url !== `${api.defaults.baseURL}/auth/refresh-token`) {
          originalRequest._retry = true;
          try {
            const res = await authService.refreshToken();
            if (res.accessToken) {
              localStorage.setItem('accessToken', res.accessToken);
              api.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            console.error('Refresh token failed, logging out:', refreshError);
            logout(); // Use the logout function from context
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [loadUser]);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // Redirect to login or home if not already handled by router
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};