import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage =
        "Request timed out. Check backend/database connection.";
    } else if (!error.response) {
      error.userMessage =
        "Cannot reach backend API. Ensure backend is running on port 5000.";
    }

    return Promise.reject(error);
  },
);

export default api;
