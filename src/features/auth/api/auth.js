import axiosInstance from "@api/axiosInstance";

export const authApi = {
  login: async (request) => {
    try {
      const res = axiosInstance.post("/auth/login", request);
      return res;
    } catch (error) {
      console.log("LOGIN ERR: ", error);
    }
  },

  register: async (request) => {
    try {
      const res = axiosInstance.post("/auth/register", request);
      return res;
    } catch (error) {
      console.log("REGISTER ERR: ", error);
    }
  },

  getCurrentUser: async () => {
    try {
      const res = axiosInstance.get("/auth/me");
      return res;
    } catch (error) {
      console.log("GET USER ERR: ", error);
    }
  },

  editProfile: async (data) => {
    try {
      const res = axiosInstance.put("/auth/me", data);

      return res;
    } catch (error) {
      console.log("LOGIN ERR: ", error);
    }
  },

  logout: async () => {},
};