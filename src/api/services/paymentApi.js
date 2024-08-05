import axiosClient from "../axiosClient";

const PaymentApi = {
    payment: async (data, thunkAPI) => {
        return await axiosClient.post(`/payments`, data);
    },
}

export default PaymentApi;