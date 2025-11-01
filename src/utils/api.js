// src/utils/api.js
import axios from 'axios';
import authService from '../services/authService'; // We'll create this soon

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is crucial for sending/receiving cookies (refresh token)
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is 401 Unauthorized and not a retry attempt
    // And if it's not the refresh token endpoint itself (to avoid infinite loop)
    if (error.response && error.response.status === 401 && !originalRequest._retry && originalRequest.url !== `${API_BASE_URL}/auth/refresh-token`) {
      originalRequest._retry = true;
      try {
        // Attempt to get a new access token using the refresh token (sent via cookie)
        const res = await authService.refreshToken();
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          // Update the authorization header for the original request
          api.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
          return api(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        // If refresh token also fails, log out the user
        authService.logout(); // Clear tokens and redirect
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;