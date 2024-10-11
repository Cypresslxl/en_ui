import { Module } from 'vuex';
import { RootState } from '@/store';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
}

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        user: null,
        token: null,
        isLoggedIn: false,
    },
    mutations: {
        setUser(state, user: User) {
            state.user = user;
            state.isLoggedIn = true;
        },
        setToken(state, token: string) {
            state.token = token;
        },
        clearUser(state) {
            state.user = null;
            state.isLoggedIn = false;
        },
        clearToken(state) {
            state.token = null;
        },
    },
};
