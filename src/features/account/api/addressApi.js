import axiosInstance from "@api/axiosInstance";

export const addressApi = {
  getAddress: async () => {
    try {
      const res = axiosInstance.get("/addresses");
      return res;
    } catch (error) {
      console.log("GET ADDRESS ERR: ", error);
    }
  },
  createAddress: async (request) => {
    try {
      const res = axiosInstance.post("/addresses", request);
      return res;
    } catch (error) {
      console.log("CREATE ADDRESS ERR: ", error);
    }
  },
  updateAddress: async (addressId, request) => {
    try {
      const res = axiosInstance.put(`/addresses/${addressId}`, request);
      return res;
    } catch (error) {
      console.log("UPDATE ADDRESS ERR: ", error);
    }
  },
  deleteAddress: async (addressId) => {
    try {
      const res = axiosInstance.delete(`/addresses/${addressId}`);
      return res;
    } catch (error) {
      console.log("DELETE ADDRESS ERR: ", error);
    }
  }
};
