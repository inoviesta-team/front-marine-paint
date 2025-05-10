import axiosInstance from "@api/axiosInstance";

export const ratingApi = {
    checkRating: async (productId, orderId) => {
        try {
            const response = await axiosInstance.get(`/ratings/check?productId=${productId}&orderId=${orderId}`);
            
            return response;
        } catch (error) {
            console.error('CHECK RATING ERR: ', error);
            throw error;
        }
    }
}