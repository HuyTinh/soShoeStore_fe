import axiosClient from "../axiosClient";

const SalesApi = {
    getYearSales: async () => {
        return await axiosClient.get("/sales/year");
    },

    getShoeCategoryYearSales: async () => {
        return await axiosClient.get("/sales/shoe-category");
    },

    getTopShoeSalesInMonth: async () => {
        return await axiosClient.get(`/sales/shoe-top-month/${new Date().getMonth() + 1}`);
    }
}

export default SalesApi;