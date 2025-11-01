// src/services/authService.js
import api from '../utils/api';

const AUTH_BASE_URL = '/auth';

const authService = {
  async register(userData) {
    try {
      const response = await api.post(`${AUTH_BASE_URL}/register`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Registration failed';
    }
  },

  async login(credentials) {
    try {
      const response = await api.post(`${AUTH_BASE_URL}/login`, credentials);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Login failed';
    }
  },

  async logout() {
    try {
      await api.get(`${AUTH_BASE_URL}/logout`);
      localStorage.removeItem('accessToken');
    } catch (error) {
      // Even if logout fails on server, clear client-side token
      localStorage.removeItem('accessToken');
      console.error('Logout failed:', error.response.data.message || error.message);
    }
  },

  async refreshToken() {
    try {
      // The refresh token is sent automatically via cookie (withCredentials: true)
      const response = await api.get(`${AUTH_BASE_URL}/refresh-token`);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to refresh token';
    }
  },

  getCurrentUser() {
    // This is just a placeholder. In a real app, you might decode the JWT or have a /me endpoint
    // For now, we'll rely on the /me endpoint once implemented or simply return a basic user
    // The `user` object returned from login/register should be stored in context.
    // For a quick check, you could retrieve accessToken.
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // In a real app, you'd decode the JWT to get user info without another API call
      // For now, if accessToken exists, assume user is logged in
      return true; // Or return parsed user info if you have a JWT decoder
    }
    return null;
  }
};

export default authService;