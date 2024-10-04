/* Vite ENV */
// import axios from 'axios';

// console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
// });

/* VUE CLI ENV */
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
});

export interface SignUpData {
    credential: string;
    password: string;
}

export interface SignUpResponse {
    success: boolean;
    message: string;
    userId?: string;
}

export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
    try {
        const response = await api.post<SignUpResponse>('/auth/signup', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as SignUpResponse;
        }
        throw error;
    }
};

export interface LoginData {
    credential: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as LoginResponse;
        }
        throw error;
    }
};
