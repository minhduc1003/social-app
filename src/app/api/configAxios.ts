import { getCookies } from "@/utils/cookies";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
async function addAuthorizationHeader(config: any) {
  const cookie = await getCookies();
  config.headers.Authorization = `Bearer ${cookie}`;
  return config;
}

axiosInstance.interceptors.request.use(async (config) => {
  return await addAuthorizationHeader(config);
});
export default axiosInstance;
