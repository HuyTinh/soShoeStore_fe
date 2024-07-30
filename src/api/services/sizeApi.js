import { get } from "react-hook-form";
import axiosClient from "../axiosClient";

const SizeApi = {
    getSizes: async () => {
        return await axiosClient.get("/sizes");
    }
}

export default SizeApi;