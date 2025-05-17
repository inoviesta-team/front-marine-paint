import axiosInstance from "@api/axiosInstance";

export const ratingApi = {

    getRatingMe: async (request) => {
        try {
            const response = await axiosInstance.get(`/ratings/me?page=${request.page}&limit=${request.limit}&filter=${request.filter}`);
            
            return response;
        } catch (error) {
            console.error('GET RATING ME ERR: ', error);
            throw error;
        }
    },

    getRatingByProductId: async (productId) => {
        try {
            const response = await axiosInstance.get(`/ratings/products/${productId}`);
            
            return response;
        } catch (error) {
            console.error('GET RATING ME ERR: ', error);
            throw error;
        }
    },

    checkRating: async (productId, orderId) => {
        try {
            const response = await axiosInstance.get(`/ratings/check?productId=${productId}&orderId=${orderId}`);
            
            return response;
        } catch (error) {
            console.error('CHECK RATING ERR: ', error);
            throw error;
        }
    },
    createRating: async (request) => {
        try {
            const response = await axiosInstance.post(`/ratings`, request);
            
            return response;
        } catch (error) {
            console.error('CREATE RATING ERR: ', error);
            throw error;
        }
    }
}