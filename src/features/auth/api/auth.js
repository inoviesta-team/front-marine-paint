import axiosInstance from "@api/axiosInstance";

export const authApi = {
  login: async (request) => {
    try {
      console.log("asasa");
      
      const res = axiosInstance.post("/auth/login", request);
      console.log("res: ", res.data);
      return res;
    } catch (error) {
      console.log("LOGIN ERR: ", error);
    }
  },

  register: async (request) => {
    try {
      const res = axiosInstance.post("/auth/register", request);
      console.log("res: ", res.data);
      return res;
    } catch (error) {
      console.log("REGISTER ERR: ", error);
    }
  },

  getCurrentUser: async () => {
    try {
      const res = axiosInstance.get("/auth/me");
      console.log("res: ", res.data);
      return res;
    } catch (error) {
      console.log("GET USER ERR: ", error);
    }
  },
  logout: async () => {},
};