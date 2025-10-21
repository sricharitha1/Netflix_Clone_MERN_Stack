import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api/v1", // 👈 backend base URL
  withCredentials: true, // 👈 sends cookies with each request
});

export default API;
