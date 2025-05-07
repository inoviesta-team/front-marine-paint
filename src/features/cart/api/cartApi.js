import axiosInstance from "@api/axiosInstance";

export const cartApi = {
  getCarts: async (request) => {
    try {
      const res = await axiosInstance.get("/cart/", request);
      return res;
    } catch (error) {
      console.log("ADD TO CART ERR: ", error);
    }
  },

  addToCart: async (request) => {
    try {
      const res = await axiosInstance.post("/cart/", request);
      return res;
    } catch (error) {
      console.log("ADD TO CART ERR: ", error);
    }
  },

  updateCart: async (cartId, request) => {
    try {
      const res = await axiosInstance.put(`/cart/${cartId}`, request);
      return res;
    } catch (error) {
      console.log("UPDATE CART ERR: ", error);
    }
  },

  deleteCart: async (cartId) => {
    try {
      const res = axiosInstance.delete(`/cart/${cartId}`);
      return res;
    } catch (error) {
      console.log("DELETE CART ERR: ", error);
    }
  },
};
