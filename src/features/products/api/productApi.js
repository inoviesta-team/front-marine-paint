import axiosInstance from "@api/axiosInstance";

export const productApi = {
  getProducts: async (filterRequest = {}) => {
    // if there is some null, "", [], and other falsy value, dont put to queryParams
    const queryParams = Object.keys(filterRequest)
      .filter(key => filterRequest[key])
      .reduce((acc, key) => {
        acc.append(key, filterRequest[key]);
        return acc;
      }, new URLSearchParams())
      .toString();


    const categoryId = filterRequest.categoryId || null;
    const sortBy = filterRequest.sortBy || "createdAt";
    const sortOrder = filterRequest.sortOrder;
    const limit = filterRequest.limit;
    const page = filterRequest.page;
    
    const products = await axiosInstance.get(`/products/?${queryParams}`, filterRequest);

    return products;
  },
  getProductById: async (id) => {
    const product = await axiosInstance.get(`/products/${id}`);
    return product;
  }
};
