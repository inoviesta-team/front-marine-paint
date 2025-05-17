import axiosInstance from "@api/axiosInstance";

export const brandApi = {
    getBrands: async () => {
      try {
        const response = await axiosInstance.get('/brands?sortBy=name&order=asc&limit=100');
        return response;
      } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
    },
}