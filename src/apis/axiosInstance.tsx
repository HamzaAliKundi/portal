import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://agenda-cms-be-bc520f6f0563.herokuapp.com/api',
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
