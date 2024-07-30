import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // if (error.response['data'] && response['data'].message.error) {
    //     throw error.response['data'].message.error;
    // }
    throw error.response['data'];
})

export default axiosClient;