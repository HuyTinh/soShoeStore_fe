import axiosClient from "../axiosClient";

const CartApi = {
    getListCart: async (cartId, thunkAPI) => {
        return await axiosClient.get(`/cart/${cartId}`, {
            signal: thunkAPI.signal
        });
    },

    addToCart: async (data, thunkAPI) => {
        return await axiosClient.post(`/cart/${data.cartId}`, data.cart, {
            signal: thunkAPI.signal
        });
    },

    updateFromCart: async (data, thunkAPI) => {
        return await axiosClient.put(`/cart/${data.cartId}`, data.cart, {
            signal: thunkAPI.signal
        });
    },

    removeFromCart: async (data, thunkAPI) => {
        return await axiosClient.delete(`/cart/${data.cartId}`, data.cart, {
            signal: thunkAPI.signal
        });
    },

    clearCart: async (cartId, thunkAPI) => {
        return await axiosClient.delete(`/cart/clear/${cartId}`, {
            signal: thunkAPI.signal
        });
    }
}

export default CartApi;