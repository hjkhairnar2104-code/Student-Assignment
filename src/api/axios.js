// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ Attach JWT correctly
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
    // 🔥 IMPORTANT FIX: remove Bearer if already present
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;