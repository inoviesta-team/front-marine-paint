import axiosInstance from "@api/axiosInstance";

export const orderApi = {
    getOptionByAddress: async (request) => {
        try {
            const res = await axiosInstance.post("/orders/shipping/options-by-address", request);
            return res;
        } catch (error) {
            console.log("GET OPTION ERR: ", error);
        }
    },

    getOrders: async ({ page, limit, status }) => {
        try {
            const res = await axiosInstance.get(`/orders/my-orders?page=${page}&limit=${limit}&status=${status}`);
            return res;
        } catch (error) {
            console.log("GET ORDER BY ID ERR: ", error);
        }
    },

    getOrderById: async (orderId) => {
        try {
            const res = await axiosInstance.get(`/orders/${orderId}`);
            return res;
        } catch (error) {
            console.log("GET ORDER BY ID ERR: ", error);
        }
    },

    createOrder: async (request) => {
        try {
            const res = await axiosInstance.post("/orders/", request);

            console.log("res: ", res);
            

            return res;
        } catch (error) {
            console.log("CREATE ORDER ERR: ", error);
        }
    }
}