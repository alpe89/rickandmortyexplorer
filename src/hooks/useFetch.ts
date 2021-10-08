import { Character, Episode, Location } from "../types";
import { ApiResponse } from "../types/ApiResponse";

export const useFetch = () => {
    const fireRequest = async <T extends Character | Episode | Location>(endpoint: string) => {
        const baseUrl = process.env.REACT_APP_BASE_URL;

        if (!baseUrl) {
            throw new Error("it seems that ENV variables are not loaded");
        }

        const url = baseUrl.concat(endpoint);
        const method = "GET";
        const headers = { "content-type": "application/json;charset=UTF-8" };

        const response = await window.fetch(url, { method, headers });
        const { info, results }: ApiResponse<T> = await response.json();

        return { info, results };
    };

    return { fireRequest };
};
