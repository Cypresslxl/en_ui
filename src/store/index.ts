import { createStore } from 'vuex';
import { auth, AuthState } from './modules/auth';

export interface RootState {
    auth: AuthState;
}

export default createStore<RootState>({
    modules: {
        auth,
    },
});

// import { createStore } from 'vuex';
// import { auth, AuthState } from './modules/auth.ts'
// export default createStore({
//     state: {},
//     getters: {},
//     mutations: {},
//     actions: {},
//     modules: {
//         auth,
//     },
// });

// export interface RootState {
//     auth: AuthState
// }
