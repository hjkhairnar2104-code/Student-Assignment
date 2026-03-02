import axios from "axios";

export const API_BASE_URL = "";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔐 JWT interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("JWT SENT:", token);

    if (token) {
      if (token.startsWith("Bearer ")) {
        config.headers.Authorization = token;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Handle FormData correctly
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;