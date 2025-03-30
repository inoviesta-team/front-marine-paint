/**
 * API Client for handling requests to the backend
 */

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper to handle HTTP errors
function handleErrorResponse(response) {
  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  return response;
}

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

// Utility to add auth token to requests
function addAuthHeader(headers = {}) {
  if (isBrowser) {
    const token = localStorage.getItem('authToken');
    return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
  }
  return headers; // Just return headers on server side
}

/**
 * Base fetch function with error handling and auth
 */
export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Add auth header if not specifically excluded
  if (options.skipAuth !== true) {
    options.headers = addAuthHeader(options.headers);
  }
  
  // Remove non-fetch options
  const { skipAuth, ...fetchOptions } = options;
  
  try {
    const response = await fetch(url, fetchOptions);
    handleErrorResponse(response);
    
    // Check if response is empty
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
}

// Convenience methods for common HTTP methods
export const api = {
  get: (endpoint, options = {}) => fetchApi(endpoint, { method: 'GET', ...options }),
  
  post: (endpoint, data, options = {}) => fetchApi(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(data),
    ...options
  }),
  
  put: (endpoint, data, options = {}) => fetchApi(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(data),
    ...options
  }),
  
  delete: (endpoint, options = {}) => fetchApi(endpoint, { method: 'DELETE', ...options })
};
