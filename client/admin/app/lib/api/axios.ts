// src/lib/api/axios.ts
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      toast.error(message || "Session expired. Please login again.");
    } else if (status === 403) {
      toast.error(message || "You don't have permission to do that.");
    } else if (status >= 500) {
      toast.error(message || "Server error. Please try again later.");
    } else if (!error.response) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  },
);

export default api;