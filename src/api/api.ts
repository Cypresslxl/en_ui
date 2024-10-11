/* VUE CLI ENV */
import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
});
