import useAuthStore from '@features/auth/zustand/useAuthStore';
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
    let token = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';

    // Check if the token is expired
    if (isTokenExpired(token) && refreshToken) {
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
    const newAccessToken = res?.data?.data?.accessToken;
    if (newAccessToken) {
      await localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      await localStorage.setItem("refreshToken", res?.data?.data?.refreshToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/account/login';
    return '';
  }
}

function isTokenExpired(token) {
  if (!token) return true;
  const [, payload] = token.split('.');
  const { exp } = JSON.parse(atob(payload));
  return Date.now() >= exp * 1000;
}

export default axiosInstance;