import axios from "axios";
const BASE_URL = "http";
const axiosINstance = axios.create();

axiosINstance.defaults.baseURL = BASE_URL;
axiosINstance.defaults.withCredentials=true;
axiosINstance.defaults.timeout=1000;

export default axiosINstance;