import axiosInstance from "@api/axiosInstance";

export const categoryApi = {
    getCategories: async () => {
        try {
            const response = await axiosInstance.get('/categories?sortBy=name&order=asc&limit=100');
            return response;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}