import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 👈 backend base URL
  withCredentials: true, // 👈 sends cookies with each request
});

export default API;