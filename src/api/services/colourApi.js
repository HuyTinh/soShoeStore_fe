import axiosClient from "../axiosClient";

const ColourApi = {
    getColours: async () => {
        return await axiosClient.get("/colours");
    }
}

export default ColourApi;