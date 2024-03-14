import { getCookies } from '@/utils/cookies';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
const cookie = getCookies();

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie}`;
  return config;
});

export default axiosInstance;
