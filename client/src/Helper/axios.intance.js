import axios from "axios";
import { config } from 'dotenv';

const BASE_URL =  import.meta.env.VITE_BACKEND_UR ;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;