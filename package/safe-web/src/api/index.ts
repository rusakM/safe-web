import axios from "axios";
import type { AxiosRequestConfig, Method } from "axios";

export async function getData<T>(
    url: string,
    headers?: AxiosRequestConfig["headers"]
): Promise<T> {
    try {
        const lsToken = localStorage.getItem("token");
        const response = await axios({
            method: "GET",
            url,
            withCredentials: true,
            headers: {
                ...headers,
                "Content-Type": "application/json",
                Authorization: lsToken ? `Bearer ${lsToken}` : "",
            },
        });

        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error)) 
            throw error?.response?.data;
        throw error;
    }
}

export async function sendData<T>(
    url: string,
    data: unknown,
    method: Method,
    headers?: AxiosRequestConfig["headers"]
): Promise<T> {
    try {
        const lsToken = localStorage.getItem("token");
        const response = await axios({
            data,
            headers: {
                ...headers,
                "Content-Type": "application/json",
                Authorization: lsToken ? `Bearer ${lsToken}` : "",
            },
            method,
            url,
            withCredentials: true,
        }).catch();
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error)) throw error?.response?.data;
        throw error;
    }
}

export class AppError extends Error {
    public code: number;

    public constructor(message: string, code: number) {
        super(message);
        this.name = "AppError";
        this.code = code;
    }
}