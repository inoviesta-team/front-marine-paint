import { useState, useEffect, useCallback } from 'react';
import { productApi } from '@api/products';

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchProducts = useCallback(async (queryParams = params) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productApi.getAllProducts(queryParams);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      return [];
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Fetch products on mount and when params change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    updateParams
  };
}

export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async (id = productId) => {
    if (!id) {
      setLoading(false);
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await productApi.getProductById(id);
      setProduct(data);
      return data;
    } catch (err) {
      setError(err.message || `Failed to fetch product ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Fetch product on mount and when productId changes
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    fetchProduct
  };
}
