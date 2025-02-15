import axios from "axios";
import { useAuthStore } from "@/store/auth";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Добавляем интерцептор для автоматической подстановки токена
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export const loginFunction = async (data) => {
    try {
        const response = await api.post("/auth/login", data )
        return response;
    } catch (error) {
        return error;
    }
};

export const registerFunction = async (data) => {
    try {
        const response = await api.post("/auth/registration", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const getAllTours = async () => {
    try {
        const response = await api.get("/tours");
        return response;
    } catch (error) {
        return error;
    }
};