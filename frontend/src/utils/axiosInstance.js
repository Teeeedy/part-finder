import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    throw error;
  }
);

export default axiosInstance;
