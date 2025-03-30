/**
 * Products API functions
 */
import { api } from './client';
import { mockProducts } from './mockData';

// Flag to use mock data or real API
const USE_MOCK_DATA = true;

export const productApi = {
  /**
   * Get all products
   */
  getAllProducts: async (params = {}) => {
    if (USE_MOCK_DATA) {
      // If limit is specified, return only that many products
      if (params.limit && typeof params.limit === 'number') {
        return mockProducts.slice(0, params.limit);
      }
      return mockProducts;
    }

    try {
      const queryParams = new URLSearchParams(params).toString();
      const endpoint = `/products${queryParams ? `?${queryParams}` : ''}`;
      return await api.get(endpoint);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    if (USE_MOCK_DATA) {
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    }

    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new product (admin only)
   */
  createProduct: async (productData) => {
    if (USE_MOCK_DATA) {
      const newProduct = {
        id: String(mockProducts.length + 1),
        ...productData
      };
      mockProducts.push(newProduct);
      return newProduct;
    }

    try {
      return await api.post('/products', productData);
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  /**
   * Update an existing product (admin only)
   */
  updateProduct: async (id, productData) => {
    if (USE_MOCK_DATA) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return mockProducts[index];
    }

    try {
      return await api.put(`/products/${id}`, productData);
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a product (super admin only)
   */
  deleteProduct: async (id) => {
    if (USE_MOCK_DATA) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }
      const deletedProduct = mockProducts[index];
      mockProducts.splice(index, 1);
      return deletedProduct;
    }

    try {
      return await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  }
};
