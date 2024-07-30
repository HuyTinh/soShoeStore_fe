import axiosClient from "../axiosClient";

const OrderDetailApi = {
    getOrderDetail: async (getRequest, thunkAPI) => {
        return await axiosClient.get(`/order_details/${getRequest.orderDetailId}`, {
            signal: thunkAPI.signal
        });
    },

    getOrderDetailByOrderId: async (getRequest, thunkAPI) => {
        return await axiosClient.get(`/order_details/order/${getRequest.orderId}`, {
            signal: thunkAPI.signal
        });
    },

    createOrderDetail: async (createRequest, thunkAPI) => {
        return await axiosClient.post(`/order_details`, createRequest, {
            signal: thunkAPI.signal
        });
    },

    createMultiOrderDetail: async (createRequest, thunkAPI) => {
        return await axiosClient.post(`/order_details/multi`, createRequest, {
            signal: thunkAPI.signal
        });
    },


    updateOrderDetail: async (updateRequest, thunkAPI) => {
        return await axiosClient.put(`/order_details/${updateRequest.orderDetailId}`, updateRequest.orderDetail, {
            signal: thunkAPI.signal
        });
    },

    deleteOrderDetail: async (deleteRequest, thunkAPI) => {
        await axiosClient.delete(`/oder_details/${deleteRequest.orderDetailId}`, {
            signal: thunkAPI.signal
        })
    },
}

export default OrderDetailApi;