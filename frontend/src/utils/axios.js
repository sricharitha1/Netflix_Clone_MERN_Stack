import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // ✅ use env var instead of localhost
  withCredentials: true, // keeps cookies
});

export default API;
