import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    //baseURL: 'https://agripoint.azurewebsites.net/api/v1/',
    baseURL: 'https://localhost:44399/api/v1/',
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
