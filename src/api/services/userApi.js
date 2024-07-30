import axiosClient from "../axiosClient"


const UserApi = {
    login: async (data) => {
        const response = await axiosClient.post("/users/login", data)
        return response;
    },

    register: async (data) => {
        const response = await axiosClient.post("/users/register", data)
        return response;
    },

    getUserByToken: async (token, thunkAPI) => {
        const response = await axiosClient.get(`/users/profile/${token}`, {
            signal: thunkAPI.signal,
        })
        return response;
    },

    updateProfile: async (data) => {
        const response = await axiosClient.put(`/users/profile/${data.id}`, data)
        return response;
    },

    updateContact: async (data) => {
        const response = await axiosClient.put(`/users/contact/${data.id}`, data)
        return response;
    },

    sendOtp: async (data) => {
        const response = await axiosClient.get(`/users/send-otp/${data.id}`)
        return response;
    },

    changePassword: async (data) => {
        await axiosClient.put(`/users/change-password/${data.id}`, data.data)
    }

}

export default UserApi