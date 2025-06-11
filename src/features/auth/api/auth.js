import axiosInstance from "@api/axiosInstance";

export const authApi = {
  login: async (request) => {
    try {
      const res = await axiosInstance.post("/auth/login", request);
      return res;
    } catch (error) {
      console.log("LOGIN ERR: ", error);
      return error;
    }
  },

  register: async (request) => {
    try {
      const res = await axiosInstance.post("/auth/register", request);
      return res;
    } catch (error) {
      console.log("REGISTER ERR: ", error);
      return error;
    }
  },

  getCurrentUser: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res;
    } catch (error) {
      console.log("GET USER ERR: ", error);
    }
  },

  editProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/me", data);

      return res;
    } catch (error) {
      console.log("EDIT PROFILE ERR: ", error);
    }
  },

  changePassword: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/me", data);

      return res;
    } catch (error) {
      console.log("CHANGE PASSWORD ERR: ", error);
    }
  },

  logout: async () => {
    // try {
    //   const res = await axiosInstance.put("/auth/logout-all", data);

    //   return res;
    // } catch (error) {
    //   console.log("LOGOUT ERR: ", error);
    // }
  },
};