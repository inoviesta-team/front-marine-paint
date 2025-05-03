import axiosInstance from "@api/axiosInstance";

export const productApi = {
  getProducts: async (filterRequest = {}) => {
    const categoryId = filterRequest.categoryId;
    const page = filterRequest.page;
    const limit = filterRequest.limit;
    const brandId = filterRequest.brandId;
    
    const products = await axiosInstance.get(`/products/?page=${page}&limit=${limit}&brandId=${brandId}&categoryId=${categoryId}`);

    return products;
  },
  getProductById: async (id) => {
    const product = await axiosInstance.get(`/products/${id}`);
    return product;
  }
};
