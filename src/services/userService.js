// src/services/userService.js
import api from '../utils/api';

const USER_BASE_URL = '/users';

const userService = {
  async getAllUsers() {
    try {
      const response = await api.get(USER_BASE_URL);
      return response.data.data.users;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`${USER_BASE_URL}/${id}`);
      return response.data.data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch user';
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await api.patch(`${USER_BASE_URL}/${id}`, userData);
      return response.data.data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update user';
    }
  },

  async deleteUser(id) {
    try {
      await api.delete(`${USER_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete user';
    }
  },
};

export default userService;