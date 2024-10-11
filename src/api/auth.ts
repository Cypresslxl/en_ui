/* Vite ENV */
// import axios from 'axios';

// console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
// });
import axios from 'axios';
import { api } from '@/api/api';
//1. Sign up
/**
 * Sign up data interface.
 */
export interface SignUpData {
    credential: string;
    password: string;
}

/**
 * Sign up response interface.
 */
export interface SignUpResponse {
    success: boolean;
    message: string;
    userId?: string;
}

/**
 * Sign up a new user.
 * @param data - The user data to sign up.
 * @returns A promise that resolves to the sign up response.
 */
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

//2. Login
/**
 * Login data interface.
 */
export interface LoginData {
    credential: string;
    password: string;
}
/**
 * Login response interface.
 */
export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
}

/**
 * Login a user.
 * @param data - The user data to login.
 * @returns A promise that resolves to the login response.
 */
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
