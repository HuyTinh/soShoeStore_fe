import axiosClient from "../axiosClient";

const ShoeApi = {
    getShoeList: async (thunkAPI) => {
        return await axiosClient.get("/shoes", {
            signal: thunkAPI.signal
        });
    },

    getPageShoeList: async (params, thunkAPI) => {
        return await axiosClient.get(`/shoes`, { params }, {
            signal: thunkAPI.signal
        });
    },

    getShoeById: async (id, thunkAPI) => {
        return await axiosClient.get(`/shoes/${id}`, {
            signal: thunkAPI.signal
        });
    },

    createShoe: async (data) => {
        const formData = new FormData();
        formData.append("shoe", new Blob([JSON.stringify(data.shoe)], {
            type: "application/json"
        }));
        data.imageUrl.forEach((file) => {
            formData.append("imageUrl", file);
        });
        if (data.imageDetail) {
            [...data.imageDetail].forEach((file) => {
                formData.append("imageDetailUrl", file);
            });
        }
        return await axiosClient.post("/shoes", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteShoe: async (id) => {
        const response = await axiosClient.delete(`/shoes/${id}`);
        return response;
    },

    updateShoe: async (data) => {
        const formData = new FormData();
        formData.append("shoe", new Blob([JSON.stringify(data.shoe)], {
            type: "application/json"
        }));
        if (data.imageUrl) {
            data.imageUrl.forEach((file) => {
                formData.append("imageUrl", file);
            });
        }
        if (data.imageDetail) {
            [...data.imageDetail].forEach((file) => {
                formData.append("imageDetailUrl", file);
            });
        }
        return await axiosClient.put(`/shoes/${data.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    getShoeYearSales: async (params) => {
        return await axiosClient.get(`/shoes/year-sales`, { params });
    },

    getShoeMonthSales: async (params) => {
        return await axiosClient.get(`/shoes/month-sales`, { params });
    },

    getAllCurrentShoeMustHave: async (thunkAPI) => {
        return await axiosClient.get("/shoes/current-all-shoe-must-have", {
            signal: thunkAPI.signal
        })
    },

    getShoeCategories: async () => {
        return await axiosClient.get("/shoes/categories")
    }

}

export default ShoeApi;