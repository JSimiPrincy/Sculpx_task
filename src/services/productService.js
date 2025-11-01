// src/services/productService.js
import api from '../utils/api';

const PRODUCT_BASE_URL = '/products';

const productService = {
  async getAllProducts(queryParams = {}) {
    try {
      // Convert queryParams object into a URL query string
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await api.get(`${PRODUCT_BASE_URL}?${queryString}`);
      return response.data; // Includes products, totalCount, results
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch products';
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`${PRODUCT_BASE_URL}/${id}`);
      return response.data.data.product;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch product';
    }
  },

  async createProduct(productData) {
    try {
      const response = await api.post(PRODUCT_BASE_URL, productData);
      return response.data.data.product;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create product';
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.patch(`${PRODUCT_BASE_URL}/${id}`, productData);
      return response.data.data.product;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update product';
    }
  },

  async deleteProduct(id) {
    try {
      await api.delete(`${PRODUCT_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete product';
    }
  },

  async exportProducts(queryParams = {}) {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await api.get(`${PRODUCT_BASE_URL}/export?${queryString}`, {
        responseType: 'blob', // Important for file downloads
      });
      // Create a Blob from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products.csv'); // Or get filename from Content-Disposition header
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to export products';
    }
  },
};

export default productService;