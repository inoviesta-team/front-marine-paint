import axiosInstance from "@api/axiosInstance";

export const paymentApi = {

    getPaymentByOrderId: async (orderId) => {
        try {
            const res = await axiosInstance.get(`/payments/orders/${orderId}`);
            return res;
        } catch (error) {
            console.log("GET PAYMENT BY ORDER ID ERR: ", error);
        }
    },

    createPaymentOrder: async (orderId) => {
        try {
            const res = await axiosInstance.post(`/payments/orders/${orderId}`);
            return res;
        } catch (error) {
            console.log("CREATE PAYMENT ERR: ", error);
        }
    }
}