import axios from "axios";
import { useAuthStore } from "@/store/auth";
import router from "@/router";

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


// Добавляем interceptor для обработки ошибок
api.interceptors.response.use(
    (response) => response, // Пропускаем успешные запросы
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("accessToken"); // Очищаем токен
            router.push("/"); // Перенаправляем на главную
        }
        return Promise.reject(error); // Возвращаем ошибку дальше
    }
);

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

export const createBookings = async (data) => {
    try {
        const response = await api.post("/bookings", data);
        return response;
    } catch (error) {
        return error;
    }
};


export const getBookings = async () => {
    try {
        const response = await api.get("/bookings");
        return response;
    } catch (error) {
        return error;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get("auth/getUsers");
        return response;
    } catch (error) {
        return error;
    }
};

export const updateUserRole = async (data) => {
    try {
        const response = await api.post("auth/svitchRole", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const updateBookingStatus = async (data) => {
    try {
        const response = await api.put("/bookings", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const CreateTourFunction = async (data) => {
    try {
        const response = await api.post("/tours", data);
        return response;
    } catch (error) {
        return error;
    }
}

export const UpdateTourFunction = async (data, id) => {
    try {
        const response = await api.patch(`/tours/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const DeleteTourFunction = async (id) => {
    try {
        const response = await api.delete(`/tours/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const UploadTourPhohoFunction = async (data) => {
    try {
        const response = await api.post("/upload", data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response;
    } catch (error) {
        return error;
    }
}

export const GetOneTourForId = async (id) => {
    try {
        const response = await api.get(`/tours/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const SendReviewFunction = async (data) => {
    try {
        const response = await api.post("/reviews", data);
        return response;
    } catch (error) {
        return error;
    }
}
export const getAllReview = async () => {
    try {
        const response = await api.get("/reviews");
        return response;
    } catch (error) {
        return error;
    }
}
export const getOneReview = async (id) => {
    try {
        const response = await api.get(`/reviews/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}