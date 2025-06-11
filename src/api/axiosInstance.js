import { beApiUrl } from '@utils/url';
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: beApiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = await localStorage.getItem('accessToken') || '';
    const refreshToken = await localStorage.getItem('refreshToken') || '';

    // Check if the token is expired
    if (token && refreshToken && isTokenExpired(token)) {
      // Refresh the token
      token = await refreshAccessToken(refreshToken);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(`${beApiUrl}/auth/refresh`, { refreshToken });
    const newAccessToken = response?.data?.data?.accessToken;
    if (newAccessToken) {
      await localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      await localStorage.setItem("refreshToken", response?.data?.data?.refreshToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // window.location.href = '/account/login';
    return '';
  }
}

async function isTokenExpired(token) {
  try {
    if (!token) return true;
  
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(payload);
    return Date.now() >= exp * 1000;
  } catch (error) {
    // await localStorage.removeItem("accessToken");
    // await localStorage.removeItem("refreshToken");
  }
}

export default axiosInstance;