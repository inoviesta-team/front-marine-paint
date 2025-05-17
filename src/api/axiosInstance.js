import { beApiUrl } from '@utils/url';
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "https://fms.vigorjs.me/",
  baseURL: beApiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;