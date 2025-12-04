import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN + "/api",
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
