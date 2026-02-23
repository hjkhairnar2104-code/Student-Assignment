// src/api/authapi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  const res = await API.post("/auth/login", data);

 
  localStorage.setItem(
    "token",
    res.data.token.replace("Bearer ", "")
  );
  localStorage.setItem("role", res.data.role);
  localStorage.setItem("userId", res.data.userId);

  
  if (res.data.year) {
    localStorage.setItem("year", res.data.year);
  }

  return res.data;
};

export const signup = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};