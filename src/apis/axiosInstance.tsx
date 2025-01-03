import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://reqres.in/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.url === '/auth/admin/login') return config;
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
