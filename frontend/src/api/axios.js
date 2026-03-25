import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage =
        "Server is waking up, please wait a few seconds and try again.....";
    } else if (!error.response) {
      error.userMessage =
        "Cannot reach backend API. Ensure backend is running on port 5000.";
    }

    return Promise.reject(error);
  },
);

export default api;
