import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginFunction = async (data) => {
    try {
        const response = await api.post("/auth/login", data )
        const {token, user} = response.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
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