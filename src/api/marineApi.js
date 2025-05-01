/**
 * Marine Paint API service
 */
import axiosInstance from './axiosInstance';
import { marineProducts, marineProjects, marineArticles, marineTestimonials, marinePartners } from './marineMockData';

export const marineApi = {
  /**
   * Get all products
   */
  getProducts: async (params = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredProducts = [...marineProducts];
    
    // Filter by category if specified
    if (params.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === params.category
      );
    }
    
    // Filter by search term if specified
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort products if specified
    if (params.sort) {
      switch (params.sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }
    
    // Limit results if specified
    if (params.limit && typeof params.limit === 'number') {
      filteredProducts = filteredProducts.slice(0, params.limit);
    }
    
    return filteredProducts;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const product = marineProducts.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return product;
  },

  /**
   * Get all projects
   */
  getProjects: async (filterRequest = {}) => {
    const products = await axiosInstance.get("/products", filterRequest);

    return products;
  },

  /**
   * Get project by ID
   */
  getProjectById: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const project = marineProjects.find(p => p.id === id);
    
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    return project;
  },

  /**
   * Get all articles
   */
  getArticles: async (params = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredArticles = [...marineArticles];
    
    // Limit results if specified
    if (params.limit && typeof params.limit === 'number') {
      filteredArticles = filteredArticles.slice(0, params.limit);
    }
    
    return filteredArticles;
  },

  /**
   * Get article by ID
   */
  getArticleById: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const article = marineArticles.find(a => a.id === id);
    
    if (!article) {
      throw new Error(`Article with ID ${id} not found`);
    }
    
    return article;
  },

  /**
   * Get all testimonials
   */
  getTestimonials: async (params = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredTestimonials = [...marineTestimonials];
    
    // Limit results if specified
    if (params.limit && typeof params.limit === 'number') {
      filteredTestimonials = filteredTestimonials.slice(0, params.limit);
    }
    
    return filteredTestimonials;
  },

  /**
   * Get all partners
   */
  getPartners: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return marinePartners;
  },

  /**
   * Send contact form
   */
  sendContactForm: async (formData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new Error(`Field ${field} is required`);
      }
    }
    
    // Simulate successful submission
    return {
      success: true,
      message: 'Your message has been sent successfully!'
    };
  }
};
