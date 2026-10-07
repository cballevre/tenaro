import axios from "axios";
import type { DataProvider } from "@refinedev/core";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

const dataProvider: Omit<
    Required<DataProvider>,
    "createMany" | "updateMany" | "deleteMany"
> = {
    getList: async ({ resource }) => {
        const url = `${apiUrl}/${resource}/`;

        const { data } = await axios.get(url);

        console.log("data", data);

        return {
            data,
            total: 0
        };
    },
    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}/`;

        const { data } = await axios.post(url, variables);

        return {
            data
        };
    },
    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axios.get(url);

        return {
            data,
        };
    },
}

export { apiUrl, dataProvider }