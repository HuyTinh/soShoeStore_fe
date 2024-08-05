import { clearCart } from "../../redux/slice/carts.slice";
import axiosClient from "../axiosClient"

const OrderApi = {

    createOrder: async (createRequest, thunkAPI) => {
        return await axiosClient.post("/orders", createRequest.newOrder, {
            signal: thunkAPI.signal
        });
    },
    commitQueueOrder: async (userId, thunkAPI) => {
        const response = await axiosClient.get(`/orders/commit-queue-order/${userId}`);
        return response;
    },

    updateOrder: async (updateRequest, thunkAPI) => {
        await axiosClient.put(`/orders/${updateRequest.orderId}`, updateRequest.newOrder, {
            signal: thunkAPI.signal
        })
    },

    getOrderByUserId: async (getRequest, thunkAPI) => {
        return await axiosClient.get(`/orders/user/${getRequest.userId}`, {
            signal: thunkAPI.signal
        });
    },

    getOrderById: async (getRequest, thunkAPI) => {
        return await axiosClient.get(`/orders/${getRequest.orderId}`, {
            signal: thunkAPI.signal
        });
    },

}

export default OrderApi;